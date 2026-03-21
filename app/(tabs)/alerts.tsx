import FadeScreen from "@/components/common/FadeScreen";
import { useTheme } from "@/hooks/useTheme";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FlashList, type FlashListRef } from "@shopify/flash-list";
import { useMemo, useRef, useState } from "react";
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
	type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NotificationType =
	| "proof_uploaded"
	| "donation_successful"
	| "new_creator_post"
	| "organization_verified"
	| "new_campaign_launched"
	| "milestone_reached"
	| "expense_report_added"
	| "campaign_completed"
	| "creator_milestone"
	| "thank_you_note";

type NotificationFilter = "All" | "Unread" | "Donations" | "Campaigns" | "Proofs";

type NotificationItem = {
	id: string;
	type: NotificationType;
	title: string;
	message: string;
	time: string;
	unread: boolean;
};

const FILTERS: NotificationFilter[] = [
	"All",
	"Unread",
	"Donations",
	"Campaigns",
	"Proofs",
];

const MOCK_NOTIFICATIONS: NotificationItem[] = [
	{
		id: "n1",
		type: "proof_uploaded",
		title: "Proof uploaded",
		message: "Sunrise Relief uploaded verified proof for Clean Water Campaign.",
		time: "2m ago",
		unread: true,
	},
	{
		id: "n2",
		type: "donation_successful",
		title: "Donation successful",
		message: "Your donation of $30 to Community Food Drive was successful.",
		time: "15m ago",
		unread: true,
	},
	{
		id: "n3",
		type: "new_creator_post",
		title: "New creator post",
		message: "Mya shared a field update with fresh photos from Shan.",
		time: "1h ago",
		unread: true,
	},
	{
		id: "n4",
		type: "organization_verified",
		title: "Organization verified",
		message: "Helping Hands Org is now verified on DanaLink.",
		time: "3h ago",
		unread: false,
	},
	{
		id: "n5",
		type: "new_campaign_launched",
		title: "New campaign launched",
		message: "Education For All launched School Kits for Monsoon Recovery.",
		time: "5h ago",
		unread: false,
	},
	{
		id: "n6",
		type: "milestone_reached",
		title: "Milestone reached",
		message: "Clean Water Campaign has reached 75% of its funding target.",
		time: "8h ago",
		unread: false,
	},
	{
		id: "n7",
		type: "expense_report_added",
		title: "Expense report added",
		message: "A new expense breakdown is available for Rural Clinic Support.",
		time: "12h ago",
		unread: false,
	},
	{
		id: "n8",
		type: "campaign_completed",
		title: "Campaign completed",
		message: "Blanket Drive Winter 2026 has completed successfully.",
		time: "1d ago",
		unread: false,
	},
	{
		id: "n9",
		type: "creator_milestone",
		title: "Creator milestone",
		message: "Aung reached 100 total campaign updates shared.",
		time: "1d ago",
		unread: false,
	},
	{
		id: "n10",
		type: "thank_you_note",
		title: "Thank you note",
		message: "You received a thank-you note from Hope Together Foundation.",
		time: "2d ago",
		unread: false,
	},
];

const TYPE_FILTER_GROUP: Record<NotificationType, "Donations" | "Campaigns" | "Proofs"> = {
	proof_uploaded: "Proofs",
	donation_successful: "Donations",
	new_creator_post: "Campaigns",
	organization_verified: "Campaigns",
	new_campaign_launched: "Campaigns",
	milestone_reached: "Campaigns",
	expense_report_added: "Proofs",
	campaign_completed: "Campaigns",
	creator_milestone: "Campaigns",
	thank_you_note: "Donations",
};

