import type { ThemeColors } from "@/app/_theme";
import Feather from "@expo/vector-icons/Feather";
import { useRef } from "react";
import {
	Animated,
	Pressable,
	StyleSheet,
	Text,
	View,
	type ViewStyle,
} from "react-native";
import { getNotificationIcon } from "./notificationsConfig";
import type { NotificationItem } from "./types";

type AlertNotificationCardProps = {
	colors: ThemeColors;
	item: NotificationItem;
	onPress?: (item: NotificationItem) => void;
};

export default function AlertNotificationCard({
	colors,
	item,
	onPress,
}: AlertNotificationCardProps) {
	const scaleAnim = useRef(new Animated.Value(1)).current;
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

	const animateIn = () => {
		Animated.spring(scaleAnim, {
			toValue: 0.98,
			useNativeDriver: true,
			speed: 25,
			bounciness: 5,
		}).start();
	};

	const animateOut = () => {
		Animated.spring(scaleAnim, {
			toValue: 1,
			useNativeDriver: true,
			speed: 22,
			bounciness: 7,
		}).start();
	};

	return (
		<Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
			<Pressable
				onPress={() => onPress?.(item)}
				onPressIn={animateIn}
				onPressOut={animateOut}
				style={({ pressed }) => [pressed && styles.pressed]}
			>
				<View style={[styles.card, unreadStyle]}>
					<View style={[styles.iconWrap, { backgroundColor: icon.iconBackground }]}>
						<Feather name={icon.name} size={18} color={icon.iconTint} />
					</View>
					<View style={styles.cardBody}>
						<View style={styles.cardTopRow}>
							<Text style={[styles.cardTitle, { color: colors.text }]}>
								{item.title}
							</Text>
							<Feather
								name="chevron-right"
								size={16}
								color={colors.placeholderMuted}
							/>
						</View>
						<Text style={[styles.cardMessage, { color: colors.placeholderMuted }]}>
							{item.message}
						</Text>
						<Text style={[styles.cardTime, { color: colors.placeholderMuted }]}>
							{item.time}
						</Text>
					</View>
					{item.unread ? (
						<View
							style={[styles.unreadDot, { backgroundColor: colors.alertUnreadDot }]}
						/>
					) : null}
				</View>
			</Pressable>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
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
		marginTop: 6,
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
		opacity: 0.92,
	},
});
