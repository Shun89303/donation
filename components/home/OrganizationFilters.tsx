import type { ThemeColors } from "@/app/_theme";
import Feather from "@expo/vector-icons/Feather";
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
											<Feather
												name={org.icon as OrganizationIcon}
												size={18}
												color="white"
											/>
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
												borderColor: colors.tabInactive,
												backgroundColor: colors.surfaceMuted,
											},
										]}
									>
										<Feather
											name={org.icon as OrganizationIcon}
											size={18}
											color={colors.onSurfaceMuted}
										/>
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
		marginRight: 10,
		width: 74,
	},
	orgIconButtonOuter: {
		width: 52,
		height: 52,
		borderRadius: 12,
		borderWidth: 3,
		padding: 2,
		alignItems: "center",
		justifyContent: "center",
	},
	orgIconButtonSingle: {
		width: 52,
		height: 52,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	orgIconButtonInner: {
		width: "100%",
		height: "100%",
		borderRadius: 8,
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
