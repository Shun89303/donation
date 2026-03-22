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
	Dimensions,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	useWindowDimensions,
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
	const { width: screenWidth } = useWindowDimensions();
	const screenHeight = Dimensions.get("window").height;
	const isAndroid = Platform.OS === "android";
	const isTablet = screenWidth >= 800;
	const isNarrowPhone = screenWidth < 450;
	const aspectRatio = screenWidth / screenHeight;
	const isLandscape = aspectRatio > 0.75;
	const baseItemWidth = isTablet ? 90 : isNarrowPhone ? 60 : 74;
	const baseButtonSize = baseItemWidth * 0.84;
	const sizeScale = isTablet ? 1.15 : isNarrowPhone ? 1.0 : 1.5;
	const landscapeBoost = isLandscape ? 1.05 : 1.0;
	const finalItemWidth = baseItemWidth * sizeScale * landscapeBoost;
	const finalButtonSize = baseButtonSize * sizeScale * landscapeBoost;
	const iconSize = 30 * sizeScale;
	const labelMarginTop = 6 * sizeScale;
	const labelFontSize = 12 * sizeScale;

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
						<View
							key={org.key}
							style={[styles.orgItem, { width: finalItemWidth, minWidth: 60 }]}
						>
							{isActive ? (
								<Animated.View style={{ transform: [{ scale: orgScale }] }}>
									<Pressable
										onPress={() => onPressOrganization(org.key)}
										style={[
											styles.orgIconButtonOuter,
											{
												borderColor: colors.tabActive,
												backgroundColor: colors.background,
												width: finalButtonSize,
												height: finalButtonSize,
												padding: isTablet ? 3 : 2,
												borderRadius: isTablet ? 22 : 16,
											},
										]}
									>
										<View
											style={[
												styles.orgIconButtonInner,
												{
													backgroundColor: colors.tabActive,
													borderRadius: isTablet ? 18 : 12,
												},
											]}
										>
											{React.createElement(
												getOrgIcon(org.icon as OrganizationIcon),
												{ size: iconSize, color: "white" },
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
												width: finalButtonSize,
												height: finalButtonSize,
												borderRadius: isTablet ? 22 : 16,
											},
										]}
									>
										{React.createElement(
											getOrgIcon(org.icon as OrganizationIcon),
											{ size: iconSize, color: colors[iconColor] },
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
										textAlignVertical: isAndroid ? "center" : undefined,
										marginTop: labelMarginTop,
										fontSize: labelFontSize,
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
	},
	orgIconButtonOuter: {
		borderWidth: 2,
		alignItems: "center",
		justifyContent: "center",
	},
	orgIconButtonSingle: {
		alignItems: "center",
		justifyContent: "center",
	},
	orgIconButtonInner: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	orgLabel: {
		width: "100%",
		textAlign: "center",
	},
});
