"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SuccessScreen() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">

            <div className="w-full max-w-md space-y-8 mt-8">
                {/* Logo */}
                <div className="flex justify-center items-center mb-12 space-x-2">
                    <Image
                        src="/deeptrack-logo.png"
                        alt="Deeptrack Platform Logo"
                        width={200}
                        height={50}
                        className="h-10 w-auto"
                    />
                    <Badge className="text-xs px-2 py-1 ml-2 border border-customTeal bg-transparent rounded-[8px]">
                        Platform
                    </Badge>
                </div>

                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="rounded-full border-2 border-[#00C8C8] p-3">
                        <Check className="h-6 w-6 text-[#00C8C8]" />
                    </div>
                </div>

                {/* Success Message */}
                <div className="space-y-4 text-center">
                    <h1 className="text-2xl font-semibold mb-12">Successful!</h1>
                    <p className="text-gray-400 mb-12">
                        Congratulations! Your password has been changed. Click continue to proceed to login
                    </p>
                </div>

                {/* Continue Button */}
                <Button className="w-full bg-white text-black hover:bg-gray-200" asChild>
                    <Link href="/login">Continue</Link>
                </Button>
            </div>
        </div>
    )
}

