import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Terms() {
	const router = useRouter();
	const colors = useTheme();

	return (
		<SafeAreaView
			style={[
				styles.container,
				{
					backgroundColor: colors.appBackground,
				},
			]}
		>
			{/* Sticky Header */}
			<View
				style={[
					styles.header,
					{
						paddingHorizontal: metrics.spacingMedium,
						paddingVertical: metrics.spacingMedium,
						borderBottomColor: colors.secondaryGray,
						marginBottom: metrics.spacingSmall,
						gap: metrics.spacingSmall,
					},
				]}
			>
				<View
					style={{
						backgroundColor: colors.secondaryGray,
						padding: metrics.spacingSmall,
						borderRadius: 999,
					}}
				>
					<ArrowLeftIcon
						size={metrics.iconMediumLarge}
						color={colors.text}
						onPress={() => router.back()}
					/>
				</View>
				<Text
					style={[
						styles.headerTitle,
						{
							fontSize: metrics.fontExtraLarge,
						},
					]}
				>
					Terms and Conditions
				</Text>
			</View>

			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: metrics.spacingLarge,
					gap: metrics.spacingSmall,
					paddingVertical: metrics.spacingMedium,
				}}
			>
				{/* Sections */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
					<Text
						style={[
							styles.text,
							{
								color: colors.text,
							},
						]}
					>
						By creating an account or registering an organization on DanaLink,
						you agree to be bound by these Terms and Conditions. If you do not
						agree, please do not use our services.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>2. User Accounts</Text>
					<Text
						style={[
							styles.text,
							{
								color: colors.text,
							},
						]}
					>
						You are responsible for maintaining the confidentiality of your
						account credentials. You agree to provide accurate and complete
						information during registration and to keep your profile up to date.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>3. Donations</Text>
					<Text
						style={[
							styles.text,
							{
								color: colors.text,
							},
						]}
					>
						All donations made through DanaLink are voluntary. We facilitate the
						transfer of funds to verified organizations but are not responsible
						for how funds are ultimately used by recipient organizations. We
						encourage transparency through our proof-of-delivery and expense
						reporting features.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						4. Organization Responsibilities
					</Text>
					<Text
						style={[
							styles.text,
							{
								color: colors.text,
							},
						]}
					>
						Organizations registered on DanaLink must provide accurate
						information, maintain transparency in fund usage, and comply with
						all applicable laws. Organizations must submit regular updates and
						proof of how donated funds are used.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>5. Content Guidelines</Text>
					<Text
						style={[
							styles.text,
							{
								color: colors.text,
							},
						]}
					>
						Users and creators must not post misleading, fraudulent, or harmful
						content. DanaLink reserves the right to remove content and ban users
						who violate these guidelines.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>6. Privacy</Text>
					<Text
						style={[
							styles.text,
							{
								color: colors.text,
							},
						]}
					>
						We collect and process personal data in accordance with our Privacy
						Policy. Your data is used to provide and improve our services, and
						is never sold to third parties.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
					<Text
						style={[
							styles.text,
							{
								color: colors.text,
							},
						]}
					>
						DanaLink provides the platform &quot;as is&quot; and does not
						guarantee uninterrupted service. We are not liable for any indirect,
						incidental, or consequential damages arising from the use of our
						platform.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>8. Changes to Terms</Text>
					<Text
						style={[
							styles.text,
							{
								color: colors.text,
							},
						]}
					>
						We may update these Terms from time to time. Continued use of the
						platform after changes constitutes acceptance of the updated Terms.
					</Text>
				</View>

				<View style={{ borderTopWidth: 1, borderColor: colors.secondaryGray }}>
					<Text
						style={[
							styles.lastUpdated,
							{
								color: colors.primaryGray,
							},
						]}
					>
						Last updated: March 25, 2026
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	/* Sticky Header */
	header: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		position: "sticky", // works in web, in RN SafeAreaView ensures it stays
		zIndex: 10,
		borderBottomWidth: 1,
	},
	headerTitle: {
		fontWeight: "700",
	},

	section: {
		marginBottom: metrics.spacingLarge,
	},

	sectionTitle: {
		fontSize: metrics.fontLarge,
		fontWeight: "700",
		marginBottom: metrics.spacingMedium,
	},

	text: {
		fontSize: metrics.fontMedium,
		fontWeight: "400",
		lineHeight: metrics.lineHeightLarge,
	},

	lastUpdated: {
		fontSize: metrics.fontSmall,
		fontWeight: "400",
		marginTop: metrics.spacingSmall,
	},
});
