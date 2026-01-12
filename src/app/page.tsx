"use client";
import { useState, useEffect } from "react";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ResultsBreakdown } from "@/components/ResultsBreakdown";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InfoTooltip } from "@/components/InfoTooltip";
import {
  calculate7thCPC,
  calculate8thCPC,
  type SalaryInputs,
  type SalaryBreakdown,
} from "@/lib/salary-calculator";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export default function Calculator() {
  // --- Inputs ---
  const [inputs, setInputs] = useState<SalaryInputs>({
    payLevel: "",
    payLevelLabel: "",
    basicPay: 0,
    hraClass: "Other",
    taCityType: "",
    daPercentage: 58,
    otherAllowances: [],
    otherDeductions: [],
  });

  // --- Auto-save setup ---
  const STORAGE_KEY = "salary-calculator-inputs-v2";
  const EXPIRY_DURATION = 60 * 60 * 1000; // 1 hour

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const { data, timestamp } = JSON.parse(saved);
      if (Date.now() - timestamp < EXPIRY_DURATION) {
        const safeData = {
          ...data,
          hraClass: data.hraClass && data.hraClass !== "Other" ? data.hraClass : "",
        };
        setInputs(safeData);
        console.log("🟢 Data restored from localStorage");
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn("⚠️ Could not load saved data", e);
    }
  }, []);

  useEffect(() => {
    try {
      if (!inputs || Object.keys(inputs).length === 0) return;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data: inputs, timestamp: Date.now() })
      );
    } catch (e) {
      console.warn("⚠️ Could not save data", e);
    }
  }, [inputs]);

  // --- Fitment Factor ---
  const [fitmentFactor, setFitmentFactor] = useState(1.92);

  // --- Zero Breakdown ---
  const zeroBreakdown: SalaryBreakdown = {
    basicPay: 0,
    da: 0,
    hra: 0,
    ta: 0,
    daOnTa: 0,
    otherAllowances: [],
    grossSalary: 0,
    npsEmployee: 0,
    cghs: 0,
    otherDeductions: [],
    totalDeductions: 0,
    netSalary: 0,
    npsEmployer: 0,
    cpc: "7th",
    incomeTax: 0,
  };

  const [breakdown7th, setBreakdown7th] = useState<SalaryBreakdown>(zeroBreakdown);
  const [breakdown8th, setBreakdown8th] = useState<SalaryBreakdown>({
    ...zeroBreakdown,
    cpc: "8th",
  });

  useEffect(() => {
    if (inputs.basicPay > 0 && inputs.payLevel) {
      setBreakdown7th(calculate7thCPC(inputs));
      setBreakdown8th(calculate8thCPC(inputs, fitmentFactor));
    } else {
      setBreakdown7th(zeroBreakdown);
      setBreakdown8th({ ...zeroBreakdown, cpc: "8th" });
    }
  }, [inputs, fitmentFactor]);

  // ---------------------------------------
  // 📘 Lazy-loaded Export Helpers (Optimized)
  // ---------------------------------------

  const handleGenerateReportPDF = async () => {
  try {
    // ✅ 1. Import jsPDF
    const jsPDFModule = await import("jspdf");
    const jsPDF = jsPDFModule.jsPDF;

    // ✅ 2. Import the plugin (handles both CJS/ESM cases)
    const autoTableModule = await import("jspdf-autotable");
    const autoTable =
      autoTableModule.default || (autoTableModule as any).autoTable;

    // ✅ 3. Create the PDF
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const now = new Date().toLocaleString("en-IN");

    // --- Title & Header ---
    pdf.setFontSize(18);
    pdf.setTextColor("#1E3A8A");
    pdf.text("CPC Salary Calculation Report", 40, 50);

    pdf.setFontSize(10);
    pdf.setTextColor("#4B5563");
    pdf.text(`Generated on: ${now}`, 40, 70);
    pdf.text(`Fitment Factor (8th CPC): ×${fitmentFactor.toFixed(2)}`, 40, 85);

    // --- 7th CPC Income ---
    pdf.setFontSize(12);
    pdf.setTextColor("#111827");
    pdf.text("7th CPC - Income Breakdown", 40, 110);

    autoTable(pdf, {
      startY: 120,
      head: [["Component", "Amount (₹)"]],
      body: [
        ["Basic Pay", breakdown7th.basicPay.toLocaleString("en-IN")],
        ["DA", breakdown7th.da.toLocaleString("en-IN")],
        ["HRA", breakdown7th.hra.toLocaleString("en-IN")],
        ["TA", breakdown7th.ta.toLocaleString("en-IN")],
        ["DA on TA", breakdown7th.daOnTa.toLocaleString("en-IN")],
        ["Gross Salary", breakdown7th.grossSalary.toLocaleString("en-IN")],
      ],
      theme: "grid",
      headStyles: { fillColor: [30, 64, 175], textColor: 255 },
      styles: { fontSize: 10, cellPadding: 4 },
    });

    // --- 7th CPC Deductions ---
    pdf.text("7th CPC - Deductions", 40, (pdf as any).lastAutoTable.finalY + 25);
    autoTable(pdf, {
      startY: (pdf as any).lastAutoTable.finalY + 35,
      head: [["Deduction", "Amount (₹)"]],
      body: [
        ["Income Tax", (breakdown7th.incomeTax ?? 0).toLocaleString("en-IN")],
        ["NPS (Employee)", breakdown7th.npsEmployee.toLocaleString("en-IN")],
        ["CGHS", breakdown7th.cghs.toLocaleString("en-IN")],
        ["Total Deductions", breakdown7th.totalDeductions.toLocaleString("en-IN")],
        ["Net Salary", breakdown7th.netSalary.toLocaleString("en-IN")],
      ],
      theme: "grid",
      headStyles: { fillColor: [239, 68, 68], textColor: 255 },
      styles: { fontSize: 10, cellPadding: 4 },
    });

    // --- 8th CPC Income ---
    pdf.setTextColor("#111827");
    pdf.text("8th CPC - Projected Income", 40, (pdf as any).lastAutoTable.finalY + 30);
    autoTable(pdf, {
      startY: (pdf as any).lastAutoTable.finalY + 40,
      head: [["Component", "Amount (₹)"]],
      body: [
        ["Basic Pay", breakdown8th.basicPay.toLocaleString("en-IN")],
        ["DA", breakdown8th.da.toLocaleString("en-IN")],
        ["HRA", breakdown8th.hra.toLocaleString("en-IN")],
        ["TA", breakdown8th.ta.toLocaleString("en-IN")],
        ["DA on TA", breakdown8th.daOnTa.toLocaleString("en-IN")],
        ["Gross Salary", breakdown8th.grossSalary.toLocaleString("en-IN")],
      ],
      theme: "grid",
      headStyles: { fillColor: [16, 185, 129], textColor: 255 },
      styles: { fontSize: 10, cellPadding: 4 },
    });

    // --- 8th CPC Deductions ---
    pdf.text("8th CPC - Projected Deductions", 40, (pdf as any).lastAutoTable.finalY + 25);
    autoTable(pdf, {
      startY: (pdf as any).lastAutoTable.finalY + 35,
      head: [["Deduction", "Amount (₹)"]],
      body: [
        ["Income Tax", (breakdown8th.incomeTax ?? 0).toLocaleString("en-IN")],
        ["NPS (Employee)", breakdown8th.npsEmployee.toLocaleString("en-IN")],
        ["CGHS", breakdown8th.cghs.toLocaleString("en-IN")],
        ["Total Deductions", breakdown8th.totalDeductions.toLocaleString("en-IN")],
        ["Net Salary", breakdown8th.netSalary.toLocaleString("en-IN")],
      ],
      theme: "grid",
      headStyles: { fillColor: [239, 68, 68], textColor: 255 },
      styles: { fontSize: 10, cellPadding: 4 },
    });

    // --- Summary ---
    const netChange = breakdown8th.netSalary - breakdown7th.netSalary;
    const percentChange = breakdown7th.netSalary
      ? ((netChange / breakdown7th.netSalary) * 100).toFixed(1)
      : "N/A";

    pdf.setFontSize(13);
    pdf.setTextColor("#1E3A8A");
    pdf.text("Summary", 40, (pdf as any).lastAutoTable.finalY + 40);

    pdf.setFontSize(11);
    pdf.setTextColor("#111827");
    pdf.text(
      `Net Salary Increase: ₹${netChange.toLocaleString("en-IN")} (${percentChange}%)`,
      40,
      (pdf as any).lastAutoTable.finalY + 60
    );
    pdf.text(
      `Current Net Salary: ₹${breakdown7th.netSalary.toLocaleString("en-IN")}`,
      40,
      (pdf as any).lastAutoTable.finalY + 80
    );
    pdf.text(
      `Projected Net Salary: ₹${breakdown8th.netSalary.toLocaleString("en-IN")}`,
      40,
      (pdf as any).lastAutoTable.finalY + 100
    );

    // ✅ Save PDF
    pdf.save("CPC_Salary_Report.pdf");
  } catch (err) {
    console.error("❌ Error generating PDF:", err);
    alert("Failed to generate PDF. Check console for details.");
  }
};


  const handleGenerateReportExcel = async () => {
    try {
      const XLSX = await import("xlsx");
      const wsData: (string | number)[][] = [
        ["7th CPC - Income"],
        ["Component", "Amount (₹)"],
        ["Basic Pay", breakdown7th.basicPay],
        ["DA", breakdown7th.da],
        ["HRA", breakdown7th.hra],
        ["TA", breakdown7th.ta],
        ["DA on TA", breakdown7th.daOnTa],
        ["Gross Salary", breakdown7th.grossSalary],
        [],
        ["7th CPC - Deductions"],
        ["Deduction", "Amount (₹)"],
        ["Income Tax", breakdown7th.incomeTax ?? 0],
        ["NPS (Employee)", breakdown7th.npsEmployee],
        ["CGHS", breakdown7th.cghs],
        ["Total Deductions", breakdown7th.totalDeductions],
        ["Net Salary", breakdown7th.netSalary],
        [],
        ["8th CPC - Income (Projected)"],
        ["Component", "Amount (₹)"],
        ["Basic Pay", breakdown8th.basicPay],
        ["DA", breakdown8th.da],
        ["HRA", breakdown8th.hra],
        ["TA", breakdown8th.ta],
        ["DA on TA", breakdown8th.daOnTa],
        ["Gross Salary", breakdown8th.grossSalary],
        [],
        ["8th CPC - Deductions (Projected)"],
        ["Deduction", "Amount (₹)"],
        ["Income Tax", breakdown8th.incomeTax ?? 0],
        ["NPS (Employee)", breakdown8th.npsEmployee],
        ["CGHS", breakdown8th.cghs],
        ["Total Deductions", breakdown8th.totalDeductions],
        ["Net Salary", breakdown8th.netSalary],
        [],
        ["Summary"],
        ["Net Salary Increase", breakdown8th.netSalary - breakdown7th.netSalary],
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(wsData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "CPC Report");

      // Auto-width
      const colWidths = [{ wch: 25 }, { wch: 15 }];
      worksheet["!cols"] = colWidths;

      XLSX.writeFile(workbook, "CPC_Salary_Report.xlsx");
    } catch (err) {
      console.error("Error generating Excel:", err);
      alert("Failed to generate Excel file. Check console for details.");
    }
  };

  // ---------------------------------------
  // UI Rendering
  // ---------------------------------------
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12">
          {/* Title */}
          <section className="bg-white py-12 sm:py-16 px-4 rounded-xl border border-gray-200">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
      What is the Government Salary Calculator?
    </h2>
    <div className="prose prose-lg text-gray-700 space-y-4 max-w-none">
      <p className="leading-relaxed">
        Calculating government employee salary is complex. You need to account for Basic Pay, 
        Dearness Allowance (DA), House Rent Allowance (HRA), Travel Allowance (TA), deductions 
        like NPS and Income Tax, and special considerations for city classification and pay level. 
        With the 7th Pay Commission in place and the 8th Pay Commission expected in 2026-2027, 
        government employees need accurate tools to understand their current salary breakdown 
        and future projections.
      </p>
      <p className="leading-relaxed">
        The <strong>Indian Pay Calculator</strong> provides exactly this—instant, accurate salary 
        calculations based on <strong>official CPC pay matrix data</strong>, updated quarterly with 
        the latest Dearness Allowance rates and income tax rules.
      </p>
      <p className="leading-relaxed">
        Our calculator is used by <strong>50,000+ government employees</strong> across India to plan 
        their finances, verify salary calculations, understand deductions, and prepare for the upcoming 
        8th Pay Commission.
      </p>
    </div>

    <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-6">
      Why You Need This Calculator
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <span className="text-blue-600 text-2xl font-bold mt-1">✓</span>
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">Understand Your Full Salary</h4>
          <p className="text-sm text-gray-700">
            See exactly how much you take home after taxes, NPS, CGHS, and other deductions
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
        <span className="text-green-600 text-2xl font-bold mt-1">✓</span>
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">Compare Pay Commissions</h4>
          <p className="text-sm text-gray-700">
            See side-by-side comparison of your current 7th CPC salary vs projected 8th CPC salary
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <span className="text-purple-600 text-2xl font-bold mt-1">✓</span>
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">Plan Your Future</h4>
          <p className="text-sm text-gray-700">
            Adjust fitment factor to see various scenarios and plan your finances accordingly
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
        <span className="text-orange-600 text-2xl font-bold mt-1">✓</span>
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">Download Reports</h4>
          <p className="text-sm text-gray-700">
            Generate PDF and Excel reports for loan applications, financial planning, or records
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 px-4 rounded-xl border border-blue-200">
  <div className="max-w-6xl mx-auto">
    <p className="text-center text-gray-600 text-lg mb-8 font-medium">
      Trusted by thousands of government employees across India
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
        <div className="text-5xl font-bold text-blue-600 mb-2">50K+</div>
        <p className="text-gray-700 text-sm font-medium">
          Government employees using calculator
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
        <div className="text-5xl font-bold text-green-600 mb-2">100%</div>
        <p className="text-gray-700 text-sm font-medium">
          Based on official CPC pay matrix data
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
        <div className="text-5xl font-bold text-purple-600 mb-2">Free</div>
        <p className="text-gray-700 text-sm font-medium">
          No subscriptions, no hidden charges
        </p>
      </div>
    </div>
  </div>
</section>


          {/* Salary Details Form */}
          <section className="flex justify-center">
            <div className="w-full max-w-2xl">
              <CalculatorForm
                inputs={inputs}
                onChange={(updatedInputs) => setInputs(updatedInputs)}
              />
            </div>
          </section>

          {/* ✅ Only show after user enters valid inputs */}
{inputs.basicPay > 0 && inputs.payLevel && (
  <>
    {/* Results Section */}
    <section
      aria-label="Salary Comparison Results"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch relative w-full max-w-6xl mx-auto px-2 sm:px-4 mt-12"
    >
      {/* Divider Line (Desktop only) */}
      <div
        className="absolute hidden md:block left-1/2 top-6 bottom-6 w-[1.5px] bg-gradient-to-b from-yellow-200 via-indigo-300/70 to-pink-300/60 rounded-full"
        aria-hidden="true"
      />

      {/* 7th CPC Section */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 sm:p-6 flex flex-col">
        <div className="text-center mb-4 py-2 rounded-md border border-yellow-100 bg-gradient-to-r from-amber-50 to-yellow-50">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            7th Central Pay Commission
          </h2>
        </div>
        <ResultsBreakdown breakdown={breakdown7th} />
      </Card>

      {/* 8th CPC Section */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 sm:p-6 flex flex-col">
        <div className="text-center mb-4 py-2 rounded-md border border-pink-100 bg-gradient-to-r from-pink-50 to-rose-50">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            8th Central Pay Commission (Projected)
          </h2>

          {/* Fitment Factor Slider (Accessible) */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-center mt-2">
            <div className="flex items-center gap-2 bg-white/70 px-2 py-[3px] rounded-md border border-pink-100 shadow-sm backdrop-blur-[2px]">
              <Label className="text-[11px] font-semibold text-gray-800">
                Fitment&nbsp;Factor:
              </Label>
              <div className="relative w-[150px] sm:w-[200px]">
                <input
                  type="range"
                  min={1.0}
                  max={3.0}
                  step={0.01}
                  value={fitmentFactor}
                  onChange={(e) => setFitmentFactor(parseFloat(e.target.value))}
                  aria-label="Fitment Factor Slider"
                  className="w-full h-[4px] rounded-full appearance-none cursor-pointer bg-gradient-to-r from-yellow-300 to-yellow-400 accent-amber-500
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-amber-500
                    [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(255,193,7,0.7)]
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:hover:scale-110"
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#40916C] min-w-[3rem] text-right">
                × {fitmentFactor.toFixed(2)}
              </span>
              <div className="scale-[0.75] ml-1">
                <InfoTooltip
                  content={
                    <div className="text-[10.5px] text-gray-700 leading-relaxed max-w-[220px]">
                      <p className="mb-1">
                        <strong>Fitment Factor</strong> helps estimate your new basic pay under the <strong>8th CPC</strong>.
                      </p>
                      <p>
                        Example: A factor of <strong>1.92</strong> means your new pay will be about <strong>92%</strong> higher than your current basic pay.
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <ResultsBreakdown breakdown={breakdown8th} />
      </Card>
    </section>

    {/* Charts Section */}
    {(breakdown7th?.grossSalary > 0 || breakdown8th?.grossSalary > 0) && (
      <Card
        className="p-4 sm:p-6 md:p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-6xl mx-auto"
        aria-label="CPC Salary Comparison Charts"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-1">
          7th vs 8th CPC Comparison
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 text-center mb-6 sm:mb-8">
          A visual comparison of your salary components between the 7th and 8th Pay Commission.
        </p>

        {/* Income Chart */}
        <div className="mb-8 sm:mb-10">
          <h4 className="text-sm sm:text-base font-medium text-center text-blue-700 mb-3 sm:mb-4">
            Income Comparison
          </h4>
          <div className="w-full h-[220px] sm:h-[260px] md:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Basic Pay", "7th CPC": breakdown7th.basicPay, "8th CPC": breakdown8th.basicPay },
                  { name: "DA", "7th CPC": breakdown7th.da, "8th CPC": breakdown8th.da },
                  { name: "HRA", "7th CPC": breakdown7th.hra, "8th CPC": breakdown8th.hra },
                  { name: "TA", "7th CPC": breakdown7th.ta, "8th CPC": breakdown8th.ta },
                  { name: "DA on TA", "7th CPC": breakdown7th.daOnTa, "8th CPC": breakdown8th.daOnTa },
                  { name: "Net Salary", "7th CPC": breakdown7th.netSalary, "8th CPC": breakdown8th.netSalary },
                ]}
                margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fill: "#4B5563", fontSize: 10 }} interval={0} angle={-30} textAnchor="end" height={45} />
                <YAxis tick={{ fill: "#4B5563", fontSize: 10 }} width={50} />
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`} />
                <Legend wrapperStyle={{ fontSize: "10px", paddingTop: "5px" }} align="center" verticalAlign="bottom" />
                <Bar dataKey="7th CPC" fill="#93C5FD" barSize={20} radius={[4, 4, 0, 0]} />
                <Bar dataKey="8th CPC" fill="#86EFAC" barSize={20} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deductions Chart */}
        <div>
          <h4 className="text-sm sm:text-base font-medium text-center text-red-700 mb-3 sm:mb-4">
            Deductions Comparison
          </h4>
          <div className="w-full h-[220px] sm:h-[260px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Income Tax", "7th CPC": breakdown7th.incomeTax ?? 0, "8th CPC": breakdown8th.incomeTax ?? 0 },
                  { name: "NPS (Employee)", "7th CPC": breakdown7th.npsEmployee, "8th CPC": breakdown8th.npsEmployee },
                  { name: "CGHS", "7th CPC": breakdown7th.cghs, "8th CPC": breakdown8th.cghs },
                  { name: "Total Deductions", "7th CPC": breakdown7th.totalDeductions, "8th CPC": breakdown8th.totalDeductions },
                ]}
                margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fill: "#4B5563", fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={40} />
                <YAxis tick={{ fill: "#4B5563", fontSize: 10 }} width={50} />
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`} />
                <Legend wrapperStyle={{ fontSize: "10px", paddingTop: "5px" }} align="center" verticalAlign="bottom" />
                <Bar dataKey="7th CPC" fill="#A5B4FC" barSize={20} radius={[4, 4, 0, 0]} />
                <Bar dataKey="8th CPC" fill="#FCA5A5" barSize={20} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    )}

    {/* Download Buttons */}
    <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6 max-w-6xl mx-auto px-2 sm:px-4">
      <button
        type="button"
        onClick={handleGenerateReportPDF}
        aria-label="Download report as PDF"
        className="px-5 py-2 bg-indigo-400 text-white rounded-md hover:bg-indigo-500 transition font-medium shadow-sm"
      >
        Download Report PDF
      </button>
      <button
        type="button"
        onClick={handleGenerateReportExcel}
        aria-label="Download report as Excel"
        className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition font-medium shadow-sm"
      >
        Download Report Excel
      </button>
    </div>
  </>
)}
        </div>
      </main>
      {/* --- Information section --- */}
