// mapping for bottom tabs' titles + icon names for Feather icons
export const mainTabs = {
	index: { title: "Home", icon: "home" },
	map: { title: "Map", icon: "map-pin" },
	creators: { title: "Creators", icon: "play-circle" },
	alerts: { title: "Alerts", icon: "bell" },
	profile: { title: "Profile", icon: "user" },
} as const;

export type TabKey = keyof typeof mainTabs;
