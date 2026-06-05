import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coldman JP | Professional HVAC Services in Puerto Rico",
  description:
    "Trusted experts in air conditioning installation, maintenance, and repair for residential and commercial properties in Puerto Rico. 5+ years of experience.",
  keywords: [
    "HVAC",
    "air conditioning",
    "AC repair",
    "AC installation",
    "Puerto Rico",
    "Coldman JP",
    "aire acondicionado",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
