import React from "react";
import { Metadata } from "next";
import LTCHandbookContent from "@/components/LTCHandbookContent";
import { metadata as pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata;

// Structured Data for "Article" Schema
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Leave Travel Concession (LTC) Handbook 2026",
  "description": "Complete guide on LTC Block Years (2026-29), eligibility rules, family coverage, and reimbursement process for Government Employees.",
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
    "@id": "https://www.indianpaycalculator.in/Salaryhandbook/ltc"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LTCHandbookContent />
    </>
  );
}