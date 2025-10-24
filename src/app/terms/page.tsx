import Link from "next/link";

export default function Terms() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
        Terms & Conditions
      </h1>
      <p className="text-gray-700 leading-relaxed mb-4">
        This website and the 7th & 8th Pay Commission Salary Calculator are provided for
        informational purposes only. While we make every effort to ensure accuracy, results may vary.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        Users are advised to verify any official calculations with their respective Pay & Accounts Offices.
        By using this calculator, you agree that this website is not liable for any discrepancies or outcomes
        resulting from its use.
      </p>
      <p className="text-gray-700 leading-relaxed">
        For feedback or questions, please visit our{" "}
        <Link href="/contact" className="text-blue-600 hover:underline">
          Contact & Feedback
        </Link>{" "}
        page.
      </p>
    </div>
  );
}
