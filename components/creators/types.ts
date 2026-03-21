export type Post = {
	id: string;
	creatorName: string;
	creatorAvatar: string;
	description: string;
	mediaType: "image" | "video";
	mediaUrl: string;
	campaignTitle: string;
	isFollowing: boolean;
	liked: boolean;
	likeCount: number;
	commentCount: number;
};
