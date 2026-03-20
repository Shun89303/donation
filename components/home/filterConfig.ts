// Campaign options mapping
export const FILTERS = [
	{ key: "All", label: "All" },
	{ key: "Orphan", label: "Orphan" },
	{ key: "Disaster", label: "Disaster" },
	{ key: "Nursing Home", label: "Nursing Home" },
	{ key: "Urgent", label: "Urgent" },
] as const;

export type FilterKey = (typeof FILTERS)[number]["key"];
