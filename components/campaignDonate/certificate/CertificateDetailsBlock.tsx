import type { ThemeColors } from "@/app/_theme";
import useDonateTablet from "@/hooks/useDonateTablet";
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
	const isTablet = useDonateTablet();

	return (
		<View
			style={[
				styles.detailRow,
				{
					marginTop: isTablet ? 16 : 8,
				},
			]}
		>
			<Text
				style={[
					styles.detailLabel,
					{
						color: colors.primaryGray,
						fontSize: isTablet ? 24 : 12,
						paddingRight: isTablet ? 20 : 10,
					},
				]}
			>
				{label}
			</Text>
			<Text
				style={[
					styles.detailValue,
					{ color: colors.text, fontSize: isTablet ? 24 : 12 },
				]}
			>
				{value}
			</Text>
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
	const isTablet = useDonateTablet();

	return (
		<CertificateFrame
			colors={colors}
			style={{
				marginTop: isTablet ? 24 : 12,
				borderWidth: 2,
				borderRadius: isTablet ? 24 : 12,
				paddingVertical: isTablet ? 44 : 22,
				paddingHorizontal: isTablet ? 40 : 20,
				// marginTop: 12,
				// borderWidth: 2,
				// borderRadius: 12,
				// paddingVertical: 22,
				// paddingHorizontal: 20,
			}}
		>
			<Text
				style={[
					styles.supportingText,
					{ color: colors.primaryGray, fontSize: isTablet ? 24 : 12 },
				]}
			>
				This certifies that
			</Text>
			<Text
				style={[
					styles.donorName,
					{
						color: colors.text,
						fontSize: isTablet ? 36 : 18,
						marginTop: isTablet ? 12 : 6,
					},
				]}
			>
				{donorName}
			</Text>

			<View
				style={[
					styles.detailDivider,
					{
						backgroundColor: colors.secondaryGray,
						marginVertical: isTablet ? 24 : 12,
					},
				]}
			/>

			<Text
				style={[
					styles.supportingText,
					{ color: colors.primaryGray, fontSize: isTablet ? 24 : 12 },
				]}
			>
				has generously donated
			</Text>
			<Text
				style={[
					styles.donationAmount,
					{
						color: colors.primaryGreen,
						fontSize: isTablet ? 42 : 21,
						marginTop: isTablet ? 12 : 6,
					},
				]}
			>
				{amountLabel}
			</Text>

			<View
				style={[
					styles.detailDivider,
					{
						backgroundColor: colors.secondaryGray,
						marginVertical: isTablet ? 24 : 12,
					},
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
					{
						backgroundColor: colors.secondaryGray,
						marginVertical: isTablet ? 24 : 12,
					},
				]}
			/>

			<View
				style={[
					styles.detailRow,
					{
						marginTop: isTablet ? 16 : 8,
					},
				]}
			>
				<View style={styles.verifiedWrap}>
					<CircleCheck size={isTablet ? 28 : 14} color={colors.primaryGreen} />
					<Text
						style={[
							styles.verifiedText,
							{
								color: colors.primaryGreen,
								fontSize: isTablet ? 24 : 12,
								marginLeft: isTablet ? 10 : 5,
							},
						]}
					>
						Verified
					</Text>
				</View>
				<Text
					style={[
						styles.certificateCode,
						{ color: colors.primaryGray, fontSize: isTablet ? 24 : 12 },
					]}
				>
					{certificateCode}
				</Text>
			</View>
		</CertificateFrame>
	);
}

const styles = StyleSheet.create({
	supportingText: {
		fontWeight: "500",
		textAlign: "center",
	},
	donorName: {
		fontWeight: "800",
		textAlign: "center",
	},
	donationAmount: {
		fontWeight: "800",
		textAlign: "center",
	},
	detailDivider: {
		height: 1,
	},
	detailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	detailLabel: {
		fontWeight: "600",
	},
	detailValue: {
		fontWeight: "700",
		flex: 1,
		textAlign: "right",
	},
	verifiedWrap: {
		flexDirection: "row",
		alignItems: "center",
	},
	verifiedText: {
		fontWeight: "700",
	},
	certificateCode: {
		fontWeight: "400",
	},
});
