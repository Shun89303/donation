import FadeScreen from "@/components/common/FadeScreen";
import AlertNotificationCard from "@/components/alerts/AlertNotificationCard";
import AlertsHeader from "@/components/alerts/AlertsHeader";
import { TYPE_FILTER_GROUP } from "@/components/alerts/notificationsConfig";
import { MOCK_NOTIFICATIONS } from "@/components/alerts/notificationsData";
import type {
	NotificationFilter,
	NotificationItem,
} from "@/components/alerts/types";
import { useTheme } from "@/hooks/useTheme";
import { FlashList, type FlashListRef } from "@shopify/flash-list";
import { useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

	const onPressFilter = (filter: NotificationFilter) => {
		setActiveFilter(filter);
		requestAnimationFrame(() => {
			notificationsListRef.current?.scrollToOffset({
				offset: 0,
				animated: true,
			});
		});
	};

	const markAllAsRead = () => {
		setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
	};

	const onPressNotification = (pressedItem: NotificationItem) => {
		setNotifications((prev) =>
			prev.map((item) =>
				item.id === pressedItem.id ? { ...item, unread: false } : item,
			),
		);
	};

	return (
		<FadeScreen>
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<AlertsHeader
					colors={colors}
					unreadCount={unreadCount}
					activeFilter={activeFilter}
					onPressFilter={onPressFilter}
					onPressMarkAllAsRead={markAllAsRead}
				/>

				<FlashList
					ref={notificationsListRef}
					data={filteredNotifications}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.listContent}
					renderItem={({ item }) => (
						<AlertNotificationCard
							colors={colors}
							item={item}
							onPress={onPressNotification}
						/>
					)}
				/>
			</SafeAreaView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContent: {
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 28,
	},
});
