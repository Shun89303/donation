import type { ThemeColors } from "@/app/_theme";
import type { CampaignPost } from "@/components/home/campaignTypes";
import useTablet from "@/hooks/useTablet";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

type ImpactBlockProps = {
	colors: ThemeColors;
	campaign: CampaignPost;
};

export function ImpactBlock({ colors, campaign }: ImpactBlockProps) {
	const isTablet = useTablet();
	const { width: screenWidth } = useWindowDimensions();

	// Scale factor for tablet to slightly reduce size
	const tabletScale = 0.8;

	// Dynamic values
	const fontSize = isTablet
		? screenWidth * 0.025 * tabletScale
		: screenWidth * 0.035;
	const iconMargin = isTablet
		? screenWidth * 0.015 * tabletScale
		: screenWidth * 0.015;

	const impactTextStyle = {
		color: colors.primaryGray,
		fontSize,
		marginLeft: iconMargin,
	};

	return campaign.impactType === "families" ? (
		<View style={styles.impactRowCentered}>
			<Text style={[styles.impactText, impactTextStyle]}>
				🏠{campaign.familiesHelped}/{campaign.familiesTarget} families helped
			</Text>
		</View>
	) : campaign.impactType === "education" ? (
		<View style={styles.impactRowCentered}>
			<Text style={[styles.impactText, impactTextStyle]}>
				🏠{campaign.educationSchools} school, {campaign.educationStudents}{" "}
				students
			</Text>
		</View>
	) : null;
}

const styles = StyleSheet.create({
	impactRowCentered: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	impactText: {
		fontWeight: "400",
	},
});