function getNotificationIcon(type: NotificationType): {
	name: React.ComponentProps<typeof Feather>["name"];
	iconTint: string;
	iconBackground: string;
} {
	switch (type) {
		case "proof_uploaded":
			return {
				name: "file-text",
				iconTint: "#1D4ED8",
				iconBackground: "#DBEAFE",
			};
		case "donation_successful":
			return {
				name: "dollar-sign",
				iconTint: "#047857",
				iconBackground: "#D1FAE5",
			};
		case "new_creator_post":
			return {
				name: "edit-3",
				iconTint: "#6D28D9",
				iconBackground: "#EDE9FE",
			};
		case "organization_verified":
			return {
				name: "check-circle",
				iconTint: "#065F46",
				iconBackground: "#D1FAE5",
			};
		case "new_campaign_launched":
			return {
				name: "flag",
				iconTint: "#92400E",
				iconBackground: "#FEF3C7",
			};
		case "milestone_reached":
			return {
				name: "target",
				iconTint: "#B45309",
				iconBackground: "#FDE68A",
			};
		case "expense_report_added":
			return {
				name: "pie-chart",
				iconTint: "#0E7490",
				iconBackground: "#CFFAFE",
			};
		case "campaign_completed":
			return {
				name: "check-square",
				iconTint: "#166534",
				iconBackground: "#DCFCE7",
			};
		case "creator_milestone":
			return {
				name: "award",
				iconTint: "#9333EA",
				iconBackground: "#F3E8FF",
			};
		case "thank_you_note":
			return {
				name: "heart",
				iconTint: "#BE185D",
				iconBackground: "#FCE7F3",
			};
	}
}

export default function Alerts() {
	const colors = useTheme();
	const notificationsListRef = useRef<FlashListRef<NotificationItem> | null>(null);
	const [activeFilter, setActiveFilter] = useState<NotificationFilter>("All");
	const [notifications, setNotifications] =
		useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

	const unreadCount = useMemo(
		() => notifications.filter((item) => item.unread).length,
		[notifications],
	);

	const filteredNotifications = useMemo(() => {
		if (activeFilter === "All") {
			return notifications;
		}
		if (activeFilter === "Unread") {
			return notifications.filter((item) => item.unread);
		}
		return notifications.filter(
			(item) => TYPE_FILTER_GROUP[item.type] === activeFilter,
		);
	}, [activeFilter, notifications]);

	const markAllAsRead = () => {
		setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
	};

	return (
		<FadeScreen>
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
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
							<Text style={[styles.title, { color: colors.text }]}>
								Notifications
							</Text>
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
									onPress={() => {
										setActiveFilter(filter);
										requestAnimationFrame(() => {
											notificationsListRef.current?.scrollToOffset({
												offset: 0,
												animated: true,
											});
										});
									}}
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
						onPress={markAllAsRead}
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

				<FlashList
					ref={notificationsListRef}
					data={filteredNotifications}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.listContent}
					renderItem={({ item }) => {
						const icon = getNotificationIcon(item.type);
						const unreadStyle: ViewStyle = item.unread
							? {
									backgroundColor: colors.alertCardUnreadBackground,
									borderColor: colors.alertBorder,
								}
							: {
									backgroundColor: colors.alertCardBackground,
									borderColor: colors.alertBorder,
								};

						return (
							<View style={[styles.card, unreadStyle]}>
								<View
									style={[
										styles.iconWrap,
										{ backgroundColor: icon.iconBackground },
									]}
								>
									<Feather name={icon.name} size={18} color={icon.iconTint} />
								</View>
								<View style={styles.cardBody}>
									<View style={styles.cardTopRow}>
										<Text style={[styles.cardTitle, { color: colors.text }]}>
											{item.title}
										</Text>
										<Text
											style={[
												styles.cardTime,
												{ color: colors.placeholderMuted },
											]}
										>
											{item.time}
										</Text>
									</View>
									<Text
										style={[
											styles.cardMessage,
											{ color: colors.placeholderMuted },
										]}
									>
										{item.message}
									</Text>
								</View>
								{item.unread ? (
									<View
										style={[
											styles.unreadDot,
											{ backgroundColor: colors.alertUnreadDot },
										]}
									/>
								) : null}
							</View>
						);
					}}
				/>
			</SafeAreaView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
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
	listContent: {
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 28,
	},
	card: {
		flexDirection: "row",
		alignItems: "flex-start",
		borderWidth: 0.8,
		borderRadius: 14,
		padding: 12,
		marginBottom: 10,
	},
	iconWrap: {
		width: 36,
		height: 36,
		borderRadius: 18,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 2,
	},
	cardBody: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 8,
	},
	cardTopRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	cardTitle: {
		fontSize: 14,
		fontWeight: "700",
		flexShrink: 1,
		paddingRight: 8,
	},
	cardTime: {
		fontSize: 12,
		fontWeight: "500",
	},
	cardMessage: {
		marginTop: 4,
		fontSize: 13,
		fontWeight: "500",
		lineHeight: 19,
	},
	unreadDot: {
		width: 9,
		height: 9,
		borderRadius: 999,
		marginTop: 6,
	},
	pressed: {
		opacity: 0.82,
		transform: [{ scale: 0.98 }],
	},
});
