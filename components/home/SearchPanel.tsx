import type { ThemeColors } from "@/app/_theme";
import {
	Baby,
	Flame,
	Heart,
	House,
	Search as SearchIcon,
	TriangleAlert,
	X as XIcon,
} from "lucide-react-native";
import {
	Animated,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	useWindowDimensions,
	View,
} from "react-native";
import { FILTERS, type FilterKey } from "./campaignFilterConfig";

type SearchPanelProps = {
	colors: ThemeColors;
	isMounted: boolean;
	searchPanelAnim: Animated.Value;
	searchText: string;
	onChangeSearchText: (value: string) => void;
	onCloseSearch: () => void;
	selectedFilter: FilterKey;
	onPressFilter: (filterKey: FilterKey) => void;
	filterScales: Record<FilterKey, Animated.Value>;
};

export default function SearchPanel({
	colors,
	isMounted,
	searchPanelAnim,
	searchText,
	onChangeSearchText,
	onCloseSearch,
	selectedFilter,
	onPressFilter,
	filterScales,
}: SearchPanelProps) {
	const { width, height } = useWindowDimensions();
	const isAndroid = Platform.OS === "android";

	// Responsive device detection matching HomeHeader pattern
	const aspectRatio = width / height;
	const isTablet = width >= 800;
	const isNarrowPhone = width < 450;
	const isLandscape = aspectRatio > 0.75;

	// Scale factors for phones/tablets, Android/iOS, aspect ratio
	const sizeScale = isTablet ? 1.25 : isNarrowPhone ? 0.9 : 1.0;
	const paddingScale = isTablet ? 1.2 : 1.0;
	const fontScale = isTablet ? 1.1 : isNarrowPhone ? 0.95 : 1.0;
	const landscapeBoost = isLandscape ? 1.05 : 1.0;

	const inputHeight = 42 * sizeScale * landscapeBoost;
	const panelPadding = 12 * paddingScale;
	const chipPaddingH = 14 * paddingScale;
	const chipPaddingV = 8 * paddingScale;
	const chipBorderRadius = 18 * sizeScale;
	const searchIconSize = 16 * sizeScale;
	const filterIconSize = 20 * sizeScale;
	const filterFontSize = 14 * fontScale;
	const searchInputFontSize = 16 * fontScale;

	const dynamicStyles = StyleSheet.create({
		searchPanel: {
			width: "100%",
			marginTop: 14 * sizeScale,
			borderWidth: 0.5,
			borderRadius: 14 * sizeScale,
			padding: panelPadding,
			shadowOffset: { width: 0, height: 5 * sizeScale },
			shadowOpacity: 0.14,
			shadowRadius: 14 * sizeScale,
			elevation: isAndroid ? 6 : 0,
		},
		searchInputWrap: {
			flex: 1,
			height: inputHeight,
			borderRadius: 12 * sizeScale,
			paddingHorizontal: 10 * paddingScale,
			flexDirection: "row",
			alignItems: "center",
		},
		searchInput: {
			flex: 1,
			height: "100%",
			paddingVertical: 0,
			fontSize: searchInputFontSize,
		},
		closeBtn: {
			marginLeft: 10 * paddingScale,
			width: inputHeight,
			height: inputHeight,
			borderRadius: inputHeight / 2,
			alignItems: "center",
			justifyContent: "center",
		},
		filterRow: {
			paddingTop: 12 * paddingScale,
			paddingBottom: 2 * paddingScale,
		},
		filterChip: {
			paddingHorizontal: chipPaddingH,
			paddingVertical: chipPaddingV,
			borderRadius: chipBorderRadius,
		},
		filterChipContent: {
			flexDirection: "row",
			alignItems: "center",
		},
		filterChipLabel: {
			fontSize: filterFontSize,
			marginLeft: 2 * sizeScale,
			minWidth: "100%",
			padding: 5,
		},
		filterIconWrap: {
			width: filterIconSize + 8,
			height: filterIconSize + 8,
			alignItems: "center",
			justifyContent: "center",
		},
		iconButtonPressed: {
			opacity: 0.82,
			transform: [{ scale: 0.96 }],
		},
		searchInputIcon: {
			marginRight: 8 * paddingScale,
		},
	});

	const searchRowStyle = {
		flexDirection: "row" as const,
		alignItems: "center" as const,
	};

	const filterChipPressableStyle = {
		marginRight: 8 * paddingScale,
	};

	if (!isMounted) {
		return null;
	}

	return (
		<Animated.View
			style={[
				dynamicStyles.searchPanel,
				{
					backgroundColor: colors.background,
					borderColor: colors.secondaryGray,
					shadowColor: colors.panelShadow,
				},
				{
					opacity: searchPanelAnim,
					transform: [
						{
							translateY: searchPanelAnim.interpolate({
								inputRange: [0, 1],
								outputRange: [-18 * sizeScale, 0],
							}),
						},
					],
				},
			]}
		>
			{/* Container of search input + close button */}
			<View style={searchRowStyle}>
				<View
					style={[
						dynamicStyles.searchInputWrap,
						{
							backgroundColor: colors.secondaryGray,
						},
					]}
				>
					<SearchIcon
						size={searchIconSize}
						color={colors.primaryGray}
						style={dynamicStyles.searchInputIcon}
					/>
					<TextInput
						value={searchText}
						onChangeText={onChangeSearchText}
						placeholder="Search campaigns..."
						placeholderTextColor={colors.primaryGray}
						style={[
							dynamicStyles.searchInput,
							{
								color: colors.text,
							},
						]}
					/>
				</View>
				<Pressable
					accessibilityRole="button"
					accessibilityLabel="Close search"
					hitSlop={6 * sizeScale}
					onPress={onCloseSearch}
					style={({ pressed }) => [
						dynamicStyles.closeBtn,
						{ backgroundColor: colors.secondaryGray },
						pressed && dynamicStyles.iconButtonPressed,
					]}
				>
					<XIcon size={18 * sizeScale} color={colors.primaryGray} />
				</Pressable>
			</View>
			{/* Horizontal Scrollview for campaign options */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={dynamicStyles.filterRow}
			>
				{FILTERS.map((filter) => {
					const isActive = selectedFilter === filter.key;
					const chipScale = filterScales[filter.key];
					let FilterIcon: any;
					if (filter.icon === "heart") FilterIcon = Heart;
					else if (filter.icon === "baby") FilterIcon = Baby;
					else if (filter.icon === "flame") FilterIcon = Flame;
					else if (filter.icon === "house") FilterIcon = House;
					else if (filter.icon === "triangle-alert") FilterIcon = TriangleAlert;
					return (
						<Pressable
							key={filter.key}
							onPress={() => onPressFilter(filter.key)}
							style={filterChipPressableStyle}
						>
							<Animated.View
								style={[
									dynamicStyles.filterChip,
									{
										backgroundColor: isActive
											? colors.primaryGreen
											: colors.secondaryGray,
										transform: [{ scale: chipScale }],
									},
								]}
							>
								<View style={dynamicStyles.filterChipContent}>
									<View
										style={[
											dynamicStyles.filterIconWrap,
											{ opacity: isActive ? 1 : 0.9 },
										]}
									>
										<FilterIcon
											size={filterIconSize}
											color={isActive ? "white" : colors.primaryGray}
										/>
									</View>
									<Text
										style={[
											dynamicStyles.filterChipLabel,
											{
												color: isActive ? "white" : colors.primaryGray,
												includeFontPadding: isAndroid ? false : undefined,
											},
										]}
										maxFontSizeMultiplier={1}
										allowFontScaling={!isAndroid}
									>
										{filter.label}
									</Text>
								</View>
							</Animated.View>
						</Pressable>
					);
				})}
			</ScrollView>
		</Animated.View>
	);
}
