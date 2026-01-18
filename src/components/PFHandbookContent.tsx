"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { TrendingUp, Wallet, DollarSign, BookOpen, HelpCircle, Target } from "lucide-react";

export default function PFHandbookContent() {
  return (
    <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Hero Section */}
        <header className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
            Provident Fund (PF) for Government Employees
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete Guide to GPF, EPF, and NPS — Understand contributions, interest rates, withdrawals, and maximize your retirement corpus
          </p>
        </header>

        {/* Quick Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-blue-900">GPF: 7.1%</h3>
            <p className="text-sm text-blue-700">Annual Interest (2026)</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-green-900">EPF: 8.25%</h3>
            <p className="text-sm text-green-700">Annual Interest (2026)</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-orange-900">NPS: 8-12%</h3>
            <p className="text-sm text-orange-700">Market-Linked Returns</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-purple-900">Tax-Free</h3>
            <p className="text-sm text-purple-700">Withdrawals (GPF/EPF)</p>
          </div>
        </div>

        {/* Overview Card */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-semibold text-blue-700">Overview of Provident Fund</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            <strong>Provident Fund (PF)</strong> provides long-term financial security to Indian central and state government employees. It is a compulsory savings scheme that ensures retirement planning by mandating regular contributions during an employee's service. The three main schemes relevant for government workers are:
          </p>
          
          

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">GPF</h4>
              <p className="text-sm text-gray-700">For employees joining before Jan 2004. Fixed interest, fully tax-free.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">EPF</h4>
              <p className="text-sm text-gray-700">Employer-employee contribution. Best for organized sector workers.</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2">NPS</h4>
              <p className="text-sm text-gray-700">Market-linked returns with higher govt. contribution for post-2004 hires.</p>
            </div>
          </div>
        </Card>

        {/* Contributions Card */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-7 h-7 text-green-600" />
            <h2 className="text-2xl font-semibold text-green-700">Employee & Employer Contribution Rules</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">EPF (Employees' Provident Fund)</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Both employee and employer contribute <strong>12% of Basic + DA</strong> monthly</li>
                <li>Employer's 12%: 8.33% to Pension Scheme (EPS) + 3.67% to EPF corpus</li>
                <li>Mandatory for organized sector (salary ≤ ₹25,000/month)</li>
                <li>Voluntary Provident Fund (VPF) for additional contributions</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-2">GPF (General Provident Fund)</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Only <strong>employee contributes</strong> (min 6%, typically up to 100%)</li>
                <li>Available to govt. employees appointed before <strong>Jan 1, 2004</strong></li>
                <li>All contributions accumulate with government-declared interest</li>
                <li>No employer matching required</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">NPS (National Pension System)</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Government employees: <strong>10% (employee)</strong> + <strong>14% (government)</strong></li>
                <li>Invested in equity, bonds, and government securities</li>
                <li>Mandatory for govt. hires post Jan 2004</li>
                <li>Voluntary for all other citizens</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Interest Rate Card */}
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 shadow-md rounded-xl p-6 border border-indigo-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-7 h-7 text-indigo-700" />
            <h2 className="text-2xl font-semibold text-indigo-800">Interest Rates (FY 2025-26)</h2>
          </div>
          
          

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2 text-center">EPF Rate</h4>
              <p className="text-3xl font-bold text-green-600 text-center mb-1">8.25%</p>
              <p className="text-xs text-gray-600 text-center">Per annum on closing balance</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2 text-center">GPF Rate</h4>
              <p className="text-3xl font-bold text-blue-600 text-center mb-1">7.1%</p>
              <p className="text-xs text-gray-600 text-center">Fixed by Finance Ministry</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2 text-center">NPS Returns</h4>
              <p className="text-3xl font-bold text-orange-600 text-center mb-1">8-12%</p>
              <p className="text-xs text-gray-600 text-center">Market-linked (historic avg)</p>
            </div>
          </div>

          <p className="text-sm text-indigo-700 bg-white p-3 rounded-lg border border-indigo-200 mt-4">
            <strong>📌 Important:</strong> EPF & GPF rates reviewed annually. NPS is market-linked with no guaranteed returns. Past performance: ~8-12% annually.
          </p>
        </Card>

        {/* Withdrawal & Retirement Rules Card */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-7 h-7 text-orange-600" />
            <h2 className="text-2xl font-semibold text-orange-700">Withdrawal & Retirement Rules</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">EPF Withdrawal</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Full withdrawal at <strong>superannuation (58 years)</strong> or after 2 months unemployment</li>
                <li>Partial withdrawals for marriage, education, illness, housing</li>
                <li>Premature withdrawal (&lt; 5 years): Taxable | After 5 years: Tax-free</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-2">GPF Withdrawal</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Full withdrawal on <strong>retirement, resignation, or death</strong></li>
                <li>Partial advances for housing, education, illness, marriage</li>
                <li>All withdrawals: <strong>100% Tax-Free</strong></li>
              </ul>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">NPS Withdrawal</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>At age 60: <strong>60% lump sum (tax-free)</strong> + <strong>40% annuity (taxable)</strong></li>
                <li>Partial withdrawals: Up to <strong>25% of own contributions</strong> after 3 years</li>
                <li>Premature exit after 10 years with certain restrictions</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Tax Implications Card */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-md rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-7 h-7 text-green-700" />
            <h2 className="text-2xl font-semibold text-green-800">Tax Benefits & Implications</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">EPF Tax Benefits</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ Section 80C: Deduction up to ₹1.5 lakh/year</li>
                <li>✅ Withdrawal tax-free if ≥ 5 years service</li>
                <li>✅ Interest credited annually (tax-free)</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">GPF Tax Benefits</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ Section 80C: Full deduction available</li>
                <li>✅ Final withdrawal: 100% Tax-Free (principal + interest)</li>
                <li>✅ Most tax-efficient option for government employees</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">NPS Tax Benefits</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ Section 80C: Contribution deduction up to ₹1.5 lakh</li>
                <li>✅ Section 80CCD(1B): Extra ₹50,000 deduction</li>
                <li>✅ Maturity: 60% tax-free lump sum + 40% annuity (taxable)</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Comparison Table Card */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">GPF vs EPF vs NPS: Side-by-Side Comparison</h2>
          
          

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full table-auto text-gray-700 text-sm">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border px-4 py-3 text-left font-semibold">Feature</th>
                  <th className="border px-4 py-3 text-left font-semibold">GPF</th>
                  <th className="border px-4 py-3 text-left font-semibold">EPF</th>
                  <th className="border px-4 py-3 text-left font-semibold">NPS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-50">
                  <td className="border px-4 py-2 font-medium">Eligible Employees</td>
                  <td className="border px-4 py-2">Govt. (joined before 01/01/2004)</td>
                  <td className="border px-4 py-2">Govt./Private (salary ≤ ₹25K/mo)</td>
                  <td className="border px-4 py-2">Post 01/01/2004 & all citizens</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="border px-4 py-2 font-medium">Contribution</td>
                  <td className="border px-4 py-2"><strong>Employee only</strong> (6-100%)</td>
                  <td className="border px-4 py-2">Both (12% each of Basic+DA)</td>
                  <td className="border px-4 py-2">Both (10% + 14% of Basic+DA)</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="border px-4 py-2 font-medium">Interest Rate</td>
                  <td className="border px-4 py-2"><strong>7.1%</strong> (fixed)</td>
                  <td className="border px-4 py-2"><strong>8.25%</strong> (fixed)</td>
                  <td className="border px-4 py-2">8-12% (market-linked)</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="border px-4 py-2 font-medium">Tax on Withdrawal</td>
                  <td className="border px-4 py-2"><strong>Nil</strong> (fully tax-free)</td>
                  <td className="border px-4 py-2">Nil if ≥ 5 years; else taxable</td>
                  <td className="border px-4 py-2">60% tax-free; 40% taxable</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="border px-4 py-2 font-medium">Withdrawal Age</td>
                  <td className="border px-4 py-2">Retirement/exit</td>
                  <td className="border px-4 py-2">58 years / 2 mo. jobless</td>
                  <td className="border px-4 py-2">60 years</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="border px-4 py-2 font-medium">Partial Withdrawal</td>
                  <td className="border px-4 py-2">Allowed (with approval)</td>
                  <td className="border px-4 py-2">Allowed (conditional)</td>
                  <td className="border px-4 py-2">Up to 25% after 3 years</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="border px-4 py-2 font-medium">Best For</td>
                  <td className="border px-4 py-2">Pre-2004 govt. employees</td>
                  <td className="border px-4 py-2">Organized sector workers</td>
                  <td className="border px-4 py-2">Post-2004 govt. hires</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Tips Card */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 shadow-md rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-7 h-7 text-purple-700" />
            <h2 className="text-2xl font-semibold text-purple-800">Smart PF Planning Tips</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">💼 For GPF Holders</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Maximize contributions (no limit)</li>
                <li>• Fully tax-free withdrawal</li>
                <li>• Perfect for long-term savings</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">📊 For EPF Holders</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Employer match benefit (12%)</li>
                <li>• Higher interest (8.25%)</li>
                <li>• Pension component (EPS)</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">🎯 For NPS Contributors</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Highest govt. contribution (14%)</li>
                <li>• Market-linked growth</li>
                <li>• Section 80CCD(1B) extra deduction</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">✅ General Tips</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Review scheme annually</li>
                <li>• Claim all tax deductions</li>
                <li>• Plan partial withdrawals wisely</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-10 sm:p-14 text-white mb-8 shadow-2xl">
          <h2 className="text-4xl font-black mb-3 text-center text-white drop-shadow-lg">
            Questions About Provident Fund? 🚀
          </h2>
          <p className="text-center text-white mb-10 text-lg font-medium drop-shadow-md max-w-2xl mx-auto">
            Confused about GPF, EPF, or NPS? Need help with calculations or strategy? We're here to assist!
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
              <p className="text-xs text-green-900 mb-4 font-bold uppercase tracking-widest">Feedback & Questions</p>
              <p className="text-green-900 font-bold text-base leading-relaxed">
                Share your PF questions and feedback
              </p>
              <p className="text-xs text-green-800 mt-4 font-semibold">We value your input!</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link href="/pf-calculator">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-lg hover:shadow-xl">
              Calculate Provident Fund
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