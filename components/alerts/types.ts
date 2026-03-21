export type NotificationType =
	| "proof_uploaded"
	| "donation_successful"
	| "new_creator_post"
	| "organization_verified"
	| "new_campaign_launched"
	| "milestone_reached"
	| "expense_report_added"
	| "campaign_completed"
	| "creator_milestone"
	| "thank_you_note";

export type NotificationFilter =
	| "All"
	| "Unread"
	| "Donations"
	| "Campaigns"
	| "Proofs";

export type NotificationItem = {
	id: string;
	type: NotificationType;
	title: string;
	message: string;
	time: string;
	unread: boolean;
};

