import { useState } from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/salary-calculator";
import type { SalaryBreakdown } from "@/lib/salary-calculator";
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp, X } from "lucide-react";

interface ResultsBreakdownProps {
  breakdown: SalaryBreakdown;
}

export function ResultsBreakdown({ breakdown }: ResultsBreakdownProps) {
  const [showTaxDetails, setShowTaxDetails] = useState(false);
  const [enabledDeductions, setEnabledDeductions] = useState({
    nps: true,
    cghs: true,
    tax: true,
  });
  const [customDeductions, setCustomDeductions] = useState<
    { name: string; amount: number; enabled: boolean }[]
  >([]);
  const [newDeduction, setNewDeduction] = useState({ name: "", amount: "" });
  const [showAddDeduction, setShowAddDeduction] = useState(false);

  if (!breakdown) return null;

  const earnings = [
    { label: "Basic Pay", value: breakdown.basicPay },
    { label: "Dearness Allowance (DA)", value: breakdown.da },
    { label: "House Rent Allowance (HRA)", value: breakdown.hra },
    { label: "Transport Allowance (TA)", value: breakdown.ta },
    { label: "DA on TA", value: breakdown.daOnTa },
  ];

  const deductions = [
    { key: "tax", label: "Income Tax (New Regime)", value: breakdown.incomeTax },
    { key: "nps", label: "NPS Employee (10%)", value: breakdown.npsEmployee },
    { key: "cghs", label: "CGHS", value: breakdown.cghs },
  ];

  // Income tax breakdown (for dropdown)
  const annualGross = breakdown.grossSalary * 12;
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, annualGross - standardDeduction);
  const rebate = taxableIncome <= 1200000 ? 60000 : 0;
  const cessRate = 0.04;
  const annualTaxBeforeCess = Math.max(0, (breakdown.incomeTax * 12 / 1.04) - rebate);
