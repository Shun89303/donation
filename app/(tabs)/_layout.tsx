import { useTabIndicator } from "@/hooks/useTabIndicator";
import { useTheme } from "@/hooks/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import Animated from "react-native-reanimated";
import { mainTabs, TabKey } from "../../navigation/mainTabs";

export default function TabLayout() {
	// dark / light mode custom color
	const colors = useTheme();

	// tab title + icon mapping
	const tabKeys = Object.keys(mainTabs) as TabKey[];
	const tabCount = tabKeys.length;

	// Bottom Tabs Animation
	const TAB_BAR_HEIGHT = Platform.OS === "android" ? 70 : 80;
	const INDICATOR_WIDTH = 24;
	const INDICATOR_HEIGHT = 3;
	const EXTRA_HEIGHT = Platform.OS === "android" ? 0 : 0;

	const { activeIndex, animatedStyle } = useTabIndicator(
		tabCount,
		INDICATOR_WIDTH,
	);

	return (
		<View style={{ flex: 1 }}>
			<Tabs
				screenOptions={{
					// this removes the white flash during tab transition
					sceneStyle: {
						backgroundColor: colors.background,
					},
					headerShown: false,
					tabBarStyle: {
						borderWidth: 0,
						elevation: 0,
						paddingTop: 0,
						paddingBottom: 0,
					},
					tabBarItemStyle: {
						paddingVertical: 0,
						justifyContent: "center",
						alignItems: "center",
					},
					tabBarActiveTintColor: colors.primaryGreen,
					tabBarInactiveTintColor: colors.primaryGray,
				}}
				// to remember the active tab index
				screenListeners={{
					state: (e) => {
						const index = e.data.state.index;
						activeIndex.value = index;
					},
				}}
			>
				{tabKeys.map((key) => (
					<Tabs.Screen
						key={key}
						name={key}
						options={{
							title: mainTabs[key].title,
							tabBarIcon: ({ color, size }) => (
								<Feather name={mainTabs[key].icon} size={size} color={color} />
							),
							tabBarStyle: {
								height:
									key === "creators"
										? TAB_BAR_HEIGHT
										: Platform.OS === "android"
											? TAB_BAR_HEIGHT
											: TAB_BAR_HEIGHT - 34,
								borderTopWidth: 0,
								backgroundColor: colors.background,
							},
							tabBarIconStyle: {
								marginTop: 0,
								position: "absolute",
								bottom: Platform.OS === "android" ? 15 : 12,
							},
							tabBarLabelStyle: {
								paddingTop: 0,
								fontSize: 11,
								lineHeight: 11,
								marginTop: 0,
								fontWeight: "bold",
								position: "absolute",
								bottom: Platform.OS === "android" ? 0 : 0,
							},
						}}
					/>
				))}
			</Tabs>

			{/* custom + animated top border of tab icon */}
			<Animated.View
				style={[
					{
						position: "absolute",
						bottom: TAB_BAR_HEIGHT - INDICATOR_HEIGHT + EXTRA_HEIGHT,
						left: 0,
						height: INDICATOR_HEIGHT,
						width: INDICATOR_WIDTH,
						backgroundColor: colors.primaryGreen,
						borderRadius: 2,
					},
					animatedStyle,
				]}
			/>
		</View>
	);
}

// import { useTabIndicator } from "@/hooks/useTabIndicator";
// import { useTheme } from "@/hooks/useTheme";
// import Feather from "@expo/vector-icons/Feather";
// import { Tabs } from "expo-router";
// import { Platform, useWindowDimensions, View } from "react-native";
// import Animated from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { mainTabs, TabKey } from "../../navigation/mainTabs";

// export default function TabLayout() {
// 	// dark / light mode custom color
// 	const colors = useTheme();

// 	const insets = useSafeAreaInsets();
// 	const { width, height } = useWindowDimensions();

