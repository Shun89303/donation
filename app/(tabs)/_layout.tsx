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
						backgroundColor: colors.background,
						height: TAB_BAR_HEIGHT,
						borderTopWidth: 0,
						elevation: 0,
						paddingTop: 0,
						paddingBottom: 0,
					},
					tabBarItemStyle: {
						paddingVertical: 0,
						justifyContent: "center",
						alignItems: "center",
					},
					tabBarIconStyle: {
						marginTop: 0,
						position: "absolute",
						top: Platform.OS === "android" ? 10 : 10,
					},
					tabBarLabelStyle: {
						paddingTop: 0,
						fontSize: 11,
						lineHeight: 11,
						marginTop: 0,
						fontWeight: "bold",
						position: "absolute",
						top: Platform.OS === "android" ? 35 : 40,
					},
					tabBarActiveTintColor: colors.tabActive,
					tabBarInactiveTintColor: colors.tabInactive,
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
						backgroundColor: colors.tabActive,
						borderRadius: 2,
					},
					animatedStyle,
				]}
			/>
		</View>
	);
}
