import { usePickFile } from "@/hooks/usePickFile";
import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { ChevronRight, User } from "lucide-react-native";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import ImageUploadBox from "../common/ImageUploadBox";

export default function Step3Profile({
	profileImage,
	setProfileImage,
	name,
	setName,
	nextStep,
}: {
	profileImage: string | null;
	setProfileImage: (val: string) => void;
	name: string;
	setName: (val: string) => void;
	nextStep: () => void;
}) {
	const colors = useTheme();

	const { pickFile } = usePickFile((field, uri) => {
		if (field === "profileImage") {
			setProfileImage(uri);
		}
	});

	return (
		<View style={styles.stepContainer}>
			<Text
				style={[
					styles.title,
					{
						fontSize: metrics.fontExtraLarge,
						alignSelf: "flex-start",
					},
				]}
			>
				Your profile
			</Text>

			<ImageUploadBox
				uri={profileImage || ""}
				onPress={() => pickFile("profileImage")}
				colors={colors}
				label="Tap to add photo"
				borderradius={metrics.borderRadiusXLarge}
			/>

			<View
				style={[
					styles.inputWithIcon,
					{
						backgroundColor: colors.secondaryGray,
						paddingVertical: metrics.spacingSmall,
						paddingHorizontal: metrics.spacingMedium,
						borderRadius: metrics.borderRadiusMedium,
					},
				]}
			>
				<User
					size={metrics.iconLarge}
					style={{ marginRight: metrics.spacingMedium }}
				/>
				<TextInput
					placeholder="Your name"
					value={name}
					onChangeText={setName}
					style={{ flex: 1, fontSize: metrics.fontMedium, fontWeight: "400" }}
				/>
			</View>

			<TouchableOpacity
				style={[
					styles.button,
					!name && styles.disabledButton,
					{
						backgroundColor: colors.primaryGreen,
						paddingVertical: metrics.spacingMedium,
						borderRadius: metrics.borderRadiusMedium,
						marginVertical: metrics.spacingMedium,
						width: "100%",
					},
				]}
				disabled={!name}
				onPress={nextStep}
			>
				<Text
					style={[
						styles.buttonText,
						{
							fontSize: metrics.fontMedium,
							color: "#fff",
						},
					]}
				>
					Get Started
				</Text>
				<ChevronRight size={metrics.iconMedium} color="#fff" />
			</TouchableOpacity>

			<TouchableOpacity style={[styles.button]} onPress={nextStep}>
				<Text
					style={[
						styles.buttonText,
						{
							fontSize: metrics.fontSmall,
							fontWeight: "400",
							color: colors.primaryGray,
						},
					]}
				>
					Skip for now
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	stepContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		gap: metrics.spacingMedium,
	},
	title: { fontWeight: "bold" },
	inputWithIcon: {
		flexDirection: "row",
		alignItems: "center",
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	disabledButton: { opacity: 0.5 },
	buttonText: { fontWeight: "bold" },
});
