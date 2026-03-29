export type UserProfile = {
	name: string;
	profileImageUri?: string;
	bio: string;
	donationCount?: number;
	totalMmkGiven?: number;
	savedCount?: number;
	organizationName: string;
	notificationCount?: number;
	language?: string;
	isVerified?: boolean;
	password?: string;
};
