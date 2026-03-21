import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View } from "react-native";

type ProfileOrganizationCardProps = {
	colors: ThemeColors;
	organizationName: string;
};

export default function ProfileOrganizationCard({
	colors,
	organizationName,
}: ProfileOrganizationCardProps) {
	return (
		<AnimatedPressable
			style={[
				styles.card,
				{
					backgroundColor: colors.profileOrgBackground,
					borderColor: colors.profileBorder,
				},
			]}
		>
			<View style={styles.orgRow}>
				<View
					style={[
						styles.orgIconWrap,
						{ backgroundColor: colors.profileAccentSoft },
					]}
				>
					<MaterialCommunityIcons
						name="office-building-outline"
						size={18}
						color={colors.profileAccent}
					/>
				</View>
				<View style={styles.orgTextWrap}>
					<Text style={[styles.orgTitle, { color: colors.profileOrgText }]}>
						My Organization
					</Text>
					<Text style={[styles.orgName, { color: colors.profileOrgText }]}>
						{organizationName}
					</Text>
				</View>
				<Feather name="chevron-right" size={18} color={colors.profileOrgText} />
			</View>
		</AnimatedPressable>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 18,
		borderWidth: 1,
		padding: 14,
	},
	orgRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	orgIconWrap: {
		width: 40,
		height: 40,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	orgTextWrap: {
		flex: 1,
		gap: 4,
	},
	orgTitle: {
		fontSize: 16,
		fontWeight: "700",
	},
	orgName: {
		fontSize: 13,
		fontWeight: "600",
		opacity: 0.85,
	},
});
