// src/app/privacy-policy/page.tsx
export const metadata = {
  title: "Privacy Policy – Indian Pay Calculator | 7th & 8th CPC",
  description:
    "Read the Privacy Policy for Indian Pay Calculator: how we protect your information, cookie policy, and AdSense/disclaimer for 7th & 8th Pay Commission calculator users.",
  keywords: [
    "Indian Pay Calculator Privacy Policy",
    "Salary Calculator Privacy",
    "CPC Salary Data Policy",
    "Government Pay Calculator Data",
    "Personal Information Disclaimer",
    "Terms and Privacy",
  ],
  openGraph: {
    title: "Privacy Policy – Indian Pay Calculator | 7th & 8th CPC",
    description: "How Indian Pay Calculator protects your information, AdSense, cookies, government data integrity, and user rights.",
    url: "https://www.indianpaycalculator.in/privacy-policy",
    siteName: "Indian Pay Calculator",
    type: "article",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy – Indian Pay Calculator",
    description: "Learn how we protect your privacy and data on the Indian Pay Calculator site.",
    site: "@indianpaycalc"
  },
  alternates: {
    canonical: "https://www.indianpaycalculator.in/privacy-policy",
  }
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-800">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-900">
        Privacy Policy
      </h1>
      <p className="text-gray-700 text-center mb-8">
        Your privacy is important to us. This page explains how Indian Pay Calculator collects, uses, and protects your data.
      </p>

      <section className="max-w-2xl mx-auto space-y-6 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">1. Information We Collect</h2>
          <ul className="list-disc pl-6">
            <li>
              <strong>Non-personal Information:</strong> We do not require registration or collect any personal information for using the calculators. Calculations are performed instantly in your browser.
            </li>
            <li>
              <strong>Contact/Feedback Forms:</strong> If you submit our contact form, your email and message are only used for response and are never published, sold, or shared.
            </li>
            <li>
              <strong>Cookies:</strong> Our site may use browser cookies for analytics, website performance, tailoring content, and remembering session preferences. Cookies do not track personal information.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">2. Third-Party Services (Google AdSense & Analytics)</h2>
          <p>
            We use Google AdSense and Analytics to support the site. These third-party services may use cookies and similar technologies to serve ads or analyze site traffic. No personally identifiable information is collected by Indian Pay Calculator.
          </p>
          <p>
            You can learn more about how Google uses your data <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener" className="text-blue-600 font-medium underline">here</a>.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">3. Data Security</h2>
          <p>
            We strive to keep your data safe. Any information you provide via our contact form is encrypted during transmission.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">4. User Rights</h2>
          <p>
            You may request deletion of any feedback sent via our contact form at any time. We do not store user-submitted calculation results.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">5. Policy Changes</h2>
          <p>
            This Privacy Policy may be updated periodically. Significant changes will be reflected on this page. Continued use of the site means you accept the current policy.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">6. Contact Us</h2>
          <p>
            For questions about this policy, please use our <a href="/contact" className="text-blue-600 underline">Contact Form</a> or email <span className="font-medium">cpcforgovtemployees@gmail.com</span>.
          </p>
        </div>
        <div className="text-gray-600 text-center mt-6 italic">
          Last updated: {new Date().toLocaleDateString("en-IN")}
        </div>
      </section>
    </div>
  );
}
