import type { ThemeColors } from "@/app/_theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PopPressable from "./PopPressable";

export type PaymentMethod = {
	key: string;
	label: string;
	iconComponent: React.ComponentType<{ size?: number; color?: string }>;
	bgColor: string;
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
							<View
								style={[styles.iconBg, { backgroundColor: method.bgColor }]}
							>
								<method.iconComponent size={18} color="white" />
							</View>
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
	iconBg: {
		width: 36,
		height: 36,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 6,
	},
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
