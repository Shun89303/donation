import type { ThemeColors } from "@/app/_theme";
import { useRef } from "react";
import {
	Animated,
	type GestureResponderEvent,
	Pressable,
	StyleSheet,
	Text,
} from "react-native";

type SupportButtonProps = {
	colors: ThemeColors;
	onPress: (event: GestureResponderEvent) => void;
};

export default function SupportButton({ colors, onPress }: SupportButtonProps) {
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
		<Animated.View style={{ transform: [{ scale }] }}>
			<Pressable
				style={[styles.supportButton, { backgroundColor: colors.tabActive }]}
				onPressIn={() => animateTo(0.95)}
				onPressOut={() => animateTo(1)}
				onPress={onPress}
			>
				<Text style={styles.supportButtonText}>Support this village</Text>
			</Pressable>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	supportButton: {
		marginTop: 12,
		borderRadius: 12,
		paddingVertical: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	supportButtonText: {
		color: "white",
		fontSize: 15,
		fontWeight: "700",
	},
});
