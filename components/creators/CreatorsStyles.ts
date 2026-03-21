import { StyleSheet } from "react-native";

export const creatorsStyles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	listContent: {
		padding: 0,
	},
	card: {
		width: "100%",
		borderRadius: 0,
		overflow: "hidden",
		marginBottom: 0,
	},
	backgroundImage: {
		resizeMode: "cover",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.28)",
	},
	content: {
		flex: 1,
		justifyContent: "flex-end",
		paddingHorizontal: 16,
		paddingBottom: 18,
	},
	topRow: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
	},
	campaignContainer: {
		marginTop: 12,
	},
	leftSection: {
		flex: 1,
		paddingRight: 8,
	},
	creatorRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.35)",
	},
	creatorNameContainer: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		gap: 10,
	},
	creatorName: {
		color: "white",
		fontSize: 15,
		fontWeight: "700",
	},
	orgVerifiedIcon: {
		marginLeft: -2,
	},
	followButtonBlur: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 12,
	},
	followButton: {
		borderRadius: 12,
		overflow: "hidden",
		borderWidth: 0.5,
		borderColor: "gray",
	},
	followButtonText: {
		color: "white",
		fontSize: 12,
		fontWeight: "700",
	},
	description: {
		color: "white",
		fontSize: 14,
		lineHeight: 20,
		marginBottom: 8,
	},
	rightActions: {
		alignItems: "center",
		justifyContent: "flex-end",
		marginBottom: 2,
	},
	iconButton: {
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 24,
		gap: 4,
	},
	iconContainerBlur: {
		borderRadius: 20,
		overflow: "hidden",
	},
	iconContainer: {
		padding: 8,
	},
	iconText: {
		color: "rgba(255,255,255,0.9)",
		fontSize: 10,
		fontWeight: "600",
	},
	campaignBoxBlur: {
		borderRadius: 18,
		overflow: "hidden",
		borderWidth: 0.5,
		borderColor: "gray",
	},
	campaignBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
		paddingHorizontal: 14,
	},
	campaignTextWrap: {
		flex: 1,
		paddingRight: 12,
	},
	linkedCampaignLabel: {
		color: "rgba(255,255,255,0.78)",
		fontSize: 11,
		fontWeight: "800",
		letterSpacing: 0.8,
		marginBottom: 4,
	},
	campaignTitle: {
		color: "white",
		fontSize: 14,
		fontWeight: "700",
	},
	donateButton: {
		backgroundColor: "#4CAF50",
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 12,
	},
	donateButtonText: {
		color: "white",
		fontSize: 13,
		fontWeight: "800",
	},
});
