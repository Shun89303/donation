import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import { ChevronRight, Eye, EyeOff, Lock, Phone } from "lucide-react-native";
import { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import CheckBox from "react-native-check-box";

export default function Step2CreateAccount({
	phone,
	goToStep,
	password,
	setPassword,
	agreedToTerms,
	setAgreedToTerms,
	nextStep,
}: {
	phone: string;
	goToStep: (step: number) => void;
	password: string;
	setPassword: (val: string) => void;
	agreedToTerms: boolean;
	setAgreedToTerms: (val: boolean) => void;
	nextStep: () => void;
}) {
	const colors = useTheme();
	const router = useRouter();

	const [visible, setVisible] = useState(false);

	return (
		<View style={styles.stepContainer}>
			<Text
				style={[
					styles.title,
					{
						fontSize: metrics.fontExtraLarge,
						marginBottom: metrics.spacingMedium,
						alignSelf: "flex-start",
					},
				]}
			>
				Create account
			</Text>

			<View
				style={[
					styles.inputWithIcon,
					{
						width: "100%",
						backgroundColor: colors.secondaryGray,
						borderRadius: metrics.borderRadiusMedium,
						padding: metrics.spacingSmall,
						marginBottom: metrics.spacingMedium,
					},
				]}
			>
				<Phone
					size={metrics.iconMediumLarge}
					style={{ marginRight: metrics.spacingMedium }}
				/>
				<TextInput
					placeholder={phone}
					style={{
						flex: 1,
						fontSize: metrics.fontMedium,
						fontWeight: "500",
						color: colors.primaryGray,
					}}
					editable={false}
				/>
				<TouchableOpacity onPress={() => goToStep(1)}>
					<Text
						style={{
							color: colors.primaryGreen,
							fontSize: metrics.fontMedium,
							fontWeight: "bold",
						}}
					>
						Change
					</Text>
				</TouchableOpacity>
			</View>

			<View
				style={[
					styles.inputWithIcon,
					{
						width: "100%",
						backgroundColor: colors.secondaryGray,
						borderRadius: metrics.borderRadiusMedium,
						padding: metrics.spacingSmall,
						marginBottom: metrics.spacingMedium,
					},
				]}
			>
				<Lock
					size={metrics.iconMediumLarge}
					style={{ marginRight: metrics.spacingMedium }}
				/>
				<TextInput
					placeholder="Create a password"
					secureTextEntry={!visible}
					value={password}
					onChangeText={setPassword}
					style={{
						flex: 1,
						fontSize: metrics.fontMedium,
						fontWeight: "500",
						color: colors.primaryGray,
					}}
				/>
				<TouchableOpacity onPress={() => setVisible(!visible)}>
					{visible ? (
						<Eye size={metrics.iconMediumLarge} color={colors.primaryGray} />
					) : (
						<EyeOff size={metrics.iconMediumLarge} color={colors.primaryGray} />
					)}
				</TouchableOpacity>
			</View>

			<View
				style={[
					styles.checkboxContainer,
					{
						marginBottom: metrics.spacingMedium,
						alignSelf: "flex-start",
					},
				]}
			>
				<View style={{ transform: [{ scale: metrics.checkboxScale }] }}>
					<CheckBox
						isChecked={agreedToTerms}
						onClick={() => setAgreedToTerms(!agreedToTerms)}
						checkedCheckBoxColor={colors.primaryGreen}
						checkBoxColor={colors.primaryGray}
					/>
				</View>
				<Text
					style={{
						marginLeft: metrics.spacingMedium,
						fontSize: metrics.fontMedium,
						fontWeight: "400",
					}}
				>
					I agree to{" "}
					<Text
						style={[
							styles.linkText,
							{
								color: colors.primaryGreen,
							},
						]}
						onPress={() => router.push("/terms")}
					>
						Terms & Conditions
					</Text>
				</Text>
			</View>

			<TouchableOpacity
				style={[
					styles.button,
					!(password && agreedToTerms) && styles.disabledButton,
					{
						backgroundColor: colors.primaryGreen,
						paddingVertical: metrics.spacingMedium,
						borderRadius: metrics.borderRadiusMedium,
						width: "100%",
					},
				]}
				disabled={!(password && agreedToTerms)}
				onPress={nextStep}
			>
				<Text
					style={[
						styles.buttonText,
						{
							color: "white",
							fontSize: metrics.fontMedium,
						},
					]}
				>
					Create Account
				</Text>
				<ChevronRight size={20} color="#fff" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	stepContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		gap: metrics.spacingMedium,
	},
	title: { fontWeight: "bold" },
	inputWithIcon: {
		flexDirection: "row",
		alignItems: "center",
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	linkText: { textDecorationLine: "underline" },
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	disabledButton: { opacity: 0.5 },
	buttonText: { fontWeight: "bold" },
	phoneDisplayContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	phoneText: { flex: 1 },
});
