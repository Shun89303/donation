import type { ThemeColors } from "@/app/_theme";
import Feather from "@expo/vector-icons/Feather";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CollapsibleSection } from "./CollapsibleSection";

type GallerySectionProps = {
	colors: ThemeColors;
	galleryImageUris: string[];
	visibleGalleryImages: string[];
	extraGalleryCount: number;
	isOpen: boolean;
	onToggle: () => void;
	onShowAll: () => void;
};

export function GallerySection({
	colors,
	galleryImageUris,
	visibleGalleryImages,
	extraGalleryCount,
	isOpen,
	onToggle,
	onShowAll,
}: GallerySectionProps) {
	if (galleryImageUris.length === 0) {
		return (
			<CollapsibleSection
				icon="image"
				title="Photo Gallery"
				badgeCount={0}
				open={isOpen}
				onToggle={onToggle}
				colors={colors}
			>
				<Text
					style={[styles.emptySectionText, { color: colors.placeholderMuted }]}
				>
					No photos uploaded yet.
				</Text>
			</CollapsibleSection>
		);
	}

	const handleGalleryPress = (index: number) => {
		if (extraGalleryCount > 0 && index === 3) {
			onShowAll();
		}
	};

	return (
		<CollapsibleSection
			icon="image"
			title="Photo Gallery"
			badgeCount={galleryImageUris.length}
			open={isOpen}
			onToggle={onToggle}
			colors={colors}
		>
			<View style={styles.galleryGrid}>
				{visibleGalleryImages.map((uri, index) => {
					const shouldRenderMoreOverlay = extraGalleryCount > 0 && index === 3;

					return (
						<Pressable
							key={`${uri}-${index}`}
							style={styles.galleryTileWrap}
							onPress={() => handleGalleryPress(index)}
						>
							<Image source={{ uri }} style={styles.galleryTile} />
							{shouldRenderMoreOverlay ? (
								<View style={styles.galleryOverlay}>
									<Feather name="plus" size={18} color="white" />
									<Text style={styles.galleryOverlayText}>
										+{extraGalleryCount}
									</Text>
								</View>
							) : null}
						</Pressable>
					);
				})}
			</View>
		</CollapsibleSection>
	);
}

const styles = StyleSheet.create({
	galleryGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		rowGap: 8,
	},
	galleryTileWrap: {
		width: "49%",
		height: 108,
		borderRadius: 10,
		overflow: "hidden",
	},
	galleryTile: {
		width: "100%",
		height: "100%",
	},
	galleryOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.45)",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	galleryOverlayText: {
		marginLeft: 4,
		fontSize: 16,
		fontWeight: "800",
		color: "white",
	},
	emptySectionText: {
		fontSize: 13,
		fontWeight: "500",
	},
});