<section className="bg-gradient-to-b from-white to-blue-50 py-16">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Main Heading */}
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
        About the <span className="text-blue-600">CPC Salary Calculator</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        India's most trusted salary calculation platform for <strong>Central and State Government employees</strong>
      </p>
    </div>

    {/* Key Benefits Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
        <div className="text-4xl mb-3">🧮</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Calculations</h3>
        <p className="text-sm text-gray-600">
          Calculate your complete salary breakdown in seconds with 7th & 8th CPC comparison
        </p>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md border border-green-100 hover:shadow-lg transition-shadow">
        <div className="text-4xl mb-3">📊</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Visual Insights</h3>
        <p className="text-sm text-gray-600">
          Interactive charts showing income, deductions, and net salary comparisons
        </p>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md border border-orange-100 hover:shadow-lg transition-shadow">
        <div className="text-4xl mb-3">📥</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Export Reports</h3>
        <p className="text-sm text-gray-600">
          Download detailed PDF and Excel reports for official records and planning
        </p>
      </div>
    </div>

    {/* Main Content Box */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        What is the CPC Salary Calculator?
      </h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        The <strong>Indian Pay Calculator</strong> is a comprehensive tool built for{" "}
        <strong>Central and State Government employees</strong> to understand and compare their
        pay under both the <strong>7th</strong> and <strong>8th Central Pay Commissions (CPC)</strong>.
        It instantly calculates all major components including <strong>Basic Pay</strong>,
        <strong> Dearness Allowance (DA)</strong>, <strong>House Rent Allowance (HRA)</strong>,
        <strong> Travel Allowance (TA)</strong>, <strong>NPS</strong>, and other deductions,
        giving a transparent in-hand salary breakdown.
      </p>
      <p className="text-gray-700 leading-relaxed">
        This calculator also provides projected salary figures under the upcoming{" "}
        <strong>8th Pay Commission</strong>, based on the selected{" "}
        <strong>fitment factor</strong>. The fitment factor helps estimate how much
        your <strong>Basic Pay</strong> may increase once the new CPC is implemented.
        Users can also generate detailed <strong>PDF and Excel reports</strong> to save
        or print their results for official or personal use.
      </p>
    </div>

    {/* Why Use This Calculator */}
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-8 mb-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Why Government Employees Use This Calculator
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className="text-blue-600 text-xl mt-1">✓</div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Accurate 7th vs 8th CPC Comparison</h4>
            <p className="text-sm text-gray-700">
              Instantly compare your current 7th CPC salary with 8th CPC projections using multiple fitment factor scenarios.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="text-green-600 text-xl mt-1">✓</div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">City-Based HRA & TA Calculations</h4>
            <p className="text-sm text-gray-700">
              Automatic calculations based on X/Y/Z city classification for realistic take-home salary estimates.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="text-orange-600 text-xl mt-1">✓</div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Official CPC Pay Matrix Data</h4>
            <p className="text-sm text-gray-700">
              All calculations based on official CPC reports, Ministry of Finance circulars, and latest DA rates.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="text-purple-600 text-xl mt-1">✓</div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">100% Free & Mobile-Friendly</h4>
            <p className="text-sm text-gray-700">
              No subscriptions, no ads, works perfectly on all devices. Updated regularly with latest government data.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Understanding Fitment Factor */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Understanding the Fitment Factor
      </h3>
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-6 mb-4">
        <div className="flex items-start gap-3">
          <div className="text-3xl">💡</div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">What is a Fitment Factor?</h4>
            <p className="text-gray-700 leading-relaxed mb-3">
              The <strong>Fitment Factor</strong> determines how much your salary increases
              when moving from one Pay Commission to the next. It's a multiplication factor
              applied to your current basic pay to calculate your new basic pay.
            </p>
            <div className="bg-white rounded-lg p-4 border border-yellow-300">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Example:</strong> If your current basic pay is <strong>₹50,000</strong> and the fitment factor is <strong>1.92</strong>:
              </p>
              <p className="text-sm font-mono text-blue-700 mb-1">
                New Basic Pay = ₹50,000 × 1.92 = <strong>₹96,000</strong>
              </p>
              <p className="text-sm text-gray-600">
                This represents a <strong>92% increase</strong> in your basic pay under the 8th CPC.
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">
        You can adjust the fitment factor slider in the calculator (ranging from <strong>1.0 to 3.0</strong>) 
        to test different scenarios and see how your salary components change under the <strong>8th CPC</strong>. 
        Most experts predict the 8th CPC fitment factor will be between <strong>1.8 to 2.0</strong>.
      </p>
    </div>

    {/* What You Can Calculate */}
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-8 mb-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        What You Can Calculate
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-5 shadow-sm border border-green-100">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <span className="text-xl">💰</span> Income Components
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-green-600">•</span> Basic Pay (7th & 8th CPC)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">•</span> Dearness Allowance (DA)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">•</span> House Rent Allowance (HRA)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">•</span> Travel Allowance (TA/CCA)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">•</span> DA on TA
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">•</span> Gross Salary
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg p-5 shadow-sm border border-red-100">
          <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
            <span className="text-xl">📉</span> Deductions
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-red-600">•</span> Income Tax (New & Old Regime)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600">•</span> NPS (National Pension System)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600">•</span> CGHS Contribution
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600">•</span> Professional Tax
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600">•</span> Other Deductions
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600">•</span> Net In-Hand Salary
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Frequently Asked Questions (FAQs)
      </h3>
      
      <div className="space-y-5">
        <div className="border-l-4 border-blue-500 pl-4 py-2">
          <h4 className="font-semibold text-gray-800 mb-2">
            Q: What is the purpose of this calculator?
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong>A:</strong> It helps government employees instantly calculate in-hand
            salary, DA, HRA, NPS, deductions, and compare the difference between the
            <strong> 7th</strong> and <strong>8th Pay Commission</strong>. You can also
            visualize your salary growth with interactive charts and export detailed reports.
          </p>
        </div>

        <div className="border-l-4 border-green-500 pl-4 py-2">
          <h4 className="font-semibold text-gray-800 mb-2">
            Q: Can I download my salary report?
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong>A:</strong> Yes, the tool lets you export your complete salary breakdown in{" "}
            <strong>PDF and Excel formats</strong> for record-keeping, loan applications,
            or official submission purposes.
          </p>
        </div>

        <div className="border-l-4 border-orange-500 pl-4 py-2">
          <h4 className="font-semibold text-gray-800 mb-2">
            Q: Is the data used in this tool official?
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong>A:</strong> Yes, all formulas and DA rates are derived from the{" "}
            <strong>official CPC pay matrix</strong>, Ministry of Finance notifications,
            and government DA announcements. We update the calculator quarterly.
          </p>
        </div>

        <div className="border-l-4 border-purple-500 pl-4 py-2">
          <h4 className="font-semibold text-gray-800 mb-2">
            Q: How accurate are the 8th CPC projections?
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong>A:</strong> The 8th CPC projections are estimates based on the fitment
            factor you select. Since the 8th Pay Commission report is not yet released,
            these are projections. We'll update with official data once available.
          </p>
        </div>

        <div className="border-l-4 border-pink-500 pl-4 py-2">
          <h4 className="font-semibold text-gray-800 mb-2">
            Q: Does this work for State Government employees?
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong>A:</strong> Yes, the calculator works for both <strong>Central and State Government employees</strong>.
            However, some allowances may vary by state. We use standard CPC rates as a baseline.
          </p>
        </div>
      </div>
    </div>

    {/* Closing Statement */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white shadow-xl">
      <h3 className="text-2xl font-bold mb-3">
        Trusted by Thousands of Government Employees
      </h3>
      <p className="text-lg leading-relaxed mb-6">
        With over a million government employees expected to benefit from the upcoming{" "}
        <strong>8th Pay Commission</strong>, this calculator ensures <strong>transparency,
        accuracy, and clarity</strong> for every user seeking to understand their revised pay structure.
      </p>
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
          <div className="font-bold text-2xl">100%</div>
          <div className="text-blue-100">Free</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
          <div className="font-bold text-2xl">Instant</div>
          <div className="text-blue-100">Results</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
          <div className="font-bold text-2xl">Accurate</div>
          <div className="text-blue-100">Data</div>
        </div>
      </div>
    </div>

  </div>
</section>
          </div>
  );
}