const cess = annualTaxBeforeCess * cessRate;
const totalTax = annualTaxBeforeCess + cess;


  // Handle toggling built-in deductions
  const toggleDeduction = (key: keyof typeof enabledDeductions) => {
    setEnabledDeductions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Add & remove custom deductions
  const handleAddDeduction = () => {
    if (!newDeduction.name.trim() || !newDeduction.amount) return;
    setCustomDeductions((prev) => [
      ...prev,
      {
        name: newDeduction.name.trim(),
        amount: Number(newDeduction.amount),
        enabled: true,
      },
    ]);
    setNewDeduction({ name: "", amount: "" });
  };

  const handleRemoveDeduction = (index: number) => {
    setCustomDeductions((prev) => prev.filter((_, i) => i !== index));
  };

  // Calculate total deductions (enabled + custom)
  const totalDeductions = [
    ...deductions.filter((d) => enabledDeductions[d.key as keyof typeof enabledDeductions]),
    ...customDeductions.filter((d) => d.enabled),
  ].reduce((sum, d: any) => sum + (d.value ?? d.amount ?? 0), 0);

  const netSalary = breakdown.grossSalary - totalDeductions;

  return (
    <Card className="flex flex-col justify-between p-4 bg-white shadow-md border rounded-lg h-full">
      <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
        {breakdown.cpc === "7th"
          ? "7th CPC Salary Breakdown"
          : "8th CPC Projected Salary"}
      </h2>

      {/* Earnings */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
          <TrendingUp className="w-4 h-4" />
          <span>Earnings</span>
        </div>

        {earnings.map((e, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-green-50 border border-green-100 rounded-md px-3 py-1.5 mb-1"
          >
            <span className="text-sm">{e.label}</span>
            <span className="text-sm font-mono text-green-700 font-semibold">
              {formatCurrency(e.value)}
            </span>
          </div>
        ))}

        {breakdown.otherAllowances?.length > 0 && (
          <div className="mt-3 border-t border-green-200 pt-2">
            <span className="text-sm font-medium text-green-700 block mb-1">
              Other Allowances
            </span>
            {breakdown.otherAllowances.map((a, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm px-3 py-1 bg-green-50 border border-green-100 rounded-md mb-1"
              >
                <span>{a.name}</span>
                <span className="font-mono text-green-700">
                  {formatCurrency(a.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gross Salary */}
      <div className="flex justify-between items-center py-2 px-3 bg-primary/10 border border-primary/20 rounded-md mb-4">
        <span className="font-semibold">Gross Salary</span>
        <span className="font-mono font-bold text-lg">
          {formatCurrency(breakdown.grossSalary)}
        </span>
      </div>

      {/* Deductions */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
          <TrendingDown className="w-4 h-4" />
          <span>Deductions</span>
        </div>

        {deductions.map((d, i) => (
          <div
            key={i}
            className={`flex items-center justify-between border rounded-md px-3 py-2 mb-1 transition ${
              enabledDeductions[d.key as keyof typeof enabledDeductions]
                ? "bg-red-50 border-red-100"
                : "bg-gray-50 border-gray-200 opacity-70"
            }`}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{d.label}</span>
                {d.label.includes("Income Tax") && (
                  <button
                    onClick={() => setShowTaxDetails((prev) => !prev)}
                    className="text-[11px] text-blue-700 hover:text-blue-900 font-medium flex items-center gap-1"
                  >
                    {showTaxDetails ? (
                      <>
                        <ChevronUp className="w-3 h-3" /> Hide
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3" /> See Tax Calculation
                      </>
                    )}
                  </button>
                )}
              </div>

              {showTaxDetails && d.label.includes("Income Tax") && (
  <div className="mt-1 bg-white border border-gray-200 shadow-sm rounded-md p-2 text-[11px] text-gray-700 leading-relaxed">
    <div className="flex justify-between">
      <span>Annual Gross:</span>
      <span className="font-mono">{formatCurrency(annualGross)}</span>
    </div>
    <div className="flex justify-between">
      <span>Standard Deduction:</span>
      <span className="font-mono">-{formatCurrency(standardDeduction)}</span>
    </div>
    <div className="flex justify-between">
      <span>Taxable Income:</span>
      <span className="font-mono">{formatCurrency(taxableIncome)}</span>
    </div>

    {/* ✅ Added Tax line */}
    <div className="flex justify-between">
      <span>Tax:</span>
      <span className="font-mono">{formatCurrency(annualTaxBeforeCess)}</span>
    </div>

    <div className="flex justify-between">
      <span>Cess (4%):</span>
      <span className="font-mono">{formatCurrency(cess)}</span>
    </div>

    <div className="border-t my-1 border-gray-200"></div>

    <div className="flex justify-between font-semibold">
      <span>Total Tax (Annual):</span>
      <span className="font-mono">{formatCurrency(totalTax)}</span>
    </div>
    <div className="flex justify-between">
      <span>Monthly Tax:</span>
      <span className="font-mono">{formatCurrency(breakdown.incomeTax)}</span>
    </div>
  </div>
)}

            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-red-700 font-semibold min-w-[70px] text-right">
                -{formatCurrency(d.value)}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabledDeductions[d.key as keyof typeof enabledDeductions]}
                  onChange={() =>
                    toggleDeduction(d.key as keyof typeof enabledDeductions)
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-amber-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          </div>
        ))}

        {/* Custom Deductions */}
        {customDeductions.length > 0 && (
          <div className="mt-2">
            <span className="text-sm font-medium text-red-700 block mb-1">
              Other Deductions (if any)
            </span>

            {customDeductions.map((d, i) => (
              <div
                key={i}
                className={`flex justify-between items-center border rounded-md px-3 py-2 mb-1 ${
                  d.enabled
                    ? "bg-red-50 border-red-100"
                    : "bg-gray-50 border-gray-200 opacity-70"
                }`}
              >
                <span className="text-sm">{d.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-red-700 font-semibold min-w-[70px] text-right">
                    -{formatCurrency(d.amount)}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={d.enabled}
                      onChange={() =>
                        setCustomDeductions((prev) =>
                          prev.map((item, j) =>
                            j === i ? { ...item, enabled: !item.enabled } : item
                          )
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-amber-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                  <button
                    onClick={() => handleRemoveDeduction(i)}
                    className="text-gray-400 hover:text-red-600"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Add Deduction Section — Appears only when user clicks the button */}
<div className="mt-3">
  {!showAddDeduction ? (
    // 🔹 Show only this button initially
    <button
      onClick={() => setShowAddDeduction(true)}
      className="w-full sm:w-[160px] md:w-[180px] px-3 py-1 bg-orange-500 text-white text-xs rounded-md hover:bg-orange-600 transition h-[34px]"
    >
      + Add Deduction
    </button>
  ) : (
    // 🔸 Show input boxes when button is clicked
    <div className="flex flex-col gap-2 w-full">
      {/* Inputs Row */}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="text"
          placeholder="Deduction Name"
          value={newDeduction.name}
          onChange={(e) =>
            setNewDeduction({ ...newDeduction, name: e.target.value })
          }
          className="flex-1 px-2 py-1 border rounded-md text-sm h-[34px]"
        />
        <input
          type="number"
          placeholder="Amount ₹"
          value={newDeduction.amount}
          onChange={(e) =>
            setNewDeduction({ ...newDeduction, amount: e.target.value })
          }
          className="w-full sm:w-[120px] px-2 py-1 border rounded-md text-sm h-[34px]"
        />
      </div>

      {/* Buttons Row */}
      <div className="flex gap-2 justify-end sm:justify-start flex-wrap">
        <button
          onClick={() => {
            handleAddDeduction();
            setShowAddDeduction(false);
          }}
          className="px-3 py-1 bg-orange-500 text-white text-xs rounded-md hover:bg-orange-600 transition h-[34px] w-[90px] sm:w-[100px]"
        >
          Add
        </button>
        <button
          onClick={() => setShowAddDeduction(false)}
          className="px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-100 transition h-[34px] w-[90px] sm:w-[100px]"
        >
          Cancel
        </button>
      </div>
    </div>
  )}
</div>



      </div>

      {/* ✅ Total Deductions */}
<div className="flex justify-between items-center py-2 px-3 bg-red-50 border border-red-100 rounded-md mb-3">
  <span className="font-semibold text-red-800">Total Deductions</span>
  <span className="font-mono text-red-900 font-bold text-base">
    {formatCurrency(totalDeductions)}
  </span>
</div>

{/* ✅ Net Salary (Take Home) */}
<div className="flex justify-between items-center py-3 px-3 bg-blue-50 border border-blue-100 rounded-md mb-2 shadow-sm">
  <span className="font-semibold text-blue-800">Net Salary (Take Home)</span>
  <span className="font-mono text-blue-900 font-bold text-lg">
    {formatCurrency(netSalary)}
  </span>
</div>


      {/* Employer Contribution */}
      <div className="flex justify-between items-center py-2 px-3 bg-gray-50 border rounded-md">
        <span className="text-sm text-gray-600">
          NPS Employer Contribution (14%)
        </span>
        <span className="text-sm font-mono text-gray-700">
          {formatCurrency(breakdown.npsEmployer)}
        </span>
      </div>
    </Card>
  );
}
