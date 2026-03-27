import * as Location from "expo-location";

export function useLocationPermission() {
	const requestPermission = async () => {
		try {
			const { status } = await Location.requestForegroundPermissionsAsync();

			if (status !== "granted") {
				return { granted: false, location: null };
			}

			const location = await Location.getCurrentPositionAsync({});
			console.log("Location:", location);
			return { granted: true, location };
		} catch (error) {
			console.log("Location error:", error);
			return { granted: false, location: null };
		}
	};

	return { requestPermission };
}
