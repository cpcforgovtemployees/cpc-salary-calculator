"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { calculateHRA, formatCurrency } from "@/lib/salary-calculator";
import { HRA_RATES } from "@/lib/constants";

// ------------------ City → Class Mapping ------------------
const cityClassMap: Record<string, "X" | "Y" | "Z"> = {
  // X CLASS
  Delhi: "X",
  Mumbai: "X",
  Chennai: "X",
  Kolkata: "X",
  Hyderabad: "X",
  Bengaluru: "X",

  // Y CLASS
  Ahmedabad: "Y",
  Pune: "Y",
  Jaipur: "Y",
  Lucknow: "Y",
  Chandigarh: "Y",
  Indore: "Y",
  Bhopal: "Y",
  Patna: "Y",
  Nagpur: "Y",
  Kochi: "Y",
  Coimbatore: "Y",
  Vadodara: "Y",
  Visakhapatnam: "Y",
  Raipur: "Y",
};

export default function HRAClassCalculator() {
  const [selectedCity, setSelectedCity] = useState("");
  const [basicPay, setBasicPay] = useState<number | "">("");

  // result stores class, % and amount (amount is null until calculated)
  const [result, setResult] = useState<{
    hraClass: string;
    hraPercent: number;
    hraAmount: number | null;
  } | null>(null);

  // ------------------ Auto-update on City Selection ------------------
  const handleCityChange = (city: string) => {
    setSelectedCity(city);

    // If no city selected → clear result box
    if (!city) {
      setResult(null);
      return;
    }

    // Determine Class from mapping (default = "Other")
    const cityClass = cityClassMap[city] || "Other";
    const hraRate = HRA_RATES[cityClass] ?? 0.1;
    const hraPercent = hraRate * 100;

    // Reset HRA Amount when city changes
    setResult({
      hraClass: cityClass,
      hraPercent,
      hraAmount: null,
    });
  };

  // ------------------ Calculate HRA Amount ------------------
  const handleCalculate = () => {
    if (!selectedCity) {
      alert("Please select a city first.");
      return;
    }
    if (!basicPay) {
      alert("Please enter Basic Pay to calculate HRA amount.");
      return;
    }

    const cityClass = result?.hraClass || "Other";
    const hraAmount = calculateHRA(Number(basicPay), cityClass);

    // Add amount to existing result
    setResult((prev) =>
      prev
        ? {
            ...prev,
            hraAmount,
          }
        : null
    );
  };

  // ------------------ Reset Amount when Basic Pay changes ------------------
  const handleBasicPayChange = (value: string) => {
    setBasicPay(value === "" ? "" : Number(value));

    // Remove HRA Amount if already shown (to avoid stale values)
    setResult((prev) =>
      prev
        ? {
            ...prev,
            hraAmount: null,
          }
        : null
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-500 bg-clip-text text-transparent mb-4 tracking-tight">
            HRA Class & Amount Calculator
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Select your <strong>City</strong> to instantly view its{" "}
            <strong>HRA Class (X/Y/Z)</strong> & percentage.  
            Enter your <strong>Basic Pay</strong> to calculate exact HRA amount.
          </p>
        </div>

        {/* Calculator Card */}
        <Card className="max-w-2xl mx-auto p-6 sm:p-8 border border-gray-200 rounded-xl shadow-sm bg-white space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* City Dropdown */}
            <div>
              <Label className="font-medium text-gray-700">Select City</Label>
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                placeholder="Optional"
                value={basicPay}
                onChange={(e) => handleBasicPayChange(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Calculate Button (Only for Amount) */}
          <div className="flex justify-center mt-2">
            <button
              onClick={handleCalculate}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
            >
              Calculate HRA
            </button>
          </div>

          {/* Result Section (Animated) */}
          {result && (
            <div
              className="mt-6 bg-indigo-50 rounded-md p-5 shadow-sm border border-indigo-100 animate-[fadeInUp_0.3s_ease]"
            >
              {/* Display Class */}
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                 City Class:{" "}
                <span className="text-indigo-700 font-bold">
                  {result.hraClass === "Other"
                    ? "Other / Z Class City"
                    : `${result.hraClass} Class City`}
                </span>
              </h3>

              {/* Display % */}
              <p className="text-gray-700 text-center text-sm mb-2">
                HRA Percentage (as per CPC logic):{" "}
                <strong>{result.hraPercent}%</strong>
              </p>

              {/* If amount not calculated */}
              {result.hraAmount === null && (
                <p className="text-xs text-gray-600 text-center">
                  Enter Basic Pay to calculate the HRA amount.
                </p>
              )}

              {/* If amount calculated */}
              {result.hraAmount !== null && (
                <p className="text-xl font-bold text-green-700 text-center">
                  HRA Amount: {formatCurrency(result.hraAmount)}
                </p>
              )}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
