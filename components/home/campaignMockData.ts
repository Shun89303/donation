import type { FilterKey } from "./filterConfig";
import { ORGANIZATION_FILTERS } from "./organizationConfig";
import type { CampaignPost } from "./campaignTypes";

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
	"https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1200&auto=format&fit=crop",
];

export const MOCK_CAMPAIGN_POSTS: CampaignPost[] = Array.from({
	length: 12,
}).map((_, index) => {
	const org = FEED_ORGS[index % FEED_ORGS.length];
	const category = CAMPAIGN_CATEGORIES[index % CAMPAIGN_CATEGORIES.length];
	const raised = 2.4 + (index % 5) * 1.1;
	const goal = raised + 4.8 + (index % 3) * 1.2;
	const impactType =
		index % 3 === 0 ? "families" : index % 3 === 1 ? "education" : "none";

	const familiesHelped = 28 + index * 7;
	const familiesTarget = 160 + (index % 4) * 40;
	const educationSchools = 1 + (index % 3);
	const educationStudents = 90 + (index % 5) * 30;

	return {
		id: `campaign-${index + 1}`,
		orgKey: org.key,
		orgName: org.label,
		category,
		title: TITLES[index % TITLES.length],
		imageUri: IMAGE_URIS[index % IMAGE_URIS.length],
		raisedLabel: `${raised.toFixed(1)}M MMK`,
		goalLabel: `of ${goal.toFixed(1)}M MMK`,
		progress: Math.min(raised / goal, 1),
		donors: 120 + index * 14,
		timeLeftLabel: `${8 + (index % 11)}d left`,
		impactType,
		familiesHelped: impactType === "families" ? familiesHelped : undefined,
		familiesTarget: impactType === "families" ? familiesTarget : undefined,
		educationSchools:
			impactType === "education" ? educationSchools : undefined,
		educationStudents:
			impactType === "education" ? educationStudents : undefined,
		isUrgent: category === "Urgent",
	};
});
