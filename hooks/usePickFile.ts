import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export type FileField = "logoUri" | "verificationDocumentUri";

export function usePickFile(onPicked: (field: FileField, uri: string) => void) {
	const pickFile = async (field: FileField) => {
		if (field === "logoUri") {
			// Image case
			const permission =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (!permission.granted) {
				Alert.alert("Permission needed", "Please grant media library access.");
				return;
			}

			const mediaTypes: ImagePicker.MediaType[] = ["images"];

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.8,
			});

			if (!result.canceled && result.assets && result.assets[0]) {
				onPicked(field, result.assets[0].uri);
			}
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
