import type { ThemeColors } from "@/app/_theme";
import type { CampaignExpenseItem } from "@/components/home/campaignTypes";
import { StyleSheet, Text, View } from "react-native";
import { CollapsibleSection } from "./CollapsibleSection";

type ExpenseSectionProps = {
	colors: ThemeColors;
	expenseReport: CampaignExpenseItem[];
	totalSpentLabel: string;
	isOpen: boolean;
	onToggle: () => void;
};

export function ExpenseSection({
	colors,
	expenseReport,
	totalSpentLabel,
	isOpen,
	onToggle,
}: ExpenseSectionProps) {
	if (expenseReport.length === 0) {
		return (
			<CollapsibleSection
				icon="file-text"
				title="Expense Report"
				badgeCount={totalSpentLabel}
				open={isOpen}
				onToggle={onToggle}
				colors={colors}
			>
				<Text
					style={[styles.emptySectionText, { color: colors.placeholderMuted }]}
				>
					No expense report entries.
				</Text>
			</CollapsibleSection>
		);
	}

	return (
		<CollapsibleSection
			icon="file-text"
			title="Expense Report"
			badgeCount={totalSpentLabel}
			open={isOpen}
			onToggle={onToggle}
			colors={colors}
		>
			<Text
				style={[styles.expenseTotalLabel, { color: colors.placeholderMuted }]}
			>
				Total spent: {totalSpentLabel}
			</Text>
			{expenseReport.map((item) => (
				<View
					key={item.id}
					style={[styles.expenseRow, { borderBottomColor: colors.tabInactive }]}
				>
					<View>
						<Text style={[styles.expenseTitle, { color: colors.text }]}>
							{item.title}
						</Text>
						<Text
							style={[styles.expenseDate, { color: colors.placeholderMuted }]}
						>
							{item.dateLabel}
						</Text>
					</View>
					<Text style={[styles.expenseAmount, { color: colors.text }]}>
						{item.amountLabel}
					</Text>
				</View>
			))}
		</CollapsibleSection>
	);
}

const styles = StyleSheet.create({
	expenseTotalLabel: {
		fontSize: 12,
		fontWeight: "600",
		marginBottom: 4,
	},
	expenseRow: {
		paddingVertical: 10,
		borderBottomWidth: 0.5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	expenseTitle: {
		fontSize: 13,
		fontWeight: "600",
	},
	expenseDate: {
		fontSize: 12,
		marginTop: 2,
	},
	expenseAmount: {
		fontSize: 13,
		fontWeight: "700",
	},
	emptySectionText: {
		fontSize: 13,
		fontWeight: "500",
	},
});
