import { type ReactNode, useRef } from "react";
import {
	Animated,
	Pressable,
	type PressableProps,
	type StyleProp,
	type ViewStyle,
} from "react-native";

type PopPressableProps = PressableProps & {
	children: ReactNode;
	popScale?: number;
	containerStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<ViewStyle>;
};

export default function PopPressable({
	children,
	popScale = 0.95,
	containerStyle,
	style,
	onPressIn,
	onPressOut,
	...props
}: PopPressableProps) {
	// Note: PopPressable uses own Animated implementation. Update to usePressScale in future if needed.
	const scale = useRef(new Animated.Value(1)).current;

	const animateTo = (toValue: number) => {
		Animated.spring(scale, {
			toValue,
			friction: 7,
			tension: 170,
			useNativeDriver: true,
		}).start();
	};

	return (
		<Animated.View style={[containerStyle, { transform: [{ scale }] }]}>
			<Pressable
				{...props}
				style={style}
				onPressIn={(event) => {
					animateTo(popScale);
					onPressIn?.(event);
				}}
				onPressOut={(event) => {
					animateTo(1);
					onPressOut?.(event);
				}}
			>
				{children}
			</Pressable>
		</Animated.View>
	);
}
