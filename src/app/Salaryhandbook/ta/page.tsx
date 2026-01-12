"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Car, Building, DollarSign, Users, Type, TrendingUp, HelpCircle } from "lucide-react";

export default function TransportAllowancePage() {
  return (
    <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Hero Section */}
        <header className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
            Transport Allowance (TA) Guide for Government Employees
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete Guide to TA Rates, City Classifications, DA on TA, and Tax Rules for 2026
          </p>
        </header>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🚗</div>
            <h3 className="font-semibold text-blue-900">7200 Max TA</h3>
            <p className="text-sm text-blue-700">Grade 9+ (monthly)</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🏙</div>
            <h3 className="font-semibold text-green-900">City-Based</h3>
            <p className="text-sm text-green-700">A1, A, B, C Classes</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-orange-900">Plus DA</h3>
            <p className="text-sm text-orange-700">Dearness Allowance</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">♿</div>
            <h3 className="font-semibold text-purple-900">3200 Exemption</h3>
            <p className="text-sm text-purple-700">Tax Exempt (PwD)</p>
          </div>
        </div>

        {/* TA Overview */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Car className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-semibold text-blue-700">What is Transport Allowance?</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Transport Allowance (TA) is a monthly allowance provided to central and state government employees to help cover daily commuting expenses between home and office. The amount depends on your pay level, city classification, and current Dearness Allowance (DA) rate. TA is a key component of take-home salary and is revised with each CPC and DA increase.
          </p>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-blue-900 mb-2">Key Points:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Varies by pay level and city classification</li>
              <li>Includes DA component (changes quarterly)</li>
              <li>Special exemptions for differently abled employees</li>
              <li>Taxable as salary (except for eligible PwD)</li>
            </ul>
          </div>
        </Card>

        {/* TA Rates by Pay Level */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-7 h-7 text-green-600" />
            <h2 className="text-2xl font-semibold text-green-700">TA Rates by Pay Level (2026)</h2>
          </div>
          <p className="text-gray-700">
            Rates depend on your pay level and city classification (A1/X for metropolitan, A/Y for large urban, B for urban, C/Z for other cities). DA is paid additionally on the base TA amount.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full table-auto text-gray-700 text-sm">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-4 py-3 text-left font-semibold">Pay Level</th>
                  <th className="border px-4 py-3 text-left font-semibold">TPTA Cities (A1/A/X)</th>
                  <th className="border px-4 py-3 text-left font-semibold">Other Cities (B/C/Y/Z)</th>
                  <th className="border px-4 py-3 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2 font-medium">9 and above</td>
                  <td className="border px-4 py-2">7200 + DA</td>
                  <td className="border px-4 py-2">3600 + DA</td>
                  <td className="border px-4 py-2">Highest TA grade</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2 font-medium">3 to 8</td>
                  <td className="border px-4 py-2">3600 + DA</td>
                  <td className="border px-4 py-2">1800 + DA</td>
                  <td className="border px-4 py-2">Mid-level employees</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2 font-medium">1-2 (24200 or above)</td>
                  <td className="border px-4 py-2">3600 + DA</td>
                  <td className="border px-4 py-2">1800 + DA</td>
                  <td className="border px-4 py-2">Higher entry level</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2 font-medium">1-2 (below 24200)</td>
                  <td className="border px-4 py-2">1350 + DA</td>
                  <td className="border px-4 py-2">900 + DA</td>
                  <td className="border px-4 py-2">Entry-level staff</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2 font-medium">Level 14+ (car waived)</td>
                  <td className="border px-4 py-2">15750</td>
                  <td className="border px-4 py-2">15750</td>
                  <td className="border px-4 py-2">No DA; fixed amount</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-green-900 mb-2">Important Note:</h4>
            <p className="text-sm text-gray-700">
              The base TA amount is fixed, but DA is added to it and changes quarterly. When DA increases, your total TA (Base + DA) increases automatically.
            </p>
          </div>
        </Card>

        {/* City Classifications */}
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 shadow-md rounded-xl p-6 border border-orange-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Building className="w-7 h-7 text-orange-600" />
            <h2 className="text-2xl font-semibold text-orange-700">City Classifications (A1, A, B, C)</h2>
          </div>
          <p className="text-gray-700">
            Your city classification determines your TA rate. Metropolitan cities (A1) get higher TA than other urban or rural areas. Classification is based on population, development, and government designation.
          </p>
          <div className="overflow-x-auto rounded-lg border border-orange-200">
            <table className="min-w-full table-auto text-gray-700 text-sm">
              <thead>
                <tr className="bg-orange-100">
                  <th className="border px-4 py-3 text-left font-semibold">Classification</th>
                  <th className="border px-4 py-3 text-left font-semibold">Type</th>
                  <th className="border px-4 py-3 text-left font-semibold">Example Cities</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-orange-50">
                  <td className="border px-4 py-2 font-semibold text-orange-700">A1 / X / TPTA</td>
                  <td className="border px-4 py-2">Metropolitan (Highest TA)</td>
                  <td className="border px-4 py-2">Delhi, Mumbai, Kolkata, Chennai, Hyderabad, Bangalore</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="border px-4 py-2 font-semibold text-orange-700">A / Y</td>
                  <td className="border px-4 py-2">Large Urban</td>
                  <td className="border px-4 py-2">Ahmedabad, Pune, Lucknow, Jaipur, Kanpur, Surat</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="border px-4 py-2 font-semibold text-orange-700">B / B1</td>
                  <td className="border px-4 py-2">Urban</td>
                  <td className="border px-4 py-2">Bhopal, Ludhiana, Vijayawada, Nagpur, Indore</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="border px-4 py-2 font-semibold text-orange-700">C / B2 / Z</td>
                  <td className="border px-4 py-2">Other Cities (Lowest TA)</td>
                  <td className="border px-4 py-2">All other towns and rural locations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* DA on TA Section */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-7 h-7 text-purple-600" />
            <h2 className="text-2xl font-semibold text-purple-700">How DA is Added to TA</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Dearness Allowance (DA) is paid on top of your base TA amount. This means your total TA increases when DA increases, which typically happens every quarter.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Base TA (Fixed)</h4>
              <p className="text-sm text-gray-700 mb-2">Depends on pay level and city</p>
              <p className="text-xs text-gray-600">Example: 7200 (Grade 9+, TPTA city)</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">DA Component (Variable)</h4>
              <p className="text-sm text-gray-700 mb-2">Percentage applied to base TA</p>
              <p className="text-xs text-gray-600">Example: DA 53% = 3816 extra</p>
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-purple-900 mb-2">Total TA Calculation:</h4>
            <p className="text-sm text-gray-700">
              Total TA = Base TA + (Base TA x Current DA%)
            </p>
            <p className="text-xs text-gray-600 mt-2">
              When DA changes quarterly, your total TA automatically increases or decreases accordingly.
            </p>
          </div>
        </Card>

        {/* TA for Differently Abled */}
        <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 shadow-md rounded-xl p-6 border border-teal-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-7 h-7 text-teal-600" />
            <h2 className="text-2xl font-semibold text-teal-700">TA for Persons with Disabilities (PwD)</h2>
          </div>
          <p className="text-gray-700">
            Government provides special tax benefits for differently abled employees to help cover mobility costs.
          </p>
          <div className="overflow-x-auto rounded-lg border border-teal-200 mb-4">
            <table className="min-w-full table-auto text-gray-700 text-sm">
              <thead>
                <tr className="bg-teal-100">
                  <th className="border px-4 py-3 text-left font-semibold">Disability Type</th>
                  <th className="border px-4 py-3 text-left font-semibold">Tax Exemption Limit</th>
                  <th className="border px-4 py-3 text-left font-semibold">Annual Limit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-teal-50">
                  <td className="border px-4 py-2">Blind, Deaf-mute, Orthopedically Handicapped</td>
                  <td className="border px-4 py-2">3200 per month</td>
                  <td className="border px-4 py-2">38400 per year</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white p-4 rounded-lg border border-teal-200">
            <h4 className="font-semibold text-teal-900 mb-2">How It Works:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ If your TA is 3200 per month or less - Completely tax-free</li>
              <li>✓ If your TA is above 3200 per month - First 3200 is tax-free, excess is taxable</li>
              <li>Proof: Certification by government hospital required</li>
            </ul>
          </div>
        </Card>

        {/* Tax Rules for TA */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Type className="w-7 h-7 text-yellow-600" />
            <h2 className="text-2xl font-semibold text-yellow-700">Tax Rules for Transport Allowance</h2>
          </div>
          <p className="text-gray-700">
            Whether TA is taxable depends on your category and disability status.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
            <table className="min-w-full table-auto text-gray-700 text-sm">
              <thead>
                <tr className="bg-yellow-100">
                  <th className="border px-4 py-3 text-left font-semibold">Employee Category</th>
                  <th className="border px-4 py-3 text-left font-semibold">Tax Treatment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-yellow-50">
                  <td className="border px-4 py-2 font-medium">General Employees</td>
                  <td className="border px-4 py-2">Fully Taxable - Added to salary income</td>
                </tr>
                <tr className="hover:bg-yellow-50">
                  <td className="border px-4 py-2 font-medium">Persons with Disabilities</td>
                  <td className="border px-4 py-2">Exempt up to 3200 per month - Balance taxable</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-2">For General Employees:</h4>
              <p className="text-sm text-gray-700">Your entire TA (including DA) is treated as salary and taxed as per your income tax slab.</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-2">For PwD Employees:</h4>
              <p className="text-sm text-gray-700">You get a special exemption of 3200 per month (38400 per year). Any amount above this is taxable.</p>
            </div>
          </div>
        </Card>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-10 sm:p-14 text-white mb-8 shadow-2xl">
          <h2 className="text-4xl font-black mb-3 text-center text-white drop-shadow-lg">
            Questions About Transport Allowance? 🚀
          </h2>
          <p className="text-center text-white mb-10 text-lg font-medium drop-shadow-md max-w-2xl mx-auto">
            Confused about TA rates, city classifications, or how DA is calculated? We are here to help!
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="text-6xl mb-4">📧</div>
              <p className="text-xs text-yellow-900 mb-4 font-bold uppercase tracking-widest">Email Support</p>
              <a 
                href="mailto:cpcforgovtemployees@gmail.com"
                className="inline-block font-black text-yellow-900 text-lg break-all hover:text-yellow-700 transition-colors underline underline-offset-4 decoration-3"
              >
                cpcforgovtemployees@gmail.com
              </a>
              <p className="text-xs text-yellow-800 mt-4 font-semibold">Response within 24 hours</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-300 to-green-400 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-xs text-green-900 mb-4 font-bold uppercase tracking-widest">Feedback and Questions</p>
              <p className="text-green-900 font-bold text-base leading-relaxed">
                Share your TA questions and feedback
              </p>
              <p className="text-xs text-green-800 mt-4 font-semibold">We value your input!</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link href="/ta-calculator">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-all text-lg hover:shadow-xl">
              Calculate Transport Allowance
            </button>
          </Link>
          <Link href="/">
            <button className="bg-gray-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-gray-700 transition-all text-lg hover:shadow-xl">
              Back to Home
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}
