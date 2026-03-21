import type { ThemeColors } from "@/app/_theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { FILTERS } from "./notificationsConfig";
import type { NotificationFilter } from "./types";

type AlertsHeaderProps = {
	colors: ThemeColors;
	unreadCount: number;
	activeFilter: NotificationFilter;
	onPressFilter: (filter: NotificationFilter) => void;
	onPressMarkAllAsRead: () => void;
};

export default function AlertsHeader({
	colors,
	unreadCount,
	activeFilter,
	onPressFilter,
	onPressMarkAllAsRead,
}: AlertsHeaderProps) {
	return (
		<View
			style={[
				styles.header,
				{
					backgroundColor: colors.alertHeaderBackground,
					borderBottomColor: colors.alertBorder,
				},
			]}
		>
			<View style={styles.headerTitleRow}>
				<View style={styles.headerTextBlock}>
					<Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
					<Text style={[styles.subtitle, { color: colors.placeholderMuted }]}>
						Stay updated on campaigns and donations
					</Text>
				</View>
				<View
					style={[
						styles.newBadge,
						{ backgroundColor: colors.alertBadgeBackground },
					]}
				>
					<Text style={[styles.newBadgeText, { color: colors.alertBadgeText }]}>
						{unreadCount} new
					</Text>
				</View>
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.filterContent}
			>
				{FILTERS.map((filter) => {
					const selected = filter === activeFilter;
					return (
						<Pressable
							key={filter}
							onPress={() => onPressFilter(filter)}
							style={({ pressed }) => [
								styles.filterChip,
								{
									backgroundColor: selected
										? colors.alertFilterChipActiveBackground
										: colors.alertFilterChipBackground,
									borderColor: colors.alertBorder,
								},
								pressed && styles.pressed,
							]}
						>
							<Text
								style={[
									styles.filterChipText,
									{
										color: selected
											? colors.alertFilterChipActiveText
											: colors.alertFilterChipText,
									},
								]}
							>
								{filter}
							</Text>
						</Pressable>
					);
				})}
			</ScrollView>

			<Pressable
				onPress={onPressMarkAllAsRead}
				style={({ pressed }) => [styles.markAllRow, pressed && styles.pressed]}
			>
				<MaterialCommunityIcons
					name="check-all"
					size={18}
					color={colors.tabActive}
				/>
				<Text style={[styles.markAllText, { color: colors.tabActive }]}>
					Mark all as read
				</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		paddingTop: 8,
		paddingHorizontal: 20,
		paddingBottom: 10,
		borderBottomWidth: 0.6,
	},
	headerTitleRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	headerTextBlock: {
		flex: 1,
		paddingRight: 12,
	},
	title: {
		fontSize: 30,
		fontWeight: "700",
		letterSpacing: 0.2,
	},
	subtitle: {
		marginTop: 4,
		fontSize: 13,
		fontWeight: "500",
	},
	newBadge: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 999,
	},
	newBadgeText: {
		fontSize: 12,
		fontWeight: "700",
	},
	filterContent: {
		paddingTop: 14,
		paddingBottom: 8,
	},
	filterChip: {
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 999,
		borderWidth: 0.6,
		marginRight: 10,
	},
	filterChipText: {
		fontSize: 13,
		fontWeight: "600",
	},
	markAllRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		paddingVertical: 4,
	},
	markAllText: {
		fontSize: 13,
		fontWeight: "700",
	},
	pressed: {
		opacity: 0.82,
		transform: [{ scale: 0.98 }],
	},
});

