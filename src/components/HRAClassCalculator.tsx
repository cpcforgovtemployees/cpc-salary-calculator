"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { calculateHRA, formatCurrency } from "@/lib/salary-calculator";
import { HRA_RATES } from "@/lib/constants";

// City → Class mapping for dropdown classification
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
        {/* H1 Title */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-500 bg-clip-text text-transparent mb-4 tracking-tight">
            HRA Class & Amount Calculator
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Find your <strong>HRA Class (X, Y, or Z)</strong> and calculate your <strong>House Rent Allowance</strong> instantly.
            Perfect for <strong>Central</strong> and <strong>State Government employees</strong> under the 7th and 8th Pay Commission.
          </p>
        </div>

        {/* H2 - HRA System */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-10">
          Understanding HRA Classes in India
        </h2>
        <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2 text-center">
          X, Y, and Z City Classification Explained
        </h3>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
          Cities in India are categorized into three HRA classes — <strong>X</strong>, <strong>Y</strong>, and <strong>Z</strong> —
          based on population size and cost of living. <strong>X Class</strong> cities like Delhi, Mumbai, and Bengaluru have higher HRA rates 30%,
          while <strong>Y Class</strong> cities such as Pune or Jaipur get 20%, and <strong>Z Class</strong> or other smaller cities receive 10%. These rates apply after DA has crossed 50% of basic pay.
        </p>

        {/* H2 - Calculator */}
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

        {/* HRA Class Calculator - Complete Educational Section */}
<section className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
  
  {/* Main Heading */}
  <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4 text-center">
    Complete HRA Calculator Guide: City Classes, Rates & 7th/8th Pay Commission
  </h2>

  {/* Introduction */}
  <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded">
    <p className="text-gray-800 font-medium">
      House Rent Allowance (HRA) is one of the largest allowances for government employees. Understanding which city class you fall under and how DA changes affect your HRA is crucial for accurate salary planning. This guide explains everything about HRA classification, slab changes, and provides tools to calculate your exact HRA.
    </p>
  </div>

  {/* Section 1: What is HRA? */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      1. What is House Rent Allowance (HRA)?
    </h3>
    <p>
      House Rent Allowance (HRA) is a component of government employee salary designed to help employees meet housing expenses. Unlike private sectors where HRA depends on actual rent paid, <strong>government HRA is a fixed percentage of Basic Pay</strong> determined by your city classification.
    </p>
    <p className="mt-4">
      <strong>Key facts about HRA:</strong>
    </p>
    <ul className="list-disc pl-8 space-y-2 mt-3">
      <li>HRA is <strong>non-taxable</strong> if you pay rent (actual rent paid must be ≥ 10% of salary).</li>
      <li>HRA is a percentage of your <strong>Basic Pay only</strong> (not including other allowances).</li>
      <li>HRA percentage depends on your <strong>city classification (X, Y, or Z)</strong>.</li>
      <li>HRA increases when <strong>Dearness Allowance (DA) crosses certain thresholds</strong>.</li>
      <li>HRA is paid whether you live in government accommodation or private rental.</li>
    </ul>
  </div>

  {/* Section 2: City Classification Explained */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      2. Understanding City Classifications (X, Y, Z)
    </h3>
    <p>
      All cities in India are categorized into three classes for HRA purposes: <strong>X (Metro), Y (Large City), and Z (Small City)</strong>. This classification was finalized by the <strong>7th Pay Commission</strong> and applies to all government employees across Central and State governments. 
    </p>

    <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">X Class Cities (Metros)</h4>
    <p>
      These are the largest metropolitan areas in India with the highest cost of living.
    </p>
    <ul className="list-disc pl-8 space-y-2 mt-2 text-sm">
      <li><strong>Delhi</strong> – National capital</li>
      <li><strong>Mumbai</strong> – Financial capital, Bombay</li>
      <li><strong>Bangalore</strong> – Tech hub, Karnataka</li>
      <li><strong>Hyderabad</strong> – HITEC City, Telangana</li>
      <li><strong>Chennai</strong> – South India hub, Tamil Nadu</li>
      <li><strong>Kolkata</strong> – Eastern India hub, West Bengal</li>
    </ul>
    <p className="text-gray-600 text-sm mt-3">
      <strong>HRA for X-class (7th CPC):</strong> 24% → 27% (when DA ≥ 25%) → 30% (when DA ≥ 50%)
    </p>

    <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Y Class Cities (Large Cities)</h4>
    <p>
      These are major state capitals and large urban centers with moderate-to-high cost of living.
    </p>
    <ul className="list-disc pl-8 space-y-2 mt-2 text-sm">
      <li><strong>Pune, Ahmedabad, Jaipur</strong> – State capitals</li>
      <li><strong>Lucknow, Indore, Surat</strong> – Major urban centers</li>
      <li><strong>Chandigarh, Bhopal, Patna</strong> – Union Territories & capitals</li>
      <li><strong>Cochin, Visakhapatnam</strong> – Other major cities</li>
      <li>Any city with population &gt;10 lakh (1 million+)</li>
    </ul>
    <p className="text-gray-600 text-sm mt-3">
      <strong>HRA for Y-class (7th CPC):</strong> 16% → 18% (when DA ≥ 25%) → 20% (when DA ≥ 50%)
    </p>

    <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Z Class Cities (Small Cities)</h4>
    <p>
      These are smaller towns and rural postings with lower cost of living.
    </p>
    <ul className="list-disc pl-8 space-y-2 mt-2 text-sm">
      <li><strong>District headquarters</strong> with smaller populations</li>
      <li><strong>Tier-3 and Tier-4 cities</strong></li>
      <li>Cities and towns with population &lt;5 lakh</li>
      <li>Remote postings and cantonment areas</li>
    </ul>
    <p className="text-gray-600 text-sm mt-3">
      <strong>HRA for Z-class (7th CPC):</strong> 8% → 9% (when DA ≥ 25%) → 10% (when DA ≥ 50%)
    </p>

    {/* City Classification Table */}
    <div className="overflow-x-auto mt-6">
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="border border-gray-300 p-3 text-left">City Class</th>
            <th className="border border-gray-300 p-3">HRA (Base)</th>
            <th className="border border-gray-300 p-3">HRA (DA ≥ 25%)</th>
            <th className="border border-gray-300 p-3">HRA (DA ≥ 50%)</th>
            <th className="border border-gray-300 p-3">Examples</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-blue-50">
            <td className="border border-gray-300 p-3 font-semibold">X (Metro)</td>
            <td className="border border-gray-300 p-3 text-center">24%</td>
            <td className="border border-gray-300 p-3 text-center">27%</td>
            <td className="border border-gray-300 p-3 text-center">30%</td>
            <td className="border border-gray-300 p-3 text-sm">Delhi, Mumbai, Bangalore</td>
          </tr>
          <tr className="hover:bg-green-50">
            <td className="border border-gray-300 p-3 font-semibold">Y (Large)</td>
            <td className="border border-gray-300 p-3 text-center">16%</td>
            <td className="border border-gray-300 p-3 text-center">18%</td>
            <td className="border border-gray-300 p-3 text-center">20%</td>
            <td className="border border-gray-300 p-3 text-sm">Pune, Jaipur, Lucknow</td>
          </tr>
          <tr className="hover:bg-yellow-50">
            <td className="border border-gray-300 p-3 font-semibold">Z (Small)</td>
            <td className="border border-gray-300 p-3 text-center">8%</td>
            <td className="border border-gray-300 p-3 text-center">9%</td>
            <td className="border border-gray-300 p-3 text-center">10%</td>
            <td className="border border-gray-300 p-3 text-sm">District towns, Remote</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  {/* Section 3: HRA Slab Changes with DA */}
  <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded mt-8">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
      3. How DA Affects Your HRA Slab
    </h3>
    <p>
      HRA is not static. As Dearness Allowance (DA) increases, your HRA percentage also increases in steps. This is called <strong>"HRA slab advancement"</strong>.
    </p>
    
    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">HRA Advancement Rules (7th CPC)</h4>
    <ul className="space-y-3 mt-3">
      <li className="border-l-4 border-blue-500 pl-4">
        <strong>Base Slab (DA &lt; 25%):</strong> 24% / 16% / 8% for X/Y/Z
      </li>
      <li className="border-l-4 border-green-500 pl-4">
        <strong>First Slab (DA ≥ 25%):</strong> 27% / 18% / 9% for X/Y/Z<br/>
        <span className="text-sm text-gray-600">When DA hits 25%, HRA increases by 3 percentage points</span>
      </li>
      <li className="border-l-4 border-orange-500 pl-4">
        <strong>Second Slab (DA ≥ 50%):</strong> 30% / 20% / 10% for X/Y/Z<br/>
        <span className="text-sm text-gray-600">When DA hits 50%, HRA increases by another 3 percentage points</span>
      </li>
    </ul>

    <div className="bg-yellow-100 border border-yellow-400 rounded p-4 mt-5">
      <p className="font-semibold text-gray-800">⚠️ Important Note (January 2026):</p>
      <p className="text-gray-700 text-sm mt-2">
        As of January 2026, DA has reached <strong>50%</strong> for Central Government employees. This means all employees are currently in the <strong>Second Slab (30% / 20% / 10%)</strong> for HRA across X/Y/Z cities.
      </p>
    </div>
  </div>

  {/* Section 4: Real Examples */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      4. Worked Examples: HRA Calculation for Different Scenarios
    </h3>

    <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded mt-4">
      <h4 className="font-semibold text-gray-800 mb-3">Example 1: X-Class City (Metro) Employee</h4>
      <p className="text-sm"><strong>Situation:</strong> You are a Level 7 employee posted in Mumbai (X-class) with Basic Pay ₹80,000. Current DA = 50%.</p>
      
      <p className="text-sm mt-3"><strong>Calculation:</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Basic Pay = ₹80,000</li>
        <li>Current DA = 50% (so you're in the 2nd HRA slab)</li>
        <li>HRA for X-class at DA ≥ 50% = <strong>30%</strong></li>
        <li>Monthly HRA = 30% × ₹80,000 = <strong>₹24,000</strong></li>
      </ul>
      
      <p className="text-sm mt-3"><strong>Note:</strong> If DA was 40% (at 1st slab), your HRA would be 27% = ₹21,600. So you gained ₹2,400/month when DA crossed 50%.</p>
    </div>

    <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded mt-4">
      <h4 className="font-semibold text-gray-800 mb-3">Example 2: Y-Class City Employee (State Capital)</h4>
      <p className="text-sm"><strong>Situation:</strong> You work in Pune (Y-class) as a Level 5 employee with Basic Pay ₹65,000. Current DA = 50%.</p>
      
      <p className="text-sm mt-3"><strong>Calculation:</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>Basic Pay = ₹65,000</li>
        <li>Current DA = 50% (2nd HRA slab active)</li>
        <li>HRA for Y-class at DA ≥ 50% = <strong>20%</strong></li>
        <li>Monthly HRA = 20% × ₹65,000 = <strong>₹13,000</strong></li>
      </ul>
      
      <p className="text-sm mt-3"><strong>Comparison:</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>If same employee posted in X-class: HRA = 30% = ₹19,500 (₹6,500 more)</li>
        <li>If same employee posted in Z-class: HRA = 10% = ₹6,500 (₹6,500 less)</li>
      </ul>
    </div>

    <div className="bg-orange-50 border-l-4 border-orange-600 p-5 rounded mt-4">
      <h4 className="font-semibold text-gray-800 mb-3">Example 3: Tracking HRA Change During DA Hike</h4>
      <p className="text-sm"><strong>Situation:</strong> You are posted in Delhi (X-class) with Basic Pay ₹90,000. You experience a DA hike from 46% to 50%.</p>
      
      <p className="text-sm mt-3"><strong>Before DA hike (DA = 46%, still in 1st slab):</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>HRA = 27% × ₹90,000 = ₹24,300/month</li>
      </ul>

      <p className="text-sm mt-3"><strong>After DA hike (DA = 50%, now in 2nd slab):</strong></p>
      <ul className="list-disc pl-8 text-sm space-y-1 mt-2">
        <li>HRA = 30% × ₹90,000 = ₹27,000/month</li>
        <li><strong>HRA increase = ₹2,700/month</strong></li>
      </ul>

      <p className="text-sm mt-3"><strong>Annual impact:</strong> ₹2,700 × 12 = ₹32,400 extra per year!</p>
    </div>
  </div>

  {/* Section 5: HRA Tax Treatment */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      5. HRA Tax Treatment & Exemption Rules
    </h3>
    <p>
      One of the biggest advantages of HRA for government employees is that <strong>it can be partially or fully tax-exempt</strong> under certain conditions.
    </p>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">HRA Exemption Formula</h4>
    <p className="text-sm font-mono bg-gray-100 p-3 rounded mt-3 text-center">
      HRA Exemption = Minimum of:<br/>
      (1) HRA actually received, OR<br/>
      (2) 50% of salary (if in metro), 40% (if in non-metro), OR<br/>
      (3) Actual rent paid minus 10% of salary
    </p>

    <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Conditions for HRA Exemption</h4>
    <ul className="list-disc pl-8 space-y-2 mt-3 text-sm">
      ✅ <li><strong>You must be paying rent:</strong> Rent paid must be &gt; 10% of your salary.</li>
      <li><strong>Metro vs Non-Metro:</strong> Metro areas get 50% exemption limit; non-metro gets 40%.</li>
      <li><strong>No government accommodation:</strong> HRA is only exempt if you live in private rental (not in govt house/colony).</li>
      <li><strong>Rent agreement required:</strong> Have a valid rent agreement showing landlord name and rent amount.</li>
    </ul>

    <div className="bg-green-100 border border-green-400 p-4 rounded mt-4">
      <p className="font-semibold text-gray-800 text-sm">✓ Quick Example:</p>
      <p className="text-sm text-gray-700 mt-2">
        You receive ₹24,000 HRA, your salary is ₹90,000, and you pay ₹15,000 rent in Delhi (metro). 
        Your HRA exemption = minimum of (₹24,000, ₹45,000 [50% of salary], ₹15,000 - ₹9,000 [10% of salary]) = <strong>₹6,000</strong>. 
        This ₹6,000 is tax-free; the remaining ₹18,000 HRA is taxable.
      </p>
    </div>
  </div>

  {/* Section 6: 8th Pay Commission Impact */}
  <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded mt-8">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
      6. 8th Pay Commission: Expected Changes to HRA
    </h3>
    <p>
      The 8th Pay Commission is expected to be implemented in 2026-27. Here's what we anticipate for HRA:
    </p>

    <ul className="space-y-3 mt-4">
      <li className="border-l-4 border-red-500 pl-4">
        <strong>HRA Percentage Increase:</strong> The base HRA percentages are likely to increase (e.g., from 24% to 28% for X-class, 16% to 19% for Y-class).
      </li>
      <li className="border-l-4 border-red-500 pl-4">
        <strong>DA Reset:</strong> When 8th CPC is implemented, DA will reset to near 0% and HRA will apply to a much higher Basic Pay due to fitment factor (~1.85–2.0x increase in Basic Pay).
      </li>
      <li className="border-l-4 border-red-500 pl-4">
        <strong>Overall Impact:</strong> Although HRA % may change, the <strong>absolute HRA amount will likely increase significantly</strong> due to higher Basic Pay post-fitment.
      </li>
      <li className="border-l-4 border-red-500 pl-4">
        <strong>Arrear Calculation:</strong> If 8th CPC is implemented mid-year, employees will receive HRA arrears for the period from effective date to notification date (similar to DA arrears).
      </li>
    </ul>

    <p className="mt-4 text-sm text-gray-600">
      Note: 8th CPC details are based on current expectations; actual rates will be confirmed by official government notification. Our calculator will be updated as soon as official details are released.
    </p>
  </div>

  {/* Section 7: FAQ */}
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      7. Frequently Asked Questions About HRA
    </h3>

    <div className="space-y-4">
      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: Which city class do I belong to?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: This is determined by your posting location. Check your posting order or ask your PAO office. If your city is in the metro list (Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata), it's X-class. Large state capitals are typically Y-class, and smaller towns are Z-class. Our calculator lets you select your city to find your class automatically.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: Can I get HRA if I own a house?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: You receive HRA as a component of salary regardless of property ownership. However, for <strong>tax exemption</strong>, HRA is only exempt if you pay rent (don't own the house). If you own, HRA becomes fully taxable.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: What if I get posted from X-class to Y-class city?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Your HRA will reduce immediately upon transfer. For example, from 30% (X-class, current DA slab) to 20% (Y-class, same DA slab). You don't get "arrear" for the reduction; the lower rate applies from the effective date of transfer.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: Does HRA increase when I get promoted?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: No. HRA percentage is fixed for your city class and doesn't change with promotion or pay increase. However, since HRA is a percentage of Basic Pay, a higher Basic Pay after promotion will result in higher absolute HRA amount. For example, if promoted and Basic Pay increases from ₹80,000 to ₹95,000, your HRA at 30% increases from ₹24,000 to ₹28,500.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: When will HRA increase again under current DA?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Currently (Jan 2026), DA is at 50%, so HRA is at its highest slab under 7th CPC (30%/20%/10% for X/Y/Z). HRA will remain at this level unless a new DA slab is introduced (unlikely under 7th CPC) or the 8th Pay Commission is implemented.
        </p>
      </div>

      <div className="border-b-2 border-gray-200 pb-4">
        <h4 className="font-semibold text-gray-800">Q: Is HRA included in my pension calculation?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Under 7th Pay Commission and NPS rules, HRA is <strong>not</strong> included in your pensionable salary. Only Basic Pay, DA, and certain allowances (like TA for some cases) are used for pension calculation. This is why your NPS contribution is based on Basic + DA, not on full salary including HRA.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800">Q: Can HRA decrease if DA falls?</h4>
        <p className="text-gray-700 text-sm mt-2">
          A: Theoretically yes, but DA has never decreased in government history. Even during economic downturns, DA either stays flat or increases. However, if 8th CPC resets DA to near 0%, HRA will revert to its base percentage for 8th CPC.
        </p>
      </div>
    </div>
  </div>

  {/* Section 8: Using Our Calculator */}
  <div className="bg-blue-100 border-l-4 border-blue-600 p-5 rounded mt-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-3">
      8. How to Use the HRA Class Calculator
    </h3>
    <p className="text-sm">
      To calculate your exact HRA for your city and current DA, simply:
    </p>
    <ol className="list-decimal pl-8 space-y-2 mt-3 text-sm">
      <li><strong>Select Your City Class:</strong> Choose X (Metro), Y (Large City), or Z (Small City).</li>
      <li><strong>Enter Your Basic Pay:</strong> Your monthly basic salary from your payslip.</li>
      <li><strong>Current DA:</strong> The calculator auto-fills based on latest DA (currently 50% as of Jan 2026).</li>
      <li><strong>View Result:</strong> Your HRA percentage and absolute amount are displayed instantly.</li>
    </ol>
    <p className="text-sm mt-4">
      The calculator also shows potential HRA after 8th Pay Commission based on expected fitment factors and rate changes.
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
      <a href="/nps-calculator" className="text-blue-600 hover:underline font-medium text-sm">
        → NPS Calculator
      </a>
      <a href="/income-tax-calculator" className="text-blue-600 hover:underline font-medium text-sm">
        → Income Tax Calculator
      </a>
      <a href="/Salaryhandbook/ta" className="text-blue-600 hover:underline font-medium text-sm">
        → Travel Allowance Guide
      </a>
    </div>
  </div>

  {/* Disclaimer */}
  <div className="bg-gray-100 p-5 rounded mt-8 text-sm text-gray-600 border border-gray-300">
    <h4 className="font-semibold text-gray-800 mb-2">Disclaimer & Data Sources</h4>
    <p>
      This guide is based on the <strong>7th Central Pay Commission Guidelines</strong>, official government notifications, and tax laws as of January 2026. HRA calculations are for informational purposes only. For official confirmation on your HRA classification and tax treatment, consult your Pay & Accounts Office (PAO) or a qualified tax professional.
    </p>
  </div>

</section>
      </main>
    </div>
  );
}