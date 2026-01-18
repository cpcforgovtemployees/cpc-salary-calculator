import type { Metadata } from "next";

// Make sure the URL is your live deployed one
const siteUrl = "https://www.indianpaycalculator.in/hra-class-calculator";
const ogImage = "https://www.indianpaycalculator.in/og/og-image.png";

export const metadata: Metadata = {
  title: "HRA Class Calculator – X, Y, Z City HRA for Govt Employees | Indian Pay Calculator",
  description:
    "Find your HRA city class (X, Y, Z) and calculate House Rent Allowance for Indian government employees under the 7th & 8th Pay Commissions. Get instant and accurate HRA results.",
  keywords: [
    "HRA Class Calculator",
    "HRA Calculator",
    "X Y Z City HRA Rates",
    "7th Pay Commission HRA",
    "8th Pay Commission HRA",
    "HRA for Government Employees",
    "HRA City Classification",
    "House Rent Allowance Calculator",
    "HRA Percentage by City",
    "Indian Pay Calculator",
    "Central Government HRA",
    "State Government HRA",
    "Urban HRA Rate",
    "City Wise HRA Amount",
    "Calculate HRA for Govt Employees",
    "X Y Z City HRA Rates"
  ],
  openGraph: {
    title: "HRA Class Calculator – X, Y, Z City HRA for Govt Employees | Indian Pay Calculator",
    description:
      "Find your HRA class (X, Y, or Z) and calculate your House Rent Allowance instantly. Perfect for Central and State Govt employees under 7th & 8th Pay Commission.",
    url: siteUrl,
    siteName: "Indian Pay Calculator",
    type: "article",
    locale: "en_IN",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "HRA Class Calculator – Indian Pay Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HRA Class Calculator – X, Y, Z City HRA for Govt Employees",
    description: "Instant city classification, updated HRA rates, and amounts for Indian government employees.",
    images: [ogImage],
    site: "@indianpaycalc"
  },
  alternates: {
    canonical: siteUrl,
  }
};

// JSON-LD Structured Data for Google Rich Results
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  name: "HRA Class Calculator",
  url: siteUrl,
  description:
    "Free HRA class and amount calculator for Indian government employees. Instantly find X, Y, Z city classification and compute HRA for 7th & 8th CPC.",
  brand: {
    "@type": "Organization",
    name: "Indian Pay Calculator",
    url: "https://www.indianpaycalculator.in"
  }
};

export default metadata;
