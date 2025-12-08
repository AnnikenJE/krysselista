import { useAuthSession } from "@/providers/authenticationContext";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
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
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);
	const [isEmployee, setIsEmployee] = useState(false);
	const { signIn, createUser } = useAuthSession();

	return (
		// Prevents keyboard going over textfields
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={-50}
			style={{
				flex: 1,
			}}
		>
			{/* Dismisses the keyboard when clicking outside the keybaord area */}
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
											!isEmployee && styles.userTypeButtonSelected,
										]}
										onPress={() => setIsEmployee(false)}
									>
										<Text style={styles.userTypeText}>Foresatt</Text>
									</Pressable>

									<Pressable
										style={[
											styles.userTypeButton,
											isEmployee && styles.userTypeButtonSelected,
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
									{isSignUp
										? "Har bruker? Logg inn!"
										: "Ny bruker? Register her!"}
								</Text>
							</Pressable>

							{/* Submit button */}
							<View style={styles.buttonContainer}>
								<Pressable
									style={styles.primaryButton}
									onPress={async () => {
										if (isSignUp) {
											// if(!isEmployee) {
											//   Alert.alert("Vennligst velg rolle");
											//   return;
											// }
											await createUser(
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
										}}
									>
										{isSignUp ? "Registrer bruker" : "Logg inn"}
									</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</LinearGradient>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
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
		marginTop: 55,
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
	},
	primaryButton: {
		paddingHorizontal: 14,
		paddingVertical: 14,
		borderRadius: 10,
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

	textFieldContainer: {
		width: "100%",
		paddingTop: 16,
	},
	textField: {
		borderWidth: 0.25,
		padding: 10,
		marginTop: 6,
		borderColor: "gray",
		borderRadius: 10,
		backgroundColor: "#f5f5f5",
	},
	userTypeButton: {
		paddingVertical: 16,
		paddingHorizontal: 24,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ccc",
	},
	userTypeButtonSelected: {
		backgroundColor: "#745FEF",
	},
	userTypeText: {
		color: "#000",
	},
});
