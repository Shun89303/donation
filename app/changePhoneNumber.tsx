import BackButton from "@/components/common/BackButton";
import FadeScreen from "@/components/common/FadeScreen";
import { useToast } from "@/contexts/ToastContext";
import { useTheme } from "@/hooks/useTheme";
import globalStyles from "@/styles/styles";
import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import { Info, Lock, Phone } from "lucide-react-native";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePhoneNumber() {
	const router = useRouter();
	const colors = useTheme();
	const { showToast } = useToast();

	const [newNumber, setNewNumber] = useState("");
	const [verificationCode, setVerificationCode] = useState("");
	const [showVerification, setShowVerification] = useState(false);

	const currentNumber = "+1 234 567 8901"; // example current number

	const canSendCode = newNumber.replace(/\D/g, "").length >= 9;
	const canVerify = verificationCode.length === 6;

	const handleSendCode = () => setShowVerification(true);
	const handleVerifyUpdate = () => {
		router.back();
		showToast("Phone number updated successfully");
	};

	return (
		<FadeScreen>
			<SafeAreaView style={{ flex: 1 }}>
				<View
					style={[
						styles.container,
						{
							backgroundColor: colors.appBackground,
						},
					]}
				>
					{/* Header */}
					<View style={styles.header}>
						<BackButton onPress={() => router.back()} />
						<Text style={styles.headerTitle}>Change Phone Number</Text>
					</View>

					{/* Info Box */}
					<View
						style={[
							styles.infoBox,
							{
								backgroundColor: colors.secondaryGreen,
								borderColor: colors.darkGreen,
							},
						]}
					>
						<Info size={metrics.iconMediumXL} color={colors.primaryGreen} />
						<Text
							style={[
								styles.infoText,
								{
									color: colors.text,
									fontSize: metrics.fontMedium,
									fontWeight: "400",
								},
							]}
						>
							You can change your phone number once every{" "}
							<Text style={{ fontWeight: "800" }}>30 days</Text>. An OTP will be
							sent to verify your new number.
						</Text>
					</View>

					{/* Inputs Container */}
					<View
						style={[
							styles.inputContainer,
							{
								backgroundColor: colors.background,
								padding: metrics.spacingMedium,
								borderRadius: metrics.borderRadiusLarge,
								borderColor: colors.secondaryGray,
								borderWidth: 1,
								...globalStyles.shadows,
							},
						]}
					>
						{/* Current Number */}
						<Text
							style={[
								styles.inputLabel,
								{
									color: colors.primaryGray,
								},
							]}
						>
							CURRENT NUMBER
						</Text>
						<View
							style={[
								styles.inputWrapper,
								{
									backgroundColor: colors.secondaryGray,
								},
							]}
						>
							<Phone
								size={metrics.iconMediumLarge}
								color={colors.primaryGray}
								style={styles.inputIcon}
							/>
							<TextInput
								style={[
									styles.input,
									{
										color: colors.primaryGray,
										fontSize: metrics.fontMedium,
										fontWeight: "500",
										height: metrics.inputHeight.singleLineMedium,
									},
								]}
								value={currentNumber}
								editable={false}
								placeholder="Current Number"
							/>
						</View>

						{/* New Number */}
						<Text
							style={[
								styles.inputLabel,
								{
									color: colors.primaryGray,
								},
							]}
						>
							NEW PHONE NUMBER
						</Text>
						<View
							style={[
								styles.inputWrapper,
								{
									backgroundColor: colors.secondaryGray,
								},
							]}
						>
							<Phone
								size={metrics.iconMediumLarge}
								color={colors.primaryGray}
								style={styles.inputIcon}
							/>
							<TextInput
								style={[
									styles.input,
									{
										color: colors.primaryGray,
										fontSize: metrics.fontMedium,
										fontWeight: "500",
										height: metrics.inputHeight.singleLineMedium,
									},
								]}
								placeholder="Enter new phone number"
								keyboardType="phone-pad"
								value={newNumber}
								onChangeText={setNewNumber}
							/>
						</View>

						{/* Verification Code (conditionally rendered) */}
						{showVerification && (
							<>
								<Text
									style={[
										styles.inputLabel,
										{
											color: colors.primaryGray,
										},
									]}
								>
									VERIFICATION CODE
								</Text>
								<View
									style={[
										styles.inputWrapper,
										{
											backgroundColor: colors.secondaryGray,
										},
									]}
								>
									<Lock
										size={metrics.iconMediumLarge}
										color={colors.primaryGray}
										style={styles.inputIcon}
									/>
									<TextInput
										style={[
											styles.input,
											{
												color: colors.primaryGray,
												fontSize: metrics.fontMedium,
												fontWeight: "500",
												height: metrics.inputHeight.singleLineMedium,
											},
										]}
										placeholder="Enter verification code"
										keyboardType="number-pad"
										maxLength={6}
										value={verificationCode}
										onChangeText={setVerificationCode}
									/>
								</View>
							</>
						)}
					</View>

					{/* Buttons */}
					{!showVerification ? (
						<TouchableOpacity
							style={[
								styles.button,
								!canSendCode && styles.buttonDisabled,
								{
									backgroundColor: colors.primaryGreen,
								},
							]}
							disabled={!canSendCode}
							onPress={handleSendCode}
						>
							<Text style={styles.buttonText}>Send Verification Code</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={[
								styles.button,
								!canVerify && styles.buttonDisabled,
								{
									backgroundColor: colors.primaryGreen,
								},
							]}
							disabled={!canVerify}
							onPress={handleVerifyUpdate}
						>
							<Text style={styles.buttonText}>Verify & Update</Text>
						</TouchableOpacity>
					)}
				</View>
			</SafeAreaView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: metrics.spacingMedium,
		gap: metrics.spacingMedium,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: metrics.spacingMedium,
	},
	headerTitle: {
		fontSize: metrics.fontLarge,
		fontWeight: "bold",
		marginLeft: metrics.spacingMedium,
	},

	infoBox: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: metrics.borderRadiusLarge,
		marginBottom: metrics.spacingMedium,
		borderWidth: 1,
		paddingHorizontal: metrics.spacingLarge,
		paddingVertical: metrics.spacingMedium,
	},
	infoText: { marginLeft: metrics.spacingSmall, flex: 1 },

	inputContainer: { marginBottom: metrics.spacingMedium },
	inputLabel: {
		fontSize: metrics.fontMedium,
		marginBottom: metrics.spacingMedium,
		marginTop: metrics.spacingMedium,
		fontWeight: "500",
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: metrics.borderRadiusLarge,
		paddingHorizontal: metrics.spacingMedium,
	},
	inputIcon: { marginRight: metrics.spacingSmall },
	input: { flex: 1 },

	button: {
		padding: metrics.spacingMedium,
		borderRadius: metrics.borderRadiusLarge,
		alignItems: "center",
	},
	buttonDisabled: { opacity: 0.5 },
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: metrics.fontMedium,
	},
});
