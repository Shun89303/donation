import AnimatedPressable from "@/components/common/AnimatedPressable";
import BackButton from "@/components/common/BackButton";
import BackTitleHeader from "@/components/common/BackTitleHeader";
import FadeScreen from "@/components/common/FadeScreen";
import HeaderTitle from "@/components/common/HeaderTitle";
import Input from "@/components/common/Input";
import SettingRow from "@/components/common/SettingRow";
import { getInitials } from "@/components/profile/profileUtils";
import { useToast } from "@/contexts/ToastContext";
import { usePickFile } from "@/hooks/usePickFile";
import { useTheme } from "@/hooks/useTheme";
import { useUserStore } from "@/stores/userStore";
import globalStyles from "@/styles/styles";
import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import { Camera, ChevronRight, Lock, Phone, User } from "lucide-react-native";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfile() {
	const { showToast } = useToast();
	const colors = useTheme();
	const router = useRouter();
	const { userProfile, updateProfile } = useUserStore.getState();
	const [profileImage, setProfileImage] = useState(userProfile.profileImageUri);
	const [fullName, setFullName] = useState(userProfile.name);
	const [bio, setBio] = useState(userProfile.bio);
	const [isSaving, setIsSaving] = useState(false);
	const initials = getInitials(userProfile.name || "Maung Chan Aye");

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

	const handleChangePassword = () => router.push("/changePassword");
	const handleChangePhone = () => router.push("/changePhoneNumber");

	return (
		<FadeScreen>
			<SafeAreaView
				style={[
					styles.container,
					{
						backgroundColor: colors.appBackground,
					},
				]}
			>
				{/* Header */}
				<BackTitleHeader>
					<BackButton onPress={() => router.back()} />
					<HeaderTitle title="Edit Profile" />
				</BackTitleHeader>

				<ScrollView
					contentContainerStyle={{
						padding: metrics.spacingMedium,
						gap: metrics.spacingSmall,
					}}
				>
					{/* Profile Image */}
					<AnimatedPressable
						style={[
							styles.profileImageContainer,
							{
								marginBottom: metrics.spacingLarge,
								width: metrics.square100,
								height: metrics.square100,
								backgroundColor: colors.secondaryGreen,
								borderRadius: metrics.borderRadiusXLarge,
							},
						]}
						onPress={handlePickImage}
					>
						{profileImage ? (
							<Image
								source={{ uri: profileImage }}
								style={{
									width: metrics.square100,
									height: metrics.square100,
									borderRadius: metrics.borderRadiusLarge,
									resizeMode: "cover",
								}}
							/>
						) : (
							<View style={[styles.placeholder]}>
								<Text
									style={{
										color: colors.primaryGreen,
										fontSize: metrics.fontExtraLarge,
										fontWeight: "700",
									}}
								>
									{initials}
								</Text>
							</View>
						)}

						{/* Camera icon overlay */}
						<View
							style={[
								styles.cameraIconContainer,
								{
									backgroundColor: colors.primaryGreen,
									bottom: metrics.bottomExtraSmall,
									right: metrics.rightExtraSmall,
									borderRadius: 99,
									padding: metrics.spacingExtraSmall,
								},
							]}
						>
							<Camera size={metrics.iconMediumLarge} color="#fff" />
						</View>
					</AnimatedPressable>

					{/* Info Container */}
					<View
						style={[
							styles.infoContainer,
							{
								padding: metrics.spacingMedium,
								borderRadius: metrics.borderRadiusLarge,
								marginBottom: metrics.spacingLarge,
								backgroundColor: colors.background,
								borderWidth: 1,
								borderColor: colors.secondaryGray,
								// gap: metrics.spacingMedium,
								...globalStyles.shadows,
							},
						]}
					>
						{/* Full Name */}
						<Text
							style={[
								styles.label,
								{
									color: colors.primaryGray,
								},
							]}
						>
							Full Name
						</Text>
						<View>
							<Input
								label="Enter your name"
								value={fullName}
								onChange={setFullName}
								icon={
									<User
										size={metrics.iconMediumLarge}
										color={colors.primaryGray}
									/>
								}
								colors={colors}
							/>
						</View>

						{/* Phone Number */}
						<Text
							style={[
								styles.label,
								{
									color: colors.primaryGray,
								},
							]}
						>
							Phone Number
						</Text>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "flex-start",
								backgroundColor: colors.secondaryGray,
								paddingHorizontal: metrics.spacingMedium,
								borderRadius: metrics.borderRadiusMedium,
							}}
						>
							<Phone
								size={metrics.iconMediumLarge}
								color={colors.primaryGray}
							/>
							<Text
								style={[
									styles.phone,
									{
										color: colors.text,
									},
								]}
							>
								{phoneNumber}
							</Text>
						</View>

						{/* Bio */}
						<Text
							style={[
								styles.label,
								{
									color: colors.primaryGray,
									marginTop: metrics.spacingMedium,
								},
							]}
						>
							Bio
						</Text>
						<Input
							label="Tell us about yourself..."
							value={bio}
							onChange={setBio}
							multiline
							colors={colors}
						/>
					</View>

					{/* Settings List */}
					<View
						style={[
							styles.settingsCard,
							{
								borderColor: colors.secondaryGray,
								backgroundColor: colors.background,
								...globalStyles.shadows,
							},
						]}
					>
						<SettingRow
							icon={Lock}
							label="Change Password"
							onPress={handleChangePassword}
							isLast={false}
							trailing={
								<ChevronRight
									size={metrics.iconMedium}
									color={colors.primaryGray}
								/>
							}
						/>
						<SettingRow
							icon={Phone}
							label="Change Phone Number"
							onPress={handleChangePhone}
							isLast={true}
							trailing={
								<ChevronRight
									size={metrics.iconMedium}
									color={colors.primaryGray}
								/>
							}
						/>
					</View>
				</ScrollView>

				{/* Save Button */}
				<AnimatedPressable
					style={[
						styles.saveButton,
						{
							backgroundColor: colors.primaryGreen,
							width: "90%",
							alignSelf: "center",
							borderRadius: metrics.borderRadiusLarge,
							marginBottom: metrics.spacingMedium,
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
				{/* <BottomToast
					visible
					message="Test"
					onHide={() => {}}
					autoHide={false}
				/> */}
			</SafeAreaView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	profileImageContainer: {
		alignSelf: "center",

		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	cameraIconContainer: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
	},
	placeholder: { justifyContent: "center", alignItems: "center", flex: 1 },
	infoContainer: {
		backgroundColor: "#f9f9f9",
	},
	label: {
		fontSize: metrics.fontLarge,
		marginBottom: metrics.spacingSmall,
		fontWeight: "500",
	},
	phone: {
		paddingVertical: metrics.spacingMedium,
		paddingHorizontal: metrics.spacingMedium,
		fontSize: metrics.fontMedium,
		fontWeight: "500",
	},
	settingsCard: {
		borderRadius: metrics.borderRadiusLarge,
		borderWidth: 1,
		overflow: "hidden",
		marginBottom: metrics.spacingLarge,
	},
	saveButton: {
		padding: metrics.spacingLarge,
		justifyContent: "center",
		alignItems: "center",
	},
	saveButtonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: metrics.fontLarge,
	},
});
