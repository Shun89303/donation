// Campaign options mapping
export const FILTERS = [
	{ key: "All", label: "All", icon: "heart" },
	{ key: "Orphan", label: "Orphan", icon: "baby" },
	{ key: "Disaster", label: "Disaster", icon: "flame" },
	{ key: "Nursing Home", label: "Nursing Home", icon: "house" },
	{ key: "Urgent", label: "Urgent", icon: "triangle-alert" },
] as const;

export type FilterKey = (typeof FILTERS)[number]["key"];
