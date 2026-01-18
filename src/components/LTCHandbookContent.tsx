"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Plane, Ticket, ClipboardList, IndianRupee, Info, MapPin, Calendar, Users } from "lucide-react";

export default function LTCHandbookContent() {
  return (
    <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Hero Section */}
        <header className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent">
            Leave Travel Concession (LTC) Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete Guide for Government Employees — Understand eligibility, block years, reimbursement process, and tax benefits
          </p>
        </header>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">✈️</div>
            <h3 className="font-semibold text-blue-900">2 Journeys</h3>
            <p className="text-sm text-blue-700">Per Block Year</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
            <h3 className="font-semibold text-green-900">Family Travel</h3>
            <p className="text-sm text-green-700">Spouse + 2 Children</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🏷️</div>
            <h3 className="font-semibold text-orange-900">Fare Only</h3>
            <p className="text-sm text-orange-700">Travel Reimbursed</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-purple-900">Tax-Free</h3>
            <p className="text-sm text-purple-700">Section 10(5)</p>
          </div>
        </div>

        {/* LTC Overview */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Plane className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-semibold text-blue-700">What is LTC?</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            <strong>Leave Travel Concession (LTC)</strong> is a valuable benefit that allows central and state government employees to claim reimbursement of domestic travel expenses as per block year norms. It encourages family travel within India and supports employee recreation and well-being.
          </p>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-blue-900 mb-2">Key Benefits:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Reimbursement of domestic travel fares for you and family members</li>
              <li>Tax-free benefit under Section 10(5) of Income Tax Act</li>
              <li>Covers up to 2 journeys per 4-year block period</li>
              <li>Applicable across all Indian rail, air, and bus services</li>
            </ul>
          </div>
        </Card>

        {/* Eligibility Rules */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-7 h-7 text-green-600" />
            <h2 className="text-2xl font-semibold text-green-700">Eligibility Criteria</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Service Requirements</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ Minimum 1 year continuous service</li>
                <li>✅ Central/State govt employees</li>
                <li>✅ Recognized government organizations</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Eligible Family Members</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ Self (employee)</li>
                <li>✅ Spouse</li>
                <li>✅ Maximum 2 children</li>
                <li>✅ Dependent parents/siblings (special rules)</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Income Restrictions</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Dependents: Income ≤ ₹3,500/month</li>
                <li>• Spouse: No income limit</li>
                <li>• Exception: If spouse works in IR/Airlines</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Special Categories</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Fresh recruits: Extra conversion options</li>
                <li>• NER posted: Special block year benefits</li>
                <li>• J&K/Ladakh: Enhanced conversion options</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Block Year System */}
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 shadow-md rounded-xl p-6 border border-indigo-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-7 h-7 text-indigo-700" />
            <h2 className="text-2xl font-semibold text-indigo-800">Block Year System</h2>
          </div>

          <p className="text-gray-700">
            LTC is allocated in <strong>4-year block periods</strong>. Each block allows specific number of journeys that must be completed within the grace period.
          </p>

          

          <div className="overflow-x-auto rounded-lg border border-indigo-200">
            <table className="min-w-full table-auto text-gray-700 text-sm">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="border px-4 py-3 text-left font-semibold">Block Period</th>
                  <th className="border px-4 py-3 text-left font-semibold">Eligible Journeys</th>
                  <th className="border px-4 py-3 text-left font-semibold">Grace Period</th>
                  <th className="border px-4 py-3 text-left font-semibold">Special Options</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-indigo-50">
                  <td className="border px-4 py-2 font-medium">2022–2025</td>
                  <td className="border px-4 py-2">Home Town or All India</td>
                  <td className="border px-4 py-2">Till Dec 2026</td>
                  <td className="border px-4 py-2">NER/J&K/Ladakh conversion</td>
                </tr>
                <tr className="hover:bg-indigo-50">
                  <td className="border px-4 py-2 font-medium">2026–2029</td>
                  <td className="border px-4 py-2">Home Town or All India</td>
                  <td className="border px-4 py-2">Till Dec 2030</td>
                  <td className="border px-4 py-2">NER/J&K/Ladakh conversion</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <h4 className="font-semibold text-indigo-900 mb-2">💡 Important Notes:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Unused journeys can be carried forward within grace period</li>
              <li>• Conversion to NER/J&K/Ladakh allowed for special postings</li>
              <li>• Home Town journey: To employee's hometown within India</li>
              <li>• All India journey: To any place within India (no restrictions)</li>
            </ul>
          </div>
        </Card>

        {/* Claim Process */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="w-7 h-7 text-orange-600" />
            <h2 className="text-2xl font-semibold text-orange-700">LTC Claim Process</h2>
          </div>

          <p className="text-gray-700">
            Follow these steps to successfully claim your LTC reimbursement:
          </p>

          

          <div className="space-y-3">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex gap-4">
              <div className="flex-shrink-0 bg-orange-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">1</div>
              <div>
                <h4 className="font-semibold text-orange-900">Apply for Leave Approval</h4>
                <p className="text-sm text-gray-700">Submit your leave application with travel details to your immediate supervisor</p>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex gap-4">
              <div className="flex-shrink-0 bg-orange-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">2</div>
              <div>
                <h4 className="font-semibold text-orange-900">Book Eligible Travel</h4>
                <p className="text-sm text-gray-700">Purchase tickets for eligible family members on Indian Railways, Airlines, or Bus services</p>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex gap-4">
              <div className="flex-shrink-0 bg-orange-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">3</div>
              <div>
                <h4 className="font-semibold text-orange-900">Undertake the Journey</h4>
                <p className="text-sm text-gray-700">Complete your domestic travel with family members within the block year period</p>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex gap-4">
              <div className="flex-shrink-0 bg-orange-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">4</div>
              <div>
                <h4 className="font-semibold text-orange-900">Submit LTC Claim Form</h4>
                <p className="text-sm text-gray-700">File LTC claim form with original tickets, boarding passes, and supporting documents</p>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex gap-4">
              <div className="flex-shrink-0 bg-orange-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">5</div>
              <div>
                <h4 className="font-semibold text-orange-900">Office Verification</h4>
                <p className="text-sm text-gray-700">HR/Admin verifies documents, eligibility, and claim amount within 30-45 days</p>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex gap-4">
              <div className="flex-shrink-0 bg-orange-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">6</div>
              <div>
                <h4 className="font-semibold text-orange-900">Reimbursement Credited</h4>
                <p className="text-sm text-gray-700">Approved amount is credited to your salary/bank account as tax-free allowance</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-red-900 mb-2">⚠️ Important Reminders:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Keep all original tickets and boarding passes as proof</li>
              <li>• Only travel fare is reimbursed (not accommodation or meals)</li>
              <li>• Submit claim within 3 months of journey completion</li>
              <li>• Claim must be within the applicable block year</li>
            </ul>
          </div>
        </Card>

        {/* Reimbursement Guidelines */}
        <Card className="bg-gradient-to-br from-teal-50 to-green-50 shadow-md rounded-xl p-6 border border-teal-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <IndianRupee className="w-7 h-7 text-teal-700" />
            <h2 className="text-2xl font-semibold text-teal-800">What Gets Reimbursed?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-teal-200">
              <h4 className="font-semibold text-green-900 mb-2">✅ Reimbursable Expenses</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Railway fare (all classes)</li>
                <li>✓ Air travel fare</li>
                <li>✓ Bus/Coach fare</li>
                <li>✓ Domestic travel within India</li>
                <li>✓ Eligible family member fares</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-teal-200">
              <h4 className="font-semibold text-red-900 mb-2">❌ Non-Reimbursable Expenses</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✗ Hotel/Accommodation charges</li>
                <li>✗ Meals and food expenses</li>
                <li>✗ Sightseeing and activities</li>
                <li>✗ Personal vehicle/Taxi charges</li>
                <li>✗ International/Foreign travel</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-teal-200 mt-4">
            <h4 className="font-semibold text-teal-900 mb-2">Documentation Required:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Original train/airline/bus tickets</li>
              <li>• Boarding passes (for air travel mandatory)</li>
              <li>• Proof of family member details (birth cert, marriage cert)</li>
              <li>• Claim form signed by employee</li>
              <li>• Identity proof of traveling members</li>
            </ul>
          </div>
        </Card>

        {/* Tax Benefits */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-7 h-7 text-purple-700" />
            <h2 className="text-2xl font-semibold text-purple-700">Tax Benefits (Section 10(5))</h2>
          </div>

          <p className="text-gray-700">
            LTC reimbursement is <strong>completely exempt from income tax</strong> under Section 10(5) of the Income Tax Act, provided the rules are followed.
          </p>

          <div className="space-y-3">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Tax Exemption Details</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ <strong>Exemption:</strong> Reimbursed travel fare is tax-free</li>
                <li>✅ <strong>Eligible Journeys:</strong> Up to 2 journeys per 4-year block</li>
                <li>✅ <strong>Family Coverage:</strong> Self, spouse, 2 children, dependent parents</li>
                <li>✅ <strong>Scope:</strong> Domestic travel within India only</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">What Remains Taxable</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Hotel and accommodation expenses (taxable as other income)</li>
                <li>• Meals and food during travel (taxable)</li>
                <li>• Personal expenses (taxable)</li>
                <li>• Any fare above eligible amount (taxable)</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip:</h4>
            <p className="text-sm text-gray-700">
              Keep LTC reimbursement separate from other salary components when filing tax returns. Clearly mark it as tax-exempt under Section 10(5).
            </p>
          </div>
        </Card>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-10 sm:p-14 text-white mb-8 shadow-2xl">
          <h2 className="text-4xl font-black mb-3 text-center text-white drop-shadow-lg">
            Questions About LTC? 🚀
          </h2>
          <p className="text-center text-white mb-10 text-lg font-medium drop-shadow-md max-w-2xl mx-auto">
            Confused about eligibility, block years, or claim process? We're here to help!
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
              <p className="text-xs text-green-900 mb-4 font-bold uppercase tracking-widest">Feedback & Questions</p>
              <p className="text-green-900 font-bold text-base leading-relaxed">
                Share your LTC questions and feedback
              </p>
              <p className="text-xs text-green-800 mt-4 font-semibold">We value your input!</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link href="/ltc-calculator">
            <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-teal-700 transition-all text-lg hover:shadow-xl">
              Calculate LTC Reimbursement
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