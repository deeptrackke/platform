"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Copy, Eye, EyeOff } from "lucide-react"
import axios from "axios"
import { getSession } from "@/lib/session"

export default function ApiKeyGenerator() {
    const [apiKey, setApiKey] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [showKey, setShowKey] = useState<boolean>(false)

    useEffect(() => {
        const fetchUserId = async () => {
            const session = await getSession()
           
            setUserId(session?.user.id || null)
        }
        fetchUserId()
    }, [])

    async function handleSubmit() {
        setApiKey(null)
        setError(null)

        try {
            const session = await getSession()
           
            if (!session) {
                setError("Not authenticated")
                return
            }

            const { user, accessToken } = session
           

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}/create-apikey`, {
                ownerId: user.id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })

           
            setApiKey(response.data.apiKey) // ✅ FIXED: Correct API key assignment

            // Auto-hide after 30 seconds
            setTimeout(() => {
               
                setApiKey(null)
            }, 30000)
        } catch (error) {
            console.error("API key generation error:", error)
            setError("Failed to generate API key. Please try again.")
        }
    }

    async function handleCopy() {
        if (apiKey) {
            try {
                await navigator.clipboard.writeText(apiKey)
               
            } catch (error) {
                console.error("Failed to copy API key:", error)
            }
        }
    }

    useEffect(() => {
       
    }, [apiKey])

    if (!userId) return null

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Generate New API Key</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                    API Key will be generated for your account ID: {userId}
                </div>
                <Button onClick={handleSubmit} className="w-full">
                    Generate API Key
                </Button>
            </CardContent>
            {apiKey !== null && (
                <CardFooter className="flex flex-col items-start space-y-2">
                    <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>API Key generated successfully!</span>
                    </div>
                    <div className="w-full p-2 bg-gray-100 rounded flex justify-between items-center">
                        <span className="text-sm break-all">{showKey ? apiKey : "••••••••••••••"}</span>
                        <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => setShowKey(!showKey)}>
                                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="icon" onClick={handleCopy}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        This key will only be shown once. Please copy and store it securely.
                    </p>
                </CardFooter>
            )}
            {error && (
                <CardFooter className="text-red-600 flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                </CardFooter>
            )}
        </Card>
    )
}