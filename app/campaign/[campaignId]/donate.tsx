import DonateFooter from "@/components/campaignDonate/DonateFooter";
import DonationAmountBlock from "@/components/campaignDonate/DonationAmountBlock";
import DonationCertificateWindow from "@/components/campaignDonate/DonationCertificateWindow";
import KycBlock from "@/components/campaignDonate/KycBlock";
import PaymentMethodBlock, {
	type PaymentMethod,
} from "@/components/campaignDonate/PaymentMethodBlock";
import { getCampaignById } from "@/components/home/campaignMockData";
import { useTheme } from "@/hooks/useTheme";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
	ArrowLeft,
	CreditCard,
	Shield,
	Smartphone,
	Wallet,
} from "lucide-react-native";
import { useMemo, useRef, useState } from "react";
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const QUICK_AMOUNTS = [10000, 50000, 100000, 500000];

function formatAmount(amount: number) {
	return amount.toLocaleString("en-US");
}

export default function CampaignDonatePage() {
	const colors = useTheme();
	const router = useRouter();
	const { campaignId } = useLocalSearchParams<{ campaignId: string }>();
	const campaign = useMemo(
		() => getCampaignById(campaignId ?? ""),
		[campaignId],
	);

	const PAYMENT_METHODS: PaymentMethod[] = [
		{
			key: "kbz_pay",
			label: "KBZ Pay",
			iconComponent: Smartphone,
			bgColor: colors.primaryLightBlue,
		},
		{
			key: "wave",
			label: "Wave",
			iconComponent: Wallet,
			bgColor: colors.primaryYellow,
		},
		{
			key: "cb_pay",
			label: "CB Pay",
			iconComponent: Smartphone,
			bgColor: colors.primaryLightGreen,
		},
		{
			key: "visa",
			label: "Visa",
			iconComponent: CreditCard,
			bgColor: colors.primaryPurple,
		},
		{
			key: "paypal",
			label: "PayPal",
			iconComponent: Wallet,
			bgColor: colors.primaryDarkBlue,
		},
		{
			key: "crypto",
			label: "Crypto",
			iconComponent: Wallet,
			bgColor: colors.primaryGold,
		},
	];

	const amountInputRef = useRef<TextInput>(null);
	const [amountInput, setAmountInput] = useState("50000");
	const [isEditingAmount, setIsEditingAmount] = useState(false);
	const [isKycExpanded, setIsKycExpanded] = useState(false);
	const [isCertificateVisible, setIsCertificateVisible] = useState(false);
	const [kycFullName, setKycFullName] = useState("");
	const [kycEmail, setKycEmail] = useState("");
	const [kycPhoneNumber, setKycPhoneNumber] = useState("");
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("kbz_pay");

	const donationAmount = Number.parseInt(amountInput || "0", 10) || 0;
	const formattedAmount = formatAmount(donationAmount);
	const donorName = kycFullName.trim() || "Anonymous Donor";
	const amountLabel = `${formattedAmount} MMK`;

	const onPressAmountValue = () => {
		setIsEditingAmount(true);
		requestAnimationFrame(() => amountInputRef.current?.focus());
	};

	const onChangeAmountInput = (value: string) => {
		const sanitized = value.replace(/[^0-9]/g, "");
		setAmountInput(sanitized);
	};

	const onBlurAmountInput = () => {
		if (!amountInput) {
			setAmountInput("50000");
		}
		setIsEditingAmount(false);
	};

	const onSelectQuickAmount = (amount: number) => {
		setAmountInput(String(amount));
		setIsEditingAmount(false);
	};

	if (!campaign) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<View style={styles.notFoundWrap}>
					<Text style={[styles.notFoundTitle, { color: colors.text }]}>
						Campaign not found
					</Text>
					<Text
						style={[
							styles.notFoundSubtitle,
							{ color: colors.placeholderMuted },
						]}
					>
						The donation target campaign is unavailable.
					</Text>
					<DonateFooter
						colors={colors}
						ctaLabel="Go Home"
						onPress={() => router.replace("/(tabs)")}
					/>
				</View>
			</SafeAreaView>
		);
	}

	const dateLabel = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date());
	const certificateCode = `DC-MMZXI${campaign.id
		.replace("campaign-", "")
		.padStart(3, "0")}`;

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={styles.headerWrap}>
				<View style={styles.headerRow}>
					<Pressable onPress={() => router.back()} style={styles.backButton}>
						<ArrowLeft size={20} color={colors.text} />
					</Pressable>
					<Text style={[styles.headerTitle, { color: colors.text }]}>
						Make a Donation
					</Text>
					<View style={styles.headerSpacer} />
				</View>
				<Text
					style={[styles.headerSubtitle, { color: colors.placeholderMuted }]}
					numberOfLines={2}
				>
					{campaign.title}
				</Text>
			</View>

			<ScrollView
				style={styles.scrollArea}
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
			>
				<DonationAmountBlock
					colors={colors}
					quickAmounts={QUICK_AMOUNTS}
					donationAmount={donationAmount}
					formattedAmount={formattedAmount}
					isEditingAmount={isEditingAmount}
					amountInput={amountInput}
					amountInputRef={amountInputRef}
					onPressAmountValue={onPressAmountValue}
					onChangeAmountInput={onChangeAmountInput}
					onBlurAmountInput={onBlurAmountInput}
					onSelectQuickAmount={onSelectQuickAmount}
					formatAmount={formatAmount}
				/>

				<KycBlock
					colors={colors}
					isExpanded={isKycExpanded}
					onToggle={() => setIsKycExpanded((prev) => !prev)}
					fullName={kycFullName}
					email={kycEmail}
					phoneNumber={kycPhoneNumber}
					onChangeFullName={setKycFullName}
					onChangeEmail={setKycEmail}
					onChangePhoneNumber={setKycPhoneNumber}
				/>

				<PaymentMethodBlock
					colors={colors}
					methods={PAYMENT_METHODS}
					selectedMethod={selectedPaymentMethod}
					onSelectMethod={setSelectedPaymentMethod}
				/>

				<View style={styles.disclaimerRow}>
					<Shield size={14} color={colors.placeholderMuted} />
					<Text
						style={[styles.disclaimerText, { color: colors.placeholderMuted }]}
					>
						100% goes to the agency. No platform fees for disaster relief.
					</Text>
				</View>
			</ScrollView>

			<DonateFooter
				colors={colors}
				ctaLabel={`Donate ${formattedAmount} MMK`}
				onPress={() => setIsCertificateVisible(true)}
			/>

			<View
				pointerEvents={isCertificateVisible ? "auto" : "none"}
				style={[
					styles.certificateOverlay,
					{
						backgroundColor: isCertificateVisible
							? "rgba(0, 0, 0, 0.35)"
							: "transparent",
					},
				]}
			>
				<Pressable
					style={styles.certificateBackdrop}
					onPress={() => setIsCertificateVisible(false)}
				/>
				<View style={styles.certificateCardWrap}>
					<DonationCertificateWindow
						colors={colors}
						visible={isCertificateVisible}
						donorName={donorName}
						amountLabel={amountLabel}
						campaignTitle={campaign.title}
						organizationName={campaign.orgName}
						dateLabel={dateLabel}
						certificateCode={certificateCode}
						onClose={() => setIsCertificateVisible(false)}
						onPressDownload={() => undefined}
						onPressShare={() => undefined}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	// ... same styles as before
	container: {
		flex: 1,
	},
	headerWrap: {
		paddingHorizontal: 16,
		paddingTop: 8,
		paddingBottom: 8,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	backButton: {
		width: 28,
		height: 28,
		alignItems: "center",
		justifyContent: "center",
	},
	headerSpacer: {
		width: 20,
		height: 20,
	},
	headerTitle: {
		fontSize: 22,
		fontWeight: "800",
	},
	headerSubtitle: {
		fontSize: 14,
		fontWeight: "500",
		lineHeight: 20,
		marginTop: 6,
	},
	scrollArea: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 16,
		paddingBottom: 14,
	},
	disclaimerRow: {
		marginTop: 14,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	disclaimerText: {
		fontSize: 12,
		fontWeight: "500",
		marginLeft: 6,
		flex: 1,
		lineHeight: 17,
	},
	notFoundWrap: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	notFoundTitle: {
		fontSize: 22,
		fontWeight: "800",
	},
	notFoundSubtitle: {
		marginTop: 8,
		fontSize: 14,
		fontWeight: "500",
		textAlign: "center",
	},
	certificateOverlay: {
		...StyleSheet.absoluteFillObject,
		zIndex: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	certificateBackdrop: {
		...StyleSheet.absoluteFillObject,
	},
	certificateCardWrap: {
		width: "92%",
		maxWidth: 440,
	},
});
