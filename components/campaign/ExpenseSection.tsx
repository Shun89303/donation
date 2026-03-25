import type { ThemeColors } from "@/app/_theme";
import type { CampaignExpenseItem } from "@/components/home/campaignTypes";
import { useCollapsibleLayout } from "@/hooks/useCollapsibleLayout";
import { usePressScale } from "@/hooks/usePressScale";
import useTablet from "@/hooks/useTablet";
import globalStyles from "@/styles/styles";
import { Check, ChevronDown, FileText } from "lucide-react-native";
import { useMemo } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type ExpenseSectionProps = {
	colors: ThemeColors;
	expenseReport: CampaignExpenseItem[];
	totalSpentLabel: string;
	isOpen: boolean;
	onToggle: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ExpenseSection({
	colors,
	expenseReport,
	totalSpentLabel,
	isOpen,
	onToggle,
}: ExpenseSectionProps) {
	const isTablet = useTablet();
	const { width, height } = useWindowDimensions();
	const { animatedStyle, pressIn, pressOut } = usePressScale();
	const useLayout = useCollapsibleLayout();

	const tabletScale = isTablet ? 0.8 : 1;

	const layout = useMemo(() => {
		const horizontalPadding = Math.round(width * (isTablet ? 0.02 : 0.03));
		const collapsibleTopPadding = Math.round(height * 0.01);
		const itemGap = Math.round(height * 0.015);
		const itemHeight = Math.round(height * (isTablet ? 0.12 : 0.11));
		return { horizontalPadding, collapsibleTopPadding, itemGap, itemHeight };
	}, [width, height, isTablet]);

	const iconSize = Math.min(Math.max(width * 0.05 * tabletScale, 16), 28);
	const chevronSize = Math.min(Math.max(width * 0.045 * tabletScale, 16), 28);
	const expenseTitleFont = Math.min(Math.max(layout.itemHeight * 0.12, 12), 18);
	const expenseAmountFont = Math.min(
		Math.max(layout.itemHeight * 0.16, 14),
		20,
	);

	const previewExpenses = expenseReport.slice(0, isOpen ? undefined : 3);
	const hasNoExpenses = expenseReport.length === 0;

	// Animated shared values
	const expandProgress = useSharedValue(isOpen ? 1 : 0);
	const contentHeight = useSharedValue(0);

	const collapsibleStyle = useAnimatedStyle(() => ({
		height: withTiming(isOpen ? contentHeight.value : 0, { duration: 300 }),
		opacity: withTiming(isOpen ? 1 : 0, { duration: 300 }),
	}));

	const chevronStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${expandProgress.value * 180}deg` }],
	}));

	const handlePress = () => {
		pressOut();
		onToggle();
		expandProgress.value = withTiming(isOpen ? 0 : 1, { duration: 300 });
	};

	return (
		<View
			style={[
				styles.card,
				{
					borderColor: colors.secondaryGray,
					backgroundColor: colors.background,
					padding: useLayout.cardPadding,
					marginTop: useLayout.cardMarginTop,
					borderRadius: useLayout.cardBorderRadius,
					...globalStyles.shadows,
				},
			]}
		>
			{/* Header */}
			<AnimatedPressable
				style={[styles.collapsibleHeader, animatedStyle]}
				onPressIn={pressIn}
				onPressOut={pressOut}
				onPress={handlePress}
			>
				<View style={styles.sectionHeaderLeft}>
					<FileText size={iconSize} color={colors.primaryGreen} />
					<Text
						style={[
							styles.sectionTitle,
							{
								color: colors.text,
								fontSize: useLayout.titleFontSize,
								marginLeft: useLayout.titleMarginLeft,
							},
						]}
					>
						Expense Report
					</Text>
				</View>
				<View style={styles.sectionHeaderRight}>
					<View
						style={[
							styles.countBadge,
							{
								backgroundColor: colors.secondaryGreen,
								minWidth: useLayout.badgeMinWidth,
								height: useLayout.badgeHeight,
								paddingHorizontal: useLayout.badgePaddingHorizontal,
								marginRight: useLayout.badgeMarginRight,
							},
						]}
					>
						<Text
							style={{
								color: colors.primaryGreen,
								fontSize: useLayout.countFontSize,
								fontWeight: "600",
							}}
						>
							{totalSpentLabel}
						</Text>
					</View>
					<Animated.View style={chevronStyle}>
						<ChevronDown size={chevronSize} color={colors.primaryGray} />
					</Animated.View>
				</View>
			</AnimatedPressable>

			{/* Collapsible Content */}
			<Animated.View
				style={[
					styles.collapsibleWrap,
					{ paddingTop: layout.collapsibleTopPadding },
					collapsibleStyle,
				]}
			>
				{/* Offscreen measurement for exact height */}
				<View
					style={{ position: "absolute", opacity: 0, width: "100%" }}
					onLayout={(e) => {
						contentHeight.value = e.nativeEvent.layout.height;
					}}
				>
					{hasNoExpenses ? (
						<Text style={{ paddingVertical: layout.itemGap }}>
							No expense report entries.
						</Text>
					) : (
						<>
							{/* All expense items */}
							{previewExpenses.map((item) => (
								<View key={item.id} style={{ paddingVertical: layout.itemGap }}>
									<Text>{item.title}</Text>
								</View>
							))}

							{/* Total row included in measurement */}
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									borderTopWidth: 2,
									borderColor: colors.secondaryGray,
									paddingVertical: isTablet ? 60 : 20,
								}}
							>
								<Text style={{ fontWeight: "700" }}>Total spent</Text>
								<Text style={{ color: colors.primaryGreen, fontWeight: "700" }}>
									{totalSpentLabel}
								</Text>
							</View>
						</>
					)}
				</View>

				{/* Visible content */}
				{hasNoExpenses ? (
					<Text
						style={{
							color: colors.primaryGray,
							paddingVertical: layout.itemGap,
						}}
					>
						No expense report entries.
					</Text>
				) : (
					<>
						{previewExpenses.map((item, index) => (
							<View key={item.id}>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										paddingVertical: layout.itemGap,
										paddingHorizontal: isTablet ? layout.horizontalPadding : 0,
									}}
								>
									<View style={{ flexDirection: "row", gap: 5 }}>
										<Text
											style={{
												color: colors.text,
												fontSize: isTablet
													? expenseTitleFont * 1.2
													: expenseTitleFont,
												fontWeight: "600",
											}}
											numberOfLines={1}
										>
											{item.title}
										</Text>
										{item.hasReceipt && (
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
													backgroundColor: colors.secondaryGreen,
													paddingHorizontal: isTablet ? 10 : 6,
													paddingVertical: isTablet ? 6 : 4,
													borderRadius: 8,
												}}
											>
												<Text
													style={{
														fontSize: isTablet ? 10 : 8,
														color: colors.primaryGreen,
														fontWeight: "600",
														marginRight: 4,
													}}
												>
													Receipt
												</Text>
												<Check
													size={isTablet ? 14 : 12}
													color={colors.primaryGreen}
												/>
											</View>
										)}
									</View>
									<Text
										style={{
											color: colors.text,
											fontSize: isTablet
												? expenseAmountFont * 1.25
												: expenseAmountFont,
											fontWeight: "700",
										}}
									>
										{item.amountLabel}
									</Text>
								</View>

								{index !== previewExpenses.length - 1 && (
									<View
										style={{
											height: 1,
											backgroundColor: colors.secondaryGray,
											marginHorizontal: isTablet ? layout.horizontalPadding : 0,
										}}
									/>
								)}
							</View>
						))}

						{/* Total row */}
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								borderTopWidth: 2,
								borderColor: colors.secondaryGray,
								paddingVertical: 10,
								paddingHorizontal: isTablet ? layout.horizontalPadding : 0,
							}}
						>
							<Text
								style={{
									fontWeight: "700",
									color: colors.text,
									fontSize: useLayout.titleFontSize,
								}}
							>
								Total spent
							</Text>
							<Text
								style={{
									color: colors.primaryGreen,
									fontWeight: "700",
									fontSize: useLayout.titleFontSize,
								}}
							>
								{totalSpentLabel}
							</Text>
						</View>
					</>
				)}
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: { borderWidth: 1 },
	collapsibleHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	sectionHeaderLeft: { flexDirection: "row", alignItems: "center" },
	sectionHeaderRight: { flexDirection: "row", alignItems: "center" },
	sectionTitle: { fontWeight: "700" },
	countBadge: {
		borderRadius: 999,
		alignItems: "center",
		justifyContent: "center",
	},
	collapsibleWrap: { overflow: "hidden" },
});
