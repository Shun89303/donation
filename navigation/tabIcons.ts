import { Bell, CirclePlay, House, MapPin, User } from "lucide-react-native";
import { TabKey } from "./mainTabs";

export const iconMap: Record<TabKey, React.ComponentType<any>> = {
	index: House,
	map: MapPin,
	creators: CirclePlay as any,
	alerts: Bell,
	profile: User,
};
