import FadeScreen from "@/components/common/FadeScreen";
import ProfileHeaderCard from "@/components/profile/ProfileHeaderCard";
import ProfileMetricsRow from "@/components/profile/ProfileMetricsRow";
import ProfileOrganizationCard from "@/components/profile/ProfileOrganizationCard";
import ProfileSettingsList from "@/components/profile/ProfileSettingsList";
import ProfileSignOutButton from "@/components/profile/ProfileSignOutButton";
import { useTheme } from "@/hooks/useTheme";
import { useUserStore } from "@/stores/userStore";
import { metrics } from "@/utils/metrics";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
	const colors = useTheme();
	const userProfile = useUserStore((s) => s.userProfile);

	return (
		<FadeScreen>
			<SafeAreaView
				style={[styles.safeArea, { backgroundColor: colors.appBackground }]}
			>
				<ScrollView
					contentContainerStyle={styles.content}
					showsVerticalScrollIndicator={false}
				>
					<ProfileHeaderCard colors={colors} profile={userProfile} />
					<ProfileOrganizationCard
						colors={colors}
						organizationName={
							userProfile.organizationName || "Myanmar Aid Foundation"
						}
					/>
					<ProfileMetricsRow
						colors={colors}
						donationCount={userProfile.donationCount || 3}
						savedCount={userProfile.savedCount}
					/>
					<ProfileSettingsList
						colors={colors}
						notificationCount={userProfile.notificationCount || 2}
						language={userProfile.language}
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
		paddingHorizontal: metrics.spacingMedium,
		paddingTop: metrics.spacingSmall,
		paddingBottom: metrics.spacingLarge,
		gap: metrics.spacingMedium,
	},
});
