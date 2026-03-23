import type { ThemeColors } from "@/app/_theme";
import useDonateTablet from "@/hooks/useDonateTablet";
import { Award, X } from "lucide-react-native";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import PopPressable from "../PopPressable";

type CertificateHeaderProps = {
	colors: ThemeColors;
	onClose: () => void;
};

export default function CertificateHeader({
	colors,
	onClose,
}: CertificateHeaderProps) {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const isTablet = useDonateTablet();

	const closeButtonWidth = isTablet ? screenWidth * 0.055 : screenWidth * 0.09;
	const closeButtonHeight = closeButtonWidth; // square button
	const closeButtonPadding = closeButtonWidth * 0.6; // padding proportional to button
	const closeIconSize = closeButtonWidth * 0.56; // icon proportional to button

	const containerPadding = isTablet ? screenWidth * 0.025 : screenWidth * 0.05;
	const containerBorderRadius = containerPadding * 3; // ensures round
	const awardIconSize = containerPadding * 2; // proportional to container

	const fontSize = isTablet ? screenWidth * 0.03 : screenWidth * 0.036; // roughly 26 / 13
	const marginTop = isTablet ? screenHeight * 0.015 : screenHeight * 0.015; // roughly 16 / 8
	const letterSpacing = fontSize * 0.038; // roughly 1 / 0.5

	return (
		<>
			<View style={styles.closeRow}>
				<PopPressable
					onPress={onClose}
					style={[
						styles.closeButton,
						{
							backgroundColor: colors.secondaryGray,
							// width: 32,
							// height: 32,
							// padding: 20,
							width: closeButtonWidth,
							height: closeButtonHeight,
							padding: closeButtonPadding,
						},
					]}
				>
					{/* <X size={18} color={colors.primaryGray} /> */}
					<X size={closeIconSize} color={colors.primaryGray} />
				</PopPressable>
			</View>
			<View style={styles.headerCenter}>
				<View
					style={{
						padding: containerPadding,
						backgroundColor: colors.secondaryGreen,
						borderRadius: containerBorderRadius,
					}}
				>
					{/* <Award size={35} color={colors.primaryGreen} /> */}
					<Award size={awardIconSize} color={colors.primaryGreen} />
				</View>
				<Text
					style={[
						styles.title,
						{
							color: colors.text,
							// fontSize: 13,
							// marginTop: 8,
							// letterSpacing: 0.5,
							fontSize,
							marginTop,
							letterSpacing,
						},
					]}
				>
					CERTIFICATE OF DONATION
				</Text>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	closeRow: {
		alignItems: "flex-end",
	},
	closeButton: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 99,
	},
	headerCenter: {
		alignItems: "center",
	},
	title: {
		fontWeight: "500",
	},
});
