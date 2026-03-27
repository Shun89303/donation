import LocationPermission from "@/components/auth/LocationPermission";
import NotificationPermission from "@/components/auth/NotificationPermission";
import Step1PhoneInput from "@/components/auth/StepOne";
import Step3Profile from "@/components/auth/StepThree";
import Step2CreateAccount from "@/components/auth/StepTwo";
import FadeScreen from "@/components/common/FadeScreen";
import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import { ArrowLeft, Bell, Camera, Heart } from "lucide-react-native";
import React, { useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Main parent component
export default function Auth() {
	const [currentStep, setCurrentStep] = useState(1);
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [agreedToTerms, setAgreedToTerms] = useState(false);
	const [name, setName] = useState("");
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [allowLocation, setAllowLocation] = useState<boolean | null>(null);
	const [allowNotifications, setAllowNotifications] = useState<boolean | null>(
		null,
	);

	const router = useRouter();
	const colors = useTheme();

	const nextStep = () => setCurrentStep((prev) => prev + 1);
	const goback = () => setCurrentStep((prev) => prev - 1);
	const goToStep = (step: number) => setCurrentStep(step);

	return (
		<FadeScreen>
			<SafeAreaView
				style={[
					styles.container,
					{
						padding: metrics.spacingLarge,
						backgroundColor: colors.appBackground,
					},
				]}
			>
				<Pressable
					onPress={() => (currentStep === 1 ? router.back() : goback())}
				>
					<ArrowLeft size={metrics.iconLarge} color={colors.text} />
				</Pressable>
				<View style={[styles.header]}>
					<View
						style={{
							backgroundColor: colors.primaryGreen,
							padding: metrics.spacingMedium,
							borderRadius: metrics.borderRadiusLarge,
						}}
					>
						<Heart size={metrics.iconMediumXXL} color={"white"} />
					</View>
					<Text
						style={[
							styles.title,
							{
								fontSize: metrics.fontExtraLarge,
								marginTop: metrics.spacingMedium,
								color: colors.text,
							},
						]}
					>
						DanaLink
					</Text>
				</View>
				{currentStep === 1 && (
					<Step1PhoneInput
						phone={phone}
						setPhone={setPhone}
						nextStep={nextStep}
					/>
				)}
				{currentStep === 2 && (
					<Step2CreateAccount
						phone={phone}
						goToStep={goToStep}
						password={password}
						setPassword={setPassword}
						agreedToTerms={agreedToTerms}
						setAgreedToTerms={setAgreedToTerms}
						nextStep={nextStep}
					/>
				)}
				{currentStep === 3 && (
					<Step3Profile
						profileImage={profileImage}
						setProfileImage={setProfileImage}
						name={name}
						setName={setName}
						nextStep={nextStep}
					/>
				)}
				{currentStep === 4 && (
					<LocationPermission
						onNext={nextStep}
						onResult={(granted, location) => {
							setAllowLocation(granted);
							console.log("User location:", location);
						}}
					/>
				)}
				{currentStep === 5 && (
					<NotificationPermission
						onNext={() => router.push("/")}
						onResult={(granted) => setAllowNotifications(granted)}
					/>
				)}
			</SafeAreaView>
		</FadeScreen>
	);
}

// --- Step 5 ---
function Step5Notifications({
	allowNotifications,
	setAllowNotifications,
	router,
}: {
	allowNotifications: boolean | null;
	setAllowNotifications: (val: boolean) => void;
	router: any;
}) {
	const handleEnable = () => {
		setAllowNotifications(true);
		router.push("/");
	};
	const handleMaybeLater = () => {
		setAllowNotifications(false);
		router.push("/");
	};

	const colors = useTheme();

	return (
		<View style={styles.stepContainer}>
			<View
				style={{
					backgroundColor: colors.secondaryGreen,
					padding: metrics.spacingLarge,
					borderRadius: 999,
				}}
			>
				<Bell size={metrics.thumbnailLarge} color={colors.primaryGreen} />
			</View>
			<Text
				style={{
					fontSize: metrics.fontLarge,
					fontWeight: "900",
					textAlign: "center",
				}}
			>
				Stay Updated
			</Text>
			<Text
				style={{
					fontSize: metrics.fontMedium,
					color: colors.primaryGray,
					marginBottom: metrics.spacingMedium,
					width: "80%",
					textAlign: "center",
				}}
			>
				Get notified about campaign updates, new proofs of delivery, and when
				your donations make an impact.
			</Text>

			{/* Info boxes stacked */}
			<View style={styles.infoBox}>
				<Heart size={24} style={{ marginRight: 12 }} />
				<View>
					<Text style={styles.infoTitle}>Campaign Updates</Text>
					<Text style={styles.infoSubtitle}>
						Progress on causes you support.
					</Text>
				</View>
			</View>

			<View style={styles.infoBox}>
				<Camera size={24} style={{ marginRight: 12 }} />
				<View>
					<Text style={styles.infoTitle}>Proof of Delivery</Text>
					<Text style={styles.infoSubtitle}>
						See your impact with photo & video.
					</Text>
				</View>
			</View>

			<TouchableOpacity style={styles.button} onPress={handleEnable}>
				<Text style={styles.buttonText}>Enable Notifications</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.button]} onPress={handleMaybeLater}>
				<Text
					style={[
						styles.buttonText,
						{
							fontSize: metrics.fontSmall,
							fontWeight: "400",
							color: colors.primaryGray,
						},
					]}
				>
					Maybe Later
				</Text>
			</TouchableOpacity>
		</View>
	);
}

// --- Styles ---
const styles = StyleSheet.create({
	container: { flex: 1 },
	stepContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	header: { alignItems: "center" },
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
	imagePicker: {
		alignItems: "center",
		justifyContent: "center",
		height: 120,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		marginBottom: 16,
	},
	imagePreview: { width: 120, height: 120, borderRadius: 8 },
	infoBox: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
	},
	infoTitle: { fontSize: 16, fontWeight: "bold" },
	infoSubtitle: { fontSize: 14, color: "#555" },
});
