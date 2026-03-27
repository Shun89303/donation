import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import { useRouter } from "expo-router";
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
			style={styles.signOutButton}
			onPress={() => router.push("/auth")}
		>
			<Text style={[styles.signOutText, { color: colors.profileDanger }]}>
				Sign Out
			</Text>
		</AnimatedPressable>
	);
}

const styles = StyleSheet.create({
	signOutButton: {
		alignItems: "center",
		paddingVertical: 8,
		marginTop: 2,
	},
	signOutText: {
		fontSize: 15,
		fontWeight: "700",
	},
});
