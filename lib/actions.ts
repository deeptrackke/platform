"use server"

import { getSession } from "@/lib/session"
import { revalidateTag } from "next/cache"

export async function createApiKey(keyName: string) {
    const session = await getSession()
    if (!session) return { success: false, error: "Not authenticated" }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.id}/create-apikey`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: keyName })
            }
        )

        if (!response.ok) throw new Error("Failed to create API key")
        
        revalidateTag("apikeys")
        const data = await response.json()
        return { success: true, apiKey: data.apiKey }
    } catch (error) {
        console.error("API Error:", error)
        return { success: false, error: (error as Error).message }
    }
}

export async function revokeApiKey(keyId: string) {
    const session = await getSession()
    if (!session) return { success: false, error: "Not authenticated" }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/apikeys/${keyId}`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${session.accessToken}` }
            }
        )

        if (!response.ok) throw new Error("Failed to revoke API key")
        
        revalidateTag("apikeys")
        return { success: true }
    } catch (error) {
        console.error("API Error:", error)
        return { success: false, error:( error as Error).message }
    }
}

export async function getApiKeys() {
    const session = await getSession()
    if (!session) return []

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/api-keys/${session.user.id}`,
            {
                headers: { Authorization: `Bearer ${session.accessToken}` },
                next: { tags: ['apikeys'] }
            }
        )

        if (!response.ok) throw new Error("Failed to fetch API keys")
        return await response.json()
    } catch (error) {
        console.error("API Error:", error)
        return []
    }
}