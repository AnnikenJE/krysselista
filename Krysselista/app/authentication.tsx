import { useAuthSession } from "@/providers/authenticationContext";
import React, { useState } from "react";
import {
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
  const [isSignUp, setIsSignUp] = useState(false);

  const { signIn, createUser } = useAuthSession();

  return (
    // Prevents keyboard going over textfields
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-50}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Dismisses the keyboard when clicking outside the keybaord area */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.mainContainer}>
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
                textDecorationLine: "underline",
              }}
            >
              {isSignUp ? "Innlogging" : "Ny bruker?     Register her!"}
            </Text>
          </Pressable>

          {/* Submit button */}
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.primaryButton}
              onPress={() => {
                if (isSignUp) {
                  createUser(userEmail, password, userName);
                } else {
                  signIn(userEmail, password);
                }
              }}
            >
              <Text
                style={{
                  color: "black",
                }}
              >
                {isSignUp ? "Registrer bruker" : "Bekreft"}
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Authentication;

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    width: "100%",
  },
  
  // Buttons
  buttonContainer: {
    width: "110%",
    paddingHorizontal: 16,
    paddingTop: 32,
    gap: 16,
    position: "absolute",
    bottom: 20,
  },
  primaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#e1e0e0ff",
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

  // Text fields
  textFieldContainer: {
    width: "100%",
    paddingTop: 16,
  },
  textField: {
    borderWidth: 0.25,
    padding: 10,
    marginTop: 6,
    borderColor: "gray",
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
});
