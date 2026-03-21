// Pure utility functions, no theme dependency needed

export function formatDate(dateIso: string): string {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	})
		.format(new Date(dateIso))
		.replace(",", "");
}

export function formatMmkNeeded(value: number): string {
	const inMillions = value / 1_000_000;
	if (inMillions >= 1) {
		return `${inMillions.toFixed(1)}M MMK needed`;
	}
	return `${value.toLocaleString("en-US")} MMK needed`;
}

export function getOrdinal(value: number): string {
	const mod100 = value % 100;
	if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
	switch (value % 10) {
		case 1:
			return `${value}st`;
		case 2:
			return `${value}nd`;
		case 3:
			return `${value}rd`;
		default:
			return `${value}th`;
	}
}

export function sumExpenseAmount(expenseLabel: string): number {
	const digitsOnly = expenseLabel.replace(/[^0-9]/g, "");
	return Number.parseInt(digitsOnly || "0", 10);
}

export function getRelativeTimeLabel(dateIso: string): string {
	const now = Date.now();
	const then = new Date(dateIso).getTime();
	const diffMs = Math.max(now - then, 0);
	const diffMinutes = Math.floor(diffMs / (1000 * 60));

	if (diffMinutes < 60) return `${Math.max(diffMinutes, 1)} min ago`;

	const diffHours = Math.floor(diffMinutes / 60);
	if (diffHours < 24) return `${diffHours} hrs ago`;

	const diffDays = Math.floor(diffHours / 24);
	return `${diffDays} days ago`;
}

// Types for utils if needed
// No Colors type needed
