import { useTabIndicator } from "@/hooks/useTabIndicator";
import { useTheme } from "@/hooks/useTheme";
import { mainTabs, TabKey } from "@/navigation/mainTabs";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Bell, CirclePlay, House, MapPin, User } from "lucide-react-native";
import {
	Platform,
	TouchableWithoutFeedback,
	useWindowDimensions,
	View,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const iconMap: Record<TabKey, React.ComponentType<any>> = {
	index: House,
	map: MapPin,
	creators: CirclePlay as any,
	alerts: Bell,
	profile: User,
};

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
	const colors = useTheme();
	const insets = useSafeAreaInsets();
	const { width, height } = useWindowDimensions();
	const tabKeys = Object.keys(mainTabs) as TabKey[];
	const tabCount = tabKeys.length;

	const isTablet = Math.min(width, height) >= 768;

	const TAB_BAR_HEIGHT = isTablet ? 58 : 50;
	const TAB_ICON_SIZE = isTablet ? 30 : 22;
	const INDICATOR_WIDTH = isTablet ? 32 : 24;
	const INDICATOR_HEIGHT = 3;

	const INDICATOR_BOTTOM_OFFSET = isTablet
		? insets.bottom + 50
		: Platform.OS === "ios"
			? insets.bottom + 45
			: insets.bottom + 45;

	const { activeIndex, animatedStyle } = useTabIndicator(
		tabCount,
		INDICATOR_WIDTH,
	);
	activeIndex.value = state.index;

	const scaleIndex = useSharedValue(1);
	const scaleMap = useSharedValue(1);
	const scaleCreators = useSharedValue(1);
	const scaleAlerts = useSharedValue(1);
	const scaleProfile = useSharedValue(1);

	const animatedIndex = useAnimatedStyle(() => ({
		transform: [{ scale: scaleIndex.value }],
	}));
	const animatedMap = useAnimatedStyle(() => ({
		transform: [{ scale: scaleMap.value }],
	}));
	const animatedCreators = useAnimatedStyle(() => ({
		transform: [{ scale: scaleCreators.value }],
	}));
	const animatedAlerts = useAnimatedStyle(() => ({
		transform: [{ scale: scaleAlerts.value }],
	}));
	const animatedProfile = useAnimatedStyle(() => ({
		transform: [{ scale: scaleProfile.value }],
	}));

	const scales = [
		scaleIndex,
		scaleMap,
		scaleCreators,
		scaleAlerts,
		scaleProfile,
	];
	const animatedStyles = [
		animatedIndex,
		animatedMap,
		animatedCreators,
		animatedAlerts,
		animatedProfile,
	];

	return (
		<View
			style={{
				position: "absolute",
				bottom: 0,
				left: 0,
				right: 0,
				height: TAB_BAR_HEIGHT + insets.bottom,
				backgroundColor: colors.background,
				paddingBottom: insets.bottom,
				paddingTop: isTablet ? 8 : 6,
				flexDirection: "row",
				shadowColor: "#000",
				shadowOffset: { width: 0, height: -2 },
				shadowOpacity: 0.1,
				shadowRadius: 10,
				elevation: 5,
			}}
		>
			{tabKeys.map((key, index) => {
				const isActive = state.index === index;
				const IconComponent = iconMap[key];
				const scale = scales[index];
				const animatedStyle = animatedStyles[index];

				return (
					<TouchableWithoutFeedback
						key={key}
						onPressIn={() => {
							scale.value = withSpring(0.9);
						}}
						onPressOut={() => {
							scale.value = withSpring(1);
							navigation.navigate(key);
						}}
					>
						<Animated.View
							style={[
								animatedStyle,
								{
									flex: 1,
									alignItems: "center",
									justifyContent: "center",
									paddingVertical: 4,
								},
							]}
						>
							<IconComponent
								size={TAB_ICON_SIZE}
								color={isActive ? colors.primaryGreen : colors.primaryGray}
							/>
							<Animated.Text
								style={{
									fontSize: isTablet ? 12 : 11,
									fontWeight: isActive ? "bold" : "500",
									color: isActive ? colors.primaryGreen : colors.primaryGray,
									marginTop: 4,
									lineHeight: 11,
								}}
							>
								{mainTabs[key].title}
							</Animated.Text>
						</Animated.View>
					</TouchableWithoutFeedback>
				);
			})}

			{/* Animated indicator */}
			<Animated.View
				style={[
					{
						position: "absolute",
						bottom: INDICATOR_BOTTOM_OFFSET,
						left: 0,
						height: INDICATOR_HEIGHT,
						width: INDICATOR_WIDTH,
						backgroundColor: colors.primaryGreen,
						borderRadius: 2,
						zIndex: 10,
					},
					animatedStyle,
				]}
			/>
		</View>
	);
}
