import {
	ORGANIZATION_FILTERS,
	type OrganizationKey,
} from "@/components/home/organizationConfig";
import { useRef } from "react";
import { Animated, Easing } from "react-native";

export function useOrganizationAnimations() {
	const organizationScales = useRef<Record<OrganizationKey, Animated.Value>>(
		ORGANIZATION_FILTERS.reduce(
			(acc, org) => {
				acc[org.key] = new Animated.Value(1);
				return acc;
			},
			{} as Record<OrganizationKey, Animated.Value>,
		),
	).current;

	const animateOrganizationTap = (organizationKey: OrganizationKey) => {
		const scale = organizationScales[organizationKey];
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
		organizationScales,
		animateOrganizationTap,
	};
}
