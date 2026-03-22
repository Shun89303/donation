export const ORGANIZATION_FILTERS = [
	{
		key: "All",
		label: "All",
		icon: "Heart",
		iconColor: "primaryGray",
		bgColor: "secondaryGray",
	},
	{
		key: "Myanmar Aid",
		label: "Myanmar Aid",
		icon: "Heart",
		iconColor: "primaryGreen",
		bgColor: "secondaryGreen",
	},
	{
		key: "Education MM",
		label: "Education MM",
		icon: "GraduationCap",
		iconColor: "primaryGold",
		bgColor: "secondaryGold",
	},
	{
		key: "Health Bridge",
		label: "Health Bridge",
		icon: "Stethoscope",
		iconColor: "primaryGreen",
		bgColor: "secondaryGreen",
	},
	{
		key: "Chin Alliance",
		label: "Chin Alliance",
		icon: "Mountain",
		iconColor: "primaryGray",
		bgColor: "secondaryGray",
	},
	{
		key: "River Aid",
		label: "River Aid",
		icon: "Droplets",
		iconColor: "primaryGreen",
		bgColor: "secondaryGreen",
	},
	{
		key: "Kachin Relief",
		label: "Kachin Relief",
		icon: "Shield",
		iconColor: "primaryGold",
		bgColor: "secondaryGold",
	},
] as const;

export type OrganizationKey = (typeof ORGANIZATION_FILTERS)[number]["key"];
export type OrganizationIcon = (typeof ORGANIZATION_FILTERS)[number]["icon"];
export type OrganizationIconColor =
	(typeof ORGANIZATION_FILTERS)[number]["iconColor"];
export type OrganizationBgColor =
	(typeof ORGANIZATION_FILTERS)[number]["bgColor"];
