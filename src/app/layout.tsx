import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CPC Salary Calculator | 7th & 8th Pay Commission",
  description:
    "Compare 7th and 8th Pay Commission salaries, calculate DA, HRA, and Fitment Factor. Accurate CPC Salary Calculator for Government employees.",
  icons: {
    icon: "/favicon-32.png",
    shortcut: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "CPC Salary Calculator | 7th & 8th Pay Commission",
    description:
      "Calculate Salary, DA, HRA, NPS Instantly. A complete CPC Salary Calculator for Government Employees.",
    url: "https://your-domain-here", // update after deployment
    siteName: "CPC Salary Calculator",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "CPC Salary Calculator",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900`}>
        <ThemeProvider>
          {/* Header (fixed on top for all pages) */}
          <Header />

          {/* Main content area */}
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer (persistent at bottom) */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
