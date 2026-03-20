import { Dimensions } from "react-native";
import {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;

export function useTabIndicator(tabCount: number, indicatorWidth: number) {
	const activeIndex = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		const tabWidth = SCREEN_WIDTH / tabCount;

		return {
			transform: [
				{
					translateX: withSpring(
						activeIndex.value * tabWidth + (tabWidth - indicatorWidth) / 2,
						{
							damping: 15,
							stiffness: 200,
							mass: 0.6,
						},
					),
				},
			],
		};
	});

	return {
		activeIndex,
		animatedStyle,
	};
}
