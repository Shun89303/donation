import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { StyleSheet, View } from "react-native";

export default function StepProgress({ currentStep }: { currentStep: number }) {
	const colors = useTheme();

	return (
		<View
			style={[
				styles.progressContainer,
				{
					marginTop: metrics.spacingMedium,
					marginBottom: metrics.spacingSmall,
					paddingHorizontal: metrics.spacingSmall,
				},
			]}
		>
			{Array.from({ length: 5 }, (_, i) => (
				<View
					key={i}
					style={[
						styles.progressBar,
						{
							backgroundColor:
								i + 1 <= currentStep
									? colors.primaryGreen
									: colors.secondaryGray,
							height: metrics.dimensions.height.xs,
							borderRadius: metrics.borderRadiusMedium,
							marginHorizontal: metrics.spacingExtraSmall,
						},
					]}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	progressContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	progressBar: {
		flex: 1,
	},
});
