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
  title: "CPC Salary Calculator | 7th & 8th Pay Commission",
  description:
    "Compare 7th and 8th Pay Commission salaries, calculate DA, HRA, and Fitment Factor. Accurate CPC Salary Calculator for Government employees.",

  // ✅ Updated icons to include full favicon set
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
    title: "CPC Salary Calculator | 7th & 8th Pay Commission",
    description:
      "Calculate Salary, DA, HRA, NPS Instantly. A complete CPC Salary Calculator for Government Employees.",
    url: "https://www.indianpaycalculator.in",
    siteName: "CPC Salary Calculator",
    images: [
      {
        url: "https://www.indianpaycalculator.in/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "CPC Salary Calculator",
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