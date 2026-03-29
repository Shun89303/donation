import type { ThemeColors } from "@/app/_theme";
import globalStyles from "@/styles/styles";
import { metrics } from "@/utils/metrics";
import {
	Bell,
	ChevronRight,
	CircleHelp,
	Globe,
	Shield,
} from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import SettingRow from "../common/SettingRow";
import { toCount } from "./profileUtils";

type ProfileSettingsListProps = {
	colors: ThemeColors;
	notificationCount?: number;
	language?: string;
};

// function SettingRow({
// 	colors,
// 	icon: Icon,
// 	label,
// 	trailing,
// 	isLast,
// }: {
// 	colors: ThemeColors;
// 	icon: React.ComponentType<{ size: number; color: string }>; // Accept icon component
// 	label: string;
// 	trailing?: ReactNode;
// 	isLast?: boolean;
// }) {
// 	return (
// 		<AnimatedPressable
// 			style={[
// 				styles.settingRow,
// 				{ borderColor: colors.secondaryGray },
// 				isLast ? styles.lastSettingRow : null,
// 			]}
// 		>
// 			<View style={styles.settingLeft}>
// 				<Icon size={metrics.iconMediumLarge} color={colors.primaryGray} />
// 				<Text style={[styles.settingLabel, { color: colors.text }]}>
// 					{label}
// 				</Text>
// 			</View>
// 			<View style={styles.settingRight}>{trailing}</View>
// 		</AnimatedPressable>
// 	);
// }

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
					backgroundColor: colors.background,
					borderColor: colors.secondaryGray,
					...globalStyles.shadows,
				},
			]}
		>
			<SettingRow
				icon={Bell}
				label="Notifications"
				trailing={
					<>
						<View
							style={[
								styles.notificationDot,
								{ backgroundColor: colors.primaryRed },
							]}
						/>
						<Text style={[styles.trailingValue, { color: colors.primaryGray }]}>
							{toCount(notificationCount)}
						</Text>
						<ChevronRight
							size={metrics.iconMediumLarge}
							color={colors.profileLabel}
						/>
					</>
				}
			/>
			<SettingRow
				icon={Globe}
				label="Language"
				trailing={
					<>
						<Text style={[styles.trailingValue, { color: colors.primaryGray }]}>
							{language || "EN"}
						</Text>
						<ChevronRight
							size={metrics.iconMediumLarge}
							color={colors.profileLabel}
						/>
					</>
				}
			/>
			<SettingRow
				icon={Shield}
				label="Privacy & Security"
				trailing={
					<ChevronRight
						size={metrics.iconMediumLarge}
						color={colors.profileLabel}
					/>
				}
			/>
			<SettingRow
				icon={CircleHelp}
				label="Help & Support"
				trailing={
					<ChevronRight
						size={metrics.iconMediumLarge}
						color={colors.profileLabel}
					/>
				}
				isLast
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	settingsCard: {
		borderRadius: metrics.borderRadiusLarge,
		borderWidth: 1,
		overflow: "hidden",
	},
	settingRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: metrics.spacingMedium,
		paddingVertical: metrics.spacingMedium,
		borderBottomWidth: 1,
	},
	lastSettingRow: {
		borderBottomWidth: 0,
	},
	settingLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: metrics.spacingMedium,
	},
	settingLabel: {
		fontSize: metrics.fontLarge,
		fontWeight: "400",
	},
	settingRight: {
		flexDirection: "row",
		alignItems: "center",
		gap: metrics.spacingSmall,
	},
	trailingValue: {
		fontSize: metrics.fontSmall,
		fontWeight: "400",
	},
	notificationDot: {
		width: metrics.iconExtraSmall,
		height: metrics.iconExtraSmall,
		borderRadius: 999,
	},
});
