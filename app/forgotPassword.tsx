import AnimatedPressable from "@/components/common/AnimatedPressable";
import BackButton from "@/components/common/BackButton";
import BackTitleHeader from "@/components/common/BackTitleHeader";
import FadeScreen from "@/components/common/FadeScreen";
import HeaderTitle from "@/components/common/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";
import globalStyles from "@/styles/styles";
import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import {
	ExternalLink,
	Info,
	Lock,
	MessageCircle,
	MessageSquare,
	Phone,
} from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const supportChannels = [
	{
		title: "Telegram",
		subtitle: "@MyanmarAidSupport",
		icon: MessageSquare,
	},
	{
		title: "Messenger",
		subtitle: "Myanmar Aid Help",
		icon: MessageCircle,
	},
	{
		title: "Viber",
		subtitle: "+95 9 123 456 789",
		icon: Phone,
	},
];

export default function ForgotPassword() {
	const router = useRouter();
	const colors = useTheme();

	return (
		<FadeScreen>
			<SafeAreaView>
				{/* Header */}
				<BackTitleHeader>
					<BackButton onPress={() => router.back()} />
					<HeaderTitle title="Forgot Password" />
				</BackTitleHeader>
				<ScrollView
					contentContainerStyle={[
						styles.container,
						{
							backgroundColor: colors.appBackground,
							gap: metrics.spacingExtraSmall,
						},
					]}
				>
					{/* Main Container */}
					<View
						style={[
							styles.mainContainer,
							{
								backgroundColor: colors.background,
								...globalStyles.shadows,
							},
						]}
					>
						<View
							style={{
								backgroundColor: colors.secondaryGreen,
								padding: metrics.spacingMedium,
								borderRadius: metrics.borderRadiusLarge,
								marginBottom: metrics.spacingSmall,
							}}
						>
							<Lock
								size={metrics.thumbnailMedium}
								color={colors.primaryGreen}
							/>
						</View>
						<Text style={styles.mainTitle}>
							Can&apos;t remember your password?
						</Text>
						<Text style={styles.mainText}>
							Contact our support team through any of the channels below.
							We&apos;ll help you reset your password securely.
						</Text>
					</View>

					{/* Contact Support Section */}
					<Text
						style={[
							styles.sectionTitle,
							{
								color: colors.primaryGray,
							},
						]}
					>
						CONTACT SUPPORT
					</Text>
					<View
						style={[
							styles.supportCard,
							{
								backgroundColor: colors.background,
								borderColor: colors.secondaryGray,
								marginBottom: metrics.spacingMedium,
								...globalStyles.shadows,
							},
						]}
					>
						{supportChannels.map((channel, index) => {
							const Icon = channel.icon;
							const isLast = index === supportChannels.length - 1;

							return (
								<AnimatedPressable
									key={channel.title}
									style={[
										styles.supportRow,
										{
											borderColor: colors.secondaryGray,
										},
										isLast && styles.lastSupportRow,
									]}
								>
									<View style={styles.supportLeft}>
										<View
											style={{
												backgroundColor:
													channel.icon === MessageSquare
														? colors.blueTelegram
														: channel.icon === MessageCircle
															? colors.blueMessenger
															: colors.purpleViber,
												padding: metrics.spacingSmall,
												borderRadius: metrics.borderRadiusMedium,
											}}
										>
											<Icon size={metrics.iconMediumLarge} color="#fff" />
										</View>

										<View>
											<Text
												style={[
													styles.supportTitle,
													{
														color: colors.text,
													},
												]}
											>
												{channel.title}
											</Text>
											<Text
												style={[
													styles.supportSubtitle,
													{
														color: colors.primaryGray,
													},
												]}
											>
												{channel.subtitle}
											</Text>
										</View>
									</View>

									<ExternalLink
										size={metrics.iconMediumLarge}
										color={colors.profileLabel}
									/>
								</AnimatedPressable>
							);
						})}
					</View>

					{/* Info Box */}
					<View
						style={[
							styles.infoBox,
							{
								backgroundColor: colors.secondaryGreen,
								borderColor: colors.darkGreen,
								borderWidth: 1,
							},
						]}
					>
						<Info
							size={metrics.iconLarge}
							color={colors.primaryGreen}
							style={{ marginRight: metrics.spacingMedium }}
						/>
						<Text
							style={[
								styles.infoText,
								{
									color: colors.text,
								},
							]}
						>
							For security, please have your{" "}
							<Text style={{ fontWeight: "800" }}>registered phone number</Text>{" "}
							ready when contacting support.
						</Text>
					</View>
				</ScrollView>
			</SafeAreaView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: metrics.spacingMedium,
		paddingBottom: metrics.spacingLarge,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: metrics.spacingLarge,
	},
	headerTitle: {
		fontSize: metrics.fontLarge,
		fontWeight: "600",
		marginLeft: metrics.spacingMedium,
	},
	mainContainer: {
		alignItems: "center",
		paddingHorizontal: metrics.spacingMedium,
		paddingVertical: metrics.spacingLarge,
		borderRadius: metrics.borderRadiusLarge,
		marginBottom: metrics.spacingLarge,
	},
	mainTitle: {
		fontSize: metrics.fontLarge,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: metrics.spacingMedium,
	},
	mainText: {
		textAlign: "center",
		color: "#6B7280",
		fontSize: metrics.fontMedium,
		fontWeight: "400",
	},
	sectionTitle: {
		fontSize: metrics.fontMedium,
		fontWeight: "400",
		marginBottom: metrics.spacingSmall,
	},
	supportCard: {
		borderRadius: metrics.borderRadiusLarge,
		borderWidth: 1,
		overflow: "hidden",
	},

	supportRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: metrics.spacingMedium,
		paddingVertical: metrics.spacingMedium,
		borderBottomWidth: 1,
	},

	lastSupportRow: {
		borderBottomWidth: 0,
	},

	supportLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: metrics.spacingMedium,
	},

	supportTitle: {
		fontSize: metrics.fontLarge,
		fontWeight: "400",
	},

	supportSubtitle: {
		fontSize: metrics.fontSmall,
		fontWeight: "400",
	},
	infoBox: {
		flexDirection: "row",
		alignItems: "center",
		padding: metrics.spacingMedium,
		borderRadius: metrics.borderRadiusLarge,
	},
	infoText: {
		fontSize: metrics.fontMedium,
		fontWeight: "500",
		flex: 1,
	},
});
