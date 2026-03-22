import type { ThemeColors } from "@/app/_theme";
import { FlashList, type FlashListRef } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import type { RefObject } from "react";
import { StyleSheet, Text, View } from "react-native";
import CampaignCard from "./campaignFeed/CampaignCard";
import type { CampaignPost } from "./campaignTypes";

type CampaignFeedProps = {
	colors: ThemeColors;
	posts: CampaignPost[];
	feedListRef: RefObject<FlashListRef<CampaignPost> | null>;
	extraData?: unknown;
};

export default function CampaignFeed({
	colors,
	posts,
	feedListRef,
	extraData,
}: CampaignFeedProps) {
	const router = useRouter();

	return (
		<FlashList
			ref={feedListRef}
			data={posts}
			extraData={extraData}
			keyExtractor={(item) => item.id}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.feedContent}
			ListEmptyComponent={
				<View
					style={[
						styles.emptyCard,
						{
							backgroundColor: colors.background,
							borderColor: colors.tabInactive,
						},
					]}
				>
					<Text style={[styles.emptyTitle, { color: colors.text }]}>
						No active campaigns
					</Text>
					<Text
						style={[styles.emptySubtitle, { color: colors.placeholderMuted }]}
					>
						This organization has no campaigns right now
					</Text>
				</View>
			}
			renderItem={({ item }) => (
				<CampaignCard
					item={item}
					colors={colors}
					onPressCard={() => router.push(`/campaign/${item.id}`)}
					onPressSupport={() => router.push(`/campaign/${item.id}/donate`)}
				/>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	feedContent: {
		paddingBottom: 24,
		flexGrow: 1,
	},
	emptyCard: {
		marginTop: 14,
		borderWidth: 0.4,
		borderRadius: 14,
		paddingVertical: 24,
		paddingHorizontal: 18,
		alignItems: "center",
	},
	emptyTitle: {
		marginTop: 10,
		fontSize: 18,
		fontWeight: "700",
	},
	emptySubtitle: {
		marginTop: 6,
		fontSize: 13,
		fontWeight: "500",
		textAlign: "center",
	},
});
