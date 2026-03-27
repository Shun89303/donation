import { ThemeColors } from "@/app/_theme";
import { OrganizationFormData } from "@/app/createOrganization";
import { useRouter } from "expo-router";
import { Shield } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "react-native-check-box";

type Props = {
	formData: OrganizationFormData;
	updateFormData: (updates: Partial<OrganizationFormData>) => void;
	colors: ThemeColors;
};

export default function StepFive({ formData, updateFormData, colors }: Props) {
	const router = useRouter();

	return (
		<View>
			<Text style={[styles.stepTitle, { color: colors.text }]}>Review</Text>

			{/* ORGANIZATION */}
			<View style={styles.reviewSection}>
				<Text style={[styles.sectionTitle, { color: colors.text }]}>
					ORGANIZATION
				</Text>
				<Text style={styles.reviewText}>
					{formData.organizationName || "N/A"}
				</Text>
				<Text style={styles.reviewText}>{formData.organizationType}</Text>
			</View>

			{formData.registrationNumber && (
				<View style={styles.reviewSection}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						REG. NUMBER
					</Text>
					<Text style={styles.reviewText}>{formData.registrationNumber}</Text>
				</View>
			)}

			{/* CONTACT */}
			<View style={styles.reviewSection}>
				<Text style={[styles.sectionTitle, { color: colors.text }]}>
					CONTACT
				</Text>
				<Text style={styles.reviewText}>
					{formData.contact.personName || "N/A"}
				</Text>
				<Text style={styles.reviewText}>{formData.contact.email || "N/A"}</Text>
			</View>

			<View style={styles.reviewSection}>
				<Text style={[styles.sectionTitle, { color: colors.text }]}>PHONE</Text>
				<Text style={styles.reviewText}>{formData.contact.phone || "N/A"}</Text>
			</View>

			{formData.contact.officeLocation && (
				<View style={styles.reviewSection}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						LOCATION
					</Text>
					<Text style={styles.reviewText}>
						{formData.contact.officeLocation}
					</Text>
				</View>
			)}

			{formData.contact.website && (
				<View style={styles.reviewSection}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						WEBSITE
					</Text>
					<Text style={styles.reviewText}>{formData.contact.website}</Text>
				</View>
			)}

			{/* MISSION */}
			<View style={styles.reviewSection}>
				<Text style={[styles.sectionTitle, { color: colors.text }]}>
					DESCRIPTION
				</Text>
				<Text style={styles.reviewText}>
					{formData.mission.description.substring(0, 100)}
				</Text>
			</View>

			{formData.mission.missionStatement && (
				<View style={styles.reviewSection}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						MISSION
					</Text>
					<Text style={styles.reviewText}>
						{formData.mission.missionStatement.substring(0, 100)}
					</Text>
				</View>
			)}

			{formData.mission.verificationDocumentUri && (
				<View style={styles.reviewSection}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						DOCUMENTS
					</Text>
					<Text style={styles.reviewText}>Uploaded</Text>
				</View>
			)}

			{/* INFO BOX */}
			<View
				style={[
					styles.infoBox,
					{
						backgroundColor: colors.secondaryGreen,
						borderRadius: 20,
					},
				]}
			>
				<Shield size={20} color={colors.primaryGreen} />
				<Text style={[styles.infoText, { color: colors.primaryGray }]}>
					All information will be reviewed within 2-3 business days.
				</Text>
			</View>

			{/* CHECKBOX */}
			<View style={styles.checkboxContainer}>
				<CheckBox
					isChecked={formData.agreedToTerms}
					onClick={() =>
						updateFormData({
							agreedToTerms: !formData.agreedToTerms,
						})
					}
					checkBoxColor={colors.primaryGreen}
				/>
				<Text style={{ color: colors.text, fontSize: 14, fontWeight: "500" }}>
					I agree to the{" "}
					<Text
						style={{
							color: colors.primaryGreen,
							textDecorationLine: "underline",
							fontSize: 14,
							fontWeight: "700",
						}}
						onPress={() => router.push("/terms")}
					>
						Terms & Conditions
					</Text>{" "}
					on behalf of my organization.
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	stepTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
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
	infoBox: {
		padding: 16,
		marginBottom: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	infoText: {
		fontSize: 14,
		marginLeft: 8,
	},
	checkboxContainer: {
		marginBottom: 20,
	},
});
