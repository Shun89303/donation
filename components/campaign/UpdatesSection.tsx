import type { ThemeColors } from "@/app/_theme";
import type { CampaignUpdateItem } from "@/components/home/campaignTypes";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet, Text, View } from "react-native";

type UpdatesSectionProps = {
	colors: ThemeColors;
	updates: CampaignUpdateItem[];
	isOpen: boolean;
	onToggle: () => void;
};

export function UpdatesSection({
	colors,
	updates,
	isOpen,
	onToggle,
}: UpdatesSectionProps) {
	if (updates.length === 0) {
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
				<Pressable style={styles.collapsibleHeader}>
					<View style={styles.sectionHeaderLeft}>
						<Feather
							name="message-square"
							size={16}
							color={colors.primaryGreen}
						/>
						<Text style={[styles.sectionTitle, { color: colors.text }]}>
							Campaign Updates
						</Text>
					</View>
					<View style={styles.sectionHeaderRight}>
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
								0
							</Text>
						</View>
						<Feather
							name="chevron-down"
							size={18}
							color={colors.placeholderMuted}
						/>
					</View>
				</Pressable>
				<View style={styles.sectionContent}>
					<Text
						style={[
							styles.emptySectionText,
							{ color: colors.placeholderMuted },
						]}
					>
						No updates available.
					</Text>
				</View>
			</View>
		);
	}

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
			<Pressable style={styles.collapsibleHeader}>
				<View style={styles.sectionHeaderLeft}>
					<Feather
						name="message-square"
						size={16}
						color={colors.primaryGreen}
					/>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Campaign Updates
					</Text>
				</View>
				<View style={styles.sectionHeaderRight}>
					<View
						style={[
							styles.countBadge,
							{ backgroundColor: colors.alertBadgeBackground },
						]}
					>
						<Text
							style={[styles.countBadgeText, { color: colors.alertBadgeText }]}
						>
							{updates.length}
						</Text>
					</View>
					<Feather
						name="chevron-down"
						size={18}
						color={colors.placeholderMuted}
					/>
				</View>
			</Pressable>
			<View style={styles.sectionContent}>
				{updates.map((update) => (
					<View key={update.id} style={styles.updateItem}>
						<Text
							style={[styles.updateDate, { color: colors.placeholderMuted }]}
						>
							{update.dateLabel}
						</Text>
						<Text style={[styles.updateMessageBold, { color: colors.text }]}>
							{update.message}
						</Text>
					</View>
				))}
			</View>
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
	updateItem: {
		marginBottom: 12,
	},
	updateDate: {
		fontSize: 12,
		fontWeight: "500",
	},
	updateMessageBold: {
		fontSize: 13,
		lineHeight: 20,
		fontWeight: "700",
		marginTop: 3,
	},
	emptySectionText: {
		fontSize: 13,
		fontWeight: "500",
	},
});
