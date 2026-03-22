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
	const isAndroid = Platform.OS === "android";

	if (!isMounted) {
		return null;
	}

	return (
		<Animated.View
			style={[
				styles.searchPanel,
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
								outputRange: [-18, 0],
							}),
						},
					],
				},
			]}
		>
			{/* Container of search input + close button */}
			<View style={styles.searchRow}>
				<View
					style={[
						styles.searchInputWrap,
						{
							backgroundColor: colors.secondaryGray,
						},
					]}
				>
					<SearchIcon
						size={16}
						color={colors.primaryGray}
						style={styles.searchInputIcon}
					/>
					<TextInput
						value={searchText}
						onChangeText={onChangeSearchText}
						placeholder="Search campaigns..."
						placeholderTextColor={colors.primaryGray}
						style={[
							styles.searchInput,
							{
								color: colors.text,
							},
						]}
					/>
				</View>
				<Pressable
					accessibilityRole="button"
					accessibilityLabel="Close search"
					hitSlop={6}
					onPress={onCloseSearch}
					style={({ pressed }) => [
						styles.closeBtn,
						{ backgroundColor: colors.secondaryGray },
						pressed && styles.iconButtonPressed,
					]}
				>
					<XIcon size={18} color={colors.primaryGray} />
				</Pressable>
			</View>
			{/* Horizontal Scrollview for campaign options */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.filterRow}
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
							style={styles.filterChipPressable}
						>
							<Animated.View
								style={[
									styles.filterChip,
									{
										backgroundColor: isActive
											? colors.primaryGreen
											: colors.secondaryGray,
										transform: [{ scale: chipScale }],
									},
								]}
							>
								<View style={styles.filterChipContent}>
									<View
										style={[
											styles.filterIconWrap,
											{ opacity: isActive ? 1 : 0.9 },
										]}
									>
										<FilterIcon
											size={14}
											color={isActive ? "white" : colors.primaryGray}
										/>
									</View>
									<Text
										style={[
											styles.filterChipLabel,
											{
												color: isActive ? "white" : colors.primaryGray,
												includeFontPadding: isAndroid ? false : undefined,
												minWidth: "100%",
											},
											styles.filterChipLabelWithIcon,
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

const styles = StyleSheet.create({
	iconButtonPressed: {
		opacity: 0.82,
		transform: [{ scale: 0.96 }],
	},
	searchPanel: {
		width: "100%",
		marginTop: 14,
		borderWidth: 0.4,
		borderRadius: 14,
		padding: 12,
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.14,
		shadowRadius: 14,
		elevation: 2,
	},
	searchRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	searchInputWrap: {
		flex: 1,
		height: 42,
		borderRadius: 12,
		paddingHorizontal: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	searchInputIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		height: "100%",
		paddingVertical: 0,
	},
	closeBtn: {
		marginLeft: 10,
		width: 42,
		height: 42,
		borderRadius: 21,
		alignItems: "center",
		justifyContent: "center",
	},
	filterRow: {
		paddingTop: 12,
		paddingBottom: 2,
	},
	filterChip: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 12,
	},
	filterChipPressable: {
		marginRight: 8,
	},
	filterChipContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	filterChipLabel: {
		fontSize: 14,
	},
	filterChipLabelWithIcon: {
		marginLeft: 6,
	},
	filterIconWrap: {
		alignItems: "center",
		justifyContent: "center",
	},
});
