import React from "react";
import { Metadata } from "next";
import TAHandbookContent from "@/components/TAHandbookContent";
import { metadata as pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata;

// Structured Data for "Article" Schema
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Transport Allowance (TA) Handbook 2026",
  "description": "Complete guide on Transport Allowance rates, TPTA city list, DA on TA calculation, and tax rules for Central Government Employees.",
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
    "@id": "https://www.indianpaycalculator.in/Salaryhandbook/ta"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TAHandbookContent />
    </>
  );
}