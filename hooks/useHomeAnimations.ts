import {
	FILTERS,
	type FilterKey,
} from "@/components/home/campaignFilterConfig";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Platform, UIManager } from "react-native";

export function useHomeAnimations() {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isSearchPanelMounted, setIsSearchPanelMounted] = useState(false);
	const searchPanelAnim = useRef(new Animated.Value(0)).current;
	const filterScales = useRef<Record<FilterKey, Animated.Value>>(
		FILTERS.reduce(
			(acc, filter) => {
				acc[filter.key] = new Animated.Value(1);
				return acc;
			},
			{} as Record<FilterKey, Animated.Value>,
		),
	).current;

	useEffect(() => {
		if (
			Platform.OS === "android" &&
			UIManager.setLayoutAnimationEnabledExperimental
		) {
			UIManager.setLayoutAnimationEnabledExperimental?.(true);
		}
	}, []);

	const openSearch = () => {
		searchPanelAnim.stopAnimation();
		setIsSearchOpen(true);
		setIsSearchPanelMounted(true);
		searchPanelAnim.setValue(0);
		Animated.timing(searchPanelAnim, {
			toValue: 1,
			duration: 280,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true,
		}).start();
	};

	const closeSearch = () => {
		searchPanelAnim.stopAnimation();
		setIsSearchOpen(false);
		Animated.timing(searchPanelAnim, {
			toValue: 0,
			duration: 220,
			easing: Easing.in(Easing.cubic),
			useNativeDriver: true,
		}).start(({ finished }) => {
			if (finished) {
				setIsSearchPanelMounted(false);
			}
		});
	};

	const toggleSearch = () => {
		if (isSearchOpen) {
			closeSearch();
			return;
		}
		openSearch();
	};

	const animateFilterTap = (filterKey: FilterKey) => {
		const scale = filterScales[filterKey];
		scale.stopAnimation();
		scale.setValue(0.92);
		Animated.sequence([
			Animated.timing(scale, {
				toValue: 1.08,
				duration: 120,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}),
			Animated.spring(scale, {
				toValue: 1,
				friction: 5,
				tension: 170,
				useNativeDriver: true,
			}),
		]).start();
	};

	return {
		isSearchPanelMounted,
		searchPanelAnim,
		filterScales,
		toggleSearch,
		closeSearch,
		animateFilterTap,
	};
}
