import { Camera } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface StepFourProps {
	logoUri?: string;
	colors: any;
	pickFile: (field: "logoUri") => void;
}

export default function StepFour({ logoUri, colors, pickFile }: StepFourProps) {
	return (
		<View style={{ marginBottom: 40 }}>
			<Text style={[styles.stepTitle, { color: colors.text }]}>
				Organization Logo
			</Text>

			<View style={{ alignItems: "center", marginTop: 12 }}>
				<TouchableOpacity
					style={[
						styles.logoUpload,
						{
							backgroundColor: colors.secondaryGray,
							borderColor: colors.darkGreen,
						},
					]}
					onPress={() => pickFile("logoUri")}
				>
					{logoUri ? (
						<Image source={{ uri: logoUri }} style={styles.logoPreview} />
					) : (
						<Camera size={50} color={colors.primaryGray} />
					)}

					{/* Small camera overlay */}
					<View
						style={[
							styles.smallCameraContainer,
							{
								backgroundColor: colors.primaryGreen,
							},
						]}
					>
						<Camera size={18} color="white" />
					</View>
				</TouchableOpacity>

				<Text style={[styles.logoText, { marginTop: 16 }]}>
					Tap to upload your logo
				</Text>
				<Text style={[styles.noteText, { color: colors.primaryGray }]}>
					You can skip this and add a logo later.
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
	logoUpload: {
		borderWidth: 2,
		borderStyle: "dashed",
		borderRadius: 12,
		width: 120,
		height: 120,
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 20,
		overflow: "hidden",
		position: "relative",
	},
	logoPreview: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: undefined,
		height: undefined,
		borderRadius: 12,
		resizeMode: "cover",
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
	smallCameraContainer: {
		position: "absolute",
		bottom: -5,
		right: -5,
		width: 32,
		height: 32,
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 4,
	},
});
