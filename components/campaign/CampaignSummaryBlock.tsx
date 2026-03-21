import type { ThemeColors } from "@/app/_theme";
import type { CampaignPost } from "@/components/home/campaignTypes";
import { formatDate } from "@/utils/campaignDetailsUtils";
import Feather from "@expo/vector-icons/Feather";
import { Image, StyleSheet, Text, View } from "react-native";

type CampaignSummaryBlockProps = {
	colors: ThemeColors;
	campaign: CampaignPost;
};

export function CampaignSummaryBlock({
	colors,
	campaign,
}: CampaignSummaryBlockProps) {
	return (
		<View
			style={[
				styles.card,
				{ borderColor: colors.tabInactive, backgroundColor: colors.background },
			]}
		>
			<View style={styles.orgBlock}>
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
							<Feather name="check-circle" size={16} color={colors.tabActive} />
						) : (
							<Feather
								name="x-circle"
								size={16}
								color={colors.placeholderMuted}
							/>
						)}
					</View>
					<View style={styles.ratingRow}>
						<Feather name="star" size={14} color="#CDA434" />
						<Text
							style={[styles.ratingText, { color: colors.placeholderMuted }]}
						>
							{campaign.orgRating.toFixed(1)}
						</Text>
						<Text
							style={[styles.ratingDot, { color: colors.placeholderMuted }]}
						>
							•
						</Text>
						<Text
							style={[styles.ratingText, { color: colors.placeholderMuted }]}
						>
							{campaign.orgReviewsCount} reviews
						</Text>
					</View>
				</View>
			</View>

			<Text style={[styles.campaignTitle, { color: colors.text }]}>
				{campaign.title}
			</Text>

			<View style={styles.metaSingleRow}>
				<View style={styles.metaItemInline}>
					<Feather name="map-pin" size={14} color={colors.placeholderMuted} />
					<Text
						style={[styles.metaInlineText, { color: colors.placeholderMuted }]}
					>
						{campaign.locationLabel}
					</Text>
				</View>

				<View style={styles.metaItemInline}>
					<Feather name="calendar" size={14} color={colors.placeholderMuted} />
					<Text
						style={[styles.metaInlineText, { color: colors.placeholderMuted }]}
					>
						{formatDate(campaign.initiatedAt)}
					</Text>
				</View>
			</View>

			<Text style={[styles.aboutText, { color: colors.placeholderMuted }]}>
				{campaign.aboutText}
			</Text>

			<View
				style={[
					styles.progressTrack,
					{
						borderColor: colors.tabInactive,
						backgroundColor: colors.surfaceMuted,
					},
				]}
			>
				<View
					style={[
						styles.progressFill,
						{
							backgroundColor: colors.tabActive,
							width: `${campaign.progress * 100}%`,
						},
					]}
				/>
			</View>

			<View style={[styles.statsWrap, { borderColor: colors.tabInactive }]}>
				<View style={styles.statColumn}>
					<Text style={[styles.statPrimary, { color: colors.text }]}>
						{campaign.raisedLabel}
					</Text>
					<Text
						style={[styles.statSecondary, { color: colors.placeholderMuted }]}
					>
						{campaign.goalLabel}
					</Text>
				</View>

				<View style={styles.statColumnCenter}>
					<View style={styles.inlineValueRow}>
						<Feather name="users" size={14} color={colors.onSurfaceMuted} />
						<Text
							style={[
								styles.statPrimary,
								styles.inlineValueText,
								{ color: colors.text },
							]}
						>
							{campaign.donors}
						</Text>
					</View>
					<Text
						style={[styles.statSecondary, { color: colors.placeholderMuted }]}
					>
						donors
					</Text>
				</View>

				<View style={styles.statColumnCenter}>
					<View style={styles.inlineValueRow}>
						<Feather name="clock" size={14} color={colors.onSurfaceMuted} />
						<Text
							style={[
								styles.statPrimary,
								styles.inlineValueText,
								{ color: colors.text },
							]}
						>
							{campaign.daysLeft}
						</Text>
					</View>
					<Text
						style={[styles.statSecondary, { color: colors.placeholderMuted }]}
					>
						days left
					</Text>
				</View>
			</View>

			{campaign.impactType === "families" ? (
				<View style={styles.impactRowCentered}>
					<Feather name="home" size={14} color={colors.onSurfaceMuted} />
					<Text style={[styles.impactText, { color: colors.placeholderMuted }]}>
						{campaign.familiesHelped}/{campaign.familiesTarget} families helped
					</Text>
				</View>
			) : campaign.impactType === "education" ? (
				<View style={styles.impactRowCentered}>
					<Feather name="book-open" size={14} color={colors.onSurfaceMuted} />
					<Text style={[styles.impactText, { color: colors.placeholderMuted }]}>
						{campaign.educationSchools} school, {campaign.educationStudents}{" "}
						students
					</Text>
				</View>
			) : null}
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
	orgBlock: {
		flexDirection: "row",
		alignItems: "center",
	},
	orgAvatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
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
		maxWidth: "90%",
	},
	ratingRow: {
		marginTop: 3,
		flexDirection: "row",
		alignItems: "center",
	},
	ratingText: {
		fontSize: 13,
		fontWeight: "500",
	},
	ratingDot: {
		marginHorizontal: 5,
		fontWeight: "700",
	},
	campaignTitle: {
		fontSize: 24,
		lineHeight: 31,
		fontWeight: "800",
		marginTop: 16,
	},
	metaSingleRow: {
		marginTop: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	metaItemInline: {
		flexDirection: "row",
		alignItems: "center",
		maxWidth: "60%",
	},
	metaInlineText: {
		fontSize: 13,
		fontWeight: "500",
	},
	aboutText: {
		marginTop: 10,
		fontSize: 14,
		fontWeight: "500",
		lineHeight: 22,
	},
	progressTrack: {
		height: 10,
		borderRadius: 8,
		borderWidth: 0.5,
		marginTop: 14,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		borderRadius: 8,
	},
	statsWrap: {
		marginTop: 12,
		borderWidth: 1,
		borderRadius: 12,
		padding: 12,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	statColumn: {
		flex: 1.35,
	},
	statColumnCenter: {
		flex: 1,
		alignItems: "center",
	},
	statPrimary: {
		fontSize: 14,
		fontWeight: "700",
	},
	statSecondary: {
		fontSize: 12,
		fontWeight: "500",
		marginTop: 2,
	},
	inlineValueRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	inlineValueText: {
		marginLeft: 4,
	},
	impactRowCentered: {
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	impactText: {
		fontSize: 13,
		fontWeight: "500",
		marginLeft: 6,
	},
});
