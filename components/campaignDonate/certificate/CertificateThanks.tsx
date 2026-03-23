import type { ThemeColors } from "@/app/_theme";
import useDonateTablet from "@/hooks/useDonateTablet";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

type CertificateThanksProps = {
	colors: ThemeColors;
};

export default function CertificateThanks({ colors }: CertificateThanksProps) {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const isTablet = useDonateTablet();

	const thanksRowMarginTop = isTablet
		? screenHeight * 0.018
		: screenHeight * 0.015;
	const thanksTitleFontSize = isTablet
		? screenWidth * 0.03
		: screenWidth * 0.035; // 28 / 14
	const thanksTitleMarginRight = isTablet
		? screenWidth * 0.015
		: screenWidth * 0.01; // 12 / 6
	const thanksSubtitleFontSize = isTablet
		? screenWidth * 0.03
		: screenWidth * 0.03; // 24 / 12
	const thanksSubtitleMarginTop = isTablet
		? screenHeight * 0.008
		: screenHeight * 0.006; // 8 / 4

	return (
		<>
			<View
				style={[
					styles.thanksRow,
					{
						marginTop: thanksRowMarginTop,
					},
				]}
			>
				<Text
					style={[
						styles.thanksTitle,
						{
							color: colors.primaryGray,
							fontSize: thanksTitleFontSize,
							marginRight: thanksTitleMarginRight,
						},
					]}
				>
					Thank you for your kindness 💚
				</Text>
			</View>

			<Text
				style={[
					styles.thanksSubtitle,
					{
						color: colors.primaryGray,
						marginTop: thanksSubtitleMarginTop,
						fontSize: thanksSubtitleFontSize,
					},
				]}
			>
				Your contribution makes a real difference.
			</Text>
		</>
	);
}

const styles = StyleSheet.create({
	thanksRow: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	thanksTitle: {
		fontWeight: "400",
	},
	thanksSubtitle: {
		fontWeight: "400",
		textAlign: "center",
	},
});
