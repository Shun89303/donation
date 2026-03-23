import type { ThemeColors } from "@/app/_theme";
import { Download, Share2 } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
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
	return (
		<View style={styles.actionRow}>
			<PopPressable
				onPress={onPressDownload}
				containerStyle={styles.half}
				style={[
					styles.actionButton,
					styles.downloadButton,
					{ borderColor: colors.secondaryGray, backgroundColor: "transparent" },
				]}
			>
				<Download size={16} color={colors.text} />
				<Text style={[styles.downloadText, { color: colors.text }]}>
					Download
				</Text>
			</PopPressable>
			<PopPressable
				onPress={onPressShare}
				containerStyle={styles.half}
				style={[styles.actionButton, { backgroundColor: colors.primaryGreen }]}
			>
				<Share2 size={16} color="white" />
				<Text style={styles.shareText}>Share</Text>
			</PopPressable>
		</View>
	);
}

const styles = StyleSheet.create({
	actionRow: {
		marginVertical: 12,
		flexDirection: "row",
		gap: 10,
	},
	half: {
		flex: 1,
	},
	actionButton: {
		width: "100%",
		borderRadius: 10,
		minHeight: 42,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	downloadButton: {
		borderWidth: 1,
	},
	downloadText: {
		marginLeft: 6,
		fontSize: 13,
		fontWeight: "500",
	},
	shareText: {
		marginLeft: 6,
		fontSize: 13,
		fontWeight: "700",
		color: "white",
	},
});
