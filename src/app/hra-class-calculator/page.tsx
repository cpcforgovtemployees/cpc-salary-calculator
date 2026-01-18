import React from "react";
import { Metadata } from "next";
import HRAClassCalculator from "@/components/HRAClassCalculator";
import { metadata as pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata;

// Rich Snippet for Google
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "HRA Class Calculator",
  "operatingSystem": "Web",
  "applicationCategory": "FinanceApplication",
  "description": "Calculate House Rent Allowance (HRA) for X, Y, Z class cities. Updated for 7th Pay Commission rules.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "featureList": "City Class Finder, HRA Percentage Calculation, 7th CPC HRA Rules"
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HRAClassCalculator />
    </>
  );
}