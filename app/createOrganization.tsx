import FadeScreen from "@/components/common/FadeScreen";
import StepProgress from "@/components/common/StepProgress";
import WizardButton from "@/components/common/WizardButton";
import CreateOrgHeader from "@/components/createOrg/CreateOrgHeader";
import { OrganizationFormData } from "@/components/createOrg/orgFormDataTypes";
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
	const step4Valid = true;
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
	content: {
		flex: 1,
	},
	bottomActions: {
		justifyContent: "center",
	},
});
