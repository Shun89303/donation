import type { ThemeColors } from "@/app/_theme";
import type { CampaignPost } from "@/components/home/campaignTypes";
import useTablet from "@/hooks/useTablet";
import globalStyles from "@/styles/styles";
import { View, useWindowDimensions } from "react-native";
import { CampaignMetaBlock } from "./CampaignMetaBlock";
import { ImpactBlock } from "./ImpactBlock";
import { OrgSummaryBlock } from "./OrgSummaryBlock";
import { ProgressStatsBlock } from "./ProgressStatsBlock";

type CampaignSummaryBlockProps = {
	colors: ThemeColors;
	campaign: CampaignPost;
};

export function CampaignSummaryBlock({
	colors,
	campaign,
}: CampaignSummaryBlockProps) {
	const isTablet = useTablet();
	const { width: screenWidth } = useWindowDimensions();

	// Base scale factor relative to screen width
	const scale = isTablet ? screenWidth / 800 : screenWidth / 400;

	// Dynamic values
	const marginTop = 14 * scale;
	const borderRadius = isTablet ? 40 * scale : 24 * scale;
	const padding = isTablet ? 30 * scale : 20 * scale;
	const borderWidth = 0.5 * scale;

	return (
		<View
			style={{
				borderColor: colors.secondaryGray,
				backgroundColor: colors.background,
				shadowColor: colors.primaryGray,
				marginTop,
				borderWidth,
				borderRadius,
				padding,
				...globalStyles.shadows,
			}}
		>
			<OrgSummaryBlock colors={colors} campaign={campaign} />
			<CampaignMetaBlock colors={colors} campaign={campaign} />
			<ProgressStatsBlock colors={colors} campaign={campaign} />
			<ImpactBlock colors={colors} campaign={campaign} />
		</View>
	);
}
