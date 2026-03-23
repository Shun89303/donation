import type { ThemeColors } from "@/app/_theme";
import AnimatedPressable from "@/components/common/AnimatedPressable";
import { CircleCheck, Clock, Users } from "lucide-react-native";
import { useEffect } from "react";
import {
	Image,
	Platform,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
	ViewStyle,
	type GestureResponderEvent,
} from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import type { CampaignPost } from "../campaignTypes";
import SupportButton from "./SupportButton";

type CampaignCardProps = {
	item: CampaignPost;
	colors: ThemeColors;
	onPressCard: () => void;
	onPressSupport: () => void;
	style?: ViewStyle | ViewStyle[];
};

export default function CampaignCard({
	item,
	colors,
	onPressCard,
	onPressSupport,
	style,
}: CampaignCardProps) {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();
	const isAndroid = Platform.OS === "android";
	const isTablet = screenWidth >= 800;
	const isNarrowPhone = screenWidth < 450;
	const aspectRatio = screenWidth / screenHeight;
	const isLandscape = aspectRatio > 0.75;

	// Responsive scales matching project patterns
	const sizeScale = isTablet ? 1.25 : isNarrowPhone ? 0.9 : 1.0;
	const paddingScale = isTablet ? 1.2 : isNarrowPhone ? 0.95 : 1.0;
	const fontScale = isTablet ? 1.1 : isNarrowPhone ? 0.95 : 1.0;
	const landscapeBoost = isLandscape ? 1.05 : 1.0;

	const progressValue = useSharedValue(0);

	useEffect(() => {
		progressValue.value = withTiming(item.progress * 100, {
			duration: 1000,
			easing: Easing.out(Easing.quad),
		});
	}, [item.progress]);

	const progressAnimStyle = useAnimatedStyle(
		() => ({
			width: `${progressValue.value}%`,
		}),
		[],
	);

	const handleSupportPress = (event: GestureResponderEvent) => {
		event.stopPropagation();
		onPressSupport();
	};

	return (
		<AnimatedPressable
			onPress={onPressCard}
			style={[
				{
					shadowColor: colors.panelShadow,
					borderRadius: 24 * sizeScale,
					marginTop: 14 * sizeScale * landscapeBoost,
					marginVertical: 15 * paddingScale,
					marginHorizontal: 5 * paddingScale,

					shadowOffset: { width: 0, height: 1 * sizeScale },
					shadowOpacity: 0.12,
					shadowRadius: 4 * sizeScale,

					elevation: isAndroid ? 2 * sizeScale : undefined,
				},
			]}
		>
			<View
				style={[
					dynamicStyles.campaignCard,
					{
						backgroundColor: colors.background,
						borderColor: colors.secondaryGray,
						borderRadius: 24 * sizeScale,
					},
					style,
				]}
			>
				{item.isUrgent ? (
					<View
						style={[
							dynamicStyles.urgentBadge,
							{
								backgroundColor: colors.primaryRed,
								top: 10 * sizeScale,
								left: 10 * sizeScale,
								paddingHorizontal: 10 * paddingScale,
								paddingVertical: 4 * paddingScale,
							},
						]}
					>
						<Text
							allowFontScaling={!isAndroid}
							style={[
								dynamicStyles.urgentBadgeText,
								{
									fontSize: 11 * fontScale,
									includeFontPadding: isAndroid ? false : undefined,
								},
							]}
						>
							Urgent
						</Text>
					</View>
				) : null}
				<Image
					source={{ uri: item.imageUri }}
					style={[
						dynamicStyles.campaignBanner,
						{
							height: 170 * sizeScale * landscapeBoost,
						},
					]}
				/>
				<View style={{ padding: 12 * paddingScale }}>
					<View
						style={[
							dynamicStyles.orgHeaderRow,
							{
								marginBottom: 6 * paddingScale,
							},
						]}
					>
						<Text
							style={[
								dynamicStyles.orgNameText,
								{
									color: colors.primaryGray,
									fontSize: 15 * fontScale,
									maxWidth: isNarrowPhone ? "85%" : "88%",
									includeFontPadding: isAndroid ? false : undefined,
								},
							]}
							allowFontScaling={!isAndroid}
							numberOfLines={1}
						>
							{item.orgName}
						</Text>
						<CircleCheck
							size={18 * sizeScale}
							color={colors.primaryGreen}
							style={{
								marginLeft: 6 * sizeScale,
							}}
						/>
					</View>
					<Text
						style={[
							dynamicStyles.campaignTitle,
							{
								color: colors.text,
								fontSize: 18 * fontScale,
								lineHeight: 24 * fontScale,
								includeFontPadding: isAndroid ? false : undefined,
							},
						]}
						allowFontScaling={!isAndroid}
					>
						{item.title}
					</Text>

					<View
						style={[
							dynamicStyles.progressTrack,
							{
								backgroundColor: colors.secondaryGray,
								borderColor: "transparent",
								height: 10 * sizeScale,
								borderRadius: 8 * sizeScale,
								marginTop: 12 * paddingScale,
							},
						]}
					>
						<Animated.View
							style={[
								dynamicStyles.progressFill,
								{
									backgroundColor: colors.primaryGreen,
									borderRadius: 8 * sizeScale,
								},
								progressAnimStyle,
							]}
						/>
					</View>

					<View
						style={[
							dynamicStyles.metaRow,
							{
								marginTop: 10 * paddingScale,
								justifyContent: isNarrowPhone ? "center" : "space-between",
								gap: isNarrowPhone ? 8 * paddingScale : 0,
							},
						]}
					>
						<View style={dynamicStyles.metaColumn}>
							<Text
								allowFontScaling={!isAndroid}
								style={[
									dynamicStyles.metaPrimary,
									{
										color: colors.text,
										fontSize: 14 * fontScale,
										includeFontPadding: isAndroid ? false : undefined,
									},
								]}
							>
								{item.raisedLabel}
							</Text>
							<Text
								allowFontScaling={!isAndroid}
								style={[
									dynamicStyles.metaSecondary,
									{
										color: colors.primaryGray,
										marginTop: 2 * paddingScale,
										fontSize: 12 * fontScale,
										includeFontPadding: isAndroid ? false : undefined,
									},
								]}
							>
								{item.goalLabel}
							</Text>
						</View>
						<View
							style={[dynamicStyles.metaColumn, dynamicStyles.metaColumnRight]}
						>
							<View style={dynamicStyles.metaIconLine}>
								<Users size={14 * sizeScale} color={colors.primaryGray} />
								<Text
									allowFontScaling={!isAndroid}
									style={[
										dynamicStyles.metaPrimary,

										{
											color: colors.text,
											marginLeft: 5 * sizeScale,
											fontSize: 14 * fontScale,
											includeFontPadding: isAndroid ? false : undefined,
										},
									]}
								>
									{item.donors}
								</Text>
							</View>

							<View
								style={[
									dynamicStyles.metaIconLine,
									,
									{
										marginTop: 2 * paddingScale,
									},
								]}
							>
								<Clock size={14 * sizeScale} color={colors.primaryGray} />
								<Text
									allowFontScaling={!isAndroid}
									style={[
										dynamicStyles.metaSecondary,
										{
											color: colors.primaryGray,
											marginLeft: 5 * sizeScale,
											marginTop: 2 * paddingScale,
											fontSize: 12 * fontScale,
											includeFontPadding: isAndroid ? false : undefined,
										},
									]}
								>
									{item.timeLeftLabel}
								</Text>
							</View>
						</View>
					</View>

					{item.impactType === "families" ? (
						<View
							style={[
								dynamicStyles.impactRow,
								{ marginTop: 10 * paddingScale },
							]}
						>
							<Text style={{ fontSize: 14 }}>🏠</Text>
							<Text
								allowFontScaling={!isAndroid}
								style={[
									dynamicStyles.impactText,
									{
										color: colors.primaryGray,
										fontSize: 13 * fontScale,
										marginLeft: 6 * sizeScale,
										includeFontPadding: isAndroid ? false : undefined,
									},
								]}
							>
								{item.familiesHelped}/{item.familiesTarget} families helped
							</Text>
						</View>
					) : item.impactType === "education" ? (
						<View
							style={[
								dynamicStyles.impactRow,
								{
									marginTop: 10 * paddingScale,
								},
							]}
						>
							<Text style={{ fontSize: 14 }}>🏠</Text>
							<Text
								allowFontScaling={!isAndroid}
								style={[
									dynamicStyles.impactText,
									{
										color: colors.primaryGray,
										fontSize: 13 * fontScale,
										marginLeft: 6 * sizeScale,
										includeFontPadding: isAndroid ? false : undefined,
									},
								]}
							>
								{item.educationSchools} school, {item.educationStudents}{" "}
								students
							</Text>
						</View>
					) : null}

					<SupportButton colors={colors} onPress={handleSupportPress} />
				</View>
			</View>
		</AnimatedPressable>
	);
}

const dynamicStyles = StyleSheet.create({
	campaignCard: {
		borderWidth: 0.3,
		overflow: "hidden",
	},
	urgentBadge: {
		position: "absolute",

		zIndex: 2,
		borderRadius: 999,
	},
	urgentBadgeText: {
		color: "white",
		fontWeight: "700",
		letterSpacing: 0.2,
	},
	campaignBanner: {
		width: "100%",
	},
	orgHeaderRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	orgNameText: {
		fontWeight: "500",
	},

	campaignTitle: {
		fontWeight: "700",
	},
	progressTrack: {
		borderWidth: 0.5,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
	},
	metaRow: {
		flexDirection: "row",
	},
	metaColumn: {
		flex: 1,
	},
	metaColumnRight: {
		alignItems: "flex-end",
	},
	metaIconLine: {
		flexDirection: "row",
		alignItems: "flex-end",
	},

	metaPrimary: {
		fontWeight: "700",
	},
	metaSecondary: {
		fontWeight: "500",
	},
	impactText: {
		fontWeight: "500",
	},
	impactRow: {
		flexDirection: "row",
		alignItems: "center",
	},
});
