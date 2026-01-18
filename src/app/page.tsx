import React from "react";
import { Metadata } from "next";
import CPCCalculator from "@/components/CPCCalculator";
import { metadata as pageMetadata } from "./metadata"; // Imports the SEO from the file next to it

// Export the metadata to Next.js
export const metadata: Metadata = pageMetadata;

// Rich Snippet: Tells Google this is a "SoftwareApplication"
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "7th Pay Commission Salary Calculator",
  "operatingSystem": "Web",
  "applicationCategory": "FinanceApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "description": "Calculate 7th CPC salary, 8th CPC projection, DA, HRA, and NPS deductions for Central Government Employees."
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
      <CPCCalculator />
    </>
  );
}