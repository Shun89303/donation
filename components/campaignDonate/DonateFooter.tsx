import type { ThemeColors } from "@/app/_theme";
import { StyleSheet, Text, View } from "react-native";
import PopPressable from "./PopPressable";

type DonateFooterProps = {
	colors: ThemeColors;
	ctaLabel: string;
	onPress?: () => void;
};

export default function DonateFooter({ colors, ctaLabel, onPress }: DonateFooterProps) {
	return (
		<View style={[styles.footer, { borderTopColor: colors.tabInactive }]}> 
			<PopPressable
				onPress={onPress}
				style={[styles.donateButton, { backgroundColor: colors.tabActive }]}
			>
				<Text style={styles.donateButtonText}>{ctaLabel}</Text>
			</PopPressable>
		</View>
	);
}

const styles = StyleSheet.create({
	footer: {
		paddingHorizontal: 16,
		paddingTop: 12,
		paddingBottom: 16,
		borderTopWidth: 1,
	},
	donateButton: {
		borderRadius: 12,
		paddingVertical: 13,
		alignItems: "center",
		justifyContent: "center",
	},
	donateButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "800",
	},
});
