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
	const safe = value ?? 0;

	if (safe >= 1_000_000_000) {
		return `${(safe / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
	} else if (safe >= 1_000_000) {
		return `${(safe / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
	} else if (safe >= 1_000) {
		return `${(safe / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
	}

	return `${safe}`;
}
