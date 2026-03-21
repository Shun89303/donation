import type { ThemeColors } from "@/app/_theme";
import type { CampaignUpdateItem } from "@/components/home/campaignTypes";
import { StyleSheet, Text, View } from "react-native";
import { CollapsibleSection } from "./CollapsibleSection";

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
			<CollapsibleSection
				icon="message-square"
				title="Campaign Updates"
				badgeCount={0}
				open={isOpen}
				onToggle={onToggle}
				colors={colors}
			>
				<Text
					style={[styles.emptySectionText, { color: colors.placeholderMuted }]}
				>
					No updates available.
				</Text>
			</CollapsibleSection>
		);
	}

	return (
		<CollapsibleSection
			icon="message-square"
			title="Campaign Updates"
			badgeCount={updates.length}
			open={isOpen}
			onToggle={onToggle}
			colors={colors}
		>
			{updates.map((update) => (
				<View key={update.id} style={styles.updateItem}>
					<Text style={[styles.updateDate, { color: colors.placeholderMuted }]}>
						{update.dateLabel}
					</Text>
					<Text style={[styles.updateMessageBold, { color: colors.text }]}>
						{update.message}
					</Text>
				</View>
			))}
		</CollapsibleSection>
	);
}

const styles = StyleSheet.create({
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
