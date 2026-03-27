import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { ChevronRight } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";

export default function Step1PhoneInput({
	phone,
	setPhone,
	nextStep,
}: {
	phone: string;
	setPhone: (val: string) => void;
	nextStep: () => void;
}) {
	const colors = useTheme();
	return (
		<View style={styles.stepContainer}>
			<View
				style={{
					marginVertical: metrics.spacingLarge,
					gap: metrics.spacingMedium,
				}}
			>
				<Text
					style={{
						fontSize: metrics.fontLarge,
						fontWeight: "700",
					}}
				>
					Phone number
				</Text>
				<PhoneInput
					countryPickerProps={{
						renderFlagButton: undefined,
					}}
					defaultValue={phone}
					defaultCode="MM"
					layout="second"
					onChangeFormattedText={setPhone}
					containerStyle={{
						width: "100%",
						height: metrics.dimensions.height.xxl,
						backgroundColor: "transparent",
					}}
					textContainerStyle={{
						paddingVertical: 0,
						backgroundColor: colors.secondaryGray,
						paddingLeft: metrics.spacingMedium,
						borderRadius: metrics.borderRadiusMedium,
					}}
					countryPickerButtonStyle={{
						marginRight: metrics.spacingMedium,
						backgroundColor: colors.secondaryGray,
						borderRadius: metrics.borderRadiusMedium,
						width: "30%",
					}}
					codeTextStyle={{
						fontSize: metrics.fontLarge,
					}}
					textInputStyle={{
						fontSize: metrics.fontLarge,
					}}
				/>
			</View>
			<TouchableOpacity
				style={[
					styles.button,
					!phone && styles.disabledButton,
					{
						backgroundColor: colors.primaryGreen,
						padding: metrics.spacingMedium,
						borderRadius: metrics.borderRadiusMedium,
						marginBottom: metrics.spacingMedium,
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
					},
				]}
				disabled={!phone}
				onPress={nextStep}
			>
				<Text
					style={[
						styles.buttonText,
						{
							fontSize: metrics.fontLarge,
							marginRight: metrics.spacingSmall,
							color: "#fff",
						},
					]}
				>
					Continue
				</Text>
				<ChevronRight size={metrics.iconLarge} color="#fff" />
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
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	disabledButton: { opacity: 0.5 },
	buttonText: { fontWeight: "bold" },
});
