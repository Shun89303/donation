import type { ThemeColors } from "@/app/_theme";
import { getCampaignById } from "@/components/home/campaignMockData";
import type {
	CampaignPost,
	DonorCommentItem,
} from "@/components/home/campaignTypes";
import {
	isCampaignSaved,
	toggleCampaignSaved,
} from "@/components/profile/profileData";
import { useTheme } from "@/hooks/useTheme";
import { getOrdinal, sumExpenseAmount } from "@/utils/campaignDetailsUtils";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Share } from "react-native";

export type UseCampaignDetailsReturn = {
	campaign: CampaignPost | undefined;
	colors: ThemeColors;
	isSaved: boolean;
	onPressSave: () => void;
	onPressShare: () => Promise<void>;
	neededAmount: number;
	totalSpentLabel: string;
	visibleGalleryImages: string[];
	comments: DonorCommentItem[];
	commentInput: string;
	setCommentInput: (text: string) => void;
	onPressSendComment: () => void;
	isGalleryOpen: boolean;
	toggleGallery: () => void;
	isUpdatesOpen: boolean;
	toggleUpdates: () => void;
	isExpenseOpen: boolean;
	toggleExpense: () => void;
	isProofOpen: boolean;
	toggleProof: () => void;
	isAgencyOpen: boolean;
	toggleAgency: () => void;
	isCommentsOpen: boolean;
	toggleComments: () => void;
	donorsOrdinal: string;
};

export function useCampaignDetails() {
	const { campaignId } = useLocalSearchParams<{ campaignId: string }>();
	const colors = useTheme();

	const campaign = useMemo(
		() => getCampaignById(campaignId ?? "") as CampaignPost | undefined,
		[campaignId],
	);

	const [isSaved, setIsSaved] = useState(false);
	const [comments, setComments] = useState<DonorCommentItem[]>([]);
	const [commentInput, setCommentInput] = useState("");
	const [isGalleryOpen, setIsGalleryOpen] = useState(false);
	const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);
	const [isExpenseOpen, setIsExpenseOpen] = useState(false);
	const [isProofOpen, setIsProofOpen] = useState(false);
	const [isAgencyOpen, setIsAgencyOpen] = useState(true);
	const [isCommentsOpen, setIsCommentsOpen] = useState(true);

	useEffect(() => {
		if (!campaign) return;

		setIsSaved(isCampaignSaved(campaign.id));
		setComments(campaign.donorComments);
		setCommentInput("");
		setIsGalleryOpen(campaign.galleryImageUris.length > 0);
		setIsUpdatesOpen(campaign.updates.length > 0);
		setIsExpenseOpen(campaign.expenseReport.length > 0);
		setIsProofOpen(campaign.proofs.length > 0);
		setIsAgencyOpen(true);
		setIsCommentsOpen(true);
	}, [campaign]);

	const neededAmount = Math.max(
		campaign?.goalAmountMmk
			? campaign.goalAmountMmk - campaign.raisedAmountMmk
			: 0,
		0,
	);

	const totalSpentLabel = campaign?.expenseReport
		? `${campaign.expenseReport
				.reduce((sum, item) => sum + sumExpenseAmount(item.amountLabel), 0)
				.toLocaleString("en-US")} MMK`
		: "0 MMK";

	const visibleGalleryImages = campaign?.galleryImageUris.slice(0, 4) || [];

	const onPressSave = () => {
		if (!campaign) return;
		const nextSavedState = toggleCampaignSaved(campaign.id);
		setIsSaved(nextSavedState);
	};

	const onPressShare = async () => {
		if (!campaign) return;
		await Share.share({
			title: campaign.title,
			message: `${campaign.title}\n${campaign.locationLabel}\nSupport now: /campaign/${campaign.id}`,
		});
	};

	const onPressSendComment = () => {
		const trimmed = commentInput.trim();
		if (!trimmed || !campaign) return;

		const newComment: DonorCommentItem = {
			id: `comment-local-${Date.now()}`,
			author: "You",
			authorAvatarUri: campaign.orgProfileImageUri,
			createdAtIso: new Date().toISOString(),
			message: trimmed,
			likeCount: 0,
		};

		setComments((previous) => [newComment, ...previous]);
		setCommentInput("");
	};

	const toggleGallery = () => setIsGalleryOpen((prev) => !prev);
	const toggleUpdates = () => setIsUpdatesOpen((prev) => !prev);
	const toggleExpense = () => setIsExpenseOpen((prev) => !prev);
	const toggleProof = () => setIsProofOpen((prev) => !prev);
	const toggleAgency = () => setIsAgencyOpen((prev) => !prev);
	const toggleComments = () => setIsCommentsOpen((prev) => !prev);

	const donorsOrdinal = campaign ? getOrdinal(campaign.donors + 1) : "";

	return {
		campaign,
		colors,
		isSaved,
		onPressSave,
		onPressShare,
		neededAmount,
		totalSpentLabel,
		visibleGalleryImages,
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
		donorsOrdinal,
	};
}
