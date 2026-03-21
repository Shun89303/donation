import Feather from "@expo/vector-icons/Feather";
import { BlurView } from "expo-blur";
import { useVideoPlayer, VideoView } from "expo-video";
import { Heart, MessageCircle, Share2 as Share } from "lucide-react-native";
import React, { memo } from "react";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import { creatorsStyles } from "./CreatorsStyles";
import type { Post } from "./types";

interface PostCardProps {
	item: Post;
	colors: any; // Replace with proper theme type later
	cardHeight: number;
}

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
				creatorsStyles.card,
				{ height: cardHeight },
				{ backgroundColor: colors.background },
			]}
		>
			{item.mediaType === "video" ? (
				<VideoView
					player={player}
					style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
					contentFit="cover"
				/>
			) : (
				<ImageBackground
					source={{ uri: item.mediaUrl }}
					style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
					imageStyle={creatorsStyles.backgroundImage}
				/>
			)}

			<View style={creatorsStyles.overlay} />

			<View style={creatorsStyles.content}>
				<View style={creatorsStyles.topRow}>
					<View style={creatorsStyles.leftSection}>
						<View style={creatorsStyles.creatorRow}>
							<Image
								source={{ uri: item.creatorAvatar }}
								style={creatorsStyles.avatar}
							/>

							<View style={creatorsStyles.creatorNameContainer}>
								<Text style={creatorsStyles.creatorName} numberOfLines={1}>
									{item.creatorName}
								</Text>
								<Feather
									name="check-circle"
									size={18}
									color="#4CAF50"
									style={creatorsStyles.orgVerifiedIcon}
								/>
							</View>

							<Pressable style={creatorsStyles.followButton}>
								<BlurView
									intensity={80}
									tint="systemUltraThinMaterialDark"
									style={creatorsStyles.followButtonBlur}
								>
									<Text style={creatorsStyles.followButtonText}>
										{item.isFollowing ? "Following" : "Follow"}
									</Text>
								</BlurView>
							</Pressable>
						</View>

						<Text style={creatorsStyles.description} numberOfLines={3}>
							{item.description}
						</Text>
					</View>

					<View style={creatorsStyles.rightActions}>
						<Pressable style={creatorsStyles.iconButton}>
							<View style={creatorsStyles.iconContainerBlur}>
								<BlurView
									intensity={30}
									tint="systemUltraThinMaterialDark"
									style={creatorsStyles.iconContainer}
								>
									<Heart
										size={24}
										color="white"
										fill={item.liked ? "#4CAF50" : "transparent"}
									/>
								</BlurView>
							</View>
							<Text style={creatorsStyles.iconText}>
								{item.likeCount.toLocaleString()}
							</Text>
						</Pressable>

						<Pressable style={creatorsStyles.iconButton}>
							<View style={creatorsStyles.iconContainerBlur}>
								<BlurView
									intensity={30}
									tint="systemUltraThinMaterialDark"
									style={creatorsStyles.iconContainer}
								>
									<MessageCircle size={24} color="white" />
								</BlurView>
							</View>
							<Text style={creatorsStyles.iconText}>
								{item.commentCount.toLocaleString()}
							</Text>
						</Pressable>

						<Pressable style={creatorsStyles.iconButton}>
							<View style={creatorsStyles.iconContainerBlur}>
								<BlurView
									intensity={30}
									tint="systemUltraThinMaterialDark"
									style={creatorsStyles.iconContainer}
								>
									<Share size={24} color="white" />
								</BlurView>
							</View>
							<Text style={creatorsStyles.iconText}>Share</Text>
						</Pressable>
					</View>
				</View>
				<View style={creatorsStyles.campaignContainer}>
					<Pressable style={creatorsStyles.campaignBoxBlur}>
						<BlurView
							intensity={30}
							tint="systemUltraThinMaterialDark"
							style={creatorsStyles.campaignBox}
						>
							<View style={creatorsStyles.campaignTextWrap}>
								<Text style={creatorsStyles.linkedCampaignLabel}>
									LINKED CAMPAIGN
								</Text>
								<Text style={creatorsStyles.campaignTitle} numberOfLines={3}>
									{item.campaignTitle}
								</Text>
							</View>

							<Pressable style={creatorsStyles.donateButton}>
								<Text style={creatorsStyles.donateButtonText}>Donate</Text>
							</Pressable>
						</BlurView>
					</Pressable>
				</View>
			</View>
		</View>
	);
});

export default PostCard;
export type { PostCardProps };
