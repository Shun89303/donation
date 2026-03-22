import { useTabIndicator } from "@/hooks/useTabIndicator";
import { useTheme } from "@/hooks/useTheme";
import { mainTabs, TabKey } from "@/navigation/mainTabs";
import { useTabBarConfig } from "@/navigation/tabConfig";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import TabButton from "./TabButton";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
	const colors = useTheme();
	const tabKeys = Object.keys(mainTabs) as TabKey[];
	const tabCount = tabKeys.length;
	const {
		TAB_BAR_HEIGHT,
		INDICATOR_WIDTH,
		INDICATOR_HEIGHT,
		INDICATOR_BOTTOM_OFFSET,
		insets,
		isTablet,
	} = useTabBarConfig();

	const { activeIndex, animatedStyle } = useTabIndicator(
		tabCount,
		INDICATOR_WIDTH,
	);
	activeIndex.value = state.index;

	const containerStyle = {
		position: "absolute" as const,
		bottom: 0,
		left: 0,
		right: 0,
		height: TAB_BAR_HEIGHT + insets.bottom,
		backgroundColor: colors.background,
		paddingBottom: insets.bottom,
		paddingTop: isTablet ? 8 : 6,
		flexDirection: "row" as const,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
	};

	return (
		<View style={containerStyle}>
			{tabKeys.map((key, index) => (
				<TabButton
					key={key}
					tabKey={key}
					isActive={state.index === index}
					onPress={() => navigation.navigate(key)}
					index={index}
				/>
			))}

			{/* Animated indicator */}
			<Animated.View
				style={[
					{
						position: "absolute" as const,
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
