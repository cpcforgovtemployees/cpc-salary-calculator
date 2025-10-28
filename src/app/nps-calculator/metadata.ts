import type { Metadata } from "next";

// Update these if your site URLs change 
const siteUrl = "https://www.indianpaycalculator.in/nps-calculator";
const ogImage = "https://www.indianpaycalculator.in/og/og-image.png";

export const metadata: Metadata = {
  title: "NPS Calculator – Pension & Retirement Corpus | Indian Pay Calculator",
  description:
    "Accurate NPS Calculator for Indian government employees — calculate pension, NPS corpus, and contributions at 7th & 8th Pay Commission rates. Includes retirement and monthly deduction projection.",
  keywords: [
    "NPS Calculator",
    "NPS Calculator for Government Employees",
    "National Pension System Calculator",
    "NPS Pension Calculator",
    "NPS Corpus Calculator",
    "7th Pay Commission NPS",
    "8th Pay Commission NPS",
    "Central Government NPS Calculator",
    "State Government NPS Calculator",
    "Indian Pay Calculator",
    "Pension Corpus India",
    "NPS Lump Sum",
    "NPS Annuity",
    "NPS Retirement Projection",
    "NPS Monthly Deduction"
  ],
  openGraph: {
    title: "NPS Calculator – Pension & Retirement Corpus | Indian Pay Calculator",
    description:
      "Calculate monthly NPS, retirement corpus, and pension with CPC rules for Indian government employees. Export PDF reports and optimize your corpus and pension estimates.",
    url: siteUrl,
    siteName: "Indian Pay Calculator",
    type: "article",
    locale: "en_IN",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "NPS Calculator – Indian Pay Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NPS Calculator – Pension & Retirement Corpus | Indian Pay Calculator",
    description:
      "Easy NPS pension and corpus calculator for government employees. Find monthly deduction, retirement corpus, and pension projection.",
    images: [ogImage],
    site: "@indianpaycalc"
  },
  alternates: {
    canonical: siteUrl,
  }
};

// Add Structured Data for Google Rich Results
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  name: "Indian NPS Calculator",
  url: siteUrl,
  description:
    "Free online National Pension System (NPS) calculator for government employees to estimate monthly deduction, retirement corpus, and pension under 7th & 8th Pay Commission.",
  brand: {
    "@type": "Organization",
    name: "Indian Pay Calculator",
    url: "https://www.indianpaycalculator.in"
  }
};

export default metadata;
