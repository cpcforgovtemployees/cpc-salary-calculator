import React from "react";
import { Metadata } from "next";
import PFHandbookContent from "@/components/PFHandbookContent";
import { metadata as pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata;

// Structured Data for "Article" Schema
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Provident Fund Handbook 2026 (GPF, EPF & NPS)",
  "description": "Complete guide on General Provident Fund (GPF) and EPF rules, interest rates, and withdrawal limits for Government Employees.",
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
    "@id": "https://www.indianpaycalculator.in/Salaryhandbook/providentfund"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PFHandbookContent />
    </>
  );
}