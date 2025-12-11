import { useAuthSession } from "@/providers/authenticationContext";
import { Colors } from "@/theme/colors";
import { FontSizes } from "@/theme/fontSize";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Main Authentication for login and registration
// State variables
const Authentication = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isEmployee, setIsEmployee] = useState<boolean | null>(null);
  const { signIn, createUser } = useAuthSession();

  return (
    // Prevents keyboard going over textfields
    /* 	<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={-50}
			style={{
				flex: 1,
			}}
		>
            */
    //	{/* Dismisses the keyboard when clicking outside the keybaord area */}
    //<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <LinearGradient
      colors={[Colors.backgroundPink, Colors.backgroundBlue]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>Krysselista </Text>
        </View>
        <View style={styles.mainContainer}>
          {isSignUp && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <Pressable
                style={[
                  styles.userTypeButton,
                  isEmployee ? styles.parentDefault : styles.parentSelected,
                ]}
                onPress={() => setIsEmployee(false)}
              >
                <Text style={styles.userTypeText}>Foresatt</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.userTypeButton,
                  isEmployee ? styles.employeeSelected : styles.employeeDefault,
                ]}
                onPress={() => setIsEmployee(true)}
              >
                <Text style={styles.userTypeText}>Ansatt</Text>
              </Pressable>
            </View>
          )}

          {isSignUp && (
            <View style={styles.textFieldContainer}>
              <Text>Brukernavn</Text>
              <TextInput
                value={userName}
                onChangeText={setUserName}
                style={styles.textField}
                placeholder="Brukernavn"
              />
            </View>
          )}

          {/* Email field */}
          <View style={styles.textFieldContainer}>
            <Text>E-post</Text>
            <TextInput
              value={userEmail}
              onChangeText={setUserEmail}
              style={styles.textField}
              placeholder="E-post"
              keyboardType="email-address"
            />
          </View>

          {/* Password input field */}
          <View style={styles.textFieldContainer}>
            <Text>Passord</Text>
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              style={styles.textField}
              placeholder="Passord"
            />
          </View>

          {/* Address input field */}
          {isSignUp && (
            <View style={styles.textFieldContainer}>
              <Text>Adresse</Text>
              <TextInput
                value={address}
                secureTextEntry={false}
                onChangeText={setAddress}
                style={styles.textField}
                placeholder="Adresse"
              />
            </View>
          )}

          {/* Phone input field */}
          {isSignUp && (
            <View style={styles.textFieldContainer}>
              <Text>Telefon</Text>
              <TextInput
                value={phone}
                secureTextEntry={false}
                onChangeText={setPhone}
                style={styles.textField}
                placeholder="Telefon"
              />
            </View>
          )}

          {/* Button toggle between signup and registration */}
          {/* textfield clears after toggling button */}
          <Pressable
            style={styles.toggleContainer}
            onPress={() => {
              setIsSignUp(!isSignUp);
              setUserName("");
              setUserEmail("");
              setPassword("");
              setAddress("");
              setPhone("");
              setIsEmployee(null);
            }}
          >
            <Text style={styles.toggleText}>
              {isSignUp ? (
                <>
                  <Text style={{ color: Colors.mediumGray }}>
                    Allerede bruker?
                  </Text>{" "}
                  <Text style={styles.boldText}>Logg inn</Text>
                </>
              ) : (
                <>
                  <Text style={{ color: Colors.mediumGray }}>Ny bruker?</Text>{" "}
                  <Text style={styles.boldText}>Registrer deg her</Text>
                </>
              )}
            </Text>
          </Pressable>

          {/* Submit button */}
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.primaryButton}
              onPress={async () => {
                if (
                  !userEmail ||
                  !password ||
                  (isSignUp && (!userName || !address || !phone))
                ) {
                  Alert.alert("Vennligst fyll inn alle feltene");
                  return;
                }

                if (isSignUp) {
                  if (isEmployee === null) {
                    Alert.alert("Vennligst velg din rolle");
                    return;
                  }
                  await createUser(
                    userName,
                    userEmail,
                    password,
                    userName,
                    address,
                    phone,
                    isEmployee
                  );
                } else {
                  try {
                    await signIn(userEmail, password);
                  } catch {
                    Alert.alert(
                      "Feil kredentialer, Vennligst sjekk e-post og passord"
                    );
                  }
                }
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 24,
                }}
              >
                {isSignUp ? "Registrer bruker" : "Logg inn"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
    //  </TouchableWithoutFeedback>
    //</KeyboardAvoidingView>
  );
};

export default Authentication;

// Styling for the different components
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    width: "100%",
  },

  titleContainer: {
    position: "absolute",
    width: "100%",
    marginBottom: 2,
    marginTop: 95,
    alignItems: "center",
  },
  headerText: {
    fontSize: FontSizes.H1,
    fontWeight: "600",
    color: Colors.primaryPurple,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "SF Pro" : "sans-serif",
  },

  buttonContainer: {
    width: "110%",
    paddingHorizontal: 16,
    paddingTop: 32,
    gap: 16,
    position: "absolute",
    bottom: 20,
    marginBottom: 24,
  },

  primaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: Colors.primaryWhite,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },

  textFieldContainer: {
    width: "100%",
    paddingTop: 16,
  },

  textField: {
    borderWidth: 0.165,
    padding: 10,
    marginTop: 6,
    borderColor: Colors.mediumGray,
    borderRadius: 10,
    backgroundColor: Colors.variationWhite,
  },

  userTypeButton: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },

  employeeDefault: {
    backgroundColor: "#b5b4fdff",
  },
  employeeSelected: {
    backgroundColor: "#7e67ffff",
  },
  parentDefault: {
    backgroundColor: "#9ed9f9ff",
  },
  parentSelected: {
    backgroundColor: "#38BDF8",
  },

  userTypeText: {
    color: Colors.primaryWhite,
    fontSize: FontSizes.H2,
  },

  toggleContainer: {
    paddingTop: 24,
    alignItems: "center",
  },
  toggleText: {
    fontSize: FontSizes.H4,
    fontFamily: Platform.OS === "ios" ? "SF Pro" : "sans-serif",
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
});
