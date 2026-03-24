import type { ThemeColors } from "@/app/_theme";
import useTablet from "@/hooks/useTablet";
import { useEffect, useRef } from "react";
import {
	Animated,
	ScrollView,
	StyleSheet,
	View,
	useWindowDimensions,
} from "react-native";
import CertificateActions from "./certificate/CertificateActions";
import CertificateDetailsBlock from "./certificate/CertificateDetailsBlock";
import CertificateHeader from "./certificate/CertificateHeader";
import CertificateThanks from "./certificate/CertificateThanks";

type DonationCertificateWindowProps = {
	colors: ThemeColors;
	visible: boolean;
	donorName: string;
	amountLabel: string;
	campaignTitle: string;
	organizationName: string;
	dateLabel: string;
	certificateCode: string;
	onClose: () => void;
	onPressDownload?: () => void;
	onPressShare?: () => void;
};

export default function DonationCertificateWindow({
	colors,
	visible,
	donorName,
	amountLabel,
	campaignTitle,
	organizationName,
	dateLabel,
	certificateCode,
	onClose,
	onPressDownload,
	onPressShare,
}: DonationCertificateWindowProps) {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const expandAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;

	const isTablet = useTablet();

	const expandedMaxHeight = Math.min(
		isTablet ? screenHeight * 0.88 : screenHeight * 0.8,
		isTablet ? 1200 : 900,
	);

	const borderRadius = isTablet ? screenWidth * 0.05 : screenWidth * 0.035;
	const paddingHorizontal = screenWidth * (isTablet ? 0.04 : 0.035);
	const paddingTop = screenHeight * (isTablet ? 0.02 : 0.015);
	const paddingBottom = screenHeight * (isTablet ? 0.018 : 0.012);
	const scrollMarginTop = isTablet
		? screenHeight * 0.004
		: screenHeight * 0.003;
	const scrollMaxHeight = isTablet ? screenHeight * 0.65 : screenHeight * 0.5;
	const certificateActionsMarginTop = isTablet
		? screenHeight * 0.01
		: screenHeight * 0.015;

	useEffect(() => {
		Animated.timing(expandAnim, {
			toValue: visible ? 1 : 0,
			duration: 220,
			useNativeDriver: false,
		}).start();
	}, [expandAnim, visible]);

	const animatedMaxHeight = expandAnim.interpolate({
		inputRange: [0, 1],
		// outputRange: [0, 720],
		outputRange: [0, expandedMaxHeight],
	});

	const animatedOpacity = expandAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1],
	});

	return (
		<Animated.View
			style={[
				styles.outerWrap,
				{
					maxHeight: animatedMaxHeight,
					opacity: animatedOpacity,
					overflow: isTablet ? "visible" : "hidden",
				},
			]}
		>
			<View
				style={[
					styles.window,
					{
						borderColor: "transparent",
						backgroundColor: colors.background,
						// borderRadius: 14,
						borderRadius,
						// paddingHorizontal: 14,
						paddingHorizontal,
						// paddingTop: 12,
						paddingTop,
						// paddingBottom: 10,
						paddingBottom,
					},
				]}
			>
				<CertificateHeader colors={colors} onClose={onClose} />

				<ScrollView
					style={{
						// marginTop: 2,
						// maxHeight: 460,
						marginTop: scrollMarginTop,
						maxHeight: scrollMaxHeight,
					}}
					showsVerticalScrollIndicator={false}
				>
					<CertificateDetailsBlock
						colors={colors}
						donorName={donorName}
						amountLabel={amountLabel}
						campaignTitle={campaignTitle}
						organizationName={organizationName}
						dateLabel={dateLabel}
						certificateCode={certificateCode}
					/>
					<CertificateThanks colors={colors} />
				</ScrollView>

				<View
					style={{
						marginTop: certificateActionsMarginTop,
					}}
				>
					<CertificateActions
						colors={colors}
						onPressDownload={onPressDownload}
						onPressShare={onPressShare}
					/>
				</View>
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	outerWrap: {
		width: "100%",
	},
	window: {
		marginTop: 12,
		width: "100%",
		borderWidth: 1,
		maxHeight: "100%",
	},
});
