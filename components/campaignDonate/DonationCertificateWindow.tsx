import type { ThemeColors } from "@/app/_theme";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
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
	const expandAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;

	useEffect(() => {
		Animated.timing(expandAnim, {
			toValue: visible ? 1 : 0,
			duration: 220,
			useNativeDriver: false,
		}).start();
	}, [expandAnim, visible]);

	const animatedMaxHeight = expandAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 720],
	});

	const animatedOpacity = expandAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1],
	});

	return (
		<Animated.View
			style={[
				styles.outerWrap,
				{ maxHeight: animatedMaxHeight, opacity: animatedOpacity },
			]}
		>
			<View
				style={[
					styles.window,
					{
						borderColor: "transparent",
						backgroundColor: colors.background,
					},
				]}
			>
				<CertificateHeader colors={colors} onClose={onClose} />

				<ScrollView
					style={styles.scrollArea}
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

				<View style={styles.footerWrap}>
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
		overflow: "hidden",
		width: "100%",
	},
	window: {
		marginTop: 12,
		width: "100%",
		borderRadius: 14,
		paddingHorizontal: 14,
		paddingTop: 12,
		paddingBottom: 10,
		borderWidth: 1,
		maxHeight: "100%",
	},
	scrollArea: {
		marginTop: 2,
		maxHeight: 460,
	},
	footerWrap: {
		marginTop: 8,
	},
});
