import React from "react";
import { Metadata } from "next";
import CGHSHandbookContent from "@/components/CGHSHandbookContent";
import { metadata as pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata;

// Structured Data for "Article" Schema
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Central Government Health Scheme (CGHS) Handbook 2026",
  "description": "Complete guide on CGHS contribution rates, eligibility, ward entitlement, and empanelled hospitals for Government Employees.",
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
    "@id": "https://www.indianpaycalculator.in/Salaryhandbook/cghs"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CGHSHandbookContent />
    </>
  );
}