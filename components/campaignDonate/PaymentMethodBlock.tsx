import type { ThemeColors } from "@/app/_theme";
import { FlashList } from "@shopify/flash-list";
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
	screenWidth: number;
	isTablet: boolean;
	sizeScale: number;
	paddingScale: number;
	fontScale: number;
};

export default function PaymentMethodBlock({
	colors,
	methods,
	selectedMethod,
	onSelectMethod,
	screenWidth,
	isTablet,
	sizeScale,
	paddingScale,
	fontScale,
}: PaymentMethodBlockProps) {
	const blockPadding = Math.round(18 * paddingScale);
	const blockRadius = Math.round(14 * sizeScale);
	const labelSize = Math.round(12 * fontScale);
	const iconSize = Math.round(36 * sizeScale);
	const iconRadius = Math.round(10 * sizeScale);
	const methodMinHeight = Math.round(72 * sizeScale);
	const methodPadV = Math.round(10 * paddingScale);
	const methodRadius = Math.round(12 * sizeScale);
	const textSize = Math.round(12 * fontScale);
	const textMarginTop = Math.round(6 * sizeScale);
	const gridMarginTop = Math.round(10 * paddingScale);
	const rowGap = Math.round(10 * paddingScale);

	const renderPaymentMethod = ({ item: method }: { item: PaymentMethod }) => {
		const isSelected = selectedMethod === method.key;
		return (
			<View style={styles.paymentMethodWrap}>
				<PopPressable
					onPress={() => onSelectMethod(method.key)}
					containerStyle={styles.paymentMethodContainer}
					style={[
						styles.paymentMethod,
						{
							borderColor: isSelected
								? colors.primaryGreen
								: colors.secondaryGray,
							backgroundColor: isSelected
								? colors.appBackground
								: colors.background,
							borderRadius: methodRadius,
							minHeight: methodMinHeight,
							paddingVertical: methodPadV,
						},
					]}
				>
					<View
						style={[
							styles.iconBg,
							{
								backgroundColor: method.bgColor,
								width: iconSize,
								height: iconSize,
								borderRadius: iconRadius,
							},
						]}
					>
						<method.iconComponent
							size={Math.round(18 * sizeScale)}
							color="white"
						/>
					</View>
					<Text
						style={[
							styles.paymentMethodText,
							{
								color: isSelected ? colors.text : colors.placeholderMuted,
								fontSize: textSize,
								marginTop: textMarginTop,
							},
						]}
					>
						{method.label}
					</Text>
				</PopPressable>
			</View>
		);
	};

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
				PAYMENT METHOD
			</Text>
			<FlashList
				data={methods}
				numColumns={3}
				renderItem={renderPaymentMethod}
				keyExtractor={(item) => item.key}
				contentContainerStyle={{
					marginTop: gridMarginTop,
					paddingBottom: rowGap,
				}}
				removeClippedSubviews={false}
				showsVerticalScrollIndicator={false}
			/>
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
	paymentRow: {
		justifyContent: "space-between",
	},
	paymentMethodWrap: {
		flex: 1,
		padding: 5,
	},
	paymentMethodContainer: {
		flex: 1,
	},
	paymentMethod: {
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	iconBg: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 6,
	},
	paymentMethodText: {
		fontWeight: "600",
	},
});
