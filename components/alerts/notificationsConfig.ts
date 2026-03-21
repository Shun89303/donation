import type { ComponentProps } from "react";
import type Feather from "@expo/vector-icons/Feather";
import type { NotificationFilter, NotificationType } from "./types";

export const FILTERS: NotificationFilter[] = [
	"All",
	"Unread",
	"Donations",
	"Campaigns",
	"Proofs",
];

export const TYPE_FILTER_GROUP: Record<
	NotificationType,
	"Donations" | "Campaigns" | "Proofs"
> = {
	proof_uploaded: "Proofs",
	donation_successful: "Donations",
	new_creator_post: "Campaigns",
	organization_verified: "Campaigns",
	new_campaign_launched: "Campaigns",
	milestone_reached: "Campaigns",
	expense_report_added: "Proofs",
	campaign_completed: "Campaigns",
	creator_milestone: "Campaigns",
	thank_you_note: "Donations",
};

type NotificationIconConfig = {
	name: ComponentProps<typeof Feather>["name"];
	iconTint: string;
	iconBackground: string;
};

export function getNotificationIcon(type: NotificationType): NotificationIconConfig {
	switch (type) {
		case "proof_uploaded":
			return {
				name: "file-text",
				iconTint: "#1D4ED8",
				iconBackground: "#DBEAFE",
			};
		case "donation_successful":
			return {
				name: "dollar-sign",
				iconTint: "#047857",
				iconBackground: "#D1FAE5",
			};
		case "new_creator_post":
			return {
				name: "edit-3",
				iconTint: "#6D28D9",
				iconBackground: "#EDE9FE",
			};
		case "organization_verified":
			return {
				name: "check-circle",
				iconTint: "#065F46",
				iconBackground: "#D1FAE5",
			};
		case "new_campaign_launched":
			return {
				name: "flag",
				iconTint: "#92400E",
				iconBackground: "#FEF3C7",
			};
		case "milestone_reached":
			return {
				name: "target",
				iconTint: "#B45309",
				iconBackground: "#FDE68A",
			};
		case "expense_report_added":
			return {
				name: "pie-chart",
				iconTint: "#0E7490",
				iconBackground: "#CFFAFE",
			};
		case "campaign_completed":
			return {
				name: "check-square",
				iconTint: "#166534",
				iconBackground: "#DCFCE7",
			};
		case "creator_milestone":
			return {
				name: "award",
				iconTint: "#9333EA",
				iconBackground: "#F3E8FF",
			};
		case "thank_you_note":
			return {
				name: "heart",
				iconTint: "#BE185D",
				iconBackground: "#FCE7F3",
			};
	}
}

