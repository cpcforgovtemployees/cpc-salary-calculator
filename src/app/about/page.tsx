import React from "react";
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

// JSON-LD for about page
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Indian Pay Calculator",
  url: "https://www.indianpaycalculator.in/about",
  description:
    "How Indian Pay Calculator helps government employees compare 7th & 8th CPC salary, DA, HRA, NPS, and pension. Trusted, updated, and transparent.",
  mainEntity: {
    "@type": "Organization",
    name: "Indian Pay Calculator",
    url: "https://www.indianpaycalculator.in",
    logo: "https://www.indianpaycalculator.in/logo-512.png"
  }
};

export default function About() {
  return (
    <>
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 sm:p-12 mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 text-center">
                About <span className="text-blue-600">Indian Pay Calculator</span>
              </h1>
              <p className="text-gray-700 leading-relaxed text-center text-lg mb-6">
                India's most trusted salary calculation platform for <strong>Central and State Government employees</strong>
              </p>
              
              

              <div className="flex justify-center gap-4 flex-wrap mt-6">
                <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  ✓ 7th CPC Calculator
                </span>
                <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                  ✓ 8th CPC Projections
                </span>
                <span className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                  ✓ 100% Free & Transparent
                </span>
              </div>
            </div>

            {/* Mission Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  Empower every government employee with transparent, accurate salary calculations and financial insights. We believe every employee deserves to understand their compensation structure without confusion or guesswork.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed">
                  To be the most trusted, accurate, and comprehensive salary platform for all government employees in India—from entry-level staff to senior officers across all ministries and departments.
                </p>
              </div>
            </div>

            {/* Purpose Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 sm:p-10 border border-blue-200 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                Why We Built This Tool
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Government salary structures are complex. With multiple allowances, deductions, pay commissions, and city classifications, employees often struggle to understand their true take-home salary. We created Indian Pay Calculator to solve this problem.
              </p>
              <p className="text-gray-700 leading-relaxed">
                What started as a simple calculator has evolved into a comprehensive platform covering <strong>Basic Pay, HRA, DA, TA, NPS, GPF, PF, Income Tax,</strong> and <strong>8th Pay Commission projections</strong>. Every formula is validated against official CPC reports and government circulars.
              </p>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                What Makes Us Different
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-100">
                      <span className="text-blue-600 font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">100% Accurate Calculations</h3>
                    <p className="text-gray-700 text-sm">
                      Every formula matches official CPC reports, Ministry of Finance notifications, and UPSC guidelines. Updated quarterly with latest DA, interest rates, and tax changes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-100">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">City-Based Calculations</h3>
                    <p className="text-gray-700 text-sm">
                      HRA and TA vary by posting city (X/Y/Z classification). Our tool automatically calculates based on your location—no manual adjustments needed.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-orange-100">
                      <span className="text-orange-600 font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">7th vs 8th CPC Comparison</h3>
                    <p className="text-gray-700 text-sm">
                      Instantly compare your current 7th CPC salary with 8th CPC projections. See expected pay increases, fitment factors, and revised allowances side-by-side.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-red-100">
                      <span className="text-red-600 font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Comprehensive Guides</h3>
                    <p className="text-gray-700 text-sm">
                      Detailed educational content on HRA, NPS, GPF, PF, Income Tax, and DA arrears. Learn how each component works and impacts your finances.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-100">
                      <span className="text-purple-600 font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Mobile-Friendly & Fast</h3>
                    <p className="text-gray-700 text-sm">
                      Works seamlessly on desktop, tablet, and mobile. Instant calculations with no ads, popups, or tracking. Privacy-first approach.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-pink-100">
                      <span className="text-pink-600 font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Always Free & Open</h3>
                    <p className="text-gray-700 text-sm">
                      No subscriptions, no paywalls, no premium features. All tools are completely free and will remain free forever for government employees.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                What We Cover
              </h2>
              
              

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">💰 Salary Components</h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>✓ Basic Pay & DA Calculations</li>
                    <li>✓ HRA (X/Y/Z City Classification)</li>
                    <li>✓ Travel Allowance (TA/CCA)</li>
                    <li>✓ Special Pay & Dearness Relief</li>
                    <li>✓ DA Arrears Estimation</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">🏦 Retirement & Deductions</h3>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li>✓ NPS (National Pension System)</li>
                    <li>✓ GPF/PF (Provident Fund)</li>
                    <li>✓ Group Insurance Scheme</li>
                    <li>✓ Income Tax Calculations</li>
                    <li>✓ Pension Projections</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">📊 Pay Commission</h3>
                  <ul className="text-sm text-orange-800 space-y-2">
                    <li>✓ 7th Pay Commission (Current)</li>
                    <li>✓ 8th CPC Projections</li>
                    <li>✓ Fitment Factor Analysis</li>
                    <li>✓ Pay Scale Comparisons</li>
                    <li>✓ Historical Data & Trends</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">📖 Learning Resources</h3>
                  <ul className="text-sm text-purple-800 space-y-2">
                    <li>✓ Detailed Guides for Each Tool</li>
                    <li>✓ FAQ & Common Questions</li>
                    <li>✓ Real-World Examples</li>
                    <li>✓ Salary Handbook</li>
                    <li>✓ Policy Updates & News</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Our Journey & Commitment
              </h2>
              
              

              <div className="space-y-6 mt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Started with 7th CPC Calculator</h3>
                    <p className="text-gray-700 text-sm mt-1">
                      We began by building an accurate 7th Pay Commission salary calculator that thousands of government employees now rely on daily.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-600">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Expanded to Comprehensive Tools</h3>
                    <p className="text-gray-700 text-sm mt-1">
                      Added HRA, NPS, GPF, PF, and Income Tax calculators with detailed educational guides for each component.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-600">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Built 8th CPC Projections</h3>
                    <p className="text-gray-700 text-sm mt-1">
                      As 8th Pay Commission approaches (2026–27), we've developed accurate projections based on latest expectations and historical pay commission patterns.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600">
                      <span className="text-white font-bold text-lg">4</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Continuous Improvement</h3>
                    <p className="text-gray-700 text-sm mt-1">
                      We stay committed to accuracy, adding new features, improving usability, and responding to employee feedback every day.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-10 sm:p-14 text-white mb-8 shadow-2xl">
              <h2 className="text-4xl font-black mb-3 text-center text-white drop-shadow-lg">
                We're Here to Help 🚀
              </h2>
              <p className="text-center text-white mb-10 text-lg font-medium drop-shadow-md max-w-2xl mx-auto">
                Have questions? Found an error? Want to suggest a feature? We'd love to hear from you! Your feedback matters.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                {/* Email Card */}
                <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-6xl mb-4">📧</div>
                  <p className="text-xs text-yellow-900 mb-4 font-bold uppercase tracking-widest">Email Us Directly</p>
                  <a 
                    href="mailto:cpcforgovtemployees@gmail.com"
                    className="inline-block font-black text-yellow-900 text-lg break-all hover:text-yellow-700 transition-colors underline underline-offset-4 decoration-3 decoration-yellow-900"
                  >
                    cpcforgovtemployees@gmail.com
                  </a>
                  <p className="text-xs text-yellow-800 mt-4 font-semibold">Response within 24-48 hours</p>
                </div>
                
                {/* Feedback Card */}
                <div className="bg-gradient-to-br from-green-300 to-green-400 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-xs text-green-900 mb-4 font-bold uppercase tracking-widest">Feedback & Suggestions</p>
                  <p className="text-green-900 font-bold text-base leading-relaxed">
                    Share your thoughts to help us improve the platform
                  </p>
                  <p className="text-xs text-green-800 mt-4 font-semibold">All feedback is valued!</p>
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="mt-10 pt-8 border-t-2 border-white border-opacity-30">
                <p className="text-center text-white text-sm font-semibold mb-4">Quick Actions:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a 
                    href="mailto:cpcforgovtemployees@gmail.com?subject=Bug%20Report"
                    className="bg-white text-blue-700 font-bold px-6 py-3 rounded-full text-sm transition-all hover:bg-yellow-300 hover:text-yellow-900 shadow-lg hover:shadow-xl border-2 border-white"
                  >
                    🐛 Report Bug
                  </a>
                  <a 
                    href="mailto:cpcforgovtemployees@gmail.com?subject=Feature%20Request"
                    className="bg-white text-blue-700 font-bold px-6 py-3 rounded-full text-sm transition-all hover:bg-green-300 hover:text-green-900 shadow-lg hover:shadow-xl border-2 border-white"
                  >
                    💡 Request Feature
                  </a>
                  <a 
                    href="mailto:cpcforgovtemployees@gmail.com?subject=General%20Inquiry"
                    className="bg-white text-blue-700 font-bold px-6 py-3 rounded-full text-sm transition-all hover:bg-orange-300 hover:text-orange-900 shadow-lg hover:shadow-xl border-2 border-white"
                  >
                    ❓ General Question
                  </a>
                </div>
              </div>
            </div>

            {/* Closing Statement */}
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-200 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Our Promise to You
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                We commit to keeping this platform <strong>100% free, completely transparent, and always accurate</strong>. Every government employee deserves clear, reliable salary information. That's our mission, and we won't compromise on it.
              </p>
              <p className="text-gray-600 italic mt-6 text-sm">
                Together, let's make salary transparency and financial understanding easier for every government employee in India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}