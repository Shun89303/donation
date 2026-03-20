import FadeScreen from "@/components/common/FadeScreen";
import Feather from "@expo/vector-icons/Feather";
import { FlashList } from "@shopify/flash-list";
import { useVideoPlayer, VideoView } from "expo-video";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Heart, MessageCircle, Share2 as Share } from "lucide-react-native";
import React, { memo } from "react";
import {
	Dimensions,
	Image,
	ImageBackground,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from "react-native";
import { darkColors, lightColors } from "../_theme";

const { height: screenHeight } = Dimensions.get("window");

type Post = {
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

const mockPosts: Post[] = [
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

type PostCardProps = {
	item: Post;
	colors: typeof lightColors;
	cardHeight: number;
};

const PostCard = memo(function PostCard({
	item,
	colors,
	cardHeight,
}: PostCardProps) {
	const player = useVideoPlayer(item.mediaUrl, (player) => {
		player.loop = true;
		player.play();
	});
	return (
		<View
			style={[
				styles.card,
				{ height: cardHeight },
				{ backgroundColor: colors.background },
			]}
		>
			{item.mediaType === "video" ? (
				<VideoView
					player={player}
					style={StyleSheet.absoluteFill}
					contentFit="cover"
				/>
			) : (
				<ImageBackground
					source={{ uri: item.mediaUrl }}
					style={StyleSheet.absoluteFill}
					imageStyle={styles.backgroundImage}
				/>
			)}

			<View style={styles.overlay} />

			<View style={styles.content}>
				<View style={styles.topRow}>
					<View style={styles.leftSection}>
						<View style={styles.creatorRow}>
							<Image
								source={{ uri: item.creatorAvatar }}
								style={styles.avatar}
							/>

							<View style={styles.creatorNameContainer}>
								<Text style={styles.creatorName} numberOfLines={1}>
									{item.creatorName}
								</Text>
								<Feather
									name="check-circle"
									size={18}
									color="#4CAF50"
									style={styles.orgVerifiedIcon}
								/>
							</View>

							<Pressable style={styles.followButton}>
								<Text style={styles.followButtonText}>
									{item.isFollowing ? "Following" : "Follow"}
								</Text>
							</Pressable>
						</View>

						<Text style={styles.description} numberOfLines={3}>
							{item.description}
						</Text>
					</View>

					<View style={styles.rightActions}>
						<Pressable style={styles.iconButton}>
							<Heart
								size={28}
								color="#4CAF50"
								fill={item.liked ? "#4CAF50" : "transparent"}
							/>
							<Text style={styles.iconText}>
								{item.likeCount.toLocaleString()}
							</Text>
						</Pressable>

						<Pressable style={styles.iconButton}>
							<MessageCircle size={28} color="#4CAF50" />
							<Text style={styles.iconText}>
								{item.commentCount.toLocaleString()}
							</Text>
						</Pressable>

						<Pressable style={styles.iconButton}>
							<Share size={28} color="#4CAF50" />
							<Text style={styles.iconText}>Share</Text>
						</Pressable>
					</View>
				</View>
				<View style={styles.campaignContainer}>
					<Pressable style={styles.campaignBox}>
						<View style={styles.campaignTextWrap}>
							<Text style={styles.linkedCampaignLabel}>LINKED CAMPAIGN</Text>
							<Text style={styles.campaignTitle} numberOfLines={3}>
								{item.campaignTitle}
							</Text>
						</View>

						<Pressable style={styles.donateButton}>
							<Text style={styles.donateButtonText}>Donate</Text>
						</Pressable>
					</Pressable>
				</View>
			</View>
		</View>
	);
});

export default function Creators() {
	const colorScheme = useColorScheme();
	const colors = colorScheme === "dark" ? darkColors : lightColors;
	const insets = useSafeAreaInsets();
	const TAB_BAR_HEIGHT = Platform.OS === "android" ? 70 : 85;
	const dynamicCardHeight = screenHeight - insets.bottom - TAB_BAR_HEIGHT;

	return (
		<FadeScreen>
			<SafeAreaView
				style={[
					styles.safeArea,
					{
						backgroundColor: colors.background,
					},
				]}
			>
				<FlashList
					data={mockPosts}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<PostCard
							item={item}
							colors={colors}
							cardHeight={dynamicCardHeight}
						/>
					)}
					contentContainerStyle={[styles.listContent, { paddingBottom: 20 }]}
					showsVerticalScrollIndicator={false}
					pagingEnabled
					snapToInterval={dynamicCardHeight}
					decelerationRate="fast"
				/>
			</SafeAreaView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	listContent: {
		padding: 0,
	},
	card: {
		width: "100%",
		borderRadius: 0,
		overflow: "hidden",
		marginBottom: 0,
	},
	backgroundImage: {
		resizeMode: "cover",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.28)",
	},
	content: {
		flex: 1,
		justifyContent: "flex-end",
		paddingHorizontal: 16,
		paddingBottom: 18,
	},
	topRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	campaignContainer: {
		marginTop: 12,
	},
	leftSection: {
		flex: 1,
		paddingRight: 8,
	},
	creatorRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.35)",
	},
	creatorNameContainer: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		gap: 10,
	},
	creatorName: {
		color: "white",
		fontSize: 15,
		fontWeight: "700",
	},
	orgVerifiedIcon: {
		marginLeft: -2,
	},
	followButton: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 12,
		backgroundColor: "#4CAF50",
	},
	followButtonText: {
		color: "white",
		fontSize: 12,
		fontWeight: "700",
	},
	description: {
		color: "white",
		fontSize: 14,
		lineHeight: 20,
		marginBottom: 8,
	},
	rightActions: {
		alignItems: "center",
		justifyContent: "flex-end",
		marginBottom: 2,
	},
	iconButton: {
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 24,
		gap: 4,
	},
	iconText: {
		color: "rgba(255,255,255,0.9)",
		fontSize: 11,
		fontWeight: "600",
	},
	campaignBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "rgba(255,255,255,0.14)",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.22)",
		paddingVertical: 12,
		paddingHorizontal: 14,
		borderRadius: 18,
	},
	campaignTextWrap: {
		flex: 1,
		paddingRight: 12,
	},
	linkedCampaignLabel: {
		color: "rgba(255,255,255,0.78)",
		fontSize: 11,
		fontWeight: "800",
		letterSpacing: 0.8,
		marginBottom: 4,
	},
	campaignTitle: {
		color: "white",
		fontSize: 14,
		fontWeight: "700",
	},
	donateButton: {
		backgroundColor: "#4CAF50",
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 12,
	},
	donateButtonText: {
		color: "white",
		fontSize: 13,
		fontWeight: "800",
	},
});
