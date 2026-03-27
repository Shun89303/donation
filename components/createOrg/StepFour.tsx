import { metrics } from "@/utils/metrics";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ImageUploadBox from "../common/ImageUploadBox";

interface StepFourProps {
	logoUri?: string;
	colors: any;
	pickFile: (field: "logoUri") => void;
}

export default function StepFour({ logoUri, colors, pickFile }: StepFourProps) {
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
				Organization Logo
			</Text>

			<View style={{ alignItems: "center", marginTop: metrics.spacingLarge }}>
				<ImageUploadBox
					uri={logoUri}
					onPress={() => pickFile("logoUri")}
					colors={colors}
					label="Tap to upload your logo"
					note="You can skip this and add a logo later."
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	stepTitle: {
		fontWeight: "bold",
	},
});
