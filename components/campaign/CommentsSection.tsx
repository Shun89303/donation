import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import type { DonorCommentItem } from "@/components/home/campaignTypes";
import globalStyles from "@/styles/styles";
import { getRelativeTimeLabel } from "@/utils/campaignDetailsUtils";
import { metrics } from "@/utils/metrics";
import {
	ChevronDown,
	Flag,
	MessageCircle,
	Send,
	ThumbsUp,
} from "lucide-react-native";
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
			style={{
				borderColor: colors.secondaryGray,
				backgroundColor: colors.background,
				marginTop: metrics.spacingMedium,
				borderWidth: metrics.borderThin,
				borderRadius: metrics.borderRadiusLarge,
				padding: metrics.spacingMedium,
				...globalStyles.shadows,
			}}
		>
			<Pressable style={styles.collapsibleHeader}>
				<View style={styles.sectionHeaderLeft}>
					<MessageCircle
						size={metrics.iconMedium}
						color={colors.primaryGreen}
					/>
					<Text
						style={[
							styles.sectionTitle,
							{
								color: colors.text,
								fontSize: metrics.fontMedium,
								marginLeft: metrics.spacingSmall,
							},
						]}
					>
						Donor Comments
					</Text>
				</View>
				<View style={styles.sectionHeaderRight}>
					<View
						style={[
							styles.countBadge,
							{
								backgroundColor: colors.secondaryGreen,
								minWidth: metrics.containerMinWidthMedium,
								height: metrics.containerHeightMedium,
								paddingHorizontal: metrics.spacingSmall,
								marginRight: metrics.spacingSmall,
							},
						]}
					>
						<Text
							style={[
								styles.countBadgeText,
								{ color: colors.primaryGreen, fontSize: metrics.fontSmall },
							]}
						>
							{comments.length}
						</Text>
					</View>
					<ChevronDown size={metrics.iconMedium} color={colors.primaryGray} />
				</View>
			</Pressable>
			<View
				style={{
					marginTop: metrics.spacingExtraSmall,
				}}
			>
				<View>
					{comments.map((comment) => (
						<View
							key={comment.id}
							style={{
								borderBottomColor: colors.tabInactive,
								paddingVertical: metrics.spacingMedium,
							}}
						>
							<View style={styles.commentTopRow}>
								{comment.authorAvatarUri ? (
									<Image
										source={{ uri: comment.authorAvatarUri }}
										style={{
											width: metrics.containerMinWidthLarge,
											height: metrics.containerHeightLarge,
											borderRadius: 999,
										}}
									/>
								) : (
									<View
										style={[
											styles.commentAvatarFallback,
											{
												width: metrics.containerMinWidthLarge,
												height: metrics.containerHeightLarge,
												borderRadius: 999,
												backgroundColor: colors.secondaryGray,
											},
										]}
									>
										<Text
											style={[
												styles.commentAvatarText,
												{
													color: colors.primaryGray,
													fontSize: metrics.fontLarge,
												},
											]}
										>
											{comment.author?.charAt(0).toUpperCase()}
										</Text>
									</View>
								)}
								<View
									style={[
										styles.commentMetaWrap,
										{
											marginLeft: metrics.spacingMedium,
										},
									]}
								>
									<Text
										style={[
											styles.commentAuthor,
											{ color: colors.text, fontSize: metrics.fontMedium },
										]}
									>
										{comment.author}
										{"  "}
										<Text
											style={[
												styles.commentTime,
												{
													color: colors.primaryGray,
													fontSize: metrics.fontExtraSmall,
												},
											]}
										>
											{getRelativeTimeLabel(comment.createdAtIso)}
										</Text>
									</Text>
									<Text
										style={[
											styles.commentMessage,
											{
												color: colors.primaryGray,
												marginTop: metrics.spacingExtraSmall,
												fontSize: metrics.fontMedium,
												lineHeight: metrics.lineHeightMedium,
											},
										]}
									>
										{comment.message}
									</Text>
									<View
										style={[
											styles.likeRow,
											{
												marginTop: metrics.spacingSmall,
												gap: metrics.spacingSmall,
											},
										]}
									>
										<View
											style={[
												styles.actionItem,
												{
													gap: metrics.spacingExtraSmall,
												},
											]}
										>
											<ThumbsUp
												size={metrics.iconSmall}
												color={colors.primaryGray}
											/>
											<Text
												style={[
													styles.likeCountText,
													{
														color: colors.primaryGray,
														fontSize: metrics.fontSmall,
													},
												]}
											>
												{comment.likeCount}
											</Text>
										</View>
										<View
											style={[
												styles.actionItem,
												{
													gap: metrics.spacingExtraSmall,
												},
											]}
										>
											<Flag
												size={metrics.iconSmall}
												color={colors.primaryRed}
											/>
											<Text
												style={{
													color: colors.primaryRed,
													fontSize: metrics.fontExtraSmall,
													fontWeight: "500",
												}}
											>
												Report
											</Text>
										</View>
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
							borderTopColor: colors.secondaryGray,
							borderTopWidth: metrics.borderThin,
							paddingHorizontal: metrics.spacingExtraSmall,
							paddingTop: metrics.spacingMedium,
							gap: metrics.spacingSmall,
						},
					]}
				>
					{/* Input container */}
					<View
						style={[
							styles.inputContainer,
							{
								backgroundColor: colors.secondaryGray,
								borderRadius: metrics.borderRadiusLarge,
								paddingHorizontal: metrics.spacingSmall,
							},
						]}
					>
						<TextInput
							placeholder="Add a comment..."
							placeholderTextColor={colors.primaryGray}
							style={[
								styles.commentInput,
								{
									color: colors.text,
									fontSize: metrics.fontMedium,
									paddingVertical: metrics.spacingSmall,
								},
							]}
							value={commentInput}
							onChangeText={onChangeCommentInput}
						/>
					</View>

					{/* Button container */}
					<View
						style={[
							styles.sendButtonContainer,
							{
								backgroundColor: colors.primaryGreen,
								borderRadius: metrics.borderRadiusLarge,
								paddingHorizontal: metrics.spacingSmall,
								paddingVertical: metrics.spacingSmall,
							},
						]}
					>
						<AnimatedPressable
							style={{
								padding: metrics.spacingExtraSmall,
							}}
							onPress={onSendComment}
						>
							<Send size={metrics.iconMedium} color="white" />
						</AnimatedPressable>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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
		fontWeight: "700",
	},
	countBadge: {
		borderRadius: 999,
		alignItems: "center",
		justifyContent: "center",
	},
	countBadgeText: {
		fontWeight: "700",
	},
	commentTopRow: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	commentAvatarFallback: {
		justifyContent: "center",
		alignItems: "center",
	},
	commentAvatarText: {
		fontWeight: "400",
	},
	commentMetaWrap: {
		flex: 1,
	},
	commentAuthor: {
		fontWeight: "700",
	},
	commentTime: {
		fontWeight: "500",
	},
	commentMessage: {
		fontWeight: "500",
	},
	likeRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	actionItem: {
		flexDirection: "row",
		alignItems: "center",
	},
	likeCountText: {
		fontWeight: "500",
	},
	commentInputRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	inputContainer: {
		flex: 1,
		justifyContent: "center",
	},
	sendButtonContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	commentInput: {
		flex: 1,
		fontWeight: "500",
	},
});
