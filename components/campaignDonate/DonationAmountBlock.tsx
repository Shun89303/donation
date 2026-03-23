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
	// New responsive props
	isTablet: boolean;
	sizeScale: number;
	paddingScale: number;
	fontScale: number;
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
	isTablet,
	sizeScale,
	paddingScale,
	fontScale,
}: DonationAmountBlockProps) {
	const blockPadding = Math.round(18 * paddingScale);
	const blockRadius = Math.round(14 * sizeScale);
	const amountFontSize = Math.round(38 * fontScale);
	const amountLineHeight = Math.round(44 * fontScale);
	const amountPadV = Math.round(20 * paddingScale);
	const quickGap = Math.round(8 * sizeScale);
	const quickPadV = Math.round(8 * paddingScale);
	const quickPadH = Math.round(12 * paddingScale);
	const quickRadius = Math.round(12 * sizeScale);
	const quickTextSize = Math.round(13 * fontScale);
	const labelSize = Math.round(12 * fontScale);
	const currencySize = Math.round(13 * fontScale);
	const amountMinWidth = Math.round(160 * sizeScale);
	const quickMarginTop = Math.round(14 * paddingScale);
	const amountMarginTop = Math.round(8 * paddingScale);

	return (
		<View
			style={[
				styles.block,
				{
					borderColor: colors.secondaryGray,
					backgroundColor: colors.background,
					shadowColor: colors.panelShadow,
					borderRadius: blockRadius,
					padding: blockPadding,
				},
			]}
		>
			<Text
				style={[
					styles.blockLabel,
					{ color: colors.primaryGray, fontSize: labelSize },
				]}
			>
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
						style={[
							styles.amountInput,
							{
								color: colors.text,
								fontSize: amountFontSize,
								lineHeight: amountLineHeight,
								paddingVertical: amountPadV,
								minWidth: amountMinWidth,
							},
						]}
						maxLength={9}
					/>
				) : (
					<Text
						style={[
							styles.amountValue,
							{
								color: colors.text,
								fontSize: amountFontSize,
								lineHeight: amountLineHeight,
								paddingVertical: amountPadV,
							},
						]}
					>
						{formattedAmount}
					</Text>
				)}
				<Text
					style={[
						styles.currency,
						{ color: colors.primaryGray, fontSize: currencySize },
					]}
				>
					MMK
				</Text>
			</PopPressable>

			<View
				style={[
					styles.quickAmountRow,
					{ marginTop: quickMarginTop, gap: quickGap },
				]}
			>
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
										? "transparent"
										: colors.secondaryGray,
									backgroundColor: isSelected
										? colors.primaryGreen
										: colors.background,
									borderRadius: quickRadius,
									paddingVertical: quickPadV,
									paddingHorizontal: quickPadH,
								},
							]}
						>
							<Text
								style={[
									styles.quickAmountText,
									{
										color: isSelected ? "white" : colors.text,
										fontSize: quickTextSize,
									},
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
		borderWidth: 1,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.15,
		shadowRadius: 1,
		elevation: 1,
	},
	blockLabel: {
		fontWeight: "700",
		letterSpacing: 0.5,
	},
	amountWrap: {
		alignItems: "center",
	},
	amountValue: {
		fontWeight: "800",
		textAlign: "center",
	},
	amountInput: {
		fontWeight: "800",
		textAlign: "center",
	},
	currency: {
		fontWeight: "500",
		marginTop: 2,
	},
	quickAmountRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	quickAmountChip: {
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	quickAmountText: {
		fontWeight: "500",
	},
});
