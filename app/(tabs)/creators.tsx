import FadeScreen from "@/components/common/FadeScreen";
import { Text, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { darkColors, lightColors } from "../_theme";

export default function Creators() {
	const colorScheme = useColorScheme();
	const colors = colorScheme === "dark" ? darkColors : lightColors;

	return (
		<FadeScreen>
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: colors.background,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={{ color: colors.text, fontSize: 20 }}>
					Creators Screen
				</Text>
			</SafeAreaView>
		</FadeScreen>
	);
}
