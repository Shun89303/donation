import type { ThemeColors } from "@/app/_theme";
import Feather from "@expo/vector-icons/Feather";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type CollapsibleSectionProps = {
	icon: keyof typeof Feather.glyphMap;
	title: string;
	badgeCount?: number | string | null;
	open: boolean;
	onToggle: () => void;
	children: ReactNode;
	colors: ThemeColors;
};

export function CollapsibleSection({
	icon,
	title,
	badgeCount = null,
	open,
	onToggle,
	children,
	colors,
}: CollapsibleSectionProps) {
	const maxHeight = useSharedValue(0);
	const contentHeight = useRef(0);

	const animatedStyle = useAnimatedStyle(() => ({
		maxHeight: withTiming(maxHeight.value, {
			duration: 5,
		}),
		overflow: "hidden",
	}));

	useEffect(() => {
		maxHeight.value = withTiming(open ? contentHeight.current + 24 : 0);
	}, [open]);

	return (
		<View
			style={[
				styles.card,
				{
					borderColor: colors.tabInactive,
					backgroundColor: colors.background,
				},
			]}
		>
			<Pressable style={styles.collapsibleHeader} onPress={onToggle}>
				<View style={styles.sectionHeaderLeft}>
					<Feather name={icon} size={16} color={colors.tabActive} />
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						{title}
					</Text>
				</View>

				<View style={styles.sectionHeaderRight}>
					{typeof badgeCount === "number" || typeof badgeCount === "string" ? (
						<View
							style={[
								styles.countBadge,
								{ backgroundColor: colors.alertBadgeBackground },
							]}
						>
							<Text
								style={[
									styles.countBadgeText,
									{ color: colors.alertBadgeText },
								]}
							>
								{badgeCount}
							</Text>
						</View>
					) : null}
					<Feather
						name={open ? "chevron-up" : "chevron-down"}
						size={18}
						color={colors.placeholderMuted}
					/>
				</View>
			</Pressable>
			<Animated.View style={[styles.sectionContent, animatedStyle]}>
				<View
					onLayout={(event) => {
						const height = event.nativeEvent.layout.height;
						contentHeight.current = height;
						if (open) maxHeight.value = height + 12;
					}}
				>
					<ScrollView showsVerticalScrollIndicator={false} scrollEnabled={open}>
						{children}
					</ScrollView>
				</View>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		marginTop: 14,
		borderWidth: 1,
		borderRadius: 14,
		padding: 12,
	},
	collapsibleHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	sectionHeaderLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	sectionHeaderRight: {
		flexDirection: "row",
		alignItems: "center",
	},
	sectionTitle: {
		fontSize: 15,
		fontWeight: "700",
		marginLeft: 7,
	},
	countBadge: {
		minWidth: 24,
		height: 24,
		paddingHorizontal: 7,
		borderRadius: 999,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 6,
	},
	countBadgeText: {
		fontSize: 12,
		fontWeight: "700",
	},
	sectionContent: {
		marginTop: 12,
	},
});
