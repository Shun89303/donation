import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { Text, View } from "react-native";
import AnimatedPressable from "./AnimatedPressable";

type SettingRowProps = {
	icon: React.ComponentType<{ size: number; color: string }>;
	label: string;
	onPress?: () => void;
	trailing?: React.ReactNode;
	isLast?: boolean;
};

export default function SettingRow({
	icon: Icon,
	label,
	onPress,
	trailing,
	isLast,
}: SettingRowProps) {
	const colors = useTheme();
	return (
		<AnimatedPressable
			onPress={onPress}
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				paddingHorizontal: metrics.spacingMedium,
				paddingVertical: metrics.spacingMedium,
				borderBottomWidth: isLast ? 0 : 1,
				borderColor: colors.secondaryGray,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					gap: metrics.spacingMedium,
				}}
			>
				<Icon size={metrics.iconMediumLarge} color={colors.primaryGray} />
				<Text style={{ fontSize: metrics.fontLarge, fontWeight: "400" }}>
					{label}
				</Text>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					gap: metrics.spacingSmall,
				}}
			>
				{trailing}
			</View>
		</AnimatedPressable>
	);
}
