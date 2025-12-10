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
				</Pressable>
			)}

			{/* Edit profile modal */}
			{/* TODO: Modal needs to be moved to components */}
			<Modal
				visible={modalVisible}
				transparent={true}
				animationType="fade"
			>
				<View style={style.modalOverlay}>
					<LinearGradient
						colors={["#FFE5EC", "#E3F2FD"]}
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
								<Text style={style.avatarText}>{initials}</Text>
							</View>
							<Text style={style.modalName}>{user?.name}</Text>
						</View>

						{/* Telephone field */}
						<View style={style.fieldRow}>
							<View style={style.iconContainer}>
								<Feather name="phone" size={20} color={Colors.primaryPurple} />
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

			{/* Sign out button */}
			<Pressable onPress={signOut}>
				<Text>Logg ut</Text>
			</Pressable>
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
	// Profile card
	profileCard: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 10,
		padding: 20,
		marginBottom: 24,
		gap: 12,
		backgroundColor: Colors.variationWhite,
		width: "80%",
		minHeight: "10%",
	},
	avatar: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: Colors.primaryPurple,
		justifyContent: "center",
		alignItems: "center",
	},
	avatarText: {
		fontSize: FontSizes.H2,
    fontWeight: "400",
		color: Colors.mediumGray,
	},
	profileInfo: {
		flex: 1,
	},
	profileName: {
		fontSize: FontSizes.H3,
		color: Colors.mediumGray,
	},
	profileRole: {
		fontSize: FontSizes.H4,
		color: Colors.darkGray,
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
		marginBottom: 8,
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
		marginBottom: 16,
		gap: 16,
	},
	modalAvatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: Colors.primaryPurple,
		justifyContent: "center",
		alignItems: "center",
	},
	modalAvatarText: {
		fontSize: FontSizes.H1,
		color: "white",
	},
	modalName: {
		fontSize: FontSizes.H2,
		fontWeight: "400",
		color: Colors.primaryBlack,
		marginTop: 32,
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
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#E8E8F5",
		justifyContent: "center",
		alignItems: "center",
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
});
