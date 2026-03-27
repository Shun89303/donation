import FadeScreen from "@/components/common/FadeScreen";
import { useTheme } from "@/hooks/useTheme";
import { metrics } from "@/utils/metrics";
import { useRouter } from "expo-router";
import {
	ArrowLeftIcon,
	CircleCheck,
	Clock,
	Mail,
	Shield,
} from "lucide-react-native";
import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

type Step = {
	title: string;
	state: "active" | "underway" | "muted";
};

export default function WaitingApproval() {
	const colors = useTheme();
	const router = useRouter();

	// Reanimated rotation
	const rotate = useSharedValue(0);

	React.useEffect(() => {
		rotate.value = 0;
		rotate.value = withRepeat(
			withTiming(360, { duration: 5000, easing: Easing.linear }),
			-1,
		);
	}, []);

	const rotationStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					rotate: `${rotate.value % 360}deg`,
				},
			],
		};
	});

	// Steps data
	const steps: Step[] = [
		{ title: "Application submitted", state: "active" },
		{ title: "Under review by team", state: "underway" },
		{ title: "Verification & approval", state: "muted" },
		{ title: "You'll be notified via email", state: "muted" },
	];

	const getIconStyle = (state: Step["state"]) => {
		switch (state) {
			case "active":
				return { backgroundColor: colors.primaryGreen };
			case "underway":
				return {
					backgroundColor: colors.secondaryGreen,
					borderWidth: 2,
					borderColor: colors.primaryGreen,
				};
			case "muted":
				return {
					backgroundColor: colors.secondaryGray,
				};
		}
	};

	const getTextStyle = (state: Step["state"]) => {
		switch (state) {
			case "active":
				return [
					styles.activeText,
					{
						color: colors.primaryGreen,
					},
				];
			case "underway":
				return [
					styles.underwayText,
					{
						color: colors.text,
					},
				];
			case "muted":
				return [
					styles.mutedText,
					{
						color: colors.primaryGray,
					},
				];
		}
	};

	const getStepIcon = (index: number, state: Step["state"], colors: any) => {
		let color = colors.primaryGray; // default for muted
		if (state === "active") color = "#fff";
		else if (state === "underway") color = colors.primaryGreen;

		switch (index) {
			case 0:
				return <CircleCheck size={metrics.iconMedium} color={color} />;
			case 1:
				return <Clock size={metrics.iconMedium} color={color} />;
			case 2:
				return <Shield size={metrics.iconMedium} color={color} />;
			case 3:
				return <Mail size={metrics.iconMedium} color={color} />;
		}
	};

	return (
		<FadeScreen>
			<ScrollView
				contentContainerStyle={[
					styles.container,
					{
						padding: metrics.spacingLarge,
						paddingTop: metrics.containerHeightLarge,
						backgroundColor: colors.appBackground,
					},
				]}
			>
				{/* Back Button */}
				<TouchableOpacity
					style={[
						styles.backButton,
						{
							paddingVertical: metrics.spacingSmall,
							marginBottom: metrics.spacingMedium,
						},
					]}
					onPress={() => router.back()}
				>
					<ArrowLeftIcon size={metrics.avatarSmall} color={colors.text} />
				</TouchableOpacity>

				{/* Rotating Clock */}
				<Animated.View
					style={[
						styles.clockContainer,
						{
							backgroundColor: colors.secondaryGreen,
							borderRadius: 999,
							padding: metrics.spacingLarge,
							marginBottom: metrics.spacingLarge,
						},
						rotationStyle,
					]}
				>
					<Clock size={metrics.avatarMedium} color={colors.primaryGreen} />
				</Animated.View>

				{/* Title & Subtitle */}
				<Text
					style={[
						styles.title,
						{
							fontSize: metrics.fontExtraLarge,
							marginBottom: metrics.spacingMedium,
						},
					]}
				>
					Awaiting Approval
				</Text>
				<Text
					style={[
						styles.subtitle,
						{
							color: colors.primaryGray,
							fontSize: metrics.fontMedium,
							marginBottom: metrics.spacingExtraLarge,
						},
					]}
				>
					We&apos;ll review your details shortly.
				</Text>

				{/* Steps Column */}
				<View
					style={[
						styles.stepsColumn,
						{
							marginLeft: metrics.spacingMedium,
							marginVertical: metrics.spacingLarge,
						},
					]}
				>
					{steps.map((step, index) => (
						<View
							key={index}
							style={[
								styles.stepRow,
								{
									marginBottom: metrics.spacingExtraLarge,
									gap: metrics.spacingMedium,
								},
							]}
						>
							{/* Icon */}
							<View
								style={[
									styles.iconWrapper,
									{
										width: metrics.containerMinWidthMedium,
										marginTop: metrics.spacingExtraSmall,
									},
								]}
							>
								<View
									style={[
										styles.iconBase,
										{
											width: metrics.iconXLarge,
											height: metrics.iconXLarge,
											borderRadius: 999,
										},
										getIconStyle(step.state),
									]}
								>
									{getStepIcon(index, step.state, colors)}
								</View>

								{/* Vertical Line */}
								{index < steps.length - 1 && (
									<View
										style={[
											styles.verticalLine,
											{
												top: metrics.topMedium,
												bottom: -metrics.bottomXLarge,
												width: metrics.borderThick,
												zIndex: -1,
												backgroundColor:
													index === 0
														? colors.primaryGreen
														: colors.secondaryGray,
											},
										]}
									/>
								)}
							</View>

							{/* Step Text */}
							<Text
								style={[
									styles.stepText,
									{
										fontSize: metrics.fontMedium,
									},
									getTextStyle(step.state),
								]}
							>
								{step.title}
							</Text>
						</View>
					))}
				</View>

				{/* Info Box */}
				<View
					style={{
						backgroundColor: colors.background,
						padding: metrics.spacingMedium,
						borderRadius: metrics.borderRadiusMedium,
						marginBottom: metrics.spacingLarge,
					}}
				>
					<Text
						style={{
							fontSize: metrics.fontLarge,
							color: colors.text,
							marginBottom: metrics.spacingSmall,
						}}
					>
						What&apos;s next?
					</Text>
					<Text
						style={{
							fontSize: metrics.fontSmall,
							color: colors.primaryGray,
							marginBottom: metrics.spacingExtraSmall,
						}}
					>
						• Review takes 2-3 business days
					</Text>
					<Text
						style={{
							fontSize: metrics.fontSmall,
							color: colors.primaryGray,
							marginBottom: metrics.spacingExtraSmall,
						}}
					>
						• You&apos;ll be notified once approved
					</Text>
				</View>

				{/* Bottom Buttons */}
				<TouchableOpacity
					style={{
						backgroundColor: colors.primaryGreen,
						paddingVertical: metrics.spacingMedium,
						borderRadius: metrics.borderRadiusLarge,
						marginBottom: metrics.spacingMedium,
					}}
					onPress={() => router.push("/")}
				>
					<Text
						style={[
							styles.bottomButtonText,
							{
								color: "#fff",
								fontWeight: "700",
								fontSize: metrics.fontMedium,
							},
						]}
					>
						Back to Sign in
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						backgroundColor: "transparent",
						paddingVertical: metrics.spacingMedium,
						borderRadius: metrics.borderRadiusLarge,
						marginBottom: metrics.spacingMedium,
					}}
					onPress={() => router.push("/")}
				>
					<Text
						style={[
							styles.bottomButtonText,
							{
								color: colors.primaryGray,
								fontWeight: "500",
								fontSize: metrics.fontMedium,
							},
						]}
					>
						Browse as Donor
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</FadeScreen>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: "100%",
	},
	backButton: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
	},
	clockContainer: {
		alignSelf: "center",
	},
	title: {
		fontWeight: "700",
		textAlign: "center",
	},
	subtitle: {
		textAlign: "center",
		fontWeight: "500",
	},
	stepsColumn: {
		flexDirection: "column",
		alignItems: "flex-start",
	},
	stepRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconContainer: {
		alignItems: "center",
		marginRight: 10,
	},
	iconBase: {
		justifyContent: "center",
		alignItems: "center",
	},
	mutedIcon: {
		backgroundColor: "#eee",
	},
	line: {
		width: 2,
		height: 10,
		flex: 1,
		marginTop: 0,
	},
	stepText: {
		fontWeight: "500",
	},
	activeText: {
		fontWeight: "500",
	},
	underwayText: {
		fontWeight: "500",
	},
	mutedText: {
		fontWeight: "500",
	},
	bottomButtonText: {
		textAlign: "center",
	},
	iconWrapper: {
		alignItems: "center",
		position: "relative",
	},

	verticalLine: {
		position: "absolute",
	},
});
