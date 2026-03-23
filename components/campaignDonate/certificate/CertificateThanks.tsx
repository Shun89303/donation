import type { ThemeColors } from "@/app/_theme";
import { StyleSheet, Text, View } from "react-native";

type CertificateThanksProps = {
	colors: ThemeColors;
};

export default function CertificateThanks({ colors }: CertificateThanksProps) {
	return (
		<>
			<View style={styles.thanksRow}>
				<Text style={[styles.thanksTitle, { color: colors.primaryGray }]}>
					Thank you for your kindness 💚
				</Text>
			</View>
			<Text style={[styles.thanksSubtitle, { color: colors.primaryGray }]}>
				Your contribution makes a real difference.
			</Text>
		</>
	);
}

const styles = StyleSheet.create({
	thanksRow: {
		marginTop: 12,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	thanksTitle: {
		fontSize: 14,
		fontWeight: "400",
		marginRight: 6,
	},
	thanksSubtitle: {
		marginTop: 4,
		fontSize: 12,
		fontWeight: "400",
		textAlign: "center",
	},
});
