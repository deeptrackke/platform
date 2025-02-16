"use client";

import { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import React from "react";
import { toast } from "sonner";

type UploadthingResponse = {
	url: string;
	name: string;
	key: string;
	size: number;
	type: string;
}[];

type Props = {
	onChange: (res: UploadthingResponse) => void;
	endpoint: keyof typeof ourFileRouter;
};

const FileUpload = ({ onChange, endpoint }: Props) => {
	return (
		<UploadDropzone
			className=" ut-label:text-lg  ut-label:italic ut-allowed-content:ut-uploading:text-primary-foreground ut-button:bg-primary ut-button:text-primary-foreground ut-button:ut-readying:bg-primary/50 ut-label:hover:text-primary/50 ut-label:text-primary bg-background  ut-button:hover:cursor-pointer"
			endpoint={endpoint}
			onClientUploadComplete={(res) => {
				onChange(
					res.map((file) => ({
						url: file.ufsUrl,
						key: file.key,
						name: file.name,
						size: file.size,
						type: file.type,
					})),
				);
			}}
			onUploadError={(error: Error) => {
				toast.error(error.message);
			}}
		/>
	);
};

export default FileUpload;