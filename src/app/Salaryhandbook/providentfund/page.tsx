"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function ProvidentFundPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Provident Fund (PF) for Government Employees (EPF, GPF, and NPS)</h1>

      {/* Overview Card */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all bg-gradient-to-b from-white via-blue-50 to-white">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Overview of Provident Fund</h2>
        <p className="text-gray-700 mb-2">
          Provident Fund (PF) provides long-term financial security to Indian central and state government employees. It is a compulsory savings scheme that ensures retirement planning by mandating regular contributions during an employee's service. The three main schemes relevant for government workers are General Provident Fund (GPF), Employees' Provident Fund (EPF), and the National Pension System (NPS). Each has its own eligibility, benefit structure, and rules for return, withdrawal, and tax. This guide explains how these schemes work, their current rules (2026), and how to maximize retirement benefits.
        </p>
      </Card>

      {/* Contributions Card */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all bg-gradient-to-b from-white via-blue-50 to-white">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Employee & Employer Contribution Rules</h2>
        <h3 className="text-lg font-semibold mb-1">EPF (Employees' Provident Fund)</h3>
        <ul className="list-disc list-inside text-gray-700 mb-2">
          <li>Both employee and employer contribute 12% of Basic + Dearness Allowance (DA) monthly.</li>
          <li>Of employer's 12% share, 8.33% goes to Employees' Pension Scheme (EPS) and 3.67% to EPF corpus.</li>
          <li>Mandatory for most government-linked and organized private sector workers with salary ≤ ₹25,000/month (2026).</li>
          <li>Employees can contribute more via Voluntary PF (VPF) but the employer's share remains capped.</li>
        </ul>
        <h3 className="text-lg font-semibold mb-1">GPF (General Provident Fund)</h3>
        <ul className="list-disc list-inside text-gray-700 mb-2">
          <li>Only employee contributes (minimum 6%, usually up to 100% of emoluments).</li>
          <li>Available to government employees appointed before January 1, 2004 (pre-NPS service).</li>
          <li>All contributions accumulate with government-declared interest (no employer matching).</li>
        </ul>
        <h3 className="text-lg font-semibold mb-1">NPS (National Pension System)</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Government employees (joining after Jan 2004) contribute 10% of Basic + DA; government contributes 14%.</li>
          <li>Invested in a mix of equity, corporate/government bonds, and other instruments; returns are market-linked.</li>
          <li>NPS is mandatory for most new central/state government hires and voluntary for others.</li>
        </ul>
      </Card>

      {/* Interest Rate Card */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all bg-gradient-to-b from-white via-blue-50 to-white">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Interest Rate (2026) and Annual Updates</h2>
        <ul className="list-disc list-inside text-gray-700 mb-2">
          <li><strong>EPF:</strong> 8.25% per annum for FY 2025-26 — credited annually on the closing balance.</li>
          <li><strong>GPF:</strong> 7.1% per annum for 2025-26, fixed quarterly by the Ministry of Finance.</li>
          <li><strong>NPS:</strong> Returns are market-linked, typically 8–12% (historic average, not guaranteed); portfolio varies as per fund choice.</li>
        </ul>
        <p className="text-gray-700">
          Rates are reviewed annually for EPF and quarterly for GPF. NPS does not have a guaranteed interest, but past performance in government sector schemes has often matched or exceeded 8% per annum.
        </p>
      </Card>

      {/* Withdrawal & Retirement Rules Card */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all bg-gradient-to-b from-white via-blue-50 to-white">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Withdrawal & Retirement Rules</h2>
        <h3 className="text-lg font-semibold mb-1">EPF</h3>
        <ul className="list-disc list-inside text-gray-700 mb-2">
          <li>Full withdrawal allowed at superannuation (58 years) or after two months' unemployment.</li>
          <li>Partial withdrawals for marriage, education, illness, housing, etc. (conditional caps apply).</li>
          <li>Premature withdrawal (&lt; 5 years service) taxable; after 5 years, tax-free.</li>
        </ul>
        <h3 className="text-lg font-semibold mb-1">GPF</h3>
        <ul className="list-disc list-inside text-gray-700 mb-2">
          <li>Final withdrawal possible on retirement, resignation, or death.</li>
          <li>Partial advances or withdrawals allowed for housing, education, illness, or marriage.</li>
          <li>Separate rules for advances and temporary withdrawals; approval needed from competent authority.</li>
        </ul>
        <h3 className="text-lg font-semibold mb-1">NPS</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>60% of corpus can be withdrawn lump sum at age 60; 40% must be used to buy an annuity.</li>
          <li>Partial withdrawals (up to 25% of own contributions) allowed after 3 years for specific needs.</li>
          <li>Premature exit allowed after 10 years (with some restrictions on corpus usage).</li>
        </ul>
      </Card>

      {/* Tax Implications Card */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all bg-gradient-to-b from-white via-blue-50 to-white">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Tax Implications on Provident Fund</h2>
        <ul className="list-disc list-inside text-gray-700 mb-2">
          <li><strong>EPF:</strong> Employee's contribution qualifies for Section 80C deduction up to ₹1.5 lakh/year. Final withdrawal and interest are tax-free if account is held for at least 5 years.</li>
          <li><strong>GPF:</strong> Entire withdrawal (principal and interest) tax free. Section 80C benefit available.</li>
          <li><strong>NPS:</strong> Employee contributions eligible for Section 80C and an extra ₹50,000 under Section 80CCD(1B). At maturity, 60% of corpus is tax-free, 40% (annuity) is taxable as income per the individual's slab.</li>
        </ul>
        <p className="text-sm text-blue-700">
          Note: New income tax regimes and annual Budget updates may modify benefits. Check with a financial advisor or current rules.
        </p>
      </Card>

      {/* Difference Card */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all bg-gradient-to-b from-white via-blue-50 to-white">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Difference between GPF, EPF, and NPS</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border text-gray-700 text-sm">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-4 py-2">Feature</th>
                <th className="border px-4 py-2">GPF</th>
                <th className="border px-4 py-2">EPF</th>
                <th className="border px-4 py-2">NPS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-medium">Eligible Employees</td>
                <td className="border px-4 py-2">Govt. employees (joined before 01/01/2004)</td>
                <td className="border px-4 py-2">Govt./private org (salary ≤ ₹25,000/mo)</td>
                <td className="border px-4 py-2">Govt. hires post 01/01/2004 and all citizens</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Contribution</td>
                <td className="border px-4 py-2">Employee only</td>
                <td className="border px-4 py-2">Both employee &amp; employer</td>
                <td className="border px-4 py-2">Both; higher govt. share</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Interest/Returns</td>
                <td className="border px-4 py-2">7.1% (fixed; 2026)</td>
                <td className="border px-4 py-2">8.25% (fixed; 2026)</td>
                <td className="border px-4 py-2">Market-linked (8-12% typical)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Tax on Withdrawal</td>
                <td className="border px-4 py-2">Nil</td>
                <td className="border px-4 py-2">Nil if ≥5 years; else taxable</td>
                <td className="border px-4 py-2">60% tax-free; 40% taxable on annuity</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Withdrawal Age</td>
                <td className="border px-4 py-2">Retirement/exit</td>
                <td className="border px-4 py-2">58 years/2 mo. jobless</td>
                <td className="border px-4 py-2">60 years</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-gray-700">
          For hands-on calculations, try our <Link href="/pf-calculator" className="text-blue-700 underline hover:text-blue-900">Provident Fund Calculator</Link>.
        </p>
      </Card>

      {/* CTA Button */}
      <div className="flex justify-center mt-8">
        <Link href="/pf-calculator">
          <button className="bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-green-600 transition-all text-xl">
            Calculate Provident Fund
          </button>
        </Link>
      </div>
    </div>
  );
}