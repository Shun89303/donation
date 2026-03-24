import { CampaignDetailsNotFound } from "@/components/campaign/CampaignDetailsNotFound";
import { CampaignSummaryBlock } from "@/components/campaign/CampaignSummaryBlock";
import { CommentsSection } from "@/components/campaign/CommentsSection";
import { ExpenseSection } from "@/components/campaign/ExpenseSection";
import { FooterSection } from "@/components/campaign/FooterSection";
import { GallerySection } from "@/components/campaign/GallerySection";
import { OrgSection } from "@/components/campaign/OrgSection";
import { ProofsSection } from "@/components/campaign/ProofsSection";
import { TopHeaderRow } from "@/components/campaign/TopHeaderRow";
import { UpdatesSection } from "@/components/campaign/UpdatesSection";
import { useCampaignDetails } from "@/hooks/useCampaignDetails";
import useTablet from "@/hooks/useTablet";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CampaignDetailsPage() {
	const isTablet = useTablet();

	const {
		campaign,
		colors,
		isSaved,
		onPressSave,
		onPressShare,
		comments,
		commentInput,
		setCommentInput,
		onPressSendComment,
		isGalleryOpen,
		toggleGallery,
		isUpdatesOpen,
		toggleUpdates,
		isExpenseOpen,
		toggleExpense,
		isProofOpen,
		toggleProof,
		isAgencyOpen,
		toggleAgency,
		isCommentsOpen,
		toggleComments,
		neededAmount,
		totalSpentLabel,
		visibleGalleryImages,
		extraGalleryCount,
		donorsOrdinal,
	} = useCampaignDetails();

	const router = useRouter();

	if (!campaign) {
		return <CampaignDetailsNotFound />;
	}

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<StatusBar style="light" />
			<Image
				source={{ uri: campaign.imageUri }}
				style={[
					styles.banner,
					{
						height: isTablet ? 450 : 250,
					},
				]}
			/>

			<TopHeaderRow
				colors={colors}
				daysLeft={campaign.daysLeft}
				isUrgent={campaign.isUrgent}
				isSaved={isSaved}
				onPressBack={() => router.back()}
				onPressSave={onPressSave}
				onPressShare={onPressShare}
			/>

			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				<CampaignSummaryBlock colors={colors} campaign={campaign} />

				<GallerySection
					colors={colors}
					galleryImageUris={campaign.galleryImageUris}
					visibleGalleryImages={visibleGalleryImages}
					extraGalleryCount={extraGalleryCount}
					isOpen={isGalleryOpen}
					onToggle={toggleGallery}
					onShowAll={() => {}}
				/>

				<UpdatesSection
					colors={colors}
					updates={campaign.updates}
					isOpen={isUpdatesOpen}
					onToggle={toggleUpdates}
				/>

				<ExpenseSection
					colors={colors}
					expenseReport={campaign.expenseReport}
					totalSpentLabel={totalSpentLabel}
					isOpen={isExpenseOpen}
					onToggle={toggleExpense}
				/>

				<ProofsSection
					colors={colors}
					proofs={campaign.proofs}
					isOpen={isProofOpen}
					onToggle={toggleProof}
				/>

				<OrgSection
					colors={colors}
					campaign={campaign}
					isOpen={isAgencyOpen}
					onToggle={toggleAgency}
				/>

				<CommentsSection
					colors={colors}
					comments={comments}
					commentInput={commentInput}
					onChangeCommentInput={setCommentInput}
					onSendComment={onPressSendComment}
					isOpen={isCommentsOpen}
					onToggle={toggleComments}
				/>
			</ScrollView>

			<FooterSection
				colors={colors}
				campaign={campaign}
				neededAmount={neededAmount}
				donorsOrdinal={donorsOrdinal}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
	},
	content: {
		paddingHorizontal: 16,
		paddingTop: 100,
		paddingBottom: 112,
	},
	banner: {
		position: "absolute",
		maxWidth: "100%",
		top: 0,
		left: 0,
		right: 0,
		objectFit: "cover",
	},
});
