import type { ThemeColors } from "@/app/_theme";
import AnimatedProgressBar from "@/components/common/AnimatedProgressBar";
import type { CampaignPost } from "@/components/home/campaignTypes";
import { Clock, Users } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

type ProgressStatsBlockProps = {
	colors: ThemeColors;
	campaign: CampaignPost;
};

export function ProgressStatsBlock({
	colors,
	campaign,
}: ProgressStatsBlockProps) {
	return (
		<>
			<AnimatedProgressBar
				colors={colors}
				progress={campaign.progress}
				trackStyle={{ marginTop: 14, height: 15 }}
			/>

			<View style={styles.statsWrap}>
				<View style={styles.statColumn}>
					<Text style={[styles.statPrimary, { color: colors.text }]}>
						{campaign.raisedLabel}
					</Text>
					<Text style={[styles.statSecondary, { color: colors.primaryGray }]}>
						{campaign.goalLabel}
					</Text>
				</View>

				<View style={styles.statColumnCenter}>
					<View style={styles.inlineValueRow}>
						<Users size={14} color={colors.primaryGray} />
						<Text
							style={[
								styles.statPrimary,
								styles.inlineValueText,
								{ color: colors.text },
							]}
						>
							{campaign.donors}
						</Text>
					</View>
					<Text style={[styles.statSecondary, { color: colors.primaryGray }]}>
						donors
					</Text>
				</View>

				<View style={styles.statColumnCenter}>
					<View style={styles.inlineValueRow}>
						<Clock size={14} color={colors.primaryGray} />
						<Text
							style={[
								styles.statPrimary,
								styles.inlineValueText,
								{ color: colors.text },
							]}
						>
							{campaign.daysLeft}
						</Text>
					</View>
					<Text style={[styles.statSecondary, { color: colors.primaryGray }]}>
						days left
					</Text>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	statsWrap: {
		marginTop: 12,
		borderRadius: 12,
		padding: 12,
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
		fontSize: 14,
		fontWeight: "700",
	},
	statSecondary: {
		fontSize: 12,
		fontWeight: "400",
		marginTop: 2,
	},
	inlineValueRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	inlineValueText: {
		marginLeft: 4,
	},
});
