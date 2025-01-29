"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ForgotPassword() {
    return (
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
                <h1 className="text-2xl font-semibold text-center">Reset password</h1>

                {/* Description */}
                <p className="text-center text-gray-400">
                    Enter your email address and we will send you a verification code to reset your password
                </p>

                {/* Form */}
                <form className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                            type="email"
                            placeholder="Email address / ID"
                            className="pl-10 pr-10 py-2 w-full bg-transparent border border-gray-800 rounded-md text-white placeholder:text-gray-500"
                        />
                    </div>
                        {/* TODO: navigate to verify code which is /reset-password */}
                    <Button className="w-full bg-white text-black hover:bg-gray-200">Reset Password</Button>

                    <div className="text-center">
                        <Link href="/login" className="text-gray-400 hover:text-white text-sm">
                            Back to Log in
                        </Link>
                    </div>
                </form>
            </div>

            {/* Contact Us Link */}
            <div className="fixed bottom-4 right-4">
                <Link href="#" className="text-sm text-[#00C8C8] hover:underline">
                    Contact Us
                </Link>
            </div>
        </div>
    )
}

