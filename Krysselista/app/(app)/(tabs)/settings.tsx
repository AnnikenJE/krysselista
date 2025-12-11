//
//
// Settings page

import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Modal,
	TextInput,
	ScrollView,
} from "react-native";
import { useAuthSession } from "@/providers/authenticationContext";
import { useState } from "react";
import { FontSizes } from "@/theme/fontSize";
import { Colors } from "@/theme/colors";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SettingsScreen() {
	const { user, signOut } = useAuthSession();
	const [modalVisible, setModalVisible] = useState(false);
	const [editEmail, setEditEmail] = useState(user?.email || "");
	const [editPhone, setEditPhone] = useState(user?.phone || "");

	const [selectedLanguage, setSelectedLanguage] = useState("Norsk Bokmål");

	const [privacyModalVisible, setPrivacyModalVisible] = useState(false);

	const isEmployee = Boolean(user?.isEmployee);
	const initials = user?.name ? user?.name.charAt(0).toUpperCase() : "?";

	const handleSaveChanges = () => {
		setModalVisible(false);
		// TODO: Implement save changes functionality
		setModalVisible(false);
	};

	return (
		<LinearGradient colors={["#FFE5EC", "#E3F2FD"]} style={{ flex: 1 }}>
			<View style={style.container}>
				{/* Employee profile with editing functionality */}
				{isEmployee && (
					<View style={style.cardContainer}>
						<Pressable
							style={style.profileCard}
							onPress={() => setModalVisible(true)}
						>
							<View style={style.avatar}>
								<Text style={style.avatarText}>{initials}</Text>
							</View>
							<View style={style.profileInfo}>
								<Text style={style.profileName}>{user?.name}</Text>
								<Text style={style.profileRole}>Ansatt</Text>
							</View>
							<Feather name="chevron-right" size={24} color={Colors.darkGray} />
						</Pressable>
					</View>
				)}

				{/* Edit profile modal */}
				{/* TODO: Modal needs to be moved to components */}
				<Modal visible={modalVisible} transparent={true} animationType="fade">
					<View style={style.modalOverlay}>
						<LinearGradient
							colors={["#E3F2FD", "#FFE5EC"]}
							style={style.modalContent}
						>
							<View style={style.modalHeader}>
								<Pressable onPress={handleSaveChanges}>
									<Feather name="x" size={24} color={Colors.darkGray} />
								</Pressable>
							</View>

							{/* Avatar and name */}
							<View style={style.modalAvatarContainer}>
								<View style={style.modalAvatar}>
									<Text style={style.modalAvatarText}>{initials}</Text>
								</View>
								<Text style={style.modalName}>{user?.name}</Text>
							</View>

							{/* Telephone field */}
							<View style={style.fieldRow}>
								<View style={style.iconContainer}>
									<Feather
										name="phone"
										size={20}
										color={Colors.primaryPurple}
									/>
								</View>
								<View style={style.fieldContent}>
									<Text style={style.fieldLabel}>Telefon</Text>
									<TextInput
										style={style.fieldInput}
										value={editPhone}
										onChangeText={setEditPhone}
										placeholder="Telefonnummer"
										placeholderTextColor={Colors.lightGray}
									/>
								</View>
								<Feather name="edit-2" size={16} color={Colors.primaryPurple} />
							</View>

							{/* E-post field */}
							<View style={style.fieldRow}>
								<View style={style.iconContainer}>
									<Feather name="mail" size={20} color={Colors.primaryPurple} />
								</View>
								<View style={style.fieldContent}>
									<Text style={style.fieldLabel}>E-post</Text>
									<TextInput
										style={style.fieldInput}
										value={editEmail}
										onChangeText={setEditEmail}
										placeholder="E-post"
										placeholderTextColor={Colors.lightGray}
									/>
								</View>
								<Feather name="edit-2" size={16} color={Colors.primaryPurple} />
							</View>
						</LinearGradient>
					</View>
				</Modal>

				{/* Language selection */}
				<View style={style.cardContainer}>
					<View style={style.settingsSection}>
						<View style={style.settingsHeader}>
							<View style={style.iconContainer}>
								<Feather name="globe" size={20} color={Colors.primaryPurple} />
							</View>
							<Text style={style.settingsTitle}>Språk</Text>
						</View>

						<Pressable
							style={[
								style.languageOption,
								selectedLanguage === "Norsk Bokmål" &&
									style.languageOptionSelected,
							]}
							onPress={() => setSelectedLanguage("Norsk Bokmål")}
						>
							<Text
								style={[
									style.languageOptionText,
									selectedLanguage === "Norsk Bokmål" &&
										style.languageOptionTextSelected,
								]}
							>
								Norsk Bokmål
							</Text>
							{selectedLanguage === "Norsk Bokmål" && (
								<Feather name="check" size={20} color={Colors.variationWhite} />
							)}
						</Pressable>

						<View style={style.languageDivider} />

						<Pressable
							style={[
								style.languageOption,
								selectedLanguage === "Norsk Nynorsk" &&
									style.languageOptionSelected,
							]}
							onPress={() => setSelectedLanguage("Norsk Nynorsk")}
						>
							<Text
								style={[
									style.languageOptionText,
									selectedLanguage === "Norsk Nynorsk" &&
										style.languageOptionTextSelected,
								]}
							>
								Norsk Nynorsk
							</Text>
							{selectedLanguage === "Norsk Nynorsk" && (
								<Feather name="check" size={20} color={Colors.variationWhite} />
							)}
						</Pressable>

						<View style={style.languageDivider} />

						<Pressable
							style={[
								style.languageOption,
								selectedLanguage === "English" && style.languageOptionSelected,
							]}
							onPress={() => setSelectedLanguage("English")}
						>
							<Text
								style={[
									style.languageOptionText,
									selectedLanguage === "English" &&
										style.languageOptionTextSelected,
								]}
							>
								English
							</Text>
							{selectedLanguage === "English" && (
								<Feather name="check" size={20} color={Colors.variationWhite} />
							)}
						</Pressable>
					</View>
				</View>

				{/* FAQ */}

				{/* Privacy Policy */}
				<View style={style.cardContainer}>
					<Pressable
						style={style.privacyButton}
						onPress={() => setPrivacyModalVisible(true)}
					>
						<View style={style.iconContainer}>
							<Feather name="shield" size={20} color={Colors.variationPurple} />
						</View>
						<Text style={style.settingsTitle}>Personvern</Text>
            <View style={{ flex: 1 }} />
            <Feather name="chevron-right" size={24} color={Colors.darkGray} />
					</Pressable>
				</View>

				{/* Privacy Policy Modal */}
				<Modal
					visible={privacyModalVisible}
					transparent={true}
					animationType="slide"
				>
					<View style={style.modalOverlay}>
						<LinearGradient
							colors={["#E3F2FD", "#FFE5EC"]}
							style={style.privacyModalContent}
						>
							<View style={style.modalHeader}>
								<Pressable onPress={() => setPrivacyModalVisible(false)}>
									<Feather name="x" size={24} color={Colors.darkGray} />
								</Pressable>
							</View>

							<ScrollView style={style.privacyContent}>
								<Text style={style.privacyTitle}>Personvern</Text>
								<Text style={style.privacySectionTitle}>1. Innledning</Text>
								<Text style={style.privacyText}>
									Velkommen til Krysselista! 
								</Text>
                <Text style={style.privacyText}>
                  Vi tar ditt personvern på alvor og
									forplikter oss til å beskytte dine personopplysninger. Denne
									personvernerklæringen forklarer hvordan vi samler inn, bruker
									og beskytter dine data når du bruker denne appen.
                  </Text>

								<Text style={style.privacySectionTitle}>
									2. Informasjon vi samler inn
								</Text>

								<Text style={style.privacyText}>
									Vi samler inn følgende typer informasjon:
								</Text>
								<Text style={style.privacyText}>
									Mer kommer senere...
								</Text>
							</ScrollView>
						</LinearGradient>
					</View>
				</Modal>

				{/* Sign out button */}
				<View style={style.cardContainer}>
					<Pressable style={style.logoutButton} onPress={signOut}>
						<Feather name="log-out" size={20} color={Colors.statusDarkRed} />
						<Text style={style.logoutText}>Logg ut</Text>
					</Pressable>
				</View>
			</View>
		</LinearGradient>
	);
}

