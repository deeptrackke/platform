import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
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
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
