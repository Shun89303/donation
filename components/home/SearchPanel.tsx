import type { ThemeColors } from "@/app/_theme";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
	Animated,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { FILTERS, type FilterKey } from "./filterConfig";

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
	if (!isMounted) {
		return null;
	}

	return (
		<Animated.View
			style={[
				styles.searchPanel,
				{
					backgroundColor: colors.background,
					borderColor: colors.tabInactive,
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
							borderColor: colors.tabInactive,
							backgroundColor: colors.surfaceMuted,
						},
					]}
				>
					<Feather
						name="search"
						size={16}
						color={colors.tabInactive}
						style={styles.searchInputIcon}
					/>
					<TextInput
						value={searchText}
						onChangeText={onChangeSearchText}
						placeholder="Search campaigns..."
						placeholderTextColor={colors.placeholderMuted}
						style={[
							styles.searchInput,
							{
								color: colors.onSurfaceMuted,
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
						{ backgroundColor: colors.surfaceMuted },
						pressed && styles.iconButtonPressed,
					]}
				>
					<Feather name="x" size={18} color={colors.onSurfaceMuted} />
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
											? colors.tabActive
											: colors.surfaceMuted,
										borderColor: colors.tabInactive,
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
										{filter.key === "All" ? (
											<Feather
												name="heart"
												size={14}
												color={isActive ? "white" : colors.onSurfaceMuted}
											/>
										) : filter.key === "Orphan" ? (
											<MaterialCommunityIcons
												name="baby-face-outline"
												size={15}
												color={isActive ? "white" : colors.onSurfaceMuted}
											/>
										) : filter.key === "Disaster" ? (
											<Feather
												name="alert-triangle"
												size={14}
												color={isActive ? "white" : colors.onSurfaceMuted}
											/>
										) : filter.key === "Nursing Home" ? (
											<Feather
												name="home"
												size={14}
												color={isActive ? "white" : colors.onSurfaceMuted}
											/>
										) : (
											<Feather
												name="zap"
												size={14}
												color={isActive ? "white" : colors.onSurfaceMuted}
											/>
										)}
									</View>
									<Text
										style={[
											styles.filterChipLabel,
											{
												color: isActive ? "white" : colors.onSurfaceMuted,
											},
											styles.filterChipLabelWithIcon,
										]}
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
		elevation: 6,
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
