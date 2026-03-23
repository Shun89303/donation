import type { ThemeColors } from "@/app/_theme";
import useDonateTablet from "@/hooks/useDonateTablet";
import { Download, Share2 } from "lucide-react-native";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import PopPressable from "../PopPressable";

type CertificateActionsProps = {
	colors: ThemeColors;
	onPressDownload?: () => void;
	onPressShare?: () => void;
};

export default function CertificateActions({
	colors,
	onPressDownload,
	onPressShare,
}: CertificateActionsProps) {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const isTablet = useDonateTablet();

	const actionRowMarginVertical = isTablet
		? screenHeight * 0.005
		: screenHeight * 0.015; // 24 / 12
	const actionRowGap = isTablet ? screenWidth * 0.02 : screenWidth * 0.015; // 20 / 10
	const buttonBorderRadius = isTablet
		? screenWidth * 0.025
		: screenWidth * 0.03; // 20 / 10
	const buttonMinHeight = isTablet ? screenHeight * 0.065 : screenHeight * 0.06; // 64 / 42
	const iconSize = isTablet ? screenWidth * 0.03 : screenWidth * 0.04; // 32 / 16
	const textFontSize = isTablet ? screenWidth * 0.035 : screenWidth * 0.035; // 26 / 13
	const textMarginLeft = isTablet ? screenWidth * 0.015 : screenWidth * 0.01; // 12 / 6

	return (
		<View
			style={[
				styles.actionRow,
				{
					marginVertical: actionRowMarginVertical,
					gap: actionRowGap,
				},
			]}
		>
			<PopPressable
				onPress={onPressDownload}
				containerStyle={styles.half}
				style={[
					styles.actionButton,
					styles.downloadButton,
					{
						borderColor: colors.secondaryGray,
						backgroundColor: "transparent",
						borderRadius: buttonBorderRadius,
						minHeight: buttonMinHeight,
					},
				]}
			>
				<Download size={iconSize} color={colors.text} />
				<Text
					style={[
						styles.downloadText,
						{
							color: colors.text,
							marginLeft: textMarginLeft,
							fontSize: textFontSize,
						},
					]}
				>
					Download
				</Text>
			</PopPressable>

			<PopPressable
				onPress={onPressShare}
				containerStyle={styles.half}
				style={[
					styles.actionButton,
					{
						backgroundColor: colors.primaryGreen,
						borderRadius: buttonBorderRadius,
						minHeight: buttonMinHeight,
					},
				]}
			>
				<Share2 size={iconSize} color="white" />
				<Text
					style={[
						styles.shareText,
						{
							marginLeft: textMarginLeft,
							fontSize: textFontSize,
						},
					]}
				>
					Share
				</Text>
			</PopPressable>
		</View>
	);
}

const styles = StyleSheet.create({
	actionRow: {
		flexDirection: "row",
	},
	half: {
		flex: 1,
	},
	actionButton: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	downloadButton: {
		borderWidth: 1,
	},
	downloadText: {
		fontWeight: "500",
	},
	shareText: {
		fontWeight: "700",
		color: "white",
	},
});
