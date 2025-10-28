import Link from "next/link";
import { Card } from "@/components/ui/card";

// SEO + Metadata block
export const metadata = {
  title: "About Indian Pay Calculator – 7th & 8th CPC Salary Calculator",
  description:
    "Learn about Indian Pay Calculator—India's trusted CPC salary calculator for government employees to compare 7th & 8th Pay Commission salaries, DA, HRA, and NPS.",
  keywords: [
    "About Indian Pay Calculator",
    "CPC Salary Calculator",
    "7th Pay Commission",
    "8th Pay Commission",
    "Government Salary Calculator",
    "DA HRA NPS Calculator",
    "Pay Matrix Calculator",
    "Indian Government Salary Structure",
    "Transparent Salary Tools",
    "Pension Calulator India",
    "Government Employee Benefits"
  ],
  openGraph: {
    title: "About Indian Pay Calculator – 7th & 8th CPC Salary Calculator",
    description:
      "Discover the story and vision of Indian Pay Calculator—India's most trusted tool for CPC salary, DA, and HRA calculations.",
    url: "https://www.indianpaycalculator.in/about",
    siteName: "Indian Pay Calculator",
    type: "article",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "About Indian Pay Calculator",
    description: "Learn about India's free, trusted CPC salary calculator for government employees.",
    site: "@indianpaycalc"
  },
  alternates: {
    canonical: "https://www.indianpaycalculator.in/about",
  }
};

// (Optional) JSON-LD for about pages
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "About Indian Pay Calculator",
  url: "https://www.indianpaycalculator.in/about",
  description:
    "How Indian Pay Calculator helps government employees compare 7th & 8th CPC salary, DA, HRA, NPS, and pension. Trusted, updated, and transparent.",
  isPartOf: {
    "@type": "WebSite",
    name: "Indian Pay Calculator",
    url: "https://www.indianpaycalculator.in"
  }
};

export default function About() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Card className="p-6 sm:p-10 shadow-md border border-gray-200 bg-white rounded-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
          About Indian Pay Calculator
        </h1>
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
          Welcome to the <strong>Indian Pay Calculator</strong>—a free, user-friendly tool designed for
          <strong> Central and State Government employees</strong> to easily calculate, compare, and
          understand their salary structure under both the <strong>7th</strong> and <strong>upcoming 8th Pay Commission</strong>.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Our Purpose
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          This calculator simplifies the complex salary calculation process for government employees.
          It covers <strong>Basic Pay, HRA, DA, TA, NPS, and deductions</strong>—presenting these numbers transparently to help you see your <strong>in-hand salary</strong>,
          total benefits, and expected increase after pay revisions.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why This Tool Stands Out
        </h2>
        <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
          Key Benefits of Indian Pay Calculator
        </h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Instant comparison between <strong>7th CPC</strong> and <strong>8th CPC</strong> salary structures.</li>
          <li>City-based <strong>HRA and TA calculations</strong> for accurate results.</li>
          <li><strong>DA and Fitment Factor</strong> projections updated with latest government notifications.</li>
          <li><strong>Downloadable reports</strong> in PDF/Excel format for official or offline use.</li>
          <li>Completely <strong>free, mobile-friendly</strong> and responsive UI.</li>
        </ul>
        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
          Why Government Employees Trust This Tool
        </h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Every formula and value is validated against official CPC reports, government circulars, and finance ministry updates.
          The tool is kept accurate and up-to-date, earning the trust of thousands of government employees.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Our Vision
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Our vision is to be the trusted platform for all government salary-related calculations in India—from <strong>entry-level clerks</strong> to <strong>senior officers</strong>.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          We believe information should empower, not confuse. By simplifying pay structures and providing clear comparisons, we enable employees to make informed decisions about their finances and career progression.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Our Mission & Future Goals
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Our mission is to provide salary tools every government employee can rely on. Future features include <strong>pension projections</strong>, <strong>arrears estimation</strong>, and <strong>income tax calculators</strong>.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          As the <strong>8th Pay Commission</strong> approaches, we’ll help users compare revised pay scales, DA, and take-home salary instantly—always striving for accuracy and service.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Connect With Us
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          We value your suggestions and feedback. Every message helps improve the platform and add features that matter. Reach out via our{" "}
          <Link href="/contact" className="text-blue-600 hover:underline font-medium">
            Contact & Feedback
          </Link>{" "}
          page or email us at{" "}
          <span className="font-semibold">cpcforgovtemployees@gmail.com</span>.
        </p>
        <p className="text-gray-700 text-center italic">
          Together, let’s make salary transparency and understanding easier for every government employee in India.
        </p>
      </Card>
    </div>
  );
}
