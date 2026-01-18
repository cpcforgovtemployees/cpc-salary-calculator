import React from "react";
import { Metadata } from "next";
import DAArrearCalculator from "@/components/DAArrearCalculator";
import { metadata as pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata;

// Rich Snippet: Tells Google this is a "Finance Tool"
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "DA Arrear Calculator 2026",
  "operatingSystem": "Web",
  "applicationCategory": "FinanceApplication",
  "description": "Calculate Dearness Allowance (DA) arrears for 7th & 8th Pay Commission. Supports January and July revision calculations.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "featureList": "DA Difference Calculation, Month-wise Breakdown, 7th CPC Arrears"
};

export default function Page() {
  return (
    <>
      {/* Inject Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Load the Calculator */}
      <DAArrearCalculator />
    </>
  );
}