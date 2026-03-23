import FadeScreen from "@/components/common/FadeScreen";
import CampaignFeed from "@/components/home/CampaignFeed";
import type { FilterKey } from "@/components/home/campaignFilterConfig";
import { MOCK_CAMPAIGN_POSTS } from "@/components/home/campaignMockData";
import type { CampaignPost } from "@/components/home/campaignTypes";
import HomeHeader from "@/components/home/HomeHeader";
import {
	ORGANIZATION_FILTERS,
	type OrganizationKey,
} from "@/components/home/organizationConfig";
import OrganizationFilters from "@/components/home/OrganizationFilters";
import SearchPanel from "@/components/home/SearchPanel";
import { useHomeAnimations } from "@/hooks/useHomeAnimations";
import { useOrganizationAnimations } from "@/hooks/useOrganizationAnimations";
import { useTheme } from "@/hooks/useTheme";
import { type FlashListRef } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
	const colors = useTheme();
	const router = useRouter();
	const feedListRef = useRef<FlashListRef<CampaignPost>>(null);
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

	const onCloseSearchPanel = () => {
		setSearchText("");
		closeSearch();
	};

	const visiblePosts = useMemo(() => {
		// stores user search input
		const normalizedSearch = searchText.trim().toLowerCase();

		const filteredPosts = MOCK_CAMPAIGN_POSTS.filter((post) => {
			// checks org filter selection
			const matchesOrganization =
				selectedOrg === "All" || post.orgKey === selectedOrg;

			const matchesCampaignFilter =
				selectedFilter === "All" ||
				// checks if a post is urgent
				(selectedFilter === "Urgent"
					? post.isUrgent
					: post.category === selectedFilter);

			// SEARCH INPUT or TITLE or orgNAME or CAMPAIGN category
			const matchesSearch =
				normalizedSearch.length === 0 ||
				post.title.toLowerCase().includes(normalizedSearch) ||
				post.orgName.toLowerCase().includes(normalizedSearch) ||
				post.category.toLowerCase().includes(normalizedSearch);

			return matchesOrganization && matchesCampaignFilter && matchesSearch;
		});

		// Sort urgent campaigns to top (stable sort preserves relative order)
		filteredPosts.sort((a, b) => Number(b.isUrgent) - Number(a.isUrgent));

		return filteredPosts;
	}, [searchText, selectedFilter, selectedOrg]);

	useEffect(() => {
		requestAnimationFrame(() => {
			feedListRef.current?.scrollToOffset({ offset: 0, animated: true });
		});
	}, [visiblePosts]);

	return (
		<FadeScreen>
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.appBackground }]}
			>
				<View>
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
						onCloseSearch={onCloseSearchPanel}
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
				</View>
				<CampaignFeed
					colors={colors}
					posts={visiblePosts}
					feedListRef={feedListRef}
					extraData={{ searchText, selectedFilter, selectedOrg }}
				/>
			</SafeAreaView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 8,
	},
});
