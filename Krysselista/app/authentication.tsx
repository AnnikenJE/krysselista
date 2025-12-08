import { useAuthSession } from "@/providers/authenticationContext";
import { FontSizes } from "@/theme/fontSize";
import { LinearGradient } from "expo-linear-gradient";
import React, { use, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Main Authentication for login and registration
// State variables
const Authentication = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState<"employee" | "parent" | null>(null);

  const { signIn, createUser } = useAuthSession();

  return (
    // Prevents keyboard going over textfields
 /*   <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-50}
      style={{
        flex: 1,
      }}
    >
      */
      // Dismiss keyboard when clicking outside of textfields
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <LinearGradient colors={["#FFE5EC", "#E3F2FD"]} style={{ flex: 1 }}>
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
                      userType === "employee"
                        ? styles.employeeSelected
                        : styles.employeeDefault,
                    ]}
                    onPress={() => setUserType("employee")}
                  >
                    <Text style={styles.userTypeText}>Ansatt</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.userTypeButton,
                      userType === "parent"
                        ? styles.parentSelected
                        : styles.parentDefault,
                    ]}
                    onPress={() => setUserType("parent")}
                  >
                    <Text style={styles.userTypeText}>Foresatt</Text>
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

              {/* Adress input field */}
              {isSignUp && (
                <View style={styles.textFieldContainer}>
                  <Text>Adresse</Text>
                  <TextInput
                    value={adress}
                    secureTextEntry={false}
                    onChangeText={setAdress}
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
              <Pressable
                style={{
                  paddingTop: 24,
                }}
                onPress={() => {
                  setIsSignUp(!isSignUp);
                }}
              >
                <Text
                  style={{
                    textDecorationLine: "underline", fontSize: 24, fontFamily: Platform.OS === "ios" ? "SF Pro" : "sans-serif",
                  }}
                >
                  {isSignUp ? "Log inn" : "Register bruker"}
                </Text>
              </Pressable>

              {/* Submit button */}
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.primaryButton}
                  onPress={async () => {
                    if (isSignUp) {
                      if (!userType) {
                        Alert.alert("Vennligst velg brukertype");
                        return;
                      }
                      await createUser(
                        userEmail,
                        password,
                        userName,
                        adress,
                        phone,
                        userType === "employee"
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
                    {isSignUp ? "Registrer bruker" : "Bekreft"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
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
    marginBottom: 2,
    marginTop: 95,
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "600",
    color: "#745FEF",
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
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
  },

  textFieldContainer: {
    width: "100%",
    paddingTop: 16,
  },
  textField: {
    borderWidth: 0.165,
    padding: 10,
    marginTop: 6,
    borderColor: "gray",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  userTypeButton: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  employeeDefault: {
    backgroundColor: "#a2a1ffff",
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
    color: "#ffffffff",
    fontSize: 24,
  },
});
