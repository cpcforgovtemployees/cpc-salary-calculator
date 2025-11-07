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

export default function IncomeTaxCalculatorPage() {
  // Inputs
  const [monthly, setMonthly] = useState<string>("");
  const [annual, setAnnual] = useState<string>("");
  const [stdDed, setStdDed] = useState<string>(DEFAULT_STD_DEDUCTION.toString());
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("below60");
  const [fy] = useState("2025-26");
  const [activeInput, setActiveInput] = useState<"monthly" | "annual" | null>(null);

  // Auto-sync logic between monthly and annual salary
// ✅ Auto-sync logic with reset handling
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
                <div className="text-xs text-red-600 mt-3">Please enter valid monthly or total income (₹1–₹99,999,999).</div>
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

        {/* How to Use Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            How to Use the Income Tax Calculator (New Regime)
          </h2>
          <p>
            Enter monthly salary or total income; the calculator auto-computes your annual, monthly, slab-wise, and post-tax breakdown for FY 2025–26:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Enter either <strong>monthly salary</strong> or <strong>annual income</strong>—both supported.</li>
            <li>Select <strong>age category</strong> (for completeness, though slabs are unified for new regime).</li>
            <li>Input or adjust <strong>standard deduction</strong> (default ₹50,000).</li>
            <li>Click <strong>Calculate</strong> for your exact tax, slab-by-slab, and in-hand income—annual and monthly.</li>
          </ul>
          <p className="mt-4">
            Uses the official <strong>New Tax Regime slab rates (Budget 2025)</strong> for quick, accurate tax estimation.
          </p>
        </section>
      </main>
    </div>
  );
}
