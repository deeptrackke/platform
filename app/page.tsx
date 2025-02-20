import { auth } from "@clerk/nextjs/server";
import Link from "next/link"

export default async function KYCHero() {
	const { userId } = await auth();
	const href = userId ? "/dashboard" : "/new-user";
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background h-screen">
			<div className=" px-4 md:px-6">
				<div className="flex flex-col items-center space-y-4 text-center">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
							KYC Reimagined: Performance, Intelligence, Convenience
						</h1>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Streamline your Know Your Customer process with our cutting-edge
							solution that combines speed, smart technology, and ease of use.
						</p>
					</div>
					<div className="space-x-4">
						<Link
							href={href}
							className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
						>
							{userId ? "Go to Dashboard" : "Get Started"}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

