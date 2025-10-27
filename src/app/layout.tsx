import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CPC Salary Calculator – 7th & 8th Pay Commission | Indian Pay Calculator",
  description:
    "Accurate CPC Salary Calculator for Indian government employees — calculate in-hand pay, DA, HRA, NPS, and fitment factors for 7th & 8th Pay Commission easily.",

  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16" },
      { url: "/favicon-32.png", sizes: "32x32" },
      { url: "/favicon-48.png", sizes: "48x48" },
      { url: "/favicon-64.png", sizes: "64x64" },
      { url: "/logo-512.png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32.png",
  },

  openGraph: {
    title: "CPC Salary Calculator – 7th & 8th Pay Commission | Indian Pay Calculator",
    description:
      "Accurate CPC Salary Calculator for Indian government employees — compute in-hand pay, DA, HRA, NPS, and fitment factors for 7th & 8th Pay Commission quickly and easily.",
    url: "https://www.indianpaycalculator.in",
    siteName: "Indian Pay Calculator",
    images: [
      {
        url: "https://www.indianpaycalculator.in/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Indian Pay Calculator — CPC Salary Calculator",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* ✅ GA4 Script */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-NM3F8Q6764"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NM3F8Q6764', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* ✅ Organization Schema for Google Logo */}
      <Script id="org-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "CPC Salary Calculator",
          url: "https://www.indianpaycalculator.in",
          logo: "https://www.indianpaycalculator.in/logo-512.png",
        })}
      </Script>

      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>

        {/* ✅ Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}