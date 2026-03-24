import type { ThemeColors } from "@/app/_theme";
import type { CampaignPost } from "@/components/home/campaignTypes";
import { StyleSheet, Text, View } from "react-native";

type ImpactBlockProps = {
	colors: ThemeColors;
	campaign: CampaignPost;
};

export function ImpactBlock({ colors, campaign }: ImpactBlockProps) {
	return campaign.impactType === "families" ? (
		<View style={styles.impactRowCentered}>
			<Text style={[styles.impactText, { color: colors.primaryGray }]}>
				🏠{campaign.familiesHelped}/{campaign.familiesTarget} families helped
			</Text>
		</View>
	) : campaign.impactType === "education" ? (
		<View style={styles.impactRowCentered}>
			<Text style={[styles.impactText, { color: colors.primaryGray }]}>
				🏠{campaign.educationSchools} school, {campaign.educationStudents}{" "}
				students
			</Text>
		</View>
	) : null;
}

const styles = StyleSheet.create({
	impactRowCentered: {
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	impactText: {
		fontSize: 13,
		fontWeight: "400",
		marginLeft: 6,
	},
});
