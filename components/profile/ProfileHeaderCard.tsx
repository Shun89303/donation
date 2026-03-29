import type { ThemeColors } from "@/app/_theme";
import globalStyles from "@/styles/styles";
import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import { CircleCheck, Pencil } from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import AnimatedPressable from "../common/AnimatedPressable";
import { formatMmk, getInitials, toCount } from "./profileUtils";
import type { UserProfile } from "./types";

type ProfileHeaderCardProps = {
	colors: ThemeColors;
	profile: UserProfile;
};

export default function ProfileHeaderCard({
	colors,
	profile,
}: ProfileHeaderCardProps) {
	const safeDonationCount = toCount(profile.donationCount || 3);
	const safeSavedCount = toCount(profile.savedCount);
	const safeMmkGiven = formatMmk(profile.totalMmkGiven || 3500000);
	const showProfileImage = Boolean(profile.profileImageUri);
	const initials = getInitials(profile.name || "Maung Chan Aye");

	const router = useRouter();

	const profileStats = [
		{ label: "Donations", value: `${safeDonationCount}` },
		{ label: "MMK Given", value: `${safeMmkGiven}` },
		{ label: "Saved", value: `${safeSavedCount}` },
	];

	return (
		<View
			style={[
				styles.card,
				{
					backgroundColor: colors.background,
					borderColor: colors.secondaryGray,
					...globalStyles.shadows,
				},
			]}
		>
			<View style={styles.profileRow}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: metrics.spacingMedium,
					}}
				>
					{showProfileImage ? (
						<Image
							source={{
								uri: profile.profileImageUri,
							}}
							style={[styles.avatar]}
						/>
					) : (
						<View
							style={[
								styles.avatar,
								styles.avatarFallback,
								{
									backgroundColor: colors.secondaryGreen,
								},
							]}
						>
							<Text
								style={[styles.avatarInitials, { color: colors.primaryGreen }]}
							>
								{initials}
							</Text>
						</View>
					)}
					<View style={styles.profileInfo}>
						<Text style={[styles.userName, { color: colors.text }]}>
							{profile.name || "Maung Chan Aye"}
						</Text>
						{profile.isVerified !== false ? (
							<View style={styles.verifiedRow}>
								<CircleCheck
									size={metrics.iconMedium}
									color={colors.primaryGreen}
								/>
								<Text
									style={[styles.verifiedText, { color: colors.primaryGreen }]}
								>
									Verified Donor
								</Text>
							</View>
						) : (
							<View style={styles.verifiedRow}>
								<CircleCheck
									size={metrics.iconMedium}
									color={colors.primaryRed}
								/>
								<Text
									style={[styles.verifiedText, { color: colors.primaryRed }]}
								>
									Not Verified
								</Text>
							</View>
						)}
					</View>
					<AnimatedPressable
						style={{
							alignItems: "center",
							backgroundColor: colors.secondaryGray,
							padding: metrics.spacingSmall,
							borderRadius: metrics.borderRadiusMedium,
						}}
						onPress={() => router.push("/editProfile")}
					>
						<Pencil size={metrics.iconMediumLarge} color={colors.primaryGray} />
					</AnimatedPressable>
				</View>
			</View>

			<View style={[styles.statsRow, { borderColor: colors.secondaryGray }]}>
				{profileStats.map((item) => (
					<View key={item.label} style={styles.statColumn}>
						<Text style={[styles.statValue, { color: colors.text }]}>
							{item.value}
						</Text>
						<Text style={[styles.statLabel, { color: colors.primaryGray }]}>
							{item.label}
						</Text>
					</View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: metrics.borderRadiusLarge,
		borderWidth: 1,
		padding: metrics.spacingMedium,
	},
	profileRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: metrics.spacingLarge,
	},
	avatar: {
		width: metrics.avatarLarge,
		height: metrics.avatarLarge,
		borderRadius: metrics.borderRadiusLarge,
	},
	avatarFallback: {
		alignItems: "center",
		justifyContent: "center",
	},
	avatarInitials: {
		fontSize: metrics.fontExtraLarge,
		fontWeight: "700",
		letterSpacing: metrics.letterSpacing.normal,
	},
	profileInfo: {
		flex: 1,
		gap: metrics.spacingExtraSmall,
	},
	userName: {
		fontSize: metrics.fontExtraLarge,
		fontWeight: "700",
	},
	verifiedRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: metrics.spacingExtraSmall,
	},
	verifiedText: {
		fontSize: metrics.fontSmall,
		fontWeight: "500",
	},
	statsRow: {
		marginTop: metrics.spacingMedium,
		paddingTop: metrics.spacingMedium,
		borderTopWidth: 1,
		flexDirection: "row",
	},
	statColumn: {
		flex: 1,
		alignItems: "center",
		gap: metrics.spacingExtraSmall,
	},
	statValue: {
		fontSize: metrics.fontLarge,
		fontWeight: "700",
	},
	statLabel: {
		fontSize: metrics.fontSmall,
		fontWeight: "400",
	},
});
