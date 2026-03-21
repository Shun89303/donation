import FadeScreen from "@/components/common/FadeScreen";
import CreatorsPostCard from "@/components/creators/CreatorsPostCard";
import { mockPosts } from "@/components/creators/creatorsMockData";
import { useTheme } from "@/hooks/useTheme";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: screenHeight } = Dimensions.get("window");

export default function Creators() {
	const colors = useTheme();
	const insets = useSafeAreaInsets();
	const TAB_BAR_HEIGHT = 40;
	const dynamicCardHeight = screenHeight - insets.bottom - TAB_BAR_HEIGHT + 5;

	return (
		<FadeScreen>
			<FlashList
				data={mockPosts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<CreatorsPostCard
						item={item}
						colors={colors}
						cardHeight={dynamicCardHeight}
					/>
				)}
				contentContainerStyle={{ paddingBottom: 20 }}
				showsVerticalScrollIndicator={false}
				pagingEnabled
				snapToInterval={dynamicCardHeight}
				decelerationRate="fast"
			/>
		</FadeScreen>
	);
}
