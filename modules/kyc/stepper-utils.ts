import { defineStepper } from "@stepperize/react";
import { z } from "zod";

const { useStepper, Scoped, utils } = defineStepper(
	{ id: "first", title: "Customer Details", stepNumber: 1 },
	{ id: "second", title: "Document Uploads", stepNumber: 2 },
	{ id: "third", title: "Customer Verification", stepNumber: 3 },
);

export const basicInfoSchema = z.object({
	fullName: z
		.string({
			message: "Customer Needs a full name",
		})
		.min(1, "Full name is required"),
	idNumber: z.coerce
		.number({
			message: "Customer Needs a valid ID number",
		})
		.optional(),
	passportNumber: z
		.string({
			message: "Customer Needs a valid passport number",
		})
		.optional(),
	dateOfBirth: z.coerce.date({
		message: "Customer Needs a valid date of birth",
	}),
});

export type BasicInfoSchema = z.infer<typeof basicInfoSchema>;

export { useStepper as useKycStepper, Scoped as KycScope, utils as kycUtils };