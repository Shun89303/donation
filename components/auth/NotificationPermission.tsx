// NotificationPermission.tsx
import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import * as Notifications from "expo-notifications";
import { Bell, Camera, Heart } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NotificationPermissionProps {
	onNext: () => void;
	onResult?: (granted: boolean) => void;
}

export default function NotificationPermission({
	onNext,
	onResult,
}: NotificationPermissionProps) {
	const colors = useTheme();
	const [permissionStatus, setPermissionStatus] = useState<
		"granted" | "denied" | "undetermined"
	>("undetermined");

	useEffect(() => {
		checkPermission();
	}, []);

	const checkPermission = async () => {
		const { status } = await Notifications.getPermissionsAsync();
		setPermissionStatus(status);
	};

	const requestPermission = async () => {
		let { status } = await Notifications.getPermissionsAsync();

		if (status !== "granted") {
			const result = await Notifications.requestPermissionsAsync();
			status = result.status;
		}

		setPermissionStatus(status);

		if (status === "granted") {
			onResult?.(true);
		} else {
			onResult?.(false);
		}

		onNext();
	};

	const skipPermission = () => {
		onResult?.(false);
		onNext();
	};

	const InfoBox = ({
		Icon,
		title,
		subtitle,
		color = colors.primaryGreen,
		bgColor,
	}: {
		Icon: any;
		title: string;
		subtitle: string;
		color?: string;
		bgColor?: string;
	}) => (
		<View
			style={[
				styles.infoBox,
				{
					padding: metrics.containerPaddingHorizontalMedium,
					marginBottom: metrics.spacingMedium,
					backgroundColor: colors.secondaryGray,
					borderRadius: metrics.borderRadiusLarge,
				},
			]}
		>
			<View
				style={[
					styles.iconContainer,
					{
						backgroundColor: bgColor || colors.secondaryGreen,
						width: metrics.overlayMedium,
						height: metrics.overlayMedium,
						borderRadius: metrics.borderRadiusMedium,
						marginRight: metrics.spacingMedium,
					},
				]}
			>
				<Icon size={metrics.iconLarge} color={color} />
			</View>
			<View>
				<Text
					style={[
						styles.infoTitle,
						{
							fontSize: metrics.fontMedium,
						},
					]}
				>
					{title}
				</Text>
				<Text
					style={[
						styles.infoSubtitle,
						{
							color: colors.primaryGray,
						},
					]}
				>
					{subtitle}
				</Text>
			</View>
		</View>
	);

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				gap: metrics.spacingMedium,
			}}
		>
			<View
				style={{
					backgroundColor: colors.secondaryGold,
					padding: metrics.containerPaddingHorizontalxl,
					borderRadius: 999,
				}}
			>
				<Bell size={metrics.thumbnailLarge} color={colors.primaryGold} />
			</View>
			<Text
				style={{
					fontSize: metrics.fontLarge,
					fontWeight: "900",
					textAlign: "center",
				}}
			>
				Stay Updated
			</Text>
			<Text
				style={{
					fontSize: metrics.fontMedium,
					color: colors.primaryGray,
					marginBottom: metrics.spacingMedium,
					width: "80%",
					textAlign: "center",
				}}
			>
				Get notified about campaign updates, proofs of delivery, and when your
				donations make an impact.
			</Text>

			<InfoBox
				Icon={Heart}
				title="Campaign Updates"
				subtitle="Progress on causes you support."
				bgColor={colors.secondaryGreen}
			/>
			<InfoBox
				Icon={Camera}
				title="Proof of Delivery"
				subtitle="See your impact with photo & video."
				color={colors.primaryGold}
				bgColor={colors.secondaryGold}
			/>

			<TouchableOpacity
				style={{
					backgroundColor: colors.primaryGold,
					paddingVertical: metrics.spacingMedium,
					paddingHorizontal: metrics.spacingExtraLarge,
					borderRadius: metrics.borderRadiusLarge,
					marginBottom: metrics.spacingMedium,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
				onPress={requestPermission}
			>
				<Bell
					size={metrics.iconMedium}
					color="#fff"
					style={{ marginRight: metrics.spacingMedium }}
				/>
				<Text
					style={{
						color: "#fff",
						fontSize: metrics.fontMedium,
						fontWeight: "bold",
					}}
				>
					Enable Notifications
				</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={skipPermission}>
				<Text
					style={{
						fontSize: metrics.fontSmall,
						fontWeight: "400",
						color: colors.primaryGray,
					}}
				>
					Maybe Later
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	infoBox: {
		flexDirection: "row",
		alignItems: "center",

		width: "100%",
	},
	iconContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	infoTitle: { fontWeight: "bold" },
	infoSubtitle: {
		fontSize: metrics.fontSmall,

		fontWeight: "500",
	},
});
