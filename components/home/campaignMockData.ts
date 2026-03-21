import type {
	CampaignExpenseItem,
	CampaignPost,
	CampaignProofItem,
	CampaignUpdateItem,
	DonorCommentItem,
} from "./campaignTypes";
import type { FilterKey } from "./filterConfig";
import { ORGANIZATION_FILTERS } from "./organizationConfig";

const FEED_ORGS = ORGANIZATION_FILTERS.filter((org) => org.key !== "All");
const CAMPAIGN_CATEGORIES: Exclude<FilterKey, "All">[] = [
	"Orphan",
	"Disaster",
	"Nursing Home",
	"Urgent",
];

const TITLES = [
	"Flood Recovery for Ayeyarwady Villages",
	"Emergency Food Relief for Delta Families",
	"Urgent Medical Kits for Cyclone Shelters",
	"Clean Water Access for Rural Communities",
	"Safe Homes Rebuild for Monsoon Survivors",
	"School Supplies for Displaced Children",
];

const IMAGE_URIS = [
	"https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=1200&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1200&auto=format&fit=crop",
];

const ORG_PROFILE_IMAGE_URIS = [
	"https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&auto=format&fit=crop",
];

const GALLERY_URIS = [
	"https://images.unsplash.com/photo-1475776408506-9a5371e7a068?q=80&w=1200&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=1200&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1200&auto=format&fit=crop",
];

const LOCATION_LABELS = [
	"Sagaing Region, Myanmar",
	"Ayeyarwady Region, Myanmar",
	"Rakhine State, Myanmar",
	"Magway Region, Myanmar",
	"Bago Region, Myanmar",
];

function createUpdates(index: number): CampaignUpdateItem[] {
	return [
		{
			id: `update-${index + 1}-1`,
			dateLabel: "Mar 05 2026",
			message: "Delivered 30 food packages to Myaung township today.",
		},
		{
			id: `update-${index + 1}-2`,
			dateLabel: "Mar 12 2026",
			message: "Set up temporary shelters for 12 flood-affected families.",
		},
		{
			id: `update-${index + 1}-3`,
			dateLabel: "Mar 18 2026",
			message: "Medical volunteers provided first-aid kits and checkups.",
		},
	];
}

function createExpenseReport(index: number): CampaignExpenseItem[] {
	const values = [420000, 280000, 600000];
	return [
		{
			id: `expense-${index + 1}-1`,
			dateLabel: "Mar 07 2026",
			title: "Food package procurement",
			amountLabel: `${values[0].toLocaleString("en-US")} MMK`,
		},
		{
			id: `expense-${index + 1}-2`,
			dateLabel: "Mar 10 2026",
			title: "Transport and distribution",
			amountLabel: `${values[1].toLocaleString("en-US")} MMK`,
		},
		{
			id: `expense-${index + 1}-3`,
			dateLabel: "Mar 15 2026",
			title: "Emergency medical supplies",
			amountLabel: `${values[2].toLocaleString("en-US")} MMK`,
		},
	];
}

function createProofs(index: number): CampaignProofItem[] {
	return [
		{
			id: `proof-${index + 1}-1`,
			type: "photo",
			about: "Relief package handover at Myaung township.",
			dateIso: "2026-03-07T09:00:00.000Z",
			thumbnailUri: GALLERY_URIS[(index + 1) % GALLERY_URIS.length],
		},
		{
			id: `proof-${index + 1}-2`,
			type: "video",
			about: "Volunteer briefing before field deployment.",
			dateIso: "2026-03-10T08:00:00.000Z",
			thumbnailUri: GALLERY_URIS[(index + 2) % GALLERY_URIS.length],
		},
		{
			id: `proof-${index + 1}-3`,
			type: "document",
			about: "Warehouse invoices and signed transport receipts.",
			dateIso: "2026-03-12T06:00:00.000Z",
		},
		{
			id: `proof-${index + 1}-4`,
			type: "photo",
			about: "Completed temporary shelter setup for displaced families.",
			dateIso: "2026-03-15T10:00:00.000Z",
			thumbnailUri: GALLERY_URIS[(index + 3) % GALLERY_URIS.length],
		},
	];
}

