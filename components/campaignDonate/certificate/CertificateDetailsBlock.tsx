import type { ThemeColors } from "@/app/_theme";
import useDonateTablet from "@/hooks/useDonateTablet";
import { CircleCheck } from "lucide-react-native";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
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

export default function CertificateDetailsBlock({
	colors,
	donorName,
	amountLabel,
	campaignTitle,
	organizationName,
	dateLabel,
	certificateCode,
}: CertificateDetailsBlockProps) {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const isTablet = useDonateTablet();

	function DetailRow({ colors, label, value }: DetailRowProps) {
		return (
			<View
				style={[
					styles.detailRow,
					{
						marginTop: detailRowMarginTop,
					},
				]}
			>
				<Text
					style={[
						styles.detailLabel,
						{
							color: colors.primaryGray,
							fontSize: detailLabelFontSize,
							paddingRight: detailLabelPaddingRight,
						},
					]}
				>
					{label}
				</Text>
				<Text
					style={[
						styles.detailValue,
						{ color: colors.text, fontSize: detailValueFontSize },
					]}
				>
					{value}
				</Text>
			</View>
		);
	}

	const frameMarginTop = isTablet ? screenHeight * 0.01 : screenHeight * 0.015;
	const frameBorderRadius = isTablet ? screenWidth * 0.03 : screenWidth * 0.04;
	const framePaddingVertical = isTablet
		? screenHeight * 0.03
		: screenHeight * 0.025;
	const framePaddingHorizontal = isTablet
		? screenWidth * 0.035
		: screenWidth * 0.04;

	const supportingTextFontSize = isTablet
		? screenWidth * 0.03
		: screenWidth * 0.035;
	const donorNameFontSize = isTablet ? screenWidth * 0.04 : screenWidth * 0.05;
	const donorNameMarginTop = isTablet
		? screenHeight * 0.01
		: screenHeight * 0.005;

	const detailDividerMarginVertical = isTablet
		? screenHeight * 0.018
		: screenHeight * 0.015;

	const donationAmountFontSize = isTablet
		? screenWidth * 0.05
		: screenWidth * 0.06;
	const donationAmountMarginTop = isTablet
		? screenHeight * 0.01
		: screenHeight * 0.005;

	const detailRowMarginTop = isTablet
		? screenHeight * 0.015
		: screenHeight * 0.001;
	const detailLabelFontSize = isTablet
		? screenWidth * 0.025
		: screenWidth * 0.03;
	const detailValueFontSize = isTablet
		? screenWidth * 0.025
		: screenWidth * 0.03;
	const detailLabelPaddingRight = isTablet
		? screenWidth * 0.02
		: screenWidth * 0.01;

	const circleCheckSize = isTablet ? screenWidth * 0.028 : screenWidth * 0.038; // roughly 28/14
	const verifiedFontSize = isTablet ? screenWidth * 0.025 : screenWidth * 0.035; // 24/12
	const verifiedMarginLeft = isTablet
		? screenWidth * 0.01
		: screenWidth * 0.015; // 10/5
	const certificateCodeFontSize = isTablet
		? screenWidth * 0.025
		: screenWidth * 0.035; // 24/12

	return (
		<CertificateFrame
			colors={colors}
			style={{
				marginTop: frameMarginTop,
				borderWidth: 2,
				borderRadius: frameBorderRadius,
				paddingVertical: framePaddingVertical,
				paddingHorizontal: framePaddingHorizontal,
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
					{ color: colors.primaryGray, fontSize: supportingTextFontSize },
				]}
			>
				This certifies that
			</Text>

			<Text
				style={[
					styles.donorName,
					{
						color: colors.text,
						fontSize: donorNameFontSize,
						marginTop: donorNameMarginTop,
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
						marginVertical: detailDividerMarginVertical,
					},
				]}
			/>

			<Text
				style={[
					styles.supportingText,
					{ color: colors.primaryGray, fontSize: supportingTextFontSize },
				]}
			>
				has generously donated
			</Text>
			<Text
				style={[
					styles.donationAmount,
					{
						color: colors.primaryGreen,
						fontSize: donationAmountFontSize,
						marginTop: donationAmountMarginTop,
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
						marginVertical: detailDividerMarginVertical,
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
						marginVertical: detailDividerMarginVertical,
					},
				]}
			/>

			<View
				style={[
					styles.detailRow,
					{
						marginTop: detailRowMarginTop,
					},
				]}
			>
				<View style={styles.verifiedWrap}>
					<CircleCheck size={circleCheckSize} color={colors.primaryGreen} />
					<Text
						style={[
							styles.verifiedText,
							{
								color: colors.primaryGreen,
								fontSize: verifiedFontSize,
								marginLeft: verifiedMarginLeft,
							},
						]}
					>
						Verified
					</Text>
				</View>
				<Text
					style={[
						styles.certificateCode,
						{ color: colors.primaryGray, fontSize: certificateCodeFontSize },
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
