"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Heart, Hospital, UserCheck, RefreshCcw } from "lucide-react";

export default function CGHSPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Central Government Health Scheme (CGHS) Handbook – 2026
      </h1>

      {/* CGHS Overview & Objectives */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-7 h-7 text-red-600" />
          <h2 className="text-2xl font-semibold text-red-700">
            CGHS Overview & Objectives
          </h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          The Central Government Health Scheme (CGHS) is a comprehensive medical care scheme that provides healthcare access to central government employees, pensioners, and their dependents in designated cities across India. Its objectives are to offer affordable and quality treatment, cashless hospitalization, and preventive medical services nationwide[web:128][web:133].
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
          <li>Coverage of OPD, hospitalization, medicines, diagnostic tests, and specialist care</li>
          <li>Cashless treatment at empanelled hospitals for pensioners</li>
          <li>Wide network of wellness centers and dispensaries in major cities</li>
        </ul>
      </Card>

      {/* Eligibility & Enrollment */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <UserCheck className="w-7 h-7 text-blue-700" />
          <h2 className="text-2xl font-semibold text-blue-700">
            Eligibility & Enrollment Rules
          </h2>
        </div>
        <table className="min-w-full table-auto border text-sm text-gray-700 mb-4">
          <thead>
            <tr className="bg-blue-100">
              <th className="border px-4 py-2">Eligible Group</th>
              <th className="border px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Central Govt Employees</td>
              <td className="border px-4 py-2">Serving staff drawing salary from central civil estimates</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Pensioners & Family Pensioners</td>
              <td className="border px-4 py-2">Retired and family pensioners residing in CGHS cities</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Others</td>
              <td className="border px-4 py-2">Ex-MPs, judges, freedom fighters, railway board, accredited journalists, police of Delhi, autonomous body employees (in select locations)[web:122][web:125]</td>
            </tr>
          </tbody>
        </table>
        <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
          <li>Apply through prescribed CGHS form, submit IDs, pay slips, family details, proof of residence, and photographs</li>
          <li>Pensioners deposit 10 years’ contribution for lifetime card at retirement</li>
          <li>Plastic CGHS cards issued after verification—renewed online as needed</li>
        </ul>
      </Card>

      {/* Contribution Rates 2026 */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-7 h-7 text-green-700" />
          <h2 className="text-2xl font-semibold text-green-700">
            Contribution Rates 2026
          </h2>
        </div>
        <table className="min-w-full table-auto border text-sm text-gray-700 mb-4">
          <thead>
            <tr className="bg-green-100">
              <th className="border px-4 py-2">Pay Level (7th CPC)</th>
              <th className="border px-4 py-2">Monthly Contribution</th>
              <th className="border px-4 py-2">One-Time for Lifetime Card (Pensioner)</th>
              <th className="border px-4 py-2">Ward Entitlement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Level 1–5</td>
              <td className="border px-4 py-2">₹250</td>
              <td className="border px-4 py-2">₹30,000</td>
              <td className="border px-4 py-2">General</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Level 6</td>
              <td className="border px-4 py-2">₹450</td>
              <td className="border px-4 py-2">₹54,000</td>
              <td className="border px-4 py-2">Semi-private</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Level 7–11</td>
              <td className="border px-4 py-2">₹650</td>
              <td className="border px-4 py-2">₹78,000</td>
              <td className="border px-4 py-2">Private</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Level 12+</td>
              <td className="border px-4 py-2">₹1,000</td>
              <td className="border px-4 py-2">₹1,20,000</td>
              <td className="border px-4 py-2">Private/Single suite</td>
            </tr>
          </tbody>
        </table>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Rates are revised periodically as per CPC recommendations</li>
          <li>Lifetime card for pensioners avoids future renewals</li>
        </ul>
      </Card>

      {/* Empanelled Hospitals */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Hospital className="w-7 h-7 text-indigo-700" />
          <h2 className="text-2xl font-semibold text-indigo-700">
            Empanelled Hospitals (2026)
          </h2>
        </div>
        <table className="min-w-full table-auto border text-sm text-gray-700 mb-2">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border px-4 py-2">Hospital Name</th>
              <th className="border px-4 py-2">City / Region</th>
              <th className="border px-4 py-2">Services / Specialties</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Max Super Speciality</td>
              <td className="border px-4 py-2">Delhi NCR</td>
              <td className="border px-4 py-2">Multi-speciality & Cancer</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Moolchand Hospital</td>
              <td className="border px-4 py-2">Delhi</td>
              <td className="border px-4 py-2">Cardiology, Orthopaedics, Oncology, Surgery</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Yashoda Superspeciality</td>
              <td className="border px-4 py-2">Ghaziabad</td>
              <td className="border px-4 py-2">Cancer, General Specialist</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Apollo</td>
              <td className="border px-4 py-2">Pan India</td>
              <td className="border px-4 py-2">All Specialities</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Narendra Mohan Hospital</td>
              <td className="border px-4 py-2">Ghaziabad</td>
              <td className="border px-4 py-2">General, Cardiac, Neuro</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-700 mb-2">
          Hundreds of multi-speciality and diagnostic centers are empanelled across India. Visit the official CGHS portal for the full city-wise list and check each hospital’s accreditation status for the applicable rates[web:124][web:126][web:129].
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Rates and facilities vary based on city tier and NABH accreditation status</li>
          <li>Cashless treatment for pensioners/beneficiaries, reimbursement for others</li>
        </ul>
      </Card>

      {/* Benefits & Online Renewal */}
      <Card className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <RefreshCcw className="w-7 h-7 text-purple-700" />
          <h2 className="text-2xl font-semibold text-purple-700">
            Benefits & Online Renewal Process
          </h2>
        </div>
        <table className="min-w-full table-auto border text-sm text-gray-700 mb-2">
          <thead>
            <tr className="bg-purple-100">
              <th className="border px-4 py-2">Feature</th>
              <th className="border px-4 py-2">Details / Steps</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">OPD Facilities</td>
              <td className="border px-4 py-2">Free consultation, medicines, and minor procedures</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Hospitalization</td>
              <td className="border px-4 py-2">Cashless (pensioners), reimbursement process (others)</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Diagnostics</td>
              <td className="border px-4 py-2">Approved tests and imaging at CGHS centers/hospitals</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Online Renewal</td>
              <td className="border px-4 py-2">Apply via official CGHS portal, submit updated docs, pay renewed contribution</td>
            </tr>
          </tbody>
        </table>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Plastic CGHS card is auto-renewed online, both for serving and retired staff</li>
          <li>Check for latest rates and rules before renewal at https://cghs.mohfw.gov.in</li>
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
