import type { ThemeColors } from "@/app/_theme";
import type { CampaignPost } from "@/components/home/campaignTypes";
import useTablet from "@/hooks/useTablet";
import { formatDate } from "@/utils/campaignDetailsUtils";
import { Calendar, MapPin } from "lucide-react-native";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

type CampaignMetaBlockProps = {
	colors: ThemeColors;
	campaign: CampaignPost;
};

export function CampaignMetaBlock({
	colors,
	campaign,
}: CampaignMetaBlockProps) {
	const isTablet = useTablet();
	const { width: screenWidth } = useWindowDimensions();

	// Base scale factor
	const scale = isTablet ? screenWidth / 800 : screenWidth / 400;

	// Dynamic values
	const titleFontSize = 24 * scale;
	const titleLineHeight = 31 * scale;
	const titleMarginTop = 16 * scale;

	const rowMarginTop = 8 * scale;
	const itemGap = 5 * scale;
	const iconSize = 14 * scale;
	const inlineTextFontSize = 13 * scale;

	const aboutFontSize = 14 * scale;
	const aboutLineHeight = 22 * scale;
	const aboutMarginTop = 10 * scale;

	return (
		<>
			<Text
				style={{
					color: colors.text,
					fontSize: titleFontSize,
					lineHeight: titleLineHeight,
					marginTop: titleMarginTop,
					fontWeight: "700",
				}}
			>
				{campaign.title}
			</Text>

			<View style={[styles.metaSingleRow, { marginTop: rowMarginTop }]}>
				<View style={[styles.metaItemInline, { gap: itemGap }]}>
					<MapPin size={iconSize} color={colors.primaryGray} />
					<Text
						style={[
							styles.metaInlineText,
							{ color: colors.primaryGray, fontSize: inlineTextFontSize },
						]}
					>
						{campaign.locationLabel}
					</Text>
				</View>

				<View style={[styles.metaItemInline, { gap: itemGap }]}>
					<Calendar size={iconSize} color={colors.primaryGray} />
					<Text
						style={[
							styles.metaInlineText,
							{ color: colors.primaryGray, fontSize: inlineTextFontSize },
						]}
					>
						{formatDate(campaign.initiatedAt)}
					</Text>
				</View>
			</View>

			<Text
				style={{
					color: colors.primaryGray,
					marginTop: aboutMarginTop,
					fontSize: aboutFontSize,
					fontWeight: "400",
					lineHeight: aboutLineHeight,
				}}
			>
				{campaign.aboutText}
			</Text>
		</>
	);
}

const styles = StyleSheet.create({
	metaSingleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	metaItemInline: {
		flexDirection: "row",
		alignItems: "center",
		maxWidth: "60%",
	},
	metaInlineText: {
		fontWeight: "400",
	},
});
