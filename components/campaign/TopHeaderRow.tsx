import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import useTablet from "@/hooks/useTablet";
import { ArrowLeft, BookmarkPlus, Share2 } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

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

	return (
		<View
			style={[
				styles.topHeaderRow,
				{
					paddingHorizontal: isTablet ? 32 : 16,
					paddingTop: isTablet ? 12 : 6,
					paddingBottom: isTablet ? 12 : 6,
				},
			]}
		>
			<AnimatedPressable
				onPress={onPressBack}
				style={[
					styles.iconButton,
					{
						width: isTablet ? 72 : 36,
						height: isTablet ? 72 : 36,
					},
				]}
				pressedScale={1.2}
				popScale={1}
			>
				<ArrowLeft size={isTablet ? 40 : 20} color="white" />
			</AnimatedPressable>

			<View
				style={[
					styles.dayLeftPill,
					{
						backgroundColor: isUrgent ? colors.primaryRed : colors.background,
						marginHorizontal: isTablet ? 20 : 10,
						paddingVertical: isTablet ? 14 : 7,
						paddingHorizontal: isTablet ? 20 : 10,
					},
				]}
			>
				<Text
					style={[
						styles.dayLeftPillText,
						{
							color: isUrgent ? "white" : colors.text,
							fontSize: isTablet ? 24 : 12,
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
						gap: isTablet ? 20 : 10,
					},
				]}
			>
				<AnimatedPressable
					style={[
						styles.iconButton,
						{
							width: isTablet ? 72 : 36,
							height: isTablet ? 72 : 36,
						},
					]}
					onPress={onPressSave}
					pressedScale={1.2}
					popScale={1}
				>
					<BookmarkPlus
						size={isTablet ? 40 : 20}
						color={isSaved ? colors.primaryGreen : "white"}
					/>
				</AnimatedPressable>
				<AnimatedPressable
					style={[
						styles.iconButton,
						{
							width: isTablet ? 72 : 36,
							height: isTablet ? 72 : 36,
						},
					]}
					onPress={onPressShare}
					pressedScale={1.2}
					popScale={1}
				>
					<Share2 size={isTablet ? 40 : 20} color="white" />
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