// Styles
const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	cardContainer: {
		backgroundColor: Colors.variationWhite,
		borderRadius: 20,
		marginBottom: 16,
		width: "85%",
		shadowColor: Colors.darkGray,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	settingsTitle: {
		fontSize: FontSizes.H2,
		fontWeight: "400",
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.lightGray,
		justifyContent: "center",
		alignItems: "center",
	},
	settingsSection: {
		padding: 16,
	},
	settingsHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 16,
	},

	// Profile card
	profileCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		gap: 16,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: Colors.primaryPurple,
		justifyContent: "center",
		alignItems: "center",
		borderColor: Colors.primaryWhite,
		borderWidth: 2,
		shadowColor: Colors.darkGray,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	avatarText: {
		fontSize: FontSizes.H2,
		fontWeight: "400",
		color: Colors.lightGray,
	},
	profileInfo: {
		flex: 1,
	},
	profileName: {
		fontSize: FontSizes.H2,
		fontWeight: "400",
		color: Colors.primaryBlack,
	},
	profileRole: {
		fontSize: FontSizes.H3,
		color: Colors.darkGray,
		marginTop: -24,
	},

	// Modal
	modalOverlay: {
		flex: 1,
		backgroundColor: Colors.darkGray,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		borderRadius: 20,
		padding: 24,
		width: "85%",
		maxHeight: "40%",
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	modalTitle: {
		fontSize: FontSizes.H2,
		color: Colors.primaryBlack,
	},
	closeButton: {
		width: 40,
		height: 40,
	},
	modalAvatarContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 9,
		gap: 16,
	},
	modalAvatar: {
		width: 90,
		height: 90,
		borderRadius: 45,
		backgroundColor: Colors.primaryPurple,
		justifyContent: "center",
		alignItems: "center",
		borderColor: Colors.primaryWhite,
		borderWidth: 4,
		shadowColor: Colors.darkGray,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	modalAvatarText: {
		fontSize: FontSizes.H1,
		fontWeight: "600",
		color: Colors.lightGray,
	},
	modalName: {
		fontSize: FontSizes.H2,
		fontWeight: "400",
		color: Colors.primaryBlack,
		marginTop: 40,
	},
	fieldRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 12,
		backgroundColor: Colors.variationWhite,
		borderRadius: 12,
		padding: 8,
		gap: 12,
		shadowColor: Colors.darkGray,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},

	fieldContent: {
		flex: 1,
	},
	fieldLabel: {
		fontSize: FontSizes.H4,
		color: Colors.mediumGray,
		marginBottom: 2,
	},
	fieldInput: {
		fontSize: FontSizes.H3,
		color: Colors.primaryBlack,
		padding: 0,
	},

	// Language selection
	languageOption: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderRadius: 20,
	},
	languageOptionText: {
		fontWeight: "400",
		fontSize: FontSizes.H3,
		color: Colors.primaryBlack,
	},
	languageOptionSelected: {
		backgroundColor: Colors.variationPurple,
	},
	languageOptionTextSelected: {
		color: Colors.primaryWhite,
		fontWeight: "600",
	},
	languageDivider: {
		height: 1,
		backgroundColor: Colors.lightGray,
		marginHorizontal: 16,
	},

	// Logout button
	logoutButton: {
		flexDirection: "row",
		justifyContent: "center",
		padding: 16,
		backgroundColor: Colors.statusLightRed,
		alignItems: "center",
		borderColor: Colors.statusDarkRed,
		borderWidth: 4,
		borderRadius: 12,
		gap: 8,
	},
	logoutText: {
		color: Colors.statusDarkRed,
		fontWeight: "600",
		fontSize: FontSizes.H3,
	},

	// FAQ

	// Privacy Policy
	privacyButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		gap: 8,
	},
	privacyModalContent: {
		borderRadius: 20,
		padding: 24,
		width: "85%",
		height: "85%",
		alignSelf: "center",
	},
	privacyContent: {
		marginTop: 16,
	},
	privacyTitle: {
		fontSize: FontSizes.H2,
		fontWeight: "600",
		color: Colors.primaryBlack,
		marginBottom: 16,
	},
	privacySectionTitle: {
		fontSize: FontSizes.H3,
		fontWeight: "600",
		color: Colors.primaryBlack,
		marginTop: 12,
		marginBottom: 8,
	},
	privacyText: {
		fontSize: FontSizes.H4,
		color: Colors.primaryBlack,
		lineHeight: 20,
		marginBottom: 12,
	},
});
