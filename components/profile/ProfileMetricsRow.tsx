import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import Feather from "@expo/vector-icons/Feather";
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
		<View style={styles.metricsRow}>
			<AnimatedPressable
				containerStyle={styles.metricCardContainer}
				style={[
					styles.metricCard,
					{
						backgroundColor: colors.profileCardBackground,
						borderColor: colors.profileBorder,
					},
				]}
			>
				<View
					style={[
						styles.metricIconWrap,
						{ backgroundColor: colors.profileAccentSoft },
					]}
				>
					<Feather name="heart" size={20} color={colors.profileAccent} />
				</View>
				<Text style={[styles.metricTitle, { color: colors.profileLabel }]}>
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
						backgroundColor: colors.profileCardBackground,
						borderColor: colors.profileBorder,
					},
				]}
			>
				<View
					style={[
						styles.metricIconWrap,
						{ backgroundColor: colors.profileAccentSoft },
					]}
				>
					<Feather name="bookmark" size={20} color={colors.profileAccent} />
				</View>
				<Text style={[styles.metricTitle, { color: colors.profileLabel }]}>
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
		gap: 12,
		justifyContent: "center",
	},
	metricCard: {
		width: "100%",
		borderWidth: 1,
		borderRadius: 16,
		paddingVertical: 16,
		alignItems: "center",
		gap: 5,
	},
	metricCardContainer: {
		flex: 1,
	},
	metricIconWrap: {
		width: 38,
		height: 38,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 2,
	},
	metricTitle: {
		fontSize: 12,
		fontWeight: "500",
	},
	metricValue: {
		fontSize: 20,
		fontWeight: "700",
	},
});
