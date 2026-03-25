import type { ThemeColors } from "@/app/_theme";
import type { CampaignUpdateItem } from "@/components/home/campaignTypes";
import { useCollapsibleLayout } from "@/hooks/useCollapsibleLayout";
import { usePressScale } from "@/hooks/usePressScale";
import useTablet from "@/hooks/useTablet";
import globalStyles from "@/styles/styles";
import { ChevronDown, MessageCircle } from "lucide-react-native";
import { useEffect, useMemo } from "react";
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type UpdatesSectionProps = {
	colors: ThemeColors;
	updates: CampaignUpdateItem[];
	isOpen: boolean;
	onToggle: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function UpdatesSection({
	colors,
	updates,
	isOpen,
	onToggle,
}: UpdatesSectionProps) {
	const isTablet = useTablet();
	const { width, height } = useWindowDimensions();
	const { animatedStyle, pressIn, pressOut } = usePressScale();
	const useLayout = useCollapsibleLayout();

	// Base scale for tablets
	const tabletScale = isTablet ? 0.8 : 1;

	// Dynamic layout calculations
	const layout = useMemo(() => {
		const horizontalPadding = Math.round(width * (isTablet ? 0.02 : 0.03));
		const verticalPadding = Math.round(width * (isTablet ? 0.017 : 0.03));
		const collapsibleTopPadding = Math.round(height * 0.01);
		const itemGap = Math.round(height * 0.015);
		const itemHeight = Math.round(height * (isTablet ? 0.12 : 0.11));
		const previewItems = 3;
		const previewHeight =
			previewItems * itemHeight +
			(previewItems - 1) * itemGap +
			collapsibleTopPadding;

		return {
			horizontalPadding,
			verticalPadding,
			collapsibleTopPadding,
			itemGap,
			itemHeight,
			previewHeight,
		};
	}, [width, height, isTablet]);

	// Animation
	const expandProgress = useSharedValue(0);
	useEffect(() => {
		expandProgress.value = withTiming(isOpen ? 1 : 0, { duration: 300 });
	}, [isOpen]);

	const collapsibleStyle = useAnimatedStyle(() => ({
		maxHeight: interpolate(
			expandProgress.value,
			[0, 1],
			[0, layout.previewHeight * 2],
		),
		opacity: interpolate(expandProgress.value, [0, 1], [0, 1]),
	}));

	const chevronStyle = useAnimatedStyle(() => ({
		transform: [
			{ rotate: `${interpolate(expandProgress.value, [0, 1], [0, 180])}deg` },
		],
	}));

	const hasNoUpdates = updates.length === 0;
	const displayCount = updates.length;
	const previewUpdates = updates.slice(0, isOpen ? undefined : 3);

	const handlePress = () => {
		pressOut();
		onToggle();
	};

	// Dynamic font sizes
	const titleFontSize = Math.min(Math.max(width * 0.04 * tabletScale, 16), 28);
	const countFontSize = Math.min(Math.max(width * 0.025 * tabletScale, 12), 20);
	const iconSize = Math.min(Math.max(width * 0.05 * tabletScale, 16), 28);
	const chevronSize = Math.min(Math.max(width * 0.045 * tabletScale, 16), 28);
	const emptyFontSize = Math.min(Math.max(width * 0.035 * tabletScale, 12), 18);
	const updateDateFont = Math.min(Math.max(layout.itemHeight * 0.12, 10), 16);
	const updateMessageFont = Math.min(
		Math.max(layout.itemHeight * 0.14, 12),
		18,
	);
	const updateLineHeight = Math.round(updateMessageFont * 1.5);

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
					<MessageCircle size={iconSize} color={colors.primaryGreen} />
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
						Campaign Updates
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
							style={[
								styles.countBadgeText,
								{
									color: colors.primaryGreen,
									fontSize: useLayout.countFontSize,
								},
							]}
						>
							{displayCount}
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
				{hasNoUpdates ? (
					<Text
						style={[
							styles.emptySectionText,
							{
								color: colors.primaryGray,
								fontSize: emptyFontSize,
								paddingVertical: layout.itemGap,
								paddingHorizontal: layout.horizontalPadding / 2,
							},
						]}
					>
						No updates available.
					</Text>
				) : (
					<FlatList
						data={previewUpdates}
						renderItem={({ item, index }) => (
							<View
								style={{
									flexDirection: "row",
									marginBottom: layout.itemGap,
								}}
							>
								{/* Timeline */}
								<View
									style={{
										width: layout.itemHeight * 0.2,
										alignItems: "center",
										paddingTop: layout.itemGap / 2,
									}}
								>
									<View
										style={{
											width: isTablet
												? layout.itemHeight * 0.05
												: layout.itemHeight * 0.1,
											height: isTablet
												? layout.itemHeight * 0.05
												: layout.itemHeight * 0.1,
											borderRadius: layout.itemHeight * 0.075,
											backgroundColor: colors.primaryGreen,
										}}
									/>
									<View
										style={{
											flex: 1,
											width: layout.itemHeight * 0.015,
											backgroundColor: colors.secondaryGray,
											marginTop: layout.itemGap / 2,
										}}
									/>
								</View>

								{/* Content */}
								<View style={{ flex: 1, paddingBottom: layout.itemGap }}>
									<Text
										style={{
											color: colors.primaryGray,
											fontSize: updateDateFont,
											marginBottom: layout.itemGap / 4,
										}}
									>
										{item.dateLabel}
									</Text>
									<Text
										style={{
											color: colors.text,
											fontSize: updateMessageFont,
											lineHeight: updateLineHeight,
										}}
									>
										{item.message}
									</Text>
								</View>
							</View>
						)}
						keyExtractor={(item) => item.id}
						scrollEnabled={false}
						showsVerticalScrollIndicator={false}
					/>
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
	countBadgeText: { fontWeight: "700" },
	collapsibleWrap: { overflow: "hidden" },
	emptySectionText: { fontWeight: "500" },
});
