import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

// Reusable Button Component
const WizardButton = ({
	label,
	onPress,
	disabled = false,
	type = "primary",
}: {
	label: string;
	onPress: () => void;
	disabled?: boolean;
	type?: "primary" | "secondary";
}) => {
	const colors = useTheme();
	// Press animation
	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const handlePressIn = () => {
		scale.value = withSpring(0.97);
	};
	const handlePressOut = () => {
		scale.value = withSpring(1);
	};

	return (
		<Animated.View style={animatedStyle}>
			<Pressable
				style={[
					styles.button,
					{
						backgroundColor: colors.primaryGreen,
						borderRadius: metrics.borderRadiusMedium,
						paddingHorizontal: metrics.spacingMedium,
						paddingVertical: metrics.spacingMedium,
						marginHorizontal: metrics.spacingMedium,
					},
					disabled && styles.disabledButton,
				]}
				onPress={onPress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				disabled={disabled}
			>
				<View
					style={[
						styles.content,
						{
							gap: metrics.spacingSmall,
						},
					]}
				>
					<Text
						style={[
							styles.buttonText,
							{ color: "white", fontSize: metrics.fontMedium },
							disabled && { color: "white" },
						]}
					>
						{label}
					</Text>
					<ChevronRight size={metrics.iconMedium} color="white" />
				</View>
			</Pressable>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	button: {
		justifyContent: "center", // centers the content container
	},

	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center", // spacing between text and icon (or use marginLeft)
	},
	disabledButton: {
		opacity: 0.5,
	},
	buttonText: {
		fontWeight: "600",
	},
});

export default WizardButton;
