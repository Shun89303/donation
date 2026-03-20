import type { ThemeColors } from "@/app/_theme";
import Feather from "@expo/vector-icons/Feather";
import { FlashList, type FlashListRef } from "@shopify/flash-list";
import type { RefObject } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { CampaignPost } from "./campaignTypes";

type CampaignFeedProps = {
	colors: ThemeColors;
	posts: CampaignPost[];
	feedListRef: RefObject<FlashListRef<CampaignPost> | null>;
	extraData?: unknown;
};

export default function CampaignFeed({
	colors,
	posts,
	feedListRef,
	extraData,
}: CampaignFeedProps) {
	return (
		<FlashList
			ref={feedListRef}
			data={posts}
			extraData={extraData}
			keyExtractor={(item) => item.id}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.feedContent}
			ListEmptyComponent={
				// UI for empty SEARCH or FILTER result
				<View
					style={[
						styles.emptyCard,
						{
							backgroundColor: colors.background,
							borderColor: colors.tabInactive,
						},
					]}
				>
					<Feather name="inbox" size={24} color={colors.placeholderMuted} />
					<Text style={[styles.emptyTitle, { color: colors.text }]}>
						No active campaigns
					</Text>
					<Text
						style={[styles.emptySubtitle, { color: colors.placeholderMuted }]}
					>
						This organization has no campaigns right now
					</Text>
				</View>
			}
			renderItem={({ item }) => (
				<View
					style={[
						styles.campaignCard,
						{
							backgroundColor: colors.background,
							borderColor: colors.tabInactive,
							shadowColor: colors.panelShadow,
						},
					]}
				>
					{/* URGENT badge */}
					{item.isUrgent ? (
						<View style={styles.urgentBadge}>
							<Text style={styles.urgentBadgeText}>Urgent</Text>
						</View>
					) : null}
					<Image
						source={{ uri: item.imageUri }}
						style={styles.campaignBanner}
					/>
					<View style={styles.campaignBody}>
						<View style={styles.orgHeaderRow}>
							{/* ORG name */}
							<Text
								style={[styles.orgNameText, { color: colors.placeholderMuted }]}
								numberOfLines={1}
							>
								{item.orgName}
							</Text>
							<Feather
								name="check-circle"
								size={18}
								color={colors.tabActive}
								style={styles.orgVerifiedIcon}
							/>
						</View>
						{/* POST TITLE */}
						<Text style={[styles.campaignTitle, { color: colors.text }]}>
							{item.title}
						</Text>

						{/* PROGRESS BAR */}
						<View
							style={[
								styles.progressTrack,
								{
									backgroundColor: colors.surfaceMuted,
									borderColor: colors.tabInactive,
								},
							]}
						>
							<View
								style={[
									styles.progressFill,
									{
										backgroundColor: colors.tabActive,
										width: `${item.progress * 100}%`,
									},
								]}
							/>
						</View>

						<View style={styles.metaRow}>
							{/* Fund progress */}
							<View style={styles.metaColumn}>
								<Text style={[styles.metaPrimary, { color: colors.text }]}>
									{item.raisedLabel}
								</Text>
								<Text
									style={[
										styles.metaSecondary,
										{ color: colors.placeholderMuted },
									]}
								>
									{item.goalLabel}
								</Text>
							</View>
							<View style={[styles.metaColumn, styles.metaColumnRight]}>
								{/* Donors count */}
								<View style={styles.metaIconLine}>
									<Feather
										name="users"
										size={14}
										color={colors.onSurfaceMuted}
									/>
									<Text
										style={[
											styles.metaPrimary,
											styles.metaIconText,
											{ color: colors.text },
										]}
									>
										{item.donors}
									</Text>
								</View>

								{/* Deadline */}
								<View style={[styles.metaIconLine, styles.metaIconLineOffset]}>
									<Feather
										name="clock"
										size={14}
										color={colors.placeholderMuted}
									/>
									<Text
										style={[
											styles.metaSecondary,
											styles.metaIconText,
											{ color: colors.placeholderMuted },
										]}
									>
										{item.timeLeftLabel}
									</Text>
								</View>
							</View>
						</View>

						{/* Families Helped */}
						{item.impactType === "families" ? (
							<View style={styles.impactRow}>
								<Feather name="home" size={14} color={colors.onSurfaceMuted} />
								<Text
									style={[styles.impactText, { color: colors.placeholderMuted }]}
								>
									{item.familiesHelped}/{item.familiesTarget} families helped
								</Text>
							</View>
						) : item.impactType === "education" ? (
							<View style={styles.impactRow}>
								<Feather
									name="book-open"
									size={14}
									color={colors.onSurfaceMuted}
								/>
								<Text
									style={[styles.impactText, { color: colors.placeholderMuted }]}
								>
									{item.educationSchools} school, {item.educationStudents} students
								</Text>
							</View>
						) : null}

						<Pressable
							style={[
								styles.supportButton,
								{ backgroundColor: colors.tabActive },
							]}
						>
							<Text style={styles.supportButtonText}>Support this village</Text>
						</Pressable>
					</View>
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	feedContent: {
		paddingBottom: 24,
		flexGrow: 1,
	},
	emptyCard: {
		marginTop: 14,
		borderWidth: 0.4,
		borderRadius: 14,
		paddingVertical: 24,
		paddingHorizontal: 18,
		alignItems: "center",
	},
	emptyTitle: {
		marginTop: 10,
		fontSize: 18,
		fontWeight: "700",
	},
	emptySubtitle: {
		marginTop: 6,
		fontSize: 13,
		fontWeight: "500",
		textAlign: "center",
	},
	campaignCard: {
		marginTop: 14,
		borderWidth: 0.3,
		borderRadius: 14,
		overflow: "hidden",
		shadowOffset: { width: 4, height: 10 },
		shadowOpacity: 0.2,
		shadowRadius: 16,
		elevation: 8,
	},
	urgentBadge: {
		position: "absolute",
		top: 10,
		left: 10,
		zIndex: 2,
		backgroundColor: "#E53935",
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 999,
	},
	urgentBadgeText: {
		color: "white",
		fontSize: 11,
		fontWeight: "700",
		letterSpacing: 0.2,
	},
	campaignBanner: {
		width: "100%",
		height: 170,
	},
	campaignBody: {
		padding: 12,
	},
	orgHeaderRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},
	orgNameText: {
		fontSize: 15,
		fontWeight: "700",
		maxWidth: "88%",
	},
	orgVerifiedIcon: {
		marginLeft: 6,
	},
	campaignTitle: {
		fontSize: 18,
		fontWeight: "700",
		lineHeight: 24,
	},
	progressTrack: {
		height: 10,
		borderRadius: 8,
		borderWidth: 0.5,
		marginTop: 12,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		borderRadius: 8,
	},
	metaRow: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	metaColumn: {
		flex: 1,
	},
	metaColumnRight: {
		alignItems: "flex-end",
	},
	metaIconLine: {
		flexDirection: "row",
		alignItems: "flex-end",
	},
	metaIconLineOffset: {
		marginTop: 2,
	},
	metaIconText: {
		marginLeft: 5,
	},
	metaPrimary: {
		fontSize: 14,
		fontWeight: "700",
	},
	metaSecondary: {
		marginTop: 2,
		fontSize: 12,
		fontWeight: "500",
	},
	impactText: {
		fontSize: 13,
		fontWeight: "500",
		marginLeft: 6,
	},
	impactRow: {
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	supportButton: {
		marginTop: 12,
		borderRadius: 12,
		paddingVertical: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	supportButtonText: {
		color: "white",
		fontSize: 15,
		fontWeight: "700",
	},
});
