import {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

export function usePressScale() {
	// Generic press scale animation hook for buttons and interactive elements
	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const pressIn = () => {
		scale.value = withSpring(0.96);
	};

	const pressOut = () => {
		scale.value = withSpring(1);
	};

	return { scale, animatedStyle, pressIn, pressOut };
}
