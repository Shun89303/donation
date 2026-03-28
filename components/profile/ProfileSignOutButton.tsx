import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import { StyleSheet, Text } from "react-native";

type ProfileSignOutButtonProps = {
	colors: ThemeColors;
};

export default function ProfileSignOutButton({
	colors,
}: ProfileSignOutButtonProps) {
	const router = useRouter();

	return (
		<AnimatedPressable
			style={[
				styles.signOutButton,
				{
					borderColor: colors.secondaryGray,
				},
			]}
			onPress={() => router.push("/auth")}
		>
			<LogOut size={metrics.iconMediumLarge} color={colors.primaryRed} />
			<Text style={[styles.signOutText, { color: colors.primaryRed }]}>
				Sign Out
			</Text>
		</AnimatedPressable>
	);
}

const styles = StyleSheet.create({
	signOutButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: metrics.spacingLarge,
		marginTop: metrics.spacingSmall,
		gap: metrics.spacingSmall,
		borderWidth: 1,
		borderRadius: metrics.borderRadiusLarge,
	},
	signOutText: {
		fontSize: metrics.fontLarge,
		fontWeight: "600",
	},
});
