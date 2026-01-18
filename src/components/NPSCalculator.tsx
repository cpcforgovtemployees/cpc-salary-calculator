"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Utility functions
const toNum = (v: string) => {
  const n = parseFloat((v || "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const fmtNum = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n || 0));

const fmtINR = (n: number) => `₹${fmtNum(n)}`;

const EMP_PCT = 0.1;  // Employee 10% of (Basic + DA)
const EMPR_PCT = 0.14; // Employer 14% of (Basic + DA)

type TabKey = "deduction" | "projection";

export default function NPSCalculator() {
  const [basic, setBasic] = useState("");
  const [daPct, setDaPct] = useState("50");
  const [tab, setTab] = useState<TabKey>("deduction");
  const [age, setAge] = useState("30");
  const [retAge, setRetAge] = useState("60");
  const [annualReturnPct, setAnnualReturnPct] = useState("9");
  const [currentCorpus, setCurrentCorpus] = useState("0");
  const [annuityPurchasePct, setAnnuityPurchasePct] = useState("40");
  const [annuityRatePct, setAnnuityRatePct] = useState("6");
  const [showMonthly, setShowMonthly] = useState(false);
  const [showProjection, setShowProjection] = useState(false);

  const basicNum = toNum(basic);
  const daPctNum = clamp(toNum(daPct), 0, 200);
  const daAmt = (basicNum * daPctNum) / 100;
  const basicPlusDa = basicNum + daAmt;

  // Monthly NPS amounts
  const empMonthly = basicPlusDa * EMP_PCT;
  const emprMonthly = basicPlusDa * EMPR_PCT;
  const totalMonthly = empMonthly + emprMonthly;
  const annualTotal = totalMonthly * 12;

  // Projection calculations
  const monthsToRetire = useMemo(() => {
    const a = clamp(toNum(age), 18, 80);
    const r = clamp(toNum(retAge), a + 1, 75);
    return Math.max(0, Math.round((r - a) * 12));
  }, [age, retAge]);

  const monthlyRate = useMemo(() => {
    const r = clamp(toNum(annualReturnPct) / 100, 0, 0.25);
    return r / 12;
  }, [annualReturnPct]);

  // FV of future contributions
  const fvFromPMT = useMemo(() => {
    const pmt = totalMonthly, n = monthsToRetire, i = monthlyRate;
    if (n <= 0 || pmt <= 0) return 0;
    if (i === 0) return pmt * n;
    return pmt * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  }, [totalMonthly, monthsToRetire, monthlyRate]);

  // FV of existing corpus
  const fvFromPV = useMemo(() => {
    const pv = Math.max(0, toNum(currentCorpus)), n = monthsToRetire, i = monthlyRate;
    if (n <= 0 || pv <= 0) return pv;
    return pv * Math.pow(1 + i, n);
  }, [currentCorpus, monthsToRetire, monthlyRate]);

  const totalCorpusAtRetirement = useMemo(() => fvFromPMT + fvFromPV, [fvFromPMT, fvFromPV]);
  const annuityPurchase = useMemo(() => (clamp(toNum(annuityPurchasePct), 0, 100) / 100) * totalCorpusAtRetirement, [totalCorpusAtRetirement, annuityPurchasePct]);
  const lumpSum = useMemo(() => Math.max(0, totalCorpusAtRetirement - annuityPurchase), [totalCorpusAtRetirement, annuityPurchase]);
  const monthlyPension = useMemo(() => annuityPurchase * (clamp(toNum(annuityRatePct) / 100, 0, 0.2) / 12), [annuityPurchase, annuityRatePct]);

  const canCalcMonthly = basicNum > 0 && daPctNum >= 0;
  const canCalcProjection = canCalcMonthly && monthsToRetire > 0;

  const resetAll = () => {
    setBasic(""); setDaPct("50"); setAge("30"); setRetAge("60");
    setAnnualReturnPct("9"); setCurrentCorpus("0"); setAnnuityPurchasePct("40");
    setAnnuityRatePct("6"); setShowMonthly(false); setShowProjection(false);
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "deduction", label: "Monthly NPS Deduction" },
    { key: "projection", label: "Retirement Projection (Corpus & Pension)" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" aria-label="NPS Calculator for Government Employees">
        {/* H1 Title */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-500 bg-clip-text text-transparent mb-4 tracking-tight">
            National Pension System (NPS) Calculator
          </h1>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Calculate <strong>monthly NPS deductions</strong> and <strong>project your retirement corpus and monthly pension</strong>{" "}
            under Central and State Government employee rules for the 7th & 8th Pay Commission.
          </p>
        </div>
        {/* Tabs */}
        <section aria-label="Calculator Mode" className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Choose Calculator Mode</h2>
          <div className="inline-flex p-1 bg-indigo-50 rounded-full border border-indigo-100 shadow-sm">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                aria-pressed={tab === t.key}
                className={[
                  "px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all",
                  tab === t.key ? "bg-indigo-600 text-white shadow" : "bg-transparent text-indigo-700 hover:bg-indigo-100"
                ].join(" ")}
              >
                {t.label}
              </button>
            ))}
          </div>
        </section>

        {/* Monthly NPS Deduction */}
        <section role="tabpanel" aria-labelledby="monthly-deduction" hidden={tab !== "deduction"} className={tab === "deduction" ? "block" : "hidden"}>
          <h2 id="monthly-deduction" className="text-2xl font-semibold text-gray-800 text-center mb-6">Monthly NPS Deduction Calculator</h2>
          <Card className="max-w-2xl mx-auto p-6 sm:p-8 border border-gray-200 rounded-xl shadow-sm bg-white space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-medium text-gray-700">Basic Pay</Label>
                <Input type="number" value={basic} onChange={e => setBasic(e.target.value)} placeholder="e.g. 60000" className="mt-1" inputMode="numeric" />
              </div>
              <div>
                <Label className="font-medium text-gray-700">DA (%)</Label>
                <Input type="number" value={daPct} onChange={e => setDaPct(e.target.value)} placeholder="e.g. 50" className="mt-1" inputMode="numeric" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={() => setShowMonthly(true)} disabled={!canCalcMonthly} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2">Calculate Monthly NPS</Button>
              <Button variant="outline" onClick={resetAll} className="w-full sm:w-auto">Reset</Button>
            </div>
            {showMonthly && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Monthly NPS Contribution Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 text-sm text-gray-700">
                    <thead className="bg-gray-100 text-gray-800">
                      <tr>
                        <th className="px-4 py-2 border text-left">Component</th>
                        <th className="px-4 py-2 border text-right">Rate</th>
                        <th className="px-4 py-2 border text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border">Employee NPS</td>
                        <td className="px-4 py-2 border text-right">10%</td>
                        <td className="px-4 py-2 border text-right">{fmtNum(empMonthly)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Employer NPS</td>
                        <td className="px-4 py-2 border text-right">14%</td>
                        <td className="px-4 py-2 border text-right">{fmtNum(emprMonthly)}</td>
                      </tr>
                      <tr className="bg-gray-50 font-semibold">
                        <td className="px-4 py-2 border">Total Monthly NPS</td>
                        <td className="px-4 py-2 border text-right">—</td>
                        <td className="px-4 py-2 border text-right text-green-700">{fmtINR(totalMonthly)}</td>
                      </tr>
                      <tr className="bg-gray-50 font-semibold">
                        <td className="px-4 py-2 border">Annual NPS (12 months)</td>
                        <td className="px-4 py-2 border text-right">—</td>
                        <td className="px-4 py-2 border text-right text-green-700">{fmtINR(annualTotal)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-sm text-gray-600">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="font-medium text-gray-700">Basic + DA</div>
                    <div className="mt-1 text-base font-semibold">{fmtNum(basicPlusDa)}</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="font-medium text-gray-700">DA Amount</div>
                    <div className="mt-1 text-base font-semibold">{fmtNum(daAmt)}</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="font-medium text-gray-700">Monthly Total (₹)</div>
                    <div className="mt-1 text-base font-semibold">{fmtNum(totalMonthly)}</div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </section>

        {/* Projection */}
        <section role="tabpanel" aria-labelledby="projection" hidden={tab !== "projection"} className={tab === "projection" ? "block" : "hidden"}>
          <h2 id="projection" className="text-2xl font-semibold text-gray-800 text-center mb-6">NPS Retirement Projection (Corpus & Pension)</h2>
          <Card className="max-w-3xl mx-auto p-6 sm:p-8 border border-gray-200 rounded-xl shadow-sm bg-white space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-medium text-gray-700">Basic Pay</Label>
                <Input type="number" value={basic} onChange={e => setBasic(e.target.value)} placeholder="e.g. 60000" className="mt-1" inputMode="numeric" />
              </div>
              <div>
                <Label className="font-medium text-gray-700">DA (%)</Label>
                <Input type="number" value={daPct} onChange={e => setDaPct(e.target.value)} placeholder="e.g. 50" className="mt-1" inputMode="numeric" />
              </div>
              <div>
                <Label className="font-medium text-gray-700">Current Age (yrs)</Label>
                <Input type="number" value={age} onChange={e => setAge(e.target.value)} className="mt-1" inputMode="numeric" />
              </div>
              <div>
                <Label className="font-medium text-gray-700">Retirement Age (yrs)</Label>
                <Input type="number" value={retAge} onChange={e => setRetAge(e.target.value)} className="mt-1" inputMode="numeric" />
              </div>
              <div>
                <Label className="font-medium text-gray-700">Expected Annual Return (%)</Label>
                <Input type="number" value={annualReturnPct} onChange={e => setAnnualReturnPct(e.target.value)} placeholder="e.g. 9" className="mt-1" inputMode="decimal" />
              </div>
              <div>
                <Label className="font-medium text-gray-700">Current NPS Corpus (₹)</Label>
                <Input type="number" value={currentCorpus} onChange={e => setCurrentCorpus(e.target.value)} placeholder="e.g. 100000" className="mt-1" inputMode="numeric" />
              </div>
              <div>
                <Label className="font-medium text-gray-700">Annuity Purchase at Retirement (%)</Label>
                <Input type="number" value={annuityPurchasePct} onChange={e => setAnnuityPurchasePct(e.target.value)} placeholder="min 40" className="mt-1" inputMode="decimal" />
              </div>
              <div>
                <Label className="font-medium text-gray-700">Annuity Annual Rate (%)</Label>
                <Input type="number" value={annuityRatePct} onChange={e => setAnnuityRatePct(e.target.value)} placeholder="e.g. 6" className="mt-1" inputMode="decimal" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={() => setShowProjection(true)} disabled={!canCalcProjection} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2">Calculate Projection</Button>
              <Button variant="outline" onClick={resetAll} className="w-full sm:w-auto">Reset</Button>
            </div>
            {showProjection && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Retirement Corpus & Pension Projection</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="border border-gray-200 rounded-lg p-3 text-sm">
                    <div className="text-gray-600">Months to Retirement</div>
                    <div className="mt-1 text-lg font-semibold">{fmtNum(monthsToRetire)}</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3 text-sm">
                    <div className="text-gray-600">Monthly NPS (Emp + Empr)</div>
                    <div className="mt-1 text-lg font-semibold">{fmtNum(totalMonthly)}</div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 text-sm text-gray-700">
                    <thead className="bg-gray-100 text-gray-800">
                      <tr>
                        <th className="px-4 py-2 border text-left">Component</th>
                        <th className="px-4 py-2 border text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border">Future Value from Monthly Contributions</td>
                        <td className="px-4 py-2 border text-right">{fmtNum(fvFromPMT)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Future Value of Current Corpus</td>
                        <td className="px-4 py-2 border text-right">{fmtNum(fvFromPV)}</td>
                      </tr>
                      <tr className="bg-gray-50 font-semibold">
                        <td className="px-4 py-2 border">Total Corpus at Retirement</td>
                        <td className="px-4 py-2 border text-right text-green-700">{fmtINR(totalCorpusAtRetirement)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Annuity Purchase</td>
                        <td className="px-4 py-2 border text-right">{fmtNum(annuityPurchase)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Lump Sum</td>
                        <td className="px-4 py-2 border text-right">{fmtNum(lumpSum)}</td>
                      </tr>
                      <tr className="bg-gray-50 font-semibold">
                        <td className="px-4 py-2 border">Estimated Monthly Pension</td>
                        <td className="px-4 py-2 border text-right text-green-700">{fmtINR(monthlyPension)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Card>
        </section>
        {/* NPS Calculator - Complete Educational Section */}
<article aria-label="NPS Information" className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
  
  {/* Main Heading */}
  <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4 text-center">
    National Pension System (NPS) Calculator Guide: Retirement Planning for Government Employees
  </h2>

  {/* Introduction */}
  <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded">
    <p className="text-gray-800 font-medium">
      The National Pension System (NPS) is a defined-contribution pension scheme that's mandatory for all government employees joining after 2004 and optional for older employees. This guide explains how NPS works, how contributions are calculated, and how to plan your retirement corpus using our NPS calculator.
    </p>
  </div>

  {/* Section 1: What is NPS? */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      1. What is the National Pension System (NPS)?
    </h3>
    <p>
      The National Pension System (NPS) is a government-regulated, market-linked pension scheme designed to provide retirement security for Indian citizens, especially government employees. Unlike the old pension scheme where the government guaranteed a fixed pension, NPS is a <strong>defined-contribution system</strong> where your retirement corpus depends on:
    </p>
    <ul className="list-disc pl-8 space-y-2 mt-3">
      <li>How much you contribute</li>
      <li>How much your employer (government) contributes</li>
      <li>How well your invested funds perform in the market</li>
      <li>The time period you invest (longer = more growth)</li>
    </ul>
    <p className="mt-4">
      <strong>Key advantage:</strong> NPS offers flexibility, tax benefits, and professional fund management at a low cost.
    </p>
  </div>

  {/* Section 2: NPS for Government Employees */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      2. NPS Structure for Central & State Government Employees
    </h3>
    <p>
      Government employees have a unique NPS advantage: the government (employer) contributes a significant amount on your behalf, boosting your retirement corpus substantially.
    </p>

    <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Contribution Breakdown (7th Pay Commission)</h4>
    <div className="bg-gray-50 border border-gray-300 p-4 rounded mt-3">
      <p className="font-mono text-center text-gray-800 font-bold mb-3">
        NPS Contribution = 24% of (Basic Pay + Dearness Allowance)
      </p>
      <ul className="space-y-2 text-sm">
        <li className="flex justify-between">
          <span><strong>Employee Contribution:</strong></span>
          <span>10% of (Basic + DA)</span>
        </li>
        <li className="flex justify-between">
          <span><strong>Government (Employer) Contribution:</strong></span>
          <span>14% of (Basic + DA)</span>
        </li>
        <li className="flex justify-between border-t-2 pt-2 mt-2">
          <span><strong>Total Monthly Contribution:</strong></span>
          <span><strong>24% of (Basic + DA)</strong></span>
        </li>
      </ul>
    </div>

    <p className="mt-4">
      <strong>Important:</strong> The 10% employee contribution is mandatory and deducted from your salary. The 14% government contribution is an additional benefit.
    </p>
  </div>

  {/* Section 3: NPS Tiers - Tier 1 and Tier 2 */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      3. Understanding NPS Tier-1 and Tier-2 Accounts
    </h3>
    <p>
      NPS offers two types of accounts with different rules and flexibility:
    </p>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">NPS Tier-1 (Retirement Account)</h4>
    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
      <ul className="list-disc pl-8 space-y-2 text-sm">
        <li><strong>Lock-in Period:</strong> Until retirement (age 60). No withdrawals allowed during service.</li>
        <li><strong>Partial Withdrawal:</strong> Allowed only in specific cases (financial hardship, medical emergency, higher education).</li>
        <li><strong>Return Profile:</strong> Market-linked. You choose your fund manager and asset allocation.</li>
        <li><strong>Tax Benefit:</strong> Contributions eligible for deduction under Section 80CCD(1) up to ₹1.5 lakh/year. Plus additional ₹50,000 under 80CCD(1B).</li>
        <li><strong>At Retirement:</strong> Minimum 40% corpus must be used to buy an annuity. Remaining can be withdrawn as lump sum.</li>
        <li><strong>Mandatory for Government Employees:</strong> All Central Govt employees after 2004 must have Tier-1.</li>
      </ul>
    </div>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">NPS Tier-2 (Savings Account)</h4>
    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
      <ul className="list-disc pl-8 space-y-2 text-sm">
        <li><strong>Lock-in Period:</strong> None. Withdraw anytime after 1 year of opening.</li>
        <li><strong>Flexibility:</strong> Deposits and withdrawals can be made whenever needed.</li>
        <li><strong>Return Profile:</strong> Market-linked, similar to Tier-1. You choose fund manager.</li>
        <li><strong>Tax Benefit:</strong> Contributions NOT eligible for tax deduction (invested from post-tax income).</li>
        <li><strong>No Annuity Requirement:</strong> Withdraw full amount whenever needed; no annuity purchase requirement.</li>
        <li><strong>Optional for Government Employees:</strong> You can open Tier-2 even if not a Tier-1 subscriber.</li>
      </ul>
    </div>

    <div className="bg-yellow-100 border border-yellow-400 rounded p-4 mt-5">
      <p className="font-semibold text-gray-800 text-sm">💡 Best Practice for Government Employees:</p>
      <p className="text-gray-700 text-sm mt-2">
        Maximize your Tier-1 contributions (mandatory 10% + voluntary up to ₹2 lakh/year via 80CCD(1B) to get ₹50,000 deduction). Use Tier-2 for additional savings if surplus income available.
      </p>
    </div>
  </div>

  {/* Section 4: NPS Fund Options and Risk Profiles */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      4. NPS Fund Types and Asset Allocation
    </h3>
    <p>
      NPS allows you to choose how your contributions are invested across different asset classes through different fund managers (like SBI, HDFC, LIC, ICICI, Axis, etc.).
    </p>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Fund Categories</h4>
    <table className="w-full border-collapse border border-gray-300 text-sm mt-4">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="border border-gray-300 p-3 text-left">Fund Type</th>
          <th className="border border-gray-300 p-3">Equity %</th>
          <th className="border border-gray-300 p-3">Bonds %</th>
          <th className="border border-gray-300 p-3">Best For</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-blue-50">
          <td className="border border-gray-300 p-3 font-semibold">Aggressive (E)</td>
          <td className="border border-gray-300 p-3 text-center">100%</td>
          <td className="border border-gray-300 p-3 text-center">0%</td>
          <td className="border border-gray-300 p-3 text-sm">Young employees, long investment horizon (&gt;20 yrs)</td>
        </tr>
        <tr className="hover:bg-green-50">
          <td className="border border-gray-300 p-3 font-semibold">Moderate (C)</td>
          <td className="border border-gray-300 p-3 text-center">60%</td>
          <td className="border border-gray-300 p-3 text-center">40%</td>
          <td className="border border-gray-300 p-3 text-sm">Mid-career, balanced risk-return</td>
        </tr>
        <tr className="hover:bg-yellow-50">
          <td className="border border-gray-300 p-3 font-semibold">Conservative (G)</td>
          <td className="border border-gray-300 p-3 text-center">20%</td>
          <td className="border border-gray-300 p-3 text-center">80%</td>
          <td className="border border-gray-300 p-3 text-sm">Pre-retirement, low risk tolerance</td>
        </tr>
      </tbody>
    </table>

    <p className="mt-4 text-sm text-gray-600">
      <strong>Rule of thumb:</strong> Younger employees should choose Aggressive/Moderate funds to benefit from long-term equity growth. As you approach retirement, gradually shift to Conservative.
    </p>
  </div>

  {/* Section 5: NPS Contribution Calculation - Worked Examples */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      5. NPS Contribution Calculation - Real Examples
    </h3>

    <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded mt-4">
      <h4 className="font-semibold text-gray-800 mb-3">Example 1: Entry-Level Government Employee</h4>
      <p className="text-sm"><strong>Situation:</strong> You just joined as Level 1 employee with Basic Pay ₹21,000 and current DA = 50%.</p>
      
      <p className="text-sm mt-3"><strong>Calculation:</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Basic Pay = ₹21,000</li>
        <li>DA = 50% of ₹21,000 = ₹10,500</li>
        <li>Basic + DA = ₹31,500</li>
        <li><strong>Employee NPS (10%):</strong> ₹3,150/month</li>
        <li><strong>Government NPS (14%):</strong> ₹4,410/month</li>
        <li><strong>Total NPS Contribution:</strong> ₹7,560/month = ₹90,720/year</li>
      </ul>
      
      <p className="text-sm mt-3"><strong>Over 35 years service (to age 60):</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Total contributions (employee + employer): ~₹32-35 lakh (excluding DA increases)</li>
        <li>With 8% average annual return: Estimated corpus at retirement: ~₹3-4 crore</li>
      </ul>
    </div>

    <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded mt-4">
      <h4 className="font-semibold text-gray-800 mb-3">Example 2: Mid-Level Government Employee</h4>
      <p className="text-sm"><strong>Situation:</strong> You are a Level 8 employee with Basic Pay ₹75,000 and DA = 50%.</p>
      
      <p className="text-sm mt-3"><strong>Calculation:</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Basic Pay = ₹75,000</li>
        <li>DA = 50% of ₹75,000 = ₹37,500</li>
        <li>Basic + DA = ₹112,500</li>
        <li><strong>Employee NPS (10%):</strong> ₹11,250/month</li>
        <li><strong>Government NPS (14%):</strong> ₹15,750/month</li>
        <li><strong>Total NPS Contribution:</strong> ₹27,000/month = ₹3,24,000/year</li>
      </ul>
      
      <p className="text-sm mt-3"><strong>After 25 years of remaining service:</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Total contributions accumulated: ~₹1.5 crore (excluding growth, DA increases)</li>
        <li>With 8% average return + DA increases: Estimated corpus: ~₹3.5-4.5 crore</li>
      </ul>
    </div>

    <div className="bg-orange-50 border-l-4 border-orange-600 p-5 rounded mt-4">
      <h4 className="font-semibold text-gray-800 mb-3">Example 3: Senior Government Employee</h4>
      <p className="text-sm"><strong>Situation:</strong> You are a Level 12 (senior) employee with Basic Pay ₹1,50,000 and DA = 50%.</p>
      
      <p className="text-sm mt-3"><strong>Calculation:</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Basic Pay = ₹1,50,000</li>
        <li>DA = 50% of ₹1,50,000 = ₹75,000</li>
        <li>Basic + DA = ₹2,25,000</li>
        <li><strong>Employee NPS (10%):</strong> ₹22,500/month</li>
        <li><strong>Government NPS (14%):</strong> ₹31,500/month</li>
        <li><strong>Total NPS Contribution:</strong> ₹54,000/month = ₹6,48,000/year</li>
      </ul>
      
      <p className="text-sm mt-3"><strong>Even with 5 years to retirement:</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Contributions in 5 years: ~₹3.2 crore (excluding growth)</li>
        <li>Existing accumulated corpus + new contributions: Can reach ₹10+ crore</li>
      </ul>
    </div>
  </div>

  {/* Section 6: Annuity and Retirement Income */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      6. Understanding Annuity: Converting NPS Corpus to Pension
    </h3>
    <p>
      At retirement (age 60), you must use at least 40% of your NPS corpus to purchase an <strong>annuity</strong>, which provides fixed monthly pension income for life.
    </p>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">What is an Annuity?</h4>
    <p className="text-sm">
      An annuity is an insurance product where you pay a lump sum amount, and in return, the insurer pays you a fixed monthly amount for the rest of your life (or as per the plan chosen). Common providers: LIC, ICICI Prudential, SBI Life, HDFC Life, etc.
    </p>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Annuity Options</h4>
    <ul className="space-y-2 text-sm">
      <li className="border-l-4 border-blue-500 pl-4">
        <strong>Immediate Annuity:</strong> Start receiving pension immediately after purchase. Fixed monthly amount for life.
      </li>
      <li className="border-l-4 border-green-500 pl-4">
        <strong>With Return of Capital:</strong> After your death, your legal heir receives the remaining corpus. Monthly pension is lower.
      </li>
      <li className="border-l-4 border-orange-500 pl-4">
        <strong>Spouse Pension Option:</strong> After your death, your spouse continues receiving 50-100% of your pension amount.
      </li>
      <li className="border-l-4 border-purple-500 pl-4">
        <strong>Fixed Term:</strong> Pension for 10/15/20 years. After term, corpus (if any) reverts to insurer or legal heirs (less common).
      </li>
    </ul>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Annuity Calculation Example</h4>
    <div className="bg-gray-50 border border-gray-300 p-4 rounded mt-3">
      <p className="text-sm"><strong>Scenario:</strong> Your NPS corpus at age 60 = ₹2 crore</p>
      <ul className="list-disc pl-8 text-sm space-y-2 mt-2">
        <li>Minimum annuity purchase (40%): ₹80 lakh</li>
        <li>Lump sum withdrawal (60%): ₹1.2 crore (tax-free under current rules)</li>
        <li><strong>Annuity from ₹80 lakh:</strong> ~₹50,000-60,000 per month (depending on annuity rate, age, option chosen)</li>
      </ul>
      <p className="text-sm mt-3">
        <strong>Benefit:</strong> You get ₹1.2 crore immediately + ₹50,000-60,000 monthly pension for life = Excellent retirement income!
      </p>
    </div>
  </div>

  {/* Section 7: NPS Tax Benefits */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      7. Tax Benefits and Incentives for NPS
    </h3>
    <p>
      NPS offers multiple layers of tax benefits, making it one of the most tax-efficient retirement instruments in India.
    </p>

    <table className="w-full border-collapse border border-gray-300 text-sm mt-4">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="border border-gray-300 p-3 text-left">Section</th>
          <th className="border border-gray-300 p-3">Deduction Limit</th>
          <th className="border border-gray-300 p-3">Who Can Claim</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-blue-50">
          <td className="border border-gray-300 p-3 font-semibold">80CCD(1)</td>
          <td className="border border-gray-300 p-3">₹1.5 lakh/year</td>
          <td className="border border-gray-300 p-3 text-sm">All NPS subscribers (employee contribution)</td>
        </tr>
        <tr className="hover:bg-green-50">
          <td className="border border-gray-300 p-3 font-semibold">80CCD(1B)</td>
          <td className="border border-gray-300 p-3">₹50,000 additional/year</td>
          <td className="border border-gray-300 p-3 text-sm">All (above ₹1.5L limit, not included in 80C)</td>
        </tr>
        <tr className="hover:bg-yellow-50">
          <td className="border border-gray-300 p-3 font-semibold">80CCD(2)</td>
          <td className="border border-gray-300 p-3">14% of salary*</td>
          <td className="border border-gray-300 p-3 text-sm">Employer contribution (automatic for govt employees)</td>
        </tr>
      </tbody>
    </table>

    <p className="text-sm mt-4 text-gray-600">
      *14% employer contribution is NOT deducted from your salary, so this is automatic benefit.
    </p>

    <div className="bg-green-100 border border-green-400 p-4 rounded mt-4">
      <p className="font-semibold text-gray-800 text-sm">✓ Tax Benefit Example:</p>
      <p className="text-sm text-gray-700 mt-2">
        Your salary: ₹1 lakh/month. Employee NPS: ₹10,000/month (10% of Basic+DA). 
        <br/>Annual tax benefit: ₹10,000 × 12 × 30% (tax slab) = ₹36,000 tax saved!
        <br/>Plus, ₹50,000 additional deduction under 80CCD(1B) = ₹15,000 more tax saved.
        <br/><strong>Total annual tax benefit: ₹51,000</strong>
      </p>
    </div>
  </div>

  {/* Section 8: NPS vs Old Pension Scheme (Comparison) */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      8. NPS vs Old Pension Scheme (OPS) - Quick Comparison
    </h3>
    <p>
      Some government employees have the option to switch from NPS to OPS. Here's how they compare:
    </p>

    <table className="w-full border-collapse border border-gray-300 text-sm mt-4">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="border border-gray-300 p-3 text-left">Feature</th>
          <th className="border border-gray-300 p-3">NPS</th>
          <th className="border border-gray-300 p-3">OPS (Old Scheme)</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-blue-50">
          <td className="border border-gray-300 p-3 font-semibold">Employee Contribution</td>
          <td className="border border-gray-300 p-3">10% of salary</td>
          <td className="border border-gray-300 p-3">None</td>
        </tr>
        <tr className="hover:bg-green-50">
          <td className="border border-gray-300 p-3 font-semibold">Employer Contribution</td>
          <td className="border border-gray-300 p-3">14% of salary</td>
          <td className="border border-gray-300 p-3">Varies (Govt. guarantee)</td>
        </tr>
        <tr className="hover:bg-yellow-50">
          <td className="border border-gray-300 p-3 font-semibold">Pension Amount</td>
          <td className="border border-gray-300 p-3">Depends on corpus &amp; annuity rate</td>
          <td className="border border-gray-300 p-3">Fixed: 50% of last salary + DA</td>
        </tr>
        <tr className="hover:bg-purple-50">
          <td className="border border-gray-300 p-3 font-semibold">Flexibility</td>
          <td className="border border-gray-300 p-3">High - choose fund, withdraw 60%</td>
          <td className="border border-gray-300 p-3">Low - fixed pension structure</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-3 font-semibold">Risk</td>
          <td className="border border-gray-300 p-3">Market-linked returns</td>
          <td className="border border-gray-300 p-3">No risk - govt guaranteed</td>
        </tr>
      </tbody>
    </table>

    <p className="text-sm mt-4 text-gray-600">
      <strong>Note:</strong> Many studies show NPS typically provides better corpus growth for younger employees, especially with market returns &gt;8% annually.
    </p>
  </div>

  {/* Section 9: FAQ */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      9. Frequently Asked Questions About NPS
    </h3>

    <div className="space-y-4">
      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: Can I increase my NPS contribution above 10%?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Yes. The mandatory 10% is deducted from salary. You can contribute additional amounts voluntarily up to ₹2 lakh/year and claim deduction under Section 80CCD(1B) for extra ₹50,000 benefit.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: Can I withdraw my NPS before retirement?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Tier-1 is locked until age 60, but partial withdrawals are allowed for medical emergencies, higher education (50% of balance or ₹50 lakh, whichever is lower). Tier-2 allows withdrawal anytime after 1 year with no restrictions.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: What happens to my NPS if I die before retirement?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Your legal heirs receive the entire accumulated NPS corpus (no annuity requirement). This is a huge advantage of NPS compared to old pension scheme.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: How do I choose between fund managers (SBI, HDFC, ICICI, etc.)?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Compare historical performance (5-10 year returns), expense ratios, and fund management quality. Most government employees use HDFC or SBI due to reputation. You can change fund manager once per year without penalty.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: What is the average expected return from NPS?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Historically, Aggressive NPS funds have delivered 9-12% annual returns over 20+ years. Moderate funds: 7-9%. Conservative funds: 5-7%. Past performance doesn't guarantee future returns; market volatility applies.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: Is my NPS corpus guaranteed to reach a certain amount?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: No. NPS is market-linked, so returns vary. However, with consistent contributions and 8+ years of service, most employees accumulate substantial corpus. Use our NPS calculator to estimate based on expected return rates.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800">Q: Can I have both NPS Tier-1 and Tier-2 accounts?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Yes. Government employees typically have mandatory Tier-1 account. You can open Tier-2 as an optional savings account for additional funds or emergency withdrawals. Both can have separate fund managers.
        </p>
      </div>
    </div>
  </div>

  {/* Section 10: Using the NPS Calculator */}
  <div className="bg-blue-100 border-l-4 border-blue-600 p-5 rounded mt-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-3">
      10. How to Use the NPS Calculator
    </h3>
    <p className="text-sm">
      To calculate your projected NPS corpus at retirement:
    </p>
    <ol className="list-decimal pl-8 space-y-2 mt-3 text-sm">
      <li><strong>Enter Basic Pay:</strong> Your current monthly basic salary.</li>
      <li><strong>Enter DA %:</strong> Current dearness allowance percentage (currently 50%).</li>
      <li><strong>Enter Current Age & Retirement Age:</strong> Usually 60 for government employees.</li>
      <li><strong>Expected Annual Return (%):</strong> Choose based on fund type:
        <ul className="list-disc pl-8 mt-1">
          <li>Aggressive: 9-10%</li>
          <li>Moderate: 7-8%</li>
          <li>Conservative: 5-6%</li>
        </ul>
      </li>
      <li><strong>View Results:</strong> See your projected NPS corpus, potential lump sum withdrawal, and estimated monthly pension.</li>
    </ol>
    <p className="text-sm mt-4">
      The calculator accounts for salary increases and DA hikes to give you a realistic projection.
    </p>
  </div>

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
      <a href="/pf-calculator" className="text-blue-600 hover:underline font-medium text-sm">
        → Provident Fund (PF) Calculator
      </a>
      <a href="/income-tax-calculator" className="text-blue-600 hover:underline font-medium text-sm">
        → Income Tax Calculator
      </a>
      <a href="/Salaryhandbook/nps" className="text-blue-600 hover:underline font-medium text-sm">
        → NPS Handbook Guide
      </a>
    </div>
  </div>

  {/* Disclaimer */}
  <div className="bg-gray-100 p-5 rounded mt-8 text-sm text-gray-600 border border-gray-300">
    <h4 className="font-semibold text-gray-800 mb-2">Disclaimer & Data Sources</h4>
    <p>
      This guide is based on the <strong>National Pension System guidelines, 7th Central Pay Commission rules</strong>, and tax laws as of January 2026. NPS calculations are projections only and depend on market returns, which are unpredictable. For official guidance, consult your HR department, NPS nodal officer, or a registered financial advisor. Annuity rates are indicative and vary by provider.
    </p>
  </div>

</article>

        
      </main>
    </div>
  );
}