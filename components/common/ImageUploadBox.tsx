import { metrics } from "@/utils/metrics";
import { Camera } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ImageUploadBoxProps {
	uri?: string;
	onPress: () => void;
	label?: string;
	note?: string;
	colors: any;
	size?: number;
	borderradius?: number;
}

export default function ImageUploadBox({
	uri,
	onPress,
	label,
	note,
	colors,
	size = metrics.thumbnailXXL,
	borderradius = size * 0.1,
}: ImageUploadBoxProps) {
	return (
		<View
			style={{ alignItems: "center", marginVertical: metrics.spacingMedium }}
		>
			<TouchableOpacity
				style={[
					styles.uploadBox,
					{
						width: size,
						height: size,
						backgroundColor: colors.secondaryGray,
						borderColor: colors.darkGreen,
						borderRadius: borderradius,
					},
				]}
				onPress={onPress}
			>
				{uri ? (
					<Image
						source={{ uri }}
						style={[styles.imagePreview, { borderRadius: size * 0.1 }]}
					/>
				) : (
					<Camera size={size / 2.4} color={colors.primaryGray} />
				)}

				{/* Small camera overlay */}
				<View
					style={[
						styles.smallCameraContainer,
						{
							backgroundColor: colors.primaryGreen,
							width: size / 3.5,
							height: size / 3.5,
							borderRadius: size / 7,
							bottom: -metrics.bottomExtraSmall,
							right: -metrics.rightExtraSmall,
						},
					]}
				>
					<Camera size={size / 7} color="white" />
				</View>
			</TouchableOpacity>

			{label && (
				<Text
					style={[
						styles.labelText,
						{
							color: colors.text,
							fontSize: metrics.fontMedium,
							marginTop: metrics.spacingMedium,
						},
					]}
				>
					{label}
				</Text>
			)}
			{note && (
				<Text
					style={[
						styles.noteText,
						{
							color: colors.primaryGray,
							fontSize: metrics.fontMedium,
							marginTop: metrics.spacingMedium,
						},
					]}
				>
					{note}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	uploadBox: {
		borderWidth: 2,
		borderStyle: "dashed",
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
		position: "relative",
	},
	imagePreview: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: undefined,
		height: undefined,
		resizeMode: "cover",
	},
	labelText: {
		textAlign: "center",
		fontWeight: "400",
	},
	noteText: {
		textAlign: "center",
		fontWeight: "500",
	},
	smallCameraContainer: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
	},
});
