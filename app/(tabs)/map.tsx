import FadeScreen from "@/components/common/FadeScreen";
import { useTheme } from "@/hooks/useTheme";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

type Campaign = {
	id: string;
	title: string;
	latitude: number;
	longitude: number;
	category: string;
	targetAmount: number;
	raisedAmount: number;
};

const campaigns: Campaign[] = [
	{
		id: "1",
		title: "Flood Relief - Yangon",
		latitude: 16.8661,
		longitude: 96.1951,
		category: "Emergency",
		targetAmount: 5000,
		raisedAmount: 2100,
	},
	{
		id: "2",
		title: "School Supplies Drive - Mandalay",
		latitude: 21.9588,
		longitude: 96.0891,
		category: "Education",
		targetAmount: 2000,
		raisedAmount: 950,
	},
	{
		id: "3",
		title: "Clinic Support - Naypyidaw",
		latitude: 19.7633,
		longitude: 96.0785,
		category: "Medical",
		targetAmount: 3500,
		raisedAmount: 1200,
	},
	{
		id: "4",
		title: "Food Aid - Mawlamyine",
		latitude: 16.4905,
		longitude: 97.6283,
		category: "Food",
		targetAmount: 1800,
		raisedAmount: 640,
	},
];

export default function Map() {
	const colors = useTheme();

	const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
		null,
	);

	const initialRegion: Region = useMemo(
		() => ({
			latitude: 19.7633,
			longitude: 96.0785,
			latitudeDelta: 8,
			longitudeDelta: 8,
		}),
		[],
	);

	return (
		<FadeScreen>
			<SafeAreaView
				style={[styles.safeArea, { backgroundColor: colors.background }]}
			>
				<View style={styles.container}>
					<View style={styles.textSection}>
						<Text style={[styles.title, { color: colors.text }]}>
							Map of Needs
						</Text>
						<Text style={[styles.subtitle, { color: colors.text }]}>
							Tap a location to see campaigns
						</Text>
					</View>

					<View style={styles.mapWrapper}>
						<MapView
							style={styles.map}
							initialRegion={initialRegion}
							onPress={() => setSelectedCampaign(null)}
						>
							{campaigns.map((campaign) => (
								<Marker
									key={campaign.id}
									coordinate={{
										latitude: campaign.latitude,
										longitude: campaign.longitude,
									}}
									title={campaign.title}
									description={campaign.category}
									onPress={() => setSelectedCampaign(campaign)}
								>
									<Callout onPress={() => setSelectedCampaign(campaign)}>
										<View style={styles.callout}>
											<Text style={styles.calloutTitle}>{campaign.title}</Text>
											<Text>{campaign.category}</Text>
											<Text>
												${campaign.raisedAmount} / ${campaign.targetAmount}
											</Text>
										</View>
									</Callout>
								</Marker>
							))}
						</MapView>
					</View>

					{selectedCampaign && (
						<Pressable
							style={[
								styles.bottomCard,
								{
									backgroundColor: colors.background,
								},
							]}
						>
							<Text style={[styles.cardTitle, { color: colors.text }]}>
								{selectedCampaign.title}
							</Text>
							<Text style={[styles.cardText, { color: colors.text }]}>
								{selectedCampaign.category}
							</Text>
							<Text style={[styles.cardText, { color: colors.text }]}>
								${selectedCampaign.raisedAmount} raised of $
								{selectedCampaign.targetAmount}
							</Text>
							<Text style={styles.cardLink}>View campaign</Text>
						</Pressable>
					)}
				</View>
			</SafeAreaView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	textSection: {
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
	},
	subtitle: {
		fontSize: 14,
		marginTop: 4,
		opacity: 0.7,
	},
	mapWrapper: {
		height: 420,
		borderRadius: 20,
		overflow: "hidden",
	},
	map: {
		width: "100%",
		height: "100%",
	},
	callout: {
		width: 180,
		padding: 4,
	},
	calloutTitle: {
		fontWeight: "700",
		marginBottom: 4,
	},
	bottomCard: {
		marginTop: 16,
		borderRadius: 18,
		padding: 16,
		shadowOpacity: 0.15,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 2 },
		elevation: 6,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: "700",
		marginBottom: 6,
	},
	cardText: {
		marginBottom: 4,
	},
	cardLink: {
		marginTop: 8,
		fontWeight: "700",
	},
});
