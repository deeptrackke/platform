import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import ApiKeysUI from "./ApiKeysUI";

export interface ApiKey {
    id: number;
    keyPrefix: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    hashedKey?: string;
    ownerid?: number;
}

export default async function ApiKeysPage() {
    const session = await getSession();
    if (!session) redirect("/login");

    let apiKeys: ApiKey[] = [];
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); 

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/api-keys/${session.user.id}`,
            {
                headers: { Authorization: `Bearer ${session.accessToken}` },
                next: { tags: ["apikeys"] },
                signal: controller.signal,
            }
        );
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error("Failed to fetch API keys");
        apiKeys = await response.json();
        
    } catch (error) {
        console.error("API Error:", error);
    }

    return <ApiKeysUI initialApiKeys={apiKeys} />;
}
