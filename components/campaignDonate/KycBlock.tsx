import type { ThemeColors } from "@/app/_theme";
import { ChevronDown, Lock, UserCheck } from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
	Animated,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
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
		outputRange: [0, 360],
	});

	const contentOpacity = expandAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1],
	});

	const chevronRotate = expandAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "180deg"],
	});

	return (
		<View
			style={[
				styles.block,
				{
					borderColor: colors.secondaryGray,
					backgroundColor: colors.background,
					shadowColor: colors.panelShadow,
				},
			]}
		>
			<PopPressable onPress={onToggle} style={styles.headerRow}>
				<View
					style={[
						styles.kycIconWrap,
						{ backgroundColor: colors.secondaryGreen },
					]}
				>
					<UserCheck size={20} color={colors.primaryGreen} />
				</View>
				<View style={styles.kycTextWrap}>
					<Text style={[styles.kycTitle, { color: colors.text }]}>
						Your Information(KYC)
					</Text>
					<Text style={[styles.kycSubtitle, { color: colors.primaryGray }]}>
						Optional • helps with tax receipts
					</Text>
				</View>
				<Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
					<ChevronDown size={20} color={colors.primaryGray} />
				</Animated.View>
			</PopPressable>

			<Animated.View
				style={[
					styles.collapsibleWrap,
					{ maxHeight: contentMaxHeight, opacity: contentOpacity },
				]}
			>
				<View style={styles.formWrap}>
					<View style={styles.form}>
						<Text style={[styles.inputLabel, { color: colors.primaryGray }]}>
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
									fontWeight: Platform.OS === "android" ? "100" : "300",
								},
							]}
						/>
					</View>
					<View style={styles.form}>
						<Text style={[styles.inputLabel, { color: colors.primaryGray }]}>
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
									fontWeight: Platform.OS === "android" ? "100" : "300",
								},
							]}
						/>
					</View>
					<View style={styles.form}>
						<Text style={[styles.inputLabel, { color: colors.primaryGray }]}>
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
									fontWeight: Platform.OS === "android" ? "100" : "300",
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
							},
						]}
					>
						<Lock
							size={16}
							color={colors.primaryGreen}
							style={{ marginTop: 5 }}
						/>
						<Text
							style={[styles.securityText, { color: colors.placeholderMuted }]}
						>
							Your information is{" "}
							<Text
								style={[
									styles.securityTextBold,
									{
										color: colors.text,
									},
								]}
							>
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
		borderRadius: 14,
		borderWidth: 1,
		paddingHorizontal: 20,
		paddingVertical: 25,
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
		width: 38,
		height: 38,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	kycTextWrap: {
		flex: 1,
		marginLeft: 10,
		marginRight: 8,
	},
	kycTitle: {
		fontSize: 15,
		fontWeight: "700",
	},
	kycSubtitle: {
		fontSize: 12,
		fontWeight: "400",
		marginTop: 2,
	},
	collapsibleWrap: {
		overflow: "hidden",
	},
	formWrap: {
		marginTop: 12,
		gap: 10,
	},
	form: {
		paddingHorizontal: 5,
	},
	inputLabel: {
		fontSize: 13,
		fontWeight: "500",
		marginBottom: 6,
	},
	input: {
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 11,
		fontSize: 14,
	},
	securityBlock: {
		marginTop: 12,
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 6,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	securityText: {
		flex: 1,
		marginLeft: 8,
		fontSize: 12,
		fontWeight: "500",
		lineHeight: 18,
	},
	securityTextBold: {
		fontWeight: "800",
	},
});
