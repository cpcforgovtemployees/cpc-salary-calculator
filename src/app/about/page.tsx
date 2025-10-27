import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "About Indian Pay Calculator – 7th & 8th CPC Salary Calculator",
  description:
    "Learn about Indian Pay Calculator — a free CPC salary calculator for government employees to compare 7th and 8th Pay Commission salaries, DA, HRA, NPS, and more.",
  keywords: [
    "About Indian Pay Calculator",
    "CPC Salary Calculator",
    "7th Pay Commission",
    "8th Pay Commission",
    "Government Salary Calculator",
    "DA HRA NPS Calculator",
  ],
  openGraph: {
    title: "About Indian Pay Calculator – 7th & 8th CPC Salary Calculator",
    description:
      "Discover the story behind Indian Pay Calculator — your trusted tool for 7th & 8th CPC salary calculations, DA, HRA, and NPS insights.",
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
          About CPC Salary Calculator
        </h1>

        <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
          Welcome to the <strong>7th & 8th Pay Commission Salary Calculator</strong> — an intuitive, easy-to-use web app
          designed for <strong>Central Government employees</strong> to calculate, compare, and understand their salary
          structure under both the <strong>7th CPC</strong> and the <strong>upcoming 8th Pay Commission</strong>.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Our Purpose
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          We built this calculator to simplify the complex pay structure for Indian government employees. 
          It provides a transparent breakdown of <strong>Basic Pay, HRA, DA, TA, NPS, and deductions</strong>, 
          helping users see their complete in-hand salary and projected increase under the next pay commission.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why This Tool Stands Out
        </h2>
        <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
  Key Benefits of Indian Pay Calculator
</h3>
<ul className="list-disc pl-6 text-gray-700 space-y-2">
  <li>Instant comparison between <strong>7th CPC and 8th CPC</strong>.</li>
  <li>City-based <strong>HRA and TA calculations</strong> for accuracy.</li>
  <li>DA and Fitment Factor projections for the <strong>8th Pay Commission</strong>.</li>
  <li>Downloadable reports in <strong>PDF and Excel format</strong>.</li>
  <li>Completely <strong>free and easy to use</strong> on all devices.</li>
</ul>

<h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
  Why Government Employees Trust This Tool
</h3>
<p className="text-gray-700 leading-relaxed mb-6">
  We prioritize accuracy and transparency in every calculation. Each update is verified with the latest government CPC data and DA announcements.
</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Instant comparison between <strong>7th CPC and 8th CPC</strong>.</li>
          <li>City-based <strong>HRA and TA calculations</strong> for accuracy.</li>
          <li>DA and Fitment Factor projections for the <strong>8th Pay Commission</strong>.</li>
          <li>Downloadable reports in <strong>PDF and Excel format</strong>.</li>
          <li>Completely <strong>free and easy to use</strong> on all devices.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Our Vision
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Our goal is to create a trusted and accessible platform that helps every government employee 
          — from fresh recruits to senior officers — understand how pay revisions impact their income, 
          benefits, and take-home salary.  
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Whether you want to calculate your <strong>in-hand salary</strong>, explore the <strong>Pay Matrix Levels</strong>, 
          or forecast your <strong>fitment-based salary under the 8th CPC</strong>, this app gives you all the details in one place.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Connect With Us
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          We value your feedback and suggestions. You can reach us anytime through our{" "}
          <Link href="/contact" className="text-blue-600 hover:underline font-medium">
            Contact & Feedback
          </Link>{" "}
          page.
        </p>
      </Card>
    </div>
  );
}
