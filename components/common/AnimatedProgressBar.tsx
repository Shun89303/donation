import type { ThemeColors } from "@/app/_theme";
import { useEffect } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type AnimatedProgressBarProps = {
	colors: ThemeColors;
	progress: number;
	trackStyle?: ViewStyle;
	fillStyle?: ViewStyle;
};

export default function AnimatedProgressBar({
	colors,
	progress,
	trackStyle,
	fillStyle,
}: AnimatedProgressBarProps) {
	const progressValue = useSharedValue(0);

	useEffect(() => {
		progressValue.value = withTiming(progress * 100, {
			duration: 1000,
			easing: Easing.out(Easing.quad),
		});
	}, [progress]);

	const progressAnimStyle = useAnimatedStyle(
		() => ({
			width: `${progressValue.value}%`,
		}),
		[],
	);

	return (
		<Animated.View
			style={[
				styles.progressTrack,
				{
					backgroundColor: colors.secondaryGray,
				},
				trackStyle,
			]}
		>
			<Animated.View
				style={[
					styles.progressFill,
					{
						backgroundColor: colors.primaryGreen,
					},
					fillStyle,
					progressAnimStyle,
				]}
			/>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	progressTrack: {
		height: 10,
		borderRadius: 8,
		borderWidth: 0.5,
		borderColor: "transparent",
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		borderRadius: 8,
	},
});
