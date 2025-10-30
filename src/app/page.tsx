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
          <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-500 bg-clip-text text-transparent mb-4 tracking-tight">
              Govt. Employees Salary Calculator
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              This CPC Salary Calculator helps you understand and compare your pay under the <strong>7th</strong> and upcoming <strong>8th Pay Commission</strong>. Whether you want to calculate your in-hand salary, DA, HRA, TA, or total deductions, this tool gives a clear, accurate breakdown for government employees. Explore your salary growth with our Pay Matrix and fitment factor projection features.
            </p>
          </header>

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
      {/* --- Informational SEO Section (Static Text) --- */}
<section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 mb-10 text-gray-700 leading-relaxed">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
    About the CPC Salary Calculator
  </h2>
  <p className="mb-4">
    The <strong>Indian Pay Calculator</strong> is a comprehensive tool built for{" "}
    <strong>Central and State Government employees</strong> to understand and compare their
    pay under both the <strong>7th</strong> and <strong>8th Central Pay Commissions (CPC)</strong>.
    It instantly calculates all major components including <strong>Basic Pay</strong>,
    <strong> Dearness Allowance (DA)</strong>, <strong>House Rent Allowance (HRA)</strong>,
    <strong> Travel Allowance (TA)</strong>, <strong>NPS</strong>, and other deductions,
    giving a transparent in-hand salary breakdown.
  </p>
  <p className="mb-4">
    This calculator also provides projected salary figures under the upcoming{" "}
    <strong>8th Pay Commission</strong>, based on the selected{" "}
    <strong>fitment factor</strong>. The fitment factor helps estimate how much
    your <strong>Basic Pay</strong> may increase once the new CPC is implemented.
    Users can also generate detailed <strong>PDF and Excel reports</strong> to save
    or print their results for official or personal use.
  </p>

  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
    Why Government Employees Use This Calculator
  </h3>
  <ul className="list-disc pl-6 space-y-2">
    <li>Accurate comparison between <strong>7th and 8th CPC pay structures</strong>.</li>
    <li>City-based <strong>HRA and TA calculations</strong> for realistic results.</li>
    <li>Calculations are based on <strong>official CPC pay matrix</strong> and DA formula.</li>
    <li>Free, mobile-friendly, and updated regularly with latest government data.</li>
  </ul>

  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
    Understanding the Fitment Factor
  </h3>
  <p className="mb-4">
    The <strong>Fitment Factor</strong> determines how much your salary increases
    when moving from one Pay Commission to the next. For example, a factor of{" "}
    <strong>1.92</strong> means your new Basic Pay will be about{" "}
    <strong>92% higher</strong> than your current pay. You can adjust this slider in
    the calculator to test different scenarios and view how your salary components
    change under the <strong>8th CPC</strong>.
  </p>

  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
    Frequently Asked Questions (FAQs)
  </h3>
  <p className="mb-2">
    <strong>Q:</strong> What is the purpose of this calculator?<br />
    <strong>A:</strong> It helps government employees instantly calculate in-hand
    salary, DA, HRA, NPS, deductions, and compare the difference between the
    <strong> 7th</strong> and <strong>8th Pay Commission</strong>.
  </p>
  <p className="mb-2">
    <strong>Q:</strong> Can I download my salary report?<br />
    <strong>A:</strong> Yes, the tool lets you export your salary details in{" "}
    <strong>PDF and Excel formats</strong> for record-keeping or submission purposes.
  </p>
  <p className="mb-2">
    <strong>Q:</strong> Is the data used in this tool official?<br />
    <strong>A:</strong> Yes, the formulas and DA rates are derived from the{" "}
    <strong>official CPC pay matrix</strong> and government DA notifications.
  </p>

  <p className="mt-6">
    With over a million government employees expected to benefit from the upcoming{" "}
    <strong>8th Pay Commission</strong>, this calculator ensures transparency,
    accuracy, and clarity for every user seeking to understand their revised pay structure.
  </p>
</section>
    </div>
  );
}
