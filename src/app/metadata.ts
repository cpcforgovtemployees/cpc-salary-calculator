import type { Metadata } from "next";

const siteUrl = "https://www.indianpaycalculator.in";

export const metadata: Metadata = {
  title: "Central Govt Salary Calculator (7th & 8th Pay Commission)",
  description:
    "Accurate CPC Salary Calculator for Central Government employees. Instantly calculate 7th & 8th Pay Commission salary, in-hand pay, DA, HRA, TA, arrears, NPS and pension online.",
  keywords: [
    "CPC Salary Calculator",
    "7th Pay Commission Calculator",
    "8th Pay Commission Salary",
    "Central Government Salary Calculator",
    "Salary Calculator India",
    "DA Calculator",
    "HRA Calculator",
    "TA Calculator",
    "NPS Calculator",
    "In-hand Salary Calculator",
    "Fitment Factor Tool",
    "Pay Matrix India",
    "Salary Projection",
    "Arrears Calculator"
  ],
  openGraph: {
    title: "Central Govt Salary Calculator (7th & 8th Pay Commission)",
    description:
      "Calculate pay, DA, HRA, TA, NPS, deductions and pension under both upcoming 8th and current 7th CPC. Export detailed reports for official use.",
    url: siteUrl,
    siteName: "Indian Pay Calculator",
    images: [
      {
        url: `${siteUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CPC Salary Calculator for Government Employees"
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPC Salary Calculator (7th & 8th Pay Commission)",
    description:
      "Top-rated Indian government salary calculator. Computes pay, DA, HRA, NPS for 7th & 8th CPC.",
    images: [`${siteUrl}/og/og-image.png`],
    site: "@indianpaycalc"
  },
  alternates: {
    canonical: siteUrl,
  }
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Central Govt Salary Calculator",
  operatingSystem: "Web",
  url: siteUrl,
  applicationCategory: "FinancialApplication",
  description:
    "Accurate and free salary calculator for Indian government employees to compute 7th & 8th Pay Commission salary, DA, HRA, NPS, fitment factor and pension online.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR"
  }
};
