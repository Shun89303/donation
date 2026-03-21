export type UserProfile = {
	name: string;
	profileImageUri?: string;
	donationCount?: number;
	totalMmkGiven?: number;
	savedCount?: number;
	organizationName: string;
	notificationCount?: number;
	language?: string;
	isVerified?: boolean;
};
