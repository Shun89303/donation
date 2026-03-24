import type { ThemeColors } from "@/app/_theme";
import type { CampaignPost } from "@/components/home/campaignTypes";
import useTablet from "@/hooks/useTablet";
import { CircleCheck, Star, XCircle } from "lucide-react-native";
import {
	Image,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";

type OrgSummaryBlockProps = {
	colors: ThemeColors;
	campaign: CampaignPost;
};

export function OrgSummaryBlock({ colors, campaign }: OrgSummaryBlockProps) {
	const isTablet = useTablet();
	const { width: screenWidth } = useWindowDimensions();

	// Base scale factor relative to screen width
	const scale = isTablet ? screenWidth / 800 : screenWidth / 400;

	// Dynamic values
	const avatarSize = 48 * scale; // 48 for phone base, scaled up
	const avatarFontSize = 18 * scale;
	const orgNameFontSize = 15 * scale;
	const verifiedIconSize = 16 * scale;
	const ratingIconSize = 14 * scale;
	const ratingFontSize = 13 * scale;
	const gap = 6 * scale;
	const marginLeft = 10 * scale;
	const marginTopRating = 3 * scale;
	const ratingDotMargin = 3 * scale;

	return (
		<View style={styles.orgBlock}>
			{campaign.orgProfileImageUri ? (
				<Image
					source={{ uri: campaign.orgProfileImageUri }}
					style={{
						width: avatarSize,
						height: avatarSize,
						borderRadius: 99,
					}}
				/>
			) : (
				<View
					style={[
						styles.orgAvatarFallback,
						{
							backgroundColor: colors.secondaryGreen,
							width: avatarSize,
							height: avatarSize,
							borderRadius: 99,
						},
					]}
				>
					<Text
						style={[
							styles.orgAvatarFallbackText,
							{ color: colors.primaryGreen, fontSize: avatarFontSize },
						]}
					>
						{campaign.orgName?.trim()?.charAt(0)?.toUpperCase() || "O"}
					</Text>
				</View>
			)}

			<View style={[styles.orgMetaWrap, { marginLeft }]}>
				<View style={[styles.orgNameRow, { gap }]}>
					<Text
						style={[
							styles.orgName,
							{ color: colors.text, fontSize: orgNameFontSize },
						]}
						numberOfLines={1}
					>
						{campaign.orgName}
					</Text>
					{campaign.isOrgVerified ? (
						<CircleCheck size={verifiedIconSize} color={colors.primaryGreen} />
					) : (
						<XCircle size={verifiedIconSize} color={colors.primaryRed} />
					)}
				</View>

				<View style={[styles.ratingRow, { marginTop: marginTopRating }]}>
					<Star
						size={ratingIconSize}
						color={colors.primaryGold}
						fill={colors.primaryGold}
					/>
					<Text
						style={[
							styles.ratingText,
							{
								color: colors.primaryGray,
								fontSize: ratingFontSize,
								paddingLeft: gap,
							},
						]}
					>
						{campaign.orgRating.toFixed(1)}
					</Text>
					<Text
						style={[
							styles.ratingDot,
							{
								color: colors.primaryGray,
								marginHorizontal: ratingDotMargin,
								fontWeight: isTablet ? "900" : "200",
							},
						]}
					>
						•
					</Text>
					<Text
						style={[
							styles.ratingText,
							{ color: colors.primaryGray, fontSize: ratingFontSize },
						]}
					>
						{campaign.orgReviewsCount} reviews
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	orgBlock: {
		flexDirection: "row",
		alignItems: "center",
	},
	orgAvatarFallback: {
		alignItems: "center",
		justifyContent: "center",
	},
	orgAvatarFallbackText: {
		fontWeight: "800",
	},
	orgMetaWrap: {
		flex: 1,
	},
	orgNameRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	orgName: {
		fontWeight: "500",
		maxWidth: "90%",
	},
	ratingRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	ratingText: {
		fontWeight: "400",
	},
	ratingDot: {},
});
