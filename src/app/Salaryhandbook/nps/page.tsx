import React from "react";
import { Metadata } from "next";
import NPSHandbookContent from "@/components/NPSHandbookContent";
import { metadata as pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata;

// Structured Data for "Article" or "Guide"
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "National Pension System (NPS) Handbook 2026",
  "description": "Complete guide on NPS rules, tax benefits, and withdrawal limits for Government Employees.",
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
    "@id": "https://www.indianpaycalculator.in/Salaryhandbook/nps"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NPSHandbookContent />
    </>
  );
}