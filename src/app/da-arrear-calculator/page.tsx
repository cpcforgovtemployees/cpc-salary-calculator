"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DAArrearCalculator() {
  const [oldDA, setOldDA] = useState("");
  const [newDA, setNewDA] = useState("");
  const [months, setMonths] = useState("");
  const [basicPay, setBasicPay] = useState("");
  const [arrears, setArrears] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<
    { month: number; oldDA: number; newDA: number; diff: number; monthlyArrear: number }[]
  >([]);

  const handleCalculate = () => {
    const oldDANum = parseFloat(oldDA) || 0;
    const newDANum = parseFloat(newDA) || 0;
    const monthsNum = parseInt(months) || 0;
    const basicPayNum = parseFloat(basicPay) || 0;

    const diff = newDANum - oldDANum;
    const monthlyArrear = (diff / 100) * basicPayNum;
    const totalArrears = monthlyArrear * monthsNum;

    const monthWiseBreakdown = Array.from({ length: monthsNum }, (_, i) => ({
      month: i + 1,
      oldDA: oldDANum,
      newDA: newDANum,
      diff,
      monthlyArrear,
    }));

    setArrears(totalArrears);
    setBreakdown(monthWiseBreakdown);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* ✅ H1 - Main title */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-500 bg-clip-text text-transparent mb-4 tracking-tight">
            DA Arrear Calculator
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Calculate <strong>Dearness Allowance (DA) arrears</strong> instantly under the{" "}
            <strong>7th and 8th Pay Commissions</strong>. Just enter your old and new DA percentages to find total arrears.
          </p>
        </div>

        {/* ✅ H2 - Section: How to Use */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-10">
          How to Use the DA Arrear Calculator
        </h2>
        <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2 text-center">
          Step-by-Step Instructions
        </h3>

        {/* Calculator Card */}
        <Card className="max-w-2xl mx-auto p-6 sm:p-8 border border-gray-200 rounded-xl shadow-sm bg-white space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-medium text-gray-700">Old DA (%)</Label>
              <Input
                type="number"
                value={oldDA}
                onChange={(e) => setOldDA(e.target.value)}
                placeholder="e.g. 46"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="font-medium text-gray-700">New DA (%)</Label>
              <Input
                type="number"
                value={newDA}
                onChange={(e) => setNewDA(e.target.value)}
                placeholder="e.g. 50"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="font-medium text-gray-700">No. of Months</Label>
              <Input
                type="number"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                placeholder="e.g. 3"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="font-medium text-gray-700">Basic Pay (₹)</Label>
              <Input
                type="number"
                value={basicPay}
                onChange={(e) => setBasicPay(e.target.value)}
                placeholder="e.g. 49000"
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleCalculate}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2"
            >
              Calculate Arrears
            </Button>
          </div>

          {arrears !== null && (
            <div className="text-center mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold text-green-700">Total Arrears:</h3>
              <p className="text-3xl font-bold text-green-800">
                ₹{arrears.toLocaleString("en-IN")}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                ({months} months difference between {oldDA}% → {newDA}%)
              </p>
            </div>
          )}
        </Card>

        {/* ✅ H2 - Section: Breakdown */}
        {breakdown.length > 0 && (
          <Card className="max-w-3xl mx-auto p-6 border border-gray-200 rounded-xl shadow-sm bg-white">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Monthly DA Arrears Breakdown
            </h2>
            <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
              Month-wise Detailed Calculation
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="px-4 py-2 border">Month</th>
                    <th className="px-4 py-2 border">Old DA (%)</th>
                    <th className="px-4 py-2 border">New DA (%)</th>
                    <th className="px-4 py-2 border">DA Difference (%)</th>
                    <th className="px-4 py-2 border">Monthly Arrear (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdown.map((row) => (
                    <tr key={row.month} className="text-center">
                      <td className="px-4 py-2 border">{row.month}</td>
                      <td className="px-4 py-2 border">{row.oldDA}</td>
                      <td className="px-4 py-2 border">{row.newDA}</td>
                      <td className="px-4 py-2 border">{row.diff}</td>
                      <td className="px-4 py-2 border">
                        ₹{row.monthlyArrear.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-semibold bg-gray-50 text-center">
                    <td colSpan={4} className="px-4 py-2 border">
                      Total
                    </td>
                    <td className="px-4 py-2 border text-green-700 font-bold">
                      ₹{arrears?.toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}