import type { UserProfile } from "./types";

const savedCampaignIds = new Set<string>();

export const USER_PROFILE: UserProfile = {
	name: "Maung Chan Aye",
	profileImageUri: "",
	bio: "",
	donationCount: 3,
	totalMmkGiven: 350000,
	savedCount: 0,
	organizationName: "Myanmar Aid Foundation",
	notificationCount: 2,
	language: "EN",
	isVerified: true,
};

export function isCampaignSaved(campaignId: string) {
	return savedCampaignIds.has(campaignId);
}

export function toggleCampaignSaved(campaignId: string) {
	if (savedCampaignIds.has(campaignId)) {
		savedCampaignIds.delete(campaignId);
	} else {
		savedCampaignIds.add(campaignId);
	}

	USER_PROFILE.savedCount = savedCampaignIds.size;
	return savedCampaignIds.has(campaignId);
}
