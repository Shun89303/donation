import type { ThemeColors } from "@/app/_theme";
import {
	Droplets,
	GraduationCap,
	Heart,
	Mountain,
	Shield,
	Stethoscope,
} from "lucide-react-native";
import React from "react";
import {
	Animated,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	ORGANIZATION_FILTERS,
	type OrganizationIcon,
	type OrganizationKey,
} from "./organizationConfig";

type OrganizationFiltersProps = {
	colors: ThemeColors;
	selectedOrg: OrganizationKey;
	onPressOrganization: (organizationKey: OrganizationKey) => void;
	organizationScales: Record<OrganizationKey, Animated.Value>;
};

export default function OrganizationFilters({
	colors,
	selectedOrg,
	onPressOrganization,
	organizationScales,
}: OrganizationFiltersProps) {
	const isAndroid = Platform.OS === "android";

	const getOrgIcon = (iconName: OrganizationIcon): React.ComponentType<any> => {
		switch (iconName) {
			case "Heart":
				return Heart;
			case "GraduationCap":
				return GraduationCap;
			case "Stethoscope":
				return Stethoscope;
			case "Mountain":
				return Mountain;
			case "Droplets":
				return Droplets;
			case "Shield":
				return Shield;
			default:
				return Heart;
		}
	};

	const getOrgColors = (key: OrganizationKey) => {
		switch (key) {
			case "All":
				return {
					iconColor: "primaryGray" as keyof ThemeColors,
					bgColor: "secondaryGray" as keyof ThemeColors,
				};
			case "Myanmar Aid":
				return {
					iconColor: "primaryGreen" as keyof ThemeColors,
					bgColor: "secondaryGreen" as keyof ThemeColors,
				};
			case "Education MM":
				return {
					iconColor: "primaryGold" as keyof ThemeColors,
					bgColor: "secondaryGold" as keyof ThemeColors,
				};
			case "Health Bridge":
				return {
					iconColor: "primaryGreen" as keyof ThemeColors,
					bgColor: "secondaryGreen" as keyof ThemeColors,
				};
			case "Chin Alliance":
				return {
					iconColor: "primaryGray" as keyof ThemeColors,
					bgColor: "secondaryGray" as keyof ThemeColors,
				};
			case "River Aid":
				return {
					iconColor: "primaryGreen" as keyof ThemeColors,
					bgColor: "secondaryGreen" as keyof ThemeColors,
				};
			case "Kachin Relief":
				return {
					iconColor: "primaryGold" as keyof ThemeColors,
					bgColor: "secondaryGold" as keyof ThemeColors,
				};
			default:
				return {
					iconColor: "primaryGray" as keyof ThemeColors,
					bgColor: "secondaryGray" as keyof ThemeColors,
				};
		}
	};

	return (
		<View style={styles.orgFilterSection}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.orgFilterRow}
			>
				{ORGANIZATION_FILTERS.map((org) => {
					const isActive = selectedOrg === org.key;
					const orgScale = organizationScales[org.key];
					const { iconColor, bgColor } = getOrgColors(org.key);
					return (
						<View key={org.key} style={styles.orgItem}>
							{isActive ? (
								<Animated.View style={{ transform: [{ scale: orgScale }] }}>
									<Pressable
										onPress={() => onPressOrganization(org.key)}
										style={[
											styles.orgIconButtonOuter,
											{
												borderColor: colors.tabActive,
												backgroundColor: colors.background,
											},
										]}
									>
										<View
											style={[
												styles.orgIconButtonInner,
												{ backgroundColor: colors.tabActive },
											]}
										>
											{React.createElement(
												getOrgIcon(org.icon as OrganizationIcon),
												{ size: 30, color: "white" },
											)}
										</View>
									</Pressable>
								</Animated.View>
							) : (
								<Animated.View style={{ transform: [{ scale: orgScale }] }}>
									<Pressable
										onPress={() => onPressOrganization(org.key)}
										style={[
											styles.orgIconButtonSingle,
											{
												backgroundColor: colors[bgColor],
											},
										]}
									>
										{React.createElement(
											getOrgIcon(org.icon as OrganizationIcon),
											{ size: 30, color: colors[iconColor] },
										)}
									</Pressable>
								</Animated.View>
							)}
							<Text
								numberOfLines={3}
								style={[
									styles.orgLabel,
									{
										color: isActive ? colors.text : colors.onSurfaceMuted,
										includeFontPadding: isAndroid ? false : undefined,
										minWidth: 24,
									},
								]}
								maxFontSizeMultiplier={1}
								allowFontScaling={!isAndroid}
							>
								{org.label}
							</Text>
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	orgFilterSection: {
		marginTop: 12,
	},
	orgFilterRow: {
		paddingBottom: 4,
	},
	orgItem: {
		alignItems: "center",
		width: 74,
	},
	orgIconButtonOuter: {
		width: 62,
		height: 62,
		borderRadius: 16,
		borderWidth: 3,
		padding: 2,
		alignItems: "center",
		justifyContent: "center",
	},
	orgIconButtonSingle: {
		width: 62,
		height: 62,
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	orgIconButtonInner: {
		width: "100%",
		height: "100%",
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	orgLabel: {
		marginTop: 6,
		fontSize: 12,
		width: "100%",
		textAlign: "center",
	},
});
