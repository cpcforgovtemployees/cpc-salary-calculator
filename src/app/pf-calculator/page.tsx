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

        {/* How to Use Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            How to Use the PF Calculator
          </h2>
          <p className="mb-4">Follow these steps to estimate your Provident Fund balance:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Enter your <strong>basic pay</strong> and select the PF contribution percentages.
            </li>
            <li>
              Provide your <strong>years of service</strong> to estimate long-term savings.
            </li>
            <li>
              The calculator will automatically include <strong>annual compound interest</strong> based on your
              chosen rate.
            </li>
            <li>
              View the total <strong>employee + employer contributions</strong> and{" "}
              <strong>maturity amount</strong>.
            </li>
          </ul>
          <p className="mt-4">
            This PF calculator is based on current <strong>EPFO rules (2026)</strong> and is ideal for Central
            and State Government employees.
          </p>
        </section>
      </main>
    </div>
  );
}