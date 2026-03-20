import type { ThemeColors } from "@/app/_theme";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet, Text, View } from "react-native";

type HomeHeaderProps = {
	colors: ThemeColors;
	onPressSearch: () => void;
	onPressProfile: () => void;
};

export default function HomeHeader({
	colors,
	onPressSearch,
	onPressProfile,
}: HomeHeaderProps) {
	return (
		<View style={styles.headerRow}>
			{/* Container of DanaLink + Direct impact,...etc */}
			<View style={styles.brandBlock}>
				<Text style={[styles.brandTitle, { color: colors.text }]}>
					DanaLink
				</Text>
				<Text style={[styles.brandSubtitle, { color: colors.tabInactive }]}>
					Direct impact, verified in real-time.
				</Text>
			</View>
			{/* Container of search + profile buttons */}
			<View style={styles.actionRow}>
				<Pressable
					accessibilityRole="button"
					accessibilityLabel="Search"
					hitSlop={6}
					onPress={onPressSearch}
					style={({ pressed }) => [
						styles.iconButton,
						{ backgroundColor: colors.surfaceMuted },
						pressed && styles.iconButtonPressed,
					]}
				>
					<Feather name="search" size={20} color={colors.onSurfaceMuted} />
				</Pressable>
				<Pressable
					accessibilityRole="button"
					accessibilityLabel="Profile"
					hitSlop={6}
					onPress={onPressProfile}
					style={({ pressed }) => [
						styles.iconButton,
						styles.secondaryAction,
						{ backgroundColor: colors.tabActive },
						pressed && styles.iconButtonPressed,
					]}
				>
					<Feather name="user" size={20} color="white" />
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	headerRow: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	brandBlock: {
		flexShrink: 1,
		paddingRight: 12,
	},
	brandTitle: {
		fontSize: 32,
		fontWeight: "700",
		letterSpacing: 0.3,
	},
	brandSubtitle: {
		marginTop: 4,
		fontSize: 14,
		fontWeight: "500",
		lineHeight: 20,
	},
	actionRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconButton: {
		width: 42,
		height: 42,
		borderRadius: 21,
		justifyContent: "center",
		alignItems: "center",
	},
	secondaryAction: {
		marginLeft: 10,
	},
	iconButtonPressed: {
		opacity: 0.82,
		transform: [{ scale: 0.96 }],
	},
});
