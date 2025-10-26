"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * National Pension System (NPS) Calculator — Govt Employees
 * - Pill Tabs: Bold Solid Indigo (mobile-friendly)
 * - Separate forms per tab (as requested)
 * - Currency rule: Show ₹ only on MAIN totals (corpus, pension, monthly/annual total)
 * - Print button at bottom using window.print()
 * - Clear reset behavior across both tabs
 */

/* -------------------- helpers -------------------- */
const toNum = (v: string): number => {
  const n = parseFloat((v || "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const fmtNum = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n || 0));

const fmtINR = (n: number) => `₹${fmtNum(n)}`;

// Govt rules
const EMP_PCT = 0.10;  // Employee 10% of (Basic + DA)
const EMPR_PCT = 0.14; // Employer 14% of (Basic + DA)

type TabKey = "deduction" | "projection";

export default function Page() {
  /* -------------------- shared inputs -------------------- */
  const [basic, setBasic] = useState("");
  const [daPct, setDaPct] = useState("50");

  /* -------------------- UI state -------------------- */
  const [tab, setTab] = useState<TabKey>("deduction");

  /* -------------------- projection inputs -------------------- */
  const [age, setAge] = useState("30");
  const [retAge, setRetAge] = useState("60");
  const [annualReturnPct, setAnnualReturnPct] = useState("9"); // user sets assumed return
  const [currentCorpus, setCurrentCorpus] = useState("0");
  const [annuityPurchasePct, setAnnuityPurchasePct] = useState("40");
  const [annuityRatePct, setAnnuityRatePct] = useState("6");

  /* -------------------- button-gated result visibility -------------------- */
  const [showMonthly, setShowMonthly] = useState(false);
  const [showProjection, setShowProjection] = useState(false);

  /* -------------------- derived (shared) -------------------- */
  const basicNum = toNum(basic);
  const daPctNum = clamp(toNum(daPct), 0, 200);
  const daAmt = (basicNum * daPctNum) / 100;
  const basicPlusDa = basicNum + daAmt;

  /* -------------------- monthly NPS amounts -------------------- */
  const empMonthly = basicPlusDa * EMP_PCT;
  const emprMonthly = basicPlusDa * EMPR_PCT;
  const totalMonthly = empMonthly + emprMonthly;
  const annualTotal = totalMonthly * 12;

  /* -------------------- projection derived -------------------- */
  const monthsToRetire = useMemo(() => {
    const a = clamp(toNum(age), 18, 80);
    const r = clamp(toNum(retAge), a + 1, 75);
    return Math.max(0, Math.round((r - a) * 12));
  }, [age, retAge]);

  const monthlyRate = useMemo(() => {
    const r = clamp(toNum(annualReturnPct) / 100, 0, 0.25); // cap at 25% p.a.
    return r / 12;
  }, [annualReturnPct]);

  // Future value of a series (contributions)
  const fvFromPMT = useMemo(() => {
    const pmt = totalMonthly; // employee + employer
    const n = monthsToRetire;
    const i = monthlyRate;
    if (n <= 0 || pmt <= 0) return 0;
    if (i === 0) return pmt * n;
    return pmt * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  }, [totalMonthly, monthsToRetire, monthlyRate]);

  // Future value of existing corpus
  const fvFromPV = useMemo(() => {
    const pv = Math.max(0, toNum(currentCorpus));
    const n = monthsToRetire;
    const i = monthlyRate;
    if (n <= 0 || pv <= 0) return pv;
    return pv * Math.pow(1 + i, n);
  }, [currentCorpus, monthsToRetire, monthlyRate]);

  const totalCorpusAtRetirement = useMemo(() => fvFromPMT + fvFromPV, [fvFromPMT, fvFromPV]);

  const annuityPurchase = useMemo(() => {
    const pct = clamp(toNum(annuityPurchasePct), 0, 100) / 100;
    return totalCorpusAtRetirement * pct;
  }, [totalCorpusAtRetirement, annuityPurchasePct]);

  const lumpSum = useMemo(
    () => Math.max(0, totalCorpusAtRetirement - annuityPurchase),
    [totalCorpusAtRetirement, annuityPurchase]
  );

  const monthlyPension = useMemo(() => {
    const annualAnnuityRate = clamp(toNum(annuityRatePct) / 100, 0, 0.2);
    return annuityPurchase * (annualAnnuityRate / 12);
  }, [annuityPurchase, annuityRatePct]);

  /* -------------------- validation flags -------------------- */
  const canCalcMonthly = basicNum > 0 && daPctNum >= 0;
  const canCalcProjection = canCalcMonthly && monthsToRetire > 0;

  /* -------------------- reset all -------------------- */
  const resetAll = () => {
    setBasic("");
    setDaPct("50");
    setAge("30");
    setRetAge("60");
    setAnnualReturnPct("9");
    setCurrentCorpus("0");
    setAnnuityPurchasePct("40");
    setAnnuityRatePct("6");
    setShowMonthly(false);
    setShowProjection(false);
  };

  /* -------------------- tabs -------------------- */
  const tabs: { key: TabKey; label: string }[] = [
    { key: "deduction", label: "Monthly NPS Deduction" },
    { key: "projection", label: "NPS Retirement Projection (Corpus & Pension)" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-500 bg-clip-text text-transparent mb-4 tracking-tight">
            National Pension System (NPS) Calculator
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Calculate monthly NPS deductions (Govt employee rules) and project retirement corpus & pension.
          </p>
        </div>

        {/* Pill Tabs: Bold Solid Indigo */}
        <div className="max-w-5xl mx-auto">
          <div
            role="tablist"
            aria-label="NPS calculator sections"
            className="flex items-center justify-center"
          >
            <div className="inline-flex p-1 bg-indigo-50 rounded-full border border-indigo-100 shadow-sm">
              {tabs.map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={active}
                    aria-controls={`panel-${t.key}`}
                    id={`tab-${t.key}`}
                    onClick={() => setTab(t.key)}
                    className={[
                      "px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
                      active
                        ? "bg-indigo-600 text-white shadow"
                        : "bg-transparent text-indigo-700 hover:bg-indigo-100"
                    ].join(" ")}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- Monthly NPS Deduction (separate form) --- */}
        <section
          role="tabpanel"
          id="panel-deduction"
          aria-labelledby="tab-deduction"
          hidden={tab !== "deduction"}
          className={tab === "deduction" ? "block" : "hidden"}
        >
          <Card className="max-w-2xl mx-auto p-6 sm:p-8 border border-gray-200 rounded-xl shadow-sm bg-white space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-medium text-gray-700">Basic Pay</Label>
                <Input
                  type="number"
                  value={basic}
                  onChange={(e) => setBasic(e.target.value)}
                  placeholder="e.g. 60000"
                  className="mt-1"
                  inputMode="numeric"
                />
              </div>
              <div>
                <Label className="font-medium text-gray-700">DA (%)</Label>
                <Input
                  type="number"
                  value={daPct}
                  onChange={(e) => setDaPct(e.target.value)}
                  placeholder="e.g. 50"
                  className="mt-1"
                  inputMode="numeric"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => setShowMonthly(true)}
                disabled={!canCalcMonthly}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2"
              >
                Calculate Monthly NPS
              </Button>
              <Button variant="outline" onClick={resetAll} className="w-full sm:w-auto">
                Reset
              </Button>
            </div>

            {showMonthly && (
              <div className="mt-4">
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
                        <td className="px-4 py-2 border text-right text-green-700">
                          {fmtINR(totalMonthly)}
                        </td>
                      </tr>
                      <tr className="bg-gray-50 font-semibold">
                        <td className="px-4 py-2 border">Annual NPS (12 months)</td>
                        <td className="px-4 py-2 border text-right">—</td>
                        <td className="px-4 py-2 border text-right text-green-700">
                          {fmtINR(annualTotal)}
                        </td>
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

        {/* --- Projection (separate form) --- */}
        <section
          role="tabpanel"
          id="panel-projection"
          aria-labelledby="tab-projection"
          hidden={tab !== "projection"}
          className={tab === "projection" ? "block" : "hidden"}
        >
          <Card className="max-w-3xl mx-auto p-6 sm:p-8 border border-gray-200 rounded-xl shadow-sm bg-white space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-medium text-gray-700">Basic Pay</Label>
                <Input
                  type="number"
                  value={basic}
                  onChange={(e) => setBasic(e.target.value)}
                  placeholder="e.g. 60000"
                  className="mt-1"
                  inputMode="numeric"
                />
              </div>
              <div>
                <Label className="font-medium text-gray-700">DA (%)</Label>
                <Input
                  type="number"
                  value={daPct}
                  onChange={(e) => setDaPct(e.target.value)}
                  placeholder="e.g. 50"
                  className="mt-1"
                  inputMode="numeric"
                />
              </div>

              <div>
                <Label className="font-medium text-gray-700">Current Age (yrs)</Label>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1"
                  inputMode="numeric"
                />
              </div>
              <div>
                <Label className="font-medium text-gray-700">Retirement Age (yrs)</Label>
                <Input
                  type="number"
                  value={retAge}
                  onChange={(e) => setRetAge(e.target.value)}
                  className="mt-1"
                  inputMode="numeric"
                />
              </div>

              <div>
                <Label className="font-medium text-gray-700">Expected Annual Return (%)</Label>
                <Input
                  type="number"
                  value={annualReturnPct}
                  onChange={(e) => setAnnualReturnPct(e.target.value)}
                  placeholder="e.g. 9"
                  className="mt-1"
                  inputMode="decimal"
                />
              </div>
              <div>
                <Label className="font-medium text-gray-700">Current NPS Corpus (₹)</Label>
                <Input
                  type="number"
                  value={currentCorpus}
                  onChange={(e) => setCurrentCorpus(e.target.value)}
                  placeholder="e.g. 100000"
                  className="mt-1"
                  inputMode="numeric"
                />
              </div>

              <div>
                <Label className="font-medium text-gray-700">Annuity Purchase at Retirement (%)</Label>
                <Input
                  type="number"
                  value={annuityPurchasePct}
                  onChange={(e) => setAnnuityPurchasePct(e.target.value)}
                  placeholder="min 40"
                  className="mt-1"
                  inputMode="decimal"
                />
              </div>
              <div>
                <Label className="font-medium text-gray-700">Annuity Annual Rate (%)</Label>
                <Input
                  type="number"
                  value={annuityRatePct}
                  onChange={(e) => setAnnuityRatePct(e.target.value)}
                  placeholder="e.g. 6"
                  className="mt-1"
                  inputMode="decimal"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => setShowProjection(true)}
                disabled={!canCalcProjection}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2"
              >
                Calculate Projection
              </Button>
              <Button variant="outline" onClick={resetAll} className="w-full sm:w-auto">
                Reset
              </Button>
            </div>

            {showProjection && (
              <div className="space-y-4">
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
                        <td className="px-4 py-2 border text-right text-green-700">
                          {fmtINR(totalCorpusAtRetirement)}
                        </td>
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
                        <td className="px-4 py-2 border text-right text-green-700">
                          {fmtINR(monthlyPension)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Card>
        </section>

        {/* --- Info section (FULL, as earlier) --- */}
        <div className="max-w-3xl mx-auto space-y-3 text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            About the NPS Calculations Used in This Tool
          </h2>
          <p>
            Under the National Pension System (NPS) for Central/State Government employees, the employee contributes
            <strong> 10% of (Basic Pay + DA)</strong> every month.
          </p>
          <p>
            The Government contributes <strong>14% of (Basic Pay + DA)</strong> to the employee’s NPS Tier-1 account.
          </p>
          <p>
            The Tier-1 account has a lock-in until retirement (age 60). Partial withdrawal rules apply under specified conditions.
          </p>
          <p>
            Returns are market-linked. In this calculator, the <strong>Expected Annual Return (%)</strong> used in projection is
            entered manually by the user to reflect their own assumption.
          </p>
          <p>
            At retirement, at least <strong>40% of the total corpus</strong> must be used to buy an annuity, and the remaining can
            be taken as a lump sum (currently exempt from tax).
          </p>
          <p>
            <strong>What is an Annuity?</strong> An annuity is a product you buy at retirement that pays a fixed monthly pension.
            The pension depends on the annuity purchase amount, the annuity interest rate, and the plan chosen (e.g., lifetime,
            with/without return of purchase price, spouse pension, etc.).
          </p>
          <p>
            <strong>Example:</strong> If Basic Pay = ₹50,000 and DA = 50% → Basic + DA = ₹75,000 → Employee NPS: 7,500/month;
            Employer NPS: 10,500/month; Total: <strong>₹18,000/month</strong>.
          </p>
        </div>

        {/* Print / Save PDF */}
        <div className="max-w-3xl mx-auto pt-2 pb-10 print:hidden">
          <Button onClick={() => window.print()} className="w-full sm:w-auto font-semibold">
            🖨️ Print / Save PDF
          </Button>
        </div>
      </main>
    </div>
  );
}