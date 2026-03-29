import LocationPermission from "@/components/auth/LocationPermission";
import NotificationPermission from "@/components/auth/NotificationPermission";
import Step1PhoneInput from "@/components/auth/StepOne";
import Step3Profile from "@/components/auth/StepThree";
import Step2CreateAccount from "@/components/auth/StepTwo";
import BackButton from "@/components/common/BackButton";
import FadeScreen from "@/components/common/FadeScreen";
import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
				<BackButton
					onPress={() => (currentStep === 1 ? router.back() : goback())}
				/>
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
							// console.log("User location:", location);
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

// --- Styles ---
const styles = StyleSheet.create({
	container: { flex: 1 },
	header: { alignItems: "center" },
	title: { fontWeight: "bold" },
});
