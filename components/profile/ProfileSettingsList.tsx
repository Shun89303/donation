import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import Feather from "@expo/vector-icons/Feather";
import type { ComponentProps, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { toCount } from "./profileUtils";

type ProfileSettingsListProps = {
	colors: ThemeColors;
	notificationCount?: number;
	language?: string;
};

function SettingRow({
	colors,
	icon,
	label,
	trailing,
	isLast,
}: {
	colors: ThemeColors;
	icon: ComponentProps<typeof Feather>["name"];
	label: string;
	trailing?: ReactNode;
	isLast?: boolean;
}) {
	return (
		<AnimatedPressable
			style={[
				styles.settingRow,
				{ borderColor: colors.profileBorder },
				isLast ? styles.lastSettingRow : null,
			]}
		>
			<View style={styles.settingLeft}>
				<Feather name={icon} size={18} color={colors.text} />
				<Text style={[styles.settingLabel, { color: colors.text }]}>{label}</Text>
			</View>
			<View style={styles.settingRight}>{trailing}</View>
		</AnimatedPressable>
	);
}

export default function ProfileSettingsList({
	colors,
	notificationCount,
	language,
}: ProfileSettingsListProps) {
	return (
		<View
			style={[
				styles.settingsCard,
				{
					backgroundColor: colors.profileCardBackground,
					borderColor: colors.profileBorder,
				},
			]}
		>
			<SettingRow
				colors={colors}
				icon="bell"
				label="Notifications"
				trailing={
					<>
						<View
							style={[
								styles.notificationDot,
								{ backgroundColor: colors.profileDanger },
							]}
						/>
						<Text style={[styles.trailingValue, { color: colors.text }]}>
							{toCount(notificationCount)}
						</Text>
						<Feather name="chevron-right" size={18} color={colors.profileLabel} />
					</>
				}
			/>
			<SettingRow
				colors={colors}
				icon="globe"
				label="Language"
				trailing={
					<>
						<Text style={[styles.trailingValue, { color: colors.text }]}>
							{language || "EN"}
						</Text>
						<Feather name="chevron-right" size={18} color={colors.profileLabel} />
					</>
				}
			/>
			<SettingRow
				colors={colors}
				icon="shield"
				label="Privacy & Security"
				trailing={<Feather name="chevron-right" size={18} color={colors.profileLabel} />}
			/>
			<SettingRow
				colors={colors}
				icon="help-circle"
				label="Help & Support"
				trailing={<Feather name="chevron-right" size={18} color={colors.profileLabel} />}
				isLast
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	settingsCard: {
		borderRadius: 18,
		borderWidth: 1,
		overflow: "hidden",
	},
	settingRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 14,
		paddingVertical: 14,
		borderBottomWidth: 1,
	},
	lastSettingRow: {
		borderBottomWidth: 0,
	},
	settingLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	settingLabel: {
		fontSize: 15,
		fontWeight: "500",
	},
	settingRight: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	trailingValue: {
		fontSize: 14,
		fontWeight: "400",
	},
	notificationDot: {
		width: 8,
		height: 8,
		borderRadius: 999,
	},
});
