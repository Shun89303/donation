import type { ThemeColors } from "@/app/_theme";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, View } from "react-native";

type CertificateThanksProps = {
	colors: ThemeColors;
};

export default function CertificateThanks({ colors }: CertificateThanksProps) {
	return (
		<>
			<View style={styles.thanksRow}>
				<Text style={[styles.thanksTitle, { color: colors.text }]}>Thank you for your kindness</Text>
				<Feather name="heart" size={16} color={colors.tabActive} />
			</View>
			<Text style={[styles.thanksSubtitle, { color: colors.placeholderMuted }]}>Your contribution makes a real difference.</Text>
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
		fontWeight: "700",
		marginRight: 6,
	},
	thanksSubtitle: {
		marginTop: 4,
		fontSize: 12,
		fontWeight: "500",
		textAlign: "center",
	},
});
