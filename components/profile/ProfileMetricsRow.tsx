import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import globalStyles from "@/styles/styles";
import { metrics } from "@/utils/metrics";
import { BookmarkCheck, Heart } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { toCount } from "./profileUtils";

type ProfileMetricsRowProps = {
	colors: ThemeColors;
	donationCount?: number;
	savedCount?: number;
};

export default function ProfileMetricsRow({
	colors,
	donationCount,
	savedCount,
}: ProfileMetricsRowProps) {
	const safeDonationCount = toCount(donationCount);
	const safeSavedCount = toCount(savedCount);

	return (
		<View style={[styles.metricsRow]}>
			<AnimatedPressable
				containerStyle={styles.metricCardContainer}
				style={[
					styles.metricCard,
					{
						backgroundColor: colors.background,
						borderColor: colors.secondaryGray,
						...globalStyles.shadows,
					},
				]}
			>
				<View
					style={[
						styles.metricIconWrap,
						{ backgroundColor: colors.secondaryGreen },
					]}
				>
					<Heart size={metrics.iconMediumXL} color={colors.primaryGreen} />
				</View>
				<Text style={[styles.metricTitle, { color: colors.primaryGray }]}>
					Donations
				</Text>
				<Text style={[styles.metricValue, { color: colors.text }]}>
					{safeDonationCount}
				</Text>
			</AnimatedPressable>
			<AnimatedPressable
				containerStyle={styles.metricCardContainer}
				style={[
					styles.metricCard,
					{
						backgroundColor: colors.background,
						borderColor: colors.secondaryGray,
						...globalStyles.shadows,
					},
				]}
			>
				<View
					style={[
						styles.metricIconWrap,
						{ backgroundColor: colors.secondaryGreen },
					]}
				>
					<BookmarkCheck
						size={metrics.iconMediumXL}
						color={colors.primaryGreen}
					/>
				</View>
				<Text style={[styles.metricTitle, { color: colors.primaryGray }]}>
					Saved
				</Text>
				<Text style={[styles.metricValue, { color: colors.text }]}>
					{safeSavedCount}
				</Text>
			</AnimatedPressable>
		</View>
	);
}

const styles = StyleSheet.create({
	metricsRow: {
		flexDirection: "row",
		gap: metrics.spacingMedium,
		justifyContent: "center",
	},
	metricCard: {
		width: "100%",
		borderWidth: 1,
		borderRadius: metrics.borderRadiusLarge,
		paddingVertical: metrics.spacingMedium,
		alignItems: "center",
		gap: metrics.spacingExtraSmall,
	},
	metricCardContainer: {
		flex: 1,
	},
	metricIconWrap: {
		width: metrics.iconMediumXL + metrics.spacingExtraLarge,
		height: metrics.iconMediumXL + metrics.spacingExtraLarge,
		borderRadius: metrics.borderRadiusLarge,
		alignItems: "center",
		justifyContent: "center",
	},
	metricTitle: {
		fontSize: metrics.fontSmall,
		fontWeight: "500",
	},
	metricValue: {
		fontSize: metrics.fontLarge,
		fontWeight: "700",
	},
});
