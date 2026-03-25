import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import type { DonorCommentItem } from "@/components/home/campaignTypes";
import { getRelativeTimeLabel } from "@/utils/campaignDetailsUtils";
import Feather from "@expo/vector-icons/Feather";
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

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
		<View
			style={[
				styles.card,
				{
					borderColor: colors.tabInactive,
					backgroundColor: colors.background,
				},
			]}
		>
			<Pressable style={styles.collapsibleHeader}>
				<View style={styles.sectionHeaderLeft}>
					<Feather
						name="message-circle"
						size={16}
						color={colors.primaryGreen}
					/>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Donor Comments
					</Text>
				</View>
				<View style={styles.sectionHeaderRight}>
					<View
						style={[
							styles.countBadge,
							{ backgroundColor: colors.alertBadgeBackground },
						]}
					>
						<Text
							style={[styles.countBadgeText, { color: colors.alertBadgeText }]}
						>
							{comments.length}
						</Text>
					</View>
					<Feather
						name="chevron-down"
						size={18}
						color={colors.placeholderMuted}
					/>
				</View>
			</Pressable>
			<View style={styles.sectionContent}>
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
						<Feather name="send" size={16} color={colors.primaryGreen} />
					</AnimatedPressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		marginTop: 14,
		borderWidth: 1,
		borderRadius: 14,
		padding: 12,
	},
	collapsibleHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	sectionHeaderLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	sectionHeaderRight: {
		flexDirection: "row",
		alignItems: "center",
	},
	sectionTitle: {
		fontSize: 15,
		fontWeight: "700",
		marginLeft: 7,
	},
	countBadge: {
		minWidth: 24,
		height: 24,
		paddingHorizontal: 7,
		borderRadius: 999,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 6,
	},
	countBadgeText: {
		fontSize: 12,
		fontWeight: "700",
	},
	sectionContent: {
		marginTop: 12,
	},
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
