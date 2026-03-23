import type { ThemeColors } from "@/app/_theme";
import useDonateTablet from "@/hooks/useDonateTablet";
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
	const isTablet = useDonateTablet();

	return (
		<View
			style={[
				styles.actionRow,
				{
					marginVertical: isTablet ? 24 : 12,
					gap: isTablet ? 20 : 10,
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
						borderRadius: isTablet ? 20 : 10,
						minHeight: isTablet ? 64 : 42,
					},
				]}
			>
				<Download size={isTablet ? 32 : 16} color={colors.text} />
				<Text
					style={[
						styles.downloadText,
						{
							color: colors.text,
							marginLeft: isTablet ? 12 : 6,
							fontSize: isTablet ? 26 : 13,
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
						borderRadius: isTablet ? 20 : 10,
						minHeight: isTablet ? 64 : 42,
					},
				]}
			>
				<Share2 size={isTablet ? 32 : 16} color="white" />
				<Text
					style={[
						styles.shareText,
						{
							marginLeft: isTablet ? 12 : 6,
							fontSize: isTablet ? 26 : 13,
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
