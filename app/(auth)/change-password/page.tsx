"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function NewPassword() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle password update logic here
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            {/* Back Button */}
            <div className="w-full max-w-md">
                <Link href="/reset-password" className="inline-flex items-center text-gray-400 hover:text-white">
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
                    Create a new password. For more security ensure it differs from the previous one.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 py-2 w-full bg-transparent border border-gray-800 rounded-md text-white placeholder:text-gray-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-400"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Re-enter password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10 pr-10 py-2 w-full bg-transparent border border-gray-800 rounded-md text-white placeholder:text-gray-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-2.5 text-gray-400"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-white text-black hover:bg-gray-200"
                        disabled={!password || !confirmPassword || password !== confirmPassword}
                    >
                        Update Password
                    </Button>
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