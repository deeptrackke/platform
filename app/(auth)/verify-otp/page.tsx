"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"
import { Circles } from "react-loader-spinner"

export default function VerifyOTP() {
    const [code, setCode] = useState(["", "", "", "", "",""])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const inputRefs = [
        useRef<HTMLInputElement>(null),
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
            if (value.length === 1 && index < 5) {
                inputRefs[index + 1].current?.focus()
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs[index - 1].current?.focus()
        }
    }

    const handleVerifyOTP = async () => {
        const otp = code.join("")
        const email = localStorage.getItem("email") // Assuming you stored the email in localStorage after signup

        if (!email) {
            toast.error("Email not found. Please sign up again.")
            return
        }

        setLoading(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
                email,
                otp,
            })

            if (response.data.statusCode === 200) {
                toast.success("OTP verified successfully!")
                router.push("/success-screen")
            } else {
                console.error("OTP verification failed:", response.data.message)
                toast.error("Invalid OTP. Please try again.")
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred during OTP verification")
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <Toaster />
                {/* Back Button */}
                <div className="w-full max-w-md">
                    <Link href="/signup" className="inline-flex items-center text-gray-400 hover:text-white">
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
                        We sent an OTP to your email. Please enter the unique 6 digit code.
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
                        disabled={!code.every((digit) => digit.length === 1) || loading}
                        onClick={handleVerifyOTP}
                    >
                        {loading ? <Circles height={24} width={24} color="#000" /> : "Verify OTP"}
                    </Button>

                    {/* Resend Email */}
                    <div className="text-center text-sm">
                        <span className="text-gray-400">Haven&apos;t got the email yet? </span>
                        <Button variant="link" className="text-[#00C8C8] p-0 h-auto font-normal hover:text-[#00C8C8]/80">
                            Resend email
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}