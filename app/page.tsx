import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthPage() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[1fr_400px] bg-background">
      <div className="hidden lg:flex items-center justify-center bg-muted/40 p-8">
        <div className="relative w-full max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-primary lg:text-6xl">Deeptrack</h1>
            <p className="text-lg text-muted-foreground lg:text-xl">
              Track your business expenses efficiently and effortlessly
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm space-y-8 px-4 md:px-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Get started</h2>
            <p className="text-sm text-muted-foreground">Choose how you want to begin</p>
          </div>
          <div className="space-y-4">
            <Button asChild className="w-full" variant="outline">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/signup">Sign up</Link>
            </Button>
            <div className="text-center">
              <Link href="/demo" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                Try it first
              </Link>
            </div>
          </div>
          <div className="mt-auto text-center text-sm text-muted-foreground">
            <Link href="/terms" className="underline-offset-4 hover:underline">
              Terms of use
            </Link>
            <span className="mx-2">·</span>
            <Link href="/privacy" className="underline-offset-4 hover:underline">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

