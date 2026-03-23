import type { ThemeColors } from "@/app/_theme";
import useDonateTablet from "@/hooks/useDonateTablet";
import { StyleSheet, Text, View } from "react-native";

type CertificateThanksProps = {
	colors: ThemeColors;
};

export default function CertificateThanks({ colors }: CertificateThanksProps) {
	const isTablet = useDonateTablet();

	return (
		<>
			<View
				style={[
					styles.thanksRow,
					{
						marginTop: isTablet ? 24 : 12,
					},
				]}
			>
				<Text
					style={[
						styles.thanksTitle,
						{
							color: colors.primaryGray,
							fontSize: isTablet ? 28 : 14,
							marginRight: isTablet ? 12 : 6,
						},
					]}
				>
					Thank you for your kindness 💚
				</Text>
			</View>
			<Text
				style={[
					styles.thanksSubtitle,
					{
						color: colors.primaryGray,
						marginTop: isTablet ? 8 : 4,
						fontSize: isTablet ? 24 : 12,
					},
				]}
			>
				Your contribution makes a real difference.
			</Text>
		</>
	);
}

const styles = StyleSheet.create({
	thanksRow: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	thanksTitle: {
		fontWeight: "400",
	},
	thanksSubtitle: {
		fontWeight: "400",
		textAlign: "center",
	},
});
