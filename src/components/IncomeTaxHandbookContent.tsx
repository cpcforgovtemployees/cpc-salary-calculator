"use client";

import React from "react";
import Link from "next/link";

export default function IncomeTaxHandbookContent() {
  return (
    <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Hero Section */}
        <header className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
            Income Tax Calculator Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Master New & Old Tax Regimes for FY 2025–26 — Understand tax slabs, rebates, deductions, and maximize your take-home salary
          </p>
        </header>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">₹75K</div>
            <h3 className="font-semibold text-blue-900">Standard Deduction</h3>
            <p className="text-sm text-blue-700">New Regime</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">₹60K</div>
            <h3 className="font-semibold text-green-900">Section 87A Rebate</h3>
            <p className="text-sm text-green-700">Up to ₹12L Income</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">0%</div>
            <h3 className="font-semibold text-orange-900">Tax Rate</h3>
            <p className="text-sm text-orange-700">Up to ₹4L Income</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">₹12.75L</div>
            <h3 className="font-semibold text-purple-900">Zero Tax Limit</h3>
            <p className="text-sm text-purple-700">Gross Salary</p>
          </div>
        </div>

        {/* Overview Section */}
        <section className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-4">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">1. Overview of the New Tax Regime</h2>
          
          <p className="text-gray-700">
            The <strong>New Tax Regime</strong> introduced under Section 115BAC of the Income Tax Act offers simplified tax slabs with lower rates compared to the old regime. Starting from FY 2025–26, it is the <strong>default regime for all taxpayers</strong>, including central and state government employees.
          </p>
          
          <p className="text-gray-700">
            The key advantage is reduced tax liability through broader income slabs and enhanced rebate provisions under Section 87A. Unlike the old regime, the new regime does not allow most deductions like Section 80C (investments), 80D (health insurance), HRA, or LTA. However, standard deduction of <strong>₹75,000 for salaried employees</strong> is available.
          </p>

          <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded mt-6">
            <p className="text-sm"><strong>✓ Key Benefit:</strong> The regime is designed to benefit taxpayers with fewer investments and lower paperwork requirements. Most salaried employees save 10-15% tax compared to the old regime.</p>
          </div>
        </section>

        {/* Tax Slabs Section */}
        <section className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-4">
          <h2 className="text-3xl font-bold text-green-700 mb-6">2. Income Tax Slabs – FY 2025–26 (AY 2026-27)</h2>
          
          <p className="text-gray-700">
            The Finance Act 2025 significantly relaxed the tax slabs under the new regime. The basic exemption limit has been increased to ₹4 lakh, and progressive rates apply to higher income brackets. Here's the complete breakdown:
          </p>
          
          

          <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Taxable Income (After Standard Deduction)</th>
                  <th className="border border-gray-300 p-3 text-center">Tax Rate</th>
                  <th className="border border-gray-300 p-3 text-center">Amount (on income in this slab)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-50">
                  <td className="border border-gray-300 p-3">Up to ₹4,00,000</td>
                  <td className="border border-gray-300 p-3 text-center"><strong>Nil</strong></td>
                  <td className="border border-gray-300 p-3 text-center">₹0</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border border-gray-300 p-3">₹4,00,001 – ₹8,00,000</td>
                  <td className="border border-gray-300 p-3 text-center">5%</td>
                  <td className="border border-gray-300 p-3 text-center">Max ₹20,000 (on ₹4L)</td>
                </tr>
                <tr className="hover:bg-yellow-50">
                  <td className="border border-gray-300 p-3">₹8,00,001 – ₹12,00,000</td>
                  <td className="border border-gray-300 p-3 text-center">10%</td>
                  <td className="border border-gray-300 p-3 text-center">Max ₹40,000 (on ₹4L)</td>
                </tr>
                <tr className="hover:bg-purple-50">
                  <td className="border border-gray-300 p-3">₹12,00,001 – ₹16,00,000</td>
                  <td className="border border-gray-300 p-3 text-center">15%</td>
                  <td className="border border-gray-300 p-3 text-center">Max ₹60,000 (on ₹4L)</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="border border-gray-300 p-3">₹16,00,001 – ₹20,00,000</td>
                  <td className="border border-gray-300 p-3 text-center">20%</td>
                  <td className="border border-gray-300 p-3 text-center">Max ₹80,000 (on ₹4L)</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border border-gray-300 p-3">₹20,00,001 – ₹24,00,000</td>
                  <td className="border border-gray-300 p-3 text-center">25%</td>
                  <td className="border border-gray-300 p-3 text-center">Max ₹100,000 (on ₹4L)</td>
                </tr>
                <tr className="hover:bg-yellow-50">
                  <td className="border border-gray-300 p-3">Above ₹24,00,000</td>
                  <td className="border border-gray-300 p-3 text-center">30%</td>
                  <td className="border border-gray-300 p-3 text-center">30% of excess above ₹24L</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 bg-blue-50 border border-blue-200 p-3 rounded-lg mt-4">
            <strong>Note:</strong> Standard deduction of ₹75,000 is available for salaried employees under the new regime, effectively reducing taxable income. Health &amp; Education Cess (4%) applies on total tax. Surcharge (5-37%) applies for income above ₹50 lakh.
          </p>
        </section>

        {/* Section 87A Rebate Section */}
        <section className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-4">
          <h2 className="text-3xl font-bold text-orange-700 mb-6">3. Standard Deduction & Section 87A Rebate (UPDATED FY 2025–26)</h2>
          
          <p className="text-gray-700">
            Even under the new regime, salaried employees and pensioners get deductions and tax relief to reduce their tax burden. FY 2025–26 introduced significant improvements in both standard deduction and rebate limits.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Standard Deduction: ₹75,000 (New Regime) | ₹50,000 (Old Regime)</h3>
          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
            <ul className="list-disc pl-8 space-y-2 text-sm text-gray-700">
              <li><strong>New Regime Amount:</strong> ₹75,000 deduction from salary/pension income for FY 2025–26.</li>
              <li><strong>Old Regime Amount:</strong> ₹50,000 deduction from salary/pension income for FY 2025–26.</li>
              <li><strong>Who Gets It:</strong> All salaried individuals and pensioners under respective regimes (no conditions).</li>
              <li><strong>Automatic Benefit:</strong> You don't need to file any documents; it's automatically allowed.</li>
              <li><strong>Applicable To:</strong> Salary, pension, annuity payments—not business or capital gains.</li>
              <li><strong>Example (New Regime):</strong> Annual salary ₹50 lakh → Standard deduction ₹75,000 → Taxable income = ₹49,25,000.</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Section 87A Rebate – Enhanced in FY 2025–26</h3>
          <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">New Tax Regime (Major Improvement!):</h4>
              <ul className="list-disc pl-8 space-y-1 text-sm text-gray-700">
                <li><strong>Maximum Rebate:</strong> ₹60,000 (increased from ₹25,000)</li>
                <li><strong>Applicable Limit:</strong> For taxable income up to ₹12,00,000</li>
                <li><strong>Effective Benefit:</strong> Salaried employees with gross salary up to ₹12.75 lakh (after ₹75,000 standard deduction) pay ZERO tax.</li>
                <li><strong>How It Works:</strong> If your calculated tax is ₹60,000 or less, Section 87A rebate fully eliminates it (up to ₹60,000 rebate).</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Old Tax Regime (Unchanged):</h4>
              <ul className="list-disc pl-8 space-y-1 text-sm text-gray-700">
                <li><strong>Maximum Rebate:</strong> ₹12,500</li>
                <li><strong>Applicable Limit:</strong> For taxable income up to ₹5,00,000</li>
                <li><strong>Purpose:</strong> Complete tax relief for lower-income earners.</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-3 rounded mt-3">
              <p className="text-sm font-semibold text-gray-800 mb-2">📊 Practical Example (New Regime):</p>
              <p className="text-sm text-gray-700">For someone with ₹12 lakh taxable income:</p>
              <ul className="list-disc pl-8 text-sm mt-1 text-gray-700">
                <li>₹0 – ₹4 lakh @ 0% = ₹0</li>
                <li>₹4 – ₹8 lakh (₹4L) @ 5% = ₹20,000</li>
                <li>₹8 – ₹12 lakh (₹4L) @ 10% = ₹40,000</li>
                <li><strong>Total tax = ₹60,000</strong></li>
                <li><strong>Section 87A Rebate = ₹60,000</strong></li>
                <li><strong>Net tax = ₹0 (ZERO TAX!)</strong></li>
              </ul>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            <strong>Note:</strong> Standard deduction and 87A rebate are the main tax relief mechanisms in the new regime. Most other deductions are NOT available.
          </p>
        </section>

        {/* Comparison Section */}
        <section className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-4">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">4. Old Regime vs New Regime – Comparison (UPDATED)</h2>
          
          <p className="text-gray-700">
            Understanding the differences helps government employees choose the most beneficial option. Here's a comprehensive comparison:
          </p>

          

          <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Feature</th>
                  <th className="border border-gray-300 p-3">New Regime (FY 2025–26)</th>
                  <th className="border border-gray-300 p-3">Old Regime (FY 2025–26)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-50">
                  <td className="border border-gray-300 p-3 font-semibold">Slab Rates</td>
                  <td className="border border-gray-300 p-3">Lower (0%, 5%, 10%, 15%, 20%, 25%, 30%)</td>
                  <td className="border border-gray-300 p-3">Higher (10%, 20%, 30%)</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border border-gray-300 p-3 font-semibold">Standard Deduction</td>
                  <td className="border border-gray-300 p-3 text-green-700 font-bold">₹75,000 ✅</td>
                  <td className="border border-gray-300 p-3">₹50,000</td>
                </tr>
                <tr className="hover:bg-yellow-50">
                  <td className="border border-gray-300 p-3 font-semibold">Section 80C Deductions</td>
                  <td className="border border-gray-300 p-3">NOT allowed</td>
                  <td className="border border-gray-300 p-3">Allowed (up to ₹1.5 lakh)</td>
                </tr>
                <tr className="hover:bg-purple-50">
                  <td className="border border-gray-300 p-3 font-semibold">HRA Deduction</td>
                  <td className="border border-gray-300 p-3">NOT allowed</td>
                  <td className="border border-gray-300 p-3">Allowed (50%/40%/25% of salary)</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="border border-gray-300 p-3 font-semibold">Section 80D (Medical Insurance)</td>
                  <td className="border border-gray-300 p-3">NOT allowed</td>
                  <td className="border border-gray-300 p-3">₹25,000 (₹50,000 senior)</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border border-gray-300 p-3 font-semibold">Home Loan Interest</td>
                  <td className="border border-gray-300 p-3">NOT allowed</td>
                  <td className="border border-gray-300 p-3">Allowed (up to ₹2 lakh)</td>
                </tr>
                <tr className="hover:bg-yellow-50">
                  <td className="border border-gray-300 p-3 font-semibold">Section 87A Rebate</td>
                  <td className="border border-gray-300 p-3 text-green-700 font-bold">₹60,000 (up to ₹12L) ✅</td>
                  <td className="border border-gray-300 p-3">₹12,500 (up to ₹5L)</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="border border-gray-300 p-3 font-semibold">LTA (Leave Travel Allowance)</td>
                  <td className="border border-gray-300 p-3">NOT allowed</td>
                  <td className="border border-gray-300 p-3">Allowed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded mt-6">
            <p className="text-sm"><strong>💡 Pro Tip:</strong> Salaried employees can switch between regimes each year. Calculate tax under both regimes before filing ITR to save maximum tax. New regime is typically ₹15,000–₹50,000 more beneficial for most salaried employees.</p>
          </div>
        </section>

        {/* Tax Saving Tips Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-blue-50 shadow-md rounded-xl p-8 border border-indigo-200 space-y-4">
          <h2 className="text-3xl font-bold text-indigo-800 mb-6">5. Tax Saving Tips for Government Employees</h2>
          
          <p className="text-gray-700">
            Even with limited deductions in the new regime, government employees can optimize their tax liability through smart planning and strategy:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-3">💼 Salary Planning</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Maximize NPS contribution (14% employer + 10% employee)</li>
                <li>✓ Optimize allowance structure with HR</li>
                <li>✓ Plan HRA maximization in old regime</li>
                <li>✓ Compare take-home between regimes</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-3">📊 Regime Selection</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Compare both regimes annually before ITR filing</li>
                <li>✓ Use tax calculators for accurate estimates</li>
                <li>✓ Switch if old regime saves more tax</li>
                <li>✓ Track deduction status (80C, 80D, HRA, LTA)</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-3">📈 Investment Strategy</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Consider old regime if you claim 80C deductions</li>
                <li>✓ Invest in PPF, ELSS, LIC for tax saving</li>
                <li>✓ Plan health insurance (80D) in old regime</li>
                <li>✓ Maximize NPS under both regimes</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-3">✅ Filing Strategy</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ File ITR on time (deadline: July 31)</li>
                <li>✓ Claim all eligible deductions &amp; rebates</li>
                <li>✓ Maintain proper documentation for 5 years</li>
                <li>✓ Track refund status online after filing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-4">
          <h2 className="text-3xl font-bold text-red-700 mb-6">6. Frequently Asked Questions (FAQs)</h2>
          
          <div className="space-y-4">
            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: Is the new tax regime mandatory?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A:</strong> No, it's the default from FY 2025–26, but you can opt for the old regime if it saves more tax. Salaried employees can switch annually.
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: Can I switch regimes every year?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A:</strong> Yes, salaried employees can switch annually. Business owners can switch only once after choosing a regime.
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: What's the zero tax income limit for FY 2025–26?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A: Up to ₹12.75 lakh gross salary ✅</strong> under new regime (₹12L taxable + ₹75K standard deduction) with Section 87A rebate of ₹60,000.
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: Are HRA and LTA allowed in new regime?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A: No.</strong> Both HRA (House Rent Allowance) and LTA (Leave Travel Allowance) are only available in the old regime, not in the new regime.
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: Can I claim Section 80C in new regime?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A: No.</strong> Section 80C (PPF, insurance, LIC) is not allowed in new regime. However, employer's NPS contribution (80CCD(2)) is still allowed in both regimes.
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: Which regime is better for me?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A:</strong> Compare both regimes based on your salary and deductions. If old regime tax is lower by ₹10,000+, opt for old regime; otherwise, stick with new regime (which is default). Use our calculator to determine which saves more tax.
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: What is the standard deduction in both regimes?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A: New Regime: ₹75,000 ✅ | Old Regime: ₹50,000</strong> for FY 2025–26. Both are available for salaried employees and pensioners automatically, with no documentation required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">Q: Is surcharge applicable to government employees?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A:</strong> Surcharge is NOT applicable for most salaried employees earning up to ₹50 lakh annually. For income above ₹50 lakh, surcharge ranges from 5% to 37%. This calculator accounts for it automatically if your income triggers surcharge.
              </p>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-10 sm:p-14 text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Need Help with Tax Planning? 🚀
          </h2>
          <p className="text-center text-white mb-8 text-lg max-w-2xl mx-auto">
            Have questions about income tax? Want personalized guidance? Reach out to us for expert assistance!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-4">📧</div>
              <p className="text-xs text-yellow-900 mb-4 font-bold uppercase tracking-widest">Email Support</p>
              <a 
                href="mailto:cpcforgovtemployees@gmail.com"
                className="inline-block font-bold text-yellow-900 text-base hover:text-yellow-700 transition-colors underline underline-offset-4"
              >
                cpcforgovtemployees@gmail.com
              </a>
              <p className="text-xs text-yellow-800 mt-4 font-semibold">Response within 24 hours</p>
            </div>
            <div className="bg-gradient-to-br from-green-300 to-green-400 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-4">💬</div>
              <p className="text-xs text-green-900 mb-4 font-bold uppercase tracking-widest">Feedback</p>
              <p className="text-green-900 font-bold text-base leading-relaxed">
                Share your tax questions and feedback
              </p>
              <p className="text-xs text-green-800 mt-4 font-semibold">We value your input!</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
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

        {/* Disclaimer */}
        <div className="bg-gray-100 p-6 rounded-xl border border-gray-300">
          <h3 className="font-semibold text-gray-800 mb-3">📋 Disclaimer</h3>
          <p className="text-sm text-gray-600">
            This calculator and guide are based on <strong>FY 2025–26 Income Tax Act, Union Budget 2025 notifications, and official Government of India announcements</strong> as of January 2026. Income tax laws, slab rates, standard deductions, and rebate limits are subject to change. The calculations are for informational and estimation purposes only. For official tax confirmation, ITR filing, or complex cases, consult a Chartered Accountant. This guide does not constitute professional tax advice.
          </p>
        </div>

      </div>
    </main>
  );
}