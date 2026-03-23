import type { ThemeColors } from "@/app/_theme";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function CampaignDetailsNotFound() {
	const colors = useTheme() as ThemeColors;
	const router = useRouter();

	return (
		<View style={[styles.notFoundWrap, { backgroundColor: colors.background }]}>
			<Text style={[styles.notFoundTitle, { color: colors.text }]}>
				Campaign not found
			</Text>
			<Text
				style={[styles.notFoundSubtitle, { color: colors.placeholderMuted }]}
			>
				The campaign id is invalid or no longer available.
			</Text>
			<Pressable
				style={[styles.backButton, { backgroundColor: colors.primaryGreen }]}
				onPress={() => router.replace("/(tabs)")}
			>
				<Text style={styles.backButtonText}>Go Home</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	notFoundWrap: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	notFoundTitle: {
		fontSize: 22,
		fontWeight: "800",
	},
	notFoundSubtitle: {
		marginTop: 8,
		fontSize: 14,
		fontWeight: "500",
		textAlign: "center",
	},
	backButton: {
		marginTop: 20,
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 12,
	},
	backButtonText: {
		color: "white",
		fontSize: 15,
		fontWeight: "700",
	},
});
