import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import type { CampaignPost } from "@/components/home/campaignTypes";
import { formatMmkNeeded } from "@/utils/campaignDetailsUtils";
import { metrics } from "@/utils/metrics";
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
					borderTopColor: colors.secondaryGray,
					backgroundColor: colors.background,
					borderTopWidth: metrics.borderThin,
					paddingHorizontal: metrics.spacingMedium,
					paddingTop: metrics.spacingSmall,
					paddingBottom: metrics.spacingMedium,
				},
			]}
		>
			<View
				style={[
					styles.footerInfoBox,
					{
						backgroundColor: colors.background,
						borderColor: colors.tabInactive,
						paddingVertical: metrics.spacingSmall,
					},
				]}
			>
				<Text
					style={[
						styles.footerTopText,
						{ color: colors.placeholderMuted, fontSize: metrics.fontSmall },
					]}
				>
					You will be the {donorsOrdinal} donor
				</Text>
				<Text
					style={[
						styles.footerBottomText,
						{
							color: colors.text,
							fontSize: metrics.fontMedium,
							marginTop: metrics.spacingExtraSmall,
						},
					]}
				>
					{formatMmkNeeded(neededAmount)}
				</Text>
			</View>

			<AnimatedPressable
				style={{
					backgroundColor: colors.primaryGreen,
					borderRadius: metrics.borderRadiusLarge,
					paddingHorizontal: metrics.spacingLarge,
					paddingVertical: metrics.spacingMedium,
				}}
				onPress={handleSupportPress}
			>
				<Text
					style={[
						styles.supportButtonText,
						{
							fontSize: metrics.fontMedium,
						},
					]}
				>
					Support this village
				</Text>
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
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	footerInfoBox: {
		flex: 1,
		minWidth: "50%",
	},
	footerTopText: {
		fontWeight: "500",
	},
	footerBottomText: {
		fontWeight: "700",
	},
	supportButtonText: {
		color: "white",
		fontWeight: "800",
	},
});
