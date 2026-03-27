import { ThemeColors } from "@/app/_theme";
import Input from "@/components/common/Input";
import { metrics } from "@/utils/metrics";
import { CircleCheck, FileText, Shield, Upload } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MissionData {
	description: string;
	missionStatement?: string;
	verificationDocumentUri?: string;
}

interface StepThreeProps {
	mission: MissionData;
	updateMission: (updates: Partial<MissionData>) => void;
	colors: ThemeColors;
	pickFile: (field: "verificationDocumentUri") => void;
}

export default function StepThree({
	mission,
	updateMission,
	colors,
	pickFile,
}: StepThreeProps) {
	return (
		<View
			style={{
				gap: metrics.spacingSmall,
			}}
		>
			<Text
				style={[
					styles.stepTitle,
					{
						color: colors.text,
						fontSize: metrics.fontExtraLarge,
						marginBottom: metrics.spacingMedium,
					},
				]}
			>
				Mission &amp; Docs
			</Text>

			<Input
				label="Describe your organization..."
				value={mission.description}
				onChange={(v) => updateMission({ description: v })}
				icon={<FileText size={metrics.iconMedium} color={colors.primaryGray} />}
				colors={colors}
				multiline
			/>
			<Input
				label="Mission Statement"
				value={mission.missionStatement || ""}
				onChange={(v) => updateMission({ missionStatement: v })}
				icon={<FileText size={metrics.iconMedium} color={colors.primaryGray} />}
				colors={colors}
				optional
			/>

			<TouchableOpacity
				style={[
					styles.uploadButton,
					{
						borderRadius: metrics.borderRadiusLarge,
						padding: metrics.spacingLarge,
						marginBottom: metrics.spacingMedium,
						flexDirection: "row",
						borderColor: mission.verificationDocumentUri
							? colors.primaryGreen
							: colors.secondaryGray,
					},
				]}
				onPress={() =>
					mission.verificationDocumentUri
						? updateMission({ verificationDocumentUri: "" })
						: pickFile("verificationDocumentUri")
				}
			>
				{mission.verificationDocumentUri ? (
					// <Text style={{ color: colors.text }}>
					// 	PDF Selected: {mission.verificationDocumentUri.split("/").pop()}
					// </Text>
					<>
						<CircleCheck
							size={metrics.thumbnailSmall}
							color={colors.primaryGreen}
						/>
						<View
							style={{
								marginHorizontal: metrics.spacingSmall,
							}}
						>
							<Text
								style={[
									styles.uploadText,
									{
										fontSize: metrics.fontLarge,
										marginBottom: metrics.spacingExtraSmall,
									},
								]}
							>
								Document uploaded
							</Text>
							<Text
								style={[
									styles.uploadSubText,
									{
										color: colors.primaryGray,
										fontSize: metrics.fontSmall,
									},
								]}
							>
								{mission.verificationDocumentUri.split("/").pop()}
							</Text>
						</View>
					</>
				) : (
					<>
						<Upload size={metrics.thumbnailSmall} color={colors.primaryGray} />
						<View
							style={{
								marginHorizontal: metrics.spacingSmall,
							}}
						>
							<Text
								style={[
									styles.uploadText,
									{
										fontSize: metrics.fontLarge,
										marginBottom: metrics.spacingExtraSmall,
									},
								]}
							>
								Upload Verification Document
							</Text>
							<Text
								style={[
									styles.uploadSubText,
									{
										color: colors.primaryGray,
										fontSize: metrics.fontSmall,
									},
								]}
							>
								Registration certificate, license, etc.
							</Text>
						</View>
					</>
				)}
			</TouchableOpacity>

			<View
				style={[
					styles.infoBox,
					{
						padding: metrics.spacingMedium,
						borderRadius: metrics.borderRadiusLarge,
						backgroundColor: colors.secondaryGreen,
						gap: metrics.spacingSmall,
					},
				]}
			>
				<Shield size={metrics.iconLarge} color={colors.primaryGreen} />
				<Text
					style={{
						color: colors.primaryGray,
						fontSize: metrics.fontSmall,
						fontWeight: "400",
					}}
				>
					Documents are encrypted and stored securely.
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	stepTitle: {
		fontWeight: "bold",
	},
	uploadButton: {
		borderWidth: 2,
		borderStyle: "dashed",
		alignItems: "center",
	},
	uploadText: {
		fontWeight: "500",
	},
	uploadSubText: {
		fontWeight: "500",
	},
	infoBox: {
		flexDirection: "row",
		alignItems: "center",
	},
});
