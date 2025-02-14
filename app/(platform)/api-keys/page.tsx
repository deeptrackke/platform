import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import ApiKeysUI from "./ApiKeysUI"

export interface ApiKey {
    id: string
    name: string
    prefix: string
    createdAt: string
    lastUsed?: string
}

export default async function ApiKeysPage() {
    const session = await getSession()
    if (!session) redirect("/login")

    let apiKeys: ApiKey[] = []
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.id}/apikeys`,
            {
                headers: { Authorization: `Bearer ${session.accessToken}` },
                next: { tags: ['apikeys'] }
            }
        )
        if (!response.ok) throw new Error("Failed to fetch API keys")
        apiKeys = await response.json()
    } catch (error) {
        console.error("API Error:", error)
    }

    return <ApiKeysUI initialApiKeys={apiKeys} />
}