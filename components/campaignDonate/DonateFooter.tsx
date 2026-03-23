import type { ThemeColors } from "@/app/_theme";
import { StyleSheet, Text, View } from "react-native";
import PopPressable from "./PopPressable";

type DonateFooterProps = {
	colors: ThemeColors;
	ctaLabel: string;
	onPress?: () => void;
	// New responsive props
	paddingScale: number;
	fontScale: number;
};

export default function DonateFooter({
	colors,
	ctaLabel,
	onPress,
	paddingScale,
	fontScale,
}: DonateFooterProps) {
	const footerPadH = Math.round(16 * paddingScale);
	const footerPadT = Math.round(12 * paddingScale);
	const footerPadB = Math.round(16 * paddingScale);
	const buttonPad = Math.round(18 * paddingScale);
	const buttonRadius = Math.round(12 * paddingScale);
	const textFontSize = Math.round(16 * fontScale);
	const textWeight = "800";

	return (
		<View
			style={[
				styles.footer,
				{
					borderTopColor: colors.secondaryGray,
					paddingHorizontal: footerPadH,
					paddingTop: footerPadT,
					paddingBottom: footerPadB,
				},
			]}
		>
			<PopPressable
				onPress={onPress}
				style={[
					styles.donateButton,
					{
						backgroundColor: colors.tabActive,
						borderRadius: buttonRadius,
						padding: buttonPad,
					},
				]}
			>
				<Text
					style={[
						styles.donateButtonText,
						{
							color: "white",
							fontSize: textFontSize,
							fontWeight: textWeight,
						},
					]}
				>
					{ctaLabel}
				</Text>
			</PopPressable>
		</View>
	);
}

const styles = StyleSheet.create({
	footer: {
		borderTopWidth: 1,
	},
	donateButton: {
		alignItems: "center",
		justifyContent: "center",
	},
	donateButtonText: {},
});
