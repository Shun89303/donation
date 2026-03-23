import type { ThemeColors } from "@/app/_theme";
import useDonateTablet from "@/hooks/useDonateTablet";
import { Award, X } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import PopPressable from "../PopPressable";

type CertificateHeaderProps = {
	colors: ThemeColors;
	onClose: () => void;
};

export default function CertificateHeader({
	colors,
	onClose,
}: CertificateHeaderProps) {
	const isTablet = useDonateTablet();

	return (
		<>
			<View style={styles.closeRow}>
				<PopPressable
					onPress={onClose}
					style={[
						styles.closeButton,
						{
							backgroundColor: colors.secondaryGray,
							// width: 32,
							// height: 32,
							// padding: 20,
							width: isTablet ? 64 : 32,
							height: isTablet ? 64 : 32,
							padding: isTablet ? 40 : 20,
						},
					]}
				>
					{/* <X size={18} color={colors.primaryGray} /> */}
					<X size={isTablet ? 36 : 18} color={colors.primaryGray} />
				</PopPressable>
			</View>
			<View style={styles.headerCenter}>
				<View
					style={{
						padding: isTablet ? 35 : 20,
						backgroundColor: colors.secondaryGreen,
						borderRadius: 99,
					}}
				>
					{/* <Award size={35} color={colors.primaryGreen} /> */}
					<Award size={isTablet ? 70 : 35} color={colors.primaryGreen} />
				</View>
				<Text
					style={[
						styles.title,
						{
							color: colors.text,
							// fontSize: 13,
							// marginTop: 8,
							// letterSpacing: 0.5,
							fontSize: isTablet ? 26 : 13,
							marginTop: isTablet ? 16 : 8,
							letterSpacing: isTablet ? 1 : 0.5,
						},
					]}
				>
					CERTIFICATE OF DONATION
				</Text>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	closeRow: {
		alignItems: "flex-end",
	},
	closeButton: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 99,
	},
	headerCenter: {
		alignItems: "center",
	},
	title: {
		fontWeight: "500",
	},
});
