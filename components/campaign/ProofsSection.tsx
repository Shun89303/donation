import type { ThemeColors } from "@/app/_theme";
import type { CampaignProofItem } from "@/components/home/campaignTypes";
import { formatDate } from "@/utils/campaignDetailsUtils";
import Feather from "@expo/vector-icons/Feather";
import { Image, StyleSheet, Text, View } from "react-native";
import { CollapsibleSection } from "./CollapsibleSection";

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
			<CollapsibleSection
				icon="shield"
				title="Proof & Transparency"
				badgeCount={0}
				open={isOpen}
				onToggle={onToggle}
				colors={colors}
			>
				<Text
					style={[styles.emptySectionText, { color: colors.placeholderMuted }]}
				>
					No proofs uploaded yet.
				</Text>
			</CollapsibleSection>
		);
	}

	return (
		<CollapsibleSection
			icon="shield"
			title="Proof & Transparency"
			badgeCount={proofs.length}
			open={isOpen}
			onToggle={onToggle}
			colors={colors}
		>
			{proofs.map((proof) => {
				const label = proof.type.toUpperCase();
				const proofIcon: keyof typeof Feather.glyphMap =
					proof.type === "photo"
						? "image"
						: proof.type === "video"
							? "video"
							: "file";

				return (
					<View
						key={proof.id}
						style={[styles.proofRow, { borderBottomColor: colors.tabInactive }]}
					>
						<View
							style={[
								styles.proofThumb,
								{ backgroundColor: colors.surfaceMuted },
							]}
						>
							{proof.thumbnailUri ? (
								<Image
									source={{ uri: proof.thumbnailUri }}
									style={styles.proofThumbImage}
								/>
							) : null}
							{!proof.thumbnailUri ? (
								<Feather
									name={proofIcon}
									size={16}
									color={colors.onSurfaceMuted}
								/>
							) : null}
						</View>

						<View style={styles.proofTextWrap}>
							<View style={styles.proofTypeRow}>
								<Feather
									name={proofIcon}
									size={11}
									color={colors.placeholderMuted}
								/>
								<Text
									style={[
										styles.proofTypeText,
										{ color: colors.placeholderMuted },
									]}
								>
									{label}
								</Text>
							</View>
							<Text style={[styles.proofAboutText, { color: colors.text }]}>
								{proof.about}
							</Text>
							<Text
								style={[
									styles.proofDateText,
									{ color: colors.placeholderMuted },
								]}
							>
								{formatDate(proof.dateIso)}
							</Text>
						</View>
					</View>
				);
			})}
		</CollapsibleSection>
	);
}

const styles = StyleSheet.create({
	proofRow: {
		paddingVertical: 10,
		borderBottomWidth: 0.5,
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
