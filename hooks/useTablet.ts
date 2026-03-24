import { useWindowDimensions } from "react-native";

export default function useTablet() {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();
	const shorterSide = Math.min(screenWidth, screenHeight);
	const isTablet = shorterSide >= 768;

	return isTablet;
}
