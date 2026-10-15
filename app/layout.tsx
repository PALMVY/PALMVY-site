import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CloudflareAnalytics } from "@/components/ui/CloudflareAnalytics";
import { SITE_URL } from "@/core/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Barra do navegador no celular na mesma cor noturna da página (pacific-night).
export const viewport: Viewport = {
  themeColor: "#071a2b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "PALMVY — Apps feitos com calma",
  description:
    "Estúdio de produto: apps próprios e sites e apps sob medida, com preço na mesa.",
  metadataBase: new URL(SITE_URL),
  keywords: [
    "apps",
    "product studio",
    "design",
    "desenvolvimento",
    "sossegue",
    "tunelab",
    "Safezone"
  ],
  openGraph: {
    title: "PALMVY",
    description:
      "Apps feitos com calma e propósito. California Dreamin'. Digital Reality.",
    siteName: "PALMVY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PALMVY",
    description: "Apps feitos com calma. California Dreamin'.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-pacific-night text-soft-gray">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <CloudflareAnalytics />
      </body>
    </html>
  );
}
