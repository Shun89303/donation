import { useTheme } from "@/hooks/useTheme";
import globalStyles from "@/styles/styles";
import { metrics } from "@/utils/metrics";
import { CircleCheck } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

type Props = {
	visible: boolean;
	message: string;
	onHide: () => void;
	autoHide?: boolean;
};

export default function BottomToast({
	visible,
	message,
	onHide,
	autoHide = true,
}: Props) {
	const translateY = useRef(new Animated.Value(100)).current;
	const opacity = useRef(new Animated.Value(0)).current;
	const colors = useTheme();

	useEffect(() => {
		if (visible) {
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

			if (autoHide) {
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
				}, 4000);
			}
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
					backgroundColor: colors.appBackground,
					flexDirection: "row",
					alignItems: "center",
					gap: metrics.spacingSmall,
					borderColor: colors.secondaryGray,
					...globalStyles.shadows,
				},
			]}
		>
			<CircleCheck
				size={metrics.iconLarge}
				color={"white"}
				fill={colors.text}
			/>
			<Text
				style={{
					fontSize: metrics.fontMedium,
					fontWeight: "700",
					color: colors.text,
				}}
			>
				{message}
			</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: metrics.bottomXXL,
		alignSelf: "center",
		paddingHorizontal: metrics.spacingMedium,
		paddingVertical: metrics.spacingSmall,
		borderRadius: metrics.borderRadiusMedium,
		borderWidth: 1,
	},
});
