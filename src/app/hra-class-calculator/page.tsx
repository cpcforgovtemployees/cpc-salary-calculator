"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { calculateHRA, formatCurrency } from "@/lib/salary-calculator";
import { HRA_RATES } from "@/lib/constants";

// ------------------ City → Class Mapping ------------------
const cityClassMap: Record<string, "X" | "Y" | "Z"> = {
  Delhi: "X", Mumbai: "X", Chennai: "X", Kolkata: "X", Hyderabad: "X", Bengaluru: "X",
  Ahmedabad: "Y", Pune: "Y", Jaipur: "Y", Lucknow: "Y", Chandigarh: "Y", Indore: "Y",
  Bhopal: "Y", Patna: "Y", Nagpur: "Y", Kochi: "Y", Coimbatore: "Y", Vadodara: "Y",
  Visakhapatnam: "Y", Raipur: "Y",
};

export default function HRAClassCalculator() {
  const [selectedCity, setSelectedCity] = useState("");
  const [basicPay, setBasicPay] = useState<number | "">("");
  const [result, setResult] = useState<{
    hraClass: string;
    hraPercent: number;
    hraAmount: number | null;
  } | null>(null);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (!city) return setResult(null);

    const cityClass = cityClassMap[city] || "Other";
    const hraRate = HRA_RATES[cityClass] ?? 0.1;
    setResult({
      hraClass: cityClass,
      hraPercent: hraRate * 100,
      hraAmount: null,
    });
  };

  const handleBasicPayChange = (value: string) => {
    setBasicPay(value === "" ? "" : Number(value));
    setResult((prev) => (prev ? { ...prev, hraAmount: null } : null));
  };

  const handleCalculate = () => {
    if (!selectedCity) return alert("Please select a city first.");
    if (!basicPay) return alert("Please enter Basic Pay to calculate HRA amount.");

    const cityClass = result?.hraClass as "X" | "Y" | "Z" | "Other";
    const hraAmount = calculateHRA(Number(basicPay), cityClass);
    setResult((prev) => (prev ? { ...prev, hraAmount } : null));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* ✅ H1 - Main Title */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-500 bg-clip-text text-transparent mb-4 tracking-tight">
            HRA Class & Amount Calculator
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Find your <strong>HRA Class (X, Y, or Z)</strong> and calculate your <strong>House Rent Allowance</strong> instantly. 
            Perfect for <strong>Central</strong> and <strong>State Government employees</strong> under the 7th and 8th Pay Commission.
          </p>
        </div>

        {/* ✅ H2 - Section: How the HRA Class System Works */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-10">
          Understanding HRA Classes in India
        </h2>
        <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2 text-center">
          X, Y, and Z City Classification Explained
        </h3>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
          Cities in India are categorized into three HRA classes — <strong>X</strong>, <strong>Y</strong>, and <strong>Z</strong> — 
          based on population size and cost of living. <strong>X Class</strong> cities like Delhi, Mumbai, and Bengaluru have higher HRA rates 30%, 
          while <strong>Y Class</strong> cities such as Pune or Jaipur get 20%, and <strong>Z Class</strong> or other smaller cities receive 10%.These rates apply after DA has crossed 50% of basic pay.
        </p>

        {/* ✅ H2 - Section: Calculator */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-10">
          Calculate Your HRA Instantly
        </h2>

        <Card className="max-w-2xl mx-auto p-6 sm:p-8 border border-gray-200 rounded-xl shadow-sm bg-white space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* City Dropdown */}
            <div>
              <Label className="font-medium text-gray-700">Select City</Label>
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Choose City --</option>
                <optgroup label="X Class Cities">
                  {Object.entries(cityClassMap)
                    .filter(([_, cls]) => cls === "X")
                    .map(([city]) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                </optgroup>
                <optgroup label="Y Class Cities">
                  {Object.entries(cityClassMap)
                    .filter(([_, cls]) => cls === "Y")
                    .map(([city]) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                </optgroup>
                <option value="Other">Other City</option>
              </select>
            </div>

            {/* Basic Pay Input */}
            <div>
              <Label className="font-medium text-gray-700">Basic Pay (₹)</Label>
              <Input
                type="number"
                placeholder="Enter your Basic Pay"
                value={basicPay}
                onChange={(e) => handleBasicPayChange(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex justify-center mt-2">
            <button
              onClick={handleCalculate}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
            >
              Calculate HRA
            </button>
          </div>

          {result && (
            <div className="mt-6 bg-indigo-50 rounded-md p-5 shadow-sm border border-indigo-100">
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                City Classification Result
              </h3>
              <p className="text-center text-gray-700">
                Your city falls under:{" "}
                <strong className="text-indigo-700">
                  {result.hraClass === "Other" ? "Z / Other City" : `${result.hraClass} Class`}
                </strong>{" "}
                — HRA Rate: <strong>{result.hraPercent}%</strong>
              </p>
              {result.hraAmount !== null && (
                <p className="text-xl font-bold text-green-700 text-center mt-3">
                  HRA Amount: {formatCurrency(result.hraAmount)}
                </p>
              )}
            </div>
          )}
        </Card>

        {/* ✅ H2 - Section: HRA Policy Info */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-10">
          Latest HRA Rules & Government Policies
        </h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
          Under the <strong>7th Pay Commission</strong>, House Rent Allowance (HRA) rates are 24%, 16%, and 8% of basic pay for X, Y, and Z class cities respectively.  
          When the <strong>DA (Dearness Allowance)</strong> crosses 25%, the HRA rates are revised to 27%, 18%, and 9%, and when DA crosses 50%, they further increase to 30%, 20%, and 10%. 
          After implementation of the <strong>8th Pay Commission</strong>, HRA rates are expected to increase proportionally. 
          The Indian Pay Calculator ensures that all these updates are reflected in real-time for accuracy.
        </p>
      </main>
    </div>
  );
}