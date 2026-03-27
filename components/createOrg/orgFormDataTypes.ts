export interface OrganizationFormData {
	organizationName: string;
	organizationType: "NGO" | "Charity" | "Foundation" | "Community Group";
	registrationNumber?: string;
	contact: {
		personName: string;
		email: string;
		phone: string;
		officeLocation: string;
		website?: string;
	};
	mission: {
		description: string;
		missionStatement?: string;
		verificationDocumentUri?: string;
	};
	logoUri?: string;
	agreedToTerms: boolean;
}
