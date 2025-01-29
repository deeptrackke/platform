"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import toast, {Toaster} from "react-hot-toast"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Circles } from "react-loader-spinner"
import { createSession } from "@/lib/session"

interface FormValues {
  email: string;
  password: string;
  terms: boolean;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // formik setup

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      terms: false
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
        password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      try {
        // send login request to the server
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, values)

        // check if login was successful
        if (response.data.accessToken && response.data.refreshToken) {
          // Create server session
          await createSession({
            user: response.data.user, // Ensure your API returns user data
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
          });

          // Store tokens in localStorage for client-side usage (if needed)
          localStorage.setItem("access_token", response.data.accessToken);
          localStorage.setItem("refresh_token", response.data.refreshToken);

          router.push("/dashboard");
          router.refresh(); // Add this to ensure middleware revalidation
        } else {
            toast.error("Login failed. Please check your credentials.")
        }
      } catch(error: unknown) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message || "An error occurred. Please try again.")
        } else {
            toast.error("An error occurred. Please try again.")
        }
      } finally {
        setLoading(false)
      }
    }
  })

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <Toaster />
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex justify-center items-center mb-8">
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
          <p className="text-gray-200">Only log in with organization email or ID.</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              placeholder="Email address / ID"
              className="pl-10 pr-10 py-2 w-full bg-transparent border border-gray-800 rounded-md text-white placeholder:text-gray-500"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-10 pr-10 py-2 w-full bg-transparent border border-gray-800 rounded-md text-white placeholder:text-gray-500"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
              name="terms"
              onCheckedChange={(checked) => formik.setFieldValue("terms", checked)}
              onBlur={formik.handleBlur}
              checked={formik.values.terms}
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
            {formik.touched.terms && formik.errors.terms ? (
              <div className="text-red-500 text-sm">{formik.errors.terms}</div>
            ) : null}
          </div>

          <Button className="w-full bg-white text-black hover:bg-gray-200">
            {loading ? <Circles height={24} width={24} color="#000" /> : "Login"}
          </Button>
        </form>

        {/* Social Login Option - Now outside the form */}
        <div className="space-y-6">
          <div className="flex justify-center text-sm mt-2">
            <p className="mr-1">Don&apos;t have an account?</p>
            <Link href="/signup" className="text-customTeal hover:underline">
              Signup
            </Link>
          </div>

          <div className="text-center text-gray-400">or</div>

          <Button variant="outline" className="w-full border-customTeal text-white bg-transparent hover:bg-gray-800 hover:text-white">
            <Image
              src="/google.png"
              alt="Google logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Log in with Google
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
  )
};

// implement refreshToken
export const refreshToken = async (oldRefreshToken: string): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      { refresh: oldRefreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { accessToken, refreshToken } = response.data;

    // Update local storage with new tokens
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    // Optionally, send updated tokens to the backend session manager
    await axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/update-token`, {
      accessToken,
      refreshToken,
    });

    return accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};