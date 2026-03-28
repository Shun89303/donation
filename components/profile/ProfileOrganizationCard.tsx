import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import { metrics } from "@/utils/metrics";
import { Building2, ChevronRight } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

type ProfileOrganizationCardProps = {
	colors: ThemeColors;
	organizationName: string;
};

export default function ProfileOrganizationCard({
	colors,
	organizationName,
}: ProfileOrganizationCardProps) {
	return (
		<AnimatedPressable
			style={[
				styles.card,
				{
					backgroundColor: colors.primaryGreen,
				},
			]}
		>
			<View style={styles.orgRow}>
				<View
					style={[
						styles.orgIconWrap,
						{ backgroundColor: colors.secondaryDarkGreen },
					]}
				>
					<Building2 size={metrics.iconMediumXL} color={"#fff"} />
				</View>
				<View style={styles.orgTextWrap}>
					<Text style={[styles.orgTitle, { color: "#fff" }]}>
						My Organization
					</Text>
					<Text style={[styles.orgName, { color: colors.secondaryGray }]}>
						{organizationName}
					</Text>
				</View>
				<ChevronRight
					size={metrics.iconMediumLarge}
					color={colors.secondaryGray}
				/>
			</View>
		</AnimatedPressable>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: metrics.borderRadiusLarge,
		padding: metrics.spacingMedium,
	},
	orgRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: metrics.spacingMedium,
	},
	orgIconWrap: {
		width: metrics.iconMediumXL + metrics.spacingExtraLarge,
		height: metrics.iconMediumXL + metrics.spacingExtraLarge,
		borderRadius: metrics.borderRadiusLarge,
		alignItems: "center",
		justifyContent: "center",
	},
	orgTextWrap: {
		flex: 1,
		gap: metrics.spacingExtraSmall,
	},
	orgTitle: {
		fontSize: metrics.fontLarge,
		fontWeight: "700",
	},
	orgName: {
		fontSize: metrics.fontSmall,
		fontWeight: "500",
	},
});
