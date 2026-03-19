import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { Dimensions, useColorScheme, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { darkColors, lightColors } from "../_theme";

// Screen Width
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const colors = colorScheme === "dark" ? darkColors : lightColors;

	// Feather icon names mapping
	const icons = {
		index: "home",
		map: "map-pin",
		creators: "play-circle",
		alerts: "bell",
		profile: "user",
	} as const;

	// Bottom Tab Titles mapping
	const titles: Record<string, string> = {
		index: "Home",
		map: "Map",
		creators: "Creators",
		alerts: "Alerts",
		profile: "Profile",
	};

	const tabKeys = Object.keys(icons);
	const tabCount = tabKeys.length;

	const activeIndex = useSharedValue(0);

	const INDICATOR_WIDTH = 24;

	// Bottom Tabs Animation
	const animatedStyle = useAnimatedStyle(() => {
		const tabWidth = SCREEN_WIDTH / tabCount;

		return {
			transform: [
				{
					translateX: withSpring(
						activeIndex.value * tabWidth + (tabWidth - INDICATOR_WIDTH) / 2,
						{
							damping: 15,
							stiffness: 200,
							mass: 0.6,
						},
					),
				},
			],
		};
	});

	return (
		<View style={{ flex: 1 }}>
			<Tabs
				screenOptions={{
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
							title: titles[key],
							tabBarIcon: ({ color, size }) => (
								<View
									style={{ alignItems: "center", justifyContent: "flex-start" }}
								>
									<Feather
										name={icons[key as keyof typeof icons]}
										size={size}
										color={color}
									/>
								</View>
							),
						}}
					/>
				))}
			</Tabs>

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
