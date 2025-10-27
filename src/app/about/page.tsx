import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "About Indian Pay Calculator – 7th & 8th CPC Salary Calculator",
  description:
    "Learn about Indian Pay Calculator — a free CPC salary calculator for government employees to compare 7th and 8th Pay Commission salaries, DA, HRA, and NPS.",
  keywords: [
    "About Indian Pay Calculator",
    "CPC Salary Calculator",
    "7th Pay Commission",
    "8th Pay Commission",
    "Government Salary Calculator",
    "DA HRA NPS Calculator",
    "Pay Matrix Calculator",
    "Indian Government Salary Structure",
  ],
  openGraph: {
    title: "About Indian Pay Calculator – 7th & 8th CPC Salary Calculator",
    description:
      "Discover the story behind Indian Pay Calculator — your trusted tool for 7th & 8th CPC salary calculations, DA, HRA, NPS, and Pay Matrix insights.",
    url: "https://www.indianpaycalculator.in/about",
    siteName: "Indian Pay Calculator",
    type: "article",
  },
};

export default function About() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Card className="p-6 sm:p-10 shadow-md border border-gray-200 bg-white rounded-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
          About Indian Pay Calculator
        </h1>

        <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
          Welcome to the <strong>Indian Pay Calculator</strong> — a free, user-friendly tool designed to
          help <strong>Central and State Government employees</strong> easily calculate, compare, and
          understand their salary structure under both the{" "}
          <strong>7th</strong> and <strong>upcoming 8th Pay Commission</strong>.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Our Purpose
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          We built this calculator to simplify the complex salary computation process for government
          employees across India. Many employees struggle to understand the components of their salary,
          such as <strong>Basic Pay, HRA, DA, TA, NPS, and deductions</strong>. Our goal is to present
          these numbers transparently, helping you see your <strong>in-hand salary</strong>, total
          benefits, and expected increase after pay revisions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why This Tool Stands Out
        </h2>

        <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
          Key Benefits of Indian Pay Calculator
        </h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            Instant comparison between <strong>7th CPC</strong> and{" "}
            <strong>8th CPC</strong> salary structures.
          </li>
          <li>
            City-based <strong>HRA and TA calculations</strong> for accurate in-hand salary estimation.
          </li>
          <li>
            <strong>DA and Fitment Factor</strong> projections updated with official notifications.
          </li>
          <li>
            <strong>Downloadable reports</strong> in both PDF and Excel format for offline use.
          </li>
          <li>
            A completely <strong>free, mobile-friendly</strong> and responsive interface.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
          Why Government Employees Trust This Tool
        </h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Every formula in the Indian Pay Calculator is validated using official CPC reports,
          government circulars, and finance ministry updates. Our development team regularly updates
          data such as DA rates, HRA classifications, and Fitment Factors to maintain 100% accuracy.
          The tool’s simplicity and reliability have earned the trust of thousands of employees across
          various government departments.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Our Vision
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Our vision is to create a single, trusted platform for all government salary-related
          calculations in India. From <strong>entry-level clerks</strong> to{" "}
          <strong>senior officers</strong>, we aim to serve every government employee with accurate,
          transparent, and easy-to-understand salary tools.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          We believe that information should empower, not confuse. By simplifying pay structures and
          providing clear comparisons between pay commissions, we’re enabling government employees to
          make informed decisions about their finances, savings, and career progression.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Our Mission & Future Goals
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Our mission is to make salary calculation tools that every government employee in India can
          trust. In the future, we plan to introduce calculators for <strong>pension projections</strong>,
          <strong> arrears estimation</strong>, and <strong>income tax forecasting</strong>. The aim is
          to make <strong>Indian Pay Calculator</strong> the go-to destination for every employee seeking
          clarity about their pay structure, deductions, and benefits.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          As the <strong>8th Pay Commission</strong> recommendations approach, our focus will be on
          ensuring that users can instantly compare the impact of new pay scales and DA changes on their
          take-home salary. Our continuous updates and transparent approach reflect our dedication to
          accuracy and service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Connect With Us
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          We value your suggestions, feedback, and experiences. Every message helps us improve the
          platform and add features that matter most to you. You can reach out through our{" "}
          <Link
            href="/contact"
            className="text-blue-600 hover:underline font-medium"
          >
            Contact & Feedback
          </Link>{" "}
          page or email us directly at{" "}
          <span className="font-semibold">
            cpcforgovtemployees@gmail.com
          </span>.
        </p>

        <p className="text-gray-700 text-center italic">
          Together, let’s make salary transparency and understanding easier for every government
          employee in India.
        </p>
      </Card>
    </div>
  );
}