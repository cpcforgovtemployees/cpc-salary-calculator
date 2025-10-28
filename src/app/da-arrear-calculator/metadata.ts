import type { Metadata } from "next";

// Use your correct deployed URLs if different
const siteUrl = "https://www.indianpaycalculator.in/da-arrear-calculator";
const ogImage = "https://www.indianpaycalculator.in/og/og-image.png";

export const metadata: Metadata = {
  title: "DA Arrear Calculator – 7th & 8th CPC | Indian Pay Calculator",
  description:
    "Calculate DA arrears, monthly differences, and in-hand pay for Indian government employees under 7th & 8th Pay Commission. Clear breakdown, instant results, export, and official formulas.",
  keywords: [
    "DA Arrear Calculator",
    "7th Pay Commission DA Arrears",
    "8th Pay Commission DA Arrears",
    "Dearness Allowance Calculator",
    "CPC Arrear Calculator",
    "Indian Pay Calculator",
    "Calculate DA Arrears Online",
    "Central Government DA Calculator",
    "State Government DA Calculator",
    "DA Difference Calculator",
    "DA Breakdown",
    "Salary Calculator India",
    "Government Employee DA"
  ],
  openGraph: {
    title: "DA Arrear Calculator – 7th & 8th CPC | Indian Pay Calculator",
    description:
      "Calculate Dearness Allowance arrears instantly under the 7th and 8th Pay Commissions using Indian Pay Calculator. Accurate, free, and easy to use.",
    url: siteUrl,
    siteName: "Indian Pay Calculator",
    type: "article",
    locale: "en_IN",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "DA Arrear Calculator – Indian Pay Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DA Arrear Calculator – 7th & 8th CPC | Indian Pay Calculator",
    description:
      "Free DA arrear and salary difference calculator for central and state government employees. Instantly compute monthly and total DA arrears.",
    images: [ogImage],
    site: "@indianpaycalc"
  },
  alternates: {
    canonical: siteUrl,
  },
};

// Add structured data for Google Rich Results
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  name: "DA Arrear Calculator",
  url: siteUrl,
  description:
    "Free DA arrear calculator for Indian government employees. Instantly calculate DA differences, arrears, and pay using official formulas.",
  brand: {
    "@type": "Organization",
    name: "Indian Pay Calculator",
    url: "https://www.indianpaycalculator.in"
  }
};

export default metadata;
