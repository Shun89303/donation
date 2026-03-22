import type { FilterKey } from "./campaignFilterConfig";
import type { OrganizationKey } from "./organizationConfig";

export type CampaignUpdateItem = {
	id: string;
	dateLabel: string;
	message: string;
};

export type CampaignExpenseItem = {
	id: string;
	dateLabel: string;
	title: string;
	amountLabel: string;
};

export type CampaignProofItem = {
	id: string;
	type: "photo" | "video" | "document";
	about: string;
	dateIso: string;
	thumbnailUri?: string;
};

export type DonorCommentItem = {
	id: string;
	author: string;
	authorAvatarUri: string;
	createdAtIso: string;
	message: string;
	likeCount: number;
};

export type CampaignPost = {
	id: string;
	orgKey: OrganizationKey;
	orgName: string;
	category: Exclude<FilterKey, "All">;
	title: string;
	imageUri: string;
	raisedLabel: string;
	goalLabel: string;
	raisedAmountMmk: number;
	goalAmountMmk: number;
	progress: number;
	donors: number;
	timeLeftLabel: string;
	daysLeft: number;
	locationLabel: string;
	initiatedAt: string;
	aboutText: string;
	galleryImageUris: string[];
	updates: CampaignUpdateItem[];
	expenseReport: CampaignExpenseItem[];
	proofs: CampaignProofItem[];
	donorComments: DonorCommentItem[];
	orgProfileImageUri: string;
	orgRating: number;
	orgReviewsCount: number;
	orgMemberSinceYear: number;
	orgCampaignsCompleted: number;
	orgLicenseNumber: string;
	isOrgVerified: boolean;
	impactType: "families" | "education" | "none";
	familiesHelped?: number;
	familiesTarget?: number;
	educationSchools?: number;
	educationStudents?: number;
	isUrgent: boolean;
};
