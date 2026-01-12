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
        {/* H1 */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-500 bg-clip-text text-transparent mb-4 tracking-tight">
            DA Arrear Calculator
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Calculate <strong>Dearness Allowance (DA) arrears</strong> under the{" "}
            <strong>7th</strong> and <strong>8th Pay Commissions</strong> quickly and accurately.
            Enter your old and new DA percentages along with your Basic Pay to find total arrears owed.
          </p>
        </div>

        {/* H2 - How to Use */}
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

        {/* H2 - Breakdown */}
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
                    <td colSpan={4} className="px-4 py-2 border">Total</td>
                    <td className="px-4 py-2 border text-green-700 font-bold">
                      ₹{arrears?.toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Enhanced Info Section - Full Guide */}
<section className="max-w-3xl mx-auto space-y-6 text-gray-700 leading-relaxed">
  
  {/* Main Title */}
  <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4 text-center">
    Complete Guide to Dearness Allowance (DA) and Arrear Calculations
  </h2>
  
  {/* Introduction */}
  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
    <p className="text-gray-800">
      This guide explains what Dearness Allowance (DA) is, how DA arrears are calculated, and how to use our calculator to find your exact arrear amount. Whether you're a Central Government employee, State employee, or pensioner, understanding DA is crucial for your salary planning.
    </p>
  </div>

  {/* Section 1: What is DA? */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
      1. What is Dearness Allowance (DA)?
    </h3>
    <p>
      Dearness Allowance (DA) is a cost-of-living adjustment provided by the Government of India to all Central Government employees, State Government employees, and pensioners. Its primary purpose is to <strong>offset the impact of inflation</strong> on the purchasing power of government employees.
    </p>
    <p className="mt-3">
      Think of DA as a periodic salary boost that keeps your income aligned with rising prices. As inflation increases, your DA increases proportionally. This ensures that your real salary (purchasing power) doesn't decline even as prices of goods and services rise.
    </p>
    <p className="mt-3">
      <strong>Key fact:</strong> DA is expressed as a percentage of your Basic Pay. For example, if your Basic Pay is ₹50,000 and DA is 50%, your monthly DA is ₹25,000.
    </p>
  </div>

  {/* Section 2: How Often is DA Revised? */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
      2. How Often is DA Revised and Who Decides?
    </h3>
    <p>
      DA revisions happen <strong>twice per year</strong> — on January 1st and July 1st. The Government of India's Department of Personnel and Training (DoPT) announces new DA rates based on the <strong>Consumer Price Index (CPI)</strong>, which measures inflation across the country.
    </p>
    <p className="mt-3">
      <strong>Process:</strong>
    </p>
    <ul className="list-decimal pl-8 space-y-2 mt-2">
      <li>The Ministry of Labour & Employment calculates the average CPI for a set reference period.</li>
      <li>Based on this CPI, a new DA percentage is calculated using a fixed formula.</li>
      <li>DoPT issues an official notification announcing the new DA rate.</li>
      <li>The new DA rate typically becomes effective from the 1st of the month.</li>
    </ul>
    <p className="mt-4">
      <strong>Example timeline:</strong> If a DA hike is announced in November for January 1st effect, employees receive DA arrears (back-pay) for January 1st to November 30th when the notification is issued.
    </p>
  </div>

  {/* Section 3: What are DA Arrears? */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
      3. Understanding DA Arrears
    </h3>
    <p>
      <strong>DA Arrears</strong> are the difference between the old DA rate and the new DA rate, calculated for all months from the effective date of the new rate until the notification is officially issued.
    </p>
    <p className="mt-3">
      <strong>Why do arrears happen?</strong> Government notifications typically lag behind the effective date. For instance:
    </p>
    <ul className="list-disc pl-8 space-y-2 mt-2">
      <li>New DA becomes effective on <strong>January 1st</strong>.</li>
      <li>Official notification is issued on <strong>November 15th</strong>.</li>
      <li>Arrears cover the gap: <strong>January to November (11 months)</strong>.</li>
    </ul>
    <p className="mt-4">
      Using our calculator, you can instantly compute your arrear amount without manual calculation.
    </p>
  </div>

  {/* Section 4: Formula Explanation */}
  <div className="bg-gray-50 border border-gray-300 p-4 rounded">
    <h3 className="text-xl font-semibold text-gray-800 mb-3">
      4. DA Arrear Calculation Formula
    </h3>
    <p className="font-mono text-lg font-bold text-blue-700 mb-3 text-center">
      Arrear = (New DA% - Old DA%) × Basic Pay × Number of Months ÷ 100
    </p>
    <p>
      <strong>Where:</strong>
    </p>
    <ul className="list-disc pl-8 space-y-2 mt-2">
      <li><strong>New DA%</strong> = The new DA percentage announced by the government.</li>
      <li><strong>Old DA%</strong> = The DA percentage that was in effect before the hike.</li>
      <li><strong>Basic Pay</strong> = Your basic salary (not including allowances or deductions).</li>
      <li><strong>Number of Months</strong> = Months from effective date to notification date.</li>
    </ul>
  </div>

  {/* Section 5: Worked Examples */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
      5. Real-World Examples
    </h3>
    
    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-4">
      <h4 className="font-semibold text-gray-800 mb-2">Example 1: Central Govt Employee</h4>
      <p className="text-sm">
        <strong>Situation:</strong> You are a Level 6 employee with Basic Pay ₹75,000. DA increases from 46% to 50% effective January 1st, and the notification is issued on March 15th.
      </p>
      <p className="text-sm mt-2">
        <strong>Calculation:</strong>
      </p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-1">
        <li>New DA% = 50%</li>
        <li>Old DA% = 46%</li>
        <li>Difference = 4%</li>
        <li>Months = 3 (January, February, March)</li>
        <li>Arrear = (4% × ₹75,000 × 3) ÷ 100 = <strong>₹9,000</strong></li>
      </ul>
      <p className="text-sm mt-2">
        <strong>Result:</strong> You receive ₹9,000 as DA arrear along with March salary.
      </p>
    </div>

    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded mt-4">
      <h4 className="font-semibold text-gray-800 mb-2">Example 2: Pensioner</h4>
      <p className="text-sm">
        <strong>Situation:</strong> You are a retired employee receiving pension of ₹60,000 (includes Basic equivalent and DA). DA increases from 48% to 50% effective July 1st, and notification comes on September 20th.
      </p>
      <p className="text-sm mt-2">
        <strong>Calculation:</strong>
      </p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-1">
        <li>New DA% = 50%</li>
        <li>Old DA% = 48%</li>
        <li>Difference = 2%</li>
        <li>Months = 3 (July, August, September)</li>
        <li>Arrear = (2% × ₹60,000 × 3) ÷ 100 = <strong>₹3,600</strong></li>
      </ul>
      <p className="text-sm mt-2">
        <strong>Result:</strong> Your pension arrear for 3 months is ₹3,600.
      </p>
    </div>

    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded mt-4">
      <h4 className="font-semibold text-gray-800 mb-2">Example 3: Employee on Leave/Suspension</h4>
      <p className="text-sm">
        <strong>Situation:</strong> DA increases from 47% to 51% effective May 1st. You were on sick leave during May and June, then returned in July. Notification issued in September.
      </p>
      <p className="text-sm mt-2">
        <strong>Important Note:</strong> DA arrears are calculated on your Basic Pay even if you were on leave. Government ensures you get full arrear benefit.
      </p>
      <p className="text-sm mt-2">
        <strong>Calculation:</strong> (4% × Basic Pay × 5 months [May to September]) ÷ 100
      </p>
    </div>
  </div>

  {/* Section 6: Impact Beyond Basic DA */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
      6. How DA Changes Impact Other Allowances
    </h3>
    <p>
      DA is not just a standalone allowance — it affects other components of your salary:
    </p>
    <ul className="list-disc pl-8 space-y-3 mt-3">
      <li>
        <strong>HRA (House Rent Allowance):</strong> When DA reaches certain thresholds (e.g., 50%), HRA is recalculated. HRA arrears also get adjusted accordingly.
      </li>
      <li>
        <strong>TA (Travel Allowance):</strong> Some TA components are linked to DA. A DA hike can trigger TA adjustments for travel to distant places.
      </li>
      <li>
        <strong>NPS Contribution:</strong> Your employee and employer NPS contributions are based on (Basic + DA). A DA increase means higher NPS savings.
      </li>
      <li>
        <strong>Income Tax:</strong> DA arrears are added to your income in the financial year they're received, potentially affecting your tax liability.
      </li>
    </ul>
  </div>

  {/* Section 7: Special Cases */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
      7. Special Cases & Exceptions
    </h3>
    
    <h4 className="font-semibold text-gray-700 mt-4 mb-2">Promoted Employees During DA Hike</h4>
    <p>
      If you were promoted between the effective date and notification date, DA arrear is calculated on <strong>both</strong> your old and new Basic Pay for the respective periods.
    </p>

    <h4 className="font-semibold text-gray-700 mt-4 mb-2">Employees Who Joined Mid-Year</h4>
    <p>
      If you joined in June and DA increased in January, you don't get arrear for pre-joining months. Arrear is calculated only from your joining date.
    </p>

    <h4 className="font-semibold text-gray-700 mt-4 mb-2">Employees on Leave Without Pay (LWP)</h4>
    <p>
      General rule: DA is paid on the Basic Pay of the position you hold, regardless of leave status. Check with your HR/PAO office to confirm in your specific case.
    </p>

    <h4 className="font-semibold text-gray-700 mt-4 mb-2">State Government vs Central Government</h4>
    <p>
      While the DA formula is similar, State governments may have slight variations in rates, effective dates, and calculation methods. Use state-specific rates in our calculator where applicable.
    </p>
  </div>

  {/* Section 8: Latest DA & 8th CPC */}
  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded mt-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-3">
      8. Latest DA Updates and 8th Pay Commission
    </h3>
    <p>
      As of January 2026, DA for Central Government employees under the <strong>7th Pay Commission</strong> stands at <strong>50%</strong>. At this level, several salary components undergo reset:
    </p>
    <ul className="list-disc pl-8 space-y-2 mt-3">
      <li>
        <strong>HRA Reset:</strong> When DA hits 50%, HRA is recalculated, often resulting in a decrease from earlier percentages.
      </li>
      <li>
        <strong>Fitment Factor:</strong> The <strong>8th Pay Commission</strong>, expected in 2026-27, will introduce a new pay scale with a fitment factor (likely 1.80–2.00x). This means Basic Pay could increase by 80–100%.
      </li>
      <li>
        <strong>DA Reset:</strong> When 8th CPC is implemented, DA typically resets to near 0% and then increases over time. Our calculator supports both 7th and projected 8th CPC scenarios.
      </li>
    </ul>
  </div>

  {/* Section 9: FAQ */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
      9. Frequently Asked Questions
    </h3>
    
    <div className="space-y-4">
      <div className="border-b pb-4">
        <h4 className="font-semibold text-gray-800">Q: Can I claim DA arrears as a separate TDS (tax deduction)?</h4>
        <p className="text-gray-700 mt-2">
          A: DA arrears are typically clubbed with regular salary for that financial year and taxed accordingly. Consult your HR/Income Tax officer for detailed guidance based on your income slab.
        </p>
      </div>

      <div className="border-b pb-4">
        <h4 className="font-semibold text-gray-800">Q: How do I check if my DA arrear was calculated correctly?</h4>
        <p className="text-gray-700 mt-2">
          A: Use our calculator with your Basic Pay, old DA%, new DA%, and months. Cross-verify with your latest payslip or contact your Pay & Accounts Office (PAO).
        </p>
      </div>

      <div className="border-b pb-4">
        <h4 className="font-semibold text-gray-800">Q: What if I was on vacation during the DA announcement?</h4>
        <p className="text-gray-700 mt-2">
          A: DA arrears are paid regardless of your leave status during the arrear period. You get the full arrear based on your position and Basic Pay.
        </p>
      </div>

      <div className="border-b pb-4">
        <h4 className="font-semibold text-gray-800">Q: Do pensioners get DA arrears?</h4>
        <p className="text-gray-700 mt-2">
          A: Yes, pensioners receive DA arrears just like serving employees. However, if your pension is fixed (not revised), arrears may apply only to the DA component.
        </p>
      </div>

      <div className="border-b pb-4">
        <h4 className="font-semibold text-gray-800">Q: When will 8th Pay Commission be implemented and how will it affect DA?</h4>
        <p className="text-gray-700 mt-2">
          A: The 8th CPC is expected in 2026-27. Upon implementation, DA will reset closer to 0%, and your Basic Pay will jump significantly (typically by 80–100% via fitment factor). Our calculator supports 8th CPC projections.
        </p>
      </div>

      <div className="border-b pb-4">
        <h4 className="font-semibold text-gray-800">Q: Is this calculator applicable to State Government employees?</h4>
        <p className="text-gray-700 mt-2">
          A: Our calculator works for Central Government employees and State employees following similar pay matrices. However, some states may have different DA schedules or calculation methods. Always verify with your state's government notification.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800">Q: What happens to DA if I get promoted?</h4>
        <p className="text-gray-700 mt-2">
          A: Upon promotion, your DA % remains the same, but it applies to your new (higher) Basic Pay. DA arrears after promotion are calculated on your new Basic Pay for the arrear period.
        </p>
      </div>
    </div>
  </div>

  {/* Section 10: Our Calculator */}
  <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded mt-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      Using the Indian Pay Calculator
    </h3>
    <p>
      To calculate your exact DA arrear, enter:
    </p>
    <ol className="list-decimal pl-8 space-y-2 mt-2 text-gray-700">
      <li><strong>Basic Pay:</strong> Your monthly basic salary (from payslip).</li>
      <li><strong>Old DA %:</strong> The DA % before the hike.</li>
      <li><strong>New DA %:</strong> The new DA % announced.</li>
      <li><strong>Number of Months:</strong> Months from effective date to notification date.</li>
    </ol>
    <p className="mt-3 text-gray-700">
      The calculator will instantly show your arrear amount, broken down by month if needed.
    </p>
  </div>

  {/* Section 11: Disclaimer & Sources */}
  <div className="bg-gray-100 p-4 rounded mt-6 text-sm text-gray-600">
    <h4 className="font-semibold text-gray-800 mb-2">Disclaimer & Sources</h4>
    <p>
      This information is based on official Government of India, Department of Personnel and Training (DoPT) notifications and 7th Pay Commission guidelines. While we strive for accuracy, calculations are for <strong>informational purposes only</strong>. For official confirmation, consult your Pay & Accounts Office (PAO) or refer to official government notifications.
    </p>
  </div>

  {/* Internal Links Block */}
  <div className="bg-purple-50 p-6 rounded mt-8 border border-purple-200">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Tools & Guides</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <a href="/" className="text-blue-600 hover:underline font-medium">
        → Main Salary Calculator
      </a>
      <a href="/hra-class-calculator" className="text-blue-600 hover:underline font-medium">
        → HRA Class Calculator
      </a>
      <a href="/nps-calculator" className="text-blue-600 hover:underline font-medium">
        → NPS Calculator
      </a>
      <a href="/income-tax-calculator" className="text-blue-600 hover:underline font-medium">
        → Income Tax Calculator
      </a>
      <a href="/Salaryhandbook/ta" className="text-blue-600 hover:underline font-medium">
        → Travel Allowance Guide
      </a>
      <a href="/Salaryhandbook/ltc" className="text-blue-600 hover:underline font-medium">
        → LTC Guide
      </a>
    </div>
  </div>

</section>

      </main>
    </div>
  );
}
