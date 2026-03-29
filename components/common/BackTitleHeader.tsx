import { metrics } from "@/utils/metrics";
import { ReactNode } from "react";
import { View } from "react-native";

export default function BackTitleHeader({ children }: { children: ReactNode }) {
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				paddingHorizontal: metrics.spacingMedium,
				paddingVertical: metrics.spacingMedium,
				gap: metrics.spacingMedium,
			}}
		>
			{children}
		</View>
	);
}
