// utils/componentSizes.ts
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Base guideline (iPhone 12)
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

// Detect tablet
const isTablet = SCREEN_WIDTH >= 768;

// Separate scaling factors
const sizeFactor = isTablet ? 0.8 : 1; // components (subtle)
const spacingFactor = isTablet ? 1.4 : 1; // spacing (stronger)

// --------------------
// Scaling helpers
// --------------------
export const scale = (size: number) =>
	(SCREEN_WIDTH / guidelineBaseWidth) * size * sizeFactor;

export const verticalScale = (size: number) =>
	(SCREEN_HEIGHT / guidelineBaseHeight) * size * sizeFactor;

// Stronger spacing scale (for margins/paddings)
export const spacingScale = (size: number) =>
	(SCREEN_HEIGHT / guidelineBaseHeight) * size * spacingFactor;

export const moderateScale = (size: number, factor = 0.5) =>
	size + (scale(size) - size) * factor;

// --------------------
// GENERIC METRICS SYSTEM
// --------------------
export const metrics = {
	// Border radii
	borderRadiusSmall: scale(4),
	borderRadiusMedium: scale(8),
	borderRadiusLarge: scale(14),

	// Border widths
	borderThin: 1,
	borderMedium: isTablet ? 1.5 : 1,
	borderThick: isTablet ? 2 : 1.5,

	// Icons
	iconExtraSmall: scale(10),
	iconSmall: scale(12),
	iconMedium: scale(16),
	iconLarge: scale(24),
	iconXLarge: scale(32),

	// Buttons / Thumbnails / Avatars
	buttonSmall: scale(32),
	buttonMedium: scale(44),
	buttonLarge: scale(60),

	thumbnailSmall: scale(32),
	thumbnailMedium: scale(44),
	thumbnailLarge: scale(60),

	avatarSmall: scale(32),
	avatarMedium: scale(44),
	avatarLarge: scale(60),

	// Generic container dimensions
	containerHeightSmall: verticalScale(16),
	containerHeightMedium: verticalScale(24),
	containerHeightLarge: verticalScale(32),

	containerMinWidthSmall: verticalScale(16),
	containerMinWidthMedium: verticalScale(24),
	containerMinWidthLarge: verticalScale(32),

	containerPaddingHorizontalSmall: scale(4),
	containerPaddingHorizontalMedium: scale(8),
	containerPaddingHorizontalLarge: scale(12),

	// Generic overlay / placeholder size
	overlaySmall: scale(24),
	overlayMedium: scale(44),
	overlayLarge: scale(60),

	// ----------------
	// Spacing (margins & paddings)
	// ----------------
	spacingExtraSmall: spacingScale(4),
	spacingSmall: spacingScale(8),
	spacingMedium: spacingScale(12),
	spacingLarge: spacingScale(16),
	spacingExtraLarge: spacingScale(24),

	// ----------------
	// Fonts
	// ----------------
	fontExtraSmall: moderateScale(10),
	fontSmall: moderateScale(12),
	fontMedium: moderateScale(14),
	fontLarge: moderateScale(16),
	fontExtraLarge: moderateScale(20),

	// Line heights
	lineHeightExtraSmall: moderateScale(10) * 1.2,
	lineHeightSmall: moderateScale(12) * 1.2,
	lineHeightMedium: moderateScale(14) * 1.3,
	lineHeightLarge: moderateScale(16) * 1.35,
	lineHeightExtraLarge: moderateScale(20) * 1.4,
};
