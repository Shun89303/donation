import FadeScreen from "@/components/common/FadeScreen";
import ProfileHeaderCard from "@/components/profile/ProfileHeaderCard";
import ProfileMetricsRow from "@/components/profile/ProfileMetricsRow";
import ProfileOrganizationCard from "@/components/profile/ProfileOrganizationCard";
import ProfileSettingsList from "@/components/profile/ProfileSettingsList";
import ProfileSignOutButton from "@/components/profile/ProfileSignOutButton";
import { USER_PROFILE } from "@/components/profile/profileData";
import { useTheme } from "@/hooks/useTheme";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
	const colors = useTheme();

	return (
		<FadeScreen>
			<SafeAreaView
				style={[styles.safeArea, { backgroundColor: colors.background }]}
			>
				<ScrollView
					contentContainerStyle={styles.content}
					showsVerticalScrollIndicator={false}
				>
					<ProfileHeaderCard colors={colors} profile={USER_PROFILE} />
					<ProfileOrganizationCard
						colors={colors}
						organizationName={USER_PROFILE.organizationName}
					/>
					<ProfileMetricsRow
						colors={colors}
						donationCount={USER_PROFILE.donationCount}
						savedCount={USER_PROFILE.savedCount}
					/>
					<ProfileSettingsList
						colors={colors}
						notificationCount={USER_PROFILE.notificationCount}
						language={USER_PROFILE.language}
					/>
					<ProfileSignOutButton colors={colors} />
				</ScrollView>
			</SafeAreaView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	content: {
		paddingHorizontal: 16,
		paddingTop: 8,
		paddingBottom: 28,
		gap: 14,
	},
});
