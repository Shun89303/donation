export function getInitials(name: string) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) {
		return "U";
	}
	const initials = parts
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "");
	return initials.join("");
}

export function toCount(value?: number) {
	if (!value || value < 0) {
		return 0;
	}
	return value;
}

export function formatMmk(value?: number) {
	const safe = toCount(value);
	if (safe >= 1000) {
		return `${Math.round(safe / 1000)}K`;
	}
	return `${safe}`;
}
