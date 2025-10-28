import ContactForm from "@/components/ContactForm";

// Modern SEO Metadata
export const metadata = {
  title: "Contact & Feedback – Indian Pay Calculator | 7th & 8th CPC",
  description:
    "Get in touch with Indian Pay Calculator. Share your feedback, queries, or suggestions about our 7th & 8th Pay Commission salary calculator, DA, HRA, and NPS tools.",
  keywords: [
    "Contact Indian Pay Calculator",
    "Feedback CPC Salary Calculator",
    "7th Pay Commission Contact",
    "8th Pay Commission Calculator Support",
    "Government Salary Calculator Help",
    "Salary Calculator Feedback",
    "Support Indian Government Pay Tool"
  ],
  openGraph: {
    title: "Contact & Feedback – Indian Pay Calculator | 7th & 8th CPC",
    description:
      "Reach out to the Indian Pay Calculator team for direct support, queries, suggestions, or bug reports for CPC calculators, DA, HRA, and NPS.",
    url: "https://www.indianpaycalculator.in/contact",
    siteName: "Indian Pay Calculator",
    type: "article",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Feedback – Indian Pay Calculator",
    description: "Submit your queries and ideas regarding government salary calculator tools for India.",
    site: "@indianpaycalc"
  },
  alternates: {
    canonical: "https://www.indianpaycalculator.in/contact",
  }
};

// (Optional) SEO: JSON-LD for Contact Page
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact & Feedback – Indian Pay Calculator",
  url: "https://www.indianpaycalculator.in/contact",
  description:
    "Get in touch with Indian Pay Calculator for support, queries, bug reporting, suggestions, or feedback about our government employee salary tools.",
  publisher: {
    "@type": "Organization",
    name: "Indian Pay Calculator",
    url: "https://www.indianpaycalculator.in"
  }
};

export default function ContactPage() {
  return <ContactForm />;
}
