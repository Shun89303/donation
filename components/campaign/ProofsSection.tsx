import type { ThemeColors } from "@/app/_theme";
import type { CampaignProofItem } from "@/components/home/campaignTypes";
import globalStyles from "@/styles/styles";
import { formatDate } from "@/utils/campaignDetailsUtils";
import {
	ChevronDown,
	FileText,
	Image as ImageIcon,
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
					styles.card,
					{
						borderColor: colors.secondaryGray,
						backgroundColor: colors.background,
						...globalStyles.shadows,
					},
				]}
			>
				<Pressable style={styles.collapsibleHeader}>
					<View style={styles.sectionHeaderLeft}>
						<Shield size={16} color={colors.primaryGreen} />
						<Text style={[styles.sectionTitle, { color: colors.text }]}>
							Proof & Transparency
						</Text>
					</View>
					<View style={styles.sectionHeaderRight}>
						<View
							style={[
								styles.countBadge,
								{ backgroundColor: colors.secondaryGreen },
							]}
						>
							<Text
								style={[styles.countBadgeText, { color: colors.primaryGreen }]}
							>
								0
							</Text>
						</View>
						<ChevronDown size={18} color={colors.primaryGray} />
					</View>
				</Pressable>
				<View style={styles.sectionContent}>
					<Text
						style={[styles.emptySectionText, { color: colors.primaryGray }]}
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
				styles.card,
				{
					borderColor: colors.secondaryGray,
					backgroundColor: colors.background,
					...globalStyles.shadows,
				},
			]}
		>
			<Pressable style={styles.collapsibleHeader}>
				<View style={styles.sectionHeaderLeft}>
					<Shield size={16} color={colors.primaryGreen} />
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Proof & Transparency
					</Text>
				</View>
				<View style={styles.sectionHeaderRight}>
					<View
						style={[
							styles.countBadge,
							{ backgroundColor: colors.secondaryGreen },
						]}
					>
						<Text
							style={[styles.countBadgeText, { color: colors.primaryGreen }]}
						>
							{proofs.length} uploads
						</Text>
					</View>
					<ChevronDown size={18} color={colors.primaryGray} />
				</View>
			</Pressable>
			<View style={styles.sectionContent}>
				{proofs.map((proof) => {
					const label = proof.type.toUpperCase();

					return (
						<View key={proof.id} style={[styles.proofRow]}>
							<View
								style={[
									styles.proofThumb,
									{ backgroundColor: colors.surfaceMuted },
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
												<VideoPlaceholder size={60} />
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
										<ImageIcon size={16} color={colors.onSurfaceMuted} />
									) : proof.type === "video" ? (
										<Video size={16} color={colors.onSurfaceMuted} />
									) : (
										<FileText size={16} color={colors.onSurfaceMuted} />
									)
								) : null}
							</View>

							<View style={styles.proofTextWrap}>
								<View style={styles.proofTypeRow}>
									{proof.type === "photo" ? (
										<ImageIcon size={11} color={colors.primaryGreen} />
									) : proof.type === "video" ? (
										<Video size={11} color={colors.primaryRed} />
									) : (
										<FileText size={11} color={colors.primaryGray} />
									)}
									<Text
										style={[
											styles.proofTypeText,
											{ color: colors.primaryGray },
										]}
									>
										{label}
									</Text>
								</View>
								<Text style={[styles.proofAboutText, { color: colors.text }]}>
									{proof.about}
								</Text>
								<Text
									style={[styles.proofDateText, { color: colors.primaryGray }]}
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
		paddingHorizontal: 10,
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
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	proofThumb: {
		width: 44,
		height: 44,
		borderRadius: 10,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
	},
	proofThumbImage: {
		width: "100%",
		height: "100%",
	},
	proofTextWrap: {
		marginLeft: 10,
		flex: 1,
	},
	proofTypeRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	proofTypeText: {
		fontSize: 11,
		fontWeight: "600",
		marginLeft: 4,
	},
	proofAboutText: {
		fontSize: 13,
		fontWeight: "700",
		marginTop: 3,
		lineHeight: 18,
	},
	proofDateText: {
		fontSize: 12,
		fontWeight: "500",
		marginTop: 2,
	},
	emptySectionText: {
		fontSize: 13,
		fontWeight: "500",
	},
});
