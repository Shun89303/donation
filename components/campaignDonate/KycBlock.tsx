import type { ThemeColors } from "@/app/_theme";
import { ChevronDown, Lock, UserCheck } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TextInput, View } from "react-native";
import PopPressable from "./PopPressable";

type KycBlockProps = {
	colors: ThemeColors;
	isExpanded: boolean;
	onToggle: () => void;
	fullName: string;
	email: string;
	phoneNumber: string;
	onChangeFullName: (value: string) => void;
	onChangeEmail: (value: string) => void;
	onChangePhoneNumber: (value: string) => void;
	// New responsive props
	isTablet: boolean;
	paddingScale: number;
	fontScale: number;
	isAndroid: boolean;
};

export default function KycBlock({
	colors,
	isExpanded,
	onToggle,
	fullName,
	email,
	phoneNumber,
	onChangeFullName,
	onChangeEmail,
	onChangePhoneNumber,
	isTablet,
	paddingScale,
	fontScale,
	isAndroid,
}: KycBlockProps) {
	const expandAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

	useEffect(() => {
		Animated.timing(expandAnim, {
			toValue: isExpanded ? 1 : 0,
			duration: 220,
			useNativeDriver: false,
		}).start();
	}, [expandAnim, isExpanded]);

	const contentMaxHeight = expandAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, isTablet ? 480 : 360],
	});

	const contentOpacity = expandAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1],
	});

	const chevronRotate = expandAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "180deg"],
	});

	const blockPadH = Math.round(20 * paddingScale);
	const blockPadV = Math.round(25 * paddingScale);
	const blockRadius = Math.round(14 * paddingScale);
	const kycIconSize = Math.round(38 * paddingScale);
	const kycIconRadius = Math.round(10 * paddingScale);
	const kycTitleSize = Math.round(15 * fontScale);
	const kycSubtitleSize = Math.round(12 * fontScale);
	const inputLabelSize = Math.round(13 * fontScale);
	const inputFontSize = Math.round(14 * fontScale);
	const inputPadH = Math.round(12 * paddingScale);
	const inputPadV = Math.round(11 * paddingScale);
	const inputRadius = Math.round(10 * paddingScale);
	const securityPadH = Math.round(10 * paddingScale);
	const securityPadV = Math.round(6 * paddingScale);
	const securityIconSize = Math.round(16 * paddingScale);
	const securityTextSize = Math.round(12 * fontScale);
	const securityLineHeight = Math.round(18 * fontScale);
	const formWrapGap = Math.round(10 * paddingScale);
	const formPadH = Math.round(5 * paddingScale);
	const formWrapMarginTop = Math.round(12 * paddingScale);
	const kycTextMarginLeft = Math.round(10 * paddingScale);
	const inputLabelMarginBottom = Math.round(6 * paddingScale);
	const securityMarginTop = Math.round(12 * paddingScale);
	const securityTextMarginLeft = Math.round(8 * paddingScale);
	const kycSubtitleMarginTop = 2;
	const lockMarginTop = 5;

	return (
		<View
			style={[
				styles.block,
				{
					borderColor: colors.secondaryGray,
					backgroundColor: colors.background,
					shadowColor: colors.panelShadow,
					borderRadius: blockRadius,
					paddingHorizontal: blockPadH,
					paddingVertical: blockPadV,
				},
			]}
		>
			<PopPressable onPress={onToggle} style={styles.headerRow}>
				<View
					style={[
						styles.kycIconWrap,
						{
							backgroundColor: colors.secondaryGreen,
							width: kycIconSize,
							height: kycIconSize,
							borderRadius: kycIconRadius,
						},
					]}
				>
					<UserCheck
						size={Math.round(20 * paddingScale)}
						color={colors.primaryGreen}
					/>
				</View>
				<View style={[styles.kycTextWrap, { marginLeft: kycTextMarginLeft }]}>
					<Text
						style={[
							styles.kycTitle,
							{
								color: colors.text,
								fontSize: kycTitleSize,
							},
						]}
					>
						Your Information(KYC)
					</Text>
					<Text
						style={[
							styles.kycSubtitle,
							{
								color: colors.primaryGray,
								fontSize: kycSubtitleSize,
								marginTop: kycSubtitleMarginTop,
							},
						]}
					>
						Optional • helps with tax receipts
					</Text>
				</View>
				<Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
					<ChevronDown
						size={Math.round(20 * paddingScale)}
						color={colors.primaryGray}
					/>
				</Animated.View>
			</PopPressable>

			<Animated.View
				style={[
					styles.collapsibleWrap,
					{ maxHeight: contentMaxHeight, opacity: contentOpacity },
				]}
			>
				<View
					style={[
						styles.formWrap,
						{ marginTop: formWrapMarginTop, gap: formWrapGap },
					]}
				>
					<View style={[styles.form, { paddingHorizontal: formPadH }]}>
						<Text
							style={[
								styles.inputLabel,
								{
									color: colors.primaryGray,
									fontSize: inputLabelSize,
									marginBottom: inputLabelMarginBottom,
								},
							]}
						>
							Full Name
						</Text>
						<TextInput
							value={fullName}
							onChangeText={onChangeFullName}
							placeholder="e.g. Aung Min Tun"
							placeholderTextColor={colors.primaryGray}
							style={[
								styles.input,
								{
									color: colors.text,
									borderColor: colors.secondaryGray,
									backgroundColor: colors.appBackground,
									fontWeight: "300",
									fontSize: inputFontSize,
									paddingHorizontal: inputPadH,
									paddingVertical: inputPadV,
									borderRadius: inputRadius,
								},
							]}
						/>
					</View>
					<View style={[styles.form, { paddingHorizontal: formPadH }]}>
						<Text
							style={[
								styles.inputLabel,
								{
									color: colors.primaryGray,
									fontSize: inputLabelSize,
									marginBottom: inputLabelMarginBottom,
								},
							]}
						>
							Email
						</Text>
						<TextInput
							value={email}
							onChangeText={onChangeEmail}
							placeholder="e.g. aung.min@example.com"
							placeholderTextColor={colors.primaryGray}
							keyboardType="email-address"
							autoCapitalize="none"
							style={[
								styles.input,
								{
									color: colors.text,
									borderColor: colors.secondaryGray,
									backgroundColor: colors.appBackground,
									fontWeight: "300",
									fontSize: inputFontSize,
									paddingHorizontal: inputPadH,
									paddingVertical: inputPadV,
									borderRadius: inputRadius,
								},
							]}
						/>
					</View>
					<View style={[styles.form, { paddingHorizontal: formPadH }]}>
						<Text
							style={[
								styles.inputLabel,
								{
									color: colors.primaryGray,
									fontSize: inputLabelSize,
									marginBottom: inputLabelMarginBottom,
								},
							]}
						>
							Phone Number
						</Text>
						<TextInput
							value={phoneNumber}
							onChangeText={onChangePhoneNumber}
							placeholder="e.g. +95 9 123 456 789"
							placeholderTextColor={colors.primaryGray}
							keyboardType="phone-pad"
							style={[
								styles.input,
								{
									color: colors.text,
									borderColor: colors.secondaryGray,
									backgroundColor: colors.appBackground,
									fontWeight: "300",
									fontSize: inputFontSize,
									paddingHorizontal: inputPadH,
									paddingVertical: inputPadV,
									borderRadius: inputRadius,
								},
							]}
						/>
					</View>
				</View>

				<View style={styles.form}>
					<View
						style={[
							styles.securityBlock,
							{
								borderColor: colors.secondaryGray,
								backgroundColor: colors.appBackground,
								paddingHorizontal: securityPadH,
								paddingVertical: securityPadV,
								borderRadius: inputRadius,
								marginTop: securityMarginTop,
							},
						]}
					>
						<Lock
							size={securityIconSize}
							color={colors.primaryGreen}
							style={{ marginTop: lockMarginTop }}
						/>
						<Text
							style={[
								styles.securityText,
								{
									color: colors.placeholderMuted,
									fontSize: securityTextSize,
									lineHeight: securityLineHeight,
									marginLeft: securityTextMarginLeft,
								},
							]}
						>
							Your information is{" "}
							<Text style={[styles.securityTextBold, { color: colors.text }]}>
								encrypted and stored securely
							</Text>
							. We comply with international data protection standards. Your
							data will never be shared with third parties.
						</Text>
					</View>
				</View>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	block: {
		marginTop: 12,
		borderWidth: 1,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.15,
		shadowRadius: 1,
		elevation: 1,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	kycIconWrap: {
		alignItems: "center",
		justifyContent: "center",
	},
	kycTextWrap: {
		flex: 1,
		marginRight: 8,
	},
	kycTitle: {
		fontWeight: "700",
	},
	kycSubtitle: {
		fontWeight: "400",
	},
	collapsibleWrap: {
		overflow: "hidden",
	},
	formWrap: {},
	form: {},
	inputLabel: {
		fontWeight: "500",
	},
	input: {
		borderWidth: 1,
	},
	securityBlock: {
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	securityText: {
		flex: 1,
		fontWeight: "500",
	},
	securityTextBold: {
		fontWeight: "800",
	},
});
