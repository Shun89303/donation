import type { ThemeColors } from "@/app/_theme";
import Feather from "@expo/vector-icons/Feather";
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
					borderColor: colors.tabInactive,
					backgroundColor: colors.surfaceMuted,
				},
			]}
		>
			<PopPressable onPress={onToggle} style={styles.headerRow}>
				<View
					style={[styles.kycIconWrap, { backgroundColor: colors.background }]}
				>
					<Feather name="user-check" size={20} color={colors.tabActive} />
				</View>
				<View style={styles.kycTextWrap}>
					<Text style={[styles.kycTitle, { color: colors.text }]}>
						Your Information(KYC)
					</Text>
					<Text
						style={[styles.kycSubtitle, { color: colors.placeholderMuted }]}
					>
						Optional • helps with tax receipts
					</Text>
				</View>
				<Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
					<Feather
						name="chevron-down"
						size={20}
						color={colors.placeholderMuted}
					/>
				</Animated.View>
			</PopPressable>

			<Animated.View
				style={[
					styles.collapsibleWrap,
					{ maxHeight: contentMaxHeight, opacity: contentOpacity },
				]}
			>
				<View style={styles.formWrap}>
					<View>
						<Text style={[styles.inputLabel, { color: colors.text }]}>
							Full Name
						</Text>
						<TextInput
							value={fullName}
							onChangeText={onChangeFullName}
							placeholder="e.g. Aung Min Tun"
							placeholderTextColor={colors.placeholderMuted}
							style={[
								styles.input,
								{
									color: colors.text,
									borderColor: colors.tabInactive,
									backgroundColor: colors.background,
								},
							]}
						/>
					</View>
					<View>
						<Text style={[styles.inputLabel, { color: colors.text }]}>
							Email
						</Text>
						<TextInput
							value={email}
							onChangeText={onChangeEmail}
							placeholder="e.g. aung.min@example.com"
							placeholderTextColor={colors.placeholderMuted}
							keyboardType="email-address"
							autoCapitalize="none"
							style={[
								styles.input,
								{
									color: colors.text,
									borderColor: colors.tabInactive,
									backgroundColor: colors.background,
								},
							]}
						/>
					</View>
					<View>
						<Text style={[styles.inputLabel, { color: colors.text }]}>
							Phone Number
						</Text>
						<TextInput
							value={phoneNumber}
							onChangeText={onChangePhoneNumber}
							placeholder="e.g. +95 9 123 456 789"
							placeholderTextColor={colors.placeholderMuted}
							keyboardType="phone-pad"
							style={[
								styles.input,
								{
									color: colors.text,
									borderColor: colors.tabInactive,
									backgroundColor: colors.background,
								},
							]}
						/>
					</View>
				</View>

				<View
					style={[
						styles.securityBlock,
						{
							borderColor: colors.tabInactive,
							backgroundColor: colors.background,
						},
					]}
				>
					<Feather name="lock" size={16} color={colors.placeholderMuted} />
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
						. We comply with international data protection standards. Your data
						will never be shared with third parties.
					</Text>
				</View>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	block: {
		marginTop: 12,
		borderRadius: 14,
		padding: 18,
		borderWidth: 1,
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
		fontWeight: "500",
		marginTop: 2,
	},
	collapsibleWrap: {
		overflow: "hidden",
	},
	formWrap: {
		marginTop: 12,
		gap: 10,
	},
	inputLabel: {
		fontSize: 13,
		fontWeight: "700",
		marginBottom: 6,
	},
	input: {
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 11,
		fontSize: 14,
		fontWeight: "500",
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
