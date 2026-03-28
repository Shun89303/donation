import AnimatedPressable from "@/components/common/AnimatedPressable";
import FadeScreen from "@/components/common/FadeScreen";
import { useToast } from "@/contexts/ToastContext";
import { usePickFile } from "@/hooks/usePickFile";
import { useTheme } from "@/hooks/useTheme";
import { useUserStore } from "@/stores/userStore";
import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import { ArrowLeft, Camera, Lock, Phone } from "lucide-react-native";
import React, { useState } from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SettingRowProps = {
	icon: React.ComponentType<{ size: number; color: string }>;
	label: string;
	onPress?: () => void;
	trailing?: React.ReactNode;
	isLast?: boolean;
};

function SettingRow({
	icon: Icon,
	label,
	onPress,
	trailing,
	isLast,
}: SettingRowProps) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.settingRow, isLast ? styles.lastSettingRow : null]}
		>
			<View style={styles.settingLeft}>
				<Icon size={metrics.iconMediumLarge} color="#333" />
				<Text style={styles.settingLabel}>{label}</Text>
			</View>
			<View style={styles.settingRight}>{trailing}</View>
		</TouchableOpacity>
	);
}

export default function EditProfile() {
	const { showToast } = useToast();
	const colors = useTheme();
	const router = useRouter();
	const { userProfile, updateProfile } = useUserStore.getState();
	const [profileImage, setProfileImage] = useState(userProfile.profileImageUri);
	const [fullName, setFullName] = useState(userProfile.name);
	const [bio, setBio] = useState(userProfile.bio);
	const [isSaving, setIsSaving] = useState(false);

	const phoneNumber = "+1 234 567 890"; // read-only

	const isChanged =
		fullName !== userProfile.name ||
		bio !== userProfile.bio ||
		profileImage !== userProfile.profileImageUri;

	const { pickFile } = usePickFile((field, uri) => {
		if (field === "profileImage") setProfileImage(uri);
	});

	const handlePickImage = () => pickFile("profileImage");

	const handleSaveChanges = async () => {
		if (!isChanged || isSaving) return;
		setIsSaving(true);

		try {
			// TODO: upload profileImage to backend if changed
			updateProfile({
				name: fullName,
				bio,
				profileImageUri: profileImage,
			});

			showToast("Profile updated successfully");
			router.back();
		} catch (err) {
			console.error(err);
		} finally {
			setIsSaving(false);
		}
	};

	const handleChangePassword = () => console.log("Change password");
	const handleChangePhone = () => console.log("Change phone number");

	return (
		<FadeScreen>
			<SafeAreaView style={styles.container}>
				{/* Header */}
				<View style={styles.header}>
					<AnimatedPressable onPress={() => router.back()}>
						<ArrowLeft size={24} color="#000" />
					</AnimatedPressable>
					<Text style={styles.headerTitle}>Edit Profile</Text>
					<View style={{ width: 24 }} />
				</View>

				<ScrollView contentContainerStyle={styles.content}>
					{/* Profile Image */}
					<AnimatedPressable
						style={styles.profileImageContainer}
						onPress={handlePickImage}
					>
						{profileImage ? (
							<Image
								source={{ uri: profileImage }}
								style={styles.profileImage}
							/>
						) : (
							<View style={styles.placeholder}>
								<Text style={{ color: "#888" }}>Add Image</Text>
							</View>
						)}

						{/* Camera icon overlay */}
						<View
							style={[
								styles.cameraIconContainer,
								{
									backgroundColor: colors.primaryGreen,
								},
							]}
						>
							<Camera size={20} color="#fff" />
						</View>
					</AnimatedPressable>

					{/* Info Container */}
					<View style={styles.infoContainer}>
						{/* Full Name */}
						<Text style={styles.label}>Full Name</Text>
						<TextInput
							style={styles.input}
							placeholder="Enter full name"
							value={fullName}
							onChangeText={setFullName}
							editable={!isSaving}
						/>

						{/* Phone Number */}
						<Text style={styles.label}>Phone Number</Text>
						<Text style={styles.phone}>{phoneNumber}</Text>

						{/* Bio */}
						<Text style={styles.label}>Bio</Text>
						<TextInput
							style={[styles.input, styles.bioInput]}
							placeholder="Write something about yourself"
							value={bio}
							onChangeText={setBio}
							multiline
							editable={!isSaving}
						/>
					</View>

					{/* Settings List */}
					<View style={styles.settingsCard}>
						<AnimatedPressable>
							<SettingRow
								icon={Lock}
								label="Change Password"
								onPress={handleChangePassword}
								isLast={false}
							/>
						</AnimatedPressable>
						<AnimatedPressable>
							<SettingRow
								icon={Phone}
								label="Change Phone Number"
								onPress={handleChangePhone}
								isLast={true}
							/>
						</AnimatedPressable>
					</View>
				</ScrollView>

				{/* Save Button */}
				<AnimatedPressable
					style={[
						styles.saveButton,
						{
							backgroundColor: colors.primaryGreen,
						},
						(!isChanged || isSaving) && { opacity: 0.5 },
					]}
					onPress={handleSaveChanges}
					disabled={!isChanged || isSaving}
				>
					<Text style={styles.saveButtonText}>
						{isSaving ? "Saving..." : "Save Changes"}
					</Text>
				</AnimatedPressable>
			</SafeAreaView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	headerTitle: {
		flex: 1,
		fontSize: 18,
		fontWeight: "bold",
	},
	content: { padding: 16 },
	profileImageContainer: {
		alignSelf: "center",
		marginBottom: 20,
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#f0f0f0",
		justifyContent: "center",
		alignItems: "center",
	},
	cameraIconContainer: {
		position: "absolute",
		bottom: 4,
		right: 4,
		borderRadius: 12,
		padding: 4,
		justifyContent: "center",
		alignItems: "center",
	},
	profileImage: { width: "100%", height: "100%" },
	placeholder: { justifyContent: "center", alignItems: "center", flex: 1 },
	infoContainer: {
		backgroundColor: "#f9f9f9",
		padding: 16,
		borderRadius: 12,
		marginBottom: 24,
	},
	label: { fontSize: 14, color: "#555", marginBottom: 4 },
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginBottom: 16,
		backgroundColor: "#fff",
	},
	bioInput: {
		height: 120, // bigger text area for bio
		textAlignVertical: "top",
	},
	phone: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		marginBottom: 16,
		color: "#333",
	},
	settingsCard: {
		borderRadius: metrics.borderRadiusLarge,
		borderWidth: 1,
		overflow: "hidden",
		marginBottom: 24,
	},
	settingRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: metrics.spacingMedium,
		paddingVertical: metrics.spacingMedium,
		borderBottomWidth: 1,
		borderColor: "#eee",
	},
	lastSettingRow: { borderBottomWidth: 0 },
	settingLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: metrics.spacingMedium,
	},
	settingRight: {
		flexDirection: "row",
		alignItems: "center",
		gap: metrics.spacingSmall,
	},
	settingLabel: { fontSize: metrics.fontLarge, fontWeight: "400" },
	saveButton: {
		padding: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
