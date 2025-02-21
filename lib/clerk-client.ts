import { createClerkClient } from "@clerk/nextjs/server";

// Check if the environment variable is present
if (!process.env.CLERK_SECRET_KEY) {
	throw new Error(
		"CLERK_SECRET_KEY is not set. Please ensure it is defined in your environment variables.",
	);
}

const clerkClient = createClerkClient({
	secretKey: process.env.CLERK_SECRET_KEY,
});

export default clerkClient;