import Input from "@/components/common/Input";
import { metrics } from "@/utils/metrics";
import { Globe, Mail, MapPin, Phone, User } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ContactData {
	personName: string;
	email: string;
	phone: string;
	officeLocation: string;
	website?: string;
}

interface StepTwoProps {
	contact: ContactData;
	updateContact: (updates: Partial<ContactData>) => void;
	colors: any;
}

export default function StepTwo({
	contact,
	updateContact,
	colors,
}: StepTwoProps) {
	return (
		<View>
			<Text
				style={[
					styles.stepTitle,
					{
						color: colors.text,
						fontSize: metrics.fontExtraLarge,
						marginBottom: metrics.spacingMedium,
					},
				]}
			>
				Contact
			</Text>

			<Input
				label="Contact Person Name"
				value={contact.personName}
				onChange={(v) => updateContact({ personName: v })}
				icon={<User size={metrics.iconMedium} color={colors.primaryGray} />}
				colors={colors}
			/>
			<Input
				label="Email Address"
				value={contact.email}
				onChange={(v) => updateContact({ email: v })}
				icon={<Mail size={metrics.iconMedium} color={colors.primaryGray} />}
				colors={colors}
			/>
			<Input
				label="Phone Number"
				value={contact.phone}
				onChange={(v) => updateContact({ phone: v })}
				icon={<Phone size={metrics.iconMedium} color={colors.primaryGray} />}
				colors={colors}
			/>
			<Input
				label="Office Location (e.g., Yangon)"
				value={contact.officeLocation}
				onChange={(v) => updateContact({ officeLocation: v })}
				icon={<MapPin size={metrics.iconMedium} color={colors.primaryGray} />}
				colors={colors}
				optional
			/>
			<Input
				label="Website"
				value={contact.website || ""}
				onChange={(v) => updateContact({ website: v })}
				icon={<Globe size={metrics.iconMedium} color={colors.primaryGray} />}
				colors={colors}
				optional
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	stepTitle: {
		fontWeight: "bold",
	},
});
