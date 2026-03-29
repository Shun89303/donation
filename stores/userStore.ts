import { UserProfile } from "@/components/profile/types";
import { create } from "zustand";

const initialProfile: UserProfile = {
	name: "",
	profileImageUri: "",
	bio: "",
	donationCount: 0,
	totalMmkGiven: 0,
	savedCount: 0,
	organizationName: "",
	notificationCount: 0,
	language: "EN",
	isVerified: false,
	password: "",
};

type UserStore = {
	userProfile: UserProfile;
	updateProfile: (data: Partial<UserProfile>) => void;
	resetProfile: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
	userProfile: initialProfile,
	updateProfile: (data) =>
		set((state) => ({ userProfile: { ...state.userProfile, ...data } })),
	resetProfile: () => set({ userProfile: initialProfile }),
}));
