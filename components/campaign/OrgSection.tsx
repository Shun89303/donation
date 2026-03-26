import type { ThemeColors } from "@/app/_theme";
import type { CampaignPost } from "@/components/home/campaignTypes";
import globalStyles from "@/styles/styles";
import { metrics } from "@/utils/metrics";
import {
	Check,
	ChevronDown,
	CircleCheck,
	Shield,
	Star,
	XCircle,
} from "lucide-react-native";
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
	const totalStars = 5;
	const rating = campaign.orgRating;

	return (
		<View
			style={{
				borderColor: colors.secondaryGray,
				backgroundColor: colors.background,
				marginTop: metrics.spacingMedium,
				borderWidth: metrics.borderThin,
				borderRadius: metrics.borderRadiusLarge,
				padding: metrics.spacingMedium,
				...globalStyles.shadows,
			}}
		>
			<Pressable style={styles.collapsibleHeader}>
				<View style={styles.sectionHeaderLeft}>
					<Shield size={metrics.iconMedium} color={colors.primaryGreen} />
					<Text
						style={[
							styles.sectionTitle,
							{
								color: colors.text,
								fontSize: metrics.fontMedium,
								marginLeft: metrics.spacingSmall,
							},
						]}
					>
						Organization Verification
					</Text>
				</View>
				<View style={styles.sectionHeaderRight}>
					<ChevronDown size={metrics.iconMedium} color={colors.primaryGray} />
				</View>
			</Pressable>
			<View
				style={{
					marginTop: metrics.spacingMedium,
				}}
			>
				<View style={styles.orgRow}>
					{campaign.orgProfileImageUri ? (
						<Image
							source={{ uri: campaign.orgProfileImageUri }}
							style={{
								width: metrics.avatarMedium,
								height: metrics.avatarMedium,
								borderRadius: metrics.borderRadiusLarge,
								backgroundColor: colors.secondaryGreen,
							}}
						/>
					) : (
						<View
							style={[
								styles.orgAvatarFallback,
								{
									width: metrics.avatarMedium,
									height: metrics.avatarMedium,
									borderRadius: metrics.borderRadiusLarge,
									backgroundColor: colors.secondaryGreen,
								},
							]}
						>
							<Text
								style={[
									styles.orgAvatarText,
									{
										fontSize: metrics.fontMedium,
										color: colors.primaryGreen,
									},
								]}
							>
								{campaign.orgName?.charAt(0).toUpperCase() || "?"}
							</Text>
						</View>
					)}
					<View
						style={[
							styles.orgMetaWrap,
							{
								marginLeft: metrics.spacingSmall,
							},
						]}
					>
						<View
							style={[
								styles.orgNameRow,
								{
									gap: metrics.spacingSmall,
								},
							]}
						>
							<Text
								style={[
									styles.orgName,
									{ color: colors.text, fontSize: metrics.fontMedium },
								]}
								numberOfLines={1}
							>
								{campaign.orgName}
							</Text>
							{campaign.isOrgVerified ? (
								<CircleCheck
									size={metrics.fontLarge}
									color={colors.primaryGreen}
								/>
							) : (
								<XCircle size={metrics.fontLarge} color={colors.primaryRed} />
							)}
						</View>
						<Text
							style={[
								styles.memberSince,
								{
									color: colors.primaryGray,
									fontSize: metrics.fontSmall,
									marginTop: metrics.spacingExtraSmall,
								},
							]}
						>
							Member since {campaign.orgMemberSinceYear}
						</Text>
					</View>
				</View>

				<View
					style={[
						styles.orgStats,
						{
							marginTop: metrics.spacingSmall,
							paddingVertical: metrics.spacingSmall,
							gap: metrics.spacingMedium,
						},
					]}
				>
					<View
						style={[
							styles.orgStatColumn,
							{
								backgroundColor: colors.secondaryGray,
								borderRadius: metrics.borderRadiusLarge,
								paddingVertical: metrics.spacingSmall,
							},
						]}
					>
						<Text
							style={[
								styles.orgStatPrimary,
								{ color: colors.text, fontSize: metrics.fontExtraLarge },
							]}
						>
							{campaign.orgRating.toFixed(1)}
						</Text>
						<View
							style={{
								flexDirection: "row",
								marginTop: metrics.spacingExtraSmall,
							}}
						>
							{Array.from({ length: totalStars }).map((_, index) => {
								const fillColor =
									index < Math.floor(rating)
										? colors.primaryGold
										: colors.primaryGray;
								return (
									<Star
										key={index}
										size={metrics.iconSmall}
										color={fillColor}
										fill={fillColor}
									/>
								);
							})}
						</View>
						<Text
							style={[
								styles.orgStatSecondary,
								{
									color: colors.primaryGray,
									marginTop: metrics.spacingExtraSmall,
									fontSize: metrics.fontExtraSmall,
								},
							]}
						>
							{campaign.orgReviewsCount} reviews
						</Text>
					</View>
					<View
						style={[
							styles.orgStatColumn,
							{
								backgroundColor: colors.secondaryGray,
								borderRadius: metrics.borderRadiusLarge,
								paddingVertical: metrics.spacingSmall,
							},
						]}
					>
						<Text
							style={[
								styles.orgStatPrimary,
								{
									color: colors.text,
									fontSize: metrics.fontExtraLarge,
									paddingVertical: metrics.spacingExtraSmall,
								},
							]}
						>
							{campaign.orgCampaignsCompleted}
						</Text>
						<Text
							style={[
								styles.orgStatSecondary,
								{
									color: colors.primaryGray,
									fontSize: metrics.fontExtraSmall,
									paddingVertical: metrics.spacingExtraSmall,
								},
							]}
						>
							completed
						</Text>
					</View>
					<View
						style={[
							styles.orgStatColumn,
							{
								backgroundColor: colors.secondaryGray,
								borderRadius: metrics.borderRadiusLarge,
								paddingVertical: metrics.spacingSmall,
							},
						]}
					>
						<Check
							size={metrics.iconLarge}
							color={
								campaign.isOrgVerified ? colors.primaryGreen : colors.primaryRed
							}
						/>
						<Text
							style={[
								styles.orgStatSecondary,
								{
									color: colors.primaryGray,
									fontSize: metrics.fontExtraSmall,
									paddingTop: metrics.spacingExtraSmall,
								},
							]}
						>
							{campaign.isOrgVerified ? "verified" : "not verified"}
						</Text>
					</View>
				</View>

				<View
					style={{
						backgroundColor: colors.secondaryGray,
						marginTop: metrics.spacingSmall,
						borderRadius: metrics.borderRadiusMedium,
						padding: metrics.spacingMedium,
					}}
				>
					<Text
						style={[
							styles.licenseLabel,
							{ color: colors.primaryGray, fontSize: metrics.fontSmall },
						]}
					>
						LICENSE NUMBER
					</Text>
					<Text
						style={[
							styles.licenseValue,
							{
								color: colors.text,
								fontSize: metrics.fontSmall,
								marginTop: metrics.spacingExtraSmall,
							},
						]}
					>
						{campaign.orgLicenseNumber}
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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
		fontWeight: "700",
	},
	orgRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	orgAvatarFallback: {
		justifyContent: "center",
		alignItems: "center",
	},
	orgAvatarText: {
		fontWeight: "bold",
	},
	orgMetaWrap: {
		flex: 1,
	},
	orgNameRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	orgName: {
		fontWeight: "700",
	},
	memberSince: {
		fontWeight: "500",
	},
	orgStats: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	orgStatColumn: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	orgStatPrimary: {
		fontWeight: "700",
	},
	orgStatSecondary: {
		fontWeight: "500",
	},
	licenseLabel: {
		fontWeight: "600",
	},
	licenseValue: {
		fontWeight: "500",
	},
});
