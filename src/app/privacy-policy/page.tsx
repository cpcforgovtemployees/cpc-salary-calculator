import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Shield, Lock, FileText, HelpCircle } from "lucide-react";

// 1. SEO Metadata
export const metadata: Metadata = {
  title: "Privacy Policy – Indian Pay Calculator",
  description: "Privacy Policy for Indian Pay Calculator. We prioritize your data privacy, use encryption, and do not store your salary details.",
  alternates: {
    canonical: "https://www.indianpaycalculator.in/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy – Indian Pay Calculator",
    description: "Learn how we protect your data. No registration required, no personal salary data stored.",
    url: "https://www.indianpaycalculator.in/privacy-policy",
    type: "website",
  },
};

// 2. Structured Data (Schema)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "description": "Privacy Policy for Indian Pay Calculator regarding data collection and usage.",
  "url": "https://www.indianpaycalculator.in/privacy-policy",
  "publisher": {
    "@type": "Organization",
    "name": "Indian Pay Calculator",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.indianpaycalculator.in/logo-512.png"
    }
  }
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how Indian Pay Calculator collects, uses, and protects your data.
            </p>
          </header>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-blue-900">No Registration</h3>
              <p className="text-sm text-blue-700">Use calculators freely</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-green-900">Data Safe</h3>
              <p className="text-sm text-green-700">Encrypted transmission</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🍪</div>
              <h3 className="font-semibold text-purple-900">Cookies</h3>
              <p className="text-sm text-purple-700">Analytics only</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">✋</div>
              <h3 className="font-semibold text-orange-900">Your Rights</h3>
              <p className="text-sm text-orange-700">Data deletion anytime</p>
            </div>
          </div>

          {/* Section 1: Information We Collect */}
          <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-7 h-7 text-blue-600" />
              <h2 className="text-2xl font-semibold text-blue-700">1. Information We Collect</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Non-Personal Information</h4>
                <p className="text-sm text-gray-700">We do not require registration or collect any personal information for using the calculators. Calculations are performed instantly in your browser without storing data on our servers.</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Contact and Feedback Forms</h4>
                <p className="text-sm text-gray-700">If you submit our contact form, your email and message are only used for response purposes and are never published, sold, or shared with third parties.</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Cookies</h4>
                <p className="text-sm text-gray-700 mb-2">Our site may use browser cookies for:</p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Website analytics and performance tracking</li>
                  <li>Tailoring content and user experience</li>
                  <li>Remembering session preferences</li>
                </ul>
                <p className="text-sm text-gray-700 mt-2">Cookies do not track personal information or identify individuals across sites.</p>
              </div>
            </div>
          </Card>

          {/* Section 2: Third-Party Services */}
          <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-7 h-7 text-green-600" />
              <h2 className="text-2xl font-semibold text-green-700">2. Third-Party Services</h2>
            </div>
            
            <p className="text-gray-700">
              We use Google AdSense and Google Analytics to support the site and understand user behavior. These third-party services may use cookies and similar technologies to serve ads or analyze site traffic.
            </p>
            
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Important Notice:</h4>
              <p className="text-sm text-gray-700 mb-3">
                No personally identifiable information is collected by Indian Pay Calculator or shared with these services.
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Learn more about how Google uses your data: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium underline">Google Privacy Policy</a>
              </p>
              <p className="text-sm text-gray-700">
                You may opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.
              </p>
            </div>
          </Card>

          {/* Section 3: Data Security */}
          <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl font-semibold text-purple-700">3. Data Security</h2>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 space-y-3">
              <p className="text-gray-700">We strive to keep your data safe. Any information you provide via our contact form is encrypted during transmission.</p>
              <p className="text-gray-700">We do not store user-submitted calculation results on our servers.</p>
            </div>
          </Card>

          {/* Section 4: User Rights */}
          <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-7 h-7 text-orange-600" />
              <h2 className="text-2xl font-semibold text-orange-700">4. User Rights</h2>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>You may request deletion of any feedback sent via our contact form at any time</li>
                <li>We do not store or track individual calculation results</li>
                <li>You have the right to know what personal information we hold about you</li>
                <li>Contact us for any data deletion requests</li>
              </ul>
            </div>
          </Card>

          {/* Section 5: Policy Changes */}
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 shadow-md rounded-xl p-6 border border-indigo-200 space-y-4 hover:shadow-lg transition-all">
            <h2 className="text-2xl font-semibold text-indigo-800">5. Policy Changes</h2>
            
            <p className="text-gray-700">
              This Privacy Policy may be updated periodically to reflect changes in our practices or legal requirements. Significant changes will be clearly reflected on this page.
            </p>
            
            <div className="bg-indigo-100 p-4 rounded-lg border border-indigo-300">
              <p className="font-semibold text-indigo-900">
                By continuing to use Indian Pay Calculator, you accept the current privacy policy.
              </p>
            </div>
          </Card>

          {/* Section 6: Contact Us */}
          <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contact Us</h2>
            
            <p className="text-gray-700 mb-4">
              For questions about this privacy policy or to request deletion of your information:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Email Support</h4>
                <p className="text-sm text-gray-700">cpcforgovtemployees@gmail.com</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Contact Form</h4>
                <p className="text-sm text-gray-700">Visit our <Link href="/contact" className="text-blue-600 underline font-medium">contact page</Link></p>
              </div>
            </div>
          </Card>

          {/* Footer Info */}
          <div className="text-center py-8 space-y-4">
            <div className="text-gray-600">
              <p className="mb-2">Last Updated: January 2026</p>
              <p className="mb-4">Effective Date: January 2026</p>
              <p className="text-sm italic">This privacy policy applies to Indian Pay Calculator (indianpaycalculator.in) and all related calculator tools for 7th and 8th CPC salary computations.</p>
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