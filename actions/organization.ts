"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface CreateCompanyProps {
	name: string;
	email: string;
	phone: string;
	companyDomain: "finance" | "media";
}

export async function createCompanyAction(props: CreateCompanyProps) {
	const { userId } = await auth();

	if (!userId) redirect("/sign-in");

	const body = {
		name: props.name,
		email: props.email,
		phone: props.phone,
		companyHead: userId,
	};
	try {
		const response = await fetch(
			`${process.env.DEEPTRACK_BACKEND_URL}/v1/companies`,
			{
				method: "POST",
				body: JSON.stringify(body),
			},
		);

		if (!response.ok) {
			return {
				status: 500,
				message: "Something went wrong. Try Again",
			};
		}

		const data = await response.json();

		return {
			status: 200,
			data,
			message: "Company Created Successfully",
		};
	} catch (error) {
		throw new Error("Failed to create company");
	}
}