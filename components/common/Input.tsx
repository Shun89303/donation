import { ThemeColors } from "@/app/_theme";
import { metrics } from "@/utils/metrics";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type InputProps = {
	label: string;
	value: string;
	onChange: (v: string) => void;
	icon?: React.ReactNode;
	multiline?: boolean;
	optional?: boolean;
	colors: ThemeColors;
};

export default function Input({
	label,
	value,
	onChange,
	icon,
	multiline = false,
	optional = false,
	colors,
}: InputProps) {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View
			style={{
				marginBottom: metrics.spacingMedium,
			}}
		>
			<View
				style={[
					styles.wrapper,
					{
						borderColor: isFocused ? colors.primaryGreen : colors.secondaryGray,
						backgroundColor: colors.secondaryGray,
						borderRadius: metrics.borderRadiusMedium,
						paddingHorizontal: metrics.spacingMedium,
					},
				]}
			>
				{icon && (
					<View
						style={{
							marginRight: metrics.spacingSmall,
							...(multiline && {
								alignSelf: "flex-start",
								marginTop: metrics.spacingMedium,
							}),
						}}
					>
						{icon}
					</View>
				)}

				<TextInput
					style={[
						styles.input,
						{
							color: colors.text,
							paddingVertical: metrics.spacingMedium,
							fontSize: metrics.fontMedium,
							height: multiline
								? metrics.inputHeight.multiLineLarge
								: metrics.inputHeight.singleLine,
							// height: multiline
							// 	? metrics.lineHeightExtraLarge
							// 	: metrics.lineHeightLarge,
						},
					]}
					value={value}
					onChangeText={onChange}
					multiline={multiline}
					numberOfLines={multiline ? 4 : 1}
					textAlignVertical={multiline ? "top" : "center"}
					placeholder={`${label}${optional ? " (optional)" : ""}`}
					placeholderTextColor={colors.placeholderMuted}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
	},
	input: {
		flex: 1,
	},
});
