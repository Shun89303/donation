import FadeScreen from "@/components/common/FadeScreen";
import StepProgress from "@/components/common/StepProgress";
import WizardButton from "@/components/common/WizardButton";
import CreateOrgHeader from "@/components/createOrg/CreateOrgHeader";
import StepFive from "@/components/createOrg/StepFive";
import StepFour from "@/components/createOrg/StepFour";
import StepOne from "@/components/createOrg/StepOne";
import StepThree from "@/components/createOrg/StepThree";
import StepTwo from "@/components/createOrg/StepTwo";
import { usePickFile } from "@/hooks/usePickFile";
import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface OrganizationFormData {
	organizationName: string;
	organizationType: "NGO" | "Charity" | "Foundation" | "Community Group";
	registrationNumber?: string;
	contact: {
		personName: string;
		email: string;
		phone: string;
		officeLocation: string;
		website?: string;
	};
	mission: {
		description: string;
		missionStatement?: string;
		verificationDocumentUri?: string;
	};
	logoUri?: string;
	agreedToTerms: boolean;
}

export default function CreateOrganization() {
	const colors = useTheme();
	const router = useRouter();
	const [formData, setFormData] = useState<OrganizationFormData>({
		organizationName: "",
		organizationType: "NGO",
		registrationNumber: "",
		contact: {
			personName: "",
			email: "",
			phone: "",
			officeLocation: "",
			website: "",
		},
		mission: {
			description: "",
			missionStatement: "",
			verificationDocumentUri: "",
		},
		logoUri: "",
		agreedToTerms: false,
	});
	const [currentStep, setCurrentStep] = useState(1);

	const updateFormData = useCallback(
		(updates: Partial<OrganizationFormData>) => {
			setFormData((prev) => ({ ...prev, ...updates }));
		},
		[],
	);

	const updateContact = useCallback(
		(updates: Partial<OrganizationFormData["contact"]>) => {
			updateFormData({ contact: { ...formData.contact, ...updates } });
		},
		[formData.contact, updateFormData],
	);

	const updateMission = useCallback(
		(updates: Partial<OrganizationFormData["mission"]>) => {
			updateFormData({ mission: { ...formData.mission, ...updates } });
		},
		[formData.mission, updateFormData],
	);

	const { pickFile } = usePickFile((field, uri) => {
		if (field === "logoUri") {
			setFormData((prev) => ({ ...prev, logoUri: uri }));
		} else {
			setFormData((prev) => ({
				...prev,
				mission: {
					...prev.mission,
					verificationDocumentUri: uri,
				},
			}));
		}
	});

	const step1Valid =
		formData.organizationName.trim() && formData.organizationType;
	const step2Valid =
		formData.contact.personName.trim() &&
		formData.contact.email.trim() &&
		formData.contact.phone.trim();
	const step3Valid = formData.mission.description.trim();
	const step4Valid = true; // optional
	const step5Valid = formData.agreedToTerms;

	const canContinue = [step1Valid, step2Valid, step3Valid, step4Valid, false][
		currentStep - 1
	];

	const goNext = () => {
		if (canContinue) setCurrentStep((prev) => Math.min(prev + 1, 5));
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1);
		} else {
			router.back();
		}
	};

	const submit = () => {
		console.log("Submitting:", formData);
		router.push("/waitingApproval");
	};

	return (
		<FadeScreen>
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.appBackground }]}
			>
				<ScrollView
					contentContainerStyle={[
						styles.scrollContent,
						{
							paddingHorizontal: metrics.spacingMedium,
							paddingBottom: metrics.spacingMedium,
						},
					]}
					showsVerticalScrollIndicator={false}
				>
					<CreateOrgHeader currentStep={currentStep} goBack={handleBack} />
					<StepProgress currentStep={currentStep} />
					<View style={styles.content}>
						{currentStep === 1 && (
							<StepOne
								formData={formData}
								updateFormData={updateFormData}
								colors={colors}
							/>
						)}
						{currentStep === 2 && (
							<StepTwo
								contact={formData.contact}
								updateContact={updateContact}
								colors={colors}
							/>
						)}
						{currentStep === 3 && (
							<StepThree
								mission={formData.mission}
								updateMission={updateMission}
								colors={colors}
								pickFile={pickFile}
							/>
						)}
						{currentStep === 4 && (
							<StepFour
								logoUri={formData.logoUri}
								pickFile={pickFile}
								colors={colors}
							/>
						)}
						{currentStep === 5 && (
							<StepFive
								formData={formData}
								updateFormData={updateFormData}
								colors={colors}
							/>
						)}
					</View>
				</ScrollView>
				<View
					style={[
						styles.bottomActions,
						{
							paddingHorizontal: metrics.spacingMedium,
							paddingVertical: metrics.spacingMedium,
							backgroundColor: colors.appBackground,
						},
					]}
				>
					{/* Continue / Submit button */}
					{currentStep < 5 ? (
						<WizardButton
							label="Continue"
							onPress={goNext}
							disabled={!canContinue} // step validation
						/>
					) : (
						<WizardButton
							label="Submit"
							onPress={submit}
							disabled={!step5Valid} // terms checkbox
						/>
					)}
				</View>
			</SafeAreaView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
	},
	stepIndicator: {
		alignItems: "center",
		marginBottom: 30,
	},
	stepNumber: {
		fontSize: 18,
		fontWeight: "600",
	},
	stepTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
	},
	content: {
		flex: 1,
	},
	inputContainer: {
		marginBottom: 20,
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 8,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 12,
	},
	icon: {
		marginRight: 8,
	},
	input: {
		flex: 1,
		paddingVertical: 14,
		fontSize: 16,
	},
	typeRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 20,
		gap: 8,
		justifyContent: "flex-start",
	},
	typeButton: {
		borderWidth: 0,
		borderRadius: 8,
		// paddingHorizontal: 16,
		paddingVertical: 12,
		width: "48%",
		alignItems: "center",
	},
	typeButtonText: {
		fontSize: 16,
		fontWeight: "500",
		textAlign: "center",
	},
	uploadButton: {
		borderWidth: 2,
		borderStyle: "dashed",
		borderRadius: 12,
		padding: 40,
		alignItems: "center",
		marginBottom: 20,
	},
	uploadText: {
		fontSize: 16,
		marginBottom: 12,
	},
	preview: {
		width: 60,
		height: 60,
		borderRadius: 8,
	},
	// logoUpload: {
	// 	borderWidth: 2,
	// 	borderStyle: "dashed",
	// 	borderRadius: 100,
	// 	width: 120,
	// 	height: 120,
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	marginVertical: 20,
	// 	position: "relative",
	// },
	// logoText: {
	// 	fontSize: 16,
	// 	textAlign: "center",
	// 	marginBottom: 8,
	// },
	// logoPreview: {
	// 	width: 80,
	// 	height: 80,
	// 	borderRadius: 40,
	// },
	// noteText: {
	// 	fontSize: 14,
	// 	textAlign: "center",
	// 	marginTop: 12,
	// },
	logoUpload: {
		borderWidth: 2,
		borderStyle: "dashed",
		borderRadius: 12,
		width: 120,
		height: 120,
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 20,
		backgroundColor: "white",
		overflow: "hidden",
	},
	logoPreview: {
		width: 100,
		height: 100,
		borderRadius: 12,
	},
	logoText: {
		fontSize: 16,
		textAlign: "center",
		fontWeight: "500",
	},
	noteText: {
		fontSize: 14,
		textAlign: "center",
		marginTop: 8,
		fontWeight: "500",
	},
	infoBox: {
		padding: 16,
		borderRadius: 12,
		marginBottom: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	infoText: {
		fontSize: 14,
		textAlign: "center",
	},
	reviewSection: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 12,
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 12,
	},
	reviewText: {
		fontSize: 16,
		marginBottom: 4,
	},
	checkboxContainer: {
		marginBottom: 20,
		// borderRadius: 12,
	},
	checkboxLabel: {
		flex: 1,
		marginLeft: 12,
		fontSize: 16,
	},
	centerContainer: {
		alignItems: "center",
	},
	bottomActions: {
		justifyContent: "center",
	},
	button: {
		flex: 1,
		borderRadius: 12,
		paddingVertical: 16,
		alignItems: "center",
		marginHorizontal: 8,
	},
	secondaryButton: {
		borderWidth: 1,
	},
	disabledButton: {
		opacity: 0.5,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "600",
	},
});
