"use client"

import {
	checkIdDocuments,
	getLatestCustomer,
	updateCustomer,
} from "@/_actions/customer-actions";
import EmptyState from "@/components/empty-state";
import FileUpload from "@/components/file-upload";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Customer } from "@/lib/type";
import { useKycStepper } from "@/modules/kyc/stepper-utils";
import { PenSquare } from "lucide-react";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DocumentType = "id" | "passport" | "driversLicense";

interface UploadedFile {
	url: string;
	name: string;
	key: string;
	size: number;
	type: string;
}

const getImageUrl = (
	documentType: DocumentType,
	title: string,
	customer: Customer,
) => {
	if (documentType === "passport" && title.includes("MAIN PAGE")) {
		return customer.frontPassport?.fileUrl || "";
	}
	if (documentType === "id") {
		if (title.includes("FRONT")) {
			return customer.frontId?.fileUrl || "";
		}
		if (title.includes("BACK")) {
			return customer.backId?.fileUrl || "";
		}
	} else if (documentType === "driversLicense") {
		if (title.includes("FRONT")) {
			return customer.frontLicense?.fileUrl || "";
		}
		if (title.includes("BACK")) {
			return customer.backLicense?.fileUrl || "";
		}
	}
	return "";
};

export default function VerifyIdentity({
	customer,
	next,
}: { customer: Customer; next?: () => void }) {
	const [documentType, setDocumentType] = useState<DocumentType | null>(
		customer.frontId
			? "id"
			: customer.frontLicense
				? "driversLicense"
				: customer.frontPassport
					? "passport"
					: null,
	);
	const [frontFile, setFrontFile] = useState<UploadedFile[]>([]);
	const [backFile, setBackFile] = useState<UploadedFile[]>([]);
	const [passportPhoto, setPassportPhoto] = useState<UploadedFile[]>([]);
	const [showUploadUI, setShowUploadUI] = useState<{ [key: string]: boolean }>(
		{},
	);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	// Reset files when document type changes
	const handleDocumentTypeChange = (value: DocumentType) => {
		if (value !== documentType) {
			setFrontFile([]);
			setBackFile([]);
		}
		setDocumentType(value);
	};

	const renderDocumentUpload = () => {
		const uploads = [];

		// Passport Photo is always required
		uploads.push({
			title: "YOUR PASSPORT PHOTO",
			description: "A clear, recent photo of your face",
			setter: setPassportPhoto,
			file: passportPhoto,
		});

		// Document specific uploads
		switch (documentType) {
			case "id":
				uploads.push(
					{
						title: "FRONT OF ID",
						description: "Clear photo of ID front",
						setter: setFrontFile,
						file: frontFile,
					},
					{
						title: "BACK OF ID",
						description: "Clear photo of ID back",
						setter: setBackFile,
						file: backFile,
					},
				);
				break;
			case "passport":
				uploads.push({
					title: "PASSPORT MAIN PAGE",
					description: "Clear photo of passport details page",
					setter: setFrontFile,
					file: frontFile,
				});
				break;
			case "driversLicense":
				uploads.push(
					{
						title: "FRONT OF LICENSE",
						description: "Clear photo of license front",
						setter: setFrontFile,
						file: frontFile,
					},
					{
						title: "BACK OF LICENSE",
						description: "Clear photo of license back",
						setter: setBackFile,
						file: backFile,
					},
				);
				break;
		}

		return uploads;
	};

	const isComplete = () => {
		if (!customer.facePassportPhoto) return false;

		switch (documentType) {
			case "passport":
				return !!customer.frontPassport;
			case "id":
				return !!customer.frontId && !!customer.backId;
			case "driversLicense":
				return !!customer.frontLicense && !!customer.backLicense;
			default:
				return false;
		}
	};

	useEffect(() => {
		if (customer.facePassportPhoto) {
			setPassportPhoto([
				{
					url: customer.facePassportPhoto.fileUrl,
					name: "passport photo",
					key: customer.facePassportPhoto.fileId,
					size: 0,
					type: "",
				},
			]);
		}
		if (customer.frontPassport) {
			setFrontFile([
				{
					url: customer.frontPassport.fileUrl,
					name: "passport main page",
					key: customer.frontPassport.fileId,
					size: 0,
					type: "",
				},
			]);
		}
		if (customer.frontId) {
			setFrontFile([
				{
					url: customer.frontId.fileUrl,
					name: "id front",
					key: customer.frontId.fileId,
					size: 0,
					type: "",
				},
			]);
		}
		if (customer.backId) {
			setBackFile([
				{
					url: customer.backId.fileUrl,
					name: "id back",
					key: customer.backId.fileId,
					size: 0,
					type: "",
				},
			]);
		}
		if (customer.frontLicense) {
			setFrontFile([
				{
					url: customer.frontLicense.fileUrl,
					name: "license front",
					key: customer.frontLicense.fileId,
					size: 0,
					type: "",
				},
			]);
		}
		if (customer.backLicense) {
			setBackFile([
				{
					url: customer.backLicense.fileUrl,
					name: "license back",
					key: customer.backLicense.fileId,
					size: 0,
					type: "",
				},
			]);
		}
	}, [customer]);

	const checkDocuments = async () => {
		try {
			setLoading(true);
			const data = await checkIdDocuments({
				customerId: customer.id,
				face_Image: customer.facePassportPhoto?.fileUrl as string,
				front_id_Image:
					documentType === "id"
						? (customer.frontId?.fileUrl as string)
						: documentType === "driversLicense"
							? (customer.frontLicense?.fileUrl as string)
							: (customer.frontPassport?.fileUrl as string),
				back_id_Image:
					documentType === "id"
						? (customer.backId?.fileUrl as string)
						: documentType === "driversLicense"
							? (customer.backLicense?.fileUrl as string)
							: (customer.frontPassport?.fileUrl as string),
			});

			if (data.status !== 200) {
				setLoading(false);
				toast.error(data.message);
				return;
			}

			setLoading(false);
			toast.success(data.message);
			router.refresh();
		} catch (error) {
			setLoading(false);
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const isAnyDocumentUploaded =
		customer.frontPassport ||
		customer.frontId ||
		customer.backId ||
		customer.frontLicense ||
		customer.backLicense;

	return (
		<div className="min-h-screen">
			<div className="mx-auto max-w-2xl">
				{/* Header */}
				<div className="">
					<CardTitle className="text-2xl">Verify Identity</CardTitle>
				</div>

				{/* Document Type Selection - Always visible for easy switching */}
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg">Document Type</CardTitle>
						{documentType && (
							<div className="flex items-center gap-2">
								<span className="text-sm text-muted-foreground">Selected:</span>
								<span className="rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary">
									{documentType === "id"
										? "ID Card"
										: documentType === "passport"
											? "Passport"
											: "Driver's License"}
								</span>
							</div>
						)}
					</div>
					<CardDescription>
						Choose the type of document the customer has uploaded for KYC checks
					</CardDescription>
					<div className="">
						<RadioGroup
							value={documentType || ""}
							onValueChange={(value) =>
								handleDocumentTypeChange(value as DocumentType)
							}
							className="grid grid-cols-1 gap-4 sm:grid-cols-2"
						>
							<div className="flex gap-4">
								<div className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
									<RadioGroupItem value="id" id="id" />
									<Label htmlFor="id">ID Card</Label>
								</div>
								<div className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
									<RadioGroupItem value="passport" id="passport" />
									<Label htmlFor="passport">Passport</Label>
								</div>
								<div className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
									<RadioGroupItem value="driversLicense" id="driversLicense" />
									<Label htmlFor="driversLicense">Driver's License</Label>
								</div>
							</div>
						</RadioGroup>
					</div>
				</CardHeader>

				{!isAnyDocumentUploaded && (
					<EmptyState emptyText="No document uploaded yet" />
				)}

				{/* Upload Section */}
				{documentType && (
					<>
						<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{/* Passport Photo - Always in its own column */}
							<div className="md:col-span-2">
								<Card className="overflow-hidden">
									<div className="border-b bg-muted/50 p-4">
										<h3 className="text-center font-semibold">
											YOUR PASSPORT PHOTO
										</h3>
										<p className="text-center text-sm text-muted-foreground">
											A clear, recent photo of your face
										</p>
									</div>
									<div className="p-6">
										{showUploadUI.passport ? (
											<div className="space-y-2">
												<FileUpload
													endpoint="imageUploader"
													onChange={async (data) => {
														const file = data[0];
														if (file) {
															const data = await updateCustomer({
																id: customer.id,
																facePassportPhoto: {
																	fileId: file.key,
																	fileUrl: file.url,
																},
															});

															if (data.status !== 200) {
																toast.error(data.message);
																return;
															}

															router.refresh();
															toast.success(
																"Passport photo uploaded successfully!",
															);
															const updatedCustomer = await getLatestCustomer();
															if (updatedCustomer) {
																setPassportPhoto([file]);
																setShowUploadUI((prev) => ({
																	...prev,
																	passport: false,
																}));
															}
														}
													}}
												/>
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														setShowUploadUI((prev) => ({
															...prev,
															passport: false,
														}))
													}
													className="w-full"
												>
													Cancel
												</Button>
											</div>
										) : (
											<div className="flex flex-col items-center space-y-2">
												<AspectRatio ratio={1}>
													<Image
														src={
															customer.facePassportPhoto?.fileUrl ||
															"/placeholder.png"
														}
														alt={
															customer.facePassportPhoto
																? "Passport photo"
																: "Upload placeholder"
														}
														fill
														className="rounded-lg object-cover"
													/>
												</AspectRatio>
												<Button
													variant="outline"
													size="sm"
													onClick={() =>
														setShowUploadUI((prev) => ({
															...prev,
															passport: true,
														}))
													}
													className=""
												>
													<PenSquare />
													{customer.facePassportPhoto
														? "Change Photo"
														: "Upload Photo"}
												</Button>
											</div>
										)}
									</div>
								</Card>
							</div>

							{/* Document Specific Uploads */}
							{renderDocumentUpload()
								.slice(1) // Skip passport photo as it's handled above
								.map((upload, index) => (
									<Card key={`${index * Math.PI}`} className="overflow-hidden">
										<div className="border-b bg-muted/50 p-4">
											<h3 className="text-center font-semibold">
												{upload.title}
											</h3>
											<p className="text-center text-sm text-muted-foreground">
												{upload.description}
											</p>
										</div>
										<div className="p-6">
											{showUploadUI[upload.title] ? (
												<div className="space-y-2">
													<FileUpload
														endpoint="imageUploader"
														onChange={async (data) => {
															const file = data[0];
															if (file) {
																if (
																	documentType === "passport" &&
																	upload.title.includes("MAIN PAGE")
																) {
																	const data = await updateCustomer({
																		id: customer.id,
																		frontPassport: {
																			fileId: file.key,
																			fileUrl: file.url,
																		},
																	});

																	if (data.status !== 200) {
																		toast.error(data.message);
																		return;
																	}
																	router.refresh();
																	return toast.success(
																		"Passport photo uploaded successfully!",
																	);
																}
																if (documentType === "id") {
																	if (upload.title.includes("FRONT")) {
																		const data = await updateCustomer({
																			id: customer.id,
																			frontId: {
																				fileId: file.key,
																				fileUrl: file.url,
																			},
																		});

																		if (data.status !== 200) {
																			toast.error(data.message);
																			return;
																		}

																		router.refresh();
																		return toast.success(
																			"ID Front photo uploaded successfully!",
																		);
																	}
																	if (upload.title.includes("BACK")) {
																		const data = await updateCustomer({
																			id: customer.id,
																			backId: {
																				fileId: file.key,
																				fileUrl: file.url,
																			},
																		});

																		if (data.status !== 200) {
																			toast.error(data.message);
																			return;
																		}

																		router.refresh();
																		return toast.success(
																			"ID Back photo uploaded successfully!",
																		);
																	}
																} else if (documentType === "driversLicense") {
																	if (upload.title.includes("FRONT")) {
																		const data = await updateCustomer({
																			id: customer.id,
																			frontLicense: {
																				fileId: file.key,
																				fileUrl: file.url,
																			},
																		});

																		if (data.status !== 200) {
																			toast.error(data.message);
																			return;
																		}

																		router.refresh();
																		return toast.success(
																			"License Front photo uploaded successfully!",
																		);
																	}
																	if (upload.title.includes("BACK")) {
																		const data = await updateCustomer({
																			id: customer.id,
																			backLicense: {
																				fileId: file.key,
																				fileUrl: file.url,
																			},
																		});

																		if (data.status !== 200) {
																			toast.error(data.message);
																			return;
																		}
																		router.refresh();
																		return toast.success(
																			"License Back photo uploaded successfully!",
																		);
																	}
																}

																const updatedCustomer =
																	await getLatestCustomer();
																if (updatedCustomer) {
																	upload.setter(data);
																	setShowUploadUI((prev) => ({
																		...prev,
																		[upload.title]: false,
																	}));
																}
															}
														}}
													/>
													<Button
														variant="ghost"
														size="sm"
														onClick={() =>
															setShowUploadUI((prev) => ({
																...prev,
																[upload.title]: false,
															}))
														}
														className="w-full"
													>
														Cancel
													</Button>
												</div>
											) : (
												<div className="flex flex-col items-center space-y-2">
													<AspectRatio ratio={1}>
														<Image
															src={
																getImageUrl(
																	documentType,
																	upload.title,
																	customer,
																) || "/placeholder.png"
															}
															alt={
																getImageUrl(
																	documentType,
																	upload.title,
																	customer,
																)
																	? upload.title
																	: "Upload placeholder"
															}
															fill
															className="rounded-lg object-cover"
														/>
													</AspectRatio>
													<Button
														variant="outline"
														size="sm"
														onClick={() =>
															setShowUploadUI((prev) => ({
																...prev,
																[upload.title]: true,
															}))
														}
														className=""
													>
														<PenSquare />
														{getImageUrl(documentType, upload.title, customer)
															? "Change Photo"
															: "Upload Photo"}
													</Button>
												</div>
											)}
										</div>
									</Card>
								))}
						</div>

						{/* Continue Button */}
						<div className="flex justify-end items-center gap-4">
							<Button
								onClick={async () => await checkDocuments()}
								disabled={!isComplete() || loading}
							>
								{loading ? (
									<div className="flex items-center justify-center gap-1">
										<Loader className="size-4 animate-spin" /> Checking
										Documents
									</div>
								) : (
									"Check Documents"
								)}
							</Button>
							{customer.uploadedDocumentDetails && (
								<Button type="button" onClick={() => next?.()}>
									Continue
								</Button>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
