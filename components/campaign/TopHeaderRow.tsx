import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import Feather from "@expo/vector-icons/Feather";
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
	return (
		<View style={styles.topHeaderRow}>
			<AnimatedPressable
				onPress={onPressBack}
				style={styles.iconButton}
				pressedScale={1.2}
				popScale={1}
			>
				<Feather name="arrow-left" size={20} color={colors.text} />
			</AnimatedPressable>

			<View
				style={[
					styles.dayLeftPill,
					{
						backgroundColor: isUrgent
							? colors.profileDanger
							: colors.surfaceMuted,
					},
				]}
			>
				<Text
					style={[
						styles.dayLeftPillText,
						{ color: isUrgent ? colors.background : colors.text },
					]}
				>
					{isUrgent
						? `${daysLeft} days left -- Urgent`
						: `${daysLeft} days left`}
				</Text>
			</View>

			<View style={styles.topActions}>
				<AnimatedPressable
					style={styles.iconButton}
					onPress={onPressSave}
					pressedScale={1.2}
					popScale={1}
				>
					<Feather
						name="bookmark"
						size={20}
						color={isSaved ? colors.primaryGreen : colors.text}
					/>
				</AnimatedPressable>
				<AnimatedPressable
					style={styles.iconButton}
					onPress={onPressShare}
					pressedScale={1.2}
					popScale={1}
				>
					<Feather name="share-2" size={20} color={colors.text} />
				</AnimatedPressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	topHeaderRow: {
		paddingHorizontal: 16,
		paddingTop: 6,
		paddingBottom: 6,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	topActions: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconButton: {
		width: 36,
		height: 36,
		alignItems: "center",
		justifyContent: "center",
	},
	dayLeftPill: {
		flex: 1,
		marginHorizontal: 10,
		borderRadius: 999,
		paddingVertical: 7,
		paddingHorizontal: 10,
		alignItems: "center",
	},
	dayLeftPillText: {
		fontSize: 12,
		fontWeight: "700",
	},
});
