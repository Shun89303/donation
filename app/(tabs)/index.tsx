import FadeScreen from "@/components/common/FadeScreen";
import HomeHeader from "@/components/home/HomeHeader";
import OrganizationFilters from "@/components/home/OrganizationFilters";
import SearchPanel from "@/components/home/SearchPanel";
import type { FilterKey } from "@/components/home/filterConfig";
import {
	ORGANIZATION_FILTERS,
	type OrganizationKey,
} from "@/components/home/organizationConfig";
import { useHomeAnimations } from "@/hooks/useHomeAnimations";
import { useOrganizationAnimations } from "@/hooks/useOrganizationAnimations";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
	const colors = useTheme();
	const router = useRouter();
	const [searchText, setSearchText] = useState("");
	const [selectedFilter, setSelectedFilter] = useState<FilterKey>("All");
	const [selectedOrg, setSelectedOrg] = useState<OrganizationKey>(
		ORGANIZATION_FILTERS[0].key,
	);
	const {
		isSearchPanelMounted,
		searchPanelAnim,
		filterScales,
		toggleSearch,
		closeSearch,
		animateFilterTap,
	} = useHomeAnimations();
	const { organizationScales, animateOrganizationTap } =
		useOrganizationAnimations();

	const onFilterPress = (filterKey: FilterKey) => {
		setSelectedFilter(filterKey);
		animateFilterTap(filterKey);
	};

	const onOrganizationPress = (organizationKey: OrganizationKey) => {
		setSelectedOrg(organizationKey);
		animateOrganizationTap(organizationKey);
	};

	return (
		<FadeScreen>
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<HomeHeader
					colors={colors}
					onPressSearch={toggleSearch}
					onPressProfile={() => router.replace("/profile")}
				/>
				<SearchPanel
					colors={colors}
					isMounted={isSearchPanelMounted}
					searchPanelAnim={searchPanelAnim}
					searchText={searchText}
					onChangeSearchText={setSearchText}
					onCloseSearch={closeSearch}
					selectedFilter={selectedFilter}
					onPressFilter={onFilterPress}
					filterScales={filterScales}
				/>
				<OrganizationFilters
					colors={colors}
					selectedOrg={selectedOrg}
					onPressOrganization={onOrganizationPress}
					organizationScales={organizationScales}
				/>
			</SafeAreaView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		paddingHorizontal: 20,
		paddingTop: 8,
	},
});
