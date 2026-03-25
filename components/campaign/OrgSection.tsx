import type { ThemeColors } from "@/app/_theme";
import type { CampaignPost } from "@/components/home/campaignTypes";
import Feather from "@expo/vector-icons/Feather";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type OrgSectionProps = {
	colors: ThemeColors;
	campaign: CampaignPost;
	isOpen: boolean;
	onToggle: () => void;
};

export function OrgSection({
	colors,
	campaign,
	isOpen,
	onToggle,
}: OrgSectionProps) {
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
					<Feather name="award" size={16} color={colors.primaryGreen} />
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Organization Verification
					</Text>
				</View>
				<View style={styles.sectionHeaderRight}>
					<Feather
						name="chevron-down"
						size={18}
						color={colors.placeholderMuted}
					/>
				</View>
			</Pressable>
			<View style={styles.sectionContent}>
				<View style={styles.orgRow}>
					<Image
						source={{ uri: campaign.orgProfileImageUri }}
						style={styles.orgAvatar}
					/>
					<View style={styles.orgMetaWrap}>
						<View style={styles.orgNameRow}>
							<Text
								style={[styles.orgName, { color: colors.text }]}
								numberOfLines={1}
							>
								{campaign.orgName}
							</Text>
							{campaign.isOrgVerified ? (
								<Feather
									name="check-circle"
									size={16}
									color={colors.primaryGreen}
								/>
							) : (
								<Feather
									name="x-circle"
									size={16}
									color={colors.placeholderMuted}
								/>
							)}
						</View>
						<Text
							style={[styles.memberSince, { color: colors.placeholderMuted }]}
						>
							Member since {campaign.orgMemberSinceYear}
						</Text>
					</View>
				</View>

				<View
					style={[
						styles.orgStats,
						{
							borderTopColor: colors.tabInactive,
							borderBottomColor: colors.tabInactive,
						},
					]}
				>
					<View style={styles.orgStatColumn}>
						<Text style={[styles.orgStatPrimary, { color: colors.text }]}>
							{campaign.orgRating.toFixed(1)}
						</Text>
						<Text
							style={[
								styles.orgStatSecondary,
								{ color: colors.placeholderMuted },
							]}
						>
							{campaign.orgReviewsCount} reviews
						</Text>
					</View>
					<View style={styles.orgStatColumn}>
						<Text style={[styles.orgStatPrimary, { color: colors.text }]}>
							{campaign.orgCampaignsCompleted}
						</Text>
						<Text
							style={[
								styles.orgStatSecondary,
								{ color: colors.placeholderMuted },
							]}
						>
							campaigns
						</Text>
					</View>
					<View style={styles.orgStatColumn}>
						<Feather
							name={campaign.isOrgVerified ? "check-circle" : "x-circle"}
							size={16}
							color={
								campaign.isOrgVerified
									? colors.primaryGreen
									: colors.profileDanger || colors.placeholderMuted // Fallback
							}
						/>
						<Text
							style={[
								styles.orgStatSecondary,
								{ color: colors.placeholderMuted },
							]}
						>
							{campaign.isOrgVerified ? "verified" : "not verified"}
						</Text>
					</View>
				</View>

				<View
					style={[
						styles.licenseBlock,
						{
							backgroundColor: colors.surfaceMuted,
							borderColor: colors.tabInactive,
						},
					]}
				>
					<Text
						style={[styles.licenseLabel, { color: colors.placeholderMuted }]}
					>
						License Number
					</Text>
					<Text style={[styles.licenseValue, { color: colors.text }]}>
						{campaign.orgLicenseNumber}
					</Text>
				</View>
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
	sectionContent: {
		marginTop: 12,
	},
	orgRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	orgAvatar: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "#D1D5DB",
	},
	orgMetaWrap: {
		marginLeft: 10,
		flex: 1,
	},
	orgNameRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	orgName: {
		fontSize: 15,
		fontWeight: "700",
	},
	memberSince: {
		fontSize: 12,
		fontWeight: "500",
		marginTop: 3,
	},
	orgStats: {
		marginTop: 12,
		paddingVertical: 10,
		borderTopWidth: 0.5,
		borderBottomWidth: 0.5,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	orgStatColumn: {
		flex: 1,
		alignItems: "center",
	},
	orgStatPrimary: {
		fontSize: 16,
		fontWeight: "700",
	},
	orgStatSecondary: {
		marginTop: 2,
		fontSize: 12,
		fontWeight: "500",
	},
	licenseBlock: {
		marginTop: 12,
		borderWidth: 0.5,
		borderRadius: 10,
		padding: 10,
	},
	licenseLabel: {
		fontSize: 12,
		fontWeight: "600",
	},
	licenseValue: {
		fontSize: 15,
		fontWeight: "700",
		marginTop: 3,
	},
});
