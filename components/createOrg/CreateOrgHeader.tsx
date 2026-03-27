import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { ArrowLeftIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function CreateOrgHeader({
	currentStep,
	goBack,
}: {
	currentStep: number;
	goBack: () => void;
}) {
	const colors = useTheme();

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "flex-start",
				gap: metrics.spacingExtraLarge,
			}}
		>
			<Pressable onPress={goBack}>
				<ArrowLeftIcon size={metrics.iconLarge} color={colors.text} />
			</Pressable>
			<View
				style={{
					alignItems: "flex-start",
				}}
			>
				<Text
					style={{
						fontSize: metrics.fontMedium,
						fontWeight: "500",
						color: colors.text,
						paddingBottom: metrics.spacingExtraSmall,
					}}
				>
					Create Organization
				</Text>
				<Text
					style={{
						fontSize: metrics.fontSmall,
						fontWeight: "500",
						color: colors.primaryGray,
					}}
				>
					Step {currentStep} of 5
				</Text>
			</View>
		</View>
	);
}
