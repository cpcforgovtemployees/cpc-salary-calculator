"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Car, Building, DollarSign, Users, Type, IndianRupee, IndianRupeeIcon } from "lucide-react";

export default function TransportAllowancePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Transport Allowance (TA) Guide for Government Employees – 2026
      </h1>

      {/* TA Overview */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Car className="w-7 h-7 text-blue-700" />
          <h2 className="text-2xl font-semibold text-blue-700">TA Overview</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Transport Allowance (TA) helps government employees meet daily commuting expenses between home and office. Amount depends on pay level, posting city, and DA, and is a key component of take-home pay at every CPC revision[web:98][web:99].
        </p>
      </Card>

      {/* TA Rates by Pay Level */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <IndianRupeeIcon className="w-7 h-7 text-green-600" />
          <h2 className="text-2xl font-semibold text-green-700">TA Rates by Pay Level</h2>
        </div>
        <p className="text-gray-700 mb-2">
          Rates depend on pay level and city classification. Dearness Allowance (DA) is paid additionally based on current government rate.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border text-gray-700 text-sm">
            <thead>
              <tr className="bg-green-100">
                <th className="border px-4 py-2">Pay Level</th>
                <th className="border px-4 py-2">TPTA Cities (A1/A/X)</th>
                <th className="border px-4 py-2">Other Cities (B/C/Y/Z)</th>
                <th className="border px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">9 and above</td>
                <td className="border px-4 py-2">₹7,200 + DA</td>
                <td className="border px-4 py-2">₹3,600 + DA</td>
                <td className="border px-4 py-2">DA extra</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">3 to 8</td>
                <td className="border px-4 py-2">₹3,600 + DA</td>
                <td className="border px-4 py-2">₹1,800 + DA</td>
                <td className="border px-4 py-2">DA extra</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">1-2 (≥ ₹24,200)</td>
                <td className="border px-4 py-2">₹3,600 + DA</td>
                <td className="border px-4 py-2">₹1,800 + DA</td>
                <td className="border px-4 py-2">DA extra</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">1-2 (&lt; ₹24,200)</td>
                <td className="border px-4 py-2">₹1,350 + DA</td>
                <td className="border px-4 py-2">₹900 + DA</td>
                <td className="border px-4 py-2">DA extra</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Level 14+ (car not availed)</td>
                <td className="border px-4 py-2">₹15,750</td>
                <td className="border px-4 py-2">₹15,750</td>
                <td className="border px-4 py-2">No DA admissible</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* City Classifications Section */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Building className="w-7 h-7 text-orange-600" />
          <h2 className="text-2xl font-semibold text-orange-700">
            City Classifications (A1, A, B, C)
          </h2>
        </div>
        <p className="text-gray-700 mb-2">
          TA depends on your city classification. Major cities (A1) get higher TA, while other urban/rural areas fall into B1/B2 or C classes.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border text-sm text-gray-700">
            <thead>
              <tr className="bg-orange-100">
                <th className="border px-4 py-2">Classification</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Major Cities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">A1 / X / TPTA</td>
                <td className="border px-4 py-2">Metropolitan / Large</td>
                <td className="border px-4 py-2">Delhi, Mumbai, Kolkata, Chennai, Hyderabad, Bangalore</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">A / Y</td>
                <td className="border px-4 py-2">Large Urban</td>
                <td className="border px-4 py-2">Ahmedabad, Pune, Lucknow, Jaipur, Kanpur, Surat</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">B / B1</td>
                <td className="border px-4 py-2">Urban</td>
                <td className="border px-4 py-2">Bhopal, Ludhiana, Vijayawada, and more[web:104]</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">C / B2 / Z</td>
                <td className="border px-4 py-2">Other cities</td>
                <td className="border px-4 py-2">All other towns & locations</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          City types may be updated as per census and CPC notifications.
        </p>
      </Card>

      {/* DA on TA Section */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <IndianRupee className="w-7 h-7 text-purple-600" />
          <h2 className="text-2xl font-semibold text-purple-700">DA on TA</h2>
        </div>
        <p className="text-gray-700 mb-2">
          Dearness Allowance (DA) is paid on the TA amount and revised regularly. It boosts net take-home salary, and TA + DA changes every time DA is updated.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>TA = Base TA + DA component (linked to latest DA %).</li>
          <li>Only eligible while actively serving (not in leave, suspension, foreign or long tour postings).</li>
        </ul>
      </Card>

      {/* TA for Differently Abled Employees */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-7 h-7 text-teal-600" />
          <h2 className="text-2xl font-semibold text-teal-700">TA for Differently Abled Employees</h2>
        </div>
        <div className="overflow-x-auto mb-3">
          <table className="min-w-full table-auto border text-sm text-gray-700">
            <thead>
              <tr className="bg-teal-100">
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Exemption Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Blind, deaf-mute, orthopedically handicapped</td>
                <td className="border px-4 py-2">₹3,200 per month or ₹38,400/year[web:99]</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Proof of disability must be certified by government hospital.</li>
          <li>Amount in excess of exemption is taxable.</li>
        </ul>
      </Card>

      {/* Tax Rules for TA Section */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Type className="w-7 h-7 text-yellow-600" />
          <h2 className="text-2xl font-semibold text-yellow-700">Tax Rules for Transport Allowance</h2>
        </div>
        <div className="overflow-x-auto mb-2">
          <table className="min-w-full table-auto border text-sm text-gray-700">
            <thead>
              <tr className="bg-yellow-100">
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Exemption / Taxability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">General employees</td>
                <td className="border px-4 py-2">Fully taxable (added to salary)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Differently abled</td>
                <td className="border px-4 py-2">Exempt up to ₹3,200/mo; balance taxable</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Keep documentary proof of TA received for computation.</li>
        </ul>
      </Card>
      {/* Footer CTA */}
      <div className="text-center py-6">
        <p className="text-gray-600 mb-4">
          Want to calculate your NPS corpus or explore other government salary
          tools?
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
        >
          Explore Salary Calculators
        </Link>
      </div>
    </div>
  );
}
