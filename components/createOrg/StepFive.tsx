import { ThemeColors } from "@/app/_theme";

import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import { Shield } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "react-native-check-box";
import { OrganizationFormData } from "./orgFormDataTypes";

type Props = {
	formData: OrganizationFormData;
	updateFormData: (updates: Partial<OrganizationFormData>) => void;
	colors: ThemeColors;
};

export default function StepFive({ formData, updateFormData, colors }: Props) {
	const router = useRouter();

	return (
		<View
			style={{
				gap: metrics.spacingMedium,
				padding: metrics.spacingMedium,
			}}
		>
			<Text
				style={[
					styles.stepTitle,
					{
						color: colors.text,
						fontSize: metrics.fontExtraLarge,
					},
				]}
			>
				Review
			</Text>

			{/* ORGANIZATION */}
			<View
				style={{
					backgroundColor: colors.background,
					padding: metrics.spacingExtraLarge,
					borderRadius: metrics.borderRadiusLarge,
					marginBottom: metrics.spacingMedium,
				}}
			>
				<Text
					style={[
						{
							color: colors.primaryGray,
							fontSize: metrics.fontMedium,
							marginBottom: metrics.spacingSmall,
							fontWeight: "500",
						},
					]}
				>
					ORGANIZATION
				</Text>
				<Text
					style={{
						fontSize: metrics.fontLarge,
						fontWeight: "500",
						marginBottom: metrics.spacingSmall,
					}}
				>
					{formData.organizationName || "N/A"}
				</Text>
				<Text
					style={{
						fontSize: metrics.fontLarge,
						fontWeight: "400",
						marginBottom: metrics.spacingSmall,
						color: colors.primaryGray,
					}}
				>
					{formData.organizationType}
				</Text>
			</View>

			{formData.registrationNumber && (
				<View
					style={{
						backgroundColor: colors.background,
						padding: metrics.spacingExtraLarge,
						borderRadius: metrics.borderRadiusLarge,
						marginBottom: metrics.spacingMedium,
					}}
				>
					<Text
						style={[
							{
								color: colors.primaryGray,
								fontSize: metrics.fontMedium,
								marginBottom: metrics.spacingSmall,
								fontWeight: "500",
							},
						]}
					>
						REG. NUMBER
					</Text>
					<Text
						style={{
							fontSize: metrics.fontLarge,
							fontWeight: "500",
							marginBottom: metrics.spacingSmall,
						}}
					>
						{formData.registrationNumber}
					</Text>
				</View>
			)}

			{/* CONTACT */}
			<View
				style={{
					backgroundColor: colors.background,
					padding: metrics.spacingExtraLarge,
					borderRadius: metrics.borderRadiusLarge,
					marginBottom: metrics.spacingMedium,
				}}
			>
				<Text
					style={[
						{
							color: colors.primaryGray,
							fontSize: metrics.fontMedium,
							marginBottom: metrics.spacingSmall,
							fontWeight: "500",
						},
					]}
				>
					CONTACT
				</Text>
				<Text
					style={{
						fontSize: metrics.fontLarge,
						fontWeight: "500",
						marginBottom: metrics.spacingSmall,
					}}
				>
					{formData.contact.personName || "N/A"}
				</Text>
				<Text
					style={{
						fontSize: metrics.fontLarge,
						fontWeight: "400",
						marginBottom: metrics.spacingSmall,
						color: colors.primaryGray,
					}}
				>
					{formData.contact.email || "N/A"}
				</Text>
			</View>

			<View
				style={{
					backgroundColor: colors.background,
					padding: metrics.spacingExtraLarge,
					borderRadius: metrics.borderRadiusLarge,
					marginBottom: metrics.spacingMedium,
				}}
			>
				<Text
					style={[
						{
							color: colors.primaryGray,
							fontSize: metrics.fontMedium,
							marginBottom: metrics.spacingSmall,
							fontWeight: "500",
						},
					]}
				>
					PHONE
				</Text>
				<Text
					style={{
						fontSize: metrics.fontLarge,
						fontWeight: "500",
						marginBottom: metrics.spacingSmall,
					}}
				>
					{formData.contact.phone || "N/A"}
				</Text>
			</View>

			{formData.contact.officeLocation && (
				<View
					style={{
						backgroundColor: colors.background,
						padding: metrics.spacingExtraLarge,
						borderRadius: metrics.borderRadiusLarge,
						marginBottom: metrics.spacingMedium,
					}}
				>
					<Text
						style={[
							{
								color: colors.primaryGray,
								fontSize: metrics.fontMedium,
								marginBottom: metrics.spacingSmall,
								fontWeight: "500",
							},
						]}
					>
						LOCATION
					</Text>
					<Text
						style={{
							fontSize: metrics.fontLarge,
							fontWeight: "500",
							marginBottom: metrics.spacingSmall,
						}}
					>
						{formData.contact.officeLocation}
					</Text>
				</View>
			)}

			{formData.contact.website && (
				<View
					style={{
						backgroundColor: colors.background,
						padding: metrics.spacingExtraLarge,
						borderRadius: metrics.borderRadiusLarge,
						marginBottom: metrics.spacingMedium,
					}}
				>
					<Text
						style={[
							{
								color: colors.primaryGray,
								fontSize: metrics.fontMedium,
								marginBottom: metrics.spacingSmall,
								fontWeight: "500",
							},
						]}
					>
						WEBSITE
					</Text>
					<Text
						style={{
							fontSize: metrics.fontLarge,
							fontWeight: "500",
							marginBottom: metrics.spacingSmall,
						}}
					>
						{formData.contact.website}
					</Text>
				</View>
			)}

			{/* MISSION */}
			<View
				style={{
					backgroundColor: colors.background,
					padding: metrics.spacingExtraLarge,
					borderRadius: metrics.borderRadiusLarge,
					marginBottom: metrics.spacingMedium,
				}}
			>
				<Text
					style={[
						{
							color: colors.primaryGray,
							fontSize: metrics.fontMedium,
							marginBottom: metrics.spacingSmall,
							fontWeight: "500",
						},
					]}
				>
					DESCRIPTION
				</Text>
				<Text
					style={{
						fontSize: metrics.fontLarge,
						fontWeight: "500",
						marginBottom: metrics.spacingSmall,
					}}
				>
					{formData.mission.description.substring(0, 100)}
				</Text>
			</View>

			{formData.mission.missionStatement && (
				<View
					style={{
						backgroundColor: colors.background,
						padding: metrics.spacingExtraLarge,
						borderRadius: metrics.borderRadiusLarge,
						marginBottom: metrics.spacingMedium,
					}}
				>
					<Text
						style={[
							{
								color: colors.primaryGray,
								fontSize: metrics.fontMedium,
								marginBottom: metrics.spacingSmall,
								fontWeight: "500",
							},
						]}
					>
						MISSION
					</Text>
					<Text
						style={{
							fontSize: metrics.fontLarge,
							fontWeight: "500",
							marginBottom: metrics.spacingSmall,
						}}
					>
						{formData.mission.missionStatement.substring(0, 100)}
					</Text>
				</View>
			)}

			{formData.mission.verificationDocumentUri && (
				<View
					style={{
						backgroundColor: colors.background,
						padding: metrics.spacingExtraLarge,
						borderRadius: metrics.borderRadiusLarge,
						marginBottom: metrics.spacingMedium,
					}}
				>
					<Text
						style={[
							{
								color: colors.primaryGray,
								fontSize: metrics.fontMedium,
								marginBottom: metrics.spacingSmall,
								fontWeight: "500",
							},
						]}
					>
						DOCUMENTS
					</Text>
					<Text
						style={{
							fontSize: metrics.fontLarge,
							fontWeight: "500",
							marginBottom: metrics.spacingSmall,
						}}
					>
						Uploaded
					</Text>
				</View>
			)}

			{/* INFO BOX */}
			<View
				style={[
					styles.infoBox,
					{
						backgroundColor: colors.secondaryGreen,
						borderRadius: metrics.borderRadiusLarge,
						padding: metrics.spacingMedium,
						marginBottom: metrics.spacingMedium,
						gap: metrics.spacingSmall,
					},
				]}
			>
				<Shield size={metrics.iconMedium} color={colors.primaryGreen} />
				<Text
					style={{
						color: colors.primaryGray,
						fontSize: metrics.fontSmall,
						fontWeight: "400",
					}}
				>
					All information will be reviewed within 2-3 business days.
				</Text>
			</View>

			{/* CHECKBOX */}
			<View
				style={{
					marginBottom: metrics.spacingMedium,
					flexDirection: "row",
					alignItems: "center",
					gap: metrics.spacingSmall,
					paddingHorizontal: metrics.spacingMedium,
					justifyContent: "center",
				}}
			>
				<View style={{ transform: [{ scale: metrics.checkboxScale }] }}>
					<CheckBox
						isChecked={formData.agreedToTerms}
						onClick={() =>
							updateFormData({
								agreedToTerms: !formData.agreedToTerms,
							})
						}
						checkBoxColor={colors.primaryGreen}
						uncheckedCheckBoxColor={colors.primaryGray}
					/>
				</View>
				<Text
					style={{
						color: colors.text,
						fontSize: metrics.fontSmall,
						fontWeight: "500",
					}}
				>
					I agree to the{" "}
					<Text
						style={{
							color: colors.primaryGreen,
							textDecorationLine: "underline",
							fontSize: metrics.fontSmall,
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
		fontWeight: "bold",
	},
	infoBox: {
		flexDirection: "row",
		alignItems: "center",
	},
});
