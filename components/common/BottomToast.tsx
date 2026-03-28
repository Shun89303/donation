import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

type Props = {
	visible: boolean;
	message: string;
	onHide: () => void;
};

export default function BottomToast({ visible, message, onHide }: Props) {
	const translateY = useRef(new Animated.Value(100)).current;
	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (visible) {
			// Slide up + fade in
			Animated.parallel([
				Animated.timing(translateY, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();

			// Auto hide after delay
			setTimeout(() => {
				Animated.parallel([
					Animated.timing(translateY, {
						toValue: 100,
						duration: 300,
						useNativeDriver: true,
					}),
					Animated.timing(opacity, {
						toValue: 0,
						duration: 300,
						useNativeDriver: true,
					}),
				]).start(onHide);
			}, 2000);
		}
	}, [visible]);

	return (
		<Animated.View
			pointerEvents="none"
			style={[
				styles.container,
				{
					transform: [{ translateY }],
					opacity,
				},
			]}
		>
			<Text style={styles.text}>{message}</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 40,
		alignSelf: "center",
		backgroundColor: "#333",
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 20,
	},
	text: {
		color: "#fff",
		fontSize: 14,
	},
});
