import { useTabIndicator } from "@/hooks/useTabIndicator";
import { useTheme } from "@/hooks/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { mainTabs, TabKey } from "../../navigation/mainTabs";

export default function TabLayout() {
	// dark / light mode custom color
	const colors = useTheme();

	// tab title + icon mapping
	const tabKeys = Object.keys(mainTabs) as TabKey[];
	const tabCount = tabKeys.length;

	// Bottom Tabs Animation
	const INDICATOR_WIDTH = 24;

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
						height: 80,
						borderTopWidth: 0,
						elevation: 0,
					},
					tabBarLabelStyle: {
						paddingTop: 2,
						fontSize: 12,
						fontWeight: "bold",
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
								<View
									style={{ alignItems: "center", justifyContent: "flex-start" }}
								>
									<Feather
										name={mainTabs[key].icon}
										size={size}
										color={color}
									/>
								</View>
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
						bottom: 80 - 3,
						left: 0,
						height: 3,
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
