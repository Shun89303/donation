import { Play } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

type VideoPlaceholderProps = {
	size?: number;
};

const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({ size = 60 }) => {
	return (
		<View style={[styles.container, { width: size, height: size }]}>
			<View style={[styles.overlay, { width: size, height: size }]}>
				<Play color="transparent" size={size * 0.4} fill="white" />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 4,
		backgroundColor: "rgba(0,0,0,0.05)",
	},
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.4)",
		borderRadius: 4,
	},
});

export default VideoPlaceholder;