function createDonorComments(index: number): DonorCommentItem[] {
	return [
		{
			id: `comment-${index + 1}-1`,
			author: "Aye Aye",
			authorAvatarUri:
				ORG_PROFILE_IMAGE_URIS[(index + 1) % ORG_PROFILE_IMAGE_URIS.length],
			createdAtIso: "2026-03-20T08:30:00.000Z",
			message:
				"Thank you for the transparent updates. Proud to support this effort.",
			likeCount: 12,
		},
		{
			id: `comment-${index + 1}-2`,
			author: "Ko Min",
			authorAvatarUri:
				ORG_PROFILE_IMAGE_URIS[(index + 2) % ORG_PROFILE_IMAGE_URIS.length],
			createdAtIso: "2026-03-20T12:10:00.000Z",
			message: "Please share the next update from the affected villages too.",
			likeCount: 5,
		},
	];
}

export const MOCK_CAMPAIGN_POSTS: CampaignPost[] = Array.from({
	length: 12,
}).map((_, index) => {
	const org = FEED_ORGS[index % FEED_ORGS.length];
	const category = CAMPAIGN_CATEGORIES[index % CAMPAIGN_CATEGORIES.length];
	const raisedInMillions = 2.4 + (index % 5) * 1.1;
	const goalInMillions = raisedInMillions + 4.8 + (index % 3) * 1.2;
	const impactType =
		index % 3 === 0 ? "families" : index % 3 === 1 ? "education" : "none";
	const familiesHelped = 28 + index * 7;
	const familiesTarget = 160 + (index % 4) * 40;
	const educationSchools = 1 + (index % 3);
	const educationStudents = 90 + (index % 5) * 30;
	const daysLeft = 3 + (index % 12);

	const raisedAmountMmk = Math.round(raisedInMillions * 1_000_000);
	const goalAmountMmk = Math.round(goalInMillions * 1_000_000);
	const galleryCount = 1 + (index % 6);

	return {
		id: `campaign-${index + 1}`,
		orgKey: org.key,
		orgName: org.label,
		category,
		title: TITLES[index % TITLES.length],
		imageUri: IMAGE_URIS[index % IMAGE_URIS.length],
		raisedLabel: `${raisedInMillions.toFixed(1)}M MMK`,
		goalLabel: `of ${goalInMillions.toFixed(1)}M MMK`,
		raisedAmountMmk,
		goalAmountMmk,
		progress: Math.min(raisedInMillions / goalInMillions, 1),
		donors: 120 + index * 14,
		timeLeftLabel: `${daysLeft}d left`,
		daysLeft,
		locationLabel: LOCATION_LABELS[index % LOCATION_LABELS.length],
		initiatedAt: `2026-03-${String(5 + (index % 15)).padStart(2, "0")}`,
		aboutText:
			"This campaign provides urgent humanitarian support including food, shelter, clean water, and recovery aid for affected communities. Every donation is tracked with verifiable field updates to ensure transparent impact.",
		galleryImageUris: Array.from({ length: galleryCount }).map(
			(_, galleryIndex) =>
				GALLERY_URIS[(index + galleryIndex) % GALLERY_URIS.length],
		),
		updates: createUpdates(index),
		expenseReport: createExpenseReport(index),
		proofs: createProofs(index),
		donorComments: createDonorComments(index),
		orgProfileImageUri:
			ORG_PROFILE_IMAGE_URIS[index % ORG_PROFILE_IMAGE_URIS.length],
		orgRating: 4.6 + (index % 4) * 0.1,
		orgReviewsCount: 120 + index * 9,
		orgMemberSinceYear: 2017 + (index % 5),
		orgCampaignsCompleted: 22 + index * 2,
		orgLicenseNumber: `MM-NGO-${String(10200 + index).padStart(5, "0")}`,
		isOrgVerified: index % 7 !== 0,
		impactType,
		familiesHelped: impactType === "families" ? familiesHelped : undefined,
		familiesTarget: impactType === "families" ? familiesTarget : undefined,
		educationSchools: impactType === "education" ? educationSchools : undefined,
		educationStudents:
			impactType === "education" ? educationStudents : undefined,
		isUrgent: category === "Urgent",
	};
});

export function getCampaignById(campaignId: string) {
	return MOCK_CAMPAIGN_POSTS.find((campaign) => campaign.id === campaignId);
}
