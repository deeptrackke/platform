"use client";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SmartDatetimeInput } from "@/components/ui/smart-datetime-input";
import { Customer } from "@/lib/type";
import {
	BasicInfoSchema,
	basicInfoSchema,
	useKycStepper,
} from "@/modules/kyc/stepper-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type DocumentType = "id" | "passport";

type ResponseData = {
	status: number;
	message: string;
};

export default function BasicInfoForm({
	userId,
	customer,
	next,
}: {
	userId: number;
	customer?: Customer;
	next?: () => void;
}) {
	const [documentType, setDocumentType] = useState<DocumentType>("id");
	const [countryName, setCountryName] = useState<string>("");
	const [stateName, setStateName] = useState<string>("");
	const stepper = useKycStepper();

	const form = useForm<BasicInfoSchema>({
		resolver: zodResolver(basicInfoSchema),
		defaultValues: {
			fullName: customer?.fullName || "",
			idNumber: customer?.idNumber || undefined,
			passportNumber: customer?.passportNumber || undefined,
			dateOfBirth: customer?.dateOfBirth || undefined,
		},
	});

	const router = useRouter();

	async function onSubmit(values: BasicInfoSchema) {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/customer`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify({
						fullName: values.fullName,
						passportNumber: values.passportNumber,
						dateOfBirth: values.dateOfBirth,
						idNumber: values.idNumber,
						checkedBy: userId,
					}),
				},
			);

			const data = (await response.json()) as ResponseData;

			if (data.status !== 200) {
				toast.error(data.message);
			} else {
				toast.success("Customer information added successfully!");
				router.refresh();
				stepper.next();
			}
		} catch (error) {
			console.error("Form submission error", error);
			toast.error("Failed to submit the form. Please try again.");
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 max-w-3xl mx-auto py-10"
			>
				{/* Document Type Selection */}
				<Card className="p-6">
					<div className="mb-4">
						<h2 className="text-lg font-semibold mb-2">Select Document Type</h2>
						<RadioGroup
							value={documentType}
							onValueChange={(value) => setDocumentType(value as DocumentType)}
							className="flex gap-4"
						>
							<div className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
								<RadioGroupItem value="id" id="id" />
								<FormLabel htmlFor="id" className="cursor-pointer">
									ID Card
								</FormLabel>
							</div>
							<div className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
								<RadioGroupItem value="passport" id="passport" />
								<FormLabel htmlFor="passport" className="cursor-pointer">
									Passport
								</FormLabel>
							</div>
						</RadioGroup>
					</div>
				</Card>

				{/* Personal Information */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input placeholder="John Doe" {...field} />
								</FormControl>
								<FormDescription>
									All the names on the id document
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="dateOfBirth"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Date of Birth</FormLabel>
								<FormControl>
									<SmartDatetimeInput
										value={field.value}
										onValueChange={field.onChange}
										placeholder="e.g. 14 Feb 1990"
									/>
								</FormControl>
								<FormDescription>
									As shown on your document. Type in natural language eg. "14
									Feb 1990"
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Conditional Document Number Field */}
					{documentType === "id" ? (
						<FormField
							control={form.control}
							name="idNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ID Number</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter ID number"
											{...field}
											onChange={(e) => field.onChange(e.target.valueAsNumber)}
											type="number"
										/>
									</FormControl>
									<FormDescription>Your national ID number</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					) : (
						<FormField
							control={form.control}
							name="passportNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Passport Number</FormLabel>
									<FormControl>
										<Input placeholder="Enter passport number" {...field} />
									</FormControl>
									<FormDescription>Your passport number</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</div>

				<div className="flex items-center justify-end">
					{!customer ? (
						<SubmitButton
							isSubmitting={form.formState.isSubmitting}
							text="Add Customer Information"
						/>
					) : (
						<Button
							type="button"
							onClick={() => {
								if (next) next();
							}}
						>
							Next
						</Button>
					)}
				</div>
			</form>
		</Form>
	);
}