import type { ThemeColors } from "@/app/_theme";
import React from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

type CertificateFrameProps = {
	colors: ThemeColors;
	children: React.ReactNode;
	style?: ViewStyle;
};

function Corner({
	style,
	borderColor,
}: {
	style: ViewStyle;
	borderColor: string;
}) {
	return <View style={[styles.cornerBase, style, { borderColor }]} />;
}

export default function CertificateFrame({
	colors,
	children,
	style,
}: CertificateFrameProps) {
	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: colors.appBackground,
					borderColor: colors.darkGreen,
				},
				style,
			]}
		>
			<Corner style={styles.topLeft} borderColor={colors.darkGreen} />
			<Corner style={styles.topRight} borderColor={colors.darkGreen} />
			<Corner style={styles.bottomLeft} borderColor={colors.darkGreen} />
			<Corner style={styles.bottomRight} borderColor={colors.darkGreen} />

			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		borderWidth: 1,
		borderRadius: 12,
		overflow: "hidden",
	},

	cornerBase: {
		position: "absolute",
		width: 18,
		height: 18,
	},

	topLeft: {
		top: 8,
		left: 8,
		borderTopWidth: 2,
		borderLeftWidth: 2,
		borderTopLeftRadius: 16,
	},

	topRight: {
		top: 8,
		right: 8,
		borderTopWidth: 2,
		borderRightWidth: 2,
		borderTopRightRadius: 16,
	},

	bottomLeft: {
		bottom: 8,
		left: 8,
		borderBottomWidth: 2,
		borderLeftWidth: 2,
		borderBottomLeftRadius: 16,
	},

	bottomRight: {
		bottom: 8,
		right: 8,
		borderBottomWidth: 2,
		borderRightWidth: 2,
		borderBottomRightRadius: 16,
	},
});
