import React from "react";
import { Metadata } from "next";
import IncomeTaxCalculator from "@/components/IncomeTaxCalculator";
import { metadata as pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata;

// Rich Snippet: Tells Google this is a "Financial Application"
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Income Tax Calculator 2026 (New Regime)",
  "operatingSystem": "Web",
  "applicationCategory": "FinanceApplication",
  "description": "Calculate income tax for FY 2025-26 under the New Tax Regime. Features standard deduction, rebate calculator, and unified tax slabs.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "featureList": "New Tax Regime Slabs, 87A Rebate Calculation, Standard Deduction, Monthly TDS Estimate"
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
      <IncomeTaxCalculator />
    </>
  );
}