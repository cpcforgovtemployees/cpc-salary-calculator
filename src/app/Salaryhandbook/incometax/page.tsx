"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { FileText, Wallet, Percent, TrendingDown, BookOpen, HelpCircle } from "lucide-react";

export default function IncomeTaxPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Income Tax (New Regime) for Government Employees – FY 2025-26
      </h1>

      {/* Overview Card */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-7 h-7 text-blue-600" />
          <h2 className="text-2xl font-semibold text-blue-700">Overview of the New Tax Regime</h2>
        </div>
        <p className="text-gray-700 leading-relaxed mb-3">
          The <strong>New Tax Regime</strong> introduced under Section 115BAC of the Income Tax Act offers simplified tax slabs with lower rates compared to the old regime. Starting from FY 2025-26, it is the default regime for all taxpayers, including central and state government employees. The key advantage is reduced tax liability through broader income slabs and enhanced rebate provisions under Section 87A.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Unlike the old regime, the new regime does not allow most deductions like Section 80C (investments), 80D (health insurance), HRA, or LTA. However, standard deduction of ₹75,000 for salaried employees is available. The regime is designed to benefit taxpayers with fewer investments and lower paperwork requirements.
        </p>
      </Card>

      {/* Tax Slabs Card */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Percent className="w-7 h-7 text-green-600" />
          <h2 className="text-2xl font-semibold text-green-700">Tax Slabs for FY 2025–26 (AY 2026-27)</h2>
        </div>
        <p className="text-gray-700 mb-4">
          The Finance Act 2025 significantly relaxed the tax slabs under the new regime. The basic exemption limit has been increased to ₹4 lakh, and progressive rates apply to higher income brackets.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border text-gray-700 text-sm">
            <thead>
              <tr className="bg-green-100">
                <th className="border px-4 py-2 text-left">Income Slab (₹)</th>
                <th className="border px-4 py-2 text-left">Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Up to ₹4,00,000</td>
                <td className="border px-4 py-2 font-medium">Nil</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">₹4,00,001 – ₹8,00,000</td>
                <td className="border px-4 py-2 font-medium">5%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">₹8,00,001 – ₹12,00,000</td>
                <td className="border px-4 py-2 font-medium">10%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">₹12,00,001 – ₹16,00,000</td>
                <td className="border px-4 py-2 font-medium">15%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">₹16,00,001 – ₹20,00,000</td>
                <td className="border px-4 py-2 font-medium">20%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">₹20,00,001 – ₹24,00,000</td>
                <td className="border px-4 py-2 font-medium">25%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Above ₹24,00,000</td>
                <td className="border px-4 py-2 font-medium">30%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          <strong>Note:</strong> Standard deduction of ₹75,000 is available for salaried employees under the new regime.
        </p>
      </Card>

      {/* Section 87A Rebate Card */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-7 h-7 text-purple-600" />
          <h2 className="text-2xl font-semibold text-purple-700">Deductions and Rebate under Section 87A</h2>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Section 87A Rebate (FY 2025-26)</h3>
        <p className="text-gray-700 mb-3">
          Section 87A offers significant tax relief to individuals with lower income. For FY 2025-26 under the new regime, the rebate has been enhanced:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          <li>Maximum rebate: <strong>₹60,000</strong> (increased from ₹25,000)</li>
          <li>Applicable for taxable income up to <strong>₹12,00,000</strong></li>
          <li>Effectively, salaried employees earning up to ₹12.75 lakh pay <strong>zero tax</strong> (after ₹75,000 standard deduction)</li>
          <li>Rebate applies only to income taxed at normal slab rates (not special rates like capital gains)</li>
        </ul>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Deductions Allowed in New Regime</h3>
        <p className="text-gray-700 mb-2">
          The new regime allows very limited deductions compared to the old regime:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Standard Deduction:</strong> ₹75,000 for salaried employees and pensioners</li>
          <li><strong>Employer's NPS Contribution (Section 80CCD(2)):</strong> Up to 14% of salary for government employees</li>
          <li><strong>Section 80JJAA:</strong> Deduction for new employment (for employers)</li>
          <li>Deductions like 80C, 80D, 80E, HRA, LTA are <strong>NOT allowed</strong> under the new regime</li>
        </ul>
      </Card>

      {/* Comparison Card */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <TrendingDown className="w-7 h-7 text-orange-600" />
          <h2 className="text-2xl font-semibold text-orange-700">Comparison: Old vs New Regime</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Understanding the differences between the two regimes helps government employees choose the most beneficial option. Here's a comprehensive comparison:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border text-gray-700 text-sm">
            <thead>
              <tr className="bg-orange-100">
                <th className="border px-4 py-2 text-left">Feature</th>
                <th className="border px-4 py-2 text-left">Old Regime</th>
                <th className="border px-4 py-2 text-left">New Regime (FY 2025-26)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-medium">Basic Exemption</td>
                <td className="border px-4 py-2">₹2.5 lakh</td>
                <td className="border px-4 py-2">₹4 lakh</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Tax Slabs</td>
                <td className="border px-4 py-2">3 slabs (5%, 20%, 30%)</td>
                <td className="border px-4 py-2">7 slabs (0%, 5%, 10%, 15%, 20%, 25%, 30%)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Standard Deduction</td>
                <td className="border px-4 py-2">₹50,000</td>
                <td className="border px-4 py-2">₹75,000</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Section 80C</td>
                <td className="border px-4 py-2">Up to ₹1.5 lakh</td>
                <td className="border px-4 py-2">Not allowed</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">HRA Exemption</td>
                <td className="border px-4 py-2">Allowed</td>
                <td className="border px-4 py-2">Not allowed</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Section 80D (Health Insurance)</td>
                <td className="border px-4 py-2">Up to ₹25,000 (₹50,000 for senior citizens)</td>
                <td className="border px-4 py-2">Not allowed</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Section 87A Rebate</td>
                <td className="border px-4 py-2">₹12,500 (income up to ₹5 lakh)</td>
                <td className="border px-4 py-2">₹60,000 (income up to ₹12 lakh)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">LTA (Leave Travel Allowance)</td>
                <td className="border px-4 py-2">Allowed</td>
                <td className="border px-4 py-2">Not allowed</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Default Regime</td>
                <td className="border px-4 py-2">Optional</td>
                <td className="border px-4 py-2">Yes (default from FY 2023-24)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-blue-700 mt-3">
          <strong>Tip:</strong> Salaried employees can switch between regimes each year while filing ITR. Business owners can switch only once.
        </p>
      </Card>

      {/* Tax Saving Tips Card */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-7 h-7 text-indigo-600" />
          <h2 className="text-2xl font-semibold text-indigo-700">Tax Saving Tips for Government Employees</h2>
        </div>
        <p className="text-gray-700 mb-3">
          Even though the new regime limits deductions, government employees can still optimize their tax liability through smart planning:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Maximize NPS contributions:</strong> Employer's contribution to NPS (up to 14% of salary for govt. employees) is still deductible under Section 80CCD(2) in the new regime.
          </li>
          <li>
            <strong>Compare both regimes:</strong> Use tax calculators to determine which regime saves more tax based on your salary structure and investments.
          </li>
          <li>
            <strong>Optimize salary structure:</strong> Discuss with your employer to structure components like NPS contribution to maximize tax benefits.
          </li>
          <li>
            <strong>Claim standard deduction:</strong> Ensure the ₹75,000 standard deduction is applied correctly while computing taxable income.
          </li>
          <li>
            <strong>Plan for Section 87A:</strong> If your income is close to ₹12 lakh, consider reducing taxable income through allowed deductions to avail the full rebate.
          </li>
          <li>
            <strong>Consider old regime for high deductions:</strong> If you claim substantial HRA, 80C, or home loan interest, the old regime might be more beneficial.
          </li>
          <li>
            <strong>File ITR on time:</strong> Ensure timely filing to avoid penalties and claim all eligible rebates and deductions.
          </li>
        </ul>
      </Card>

      {/* FAQs Card */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle className="w-7 h-7 text-red-600" />
          <h2 className="text-2xl font-semibold text-red-700">Frequently Asked Questions (FAQs)</h2>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              1. Is the new tax regime mandatory for government employees?
            </h3>
            <p className="text-gray-700">
              No, the new regime is the default, but government employees can opt for the old regime while filing their Income Tax Return (ITR) if it's more beneficial based on their deductions and exemptions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              2. Can I switch between old and new regime every year?
            </h3>
            <p className="text-gray-700">
              Yes, salaried employees (including government employees) can switch between the two regimes each financial year while filing their ITR. However, business owners can switch only once.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              3. What is the income limit for zero tax under the new regime?
            </h3>
            <p className="text-gray-700">
              For FY 2025-26, individuals with taxable income up to ₹12 lakh pay zero tax due to the enhanced Section 87A rebate of ₹60,000. Salaried employees earning up to ₹12.75 lakh (including ₹75,000 standard deduction) effectively have no tax liability.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              4. Are HRA and LTA allowed in the new regime?
            </h3>
            <p className="text-gray-700">
              No, HRA (House Rent Allowance) and LTA (Leave Travel Allowance) exemptions are not available under the new tax regime. These are only allowed in the old regime.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              5. Can I claim Section 80C deductions in the new regime?
            </h3>
            <p className="text-gray-700">
              No, Section 80C deductions (for investments in PPF, ELSS, life insurance, etc.) are not allowed under the new regime. However, employer's NPS contribution under Section 80CCD(2) is still allowed.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              6. Which regime is better for government employees?
            </h3>
            <p className="text-gray-700">
              It depends on your salary structure and deductions. If you have minimal investments and don't claim HRA, the new regime is usually better due to lower tax rates and higher rebate. If you claim substantial deductions (80C, 80D, HRA), calculate tax under both regimes before deciding.
            </p>
          </div>
        </div>
      </Card>

      {/* CTA Button */}
      <div className="flex justify-center mt-8">
        <Link href="/income-tax-calculator">
          <button className="bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-green-600 transition-all text-xl">
            Calculate Income Tax
          </button>
        </Link>
      </div>
    </div>
  );
}