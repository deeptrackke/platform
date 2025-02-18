import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function GettingStarted() {
    return (
        <div className="bg-black rounded-xl text-white p-8 lg:p-4 min-h-[200px]">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Get started</h2>
                    <p className="text-sm text-gray-400 max-w-md">
                        Ensure the validity of individuals&apos; documents, tax status, images, and online reputation to maintain
                        proper compliance.
                    </p>
                    <Button className="bg-white text-black px-4 py-2 rounded-md font-semibold">
                        VERIFY IDENTITY
                    </Button>
                </div>

                <div className="relative flex justify-end items-center">
                    <div className="relative w-[150px] h-[150px]">
                        <Image
                            src="/banner-img.png"
                            alt="Person with laptop"
                            fill
                            className="object-contain drop-shadow-lg z-10"
                            priority
                        />
                    </div>
                    <div className="absolute w-[80px] h-[80px] -right-4 top-1/2 transform -translate-y-1/2">
                        <Image
                            src="/banner-img-01.png"
                            alt="decorations"
                            fill
                            className="object-contain opacity-40 animate-pulse"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
