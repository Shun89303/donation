import type { ThemeColors } from "@/app/_theme";
import { Award, X } from "lucide-react-native";
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
				<PopPressable
					onPress={onClose}
					style={[
						styles.closeButton,
						{
							backgroundColor: colors.secondaryGray,
						},
					]}
				>
					<X size={18} color={colors.primaryGray} />
				</PopPressable>
			</View>
			<View style={styles.headerCenter}>
				<View
					style={{
						padding: 20,
						backgroundColor: colors.secondaryGreen,
						borderRadius: 99,
					}}
				>
					<Award size={35} color={colors.primaryGreen} />
				</View>
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
		width: 32,
		height: 32,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 99,
		padding: 20,
	},
	headerCenter: {
		alignItems: "center",
	},
	title: {
		fontSize: 13,
		fontWeight: "500",
		marginTop: 8,
		letterSpacing: 0.5,
	},
});
