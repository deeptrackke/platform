import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Customer } from "@/lib/type";
import { format } from "date-fns";
import { Check, X } from "lucide-react";

type Props = {
	customer: Customer;
};

export default function VerifyCustomer({ customer }: Props) {
	const DocumentSection = ({
		title,
		document,
	}: {
		title: string;
		document: { fileId: string; fileUrl: string } | null;
	}) => {
		if (!document) return null;
		return (
			<div className="flex items-center gap-2 my-1">
				<span className="font-medium">{title}:</span>
				<Badge variant="outline" className="flex items-center gap-1">
					<Check className="h-3 w-3" /> Uploaded
				</Badge>
			</div>
		);
	};

	const verificationResultCleaned =
		customer.verificationResult?.map((result) => ({
			...result,
			type: result.type
				.split("_")
				.join(" ")
				.replace(/fraud signals /g, ""),
		})) || [];

	return (
		<div className="container mx-auto p-6">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Left Column - Customer Details and Documents */}
				<div className="space-y-6">
					{/* Personal Information Card */}
					<div className="bg-card rounded-lg border p-3">
						<h3 className="text-lg font-semibold mb-4">Personal Information</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							<div>
								<span className="font-medium">Full Name:</span>
								<p className="text-muted-foreground">{customer.fullName}</p>
							</div>
							<div>
								<span className="font-medium">ID Number:</span>
								<p className="text-muted-foreground">{customer.idNumber}</p>
							</div>
							<div>
								<span className="font-medium">Date of Birth:</span>
								<p className="text-muted-foreground">
									{format(new Date(customer.dateOfBirth as Date), "PPP")}
								</p>
							</div>
							<div>
								<span className="font-medium">Created At:</span>
								<p className="text-muted-foreground">
									{format(new Date(customer.createdAt), "PPP")}
								</p>
							</div>
						</div>
					</div>

					{/* Document Uploads Card */}
					<div className="bg-card rounded-lg border p-3">
						<h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<DocumentSection title="ID Front" document={customer.frontId} />
							<DocumentSection
								title="Face/Passport Photo"
								document={customer.facePassportPhoto}
							/>
							<DocumentSection title="ID Back" document={customer.backId} />

							<DocumentSection
								title="Passport Front"
								document={customer.frontPassport}
							/>
							<DocumentSection
								title="Passport Back"
								document={customer.backPassport}
							/>
							<DocumentSection
								title="License Front"
								document={customer.frontLicense}
							/>
							<DocumentSection
								title="License Back"
								document={customer.backLicense}
							/>
						</div>
					</div>

					{/* Verification Status */}
					<div className="bg-card rounded-lg border p-3">
						<h3 className="text-lg font-semibold mb-4">Current Status</h3>
						<div className="flex items-center gap-2">
							<span className="font-medium">Verification Status:</span>
							<Badge
								variant={customer.verified ? "default" : "secondary"}
								className="flex items-center gap-1"
							>
								{customer.verified ? (
									<>
										<Check className="h-3 w-3" /> Verified
									</>
								) : (
									<>
										<X className="h-3 w-3" /> Pending Verification
									</>
								)}
							</Badge>
							{customer.verifiedAt && (
								<span className="text-sm text-muted-foreground">
									at {format(new Date(customer.verifiedAt), "PPP")}
								</span>
							)}
						</div>
					</div>
				</div>

				{/* Right Column - Verification Results and OCR */}
				<div className="space-y-6">
					{/* Verification Results Card */}
					<div className="bg-card rounded-lg border p-2 capitalize">
						<h3 className="text-lg font-semibold mb-4">
							Document Verification Results
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 capitalize">
							{verificationResultCleaned?.map((result, index) => (
								<div
									key={`${index * Math.PI}`}
									className="flex items-center gap-2 bg-muted rounded-lg px-2 py-1"
								>
									<p className="font-medium uppercase">{result.type}</p>
									<Badge
										variant={
											result.fraudFlag === "PASS" ? "default" : "destructive"
										}
										className="flex items-center gap-1"
									>
										{result.fraudFlag === "PASS" ? (
											<Check className="size-4" />
										) : (
											<X className="size-4" />
										)}
										{result.fraudFlag === "PASS" ? "Pass" : "Fail"}
									</Badge>
								</div>
							))}
						</div>
					</div>

					{/* OCR Document Details Card */}
					<div className="bg-card rounded-lg border p-3 space-y-2">
						<h3 className="text-lg font-semibold mb-4">OCR Document Details</h3>
						<CardDescription>
							Details extracted from documents. Cross check with personal
							information provided.
						</CardDescription>
						<ScrollArea className="h-[300px] w-full rounded-md border px-4">
							<pre className="whitespace-pre-wrap text-sm">
								{customer.uploadedDocumentDetails}
							</pre>
						</ScrollArea>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-end gap-4">
						<Button variant="destructive">
							<X className="mr-2 h-4 w-4" /> Reject
						</Button>
						<Button variant="default">
							<Check className="mr-2 h-4 w-4" /> Approve
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
