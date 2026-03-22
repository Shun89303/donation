import type { ThemeColors } from "@/app/_theme";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, View } from "react-native";
import PopPressable from "./PopPressable";

export type PaymentMethod = {
	key: string;
	label: string;
	icon: keyof typeof Feather.glyphMap;
};

type PaymentMethodBlockProps = {
	colors: ThemeColors;
	methods: PaymentMethod[];
	selectedMethod: string;
	onSelectMethod: (methodKey: string) => void;
};

export default function PaymentMethodBlock({
	colors,
	methods,
	selectedMethod,
	onSelectMethod,
}: PaymentMethodBlockProps) {
	return (
		<View
			style={[
				styles.block,
				{
					borderColor: colors.tabInactive,
					backgroundColor: colors.surfaceMuted,
				},
			]}
		>
			<Text style={[styles.blockLabel, { color: colors.placeholderMuted }]}>
				PAYMENT METHOD
			</Text>
			<View style={styles.paymentGrid}>
				{methods.map((method) => {
					const isSelected = selectedMethod === method.key;
					return (
						<PopPressable
							key={method.key}
							onPress={() => onSelectMethod(method.key)}
							containerStyle={styles.paymentMethodWrap}
							style={[
								styles.paymentMethod,
								{
									borderColor: isSelected
										? colors.tabActive
										: colors.tabInactive,
									backgroundColor: colors.background,
								},
							]}
						>
							<Feather
								name={method.icon}
								size={18}
								color={isSelected ? colors.tabActive : colors.placeholderMuted}
							/>
							<Text
								style={[
									styles.paymentMethodText,
									{ color: isSelected ? colors.text : colors.placeholderMuted },
								]}
							>
								{method.label}
							</Text>
						</PopPressable>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	block: {
		marginTop: 12,
		borderRadius: 14,
		padding: 18,
		borderWidth: 1,
	},
	blockLabel: {
		fontSize: 12,
		fontWeight: "700",
		letterSpacing: 0.5,
	},
	paymentGrid: {
		marginTop: 10,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		rowGap: 10,
	},
	paymentMethodWrap: {
		width: "31%",
	},
	paymentMethod: {
		borderWidth: 1,
		borderRadius: 12,
		paddingVertical: 10,
		alignItems: "center",
		justifyContent: "center",
		minHeight: 72,
	},
	paymentMethodText: {
		fontSize: 12,
		fontWeight: "600",
		marginTop: 6,
	},
});
