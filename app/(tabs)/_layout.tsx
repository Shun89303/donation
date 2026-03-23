import CustomTabBar from "@/components/navigation/CustomTabBar";
import { useTheme } from "@/hooks/useTheme";
import { Tabs } from "expo-router";

export default function TabLayout() {
	const colors = useTheme();

	return (
		<Tabs
			tabBar={(props) => <CustomTabBar {...props} />}
			screenOptions={{
				headerShown: false,
				// fixes the sudden white flash during transition
				sceneStyle: { backgroundColor: colors.appBackground },
			}}
		>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="map" />
			<Tabs.Screen name="creators" />
			<Tabs.Screen name="alerts" />
			<Tabs.Screen name="profile" />
		</Tabs>
	);
}
