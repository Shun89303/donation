import type { ThemeColors } from "@/app/_theme";
import type { RefObject } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import PopPressable from "./PopPressable";

type DonationAmountBlockProps = {
	colors: ThemeColors;
	quickAmounts: number[];
	donationAmount: number;
	formattedAmount: string;
	isEditingAmount: boolean;
	amountInput: string;
	amountInputRef: RefObject<TextInput | null>;
	onPressAmountValue: () => void;
	onChangeAmountInput: (value: string) => void;
	onBlurAmountInput: () => void;
	onSelectQuickAmount: (amount: number) => void;
	formatAmount: (amount: number) => string;
};

export default function DonationAmountBlock({
	colors,
	quickAmounts,
	donationAmount,
	formattedAmount,
	isEditingAmount,
	amountInput,
	amountInputRef,
	onPressAmountValue,
	onChangeAmountInput,
	onBlurAmountInput,
	onSelectQuickAmount,
	formatAmount,
}: DonationAmountBlockProps) {
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
				DONATION AMOUNT
			</Text>
			<PopPressable onPress={onPressAmountValue} style={styles.amountWrap}>
				{isEditingAmount ? (
					<TextInput
						ref={amountInputRef}
						value={amountInput}
						onChangeText={onChangeAmountInput}
						onBlur={onBlurAmountInput}
						keyboardType="number-pad"
						style={[styles.amountInput, { color: colors.text }]}
						maxLength={9}
					/>
				) : (
					<Text style={[styles.amountValue, { color: colors.text }]}>
						{formattedAmount}
					</Text>
				)}
				<Text style={[styles.currency, { color: colors.placeholderMuted }]}>
					MMK
				</Text>
			</PopPressable>

			<View style={styles.quickAmountRow}>
				{quickAmounts.map((amount) => {
					const isSelected = amount === donationAmount;
					return (
						<PopPressable
							key={amount}
							onPress={() => onSelectQuickAmount(amount)}
							style={[
								styles.quickAmountChip,
								{
									borderColor: isSelected
										? colors.tabActive
										: colors.tabInactive,
									backgroundColor: isSelected
										? colors.tabActive
										: colors.background,
								},
							]}
						>
							<Text
								style={[
									styles.quickAmountText,
									{ color: isSelected ? "white" : colors.text },
								]}
							>
								{formatAmount(amount)}
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
	amountWrap: {
		alignItems: "center",
		marginTop: 8,
	},
	amountValue: {
		fontSize: 38,
		fontWeight: "800",
		lineHeight: 44,
	},
	amountInput: {
		fontSize: 38,
		fontWeight: "800",
		lineHeight: 44,
		textAlign: "center",
		minWidth: 160,
		paddingVertical: 0,
	},
	currency: {
		fontSize: 13,
		fontWeight: "700",
		marginTop: 2,
	},
	quickAmountRow: {
		marginTop: 14,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 8,
	},
	quickAmountChip: {
		borderWidth: 1,
		borderRadius: 999,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	quickAmountText: {
		fontSize: 13,
		fontWeight: "700",
	},
});
