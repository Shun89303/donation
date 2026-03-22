import type { ThemeColors } from "@/app/_theme";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, View } from "react-native";

type CertificateDetailsBlockProps = {
	colors: ThemeColors;
	donorName: string;
	amountLabel: string;
	campaignTitle: string;
	organizationName: string;
	dateLabel: string;
	certificateCode: string;
};

type DetailRowProps = {
	colors: ThemeColors;
	label: string;
	value: string;
};

function DetailRow({ colors, label, value }: DetailRowProps) {
	return (
		<View style={styles.detailRow}>
			<Text style={[styles.detailLabel, { color: colors.placeholderMuted }]}>
				{label}
			</Text>
			<Text style={[styles.detailValue, { color: colors.text }]}>{value}</Text>
		</View>
	);
}

export default function CertificateDetailsBlock({
	colors,
	donorName,
	amountLabel,
	campaignTitle,
	organizationName,
	dateLabel,
	certificateCode,
}: CertificateDetailsBlockProps) {
	return (
		<View
			style={[
				styles.certificateBlock,
				{ borderColor: colors.tabInactive, backgroundColor: colors.background },
			]}
		>
			<Text style={[styles.supportingText, { color: colors.placeholderMuted }]}>
				This certifies that
			</Text>
			<Text style={[styles.donorName, { color: colors.text }]}>
				{donorName}
			</Text>
			<Text style={[styles.supportingText, { color: colors.placeholderMuted }]}>
				has generously donated
			</Text>
			<Text style={[styles.donationAmount, { color: colors.tabActive }]}>
				{amountLabel}
			</Text>

			<View
				style={[styles.detailDivider, { backgroundColor: colors.tabInactive }]}
			/>
			<DetailRow colors={colors} label="Campaign" value={campaignTitle} />
			<DetailRow
				colors={colors}
				label="Organization"
				value={organizationName}
			/>
			<DetailRow colors={colors} label="Date" value={dateLabel} />
			<View style={styles.detailRow}>
				<View style={styles.verifiedWrap}>
					<Feather name="check-circle" size={14} color={colors.tabActive} />
					<Text style={[styles.verifiedText, { color: colors.tabActive }]}>
						Verified
					</Text>
				</View>
				<Text style={[styles.certificateCode, { color: colors.text }]}>
					{certificateCode}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	certificateBlock: {
		marginTop: 12,
		borderWidth: 1,
		borderRadius: 12,
		padding: 12,
	},
	supportingText: {
		fontSize: 12,
		fontWeight: "500",
		textAlign: "center",
	},
	donorName: {
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
		marginTop: 6,
	},
	donationAmount: {
		fontSize: 21,
		fontWeight: "800",
		textAlign: "center",
		marginTop: 6,
	},
	detailDivider: {
		height: 1,
		marginVertical: 12,
	},
	detailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 8,
	},
	detailLabel: {
		fontSize: 12,
		fontWeight: "600",
		paddingRight: 10,
	},
	detailValue: {
		fontSize: 12,
		fontWeight: "700",
		flex: 1,
		textAlign: "right",
	},
	verifiedWrap: {
		flexDirection: "row",
		alignItems: "center",
	},
	verifiedText: {
		fontSize: 12,
		fontWeight: "700",
		marginLeft: 5,
	},
	certificateCode: {
		fontSize: 12,
		fontWeight: "800",
	},
});
