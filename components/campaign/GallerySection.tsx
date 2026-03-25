import type { ThemeColors } from "@/app/_theme";
import { usePressScale } from "@/hooks/usePressScale";
import useTablet from "@/hooks/useTablet";
import globalStyles from "@/styles/styles";
import { ChevronDown, Image } from "lucide-react-native";
import { useMemo } from "react";
import {
	FlatList,
	Pressable,
	Image as ReactImage,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type GallerySectionProps = {
	colors: ThemeColors;
	galleryImageUris: string[];
	visibleGalleryImages: string[];
	isOpen: boolean;
	onToggle: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function GallerySection({
	colors,
	galleryImageUris,
	visibleGalleryImages,
	isOpen,
	onToggle,
}: GallerySectionProps) {
	const isTablet = useTablet();
	const { width } = useWindowDimensions();
	const { animatedStyle, pressIn, pressOut } = usePressScale();

	// Scale factor for tablets to reduce oversized UI
	const tabletScale = 0.8;

	// Dynamic layout
	const layout = useMemo(() => {
		const tileGap = isTablet ? width * 0.025 * tabletScale : width * 0.025;
		const tileBorderRadius = isTablet ? 12 * tabletScale : 12;
		const collapsibleTopPadding = isTablet ? 8 * tabletScale : 5;
		const cardHorizontalPadding = isTablet ? 28 * tabletScale : 12;

		const innerCardWidth = width - cardHorizontalPadding * 2;
		const tileWidth = (innerCardWidth - tileGap) / 2;
		const tileHeight = tileWidth * (isTablet ? 0.6 * tabletScale : 0.65);

		const previewRows = 2;
		const previewHeight =
			previewRows * tileHeight +
			(previewRows - 1) * tileGap +
			collapsibleTopPadding;

		return {
			tileGap,
			tileBorderRadius,
			tileHeight,
			previewHeight,
			collapsibleTopPadding,
			cardHorizontalPadding,
		};
	}, [width, isTablet]);

	// Expand/collapse animation
	const expandProgress = useSharedValue(isOpen ? 1 : 0);
	expandProgress.value = withTiming(isOpen ? 1 : 0, { duration: 220 });

	const collapsibleStyle = useAnimatedStyle(() => ({
		maxHeight: interpolate(
			expandProgress.value,
			[0, 1],
			[0, layout.previewHeight],
		),
		opacity: interpolate(expandProgress.value, [0, 1], [0, 1]),
	}));

	const chevronStyle = useAnimatedStyle(() => ({
		transform: [
			{ rotate: `${interpolate(expandProgress.value, [0, 1], [0, 180])}deg` },
		],
	}));

	const previewImages =
		visibleGalleryImages.length > 0
			? visibleGalleryImages
			: galleryImageUris.slice(0, 4);
	const hasNoImages = galleryImageUris.length === 0;
	const displayCount = galleryImageUris.length;

	const handlePress = () => {
		pressOut();
		onToggle();
	};

	// Dynamic font sizes
	const titleFontSize = isTablet ? width * 0.035 * tabletScale : width * 0.04;
	const countFontSize = isTablet ? width * 0.025 * tabletScale : width * 0.035;
	const emptyFontSize = isTablet ? width * 0.03 * tabletScale : width * 0.035;
	const iconSize = isTablet ? width * 0.04 * tabletScale : width * 0.05;
	const chevronSize = isTablet ? width * 0.04 * tabletScale : width * 0.045;

	return (
		<View
			style={[
				styles.card,
				{
					borderColor: colors.secondaryGray,
					backgroundColor: colors.background,
					padding: layout.cardHorizontalPadding,
					marginTop: isTablet ? 28 * tabletScale : 14,
					borderRadius: isTablet ? 28 * tabletScale : 14,
					...globalStyles.shadows,
				},
			]}
		>
			<AnimatedPressable
				style={[styles.collapsibleHeader, animatedStyle]}
				onPressIn={pressIn}
				onPressOut={pressOut}
				onPress={handlePress}
			>
				<View style={styles.sectionHeaderLeft}>
					<Image size={iconSize} color={colors.primaryGreen} />
					<Text
						style={[
							styles.sectionTitle,
							{
								color: colors.text,
								fontSize: titleFontSize,
								marginLeft: isTablet ? 14 * tabletScale : 7,
							},
						]}
					>
						Photo Gallery
					</Text>
				</View>
				<View style={styles.sectionHeaderRight}>
					<View
						style={[
							styles.countBadge,
							{
								backgroundColor: colors.secondaryGreen,
								minWidth: isTablet ? 48 * tabletScale : 24,
								height: isTablet ? 48 * tabletScale : 24,
								paddingHorizontal: isTablet ? 14 * tabletScale : 7,
								marginRight: isTablet ? 12 * tabletScale : 6,
							},
						]}
					>
						<Text
							style={[
								styles.countBadgeText,
								{ color: colors.primaryGreen, fontSize: countFontSize },
							]}
						>
							{hasNoImages ? 0 : displayCount}
						</Text>
					</View>
					<Animated.View style={chevronStyle}>
						<ChevronDown size={chevronSize} color={colors.primaryGray} />
					</Animated.View>
				</View>
			</AnimatedPressable>

			<Animated.View
				style={[
					styles.collapsibleWrap,
					{ paddingTop: layout.collapsibleTopPadding },
					collapsibleStyle,
				]}
			>
				{hasNoImages ? (
					<Text
						style={[
							styles.emptySectionText,
							{
								color: colors.primaryGray,
								fontSize: emptyFontSize,
								paddingVertical: isTablet ? 16 * tabletScale : 8,
							},
						]}
					>
						No photos uploaded yet.
					</Text>
				) : (
					<FlatList
						horizontal={false}
						data={previewImages}
						numColumns={2}
						keyExtractor={(uri, index) => `${uri}-${index}`}
						renderItem={({ item: uri }) => (
							<Pressable
								style={[
									styles.galleryTileWrap,
									{
										height: layout.tileHeight,
										borderRadius: layout.tileBorderRadius,
										marginBottom: 0,
									},
								]}
							>
								<ReactImage source={{ uri }} style={styles.galleryTile} />
							</Pressable>
						)}
						scrollEnabled={false}
						showsVerticalScrollIndicator={false}
						columnWrapperStyle={{
							justifyContent: "space-between",
							columnGap: layout.tileGap,
							marginBottom: layout.tileGap,
						}}
					/>
				)}
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: { borderWidth: 1 },
	collapsibleHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	sectionHeaderLeft: { flexDirection: "row", alignItems: "center" },
	sectionHeaderRight: { flexDirection: "row", alignItems: "center" },
	sectionTitle: { fontWeight: "700" },
	countBadge: {
		borderRadius: 999,
		alignItems: "center",
		justifyContent: "center",
	},
	countBadgeText: { fontWeight: "700" },
	collapsibleWrap: { overflow: "hidden" },
	galleryTileWrap: { width: "48.5%", overflow: "hidden" },
	galleryTile: { width: "100%", height: "100%" },
	galleryOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.45)",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	galleryOverlayText: {
		marginLeft: 4,
		fontSize: 16,
		fontWeight: "800",
		color: "white",
	},
	emptySectionText: { fontWeight: "500" },
	galleryRow: {},
});
