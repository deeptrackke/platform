
export enum Role {
	ADMIN = "admin",
	USER = "user",
}

export type Customer = {
	id: string;
	fullName: string;
	passportNumber: string | null;
	dateOfBirth: Date | null;
	idNumber: number | null;
	createdAt: Date;
	checkedBy: number | null;
	frontId: FileProps | null;
	backId: FileProps | null;
	frontLicense: FileProps | null;
	backLicense: FileProps | null;
	frontPassport: FileProps | null;
	backPassport: FileProps | null;
	facePassportPhoto: FileProps | null;
	verificationResult: VerificationResult[] | null;
	uploadedDocumentDetails: string | null;
	verified: boolean;
	verifiedAt: Date | null;
};

type VerificationResult = {
	type: string;
	fraudFlag: string;
	normalizedValue?: string;
};

export interface UpdateCustomerProps {
	id: string;
	fullName?: string;
	passportNumber?: string;
	dateOfBirth?: string;
	idNumber?: number;
	checkedBy?: number;
	frontId?: FileProps;
	backId?: FileProps;
	frontLicense?: FileProps;
	backLicense?: FileProps;
	frontPassport?: FileProps;
	backPassport?: FileProps;
	facePassportPhoto?: FileProps;
	uploadedDocumentDetails?: string;
	verified?: boolean;
	verifiedAt?: string;
}

interface FileProps {
	fileId: string;
	fileUrl: string;
}