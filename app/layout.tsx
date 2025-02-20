import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = localFont({
	src: "../fonts/Outfit.ttf",
	variable: "--font-outfit",
	display: "swap",
	fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  icons: {
    icon: '/deeptrack-favicon.ico',
  },
  metadataBase: new URL('https://deeptrack.io/deeptrackOG.png'),
  title: 'DeepTrack Platform',
  description: 'deeptrack™ is an advanced deepfake detection solution designed for media outlets, financial institutions, and government agencies.',
  openGraph: {
    images: '/deeptrackOG.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
			<ClerkProvider>
				<html lang="en">
					<body className={`${outfit.variable} antialiased`}>
						<Toaster richColors closeButton />
						{children}
					</body>
				</html>
			</ClerkProvider>
		);
}
