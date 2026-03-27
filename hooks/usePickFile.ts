import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";

export type FileField = "logoUri" | "profileImage" | "verificationDocumentUri";

export function usePickFile(onPicked: (field: FileField, uri: string) => void) {
	const openSettings = () => Linking.openSettings();

	const handlePermission = async (): Promise<boolean> => {
		const existing = await ImagePicker.getMediaLibraryPermissionsAsync();

		if (existing.granted) return true;

		// Pre-permission explanation
		return new Promise((resolve) => {
			Alert.alert(
				"Allow Photo Access",
				"We need access so you can upload images.",
				[
					{ text: "Not now", style: "cancel", onPress: () => resolve(false) },
					{
						text: "Continue",
						onPress: async () => {
							const permission =
								await ImagePicker.requestMediaLibraryPermissionsAsync();

							if (permission.granted) {
								resolve(true);
							} else if (!permission.canAskAgain) {
								Alert.alert(
									"Permission blocked",
									"Enable access from Settings to continue.",
									[
										{ text: "Cancel", style: "cancel" },
										{ text: "Open Settings", onPress: openSettings },
									],
								);
								resolve(false);
							} else {
								Alert.alert(
									"Permission needed",
									"Please allow access to continue.",
								);
								resolve(false);
							}
						},
					},
				],
			);
		});
	};

	const pickFromLibrary = async (field: FileField) => {
		const allowed = await handlePermission();
		if (!allowed) return;

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.8,
		});

		if (!result.canceled && result.assets?.[0]) {
			onPicked(field, result.assets[0].uri);
		}
	};

	const pickFromCamera = async (field: FileField) => {
		const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

		if (!cameraPermission.granted) {
			Alert.alert("Camera permission needed", "Please enable camera access.", [
				{ text: "Cancel", style: "cancel" },
				{
					text: "Open Settings",
					onPress: openSettings,
				},
			]);
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.8,
		});

		if (!result.canceled && result.assets?.[0]) {
			onPicked(field, result.assets[0].uri);
		}
	};

	const showImageOptions = (field: FileField) => {
		Alert.alert("Upload Image", "Choose an option", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "Take Photo",
				onPress: () => pickFromCamera(field),
			},
			{
				text: "Choose from Library",
				onPress: () => pickFromLibrary(field),
			},
		]);
	};

	const pickFile = async (field: FileField) => {
		// Image case
		if (field === "logoUri" || field === "profileImage") {
			showImageOptions(field);
		} else if (field === "verificationDocumentUri") {
			// PDF case
			const result: DocumentPicker.DocumentPickerResult =
				await DocumentPicker.getDocumentAsync({
					type: "application/pdf",
				});

			if (result.assets) {
				onPicked(field, result.assets[0].uri);
			}
		}
	};

	return { pickFile };
}
