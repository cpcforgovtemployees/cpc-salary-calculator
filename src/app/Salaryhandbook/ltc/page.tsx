"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Plane, Ticket, ClipboardList, IndianRupee, Info } from "lucide-react";

export default function LTCSalaryHandbookPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Leave Travel Concession (LTC) Guide for Government Employees – 2026
      </h1>

      {/* LTC Overview */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Plane className="w-7 h-7 text-blue-600" />
          <h2 className="text-2xl font-semibold text-blue-700">
            LTC Overview
          </h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Leave Travel Concession (LTC) allows central and state government employees to claim reimbursement of domestic travel as per block year norms, encouraging family travel within India and supporting employee recreation. 
        </p>
      </Card>

      {/* Eligibility Rules */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Ticket className="w-7 h-7 text-green-600" />
          <h2 className="text-2xl font-semibold text-green-700">
            Eligibility Rules
          </h2>
        </div>
        <table className="min-w-full table-auto border text-gray-700 text-sm mb-4">
          <thead>
            <tr className="bg-green-100">
              <th className="border px-4 py-2">Eligibility Aspect</th>
              <th className="border px-4 py-2">Rule/Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Service</td>
              <td className="border px-4 py-2">Minimum 1 year continuous service</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Family Members</td>
              <td className="border px-4 py-2">Spouse, max. 2 children, dependent parents/siblings</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Spouse Working in IR/Airlines</td>
              <td className="border px-4 py-2">Not eligible if spouse avails similar benefits</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Fresh Recruits</td>
              <td className="border px-4 py-2">Extra conversion during first 8 years</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Income Limit (dependents)</td>
              <td className="border px-4 py-2">Not exceeding ₹3,500/month except spouse</td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* Block Year System */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <ClipboardList className="w-7 h-7 text-indigo-700" />
          <h2 className="text-2xl font-semibold text-indigo-700">
            Block Year System
          </h2>
        </div>
        <table className="min-w-full table-auto border text-sm text-gray-700 mb-4">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border px-4 py-2">Block Years</th>
              <th className="border px-4 py-2">Eligible LTCs</th>
              <th className="border px-4 py-2">Conversion Option</th>
              <th className="border px-4 py-2">Grace Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">2022–2025</td>
              <td className="border px-4 py-2">Home Town or All India</td>
              <td className="border px-4 py-2">NER | J&K | Ladakh conversion</td>
              <td className="border px-4 py-2">Till 2026</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">2026–2029</td>
              <td className="border px-4 py-2">Home Town or All India</td>
              <td className="border px-4 py-2">NER | J&K | Ladakh conversion</td>
              <td className="border px-4 py-2">Till 2030</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-700">
          Unused LTC journeys may be carried over within grace period. Special options for new recruits and those posted in designated regions.
        </p>
      </Card>

      {/* Claim Process */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <ClipboardList className="w-7 h-7 text-orange-600" />
          <h2 className="text-2xl font-semibold text-orange-700">
            Claim Process
          </h2>
        </div>
        <table className="min-w-full table-auto border text-sm text-gray-700 mb-4">
          <thead>
            <tr className="bg-orange-100">
              <th className="border px-4 py-2">Step</th>
              <th className="border px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">Apply for leave and approval</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">Book eligible travel tickets</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">3</td>
              <td className="border px-4 py-2">Undertake domestic travel with family</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">4</td>
              <td className="border px-4 py-2">Submit claim form & original tickets</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">5</td>
              <td className="border px-4 py-2">Office verifies documents</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">6</td>
              <td className="border px-4 py-2">Reimbursement credited to salary</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-700">
          Only travel fare is reimbursed, not accommodation or food. All original tickets and proof must be submitted for approval.
        </p>
      </Card>

      {/* Reimbursement Guidelines */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <IndianRupee className="w-7 h-7 text-teal-700" />
          <h2 className="text-2xl font-semibold text-teal-700">
            Reimbursement Guidelines
          </h2>
        </div>
        <table className="min-w-full table-auto border text-sm text-gray-700 mb-4">
          <thead>
            <tr className="bg-teal-100">
              <th className="border px-4 py-2">Expense Type</th>
              <th className="border px-4 py-2">Reimbursement Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Travel Fare (Rail/Air/Bus)</td>
              <td className="border px-4 py-2">Reimbursed</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Hotel, Meals, Sightseeing</td>
              <td className="border px-4 py-2">Not Reimbursed</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Own Vehicle/Private</td>
              <td className="border px-4 py-2">Not Reimbursed</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Foreign Travel</td>
              <td className="border px-4 py-2">Not Eligible</td>
            </tr>
          </tbody>
        </table>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Claims only for eligible family members per LTC rules.</li>
          <li>Tickets (with boarding passes for air travel) are mandatory for acceptance.</li>
        </ul>
      </Card>

      {/* Tax Exemption Card */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Info className="w-7 h-7 text-purple-700" />
          <h2 className="text-2xl font-semibold text-purple-700">
            Tax Exemption under Section 10(5)
          </h2>
        </div>
        <table className="min-w-full table-auto border text-sm text-gray-700 mb-2">
          <thead>
            <tr className="bg-purple-100">
              <th className="border px-4 py-2">Provisions</th>
              <th className="border px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Exempt Journeys</td>
              <td className="border px-4 py-2">Up to 2 journeys per block of 4 years</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Eligible Members</td>
              <td className="border px-4 py-2">Self, spouse, 2 children, dependent parents</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Exemption Limit</td>
              <td className="border px-4 py-2">Actual travel fare within India only</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Taxable Items</td>
              <td className="border px-4 py-2">Hotel, meals, sightseeing, private travel</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Proof Requirement</td>
              <td className="border px-4 py-2">Tickets/bills must be submitted to employer</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-700">
          LTC reimbursement is exempt from tax if claimed as per Section 10(5) rule and proper bills provided.
        </p>
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
