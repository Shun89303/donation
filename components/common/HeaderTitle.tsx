import { metrics } from "@/utils/metrics";
import { Text } from "react-native";

export default function HeaderTitle({ title }: { title: string }) {
	return (
		<Text
			style={{
				flex: 1,
				fontSize: metrics.fontExtraLarge,
				fontWeight: "700",
			}}
		>
			{title}
		</Text>
	);
}
