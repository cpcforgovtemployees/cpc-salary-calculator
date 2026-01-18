import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

// Import metadata from your separate file (Good practice!)
import { metadata as baseMetadata } from "./metadata";
export const metadata: Metadata = baseMetadata;

const inter = Inter({ subsets: ["latin"] });

// GLOBAL SCHEMA: This tells Google "Who owns this site" (Brand/Organization)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Indian Pay Calculator",
  "url": "https://www.indianpaycalculator.in",
  "logo": "https://www.indianpaycalculator.in/logo-512.png",
  "sameAs": [
    "https://x.com/IndianPay17017",
    "https://instagram.com/indianpaycpc"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "cpcforgovtemployees@gmail.com",
    "contactType": "customer support"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* --- Favicons --- */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* --- Global Organization Schema (Standard HTML Script for best crawling) --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* --- AdSense Auto Ads (External Script) --- */}
        <Script
          id="adsense-auto-ads"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4556400007110881"
        />
      </head>
      
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>

        {/* --- Vercel Analytics --- */}
        <Analytics />

        {/* --- Google Analytics 4 (GA4) --- */}
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
      </body>
    </html>
  );
}