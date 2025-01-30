"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Copy } from "lucide-react"
import { generateApiKey } from "@/lib/actions"

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Generating..." : "Generate API Key"}
        </Button>
    )
}

export default function ApiKeyGenerator() {
    const [apiKey, setApiKey] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setApiKey(null)
        setError(null)

        const result = await generateApiKey(formData)

        if (result.success) {
            setApiKey(result.apiKey)
        } else {
            setError("Failed to generate API key. Please try again.")
        }
    }

    function handleCopy() {
        if (apiKey) {
            navigator.clipboard.writeText(apiKey)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Generate New API Key</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="Enter a name for your API key" />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <SubmitButton />
                    </div>
                </form>
            </CardContent>
            {apiKey && (
                <CardFooter className="flex flex-col items-start">
                    <div className="flex items-center space-x-2 text-green-600 mb-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>API Key generated successfully!</span>
                    </div>
                    <div className="w-full p-2 bg-gray-100 rounded flex justify-between items-center">
                        <code className="text-sm">{apiKey}</code>
                        <Button variant="ghost" size="icon" onClick={handleCopy}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </CardFooter>
            )}
            {error && (
                <CardFooter>
                    <div className="flex items-center space-x-2 text-red-600">
                        <AlertCircle className="h-5 w-5" />
                        <span>{error}</span>
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}

