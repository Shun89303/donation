import useTablet from "@/hooks/useTablet";
import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

export function useCollapsibleLayout() {
	const isTablet = useTablet();
	const { width } = useWindowDimensions();

	// Scale factor for tablets to reduce oversized UI
	const tabletScale = 0.8;

	// Dynamic layout
	return useMemo(() => {
		const cardPadding = isTablet ? 28 * tabletScale : 12;
		const cardMarginTop = isTablet ? 28 * tabletScale : 14;
		const cardBorderRadius = isTablet ? 28 * tabletScale : 14;
		const titleMarginLeft = isTablet ? 14 * tabletScale : 7;
		const titleFontSize = isTablet ? width * 0.035 * tabletScale : width * 0.04;
		const badgeMinWidth = isTablet ? 48 * tabletScale : 24;
		const badgeHeight = isTablet ? 48 * tabletScale : 24;
		const badgePaddingHorizontal = isTablet ? 14 * tabletScale : 7;
		const badgeMarginRight = isTablet ? 12 * tabletScale : 6;
		const countFontSize = isTablet
			? width * 0.025 * tabletScale
			: width * 0.035;

		return {
			cardPadding,
			cardMarginTop,
			cardBorderRadius,
			titleMarginLeft,
			titleFontSize,
			badgeMinWidth,
			badgeHeight,
			badgePaddingHorizontal,
			badgeMarginRight,
			countFontSize,
		};
	}, [isTablet]);
}
