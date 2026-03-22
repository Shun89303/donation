import type { ThemeColors } from "@/app/_theme";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, View } from "react-native";
import PopPressable from "../PopPressable";

type CertificateHeaderProps = {
	colors: ThemeColors;
	onClose: () => void;
};

export default function CertificateHeader({
	colors,
	onClose,
}: CertificateHeaderProps) {
	return (
		<>
			<View style={styles.closeRow}>
				<PopPressable onPress={onClose} style={styles.closeButton}>
					<Feather name="x" size={18} color={colors.placeholderMuted} />
				</PopPressable>
			</View>
			<View style={styles.headerCenter}>
				<Feather name="award" size={28} color={colors.tabActive} />
				<Text style={[styles.title, { color: colors.text }]}>
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
		width: 28,
		height: 28,
		alignItems: "center",
		justifyContent: "center",
	},
	headerCenter: {
		alignItems: "center",
	},
	title: {
		fontSize: 13,
		fontWeight: "800",
		marginTop: 8,
		letterSpacing: 0.5,
	},
});
