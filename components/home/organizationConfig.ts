export const ORGANIZATION_FILTERS = [
	{ key: "All", label: "All", icon: "heart" },
	{ key: "Myanmar Red Cross", label: "Myanmar Red Cross", icon: "activity" },
	{ key: "Better Burma", label: "Better Burma", icon: "globe" },
	{ key: "Shine Hope MM", label: "Shine Hope MM", icon: "sun" },
	{ key: "Yangon Relief", label: "Yangon Relief", icon: "truck" },
	{ key: "Mandalay Care", label: "Mandalay Care", icon: "users" },
] as const;

export type OrganizationKey = (typeof ORGANIZATION_FILTERS)[number]["key"];
export type OrganizationIcon = (typeof ORGANIZATION_FILTERS)[number]["icon"];

export const trimOrgLabel = (label: string) => {
	const maxLength = 10;
	if (label.length <= maxLength) {
		return label;
	}
	return `${label.slice(0, 7)}...`;
};
