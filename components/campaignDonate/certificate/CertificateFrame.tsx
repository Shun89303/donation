import type { ThemeColors } from "@/app/_theme";
import useDonateTablet from "@/hooks/useDonateTablet";
import React from "react";
import {
	StyleSheet,
	View,
	type ViewStyle,
	useWindowDimensions,
} from "react-native";

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
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const isTablet = useDonateTablet();

	const containerBorderRadius = isTablet
		? screenWidth * 0.03
		: screenWidth * 0.04; // original 12
	const cornerSize = isTablet ? screenWidth * 0.035 : screenWidth * 0.036; // original 18
	const cornerOffset = isTablet ? screenWidth * 0.015 : screenWidth * 0.016; // original 8
	const cornerBorderRadius = isTablet ? screenWidth * 0.03 : screenWidth * 0.04; // original 16
	const cornerBorderWidth = isTablet ? 2 : 2; // can remain 2 or scale if needed

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: colors.appBackground,
					borderColor: colors.darkGreen,
					borderRadius: containerBorderRadius,
				},
				style,
			]}
		>
			<Corner
				style={{
					width: cornerSize,
					height: cornerSize,
					top: cornerOffset,
					left: cornerOffset,
					borderTopWidth: cornerBorderWidth,
					borderLeftWidth: cornerBorderWidth,
					borderTopLeftRadius: cornerBorderRadius,
				}}
				borderColor={colors.darkGreen}
			/>
			<Corner
				style={{
					width: cornerSize,
					height: cornerSize,
					top: cornerOffset,
					right: cornerOffset,
					borderTopWidth: cornerBorderWidth,
					borderRightWidth: cornerBorderWidth,
					borderTopRightRadius: cornerBorderRadius,
				}}
				borderColor={colors.darkGreen}
			/>
			<Corner
				style={{
					width: cornerSize,
					height: cornerSize,
					bottom: cornerOffset,
					left: cornerOffset,
					borderBottomWidth: cornerBorderWidth,
					borderLeftWidth: cornerBorderWidth,
					borderBottomLeftRadius: cornerBorderRadius,
				}}
				borderColor={colors.darkGreen}
			/>
			<Corner
				style={{
					width: cornerSize,
					height: cornerSize,
					bottom: cornerOffset,
					right: cornerOffset,
					borderBottomWidth: cornerBorderWidth,
					borderRightWidth: cornerBorderWidth,
					borderBottomRightRadius: cornerBorderRadius,
				}}
				borderColor={colors.darkGreen}
			/>

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
});
