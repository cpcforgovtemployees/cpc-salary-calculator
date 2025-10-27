// src/app/contact/page.tsx
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact & Feedback – Indian Pay Calculator | 7th & 8th CPC",
  description:
    "Get in touch with Indian Pay Calculator. Share your feedback, queries, or suggestions about our 7th & 8th Pay Commission salary calculator, DA, HRA, and NPS.",
  keywords: [
    "Contact Indian Pay Calculator",
    "Feedback CPC Salary Calculator",
    "7th Pay Commission Contact",
    "8th Pay Commission Calculator Support",
    "Government Salary Calculator Help",
  ],
  openGraph: {
    title: "Contact & Feedback – Indian Pay Calculator | 7th & 8th CPC",
    description:
      "Reach out to the Indian Pay Calculator team for feedback or questions about 7th & 8th CPC salary calculations, DA, HRA, and NPS.",
    url: "https://www.indianpaycalculator.in/contact",
    siteName: "Indian Pay Calculator",
    type: "article",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}