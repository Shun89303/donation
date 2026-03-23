import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import type { CampaignPost } from "@/components/home/campaignTypes";
import { formatMmkNeeded } from "@/utils/campaignDetailsUtils";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

type FooterSectionProps = {
	colors: ThemeColors;
	campaign: CampaignPost;
	neededAmount: number;
	donorsOrdinal: string;
};

export function FooterSection({
	colors,
	campaign,
	neededAmount,
	donorsOrdinal,
}: FooterSectionProps) {
	const router = useRouter();

	const handleSupportPress = () => {
		router.push(`/campaign/${campaign.id}/donate`);
	};

	return (
		<View
			style={[
				styles.footer,
				{
					borderTopColor: colors.tabInactive,
					backgroundColor: colors.background,
				},
			]}
		>
			<View
				style={[
					styles.footerInfoBox,
					{
						backgroundColor: colors.background,
						borderColor: colors.tabInactive,
					},
				]}
			>
				<Text
					style={[styles.footerTopText, { color: colors.placeholderMuted }]}
				>
					You will be the {donorsOrdinal} donor
				</Text>
				<Text style={[styles.footerBottomText, { color: colors.text }]}>
					{formatMmkNeeded(neededAmount)}
				</Text>
			</View>

			<AnimatedPressable
				style={[styles.supportButton, { backgroundColor: colors.primaryGreen }]}
				onPress={handleSupportPress}
			>
				<Text style={styles.supportButtonText}>Support this village</Text>
			</AnimatedPressable>
		</View>
	);
}

const styles = StyleSheet.create({
	footer: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		borderTopWidth: 1,
		paddingHorizontal: 16,
		paddingTop: 10,
		paddingBottom: 14,
		flexDirection: "row",
		alignItems: "center",
	},
	footerInfoBox: {
		flex: 1,
		paddingVertical: 8,
		minWidth: "50%",
	},
	footerTopText: {
		fontSize: 13,
		fontWeight: "500",
	},
	footerBottomText: {
		fontSize: 12,
		fontWeight: "700",
		marginTop: 2,
	},
	supportButton: {
		borderRadius: 12,
		paddingHorizontal: 14,
		paddingVertical: 12,
	},
	supportButtonText: {
		color: "white",
		fontSize: 14,
		fontWeight: "800",
	},
});
