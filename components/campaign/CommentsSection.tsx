import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import type { DonorCommentItem } from "@/components/home/campaignTypes";
import { getRelativeTimeLabel } from "@/utils/campaignDetailsUtils";
import Feather from "@expo/vector-icons/Feather";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { CollapsibleSection } from "./CollapsibleSection";

type CommentsSectionProps = {
	colors: ThemeColors;
	comments: DonorCommentItem[];
	commentInput: string;
	onChangeCommentInput: (text: string) => void;
	onSendComment: () => void;
	isOpen: boolean;
	onToggle: () => void;
};

export function CommentsSection({
	colors,
	comments,
	commentInput,
	onChangeCommentInput,
	onSendComment,
	isOpen,
	onToggle,
}: CommentsSectionProps) {
	return (
		<CollapsibleSection
			icon="message-circle"
			title="Donor Comments"
			open={isOpen}
			onToggle={onToggle}
			colors={colors}
			badgeCount={comments.length}
		>
			<View style={styles.commentsList}>
				{comments.map((comment) => (
					<View
						key={comment.id}
						style={[
							styles.commentItem,
							{ borderBottomColor: colors.tabInactive },
						]}
					>
						<View style={styles.commentTopRow}>
							<Image
								source={{ uri: comment.authorAvatarUri }}
								style={styles.commentAvatar}
							/>
							<View style={styles.commentMetaWrap}>
								<Text style={[styles.commentAuthor, { color: colors.text }]}>
									{comment.author}
									<Text
										style={[
											styles.commentTime,
											{ color: colors.placeholderMuted },
										]}
									>
										· {getRelativeTimeLabel(comment.createdAtIso)}
									</Text>
								</Text>
								<Text style={[styles.commentMessage, { color: colors.text }]}>
									{comment.message}
								</Text>
								<View style={styles.likeRow}>
									<Feather
										name="heart"
										size={14}
										color={colors.placeholderMuted}
									/>
									<Text
										style={[
											styles.likeCountText,
											{ color: colors.placeholderMuted },
										]}
									>
										{comment.likeCount}
									</Text>
								</View>
							</View>
						</View>
					</View>
				))}
			</View>

			<View
				style={[
					styles.commentInputRow,
					{
						borderColor: colors.tabInactive,
						backgroundColor: colors.surfaceMuted,
					},
				]}
			>
				<TextInput
					placeholder="Write a comment"
					placeholderTextColor={colors.placeholderMuted}
					style={[styles.commentInput, { color: colors.text }]}
					value={commentInput}
					onChangeText={onChangeCommentInput}
				/>
				<AnimatedPressable
					style={styles.commentSendButton}
					onPress={onSendComment}
				>
					<Feather name="send" size={16} color={colors.tabActive} />
				</AnimatedPressable>
			</View>
		</CollapsibleSection>
	);
}

const styles = StyleSheet.create({
	commentsList: {
		marginTop: 2,
	},
	commentItem: {
		paddingVertical: 10,
		borderBottomWidth: 0.5,
	},
	commentTopRow: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	commentAvatar: {
		width: 34,
		height: 34,
		borderRadius: 17,
		backgroundColor: "#D1D5DB",
	},
	commentMetaWrap: {
		marginLeft: 9,
		flex: 1,
	},
	commentAuthor: {
		fontSize: 13,
		fontWeight: "700",
	},
	commentTime: {
		fontSize: 12,
		fontWeight: "500",
	},
	commentMessage: {
		marginTop: 3,
		fontSize: 13,
		fontWeight: "500",
		lineHeight: 19,
	},
	likeRow: {
		marginTop: 7,
		flexDirection: "row",
		alignItems: "center",
	},
	likeCountText: {
		fontSize: 12,
		fontWeight: "600",
		marginLeft: 4,
	},
	commentInputRow: {
		marginTop: 10,
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 4,
		flexDirection: "row",
		alignItems: "center",
	},
	commentInput: {
		flex: 1,
		fontSize: 14,
		fontWeight: "500",
		paddingVertical: 8,
	},
	commentSendButton: {
		padding: 6,
	},
});
