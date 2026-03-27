import Input from "@/components/common/Input";
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
			<Text style={[styles.stepTitle, { color: colors.text }]}>Contact</Text>

			<Input
				label="Contact Person Name"
				value={contact.personName}
				onChange={(v) => updateContact({ personName: v })}
				icon={<User size={12} color={colors.primaryGray} />}
				colors={colors}
			/>
			<Input
				label="Email Address"
				value={contact.email}
				onChange={(v) => updateContact({ email: v })}
				icon={<Mail size={12} color={colors.primaryGray} />}
				colors={colors}
			/>
			<Input
				label="Phone Number"
				value={contact.phone}
				onChange={(v) => updateContact({ phone: v })}
				icon={<Phone size={12} color={colors.primaryGray} />}
				colors={colors}
			/>
			<Input
				label="Office Location (e.g., Yangon)"
				value={contact.officeLocation}
				onChange={(v) => updateContact({ officeLocation: v })}
				icon={<MapPin size={12} color={colors.primaryGray} />}
				colors={colors}
				optional
			/>
			<Input
				label="Website"
				value={contact.website || ""}
				onChange={(v) => updateContact({ website: v })}
				icon={<Globe size={12} color={colors.primaryGray} />}
				colors={colors}
				optional
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	stepTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
	},
});
