import type { ThemeColors } from "@/app/_theme";
import { usePressScale } from "@/hooks/usePressScale";
import { Search, User } from "lucide-react-native";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

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
	const { width, height } = Dimensions.get("window");
	const isTablet = width >= 800;
	const isNarrowPhone = width < 450;
	const fontScale = isTablet ? 1.6 : isNarrowPhone ? 0.95 : 1.1;
	const iconSize = isTablet ? 54 : isNarrowPhone ? 38 : 42;
	const spacingScale = isTablet ? 1.3 : isNarrowPhone ? 0.9 : 1.0;
	const brandFontSize = Math.round(32 * fontScale);
	const subtitleFontSize = Math.round(14 * fontScale);
	const brandPaddingRight = Math.round(12 * spacingScale);
	const secondaryMarginLeft = Math.round(10 * spacingScale);
	const iconHitSlop = Math.round(6 * spacingScale);

	const searchPress = usePressScale();
	const profilePress = usePressScale();

	const aspectRatio = width / height;
	const landscapeBoost = aspectRatio > 0.75 ? 1.05 : 1.0;

	return (
		<View style={styles.headerRow}>
			{/* Container of DanaLink + Direct impact,...etc */}
			<View style={[styles.brandBlock, { paddingRight: brandPaddingRight }]}>
				<Text
					style={[
						styles.brandTitle,
						{
							fontSize: brandFontSize,
							letterSpacing: 0.3 * landscapeBoost,
							color: colors.text,
						},
					]}
				>
					DanaLink
				</Text>
				<Text
					style={[
						styles.brandSubtitle,
						{
							fontSize: subtitleFontSize,
							color: colors.primaryGray,
						},
					]}
				>
					Direct impact, verified in real-time.
				</Text>
			</View>
			{/* Container of search + profile buttons */}
			<View style={styles.actionRow}>
				<Pressable
					accessibilityRole="button"
					accessibilityLabel="Search"
					hitSlop={iconHitSlop}
					onPress={onPressSearch}
					onPressIn={searchPress.pressIn}
					onPressOut={searchPress.pressOut}
					style={({ pressed }) => [
						styles.iconButton,
						{
							width: iconSize,
							height: iconSize,
							borderRadius: iconSize / 2,
							backgroundColor: colors.secondaryGray,
						},
					]}
				>
					<Animated.View style={[searchPress.animatedStyle]}>
						<Search size={20 * fontScale} color={colors.primaryGray} />
					</Animated.View>
				</Pressable>
				<Pressable
					accessibilityRole="button"
					accessibilityLabel="Profile"
					hitSlop={iconHitSlop}
					onPress={onPressProfile}
					onPressIn={profilePress.pressIn}
					onPressOut={profilePress.pressOut}
					style={({ pressed }) => [
						styles.iconButton,
						styles.secondaryAction,
						{
							width: iconSize,
							height: iconSize,
							borderRadius: iconSize / 2,
							backgroundColor: colors.primaryGreen,
							marginLeft: secondaryMarginLeft,
						},
					]}
				>
					<Animated.View style={[profilePress.animatedStyle]}>
						<User size={20 * fontScale} color="white" />
					</Animated.View>
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
	},
	brandTitle: {
		fontWeight: "700",
	},
	brandSubtitle: {
		marginTop: 4,
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
});
