import React from "react";
import { Metadata } from "next";
import PFCalculator from "@/components/PFCalculator";
import { metadata as pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata;

// Rich Snippet for Google
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Provident Fund (PF) Calculator 2026",
  "operatingSystem": "Web",
  "applicationCategory": "FinanceApplication",
  "description": "Calculate your Employees' Provident Fund (EPF) and General Provident Fund (GPF) maturity with interest compounding.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "featureList": "PF Interest Calculation, Maturity Amount Estimation, Government Employee Rules"
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PFCalculator />
    </>
  );
}