import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import useTablet from "@/hooks/useTablet";
import { ArrowLeft, BookmarkPlus, Share2 } from "lucide-react-native";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

type TopHeaderRowProps = {
	colors: ThemeColors;
	daysLeft: number;
	isUrgent: boolean;
	isSaved: boolean;
	onPressBack: () => void;
	onPressSave: () => void;
	onPressShare: () => void;
};

export function TopHeaderRow({
	colors,
	daysLeft,
	isUrgent,
	isSaved,
	onPressBack,
	onPressSave,
	onPressShare,
}: TopHeaderRowProps) {
	const isTablet = useTablet();
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const tabletScale = 0.75; // 75% of current tablet size

	const headerPaddingHorizontal = isTablet
		? Math.min(screenWidth * 0.04, 40) * tabletScale
		: Math.min(screenWidth * 0.045, 20);

	const headerPaddingTop = isTablet
		? Math.min(screenHeight * 0.012, 16) * tabletScale
		: Math.min(screenHeight * 0.008, 10);

	const headerPaddingBottom = isTablet
		? Math.min(screenHeight * 0.012, 16) * tabletScale
		: Math.min(screenHeight * 0.008, 10);

	const iconButtonSize = isTablet
		? Math.min(screenWidth * 0.085, 78) * tabletScale
		: Math.min(screenWidth * 0.1, 44);

	const iconSize = iconButtonSize * 0.55;

	const pillMarginHorizontal = isTablet
		? Math.min(screenWidth * 0.025, 24) * tabletScale
		: Math.min(screenWidth * 0.025, 12);

	const pillPaddingVertical = isTablet
		? Math.min(screenHeight * 0.014, 16) * tabletScale
		: Math.min(screenHeight * 0.009, 9);

	const pillPaddingHorizontal = isTablet
		? Math.min(screenWidth * 0.025, 24) * tabletScale
		: Math.min(screenWidth * 0.025, 12);

	const pillFontSize = isTablet
		? Math.min(screenWidth * 0.03, 26) * tabletScale
		: Math.min(screenWidth * 0.034, 14);

	const actionsGap = isTablet
		? Math.min(screenWidth * 0.025, 24) * tabletScale
		: Math.min(screenWidth * 0.02, 12);

	const iconButtonRadius = iconButtonSize / 2;

	return (
		<View
			style={[
				styles.topHeaderRow,
				{
					paddingHorizontal: headerPaddingHorizontal,
					paddingTop: headerPaddingTop,
					paddingBottom: headerPaddingBottom,
				},
			]}
		>
			<AnimatedPressable
				onPress={onPressBack}
				style={[
					styles.iconButton,
					{
						width: iconButtonSize,
						height: iconButtonSize,
						borderRadius: iconButtonRadius,
					},
				]}
				pressedScale={1.2}
				popScale={1}
			>
				<ArrowLeft size={iconSize} color="white" />
			</AnimatedPressable>

			<View
				style={[
					styles.dayLeftPill,
					{
						backgroundColor: isUrgent ? colors.primaryRed : colors.background,
						marginHorizontal: pillMarginHorizontal,
						paddingVertical: pillPaddingVertical,
						paddingHorizontal: pillPaddingHorizontal,
					},
				]}
			>
				<Text
					style={[
						styles.dayLeftPillText,
						{
							color: isUrgent ? "white" : colors.text,
							fontSize: pillFontSize,
						},
					]}
				>
					{isUrgent
						? `${daysLeft} days left -- Urgent`
						: `${daysLeft} days left`}
				</Text>
			</View>

			<View
				style={[
					styles.topActions,
					{
						gap: actionsGap,
					},
				]}
			>
				<AnimatedPressable
					style={[
						styles.iconButton,
						{
							width: iconButtonSize,
							height: iconButtonSize,
							borderRadius: iconButtonRadius,
						},
					]}
					onPress={onPressSave}
					pressedScale={1.2}
					popScale={1}
				>
					<BookmarkPlus
						size={iconSize}
						color={isSaved ? colors.primaryGreen : "white"}
					/>
				</AnimatedPressable>
				<AnimatedPressable
					style={[
						styles.iconButton,
						{
							width: iconButtonSize,
							height: iconButtonSize,
							borderRadius: iconButtonRadius,
						},
					]}
					onPress={onPressShare}
					pressedScale={1.2}
					popScale={1}
				>
					<Share2 size={iconSize} color="white" />
				</AnimatedPressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	topHeaderRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	topActions: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconButton: {
		borderRadius: 99,
		backgroundColor: "rgba(0,0,0,0.35)",
		alignItems: "center",
		justifyContent: "center",
	},
	dayLeftPill: {
		flex: 1,
		borderRadius: 999,

		alignItems: "center",
	},
	dayLeftPillText: {
		fontWeight: "700",
	},
});
