import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import { CircleCheck, Clock, Users } from "lucide-react-native";
import {
	type GestureResponderEvent,
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native";
import type { CampaignPost } from "../campaignTypes";
import SupportButton from "./SupportButton";

type CampaignCardProps = {
	item: CampaignPost;
	colors: ThemeColors;
	onPressCard: () => void;
	onPressSupport: () => void;
};

export default function CampaignCard({
	item,
	colors,
	onPressCard,
	onPressSupport,
}: CampaignCardProps) {
	const handleSupportPress = (event: GestureResponderEvent) => {
		event.stopPropagation();
		onPressSupport();
	};

	return (
		<AnimatedPressable
			onPress={onPressCard}
			style={[
				styles.campaignCard,
				{
					backgroundColor: colors.background,
					borderColor: colors.tabInactive,
					shadowColor: colors.panelShadow,
				},
			]}
		>
			{item.isUrgent ? (
				<View style={styles.urgentBadge}>
					<Text style={styles.urgentBadgeText}>Urgent</Text>
				</View>
			) : null}
			<Image source={{ uri: item.imageUri }} style={styles.campaignBanner} />
			<View style={styles.campaignBody}>
				<View style={styles.orgHeaderRow}>
					<Text
						style={[styles.orgNameText, { color: colors.placeholderMuted }]}
						numberOfLines={1}
					>
						{item.orgName}
					</Text>
					<CircleCheck
						size={18}
						color={colors.tabActive}
						style={styles.orgVerifiedIcon}
					/>
				</View>
				<Text style={[styles.campaignTitle, { color: colors.text }]}>
					{item.title}
				</Text>

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
					<View style={styles.metaColumn}>
						<Text style={[styles.metaPrimary, { color: colors.text }]}>
							{item.raisedLabel}
						</Text>
						<Text
							style={[styles.metaSecondary, { color: colors.placeholderMuted }]}
						>
							{item.goalLabel}
						</Text>
					</View>
					<View style={[styles.metaColumn, styles.metaColumnRight]}>
						<View style={styles.metaIconLine}>
							<Users size={14} color={colors.onSurfaceMuted} />
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

						<View style={[styles.metaIconLine, styles.metaIconLineOffset]}>
							<Clock size={14} color={colors.placeholderMuted} />
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

				{item.impactType === "families" ? (
					<View style={styles.impactRow}>
						<Text style={{ fontSize: 14, color: colors.onSurfaceMuted }}>
							🏠
						</Text>
						<Text
							style={[styles.impactText, { color: colors.placeholderMuted }]}
						>
							{item.familiesHelped}/{item.familiesTarget} families helped
						</Text>
					</View>
				) : item.impactType === "education" ? (
					<View style={styles.impactRow}>
						<Text style={{ fontSize: 14, color: colors.onSurfaceMuted }}>
							🏠
						</Text>
						<Text
							style={[styles.impactText, { color: colors.placeholderMuted }]}
						>
							{item.educationSchools} school, {item.educationStudents} students
						</Text>
					</View>
				) : null}

				<SupportButton colors={colors} onPress={handleSupportPress} />
			</View>
		</AnimatedPressable>
	);
}

const styles = StyleSheet.create({
	campaignCard: {
		marginTop: 14,
		borderWidth: 0.3,
		borderRadius: 14,
		overflow: "hidden",
		shadowOffset: { width: 4, height: 10 },
		shadowOpacity: 0.2,
		shadowRadius: 16,
		elevation: 8,
		marginVertical: 15,
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
});
