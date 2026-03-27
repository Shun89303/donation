import { OrganizationFormData } from "@/app/createOrganization";
import Input from "@/components/common/Input";
import { metrics } from "@/utils/metrics";
import { Building2, Hash } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface StepOneProps {
	formData: {
		organizationName: string;
		organizationType: string;
		registrationNumber?: string;
	};
	updateFormData: (updates: Partial<OrganizationFormData>) => void;
	colors: any;
}

const ORGANIZATION_TYPES = [
	"NGO",
	"Charity",
	"Foundation",
	"Community Group",
] as const;

export default function StepOne({
	formData,
	updateFormData,
	colors,
}: StepOneProps) {
	return (
		<View>
			<Text
				style={[
					styles.stepTitle,
					{
						color: colors.text,
						fontSize: metrics.fontLarge,
						marginBottom: metrics.spacingMedium,
					},
				]}
			>
				Basic Info
			</Text>

			<Input
				label="Organization Name"
				value={formData.organizationName}
				onChange={(v) => updateFormData({ organizationName: v })}
				icon={<Building2 size={metrics.iconSmall} color={colors.primaryGray} />}
				colors={colors}
			/>

			<Text
				style={[
					styles.label,
					{ color: colors.text, fontSize: metrics.fontMedium, marginBottom: 8 },
				]}
			>
				Organization Type
			</Text>
			<View
				style={[
					styles.typeRow,
					{
						gap: metrics.spacingExtraSmall,
						marginBottom: metrics.spacingMedium,
					},
				]}
			>
				{ORGANIZATION_TYPES.map((type) => (
					<TouchableOpacity
						key={type}
						style={[
							styles.typeButton,
							{
								borderRadius: metrics.borderRadiusMedium,
								paddingVertical: metrics.spacingMedium,
							},
							formData.organizationType === type
								? { backgroundColor: colors.primaryGreen }
								: { backgroundColor: colors.secondaryGray },
						]}
						onPress={() => updateFormData({ organizationType: type })}
					>
						<Text
							style={[
								styles.typeButtonText,
								{ fontSize: metrics.fontMedium },
								formData.organizationType === type
									? { color: "white" }
									: { color: colors.text },
							]}
						>
							{type}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			<Input
				label="Registration Number"
				value={formData.registrationNumber || ""}
				onChange={(v) => updateFormData({ registrationNumber: v })}
				icon={<Hash size={metrics.iconSmall} color={colors.primaryGray} />}
				colors={colors}
				optional
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	stepTitle: {
		fontWeight: "bold",
	},
	label: {
		fontWeight: "500",
	},
	typeRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
	},
	typeButton: {
		width: "48%",
		alignItems: "center",
	},
	typeButtonText: {
		fontWeight: "500",
		textAlign: "center",
	},
});
