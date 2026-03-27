import LocationPermission from "@/components/auth/LocationPermission";
import NotificationPermission from "@/components/auth/NotificationPermission";
import FadeScreen from "@/components/common/FadeScreen";
import ImageUploadBox from "@/components/common/ImageUploadBox";
import { usePickFile } from "@/hooks/usePickFile";
import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { router, useRouter } from "expo-router";
import {
	ArrowLeft,
	Bell,
	Camera,
	ChevronRight,
	Heart,
	Lock,
	Phone,
	User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import CheckBox from "react-native-check-box";
import PhoneInput from "react-native-phone-number-input";
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
						<Heart size={metrics.iconXLarge} color={"white"} />
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

// --- Step 1 ---
function Step1PhoneInput({
	phone,
	setPhone,
	nextStep,
}: {
	phone: string;
	setPhone: (val: string) => void;
	nextStep: () => void;
}) {
	const colors = useTheme();
	return (
		<View style={styles.stepContainer}>
			<View
				style={{
					marginVertical: metrics.spacingLarge,
					gap: metrics.spacingMedium,
				}}
			>
				<Text
					style={{
						fontSize: metrics.fontLarge,
						fontWeight: "700",
					}}
				>
					Phone number
				</Text>
				<PhoneInput
					countryPickerProps={{
						renderFlagButton: undefined,
					}}
					defaultValue={phone}
					defaultCode="MM"
					layout="second"
					onChangeFormattedText={setPhone}
					containerStyle={{
						width: "100%",
						height: metrics.dimensions.height.xxl,
						backgroundColor: "transparent",
					}}
					textContainerStyle={{
						paddingVertical: 0,
						backgroundColor: colors.secondaryGray,
						paddingLeft: metrics.spacingMedium,
						borderRadius: metrics.borderRadiusMedium,
					}}
					countryPickerButtonStyle={{
						marginRight: metrics.spacingMedium,
						backgroundColor: colors.secondaryGray,
						borderRadius: metrics.borderRadiusMedium,
						width: "30%",
					}}
				/>
			</View>
			<TouchableOpacity
				style={[
					styles.button,
					!phone && styles.disabledButton,
					{
						backgroundColor: colors.primaryGreen,
						padding: metrics.spacingMedium,
						borderRadius: metrics.borderRadiusMedium,
						marginBottom: metrics.spacingMedium,
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
					},
				]}
				disabled={!phone}
				onPress={nextStep}
			>
				<Text
					style={[
						styles.buttonText,
						{
							fontSize: metrics.fontLarge,
							marginRight: metrics.spacingSmall,
							color: "#fff",
						},
					]}
				>
					Continue
				</Text>
				<ChevronRight size={metrics.iconLarge} color="#fff" />
			</TouchableOpacity>
		</View>
	);
}

// --- Step 2 ---
function Step2CreateAccount({
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

	return (
		<View style={styles.stepContainer}>
			<Text
				style={[
					styles.title,
					{
						fontSize: metrics.fontLarge,
						marginBottom: metrics.spacingMedium,
					},
				]}
			>
				Create account
			</Text>

			<View
				style={[
					styles.phoneDisplayContainer,
					{
						width: "100%",
						backgroundColor: colors.secondaryGray,
						padding: metrics.spacingLarge,
						borderRadius: metrics.borderRadiusMedium,
						marginBottom: metrics.spacingMedium,
					},
				]}
			>
				<Phone size={metrics.iconLarge} />
				<Text
					style={[
						styles.phoneText,
						{
							marginLeft: metrics.spacingMedium,
						},
					]}
				>
					{phone}
				</Text>
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
					size={metrics.iconLarge}
					style={{ marginRight: metrics.spacingMedium }}
				/>
				<TextInput
					placeholder="Create a password"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
					style={{ flex: 1 }}
				/>
			</View>

			<View
				style={[
					styles.checkboxContainer,
					{
						marginBottom: metrics.spacingMedium,
					},
				]}
			>
				<CheckBox
					isChecked={agreedToTerms}
					onClick={() => setAgreedToTerms(!agreedToTerms)}
					checkedCheckBoxColor={colors.primaryGreen}
					checkBoxColor={colors.primaryGray}
				/>
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

// --- Step 3 ---
function Step3Profile({
	profileImage,
	setProfileImage,
	name,
	setName,
	nextStep,
}: {
	profileImage: string | null;
	setProfileImage: (val: string) => void;
	name: string;
	setName: (val: string) => void;
	nextStep: () => void;
}) {
	const colors = useTheme();

	const { pickFile } = usePickFile((field, uri) => {
		if (field === "profileImage") {
			setProfileImage(uri);
		}
	});

	return (
		<View style={styles.stepContainer}>
			<Text
				style={[
					styles.title,
					{
						fontSize: metrics.fontExtraLarge,
					},
				]}
			>
				Your profile
			</Text>

			<ImageUploadBox
				uri={profileImage || ""}
				onPress={() => pickFile("profileImage")}
				colors={colors}
				label="Tap to add photo"
				borderradius={metrics.borderRadiusXLarge}
			/>

			<View
				style={[
					styles.inputWithIcon,
					{
						backgroundColor: colors.secondaryGray,
						paddingVertical: metrics.spacingSmall,
						paddingHorizontal: metrics.spacingMedium,
						borderRadius: metrics.borderRadiusLarge,
					},
				]}
			>
				<User
					size={metrics.iconLarge}
					style={{ marginRight: metrics.spacingMedium }}
				/>
				<TextInput
					placeholder="Your name"
					value={name}
					onChangeText={setName}
					style={{ flex: 1 }}
				/>
			</View>

			<TouchableOpacity
				style={[
					styles.button,
					!name && styles.disabledButton,
					{
						backgroundColor: colors.primaryGreen,
						paddingVertical: metrics.spacingMedium,
						borderRadius: metrics.borderRadiusMedium,
						marginVertical: metrics.spacingMedium,
						width: "100%",
					},
				]}
				disabled={!name}
				onPress={nextStep}
			>
				<Text
					style={[
						styles.buttonText,
						{
							fontSize: metrics.fontMedium,
							color: "#fff",
						},
					]}
				>
					Get Started
				</Text>
				<ChevronRight size={metrics.iconMedium} color="#fff" />
			</TouchableOpacity>

			<TouchableOpacity style={[styles.button]} onPress={nextStep}>
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
					Skip for now
				</Text>
			</TouchableOpacity>
		</View>
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
