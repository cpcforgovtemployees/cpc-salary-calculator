import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { FileText, AlertCircle, Scale, Lock, ExternalLink, RefreshCw, Mail } from "lucide-react";

// 1. SEO Metadata
export const metadata: Metadata = {
  title: "Terms and Conditions – Indian Pay Calculator",
  description: "Read the Terms and Conditions for using Indian Pay Calculator. Disclaimer regarding salary calculations, 7th Pay Commission data accuracy, and user liability.",
  alternates: {
    canonical: "https://www.indianpaycalculator.in/terms",
  },
  openGraph: {
    title: "Terms and Conditions – Indian Pay Calculator",
    description: "Usage guidelines and disclaimers for government employees using our salary tools.",
    url: "https://www.indianpaycalculator.in/terms",
    type: "website",
  },
};

// 2. Structured Data (Schema)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms and Conditions",
  "description": "Legal terms and disclaimers for Indian Pay Calculator.",
  "url": "https://www.indianpaycalculator.in/terms",
  "publisher": {
    "@type": "Organization",
    "name": "Indian Pay Calculator",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.indianpaycalculator.in/logo-512.png"
    }
  }
};

export default function TermsAndConditionsPage() {
  return (
    <>
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          
          {/* Hero Section */}
          <header className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Terms and Conditions
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Please read these Terms and Conditions carefully before using Indian Pay Calculator. By accessing this website, you agree to be bound by these terms.
            </p>
          </header>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-semibold text-blue-900">Free Tool</h3>
              <p className="text-sm text-blue-700">For Information Only</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">⚠️</div>
              <h3 className="font-semibold text-orange-900">Disclaimer</h3>
              <p className="text-sm text-orange-700">Verify with PAO</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-purple-900">Your Data</h3>
              <p className="text-sm text-purple-700">Protected Always</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold text-green-900">Support</h3>
              <p className="text-sm text-green-700">Contact Anytime</p>
            </div>
          </div>

          {/* Section 1: General Information */}
          <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-7 h-7 text-blue-600" />
              <h2 className="text-2xl font-semibold text-blue-700">1. General Information</h2>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-gray-700">
                The <strong>Indian Pay Calculator</strong> provides free online salary tools to help users calculate salary components under the <strong>7th and 8th Pay Commission</strong>.
              </p>
              <p className="text-gray-700 mt-2">
                All calculations are based on publicly available government data and standard formulas for Dearness Allowance (DA), House Rent Allowance (HRA), Fitment Factor, and other pay elements.
              </p>
            </div>
          </Card>

          {/* Section 2: Accuracy */}
          <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-7 h-7 text-orange-600" />
              <h2 className="text-2xl font-semibold text-orange-700">2. Accuracy of Information</h2>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2">Disclaimer on Results:</h4>
              <p className="text-gray-700 mb-3">
                While we make every effort to ensure accuracy, the results generated by the calculator are for informational purposes only.
              </p>
              <p className="text-gray-700 mb-3">
                Official salary figures may differ based on your department, grade pay level, allowances, and latest government orders.
              </p>
              <p className="text-sm text-orange-900 font-semibold">
                We recommend verifying results with your Pay and Accounts Office (PAO) or official government notifications.
              </p>
            </div>
          </Card>

          {/* Section 3: Limitation of Liability */}
          <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-7 h-7 text-red-600" />
              <h2 className="text-2xl font-semibold text-red-700">3. Limitation of Liability</h2>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-gray-700">
                By using this website, you agree that the Indian Pay Calculator team is not responsible for any direct or indirect loss, financial discrepancy, or misunderstanding arising from the use of our tools or results.
              </p>
              <p className="text-gray-700 mt-2">
                Users are solely responsible for the application and interpretation of the data provided here.
              </p>
            </div>
          </Card>

          {/* Section 4: Intellectual Property Rights */}
          <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl font-semibold text-purple-700">4. Intellectual Property Rights</h2>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-gray-700">
                All website content, including text, graphics, logos, and design elements, are the property of <strong>Indian Pay Calculator</strong> and are protected by copyright laws.
              </p>
              <p className="text-gray-700 mt-2">
                Unauthorized reproduction or redistribution of content is prohibited without prior written consent.
              </p>
            </div>
          </Card>

          {/* Section 5: External Links */}
          <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <ExternalLink className="w-7 h-7 text-green-600" />
              <h2 className="text-2xl font-semibold text-green-700">5. External Links and Third-Party Services</h2>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-gray-700 mb-2">
                Our website may include links to third-party websites for informational purposes. These sites are not under our control, and we are not responsible for their content, policies, or accuracy.
              </p>
              <p className="text-gray-700">
                We encourage users to read the privacy policies of any linked sites before providing personal information.
              </p>
            </div>
          </Card>

          {/* Section 6: Updates and Modifications */}
          <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="w-7 h-7 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-indigo-700">6. Updates and Modifications</h2>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <p className="text-gray-700 mb-2">
                The Indian Pay Calculator reserves the right to modify or update these Terms and Conditions at any time without prior notice.
              </p>
              <p className="text-gray-700">
                Changes will be effective immediately upon being posted. Continued use of the site signifies acceptance of the updated terms.
              </p>
            </div>
          </Card>

          {/* Section 7: Contact and Feedback */}
          <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 shadow-md rounded-xl p-6 border border-teal-200 space-y-4 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-7 h-7 text-teal-600" />
              <h2 className="text-2xl font-semibold text-teal-700">7. Contact and Feedback</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              For any questions, clarifications, or feedback related to our Terms and Conditions, please reach out:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-teal-200">
                <h4 className="font-semibold text-teal-900 mb-2">Contact Form</h4>
                <p className="text-sm text-gray-700">
                  Visit our <Link href="/contact" className="text-blue-600 underline font-medium">Contact and Feedback</Link> page anytime.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-teal-200">
                <h4 className="font-semibold text-teal-900 mb-2">Email Support</h4>
                <p className="text-sm text-gray-700">cpcforgovtemployees@gmail.com</p>
              </div>
            </div>
          </Card>

          {/* Important Notice */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-10 sm:p-14 text-white mb-8 shadow-2xl">
            <h2 className="text-3xl font-black mb-4 text-center text-white drop-shadow-lg">
              Important Notice
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 text-white text-lg">
              <p>
                These Terms and Conditions apply to the Indian Pay Calculator website and all related calculator tools for 7th and 8th CPC salary computations.
              </p>
              <p>
                If you do not agree with any part of these terms, please do not use the website. Your continued use constitutes acceptance of these Terms and Conditions.
              </p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center py-8 space-y-4">
            <div className="text-gray-600">
              <p className="mb-2">Last Updated: January 2026</p>
              <p className="text-sm italic">Indian Pay Calculator - 7th and 8th Pay Commission Salary Tools</p>
            </div>
            
            <Link href="/">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-lg hover:shadow-xl">
                Back to Home
              </button>
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}