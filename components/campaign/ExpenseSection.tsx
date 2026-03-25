import type { ThemeColors } from "@/app/_theme";
import type { CampaignExpenseItem } from "@/components/home/campaignTypes";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
						<Feather name="file-text" size={16} color={colors.primaryGreen} />
						<Text style={[styles.sectionTitle, { color: colors.text }]}>
							Expense Report
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
								{totalSpentLabel}
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
						No expense report entries.
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
					<Feather name="file-text" size={16} color={colors.primaryGreen} />
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Expense Report
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
							{totalSpentLabel}
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
					style={[styles.expenseTotalLabel, { color: colors.placeholderMuted }]}
				>
					Total spent: {totalSpentLabel}
				</Text>
				{expenseReport.map((item) => (
					<View
						key={item.id}
						style={[
							styles.expenseRow,
							{ borderBottomColor: colors.tabInactive },
						]}
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
