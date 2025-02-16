"use server";

import { getSession } from "@/lib/session";
import { Customer, UpdateCustomerProps } from "@/lib/type";
import axios from "axios";
import { redirect } from "next/navigation";

type Data = {
	data?: Customer;
};

type ResponseBody = {
	status: number;
	message: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data?: any;
};
export async function getLatestCustomer() {
	const session = await getSession();
	if (!session?.user.id) redirect("/login");
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/customer/latest/${session.user.id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			},
		);

		const data = (await response.json()) as Data;

		return data.data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get latest customer");
	}
}

export async function updateCustomer(customer: UpdateCustomerProps) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/customer/update`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(customer),
			},
		);

		const data = (await response.json()) as ResponseBody;
		return data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to update customer");
	}
}

// @IsNotEmpty({ message: "Cistomer Id cannot be empty" })
// @IsString({ message: "Cistomer Id must be a string" })
// customerId: string;

// @IsNotEmpty({ message: "Filename cannot be empty" })
// @IsString({ message: "Filename must be a string" })
// @MaxLength(255, { message: "Filename is too long" })
// front_id_Image: string;

// @IsNotEmpty({ message: "Filename cannot be empty" })
// @IsString({ message: "Filename must be a string" })
// @MaxLength(255, { message: "Filename is too long" })
// back_id_Image: string;

// @IsNotEmpty({ message: "Filename cannot be empty" })
// @IsString({ message: "Filename must be a string" })
// face_Image: string;

type CheckIdDocumentsProps = {
	customerId: string;
	front_id_Image: string;
	back_id_Image: string;
	face_Image: string;
};

export async function checkIdDocuments(args: CheckIdDocumentsProps) {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/kyc/deeptrackai-id`,
			args,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"x-api-key": process.env.DEEPTRACK_API_KEY,
				},
			},
		);

		const data = (await response.data) as ResponseBody;
		return data;
	} catch (error) {
		throw new Error("Failed to check id documents");
	}
}