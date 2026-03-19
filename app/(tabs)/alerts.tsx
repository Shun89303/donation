import { Text, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { darkColors, lightColors } from "../_theme";

export default function Alerts() {
	const colorScheme = useColorScheme();
	const colors = colorScheme === "dark" ? darkColors : lightColors;

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: colors.background,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={{ color: colors.text, fontSize: 20 }}>Alerts Screen</Text>
		</SafeAreaView>
	);
}