// 	// tab title + icon mapping
// 	const tabKeys = Object.keys(mainTabs) as TabKey[];
// 	const tabCount = tabKeys.length;

// 	const isTablet = Math.min(width, height) >= 768;

// 	const BASE_TAB_HEIGHT = isTablet ? 58 : 40;
// 	const TAB_BAR_PADDING_TOP = isTablet ? 8 : 6;
// 	const TAB_BAR_PADDING_BOTTOM =
// 		Platform.OS === "ios" ? Math.max(insets.bottom, 6) : 6;

// 	const FINAL_TAB_HEIGHT = BASE_TAB_HEIGHT + TAB_BAR_PADDING_BOTTOM;

// 	const TAB_ICON_SIZE = isTablet ? 26 : 22;
// 	const INDICATOR_WIDTH = isTablet ? 32 : 24;
// 	const INDICATOR_HEIGHT = 3;

// 	// // Bottom Tabs Animation
// 	// const TAB_BAR_HEIGHT = Platform.OS === "android" ? 70 : 80;
// 	// const INDICATOR_WIDTH = 24;
// 	// const INDICATOR_HEIGHT = 3;
// 	// const EXTRA_HEIGHT = Platform.OS === "android" ? 0 : 0;
// 	const INDICATOR_BOTTOM_OFFSET = isTablet
// 		? TAB_BAR_PADDING_BOTTOM + 40
// 		: Platform.OS === "ios"
// 			? TAB_BAR_PADDING_BOTTOM + 36
// 			: TAB_BAR_PADDING_BOTTOM + 30;

// 	const { activeIndex, animatedStyle } = useTabIndicator(
// 		tabCount,
// 		INDICATOR_WIDTH,
// 	);

// 	return (
// 		<View style={{ flex: 1 }}>
// 			<Tabs
// 				screenOptions={{
// 					// this removes the white flash during tab transition
// 					sceneStyle: {
// 						backgroundColor: colors.background,
// 					},
// 					headerShown: false,
// 					tabBarLabelPosition: "below-icon",
// 					tabBarStyle: {
// 						height: FINAL_TAB_HEIGHT,
// 						paddingTop: TAB_BAR_PADDING_TOP,
// 						paddingBottom: TAB_BAR_PADDING_BOTTOM,
// 						borderTopWidth: 0,
// 						elevation: 0,
// 						backgroundColor: colors.background,
// 					},
// 					tabBarItemStyle: {
// 						justifyContent: "center",
// 						alignItems: "center",
// 					},
// 					tabBarActiveTintColor: colors.primaryGreen,
// 					tabBarInactiveTintColor: colors.primaryGray,
// 					tabBarLabelStyle: {
// 						fontSize: isTablet ? 12 : 11,
// 						fontWeight: "bold",
// 						marginTop: 2,
// 					},
// 				}}
// 				// to remember the active tab index
// 				screenListeners={{
// 					state: (e) => {
// 						const index = e.data.state.index;
// 						activeIndex.value = index;
// 					},
// 				}}
// 			>
// 				{tabKeys.map((key) => (
// 					<Tabs.Screen
// 						key={key}
// 						name={key}
// 						options={{
// 							title: mainTabs[key].title,
// 							tabBarIcon: ({ color }) => (
// 								<Feather
// 									name={mainTabs[key].icon}
// 									size={TAB_ICON_SIZE}
// 									color={color}
// 								/>
// 							),
// 						}}
// 					/>
// 				))}
// 			</Tabs>

// 			{/* custom + animated top border of tab icon */}
// 			<Animated.View
// 				style={[
// 					{
// 						position: "absolute",
// 						bottom: INDICATOR_BOTTOM_OFFSET,
// 						left: 0,
// 						height: INDICATOR_HEIGHT,
// 						width: INDICATOR_WIDTH,
// 						backgroundColor: colors.primaryGreen,
// 						borderRadius: 2,
// 					},
// 					animatedStyle,
// 				]}
// 			/>
// 		</View>
// 	);
// }
