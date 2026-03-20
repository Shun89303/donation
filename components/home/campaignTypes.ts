import type { FilterKey } from "./filterConfig";
import type { OrganizationKey } from "./organizationConfig";

export type CampaignPost = {
	id: string;
	orgKey: OrganizationKey;
	orgName: string;
	category: Exclude<FilterKey, "All">;
	title: string;
	imageUri: string;
	raisedLabel: string;
	goalLabel: string;
	progress: number;
	donors: number;
	timeLeftLabel: string;
	impactType: "families" | "education" | "none";
	familiesHelped?: number;
	familiesTarget?: number;
	educationSchools?: number;
	educationStudents?: number;
	isUrgent: boolean;
};
