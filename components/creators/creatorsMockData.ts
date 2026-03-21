import type { Post } from "./types";

export const mockPosts: Post[] = [
	{
		id: "1",
		creatorName: "Aye Chan",
		creatorAvatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
		description:
			"Families displaced by flooding in Myanmar need urgent food packs, clean water, and temporary shelter support.",
		mediaType: "image",
		mediaUrl:
			"https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&q=80",
		campaignTitle: "Emergency Flood Relief in Myanmar",
		isFollowing: false,
		liked: false,
		likeCount: 124,
		commentCount: 23,
	},
	{
		id: "2",
		creatorName: "Ko Min Zaw",
		creatorAvatar:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
		description:
			"Local volunteers are gathering donations for school kits and transport support for children in rural communities.",
		mediaType: "image",
		mediaUrl:
			"https://images.unsplash.com/photo-1503676382389-4809596d5290?w=1200&q=80",
		campaignTitle: "Back-to-School Support for Rural Kids",
		isFollowing: true,
		liked: true,
		likeCount: 256,
		commentCount: 45,
	},
	{
		id: "3",
		creatorName: "Thandar Win",
		creatorAvatar:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
		description:
			"Community kitchens are preparing meals daily for families facing hardship. Your donation helps keep them running.",
		mediaType: "video",
		mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
		campaignTitle: "Community Kitchen Meal Fund",
		isFollowing: false,
		liked: false,
		likeCount: 89,
		commentCount: 12,
	},
];
