"use client"

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, Mail, Phone, Briefcase, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Circles } from "react-loader-spinner";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  name: string;
  phone: string;
  industry: string;
}

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
      name: "",
      phone: "",
      industry: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
      terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
      name: Yup.string().required("Organization name is required"),
      phone: Yup.string().required("Phone number required"),
      industry: Yup.string().required("Industry is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        console.log("Submitting form...=============>");
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
          email: values.email,
          password: values.password,
          name: values.name,
          phone: values.phone,
          industry: values.industry,
        });

        console.log("API Response:", response.data);

        if (response.status === 201) {
          console.log("Storing email in local storage...");
          localStorage.setItem("email", values.email); //store email in local storage
          toast.success("Profile Created Successfully! Verify OTP !");
          router.push("/verify-otp");
        }
      } catch (error: unknown) {
        console.error("Error during signup:", error);
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.email?.error || "An error occurred during signup");
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <Toaster />
      <div className="w-full max-w-sm space-y-8">
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

        <div className="space-y-4 text-center mb-8">
          <p className="text-gray-200">One deeptrack account is all you need to access all Deeptrack services.</p>
          <p className="text-gray-200">Only sign up with organization email or ID.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              name="email"
              placeholder="Email address / ID"
              className="pl-10 pr-10 py-2 w-full bg-transparent border border-gray-800 rounded-md text-white placeholder:text-gray-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="relative">
            <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              name="name"
              placeholder="Organization Name"
              className="pl-10 pr-10 py-2 w-full bg-transparent border border-gray-800 rounded-md text-white placeholder:text-gray-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="pl-10 pr-10 py-2 w-full bg-transparent border border-gray-800 rounded-md text-white placeholder:text-gray-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            ) : null}
          </div>

          <div className="relative">
            <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              name="industry"
              placeholder="Industry"
              className="pl-10 pr-10 py-2 w-full bg-transparent border border-gray-800 rounded-md text-white placeholder:text-gray-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.industry}
            />
            {formik.touched.industry && formik.errors.industry ? (
              <div className="text-red-500 text-sm">{formik.errors.industry}</div>
            ) : null}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="pl-10 pr-10 py-2 w-full bg-transparent border border-gray-800 rounded-md text-white placeholder:text-gray-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              className="pl-10 pr-10 py-2 w-full bg-transparent border border-gray-800 rounded-md text-white placeholder:text-gray-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
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
              I confirm that I have read, sent, and agreed to Deeptrack&apos;s {" "}
              <Link href="#" className="text-customTeal hover:underline">
                Terms of Use
              </Link>{" "}
              and {" "}
              <Link href="#" className="text-customTeal hover:underline">
                Privacy Policy
              </Link>
              .
            </label>
            {formik.touched.terms && formik.errors.terms ? (
              <div className="text-red-500 text-sm">{formik.errors.terms}</div>
            ) : null}
          </div>

          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
            {loading ? <Circles height={24} width={24} color="#000" /> : "Sign up"}
          </Button>

          <div className="flex justify-between text-sm">
            <Link href="/forgot-password" className="text-customTeal hover:underline">
              Forgot password?
            </Link>
            <Link href="/login" className="text-customTeal hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </div>

      <div className="fixed bottom-4 right-4">
        <Link href="#" className="text-sm text-[#00C8C8] hover:underline">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
