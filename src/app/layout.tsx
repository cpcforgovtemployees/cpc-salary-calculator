import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { structuredData } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

// Use metadata from metadata.ts for consistency
export { metadata } from "./metadata";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* --- Favicons and Apple-Touch Icon --- */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* --- AdSense Auto Ads --- */}
        <Script
          id="adsense-auto-ads"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4556400007110881"
        />

        {/* --- JSON-LD structured data for SEO --- */}
        <Script id="jsonld-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(structuredData)}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        {/* Vercel Analytics */}
        <Analytics />

        {/* GA4 tracking */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-NM3F8Q6764" strategy="afterInteractive" />
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

        {/* Organization Schema for Google */}
        <Script id="org-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CPC Salary Calculator",
            url: "https://www.indianpaycalculator.in",
            logo: "https://www.indianpaycalculator.in/logo-512.png",
          })}
        </Script>
      </body>
    </html>
  );
}
