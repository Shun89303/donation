import type { ThemeColors } from "@/app/_theme";
import type { CampaignProofItem } from "@/components/home/campaignTypes";
import globalStyles from "@/styles/styles";
import { formatDate } from "@/utils/campaignDetailsUtils";
import { metrics } from "@/utils/metrics";
import {
	ChevronDown,
	FileText,
	ImageIcon,
	Shield,
	Video,
} from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import VideoPlaceholder from "../common/VideoPlaceholder";

type ProofsSectionProps = {
	colors: ThemeColors;
	proofs: CampaignProofItem[];
	isOpen: boolean;
	onToggle: () => void;
};

export function ProofsSection({
	colors,
	proofs,
	isOpen,
	onToggle,
}: ProofsSectionProps) {
	if (proofs.length === 0) {
		return (
			<View
				style={[
					{
						borderColor: colors.secondaryGray,
						backgroundColor: colors.background,
						marginTop: metrics.spacingMedium,
						borderWidth: metrics.borderMedium,
						borderRadius: metrics.borderRadiusLarge,
						padding: metrics.spacingMedium,
						...globalStyles.shadows,
					},
				]}
			>
				<Pressable style={styles.collapsibleHeader}>
					<View style={styles.sectionHeaderLeft}>
						<Shield size={metrics.iconMedium} color={colors.primaryGreen} />
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
							Proof & Transparency
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
									paddingHorizontal: metrics.containerPaddingHorizontalMedium,
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
								0
							</Text>
						</View>
						<ChevronDown size={metrics.iconMedium} color={colors.primaryGray} />
					</View>
				</Pressable>
				<View
					style={{
						marginTop: metrics.spacingMedium,
						paddingHorizontal: metrics.spacingSmall,
					}}
				>
					<Text
						style={[
							styles.emptySectionText,
							{ color: colors.primaryGray, fontSize: metrics.fontSmall },
						]}
					>
						No proofs uploaded yet.
					</Text>
				</View>
			</View>
		);
	}

	return (
		<View
			style={[
				{
					borderColor: colors.secondaryGray,
					backgroundColor: colors.background,
					marginTop: metrics.spacingMedium,
					borderWidth: metrics.borderMedium,
					borderRadius: metrics.borderRadiusLarge,
					padding: metrics.spacingMedium,
					...globalStyles.shadows,
				},
			]}
		>
			<Pressable style={styles.collapsibleHeader}>
				<View style={styles.sectionHeaderLeft}>
					<Shield size={metrics.iconMedium} color={colors.primaryGreen} />
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
						Proof & Transparency
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
								paddingHorizontal: metrics.containerPaddingHorizontalMedium,
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
							{proofs.length} uploads
						</Text>
					</View>
					<ChevronDown size={metrics.iconMedium} color={colors.primaryGray} />
				</View>
			</Pressable>
			<View
				style={{
					marginTop: metrics.spacingMedium,
					paddingHorizontal: metrics.spacingSmall,
				}}
			>
				{proofs.map((proof) => {
					const label = proof.type.toUpperCase();

					return (
						<View
							key={proof.id}
							style={[
								styles.proofRow,
								{
									paddingVertical: metrics.spacingSmall,
								},
							]}
						>
							<View
								style={[
									styles.proofThumb,
									{
										backgroundColor: colors.surfaceMuted,
										width: metrics.thumbnailMedium,
										height: metrics.thumbnailMedium,
										borderRadius: metrics.borderRadiusLarge,
									},
								]}
							>
								{proof.thumbnailUri ? (
									proof.type === "video" ? (
										<>
											<Image
												source={{ uri: proof.thumbnailUri }}
												style={styles.proofThumbImage}
											/>
											<View style={styles.overlayWrapper}>
												<VideoPlaceholder size={metrics.thumbnailMedium} />
											</View>
										</>
									) : (
										<Image
											source={{ uri: proof.thumbnailUri }}
											style={styles.proofThumbImage}
										/>
									)
								) : null}
								{!proof.thumbnailUri ? (
									proof.type === "photo" ? (
										<ImageIcon
											size={metrics.iconMedium}
											color={colors.onSurfaceMuted}
										/>
									) : proof.type === "video" ? (
										<Video
											size={metrics.iconMedium}
											color={colors.onSurfaceMuted}
										/>
									) : (
										<FileText
											size={metrics.iconMedium}
											color={colors.onSurfaceMuted}
										/>
									)
								) : null}
							</View>

							<View
								style={[
									styles.proofTextWrap,
									{
										marginLeft: metrics.spacingMedium,
									},
								]}
							>
								<View style={styles.proofTypeRow}>
									{proof.type === "photo" ? (
										<ImageIcon
											size={metrics.iconSmall}
											color={colors.primaryGreen}
										/>
									) : proof.type === "video" ? (
										<Video size={metrics.iconSmall} color={colors.primaryRed} />
									) : (
										<FileText
											size={metrics.iconSmall}
											color={colors.primaryGray}
										/>
									)}
									<Text
										style={[
											styles.proofTypeText,
											{
												color: colors.primaryGray,
												fontSize: metrics.fontExtraSmall,
												marginLeft: metrics.spacingExtraSmall,
											},
										]}
									>
										{label}
									</Text>
								</View>
								<Text
									style={[
										styles.proofAboutText,
										{
											color: colors.text,
											fontSize: metrics.fontMedium,
											marginTop: metrics.spacingExtraSmall,
											lineHeight: metrics.lineHeightMedium,
										},
									]}
								>
									{proof.about}
								</Text>
								<Text
									style={[
										styles.proofDateText,
										{
											color: colors.primaryGray,
											fontSize: metrics.fontExtraSmall,
											marginTop: metrics.spacingExtraSmall,
										},
									]}
								>
									{formatDate(proof.dateIso)}
								</Text>
							</View>
						</View>
					);
				})}
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
	overlayWrapper: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	proofRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	proofThumb: {
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
	},
	proofThumbImage: {
		width: "100%",
		height: "100%",
	},
	proofTextWrap: {
		flex: 1,
	},
	proofTypeRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	proofTypeText: {
		fontWeight: "600",
	},
	proofAboutText: {
		fontWeight: "700",
	},
	proofDateText: {
		fontWeight: "500",
	},
	emptySectionText: {
		fontWeight: "500",
	},
});
