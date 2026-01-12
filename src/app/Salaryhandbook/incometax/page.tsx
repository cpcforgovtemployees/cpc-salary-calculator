"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { FileText, Wallet, Percent, TrendingDown, BookOpen, HelpCircle } from "lucide-react";

export default function IncomeTaxPage() {
  return (
    <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Hero Section */}
        <header className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
            Income Tax for Government Employees
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Master New & Old Tax Regimes for FY 2025-26 — Understand tax slabs, rebates, deductions, and maximize your take-home salary
          </p>
        </header>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-blue-900">₹4 Lakh</h3>
            <p className="text-sm text-blue-700">Basic Exemption (New)</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-green-900">₹75,000</h3>
            <p className="text-sm text-green-700">Standard Deduction</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-orange-900">₹60,000</h3>
            <p className="text-sm text-orange-700">Section 87A Rebate</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-purple-900">Zero Tax</h3>
            <p className="text-sm text-purple-700">Up to ₹12.75 Lakh</p>
          </div>
        </div>

        {/* Overview Card */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-semibold text-blue-700">Overview of the New Tax Regime</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            The <strong>New Tax Regime</strong> introduced under Section 115BAC of the Income Tax Act offers simplified tax slabs with lower rates compared to the old regime. Starting from FY 2025-26, it is the default regime for all taxpayers, including central and state government employees. The key advantage is reduced tax liability through broader income slabs and enhanced rebate provisions under Section 87A.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Unlike the old regime, the new regime does not allow most deductions like Section 80C (investments), 80D (health insurance), HRA, or LTA. However, standard deduction of ₹75,000 for salaried employees is available. The regime is designed to benefit taxpayers with fewer investments and lower paperwork requirements.
          </p>
        </Card>

        {/* Tax Slabs Card */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Percent className="w-7 h-7 text-green-600" />
            <h2 className="text-2xl font-semibold text-green-700">Tax Slabs for FY 2025–26 (AY 2026-27)</h2>
          </div>
          <p className="text-gray-700">
            The Finance Act 2025 significantly relaxed the tax slabs under the new regime. The basic exemption limit has been increased to ₹4 lakh, and progressive rates apply to higher income brackets.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full table-auto text-gray-700 text-sm">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-4 py-3 text-left font-semibold">Income Slab (₹)</th>
                  <th className="border px-4 py-3 text-left font-semibold">Tax Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2">Up to ₹4,00,000</td>
                  <td className="border px-4 py-2 font-semibold text-green-700">Nil</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2">₹4,00,001 – ₹8,00,000</td>
                  <td className="border px-4 py-2 font-semibold">5%</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2">₹8,00,001 – ₹12,00,000</td>
                  <td className="border px-4 py-2 font-semibold">10%</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2">₹12,00,001 – ₹16,00,000</td>
                  <td className="border px-4 py-2 font-semibold">15%</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2">₹16,00,001 – ₹20,00,000</td>
                  <td className="border px-4 py-2 font-semibold">20%</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2">₹20,00,001 – ₹24,00,000</td>
                  <td className="border px-4 py-2 font-semibold">25%</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2">Above ₹24,00,000</td>
                  <td className="border px-4 py-2 font-semibold">30%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <strong>💡 Tip:</strong> Standard deduction of ₹75,000 is available for salaried employees under the new regime, effectively reducing taxable income.
          </p>
        </Card>

        {/* Section 87A Rebate Card */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 shadow-md rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-7 h-7 text-purple-700" />
            <h2 className="text-2xl font-semibold text-purple-800">Deductions & Rebate under Section 87A</h2>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Section 87A Rebate (FY 2025-26)</h3>
            <p className="text-gray-700 mb-3">
              Section 87A offers significant tax relief to individuals with lower income. For FY 2025-26, the rebate has been enhanced:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Maximum rebate: <strong>₹60,000</strong> (increased from ₹25,000)</li>
              <li>Applicable for taxable income up to <strong>₹12,00,000</strong></li>
              <li>Effectively: Zero tax for earnings up to <strong>₹12.75 lakh</strong></li>
              <li>Rebate applies only to income taxed at normal slab rates</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Deductions Allowed in New Regime</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">✓ Allowed</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Standard Deduction: ₹75,000</li>
                  <li>• NPS (80CCD(2)): Up to 14%</li>
                  <li>• Employer NPS Contribution</li>
                </ul>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">✗ Not Allowed</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Section 80C (₹1.5 lakh)</li>
                  <li>• HRA & LTA Exemption</li>
                  <li>• Section 80D (Health Insurance)</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Comparison Card */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <TrendingDown className="w-7 h-7 text-orange-600" />
            <h2 className="text-2xl font-semibold text-orange-700">Old Regime vs New Regime</h2>
          </div>
          <p className="text-gray-700">
            Understanding the differences helps government employees choose the most beneficial option. Here's a comprehensive comparison:
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full table-auto text-gray-700 text-sm">
              <thead>
                <tr className="bg-orange-100">
                  <th className="border px-4 py-3 text-left font-semibold">Feature</th>
                  <th className="border px-4 py-3 text-left font-semibold">Old Regime</th>
                  <th className="border px-4 py-3 text-left font-semibold">New Regime</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-orange-50">
                  <td className="border px-4 py-2 font-medium">Basic Exemption</td>
                  <td className="border px-4 py-2">₹2.5 lakh</td>
                  <td className="border px-4 py-2 font-semibold text-green-700">₹4 lakh</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="border px-4 py-2 font-medium">Standard Deduction</td>
                  <td className="border px-4 py-2">₹50,000</td>
                  <td className="border px-4 py-2 font-semibold text-green-700">₹75,000</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="border px-4 py-2 font-medium">Section 80C</td>
                  <td className="border px-4 py-2">Up to ₹1.5 lakh</td>
                  <td className="border px-4 py-2 text-red-700">Not allowed</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="border px-4 py-2 font-medium">HRA Exemption</td>
                  <td className="border px-4 py-2">Allowed</td>
                  <td className="border px-4 py-2 text-red-700">Not allowed</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="border px-4 py-2 font-medium">Section 80D</td>
                  <td className="border px-4 py-2">₹25,000 (₹50,000 senior)</td>
                  <td className="border px-4 py-2 text-red-700">Not allowed</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="border px-4 py-2 font-medium">Section 87A Rebate</td>
                  <td className="border px-4 py-2">₹12,500 (up to ₹5L)</td>
                  <td className="border px-4 py-2 font-semibold text-green-700">₹60,000 (up to ₹12L)</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="border px-4 py-2 font-medium">LTA (Leave Travel)</td>
                  <td className="border px-4 py-2">Allowed</td>
                  <td className="border px-4 py-2 text-red-700">Not allowed</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-blue-700 bg-blue-50 border border-blue-200 p-3 rounded-lg mt-4">
            <strong>💡 Pro Tip:</strong> Salaried employees can switch between regimes each year. Calculate tax under both regimes before filing ITR to save maximum tax.
          </p>
        </Card>

        {/* Tax Saving Tips Card */}
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 shadow-md rounded-xl p-6 border border-indigo-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-7 h-7 text-indigo-700" />
            <h2 className="text-2xl font-semibold text-indigo-800">Tax Saving Tips for Government Employees</h2>
          </div>
          <p className="text-gray-700">
            Even with limited deductions, government employees can optimize their tax liability through smart planning:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2">💼 Salary Planning</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Maximize NPS contribution</li>
                <li>• Optimize allowance structure</li>
                <li>• Plan HRA with employer</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2">📊 Regime Selection</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Compare both regimes annually</li>
                <li>• Use tax calculators</li>
                <li>• Switch if beneficial</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2">📈 Investment Strategy</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Consider old regime for 80C</li>
                <li>• Invest in PPF, ELSS, LIC</li>
                <li>• Plan health insurance</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2">✅ Filing Strategy</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• File ITR on time</li>
                <li>• Claim all eligible rebates</li>
                <li>• Maintain proper documentation</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQs Card */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-7 h-7 text-red-600" />
            <h2 className="text-2xl font-semibold text-red-700">Frequently Asked Questions (FAQs)</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-1">1. Is the new tax regime mandatory?</h3>
              <p className="text-gray-700">No, it's the default, but you can opt for the old regime if it saves more tax.</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-1">2. Can I switch regimes every year?</h3>
              <p className="text-gray-700">Yes, salaried employees can switch annually. Business owners can switch only once.</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-1">3. What's the zero tax income limit?</h3>
              <p className="text-gray-700">For FY 2025-26, up to ₹12.75 lakh (₹12L taxable + ₹75K standard deduction) with Section 87A rebate.</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-1">4. Are HRA and LTA allowed in new regime?</h3>
              <p className="text-gray-700">No, both are only available in the old regime.</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-1">5. Can I claim 80C in new regime?</h3>
              <p className="text-gray-700">No, but employer's NPS contribution (80CCD(2)) is still allowed.</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-1">6. Which regime is better for me?</h3>
              <p className="text-gray-700">Compare both regimes based on your salary and deductions. Use our calculator to determine which saves more tax.</p>
            </div>
          </div>
        </Card>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-10 sm:p-14 text-white mb-8 shadow-2xl">
          <h2 className="text-4xl font-black mb-3 text-center text-white drop-shadow-lg">
            Need Help with Tax Planning? 🚀
          </h2>
          <p className="text-center text-white mb-10 text-lg font-medium drop-shadow-md max-w-2xl mx-auto">
            Have questions about income tax? Want personalized guidance? Reach out to us!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="text-6xl mb-4">📧</div>
              <p className="text-xs text-yellow-900 mb-4 font-bold uppercase tracking-widest">Email Support</p>
              <a 
                href="mailto:cpcforgovtemployees@gmail.com"
                className="inline-block font-black text-yellow-900 text-lg break-all hover:text-yellow-700 transition-colors underline underline-offset-4 decoration-3"
              >
                cpcforgovtemployees@gmail.com
              </a>
              <p className="text-xs text-yellow-800 mt-4 font-semibold">Response within 24 hours</p>
            </div>
            <div className="bg-gradient-to-br from-green-300 to-green-400 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-xs text-green-900 mb-4 font-bold uppercase tracking-widest">Feedback</p>
              <p className="text-green-900 font-bold text-base leading-relaxed">
                Share your tax questions and feedback
              </p>
              <p className="text-xs text-green-800 mt-4 font-semibold">We value your input!</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link href="/income-tax-calculator">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-lg hover:shadow-xl">
              Calculate Income Tax
            </button>
          </Link>
          <Link href="/">
            <button className="bg-gray-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-gray-700 transition-all text-lg hover:shadow-xl">
              Back to Home
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}
