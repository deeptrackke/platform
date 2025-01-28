"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function VerifyOTP() {
    const [code, setCode] = useState(["", "", "", "", ""])
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ]

    const handleCodeChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newCode = [...code]
            newCode[index] = value
            setCode(newCode)

            // Auto-focus next input
            if (value.length === 1 && index < 4) {
                inputRefs[index + 1].current?.focus()
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs[index - 1].current?.focus()
        }
    }

    return (
        <>

            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                {/* Back Button */}
                <div className="w-full max-w-md">
                    <Link href="/login" className="inline-flex items-center text-gray-400 hover:text-white">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                </div>

                <div className="w-full max-w-md space-y-8 mt-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Image
                            src="/deeptrack-logo.png"
                            alt="Deeptrack Platform Logo"
                            width={180}
                            height={40}
                            className="h-8 w-auto"
                        />
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-semibold text-center">Verify OTP</h1>

                    {/* Description */}
                    <p className="text-center text-gray-400">
                        We sent an OTP to your email. Please enter the unique 5 digit code.
                    </p>

                    {/* Verification Code Inputs */}
                    <div className="flex justify-center gap-2">
                        {code.map((digit, index) => (
                            <Input
                                key={index}
                                ref={inputRefs[index]}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-lg bg-transparent border border-gray-800 rounded-md text-white placeholder:text-gray-500"
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <Button
                        className="w-full bg-gray-700 text-white hover:bg-gray-600"
                        disabled={!code.every((digit) => digit.length === 1)}
                    >
                        Verify OTP
                    </Button>

                    {/* Resend Email */}
                    <div className="text-center text-sm">
                        <span className="text-gray-400">Haven&apos;t got the email yet? </span>
                        <Button variant="link" className="text-[#00C8C8] p-0 h-auto font-normal hover:text-[#00C8C8]/80">
                            Resend email
                        </Button>
                    </div>
                </div>

                {/* Contact Us Link */}
                <div className="fixed bottom-4 right-4">
                    <Link href="#" className="text-sm text-[#00C8C8] hover:underline">
                        Contact Us
                    </Link>
                </div>
            </div>
        </>
    )
}