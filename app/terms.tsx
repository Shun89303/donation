import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Terms() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<ArrowLeftIcon size={20} color="black" onPress={() => router.back()} />
				<Text style={styles.title}>Terms and Conditions</Text>

				<Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
				<Text style={styles.text}>
					By creating an account or registering an organization on DanaLink, you
					agree to be bound by these Terms and Conditions. If you do not agree,
					please do not use our services.
				</Text>

				<Text style={styles.sectionTitle}>2. User Accounts</Text>
				<Text style={styles.text}>
					You are responsible for maintaining the confidentiality of your
					account credentials. You agree to provide accurate and complete
					information during registration and to keep your profile up to date.
				</Text>

				<Text style={styles.sectionTitle}>3. Donations</Text>
				<Text style={styles.text}>
					All donations made through DanaLink are voluntary. We facilitate the
					transfer of funds to verified organizations but are not responsible
					for how funds are ultimately used by recipient organizations. We
					encourage transparency through our proof-of-delivery and expense
					reporting features.
				</Text>

				<Text style={styles.sectionTitle}>
					4. Organization Responsibilities
				</Text>
				<Text style={styles.text}>
					Organizations registered on DanaLink must provide accurate
					information, maintain transparency in fund usage, and comply with all
					applicable laws. Organizations must submit regular updates and proof
					of how donated funds are used.
				</Text>

				<Text style={styles.sectionTitle}>5. Content Guidelines</Text>
				<Text style={styles.text}>
					Users and creators must not post misleading, fraudulent, or harmful
					content. DanaLink reserves the right to remove content and ban users
					who violate these guidelines.
				</Text>

				<Text style={styles.sectionTitle}>6. Privacy</Text>
				<Text style={styles.text}>
					We collect and process personal data in accordance with our Privacy
					Policy. Your data is used to provide and improve our services, and is
					never sold to third parties.
				</Text>

				<Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
				<Text style={styles.text}>
					DanaLink provides the platform &quot;as is&quot; and does not
					guarantee uninterrupted service. We are not liable for any indirect,
					incidental, or consequential damages arising from the use of our
					platform.
				</Text>

				<Text style={styles.sectionTitle}>8. Changes to Terms</Text>
				<Text style={styles.text}>
					We may update these Terms from time to time. Continued use of the
					platform after changes constitutes acceptance of the updated Terms.
				</Text>

				<Text style={styles.lastUpdated}>Last updated: March 25, 2026</Text>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	scrollContent: {
		paddingBottom: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginTop: 16,
		marginBottom: 8,
	},
	text: {
		fontSize: 16,
		lineHeight: 22,
	},
	lastUpdated: {
		fontSize: 14,
		color: "#666",
		marginTop: 20,
		textAlign: "center",
	},
});
