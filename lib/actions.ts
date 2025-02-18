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

export async function revokeApiKey(apiKeyId: string) {
  try {
    const session = await getSession()
    if (!session) throw new Error("User session not found")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(
      // the apiKeyId is embedded directly in the URL.
      `${process.env.NEXT_PUBLIC_API_URL}/users/${apiKeyId}/api-keys/revoke`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        signal: controller.signal,
      }
    )
    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: errorData.error || "Failed to revoke API key",
      }
    }

    // revalidate the cache for API keys after revocation.
    revalidateTag("apikeys")
    return { success: true }
  } catch (error: unknown) {
    console.error("API Error:", error)
    return { success: false, error: (error as Error).message }
  }
}