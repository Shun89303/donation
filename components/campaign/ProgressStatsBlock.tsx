import type { ThemeColors } from "@/app/_theme";
import AnimatedProgressBar from "@/components/common/AnimatedProgressBar";
import type { CampaignPost } from "@/components/home/campaignTypes";
import useTablet from "@/hooks/useTablet";
import { Clock, Users } from "lucide-react-native";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

type ProgressStatsBlockProps = {
	colors: ThemeColors;
	campaign: CampaignPost;
};

export function ProgressStatsBlock({
	colors,
	campaign,
}: ProgressStatsBlockProps) {
	const isTablet = useTablet();
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	// Slightly smaller scaling for tablets
	const tabletScale = 0.8;

	const baseFont = isTablet
		? screenWidth * 0.028 * tabletScale
		: screenWidth * 0.035;
	const smallFont = baseFont * 0.85;
	const iconSize = baseFont * 1.2;
	const progressHeight = isTablet
		? screenHeight * 0.018 * tabletScale
		: screenHeight * 0.015;
	const containerPadding = isTablet
		? screenWidth * 0.02 * tabletScale
		: screenWidth * 0.03;
	const containerMarginTop = isTablet
		? screenHeight * 0.01 * tabletScale
		: screenHeight * 0.015;
	const labelMarginTop = isTablet
		? screenHeight * 0.005 * tabletScale
		: screenHeight * 0.0025;
	const inlineGap = isTablet
		? screenWidth * 0.02 * tabletScale
		: screenWidth * 0.01;

	return (
		<>
			<AnimatedProgressBar
				colors={colors}
				progress={campaign.progress}
				trackStyle={{
					marginTop: containerMarginTop,
					height: progressHeight,
				}}
			/>

			<View
				style={[
					styles.statsWrap,
					{
						padding: containerPadding,
					},
				]}
			>
				<View style={styles.statColumn}>
					<Text
						style={[
							styles.statPrimary,
							{ color: colors.text, fontSize: baseFont },
						]}
					>
						{campaign.raisedLabel}
					</Text>
					<Text
						style={[
							styles.statSecondary,
							{
								color: colors.primaryGray,
								fontSize: smallFont,
								marginTop: labelMarginTop,
							},
						]}
					>
						{campaign.goalLabel}
					</Text>
				</View>

				<View style={styles.statColumnCenter}>
					<View style={[styles.inlineValueRow, { gap: inlineGap }]}>
						<Users size={iconSize} color={colors.primaryGray} />
						<Text
							style={[
								styles.statPrimary,
								{
									color: colors.text,
									fontSize: baseFont,
									marginLeft: inlineGap / 2,
								},
							]}
						>
							{campaign.donors}
						</Text>
					</View>
					<Text
						style={[
							styles.statSecondary,
							{
								color: colors.primaryGray,
								fontSize: smallFont,
								marginTop: labelMarginTop,
							},
						]}
					>
						donors
					</Text>
				</View>

				<View style={styles.statColumnCenter}>
					<View style={[styles.inlineValueRow, { gap: inlineGap }]}>
						<Clock size={iconSize} color={colors.primaryGray} />
						<Text
							style={[
								styles.statPrimary,
								{
									color: colors.text,
									fontSize: baseFont,
									marginLeft: inlineGap / 2,
								},
							]}
						>
							{campaign.daysLeft}
						</Text>
					</View>
					<Text
						style={[
							styles.statSecondary,
							{
								color: colors.primaryGray,
								fontSize: smallFont,
								marginTop: labelMarginTop,
							},
						]}
					>
						days left
					</Text>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	statsWrap: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	statColumn: {
		flex: 1.35,
	},
	statColumnCenter: {
		flex: 1,
		alignItems: "center",
	},
	statPrimary: {
		fontWeight: "700",
	},
	statSecondary: {
		fontWeight: "400",
	},
	inlineValueRow: {
		flexDirection: "row",
		alignItems: "center",
	},
});
