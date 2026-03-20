import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

export default function FadeScreen({
	children,
}: {
	children: React.ReactNode;
}) {
	const opacity = useSharedValue(0);
	const translateY = useSharedValue(10);

	useFocusEffect(
		useCallback(() => {
			// reset before animating
			opacity.value = 0;
			translateY.value = 10;

			opacity.value = withTiming(1, { duration: 400 });
			translateY.value = withTiming(0, { duration: 400 });
		}, []),
	);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ translateY: translateY.value }],
	}));

	return (
		<Animated.View
			style={[
				{
					flex: 1,
				},
				animatedStyle,
			]}
		>
			{children}
		</Animated.View>
	);
}
