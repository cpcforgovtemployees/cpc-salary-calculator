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

  const STORAGE_KEY = "salary-calculator-inputs-v2";
  const EXPIRY_DURATION = 60 * 60 * 1000;

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
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn("Could not load saved data", e);
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
      console.warn("Could not save data", e);
    }
  }, [inputs]);

  const [fitmentFactor, setFitmentFactor] = useState(1.92);

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

  const handleGenerateReportPDF = async () => {
    try {
      const jsPDFModule = await import("jspdf");
      const jsPDF = jsPDFModule.jsPDF;
      const autoTableModule = await import("jspdf-autotable");
      const autoTable = autoTableModule.default || (autoTableModule as any).autoTable;
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const now = new Date().toLocaleString("en-IN");

      pdf.setFontSize(18);
      pdf.setTextColor("#1E3A8A");
      pdf.text("CPC Salary Calculation Report", 40, 50);

      pdf.setFontSize(10);
      pdf.setTextColor("#4B5563");
      pdf.text(`Generated on: ${now}`, 40, 70);
      pdf.text(`Fitment Factor (8th CPC): ×${fitmentFactor.toFixed(2)}`, 40, 85);

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

      pdf.save("CPC_Salary_Report.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
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

      const colWidths = [{ wch: 25 }, { wch: 15 }];
      worksheet["!cols"] = colWidths;

      XLSX.writeFile(workbook, "CPC_Salary_Report.xlsx");
    } catch (err) {
      console.error("Error generating Excel:", err);
      alert("Failed to generate Excel file. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-1">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12 sm:space-y-16">
          
          <section className="relative overflow-hidden py-8 sm:py-10 lg:py-12">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50"></div>
  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>

  <div className="relative px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">
      
      {/* Trust Badge at Top */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 sm:px-5 py-1.5 sm:py-2 border border-blue-200/50 shadow-sm">
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            🇮🇳 <span className="text-blue-600 font-semibold"></span> Built for Indian Government Employees 
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        
        {/* LEFT: TEXT */}
        <div className="space-y-4">
          
          {/* Headline */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Forecast Your 
              <span className="block text-blue-600">8th CPC Salary</span>
            </h1>
          </div>
          
          {/* Subheading */}
          <p className="text-base sm:text-lg text-gray-700 leading-snug">
            Instant breakdown of DA, HRA, deductions & compare 7th vs 8th CPC in seconds.
          </p>

          {/* Key Benefits */}
          <div className="space-y-2 pt-2">
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <span className="text-green-600 font-bold text-lg">✓</span> 
              <span>Based on latest government salary data</span>
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <span className="text-green-600 font-bold text-lg">✓</span> 
              <span>Download PDF & Excel reports</span>
            </p>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => {
              const element = document.querySelector('[aria-label="Salary Details Form"]');
              element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="mt-4 px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 transform hover:scale-105"
          >
            <span></span> Calculate Now
          </button>
        </div>

        {/* RIGHT: EXAMPLE CARD - REAL DATA */}
        <div className="hidden md:block">
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
            
            {/* Card Header */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg">
                💎
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Sample Output</p>
                <p className="text-xs text-gray-500">Delhi, Level 10</p>
              </div>
            </div>

            {/* Sample Calculation Data */}
            <div className="space-y-3">
              
              {/* 7th CPC Section */}
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">7th CPC - Monthly</p>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm text-gray-700">Basic Pay</p>
                  <p className="text-lg font-bold text-gray-900">₹56,100</p>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <p className="text-sm text-gray-700">DA + HRA</p>
                  <p className="text-lg font-bold text-gray-900">₹38,900</p>
                </div>
                <div className="flex justify-between items-baseline mt-1 pt-2 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">Net Salary</p>
                  <p className="text-xl font-bold text-blue-600">₹78,200</p>
                </div>
              </div>

              {/* Divider */}
              <div className="py-2 border-t-2 border-b-2 border-dashed border-blue-200">
                <p className="text-xs text-blue-600 font-semibold text-center">↓ 8th CPC Projection</p>
              </div>

              {/* 8th CPC Section */}
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">8th CPC - Estimated</p>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm text-gray-700">Basic Pay (×1.92)</p>
                  <p className="text-lg font-bold text-gray-900">₹107,712</p>
                </div>
                <div className="flex justify-between items-baseline mt-1 pt-2 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">Est. Net</p>
                  <p className="text-xl font-bold text-green-600">₹1,12,000+</p>
                </div>
                <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1">
                  <span>🌱</span> +43% Increase Potential
                </p>
              </div>
            </div>

            {/* Live Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-semibold text-green-700">Live Data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Animations */}
  <style jsx>{`
    @keyframes blob {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(15px, -20px) scale(1.05); }
      66% { transform: translate(-10px, 10px) scale(0.95); }
    }
    .animate-blob { animation: blob 7s infinite; }
    .animation-delay-2000 { animation-delay: 2s; }
  `}</style>
</section>

          {/* BENEFIT CARDS SECTION */}
          <section className="mt-8 sm:mt-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  Why Use This Calculator?
                </h2>
                <p className="text-gray-600 text-lg">Get clarity on your complete salary breakdown</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl border border-gray-200 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-3">₹</div>
                  <h3 className="font-bold text-gray-900 mb-2">Understand Your Salary</h3>
                  <p className="text-sm text-gray-600">See exactly where every rupee goes after taxes, NPS, and deductions</p>
                </div>

                <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl border border-gray-200 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-3">⚔️</div>
                  <h3 className="font-bold text-gray-900 mb-2">Compare Pay Commissions</h3>
                  <p className="text-sm text-gray-600">See your 7th CPC salary vs projected 8th CPC side-by-side</p>
                </div>

                <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl border border-gray-200 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-3">🔭</div>
                  <h3 className="font-bold text-gray-900 mb-2">Plan Your Future</h3>
                  <p className="text-sm text-gray-600">Adjust fitment factor to see various salary scenarios</p>
                </div>

                <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl border border-gray-200 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-3">📥</div>
                  <h3 className="font-bold text-gray-900 mb-2">Download Reports</h3>
                  <p className="text-sm text-gray-600">Generate PDF and Excel for loans, records, and planning</p>
                </div>
              </div>
            </div>
          </section>

          {/* CALCULATOR FORM SECTION */}
          <section 
            aria-label="Salary Details Form"
            className="relative"
          >
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  Calculate Your Salary
                </h2>
                <p className="text-gray-600">Fill in your details to get instant calculations</p>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
                <CalculatorForm
                  inputs={inputs}
                  onChange={(updatedInputs) => setInputs(updatedInputs)}
                />
              </div>
            </div>
          </section>

          {/* RESULTS SECTION */}
{inputs.basicPay > 0 && inputs.payLevel && (
  <>
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Your Salary Breakdown
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Compare 7th CPC (Current) vs 8th CPC (Projected)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full">
          {/* 7th CPC Card */}
          <div className="w-full min-w-0">
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="text-center mb-6 pb-4 border-b-2 border-amber-200">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  🟡 7th Central Pay Commission
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">Current Salary</p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ResultsBreakdown breakdown={breakdown7th} />
              </div>
            </Card>
          </div>

          {/* 8th CPC Card */}
          <div className="w-full min-w-0">
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="text-center mb-6 pb-4 border-b-2 border-pink-200">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  🎯 8th Central Pay Commission
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">Projected Salary</p>

                <div className="mt-4 pt-4 border-t border-pink-200">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                    <Label className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Fitment Factor:
                    </Label>
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center">
                      <input
                        type="range"
                        min={1.0}
                        max={3.0}
                        step={0.01}
                        value={fitmentFactor}
                        onChange={(e) => setFitmentFactor(parseFloat(e.target.value))}
                        className="w-24 sm:w-32 h-2 rounded-full accent-pink-500"
                        aria-label="Fitment Factor"
                      />
                      <span className="text-pink-700 font-bold text-base sm:text-lg min-w-14 sm:min-w-16 text-right">
                        × {fitmentFactor.toFixed(2)}
                      </span>
                      <InfoTooltip
                        content={
                          <div className="text-xs sm:text-sm text-gray-700">
                            <p className="font-semibold mb-2">Fitment Factor</p>
                            <p>Multiplier applied to your basic pay for 8th CPC estimation.</p>
                            <p className="mt-2 text-xs text-gray-600">
                              E.g., 1.92 = 92% salary increase
                            </p>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ResultsBreakdown breakdown={breakdown8th} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>

              {/* CHARTS SECTION */}
              {(breakdown7th?.grossSalary > 0 || breakdown8th?.grossSalary > 0) && (
                <section className="mt-12 sm:mt-16">
                  <Card className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
                    ⚖️ Visual Comparison
                    </h2>
                    <p className="text-center text-gray-600 mb-8">See your salary components side-by-side</p>

                    {/* Income Chart */}
                    <div className="mb-10 sm:mb-12">
                      <h3 className="text-center font-semibold text-blue-700 mb-4 text-lg">
                        Income Components Comparison
                      </h3>
                      <div className="w-full h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Basic Pay", "7th": breakdown7th.basicPay, "8th": breakdown8th.basicPay },
                              { name: "DA", "7th": breakdown7th.da, "8th": breakdown8th.da },
                              { name: "HRA", "7th": breakdown7th.hra, "8th": breakdown8th.hra },
                              { name: "Net Salary", "7th": breakdown7th.netSalary, "8th": breakdown8th.netSalary },
                            ]}
                            margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="name" tick={{ fill: "#4B5563", fontSize: 12 }} />
                            <YAxis tick={{ fill: "#4B5563", fontSize: 12 }} width={60} />
                            <Tooltip formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`} />
                            <Legend />
                            <Bar dataKey="7th" fill="#FBBF24" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="8th" fill="#10B981" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Deductions Chart */}
                    <div>
                      <h3 className="text-center font-semibold text-red-700 mb-4 text-lg">
                        Deductions Comparison
                      </h3>
                      <div className="w-full h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Income Tax", "7th": breakdown7th.incomeTax ?? 0, "8th": breakdown8th.incomeTax ?? 0 },
                              { name: "NPS", "7th": breakdown7th.npsEmployee, "8th": breakdown8th.npsEmployee },
                              { name: "CGHS", "7th": breakdown7th.cghs, "8th": breakdown8th.cghs },
                            ]}
                            margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="name" tick={{ fill: "#4B5563", fontSize: 12 }} />
                            <YAxis tick={{ fill: "#4B5563", fontSize: 12 }} width={60} />
                            <Tooltip formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`} />
                            <Legend />
                            <Bar dataKey="7th" fill="#A5B4FC" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="8th" fill="#FCA5A5" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </Card>
                </section>
              )}

              {/* DOWNLOAD BUTTONS */}
              <section className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto px-2">
                <button
                  onClick={handleGenerateReportPDF}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Download PDF Report
                </button>
                <button
                  onClick={handleGenerateReportExcel}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Download Excel Report
                </button>
              </section>
            </>
          )}

          {/* OTHER CALCULATORS SECTION */}
          <section className="mt-16 sm:mt-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  Other Government Salary Calculators
                </h2>
                <p className="text-gray-600">Calculate allowances and deductions separately</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                {[
                  { icon: "🧮", name: "DA Calculator", desc: "Dearness Allowance", link: "/da-arrear-calculator" },
                  { icon: "🏠", name: "HRA Calculator", desc: "House Rent Allowance", link: "/hra-class-calculator" },
                  { icon: "✈️", name: "TA Calculator", desc: "Travel Allowance", link: "/ta-calculator" },
                  { icon: "💼", name: "NPS Calculator", desc: "Pension Contribution", link: "/nps-calculator" },
                  { icon: "🧾", name: "Income Tax", desc: "Tax Calculation", link: "/income-tax-calculator" },
                ].map((calc, idx) => (
                  <a
                    key={idx}
                    href={calc.link}
                    className="group bg-white rounded-xl p-5 shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 transform hover:-translate-y-2 text-center"
                  >
                    <div className="text-4xl mb-3">{calc.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{calc.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{calc.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT SECTION */}
          <section className="mt-16 sm:mt-20 bg-gradient-to-b from-white to-gray-50 py-12 -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  About This Calculator
                </h2>
                <p className="text-gray-600 text-lg">India's most trusted salary tool for government employees</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">What is the CPC Salary Calculator?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A comprehensive tool built for Central and State Government employees to understand and compare pay under the 7th and 8th Central Pay Commissions. It instantly calculates Basic Pay, DA, HRA, TA, NPS, and income tax with transparent breakdowns.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Government Employees Trust This Calculator</h3>
                  <div className="space-y-3">
                    {[
                      { title: "Official Data", desc: "Based on CPC pay matrix and Ministry of Finance circulars" },
                      { title: "City-Based Calculations", desc: "Accurate HRA & TA based on X/Y/Z city classification" },
                      { title: "Instant Results", desc: "Get your complete breakdown in seconds with visual charts" },
                      { title: "Always Free", desc: "No subscriptions, no hidden costs, no ads. 100% free to use" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    💡 Fitment Factor Explained
                  </h4>
                  <p className="text-sm text-blue-800">
                    The fitment factor determines your new basic pay under the 8th CPC. E.g., a factor of 1.92 means your basic pay increases by 92%. Adjust the slider to see different scenarios.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
