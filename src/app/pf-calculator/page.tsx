"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function PFCalculatorPage() {
  const [basicPay, setBasicPay] = useState<number>(50000);
  const [employeePF, setEmployeePF] = useState<number>(12);
  const [employerPF, setEmployerPF] = useState<number>(12);
  const [interestRate, setInterestRate] = useState<number>(8.25);
  const [yearsOfService, setYearsOfService] = useState<number>(30);
  const [results, setResults] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const calculatePF = () => {
    const monthlyEmployeeContribution = (basicPay * employeePF) / 100;
    const monthlyEmployerContribution = (basicPay * employerPF) / 100;
    const monthlyTotalContribution = monthlyEmployeeContribution + monthlyEmployerContribution;
    const annualContribution = monthlyTotalContribution * 12;

    let balance = 0;
    let totalEmployeeContribution = 0;
    let totalEmployerContribution = 0;
    const yearlyData: any[] = [];

    for (let year = 1; year <= yearsOfService; year++) {
      // Add contributions for the year
      balance += annualContribution;
      totalEmployeeContribution += monthlyEmployeeContribution * 12;
      totalEmployerContribution += monthlyEmployerContribution * 12;

      // Apply interest at year end
      balance += balance * (interestRate / 100);

      yearlyData.push({
        year: year,
        balance: Math.round(balance),
        contribution: Math.round(totalEmployeeContribution + totalEmployerContribution),
      });
    }

    const totalContribution = totalEmployeeContribution + totalEmployerContribution;
    const totalInterest = balance - totalContribution;

    setResults({
      monthlyEmployeeContribution: Math.round(monthlyEmployeeContribution),
      monthlyEmployerContribution: Math.round(monthlyEmployerContribution),
      totalEmployeeContribution: Math.round(totalEmployeeContribution),
      totalEmployerContribution: Math.round(totalEmployerContribution),
      totalContribution: Math.round(totalContribution),
      totalInterest: Math.round(totalInterest),
      maturityAmount: Math.round(balance),
    });

    setChartData(yearlyData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Provident Fund (PF) Calculator for Government Employees
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate your <strong>EPF/GPF maturity amount</strong> with compound interest. Estimate total{" "}
            <strong>employee and employer contributions</strong> and projected <strong>retirement savings</strong>{" "}
            based on current EPFO rules (2026).
          </p>
        </div>

        {/* Input Card */}
        <Card className="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">Enter Your Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Pay */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Basic Pay (₹ per month)
              </label>
              <input
                type="number"
                value={basicPay}
                onChange={(e) => setBasicPay(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="50000"
              />
            </div>

            {/* Employee PF % */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee PF Contribution (%)
              </label>
              <input
                type="number"
                value={employeePF}
                onChange={(e) => setEmployeePF(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="12"
                step="0.1"
              />
            </div>

            {/* Employer PF % */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employer PF Contribution (%)
              </label>
              <input
                type="number"
                value={employerPF}
                onChange={(e) => setEmployerPF(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="12"
                step="0.1"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="8.25"
                step="0.01"
              />
            </div>

            {/* Years of Service */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Service
              </label>
              <input
                type="number"
                value={yearsOfService}
                onChange={(e) => setYearsOfService(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="30"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <div className="mt-8 text-center">
            <Button
              onClick={calculatePF}
              className="bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold px-10 py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-green-600 transition-all text-lg"
            >
              Calculate PF Maturity
            </Button>
          </div>
        </Card>

        {/* Results Card */}
        {results && (
          <Card className="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
              Your PF Maturity Breakdown
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-100 to-green-100">
                    <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Component
                    </th>
                    <th className="border border-gray-300 px-6 py-3 text-right text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-6 py-3 text-gray-700">
                      Monthly Employee Contribution
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-medium text-gray-800">
                      {formatCurrency(results.monthlyEmployeeContribution)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-6 py-3 text-gray-700">
                      Monthly Employer Contribution
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-medium text-gray-800">
                      {formatCurrency(results.monthlyEmployerContribution)}
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 px-6 py-3 text-gray-700 font-semibold">
                      Total Employee Contribution (All Years)
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-semibold text-blue-700">
                      {formatCurrency(results.totalEmployeeContribution)}
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 px-6 py-3 text-gray-700 font-semibold">
                      Total Employer Contribution (All Years)
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-semibold text-blue-700">
                      {formatCurrency(results.totalEmployerContribution)}
                    </td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-6 py-3 text-gray-800 font-bold">
                      Total Principal (Contributions)
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-bold text-green-700">
                      {formatCurrency(results.totalContribution)}
                    </td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-6 py-3 text-gray-800 font-bold">
                      Total Interest Earned
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-bold text-yellow-700">
                      {formatCurrency(results.totalInterest)}
                    </td>
                  </tr>
                  <tr className="bg-gradient-to-r from-green-100 to-blue-100">
                    <td className="border border-gray-300 px-6 py-3 text-gray-900 font-extrabold text-lg">
                      Final PF Maturity Value
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-right font-extrabold text-green-800 text-xl">
                      {formatCurrency(results.maturityAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Chart Card */}
        {chartData.length > 0 && (
          <Card className="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
              PF Growth Over Time
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Amount (₹)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="contribution"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Total Contributions"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="PF Balance"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* PF Calculator - Complete Educational Section */}
<section className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
  
  {/* Main Heading */}
  <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4 text-center">
    Provident Fund (PF) Calculator Guide: Understanding EPF and GPF for Government Employees
  </h2>

  {/* Introduction */}
  <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded">
    <p className="text-gray-800 font-medium">
      The Provident Fund (PF) is a mandatory retirement and social security scheme for government employees in India. Unlike NPS (which is market-linked), PF is a guaranteed fixed-return investment where both you and your employer contribute regularly. This guide explains how PF works, contribution structures, and how to maximize your PF balance for retirement security.
    </p>
  </div>

  {/* Section 1: What is Provident Fund? */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      1. What is Provident Fund (PF)?
    </h3>
    <p>
      Provident Fund (PF) is a <strong>defined-benefit, guaranteed-return social security scheme</strong> designed to provide retirement security for Indian workers. The government employee, employer, and in some cases the government all contribute to a dedicated account that earns fixed interest annually.
    </p>
    <p className="mt-4">
      <strong>Key features of PF:</strong>
    </p>
    <ul className="list-disc pl-8 space-y-2 mt-3">
      <li>PF contributions are <strong>mandatory</strong> for government employees (no choice).</li>
      <li>Both <strong>employee and employer contribute</strong> fixed percentages of your salary.</li>
      <li>PF earns <strong>guaranteed fixed interest annually</strong> (set by EPFO/Government annually).</li>
      <li>PF can be <strong>partially withdrawn</strong> for specific purposes (medical, education, home, etc.).</li>
      <li>PF balance at retirement can be <strong>withdrawn as a lump sum</strong> (tax-free under certain conditions).</li>
      <li>PF is <strong>not market-linked</strong>, so returns are stable and predictable.</li>
    </ul>
    <p className="mt-4 text-sm text-gray-600">
      <strong>Note:</strong> Government employees typically have <strong>GPF (General Provident Fund)</strong>, not EPF (Employee PF). We'll cover both below.
    </p>
  </div>

  {/* Section 2: GPF vs EPF - Which One Do You Have? */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      2. GPF vs EPF: Which Scheme Applies to You?
    </h3>
    <p>
      India has TWO main provident fund schemes. It's important to know which one applies to your employment:
    </p>

    <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">GPF (General Provident Fund)</h4>
    <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded">
      <ul className="list-disc pl-8 space-y-2 text-sm">
        <li><strong>Who Gets It:</strong> Central Government employees, State Government employees, and statutory bodies.</li>
        <li><strong>Contribution:</strong> Employee: 6% of Basic + DA (deducted from salary) + Employer: 6% of Basic + DA (additional benefit).</li>
        <li><strong>Interest Rate:</strong> Declared annually by Government of India (currently 8.25% p.a. as of Jan 2026).</li>
        <li><strong>Lock-in Period:</strong> No lock-in. You can withdraw anytime after 1 year, subject to limits.</li>
        <li><strong>Partial Withdrawal:</strong> Up to 50% of balance or ₹50,000, whichever is lower (after 7 years service).</li>
        <li><strong>Full Withdrawal:</strong> Allowed at retirement or resignation. Balance transferred to bank as lump sum.</li>
        <li><strong>Tax Treatment:</strong> Interest earned is <strong>tax-free</strong>. Lump sum withdrawal at retirement is <strong>fully tax-free</strong>.</li>
        <li><strong>Loan Against GPF:</strong> Can borrow up to 50% of balance or last 12 months salary, whichever is lower.</li>
      </ul>
    </div>

    <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">EPF (Employee Provident Fund)</h4>
    <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded">
      <ul className="list-disc pl-8 space-y-2 text-sm">
        <li><strong>Who Gets It:</strong> Private sector employees, workers in organized sector (not typical for govt employees).</li>
        <li><strong>Contribution:</strong> Employee: 12% of Basic + DA + Employer: 12% of Basic + DA (total 24%).</li>
        <li><strong>Interest Rate:</strong> Declared quarterly by EPFO (currently 8.25% p.a. as of Jan 2026).</li>
        <li><strong>Lock-in Period:</strong> Until age 58 (for most employees) with some exceptions.</li>
        <li><strong>Partial Withdrawal:</strong> Allowed from age 50 or after 10 years service.</li>
        <li><strong>Full Withdrawal:</strong> At retirement (age 60) or separation from employment.</li>
        <li><strong>Tax Treatment:</strong> Interest is <strong>tax-free</strong>. Lump sum at retirement is tax-free only if service &gt;5 years.</li>
        <li><strong>Loan Against EPF:</strong> Can borrow up to 50% of balance or 3.5 months salary, whichever is lower.</li>
      </ul>
    </div>

    <div className="bg-yellow-100 border border-yellow-400 rounded p-4 mt-5">
      <p className="font-semibold text-gray-800 text-sm">💡 Government Employees Note:</p>
      <p className="text-gray-700 text-sm mt-2">
        <strong>If you work for Central/State Government, you have GPF.</strong> This guide focuses on GPF for government employees. The contribution rate is 12% total (6% employee + 6% employer), which is lower than EPF but still provides excellent retirement security.
      </p>
    </div>
  </div>

  {/* Section 3: GPF Contribution Structure */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      3. GPF Contribution Breakdown for Government Employees
    </h3>
    <p>
      GPF works on a simple monthly deduction and employer contribution model:
    </p>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Monthly Contribution Structure</h4>
    <div className="bg-gray-50 border border-gray-300 p-4 rounded mt-3">
      <p className="font-mono text-center text-gray-800 font-bold mb-3">
        Total Monthly GPF = 12% of (Basic Pay + Dearness Allowance)
      </p>
      <ul className="space-y-2 text-sm">
        <li className="flex justify-between">
          <span><strong>Employee Contribution (Deducted from Salary):</strong></span>
          <span>6% of (Basic + DA)</span>
        </li>
        <li className="flex justify-between">
          <span><strong>Employer Contribution (Government):</strong></span>
          <span>6% of (Basic + DA)</span>
        </li>
        <li className="flex justify-between border-t-2 pt-2 mt-2">
          <span><strong>Total Monthly Contribution:</strong></span>
          <span><strong>12% of (Basic + DA)</strong></span>
        </li>
      </ul>
    </div>

    <p className="mt-4">
      <strong>Important:</strong> Only your 6% is deducted from your salary. The employer's 6% is a pure additional benefit and doesn't come from your pocket.
    </p>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Interest Calculation</h4>
    <p className="text-sm">
      Every year (usually on March 31), the government credits <strong>interest</strong> to your GPF account. This interest is calculated on the balance on March 31 of that year.
    </p>
    <div className="bg-blue-50 border border-blue-300 p-4 rounded mt-3">
      <p className="font-semibold text-gray-800 text-sm">Interest Rate Details:</p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li><strong>Current Interest Rate (Jan 2026):</strong> 8.25% per annum</li>
        <li><strong>Review Frequency:</strong> Reviewed and declared quarterly by Ministry of Finance</li>
        <li><strong>Tax Status:</strong> All interest earned is <strong>completely tax-free</strong></li>
        <li><strong>Compounding:</strong> Interest is calculated on opening balance + contributions during year + previous interest</li>
      </ul>
    </div>
  </div>

  {/* Section 4: GPF Contribution Examples */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      4. GPF Contribution Calculations - Real Examples
    </h3>

    <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded mt-4">
      <h4 className="font-semibold text-gray-800 mb-3">Example 1: Entry-Level Government Employee</h4>
      <p className="text-sm"><strong>Situation:</strong> You just joined as Level 1 employee with Basic Pay ₹21,000 and DA = 50%.</p>
      
      <p className="text-sm mt-3"><strong>Monthly Calculation:</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Basic Pay = ₹21,000</li>
        <li>DA = 50% of ₹21,000 = ₹10,500</li>
        <li>Basic + DA = ₹31,500</li>
        <li><strong>Employee GPF (6%):</strong> ₹1,890/month (deducted from your salary)</li>
        <li><strong>Employer GPF (6%):</strong> ₹1,890/month (additional benefit)</li>
        <li><strong>Total Monthly GPF:</strong> ₹3,780/month = ₹45,360/year</li>
      </ul>
      
      <p className="text-sm mt-3"><strong>After 35 years service (to retirement at age 60):</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Simple contributions (ignoring interest): ~₹16 lakh</li>
        <li>With 8.25% annual compound interest + salary increases: <strong>Estimated GPF at retirement: ₹50-60 lakh</strong></li>
      </ul>
    </div>

    <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded mt-4">
      <h4 className="font-semibold text-gray-800 mb-3">Example 2: Mid-Level Government Employee</h4>
      <p className="text-sm"><strong>Situation:</strong> You are a Level 8 employee with Basic Pay ₹75,000 and DA = 50%.</p>
      
      <p className="text-sm mt-3"><strong>Monthly Calculation:</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Basic Pay = ₹75,000</li>
        <li>DA = 50% of ₹75,000 = ₹37,500</li>
        <li>Basic + DA = ₹1,12,500</li>
        <li><strong>Employee GPF (6%):</strong> ₹6,750/month</li>
        <li><strong>Employer GPF (6%):</strong> ₹6,750/month</li>
        <li><strong>Total Monthly GPF:</strong> ₹13,500/month = ₹1,62,000/year</li>
      </ul>
      
      <p className="text-sm mt-3"><strong>After 25 years of remaining service:</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Simple contributions: ~₹40.5 lakh (excluding increases)</li>
        <li>With 8.25% interest + salary increases + employer contribution: <strong>Estimated GPF: ₹1.2-1.5 crore</strong></li>
      </ul>
    </div>

    <div className="bg-orange-50 border-l-4 border-orange-600 p-5 rounded mt-4">
      <h4 className="font-semibold text-gray-800 mb-3">Example 3: Interest Compounding Benefit</h4>
      <p className="text-sm"><strong>Scenario:</strong> You have ₹10 lakh GPF balance at the start of FY 2026.</p>
      
      <p className="text-sm mt-3"><strong>Annual Interest Calculation (at 8.25% p.a.):</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Opening Balance: ₹10,00,000</li>
        <li>Interest for FY 2026 (8.25%): ₹82,500</li>
        <li>Closing Balance: ₹10,82,500</li>
        <li><strong>Next year, interest is calculated on ₹10,82,500, not ₹10 lakh (compounding effect)</strong></li>
      </ul>

      <p className="text-sm mt-3"><strong>After 10 years (with 8.25% annual interest):</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Your ₹10 lakh grows to: <strong>₹22.2 lakh</strong> (interest earned: ₹12.2 lakh, all tax-free)</li>
        <li>This is pure guaranteed return, no market risk!</li>
      </ul>
    </div>
  </div>

  {/* Section 5: GPF Withdrawal Rules */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      5. GPF Withdrawal Rules and Limits
    </h3>
    <p>
      GPF offers flexibility to withdraw your balance for various life needs. Here are the rules:
    </p>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Partial Withdrawals (Before Retirement)</h4>
    <table className="w-full border-collapse border border-gray-300 text-sm mt-4">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="border border-gray-300 p-3 text-left">Purpose</th>
          <th className="border border-gray-300 p-3">Maximum Limit</th>
          <th className="border border-gray-300 p-3">Service Required</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-blue-50">
          <td className="border border-gray-300 p-3">Emergency (Medical, Accident)</td>
          <td className="border border-gray-300 p-3">50% of balance or ₹50,000 (whichever is lower)</td>
          <td className="border border-gray-300 p-3">1 year</td>
        </tr>
        <tr className="hover:bg-green-50">
          <td className="border border-gray-300 p-3">Housing Loan (Down Payment)</td>
          <td className="border border-gray-300 p-3">Up to 90% of balance</td>
          <td className="border border-gray-300 p-3">7 years</td>
        </tr>
        <tr className="hover:bg-yellow-50">
          <td className="border border-gray-300 p-3">Higher Education (Self/Children)</td>
          <td className="border border-gray-300 p-3">Entire balance for education expenses</td>
          <td className="border border-gray-300 p-3">1 year</td>
        </tr>
        <tr className="hover:bg-purple-50">
          <td className="border border-gray-300 p-3">Marriage (Self or Family)</td>
          <td className="border border-gray-300 p-3">50% of balance or ₹2 lakh (whichever is lower)</td>
          <td className="border border-gray-300 p-3">7 years</td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-3">Serious Illness</td>
          <td className="border border-gray-300 p-3">50% of balance</td>
          <td className="border border-gray-300 p-3">7 years</td>
        </tr>
      </tbody>
    </table>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Full Withdrawal (At Retirement or Separation)</h4>
    <p className="text-sm">
      When you retire or leave government service, your <strong>entire GPF balance is paid as a lump sum</strong>, which is <strong>100% tax-free</strong>. This is a major benefit of GPF.
    </p>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Loan Against GPF</h4>
    <div className="bg-blue-50 border border-blue-300 p-4 rounded mt-3">
      <p className="text-sm">
        You can take a <strong>loan against your GPF balance</strong> for any purpose without deducting from your balance. The loan amount is <strong>not deducted</strong>; instead, a separate account is created.
      </p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li><strong>Loan Amount:</strong> Up to 50% of balance or last 12 months salary, whichever is lower</li>
        <li><strong>Interest:</strong> 8.25% per annum (same as GPF interest rate)</li>
        <li><strong>Repayment:</strong> Usually 24-48 months, deducted from salary</li>
        <li><strong>Benefit:</strong> Your GPF balance continues to earn interest even while you repay the loan</li>
      </ul>
    </div>
  </div>

  {/* Section 6: GPF Interest Rate History and Trends */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      6. GPF Interest Rates: Historical Trends and Outlook
    </h3>
    <p>
      The GPF interest rate is revised quarterly by the Government of India. Here's the recent history:
    </p>

    <table className="w-full border-collapse border border-gray-300 text-sm mt-4">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="border border-gray-300 p-3 text-left">Quarter</th>
          <th className="border border-gray-300 p-3">Interest Rate</th>
          <th className="border border-gray-300 p-3">Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-blue-50">
          <td className="border border-gray-300 p-3">Q1 2025-26 (Jul-Sep 2025)</td>
          <td className="border border-gray-300 p-3 text-center">8.25%</td>
          <td className="border border-gray-300 p-3 text-sm">Current rate, stable</td>
        </tr>
        <tr className="hover:bg-green-50">
          <td className="border border-gray-300 p-3">Q4 2024-25 (Apr-Jun 2025)</td>
          <td className="border border-gray-300 p-3 text-center">8.25%</td>
          <td className="border border-gray-300 p-3 text-sm">Maintained same rate</td>
        </tr>
        <tr className="hover:bg-yellow-50">
          <td className="border border-gray-300 p-3">Q3 2024-25 (Jan-Mar 2025)</td>
          <td className="border border-gray-300 p-3 text-center">8.25%</td>
          <td className="border border-gray-300 p-3 text-sm">Revised upward from 8.2%</td>
        </tr>
        <tr className="hover:bg-purple-50">
          <td className="border border-gray-300 p-3">Previous Years (2023-24)</td>
          <td className="border border-gray-300 p-3 text-center">8.0-8.15%</td>
          <td className="border border-gray-300 p-3 text-sm">Gradually increasing trend</td>
        </tr>
      </tbody>
    </table>

    <p className="mt-4 text-sm text-gray-600">
      <strong>Outlook:</strong> Interest rates typically track government securities yields. With inflation management focus, rates may remain in 8-8.5% range.
    </p>
  </div>

  {/* Section 7: GPF Tax Benefits */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      7. Tax Benefits and Advantages of GPF
    </h3>
    <p>
      GPF offers exceptional tax efficiency, making it one of the best retirement instruments in India:
    </p>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Tax-Free Components</h4>
    <ul className="space-y-3 text-sm">
      <li className="border-l-4 border-green-500 pl-4">
        <strong>Interest Earned:</strong> All interest credited to your GPF account is <strong>completely tax-free</strong>. You don't report it in your ITR.
      </li>
      <li className="border-l-4 border-green-500 pl-4">
        <strong>Lump Sum at Retirement:</strong> When you retire, your entire GPF balance is <strong>100% tax-free</strong> (unlike NPS where only 40% is tax-free via annuity).
      </li>
      <li className="border-l-4 border-green-500 pl-4">
        <strong>Partial Withdrawals:</strong> Any amount you withdraw for permitted purposes is <strong>tax-free</strong>.
      </li>
      <li className="border-l-4 border-green-500 pl-4">
        <strong>No 80C Limit:</strong> Your 6% GPF contribution is <strong>deducted before calculating income tax</strong>, so it doesn't count against the ₹1.5 lakh 80C limit.
      </li>
    </ul>

    <div className="bg-green-100 border border-green-400 p-4 rounded mt-4">
      <p className="font-semibold text-gray-800 text-sm">✓ Tax Benefit Comparison Example:</p>
      <p className="text-sm text-gray-700 mt-2">
        You receive ₹1 crore GPF at retirement. <br/>
        <strong>Tax Status:</strong> ₹0 tax (100% tax-free)<br/>
        <strong>vs NPS:</strong> If you get ₹1 crore NPS, you must buy ₹40 lakh annuity (generates taxable pension). Only ₹60 lakh is tax-free lump sum.<br/>
        <strong>GPF Advantage:</strong> ₹1 crore completely tax-free, no annuity requirement.
      </p>
    </div>
  </div>

  {/* Section 8: GPF vs NPS - Which is Better? */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      8. GPF vs NPS: A Detailed Comparison for Government Employees
    </h3>
    <p>
      Government employees often ask: "Should I prioritize GPF or NPS?" Here's a detailed comparison:
    </p>

    <table className="w-full border-collapse border border-gray-300 text-sm mt-4">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="border border-gray-300 p-3 text-left">Feature</th>
          <th className="border border-gray-300 p-3">GPF</th>
          <th className="border border-gray-300 p-3">NPS</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-blue-50">
          <td className="border border-gray-300 p-3 font-semibold">Contribution Rate</td>
          <td className="border border-gray-300 p-3">12% total (6% employee + 6% employer)</td>
          <td className="border border-gray-300 p-3">24% total (10% employee + 14% employer)</td>
        </tr>
        <tr className="hover:bg-green-50">
          <td className="border border-gray-300 p-3 font-semibold">Interest/Returns</td>
          <td className="border border-gray-300 p-3">8-8.5% guaranteed annually</td>
          <td className="border border-gray-300 p-3">7-12% depending on fund choice (market-linked)</td>
        </tr>
        <tr className="hover:bg-yellow-50">
          <td className="border border-gray-300 p-3 font-semibold">Risk</td>
          <td className="border border-gray-300 p-3">Zero. Government guaranteed.</td>
          <td className="border border-gray-300 p-3">Market-linked. Returns vary yearly.</td>
        </tr>
        <tr className="hover:bg-purple-50">
          <td className="border border-gray-300 p-3 font-semibold">Lump Sum at Retirement</td>
          <td className="border border-gray-300 p-3">100% tax-free, no conditions</td>
          <td className="border border-gray-300 p-3">Only 60% tax-free; 40% must buy annuity</td>
        </tr>
        <tr className="hover:bg-blue-50">
          <td className="border border-gray-300 p-3 font-semibold">Flexibility</td>
          <td className="border border-gray-300 p-3">Partial withdrawals allowed for specific purposes</td>
          <td className="border border-gray-300 p-3">Tier-1 locked until 60; Tier-2 flexible</td>
        </tr>
        <tr className="hover:bg-green-50">
          <td className="border border-gray-300 p-3 font-semibold">Lock-in</td>
          <td className="border border-gray-300 p-3">No lock-in after 1 year for partial withdrawal</td>
          <td className="border border-gray-300 p-3">Tier-1: Until 60; Tier-2: After 1 year</td>
        </tr>
        <tr className="hover:bg-yellow-50">
          <td className="border border-gray-300 p-3 font-semibold">Total Estimated Corpus (35 yrs, ₹75k Basic)</td>
          <td className="border border-gray-300 p-3">~₹1.2 crore</td>
          <td className="border border-gray-300 p-3">~₹2.5-3 crore (if 10%+ returns)</td>
        </tr>
      </tbody>
    </table>

    <p className="mt-4 text-sm text-gray-600">
      <strong>Best Strategy:</strong> Maximize BOTH! GPF provides stable base (12%) + NPS provides growth (24%). Together they form a powerful retirement corpus.
    </p>
  </div>

  {/* Section 9: FAQ */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      9. Frequently Asked Questions About GPF
    </h3>

    <div className="space-y-4">
      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: Can I increase my GPF contribution above 6%?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: The mandatory 6% cannot be increased. However, you can make <strong>voluntary deposits</strong> to your GPF account anytime. These deposits also earn the same 8.25% interest, making it an excellent tax-free savings vehicle.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: What happens to my GPF if I leave government service?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Your entire GPF balance is paid as a lump sum (tax-free) within 30 days of retirement/separation. If you resign before completing 5 years, you may face some deductions. If you complete 5+ years, full balance is paid with all interest.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: Is GPF interest added every month or once a year?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Interest is calculated and credited <strong>once a year on March 31</strong> (end of financial year). It's calculated on the balance on that date. From April 1, the interest starts compounding on the new balance.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: Can I take a loan against my GPF and still earn interest?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: <strong>Yes!</strong> This is a major benefit of GPF. When you take a loan, your GPF balance remains intact and continues to earn interest at 8.25% p.a. You also pay interest on the loan (same 8.25% rate). So interest earned = interest paid (neutral), but your balance is untouched.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: How much GPF can I withdraw for buying a house?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: You can withdraw <strong>up to 90% of your GPF balance</strong> to finance a house purchase (down payment or full amount). This requires you to have completed 7 years of service. Documentation of property purchase is required.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: Is there a family pension or nomination facility in GPF?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Yes. You can nominate family members who will receive your GPF balance if you pass away before retirement. The balance is paid directly to the nominated person(s), fully tax-free.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800">Q: How does GPF impact my tax calculation in ITR?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Your 6% GPF contribution is <strong>deducted before calculating taxable income</strong>. Interest earned is not included in income. So if your gross salary is ₹1 lakh, after 6% GPF deduction, your taxable salary is ₹94,000. No tax on interest or withdrawals.
        </p>
      </div>
    </div>
  </div>

  {/* Section 10: Using the PF Calculator */}
  <div className="bg-blue-100 border-l-4 border-blue-600 p-5 rounded mt-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-3">
      10. How to Use the PF Calculator
    </h3>
    <p className="text-sm">
      To calculate your projected GPF balance at retirement:
    </p>
    <ol className="list-decimal pl-8 space-y-2 mt-3 text-sm">
      <li><strong>Enter Basic Pay:</strong> Your current monthly basic salary from your payslip.</li>
      <li><strong>Enter DA %:</strong> Current dearness allowance percentage (currently 50% as of Jan 2026).</li>
      <li><strong>Enter Current Age & Retirement Age:</strong> Usually 60 for government employees.</li>
      <li><strong>Enter Interest Rate:</strong> Current GPF rate is 8.25% (reviewed quarterly; updates available on our site).</li>
      <li><strong>View Results:</strong> See your projected GPF balance at retirement, annual contributions, and total interest earned (tax-free).</li>
    </ol>
    <p className="text-sm mt-4">
      The calculator accounts for salary increases (estimated at 4-5% annually with DA hikes) and compound interest to give realistic projections.
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
      <a href="/nps-calculator" className="text-blue-600 hover:underline font-medium text-sm">
        → NPS Calculator
      </a>
      <a href="/income-tax-calculator" className="text-blue-600 hover:underline font-medium text-sm">
        → Income Tax Calculator
      </a>
      <a href="/Salaryhandbook/pf" className="text-blue-600 hover:underline font-medium text-sm">
        → PF Handbook Guide
      </a>
    </div>
  </div>

  {/* Disclaimer */}
  <div className="bg-gray-100 p-5 rounded mt-8 text-sm text-gray-600 border border-gray-300">
    <h4 className="font-semibold text-gray-800 mb-2">Disclaimer & Data Sources</h4>
    <p>
      This guide is based on <strong>General Provident Fund (GPF) rules, EPFO guidelines, and Government of India notifications</strong> as of January 2026. Interest rates are subject to quarterly revision by the Ministry of Finance. GPF calculations are projections based on current interest rates and salary assumptions. For official confirmation on withdrawal limits, tax treatment, or specific cases, consult your HR department, Accounts Office, or a qualified tax professional.
    </p>
  </div>

</section>
      </main>
    </div>
  );
}