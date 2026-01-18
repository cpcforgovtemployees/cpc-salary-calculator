import React from "react";
import { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us – Indian Pay Calculator",
  description: "Get in touch with the Indian Pay Calculator team. Support for 7th Pay Commission tools, feedback, and advertising inquiries.",
  alternates: {
    canonical: "https://www.indianpaycalculator.in/contact",
  },
};

// JSON-LD for Contact Page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Indian Pay Calculator",
  "url": "https://www.indianpaycalculator.in/contact",
  "description": "Contact page for Indian Pay Calculator support and feedback.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Indian Pay Calculator",
    "email": "cpcforgovtemployees@gmail.com",
    "url": "https://www.indianpaycalculator.in",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "cpcforgovtemployees@gmail.com",
      "contactType": "customer support"
    }
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ContactPageContent />
    </>
  );
}