// LocationPermission.tsx
import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import * as Location from "expo-location";
import { MapPin } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

interface LocationPermissionProps {
	onNext: () => void;
	onResult?: (
		granted: boolean,
		location: Location.LocationObject | null,
	) => void;
}

export default function LocationPermission({
	onNext,
	onResult,
}: LocationPermissionProps) {
	const colors = useTheme();
	const [permissionStatus, setPermissionStatus] = useState<
		"granted" | "denied" | "undetermined"
	>("undetermined");

	useEffect(() => {
		// check initial permission when component mounts
		checkPermissionStatus();
	}, []);

	const checkPermissionStatus = async () => {
		const { status } = await Location.getForegroundPermissionsAsync();
		setPermissionStatus(status);
	};

	const getCurrentPermissionStatus = async () => {
		const { status } = await Location.getForegroundPermissionsAsync();
		let location = null;

		if (status === "granted") {
			location = await Location.getCurrentPositionAsync({});
		}

		return {
			granted: status === "granted",
			location,
		};
	};

	const handleAllow = async () => {
		if (permissionStatus === "granted") {
			// already allowed
			Alert.alert("Location already allowed");
			const { location } = await getCurrentPermissionStatus();
			onResult?.(true, location);
			onNext();
			return;
		}

		// request permission
		const { status } = await Location.requestForegroundPermissionsAsync();
		setPermissionStatus(status);

		if (status === "granted") {
			const location = await Location.getCurrentPositionAsync({});
			onResult?.(true, location);
		} else {
			onResult?.(false, null);
		}

		onNext();
	};

	const handleSkip = () => {
		onResult?.(false, null);
		onNext();
	};

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
					backgroundColor: colors.secondaryGreen,
					padding: metrics.containerPaddingHorizontalxl,
					borderRadius: 999,
				}}
			>
				<MapPin size={metrics.thumbnailLarge} color={colors.primaryGreen} />
			</View>
			<Text
				style={{
					fontSize: metrics.fontLarge,
					fontWeight: "900",
					textAlign: "center",
				}}
			>
				Enable Location
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
				We use your location to show nearby campaigns and help you discover
				causes in your community.
			</Text>

			<TouchableOpacity
				style={{
					flexDirection: "row",
					alignItems: "center",
					backgroundColor: colors.primaryGreen,
					paddingHorizontal: metrics.containerPaddingHorizontalxxl,
					paddingVertical: metrics.containerHeightSmall,
					borderRadius: metrics.borderRadiusLarge,
					marginBottom: metrics.spacingMedium,
				}}
				onPress={handleAllow}
			>
				<MapPin
					size={metrics.iconMedium}
					color="#fff"
					style={{ marginRight: metrics.spacingMedium }}
				/>
				<Text
					style={{
						fontSize: metrics.fontMedium,
						color: "#fff",
						fontWeight: "bold",
					}}
				>
					Allow Location Access
				</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={handleSkip}>
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
