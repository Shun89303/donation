import type { ThemeColors } from "@/app/_theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image, StyleSheet, Text, View } from "react-native";
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
	const safeDonationCount = toCount(profile.donationCount);
	const safeSavedCount = toCount(profile.savedCount);
	const safeMmkGiven = formatMmk(profile.totalMmkGiven);
	const showProfileImage = Boolean(profile.profileImageUri);
	const initials = getInitials(profile.name);

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
					backgroundColor: colors.profileCardBackground,
					borderColor: colors.profileBorder,
				},
			]}
		>
			<View style={styles.profileRow}>
				{showProfileImage ? (
					<Image
						source={{ uri: profile.profileImageUri }}
						style={[styles.avatar, { borderColor: colors.profileBorder }]}
					/>
				) : (
					<View
						style={[
							styles.avatar,
							styles.avatarFallback,
							{
								borderColor: colors.profileBorder,
								backgroundColor: colors.profileAccentSoft,
							},
						]}
					>
						<Text style={[styles.avatarInitials, { color: colors.profileAccent }]}>
							{initials}
						</Text>
					</View>
				)}
				<View style={styles.profileInfo}>
					<Text style={[styles.userName, { color: colors.text }]}>{profile.name}</Text>
					{profile.isVerified !== false ? (
						<View style={styles.verifiedRow}>
							<MaterialCommunityIcons
								name="check-decagram"
								size={14}
								color={colors.profileAccent}
							/>
							<Text style={[styles.verifiedText, { color: colors.profileAccent }]}>
								Verified Donor
							</Text>
						</View>
					) : null}
				</View>
			</View>

			<View style={[styles.statsRow, { borderColor: colors.profileBorder }]}>
				{profileStats.map((item) => (
					<View key={item.label} style={styles.statColumn}>
						<Text style={[styles.statValue, { color: colors.text }]}>{item.value}</Text>
						<Text style={[styles.statLabel, { color: colors.profileLabel }]}>
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
		borderRadius: 18,
		borderWidth: 1,
		padding: 14,
	},
	profileRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	avatar: {
		width: 64,
		height: 64,
		borderRadius: 16,
		borderWidth: 1,
	},
	avatarFallback: {
		alignItems: "center",
		justifyContent: "center",
	},
	avatarInitials: {
		fontSize: 20,
		fontWeight: "700",
		letterSpacing: 0.4,
	},
	profileInfo: {
		flex: 1,
		gap: 6,
	},
	userName: {
		fontSize: 20,
		fontWeight: "700",
	},
	verifiedRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	verifiedText: {
		fontSize: 13,
		fontWeight: "600",
	},
	statsRow: {
		marginTop: 14,
		paddingTop: 12,
		borderTopWidth: 1,
		flexDirection: "row",
	},
	statColumn: {
		flex: 1,
		alignItems: "center",
		gap: 3,
	},
	statValue: {
		fontSize: 18,
		fontWeight: "700",
	},
	statLabel: {
		fontSize: 12,
		fontWeight: "500",
	},
});
