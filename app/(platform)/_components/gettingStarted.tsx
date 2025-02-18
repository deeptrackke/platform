import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GettingStarted() {
    return (
        <div className="bg-black rounded-xl space-y-8 text-white p-8 lg:p-4">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Get started</h2>
                    <p className="text-sm text-gray-400 max-w-md">
                        Ensure the validity of individuals&apos; documents, tax status, images, and online reputation to maintain
                        proper compliance.
                    </p>
                    <Link href={'/verify-id'}>
                    <Button className="bg-white hover:bg-customTeal text-black px-4 py-2 rounded-md font-semibold">
                        VERIFY IDENTITY
                    </Button>
                    </Link>
                </div>

                <div className="relative flex justify-end">
                    <Image
                        src="/banner-img.png"
                        alt="Person with laptop"
                        width={250}
                        height={300}
                        className="relative z-10"
                    />
                    <Image
                        src="/banner-img-01.png"
                        alt="decorations"
                        width={100}
                        height={100}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 opacity-50"
                    />
                </div>
            </div>
        </div>
    )
}
