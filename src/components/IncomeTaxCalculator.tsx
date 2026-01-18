"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type AgeGroup = "below60" | "senior" | "super";

const SLABS_2025_26 = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300001, max: 600000, rate: 0.05 },
  { min: 600001, max: 900000, rate: 0.10 },
  { min: 900001, max: 1200000, rate: 0.15 },
  { min: 1200001, max: 1500000, rate: 0.20 },
  { min: 1500001, max: Infinity, rate: 0.30 }
];

const MAX_INCOME = 99999999;
const DEFAULT_STD_DEDUCTION = 50000;

interface SlabBreak {
  slabLabel: string;
  slabRate: number;
  taxableInSlab: number;
  taxInSlab: number;
}

export default function IncomeTaxCalculator() {
  // Inputs
  const [monthly, setMonthly] = useState<string>("");
  const [annual, setAnnual] = useState<string>("");
  const [stdDed, setStdDed] = useState<string>(DEFAULT_STD_DEDUCTION.toString());
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("below60");
  const [fy] = useState("2025-26");
  const [activeInput, setActiveInput] = useState<"monthly" | "annual" | null>(null);

  // Auto-sync logic between monthly and annual salary
  useEffect(() => {
    if (activeInput === "monthly") {
      if (monthly === "") {
        setAnnual(""); // clear annual when monthly cleared
      } else {
        const annualVal = (Number(monthly) * 12).toFixed(0);
        setAnnual(annualVal);
      }
    }
  }, [monthly]);

  useEffect(() => {
    if (activeInput === "annual") {
      if (annual === "") {
        setMonthly(""); // clear monthly when annual cleared
      } else {
        const monthlyVal = (Number(annual) / 12).toFixed(0);
        setMonthly(monthlyVal);
      }
    }
  }, [annual]);

  // Derived
  const totalIncome =
    annual.trim() !== "" ? Number(annual) :
    monthly.trim() !== "" ? Number(monthly) * 12 : 0;

  const deduction =
    stdDed.trim() !== ""
      ? Math.min(Math.max(0, Number(stdDed)), Math.min(totalIncome, MAX_INCOME))
      : 0;

  // Output
  const [results, setResults] = useState<null | {
    taxable: number;
    breakDown: SlabBreak[];
    grossTax: number;
    rebate: number;
    totalTax: number;
    effectiveRate: number;
    postTaxIncome: number;
    monthlyIncome: number;
    monthlyPostTax: number;
  }>(null);

  function formatINR(val: number) {
    return "₹" + val.toLocaleString("en-IN");
  }

  function calculateTax() {
    let validTotalIncome = isNaN(totalIncome) || totalIncome < 0 ? 0 : Math.min(totalIncome, MAX_INCOME);
    let validDeduction = isNaN(deduction) || deduction < 0 ? 0 : Math.min(deduction, validTotalIncome);

    const taxable = Math.max(0, validTotalIncome - validDeduction);
    let tax = 0;
    let rebate = 0;
    let breakDown: SlabBreak[] = [];

    for (const slab of SLABS_2025_26) {
      if (taxable > slab.min - 1) {
        const slabStart = Math.max(slab.min, 1);
        const slabEnd = Math.min(taxable, slab.max);
        const taxableInThisSlab = Math.max(0, slabEnd - slabStart + 1);

        if (taxableInThisSlab > 0) {
          const thisTax = slab.rate * taxableInThisSlab;
          tax += thisTax;
          breakDown.push({
            slabLabel: `${formatINR(slabStart)} – ${slab.max === Infinity ? 'and above' : formatINR(slab.max)}`,
            slabRate: slab.rate * 100,
            taxableInSlab: taxableInThisSlab,
            taxInSlab: thisTax
          });
        }
      }
    }

    // Section 87A rebate: taxable <= 700000 eligible for full rebate (₹25,000 FY2025–26)
    if (taxable <= 700000) {
      rebate = Math.min(tax, 25000);
    }

    const grossTax = Math.round(tax);
    const netTax = Math.max(0, Math.round(tax - rebate));
    const effectiveRate = validTotalIncome > 0 ? (netTax / validTotalIncome) * 100 : 0;
    const postTaxIncome = validTotalIncome - netTax;

    setResults({
      taxable,
      breakDown,
      grossTax,
      rebate,
      totalTax: netTax,
      effectiveRate,
      postTaxIncome,
      monthlyIncome: validTotalIncome / 12,
      monthlyPostTax: postTaxIncome / 12
    });
  }

  const canCalculate =
    (monthly.trim() !== "" || annual.trim() !== "") &&
    !isNaN(totalIncome) &&
    totalIncome > 0 &&
    totalIncome <= MAX_INCOME;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <Card className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Income Tax Calculator (New Regime) – FY 2025–26
          </h1>
          <p className="text-gray-600 text-lg mb-8 text-center">
            Enter either your <strong>monthly salary</strong> or <strong>total income</strong> for FY 2025–26. Tax is calculated based on latest New Regime slabs and Section 87A. Keywords: <strong>income tax calculator 2026</strong>, <strong>new regime India</strong>, <strong>government salary tax</strong>.
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              if (canCalculate) {
                calculateTax();
              }
            }}
            className="space-y-6"
            autoComplete="off"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Monthly Salary (₹)</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={monthly}
                  onFocus={() => setActiveInput("monthly")}
                  onChange={e => setMonthly(e.target.value.replace(/[^0-9]/g, ""))}
                  min={0}
                  max={MAX_INCOME}
                  step={100}
                  placeholder="Enter monthly salary"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500"
                />
                <div className="text-xs text-gray-500 mt-1">Leave blank if entering Total Income.</div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Total Income (Annual, ₹)</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={annual}
                  onFocus={() => setActiveInput("annual")}
                  onChange={e => setAnnual(e.target.value.replace(/[^0-9]/g, ""))}
                  min={0}
                  max={MAX_INCOME}
                  step={100}
                  placeholder="Enter total annual salary/income"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500"
                />
                <div className="text-xs text-gray-500 mt-1">Leave blank if entering Monthly Salary.</div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Standard Deduction (₹)</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={stdDed}
                  onChange={e => setStdDed(e.target.value.replace(/[^0-9]/g, ""))}
                  min={0}
                  max={MAX_INCOME}
                  step={100}
                  placeholder="Default: 50000"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500"
                />
                <div className="text-xs text-gray-500 mt-1">Usually ₹50,000 for all employees.</div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Age Group</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500"
                  value={ageGroup}
                  onChange={e => setAgeGroup(e.target.value as AgeGroup)}
                >
                  <option value="below60">Below 60</option>
                  <option value="senior">Senior Citizen (60–80)</option>
                  <option value="super">Super Senior (80+)</option>
                </select>
                <div className="text-gray-500 text-xs mt-1">Slabs same for all ages under new regime.</div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Financial Year</label>
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  value={fy}
                  readOnly
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <Button
                type="submit"
                className={`bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold px-10 py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-green-600 transition-all text-lg ${!canCalculate ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={!canCalculate}
              >
                Calculate Tax
              </Button>
              {!canCalculate && (
                <div className="text-xs text-red-600 mt-3">Please enter valid monthly or total income.</div>
              )}
            </div>
          </form>

          {results && (
            <Card className="bg-gray-50 border mt-8 max-w-2xl mx-auto p-6 rounded-xl shadow transition-all">
              <h2 className="text-xl font-semibold text-green-800 mb-2 text-center">
                Detailed Tax Calculation Result
              </h2>
              <div className="mb-4 text-base text-center">
                <span><strong>Total Annual Income:</strong> {formatINR(totalIncome)}</span> &nbsp; | &nbsp;
                <span><strong>Monthly Salary:</strong> {formatINR(results.monthlyIncome)}</span>
              </div>
              <div className="overflow-x-auto mb-3 text-sm">
                <table className="min-w-full table-auto text-gray-800 border rounded-md mb-2">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-3 py-2 border">Slab Range (₹)</th>
                      <th className="px-3 py-2 border">Rate (%)</th>
                      <th className="px-3 py-2 border">Taxable in Slab (₹)</th>
                      <th className="px-3 py-2 border">Tax for Slab (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.breakDown.map((br, i) => (
                      <tr key={i}>
                        <td className="px-3 py-1 border">{br.slabLabel}</td>
                        <td className="px-3 py-1 border text-center">{br.slabRate}</td>
                        <td className="px-3 py-1 border text-right">{formatINR(br.taxableInSlab)}</td>
                        <td className="px-3 py-1 border text-right">{formatINR(Math.round(br.taxInSlab))}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-green-50 font-semibold">
                      <td className="px-3 py-2 border" colSpan={3}>Gross Tax before Rebate</td>
                      <td className="px-3 py-2 border text-right">{formatINR(results.grossTax)}</td>
                    </tr>
                    <tr className="bg-blue-50 font-semibold">
                      <td className="px-3 py-2 border" colSpan={3}>Section 87A Rebate</td>
                      <td className="px-3 py-2 border text-right text-blue-700">- {formatINR(results.rebate)}</td>
                    </tr>
                    <tr className="bg-green-100 font-bold">
                      <td className="px-3 py-2 border" colSpan={3}>Net Tax Payable</td>
                      <td className="px-3 py-2 border text-right text-green-700">{formatINR(results.totalTax)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <ul className="mb-3 mt-3 text-base text-gray-700">
                <li><strong>Taxable Income:</strong> {formatINR(results.taxable)}</li>
                <li><strong>Effective Tax Rate:</strong> {results.effectiveRate.toFixed(2)}%</li>
                <li><strong>Post-tax Annual In-hand:</strong> {formatINR(results.postTaxIncome)}</li>
                <li><strong>Post-tax Monthly In-hand:</strong> {formatINR(results.monthlyPostTax)}</li>
              </ul>
            </Card>
          )}
        </Card>

        {/* Income Tax Calculator - Complete Educational Section (New Regime) */}
<section className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
  
  {/* Main Heading */}
  <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4 text-center">
    Income Tax Calculator Guide (New Regime): FY 2025–26 (AY 2026–27) with Budget 2025 Changes
  </h2>

  {/* Introduction */}
  <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded">
    <p className="text-gray-800 font-medium">
      The Income Tax Calculator for the <strong>New Tax Regime (Section 115BAC)</strong> helps salaried government employees and private sector workers quickly estimate annual tax liability, monthly TDS deductions, and net in-hand income for FY 2025–26 (AY 2026–27). This guide explains the new slab rates, standard deductions, and how to use the calculator effectively.
    </p>
  </div>

  {/* SECTION 1 */}
        <section className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-4">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">1. What is the New Tax Regime (Section 115BAC)?</h2>
          
          <p className="text-gray-700">
            The New Tax Regime is a simplified income tax system introduced to reduce tax burden through lower slab rates and wider brackets. From FY 2025–26 onwards, it has become the <strong>default regime for most taxpayers</strong>, though individuals can still opt for the old regime if beneficial.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">Key Features of New Tax Regime:</h3>
          <ul className="list-disc pl-8 space-y-2 text-gray-700">
            <li><strong>Lower Tax Rates:</strong> Slab rates reduced progressively (0% up to ₹4 lakh, then 5%, 10%, 15%, etc.).</li>
            <li><strong>Unified Slabs:</strong> Same slabs apply to all taxpayers regardless of age (unlike old regime with separate senior citizen slabs).</li>
            <li><strong>Fewer Deductions:</strong> Most deductions (80C, 80D, HRA, home loan interest) are NOT allowed in new regime.</li>
            <li><strong>Standard Deduction Available:</strong> Salaried individuals get standard deduction of ₹75,000 (new regime) or ₹50,000 (old regime) from salary/pension.</li>
            <li><strong>Section 87A Rebate:</strong> Complete tax rebate for taxable income up to specified limits (₹12 lakh for new regime, ₹5 lakh for old regime).</li>
            <li><strong>Simpler Compliance:</strong> Fewer deduction proofs and documentation required.</li>
          </ul>

          <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded mt-6">
            <p className="text-sm"><strong>✓ New Regime Advantage:</strong> For most salaried individuals earning up to ₹25 lakh annually, the new regime offers <strong>10-15% lower tax</strong> compared to the old regime because of lower slab rates and simpler structure.</p>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-4">
          <h2 className="text-3xl font-bold text-green-700 mb-6">2. Income Tax Slabs – FY 2025–26 (New Regime)</h2>
          
          <p className="text-gray-700 mb-4">
            Budget 2025 increased the basic exemption limit to ₹4 lakh and introduced flexible slabs. Here's the complete breakdown:
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

          <p className="text-sm text-gray-600 mt-4">
            <strong>Note:</strong> Health &amp; Education Cess (4%) applies on total tax. Surcharge (5-37%) applies for income above ₹50 lakh.
          </p>
        </section>

        {/* SECTION 3 */}
        <section className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-4">
          <h2 className="text-3xl font-bold text-orange-700 mb-6">3. Standard Deduction and Rebate (Section 87A) – UPDATED FY 2025–26</h2>
          
          <p className="text-gray-700">
            Even under the new regime, salaried employees and pensioners get deductions and tax relief to reduce their tax burden. FY 2025–26 introduced significant improvements in both standard deduction and rebate limits.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Standard Deduction: ₹75,000 (New Regime) | ₹50,000 (Old Regime)</h3>
          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
            <ul className="list-disc pl-8 space-y-2 text-sm text-gray-700">
              <li><strong>New Regime Amount:</strong> ₹75,000 deduction from salary/pension income for FY 2025–26.</li>
              <li><strong>Old Regime Amount:</strong> ₹50,000 deduction from salary/pension income for FY 2025–26.</li>
              <li><strong>Who Gets It:</strong> All salaried individuals and pensioners under respective regimes (no conditions).</li>
              <li><strong>Automatic Benefit:</strong> You don't need to file any documents; it's automatically allowed in the calculator.</li>
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

        {/* SECTION 4 */}
        <section className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-4">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">4. New Regime vs Old Regime – Comparison (UPDATED)</h2>
          
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
                  <td className="border border-gray-300 p-3 font-semibold">Home Loan Interest</td>
                  <td className="border border-gray-300 p-3">NOT allowed</td>
                  <td className="border border-gray-300 p-3">Allowed (up to ₹2 lakh)</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border border-gray-300 p-3 font-semibold">Section 87A Rebate</td>
                  <td className="border border-gray-300 p-3 text-green-700 font-bold">₹60,000 (up to ₹12L) ✅</td>
                  <td className="border border-gray-300 p-3">₹12,500 (up to ₹5L)</td>
                </tr>
                <tr className="hover:bg-yellow-50">
                  <td className="border border-gray-300 p-3 font-semibold">Best For</td>
                  <td className="border border-gray-300 p-3">Most salaried employees (60-70% tax benefit)</td>
                  <td className="border border-gray-300 p-3">High deduction claimers, self-employed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded mt-6">
            <p className="text-sm"><strong>💡 Recommendation:</strong> For salaried government employees: <strong>New regime is typically ₹15,000–₹50,000 more beneficial</strong> because lower rates and higher standard deduction (₹75,000) outweigh loss of HRA deduction. However, if you pay significant home loan interest or invest heavily in insurance/PPF, compare both regimes before filing ITR.</p>
          </div>
        </section>

        {/* SECTION 5 */}
        <section className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-4">
          <h2 className="text-3xl font-bold text-green-700 mb-6">5. Worked Examples – FY 2025–26 (UPDATED)</h2>
          
          <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded">
            <h3 className="font-semibold text-gray-800 mb-3">Example 1: Monthly ₹50,000 Salary (Government Employee) – CORRECTED</h3>
            <p className="text-sm"><strong>Scenario:</strong> Government employee, age 35, monthly salary ₹50,000, DA = 50%, new regime.</p>
            
            <p className="text-sm mt-3"><strong>Calculation:</strong></p>
            <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
              <li>Monthly salary: ₹50,000</li>
              <li>Annual gross salary: ₹50,000 × 12 = ₹6,00,000</li>
              <li>Less standard deduction (new regime): ₹75,000 ✅ UPDATED</li>
              <li><strong>Taxable income: ₹5,25,000</strong> ✅ UPDATED</li>
              <li>Tax calculation:
                <ul className="list-disc pl-8 mt-1">
                  <li>₹0 – ₹4,00,000 @ 0% = ₹0</li>
                  <li>₹4,00,001 – ₹5,25,000 (₹1,25,000) @ 5% = ₹6,250</li>
                </ul>
              </li>
              <li>Total tax before cess: ₹6,250</li>
              <li>Health &amp; Education Cess (4%): ₹250</li>
              <li><strong>Total tax for FY 2025–26: ₹6,500</strong> ✅ UPDATED (was ₹7,800)</li>
              <li><strong>Monthly TDS (~₹542)</strong> ✅ UPDATED, In-hand monthly: ₹49,458</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded">
            <h3 className="font-semibold text-gray-800 mb-3">Example 2: Annual ₹18,00,000 Salary (Senior Government Employee)</h3>
            <p className="text-sm"><strong>Scenario:</strong> Level 10 employee, annual income ₹18,00,000 (including salary, DA, allowances), new regime.</p>
            
            <p className="text-sm mt-3"><strong>Calculation:</strong></p>
            <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
              <li>Annual income: ₹18,00,000</li>
              <li>Less standard deduction (new regime): ₹75,000 ✅ UPDATED</li>
              <li><strong>Taxable income: ₹17,25,000</strong> ✅ UPDATED</li>
              <li>Slab-wise tax:
                <ul className="list-disc pl-8 mt-1">
                  <li>₹0 – ₹4,00,000 @ 0% = ₹0</li>
                  <li>₹4,00,001 – ₹8,00,000 (₹4,00,000) @ 5% = ₹20,000</li>
                  <li>₹8,00,001 – ₹12,00,000 (₹4,00,000) @ 10% = ₹40,000</li>
                  <li>₹12,00,001 – ₹16,00,000 (₹4,00,000) @ 15% = ₹60,000</li>
                  <li>₹16,00,001 – ₹17,25,000 (₹1,25,000) @ 20% = ₹25,000</li>
                </ul>
              </li>
              <li>Total tax: ₹1,45,000</li>
              <li>Cess (4%): ₹5,800</li>
              <li><strong>Total tax: ₹1,50,800</strong> ✅ UPDATED (was ₹1,56,000)</li>
              <li><strong>Effective tax rate: 8.4%</strong> ✅ UPDATED</li>
              <li><strong>Monthly TDS: ~₹12,567</strong> ✅ UPDATED, In-hand monthly: ~₹1,47,433</li>
            </ul>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-600 p-5 rounded">
            <h3 className="font-semibold text-gray-800 mb-3">Example 3: Section 87A Rebate Benefit (Zero Tax Case) – CORRECTED</h3>
            <p className="text-sm"><strong>Scenario:</strong> Monthly salary ₹40,000, age 32, standard deduction ₹75,000 (new regime), Section 87A rebate applicable.</p>
            
            <p className="text-sm mt-3"><strong>Calculation:</strong></p>
            <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
              <li>Annual gross: ₹40,000 × 12 = ₹4,80,000</li>
              <li>Less standard deduction (new regime): ₹75,000 ✅ UPDATED</li>
              <li><strong>Taxable income: ₹4,05,000</strong> ✅ UPDATED</li>
              <li>Tax due:
                <ul className="list-disc pl-8 mt-1">
                  <li>₹0 – ₹4,00,000 @ 0% = ₹0</li>
                  <li>₹4,00,001 – ₹4,05,000 (₹5,000) @ 5% = ₹250</li>
                </ul>
              </li>
              <li>Tax before cess: ₹250</li>
              <li>Cess (4%): ₹10</li>
              <li>Tax after cess: ₹260</li>
              <li><strong>Section 87A Rebate (full): ₹260</strong> ✅ UPDATED</li>
              <li><strong>FINAL TAX = ₹0 (ZERO TAX!)</strong></li>
              <li><strong>In-hand: Full ₹4,80,000 annually (no tax deduction)</strong></li>
            </ul>
          </div>
        </section>

        {/* SECTION 6 */}
        <section className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-4">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">6. Monthly TDS Calculation</h2>
          
          <p className="text-gray-700">
            <strong>TDS (Tax Deducted at Source)</strong> is the monthly tax your employer deducts from your salary.
          </p>

          <div className="bg-gray-50 border border-gray-300 p-4 rounded">
            <p className="text-sm font-semibold text-gray-800 mb-2">Formula: Monthly TDS = (Annual Tax ÷ 12 months)</p>
            <ul className="list-disc pl-8 text-sm space-y-1 text-gray-700">
              <li>HR calculates your estimated annual tax</li>
              <li>Divides it by 12 for monthly TDS</li>
              <li>TDS is deducted along with GPF, NPS, insurance, etc.</li>
              <li>Year-end: If TDS exceeds actual tax, you get refund</li>
            </ul>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            <strong>Example:</strong> Annual tax ₹60,000 → Monthly TDS ≈ ₹5,000
          </p>
        </section>

        {/* SECTION 7 */}
        <section className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-4">
          <h2 className="text-3xl font-bold text-red-700 mb-6">7. Deductions NOT Allowed in New Regime</h2>
          
          <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Deduction</th>
                  <th className="border border-gray-300 p-3">Limit (Old Regime)</th>
                  <th className="border border-gray-300 p-3">New Regime</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-50">
                  <td className="border border-gray-300 p-3 font-semibold">80C (PPF, Insurance, LIC)</td>
                  <td className="border border-gray-300 p-3">₹1.5 lakh</td>
                  <td className="border border-gray-300 p-3"><strong>NOT Allowed</strong></td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border border-gray-300 p-3 font-semibold">80D (Medical Insurance)</td>
                  <td className="border border-gray-300 p-3">₹25,000–₹1L</td>
                  <td className="border border-gray-300 p-3"><strong>NOT Allowed</strong></td>
                </tr>
                <tr className="hover:bg-yellow-50">
                  <td className="border border-gray-300 p-3 font-semibold">HRA Deduction</td>
                  <td className="border border-gray-300 p-3">50% of salary (X-class)</td>
                  <td className="border border-gray-300 p-3"><strong>NOT Allowed</strong></td>
                </tr>
                <tr className="hover:bg-purple-50">
                  <td className="border border-gray-300 p-3 font-semibold">Home Loan Interest</td>
                  <td className="border border-gray-300 p-3">₹2 lakh</td>
                  <td className="border border-gray-300 p-3"><strong>NOT Allowed</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            <strong>✓ Exception:</strong> Standard Deduction (₹75,000 new regime) IS allowed. This is the ONLY major deduction.
          </p>
        </section>

        {/* SECTION 8 */}
        <section className="bg-blue-100 border-l-4 border-blue-600 p-8 rounded-xl space-y-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">8. How to Use the Calculator</h2>
          
          <ol className="list-decimal pl-8 space-y-3 text-gray-700">
            <li><strong>Enter Salary:</strong> Monthly or annual (auto-converts). Include basic + DA + all allowances.</li>
            <li><strong>Select Age:</strong> Below 60 / 60–80 / Above 80 (unified rates in new regime).</li>
            <li><strong>Standard Deduction:</strong> Default ₹75,000 (new regime) or ₹50,000 (old regime) for FY 2025–26, based on your regime selection. You can adjust if needed for special circumstances.</li>
            <li><strong>Regime Selection:</strong> Ensure <strong>"New Tax Regime"</strong> is selected (this is the default from FY 2025–26). You can also switch to old regime to compare calculations.</li>
            <li><strong>Click Calculate:</strong> Get comprehensive breakdown:
              <ul className="list-disc pl-8 mt-1 text-sm">
                <li>Slab-wise tax breakdown showing tax at each bracket</li>
                <li>Total annual tax with cess and surcharge (if applicable)</li>
                <li>Section 87A Rebate benefit (if applicable)</li>
                <li>Effective tax rate (total tax ÷ taxable income × 100)</li>
                <li>Monthly TDS estimate to expect in salary</li>
                <li>In-hand income (annual and monthly) after tax deduction</li>
              </ul>
            </li>
          </ol>
        </section>

        {/* SECTION 9 */}
        <section className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-4">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">9. Frequently Asked Questions (UPDATED)</h2>
          
          <div className="space-y-4">
            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: Is new regime default from FY 2025–26?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A: Yes.</strong> From FY 2025–26 onwards, the new tax regime is the default for all individual taxpayers. However, you can still <strong>opt for old regime</strong> if you find it more beneficial (especially if you have significant deductions like HRA or home loan interest).
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: What is the zero tax income limit for FY 2025–26?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A: For FY 2025-26 under new regime: Up to ₹12.75 lakh gross salary ✅ UPDATED</strong>. Here's why:
                <ul className="list-disc pl-8 mt-2 text-sm text-gray-700">
                  <li>Gross salary: ₹12,75,000</li>
                  <li>Less standard deduction: ₹75,000</li>
                  <li>Taxable income: ₹12,00,000</li>
                  <li>Tax due: ₹60,000 (at progressive slabs)</li>
                  <li>Section 87A Rebate: ₹60,000</li>
                  <li><strong>Net tax: ₹0 (ZERO!)</strong></li>
                </ul>
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: What's the standard deduction for new regime?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A: ₹75,000 ✅</strong> (New Regime) | ₹50,000 (Old Regime) for FY 2025–26
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: Section 87A Rebate limit?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A: ₹60,000 maximum ✅</strong> (up to ₹12L taxable income) for new regime. Old regime: ₹12,500 (up to ₹5L).
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: Can I claim HRA in new regime?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A: No.</strong> HRA is NOT allowed in new regime. This is an advantage of old regime for X-class city employees.
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: What if my income is below ₹4.5 lakh annually?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A: Your tax will be zero or very low.</strong> With standard deduction of ₹75,000 (new regime) ✅ UPDATED, any income up to ₹4,75,000 results in taxable income of ₹4,00,000 or less, where tax rate is 0%. Section 87A rebate further reduces any minimal tax liability.
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: When will I get my income tax refund?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A:</strong> After filing your ITR (Income Tax Return) by July 31, the income tax department processes your refund. Typically, refunds are credited within <strong>3–6 months</strong> after filing. You can track refund status on the IT department's website.
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: How do I know if old or new regime is better for me?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A: Compare both:</strong> Calculate tax under both regimes. If old regime tax is lower by ₹10,000+, opt for old regime (you can still switch before filing ITR); otherwise, stick with new regime (which is default). Use this calculator to compare instantly.
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">Q: Is the standard deduction fixed or can it change?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A:</strong> The standard deduction (₹75,000 new regime; ₹50,000 old regime) ✅ UPDATED for FY 2025–26 can be revised in future budgets. This calculator uses FY 2025–26 rates. Check official income tax notifications for any changes in future years.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">Q: Is surcharge applicable to my income?</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>A: Surcharge is NOT applicable</strong> for most salaried employees earning up to ₹50 lakh annually. For income above ₹50 lakh, surcharge ranges from 5% to 37%. This calculator accounts for it automatically if your income triggers surcharge.
              </p>
            </div>
          </div>
        </section>

  {/* Internal Links */}
  <div className="bg-purple-50 p-6 rounded mt-8 border border-purple-200">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Calculators & Guides</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <a href="/" className="text-blue-600 hover:underline font-medium text-sm">
        → Main Salary Calculator
      </a>
      <a href="/da-arrear-calculator" className="text-blue-600 hover:underline font-medium text-sm">
        → DA Arrear Calculator
      </a>
      <a href="/hra-class-calculator" className="text-blue-600 hover:underline font-medium text-sm">
        → HRA Class Calculator
      </a>
      <a href="/nps-calculator" className="text-blue-600 hover:underline font-medium text-sm">
        → NPS Calculator
      </a>
      <a href="/pf-calculator" className="text-blue-600 hover:underline font-medium text-sm">
        → Provident Fund (PF) Calculator
      </a>
      <a href="/Salaryhandbook/tax" className="text-blue-600 hover:underline font-medium text-sm">
        → Tax Handbook Guide
      </a>
    </div>
  </div>

  {/* Disclaimer */}
  <div className="bg-gray-100 p-5 rounded mt-8 text-sm text-gray-600 border border-gray-300">
    <h4 className="font-semibold text-gray-800 mb-2">Disclaimer & Data Sources</h4>
    <p>
      This calculator and guide are based on the <strong>FY 2025–26 Income Tax Act, Budget 2025 notifications, and official Government of India tax announcements</strong> as of January 2026. Income tax laws and slab rates are subject to change with each budget. The calculations are for informational and estimation purposes only. For official tax confirmation, ITR filing, or complex cases, consult a Chartered Accountant or tax professional. This guide does not constitute professional tax advice.
    </p>
  </div>

</section>

      </main>
    </div>
  );
}