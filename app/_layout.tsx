import { ToastProvider } from "@/contexts/ToastContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<>
			<ToastProvider>
				<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
				<Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
					<Stack.Screen
						name="campaign/[campaignId]/donate"
						options={{
							animation: "slide_from_bottom",
							animationDuration: 300,
						}}
					/>
				</Stack>
			</ToastProvider>
		</>
	);
}
