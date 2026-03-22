import {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

export function useTabScale() {
	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const pressIn = () => {
		scale.value = withSpring(0.9);
	};

	const pressOut = () => {
		scale.value = withSpring(1);
	};

	return { scale, animatedStyle, pressIn, pressOut };
}
