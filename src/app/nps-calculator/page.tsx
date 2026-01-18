import React from "react";
import { Metadata } from "next";
import NPSCalculator from "@/components/NPSCalculator";
import { metadata as pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata;

// Rich Snippet: Tells Google this is a "Financial Application" for pension planning
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "NPS Calculator (National Pension System)",
  "operatingSystem": "Web",
  "applicationCategory": "FinanceApplication",
  "description": "Calculate your NPS contribution, pension corpus, and annuity returns for Central and State Government employees.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "featureList": "Pension Projection, Tier 1 & 2 Contribution, Annuity Calculator, Tax Benefit Estimation"
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
      <NPSCalculator />
    </>
  );
}