import { useRef, type ReactNode } from "react";
import {
	Animated,
	Pressable,
	type PressableProps,
	type StyleProp,
	type ViewStyle,
} from "react-native";

type AnimatedPressableProps = Omit<PressableProps, "style" | "children"> & {
	children: ReactNode;
	containerStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<ViewStyle>;
	pressedScale?: number;
	popScale?: number;
};

export default function AnimatedPressable({
	children,
	containerStyle,
	style,
	onPressIn,
	onPressOut,
	pressedScale = 0.97,
	popScale = 1,
	...rest
}: AnimatedPressableProps) {
	const scale = useRef(new Animated.Value(1)).current;

	const handlePressIn: PressableProps["onPressIn"] = (event) => {
		Animated.timing(scale, {
			toValue: pressedScale,
			duration: 60,
			useNativeDriver: true,
		}).start();
		onPressIn?.(event);
	};

	const handlePressOut: PressableProps["onPressOut"] = (event) => {
		Animated.sequence([
			Animated.spring(scale, {
				toValue: popScale,
				useNativeDriver: true,
				friction: 5,
				tension: 120,
			}),
		]).start();
		onPressOut?.(event);
	};

	return (
		<Pressable
			{...rest}
			style={containerStyle}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
		>
			<Animated.View style={[style, { transform: [{ scale }] }]}>
				{children}
			</Animated.View>
		</Pressable>
	);
}
