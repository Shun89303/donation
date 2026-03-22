import { usePressScale } from "@/hooks/usePressScale";
import { useTheme } from "@/hooks/useTheme";
import { mainTabs, TabKey } from "@/navigation/mainTabs";
import { useTabBarConfig } from "@/navigation/tabConfig";
import { iconMap } from "@/navigation/tabIcons";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import Animated from "react-native-reanimated";

interface TabButtonProps {
	tabKey: TabKey;
	isActive: boolean;
	onPress: () => void;
	index: number;
}

export default function TabButton({
	tabKey,
	isActive,
	onPress,
	index,
}: TabButtonProps) {
	const colors = useTheme();
	const { TAB_ICON_SIZE } = useTabBarConfig();
	const IconComponent = iconMap[tabKey];
	const title = mainTabs[tabKey].title;
	const { animatedStyle, pressIn, pressOut } = usePressScale();

	return (
		<TouchableWithoutFeedback
			onPressIn={pressIn}
			onPressOut={() => {
				pressOut();
				onPress();
			}}
		>
			<Animated.View
				style={[
					animatedStyle,
					{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						paddingVertical: 4,
					},
				]}
			>
				<IconComponent
					size={TAB_ICON_SIZE}
					color={isActive ? colors.primaryGreen : colors.primaryGray}
				/>
				<Animated.Text
					style={{
						fontSize: 12, // Simplified, config can override if needed
						fontWeight: isActive ? "bold" : ("500" as const),
						color: isActive ? colors.primaryGreen : colors.primaryGray,
						marginTop: 4,
						lineHeight: 11,
					}}
				>
					{title}
				</Animated.Text>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
}
