import { ThemeColors } from "@/app/_theme";
import Input from "@/components/common/Input";
import { FileText } from "lucide-react-native";
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
		<View>
			<Text style={[styles.stepTitle, { color: colors.text }]}>
				Mission &amp; Docs
			</Text>

			<Input
				label="Describe your organization..."
				value={mission.description}
				onChange={(v) => updateMission({ description: v })}
				icon={<FileText size={12} color={colors.primaryGray} />}
				colors={colors}
				multiline
			/>
			<Input
				label="Mission Statement"
				value={mission.missionStatement || ""}
				onChange={(v) => updateMission({ missionStatement: v })}
				icon={<FileText size={12} color={colors.primaryGray} />}
				colors={colors}
				optional
			/>

			<TouchableOpacity
				style={styles.uploadButton}
				onPress={() => pickFile("verificationDocumentUri")}
			>
				<Text style={styles.uploadText}>Upload Verification Document</Text>
				<Text
					style={[
						styles.uploadSubText,
						{
							color: colors.primaryGray,
						},
					]}
				>
					Registration certificate, license, etc.
				</Text>
				{mission.verificationDocumentUri ? (
					<Text style={{ color: colors.text }}>
						PDF Selected: {mission.verificationDocumentUri.split("/").pop()}
					</Text>
				) : null}
			</TouchableOpacity>

			<View style={styles.infoBox}>
				<Text style={[styles.infoText, { color: colors.primaryGray }]}>
					Documents are encrypted and stored securely.
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
		fontWeight: "500",
	},
	uploadSubText: {
		fontSize: 12,
		marginBottom: 12,
		fontWeight: "500",
	},
	preview: {
		width: 60,
		height: 60,
		borderRadius: 8,
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
});
