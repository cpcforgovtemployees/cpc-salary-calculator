import React from "react";
import { Metadata } from "next";
import IncomeTaxHandbookContent from "@/components/IncomeTaxHandbookContent";
import { metadata as pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata;

// Structured Data for "Article" Schema
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Income Tax Handbook 2026 (New Regime Guide)",
  "description": "Complete guide on New vs Old Tax Regime, Income Tax Slabs for FY 2025-26, Standard Deduction, and Section 87A Rebate limits.",
  "author": {
    "@type": "Organization",
    "name": "Indian Pay Calculator"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Indian Pay Calculator",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.indianpaycalculator.in/logo-512.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.indianpaycalculator.in/Salaryhandbook/incometax"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <IncomeTaxHandbookContent />
    </>
  );
}