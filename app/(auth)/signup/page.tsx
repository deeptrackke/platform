"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"


export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex justify-center items-center mb-8 space-x-2">
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

        {/* Description */}
        <div className="space-y-4 text-center mb-8">
          <p className="text-gray-200">One deeptrack account is all you need to access all Deeptrack services.</p>
          <p className="text-gray-200">Only sign up with organization email or ID.</p>
        </div>

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

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
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

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="#Code"
              className="flex-1 bg-transparent border border-gray-800 rounded-md text-white placeholder:text-gray-500"
            />
            <Button variant="outline" className="border-gray-800 text-white bg-transparent">
              Send code
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <label htmlFor="terms" className="text-sm text-gray-300">
              I confirm that i have read, sent and agreed to Deeptrack&apos;s{" "}
              <Link href="#" className="text-customTeal hover:underline">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-customTeal hover:underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          <Button className="w-full bg-white text-black hover:bg-gray-200">Sign up</Button>

          <div className="flex justify-between text-sm">
            <Link href="#" className="text-gray-400 hover:text-white">
              Forgot password?
            </Link>
            <Link href="/login" className="text-gray-400 hover:text-white">
              Log in
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