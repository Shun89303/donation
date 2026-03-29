import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { ArrowLeft } from "lucide-react-native";
import AnimatedPressable from "./AnimatedPressable";

export default function BackButton({ onPress }: { onPress: () => void }) {
	const colors = useTheme();
	return (
		<AnimatedPressable onPress={onPress}>
			<ArrowLeft size={metrics.iconLarge} color={colors.text} />
		</AnimatedPressable>
	);
}
