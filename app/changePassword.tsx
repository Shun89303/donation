import AnimatedPressable from "@/components/common/AnimatedPressable";
import BackButton from "@/components/common/BackButton";
import BackTitleHeader from "@/components/common/BackTitleHeader";
import FadeScreen from "@/components/common/FadeScreen";
import HeaderTitle from "@/components/common/HeaderTitle";
import { useToast } from "@/contexts/ToastContext";
import { useTheme } from "@/hooks/useTheme";
import { useUserStore } from "@/stores/userStore";
import globalStyles from "@/styles/styles";
import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import { AlertCircle, Eye, EyeOff, Lock } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePassword() {
	const router = useRouter();
	const colors = useTheme();
	const { showToast } = useToast();

	const userProfile = useUserStore((s) => s.userProfile);
	const updateProfile = useUserStore((s) => s.updateProfile);

	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showCurrent, setShowCurrent] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const TEST_CURRENT_PASSWORD = "1234"; // for local testing

	// Validation checks
	const newPasswordError = useMemo(() => {
		if (newPassword && newPassword.length < 8)
			return "Password must be at least 8 characters";
		return "";
	}, [newPassword]);

	const confirmPasswordError = useMemo(() => {
		if (confirmPassword && newPassword !== confirmPassword)
			return "Passwords do not match";
		return "";
	}, [newPassword, confirmPassword]);

	const isFormValid = useMemo(() => {
		return (
			currentPassword.length > 0 &&
			newPassword.length >= 8 &&
			newPassword === confirmPassword
		);
	}, [currentPassword, newPassword, confirmPassword]);

	const handleUpdatePassword = () => {
		if (currentPassword !== TEST_CURRENT_PASSWORD) {
			alert("Current password is incorrect");
			return;
		}
		updateProfile({ password: newPassword });
		showToast("Password updated successfully!");
		router.back();
		setCurrentPassword("");
		setNewPassword("");
		setConfirmPassword("");
	};

	return (
		<FadeScreen>
			<SafeAreaView
				style={{
					backgroundColor: colors.appBackground,
				}}
			>
				{/* Header */}
				<BackTitleHeader>
					<BackButton onPress={() => router.back()} />
					<HeaderTitle title="Change Password" />
				</BackTitleHeader>

				<ScrollView
					contentContainerStyle={[
						styles.container,
						{
							padding: metrics.spacingMedium,
						},
					]}
				>
					{/* Input Container */}
					<View
						style={{
							backgroundColor: colors.background,
							padding: metrics.spacingMedium,
							borderRadius: metrics.borderRadiusLarge,
							marginBottom: metrics.spacingLarge,
							borderWidth: 1,
							borderColor: colors.secondaryGray,
							...globalStyles.shadows,
						}}
					>
						{/* Current Password */}
						<View style={styles.inputWrapper}>
							<Text style={styles.inputLabel}>Current Password</Text>
							<View
								style={[
									styles.inputRow,
									{
										backgroundColor: colors.secondaryGray,
									},
								]}
							>
								<Lock
									size={metrics.iconMediumLarge}
									style={[styles.icon]}
									color={colors.primaryGray}
								/>
								<TextInput
									style={[styles.input]}
									value={currentPassword}
									onChangeText={setCurrentPassword}
									secureTextEntry={!showCurrent}
									placeholder="Enter current password"
								/>
								<TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
									{showCurrent ? (
										<EyeOff
											size={metrics.iconMediumLarge}
											color={colors.primaryGray}
										/>
									) : (
										<Eye
											size={metrics.iconMediumLarge}
											color={colors.primaryGray}
										/>
									)}
								</TouchableOpacity>
							</View>
						</View>

						{/* New Password */}
						<View style={styles.inputWrapper}>
							<Text style={styles.inputLabel}>New Password</Text>
							<View
								style={[
									styles.inputRow,
									{
										backgroundColor: colors.secondaryGray,
									},
								]}
							>
								<Lock
									size={metrics.iconMediumLarge}
									style={styles.icon}
									color={colors.primaryGray}
								/>
								<TextInput
									style={[
										styles.input,
										{
											borderRadius: metrics.borderRadiusMedium,
										},
									]}
									value={newPassword}
									onChangeText={setNewPassword}
									secureTextEntry={!showNew}
									placeholder="Enter new password"
								/>
								<TouchableOpacity onPress={() => setShowNew(!showNew)}>
									{showNew ? (
										<EyeOff
											size={metrics.iconMediumLarge}
											color={colors.primaryGray}
										/>
									) : (
										<Eye
											size={metrics.iconMediumLarge}
											color={colors.primaryGray}
										/>
									)}
								</TouchableOpacity>
							</View>
						</View>

						{/* Confirm New Password */}
						<View style={styles.inputWrapper}>
							<Text style={styles.inputLabel}>Confirm New Password</Text>
							<View
								style={[
									styles.inputRow,
									{
										backgroundColor: colors.secondaryGray,
									},
								]}
							>
								<Lock
									size={metrics.iconMediumLarge}
									style={styles.icon}
									color={colors.primaryGray}
								/>
								<TextInput
									style={[
										styles.input,
										{
											borderRadius: metrics.borderRadiusMedium,
										},
									]}
									value={confirmPassword}
									onChangeText={setConfirmPassword}
									secureTextEntry={!showConfirm}
									placeholder="Confirm new password"
								/>
								<TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
									{showConfirm ? (
										<EyeOff
											size={metrics.iconMediumLarge}
											color={colors.primaryGray}
										/>
									) : (
										<Eye
											size={metrics.iconMediumLarge}
											color={colors.primaryGray}
										/>
									)}
								</TouchableOpacity>
							</View>
						</View>
					</View>

					{/* Validation Messages */}
					{confirmPasswordError ? (
						<View style={styles.errorRow}>
							<AlertCircle
								size={metrics.iconMedium}
								style={styles.errorIcon}
								color={colors.primaryRed}
							/>
							<Text
								style={[
									styles.errorText,
									{
										color: colors.primaryRed,
									},
								]}
							>
								{confirmPasswordError}
							</Text>
						</View>
					) : null}
					{newPasswordError ? (
						<View style={styles.errorRow}>
							<AlertCircle
								size={metrics.iconMedium}
								style={styles.errorIcon}
								color={colors.primaryGray}
							/>
							<Text
								style={[
									styles.errorText,
									{
										color: colors.primaryGray,
									},
								]}
							>
								{newPasswordError}
							</Text>
						</View>
					) : null}

					{/* Buttons */}
					<AnimatedPressable
						style={[
							styles.updateButton,
							{
								backgroundColor: colors.primaryGreen,
								opacity: isFormValid ? 1 : 0.5,
							},
						]}
						onPress={handleUpdatePassword}
						disabled={!isFormValid}
					>
						<Text style={styles.updateButtonText}>Update Password</Text>
					</AnimatedPressable>
					<AnimatedPressable onPress={() => router.push("/forgotPassword")}>
						<Text
							style={[
								styles.forgotText,
								{
									color: colors.primaryGreen,
								},
							]}
						>
							Forgot your password?
						</Text>
					</AnimatedPressable>
				</ScrollView>
			</SafeAreaView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: metrics.spacingLarge,
	},
	title: {
		fontWeight: "bold",
	},
	inputWrapper: {
		marginBottom: metrics.spacingLarge,
	},
	inputLabel: {
		fontSize: metrics.fontLarge,
		marginBottom: metrics.spacingSmall,
		fontWeight: "400",
	},
	inputRow: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: metrics.borderRadiusMedium,
		paddingHorizontal: metrics.spacingLarge,
	},
	icon: {
		marginRight: metrics.spacingSmall,
	},
	input: {
		flex: 1,
		height: metrics.inputHeight.singleLineMedium,
		fontSize: metrics.fontMedium,
		fontWeight: "500",
	},
	errorRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: metrics.spacingMedium,
	},
	errorIcon: {
		marginRight: metrics.spacingSmall,
	},
	errorText: {
		fontSize: metrics.fontSmall,
		fontWeight: "500",
	},
	updateButton: {
		paddingVertical: metrics.spacingMedium,
		borderRadius: metrics.borderRadiusLarge,
		alignItems: "center",
		marginVertical: metrics.spacingMedium,
	},
	updateButtonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: metrics.fontLarge,
	},
	forgotText: {
		textAlign: "center",
		fontWeight: "500",
		fontSize: metrics.fontSmall,
	},
});
