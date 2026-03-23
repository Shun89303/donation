import type { ThemeColors } from "@/app/_theme";
import { CircleCheck } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import CertificateFrame from "./CertificateFrame";

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
			<Text style={[styles.detailLabel, { color: colors.primaryGray }]}>
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
		<CertificateFrame colors={colors} style={styles.certificateBlock}>
			<Text style={[styles.supportingText, { color: colors.primaryGray }]}>
				This certifies that
			</Text>
			<Text style={[styles.donorName, { color: colors.text }]}>
				{donorName}
			</Text>

			<View
				style={[
					styles.detailDivider,
					{ backgroundColor: colors.secondaryGray },
				]}
			/>

			<Text style={[styles.supportingText, { color: colors.primaryGray }]}>
				has generously donated
			</Text>
			<Text style={[styles.donationAmount, { color: colors.primaryGreen }]}>
				{amountLabel}
			</Text>

			<View
				style={[
					styles.detailDivider,
					{ backgroundColor: colors.secondaryGray },
				]}
			/>
			<DetailRow colors={colors} label="Campaign" value={campaignTitle} />
			<DetailRow
				colors={colors}
				label="Organization"
				value={organizationName}
			/>
			<DetailRow colors={colors} label="Date" value={dateLabel} />

			<View
				style={[
					styles.detailDivider,
					{ backgroundColor: colors.secondaryGray },
				]}
			/>

			<View style={styles.detailRow}>
				<View style={styles.verifiedWrap}>
					<CircleCheck size={14} color={colors.primaryGreen} />
					<Text style={[styles.verifiedText, { color: colors.primaryGreen }]}>
						Verified
					</Text>
				</View>
				<Text style={[styles.certificateCode, { color: colors.primaryGray }]}>
					{certificateCode}
				</Text>
			</View>
		</CertificateFrame>
	);
}

const styles = StyleSheet.create({
	certificateBlock: {
		marginTop: 12,
		borderWidth: 2,
		borderRadius: 12,
		paddingVertical: 22,
		paddingHorizontal: 20,
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
		fontWeight: "400",
	},
});
