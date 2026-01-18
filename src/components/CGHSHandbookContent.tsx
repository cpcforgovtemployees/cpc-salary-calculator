"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Heart, Hospital, UserCheck, RefreshCcw, TrendingUp, HelpCircle } from "lucide-react";

export default function CGHSHandbookContent() {
  return (
    <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Hero Section */}
        <header className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-700 to-pink-600 bg-clip-text text-transparent">
            Central Government Health Scheme (CGHS) Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete Guide to CGHS Benefits, Eligibility, Contribution Rates, Empanelled Hospitals, and Online Renewal for 2026
          </p>
        </header>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🏥</div>
            <h3 className="font-semibold text-red-900">Comprehensive</h3>
            <p className="text-sm text-red-700">OPD & Hospitalization</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">💳</div>
            <h3 className="font-semibold text-blue-900">Cashless</h3>
            <p className="text-sm text-blue-700">For Pensioners</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🏢</div>
            <h3 className="font-semibold text-green-900">Wide Network</h3>
            <p className="text-sm text-green-700">500+ Hospitals</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-semibold text-purple-900">Online Renewal</h3>
            <p className="text-sm text-purple-700">Easy & Quick</p>
          </div>
        </div>

        {/* CGHS Overview */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-7 h-7 text-red-600" />
            <h2 className="text-2xl font-semibold text-red-700">What is CGHS?</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            <strong>Central Government Health Scheme (CGHS)</strong> is a comprehensive medical care scheme that provides healthcare access to central government employees, pensioners, and their dependents in designated cities across India. It offers affordable and quality treatment, cashless hospitalization, preventive medical services, and a wide network of empanelled hospitals nationwide.
          </p>
          
          

          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-red-900 mb-2">Key Benefits:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Coverage of OPD, hospitalization, medicines, and diagnostic tests</li>
              <li>Cashless treatment at empanelled hospitals for pensioners</li>
              <li>Specialist care and preventive health services</li>
              <li>Wide network of wellness centers and dispensaries in major cities</li>
            </ul>
          </div>
        </Card>

        {/* Eligibility & Enrollment */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-semibold text-blue-700">Eligibility and Enrollment</h2>
          </div>
          <p className="text-gray-700">
            CGHS is available to central government employees, pensioners, family pensioners, and certain other categories residing in CGHS cities.
          </p>
          
          

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full table-auto text-gray-700 text-sm">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border px-4 py-3 text-left font-semibold">Eligible Group</th>
                  <th className="border px-4 py-3 text-left font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-50">
                  <td className="border px-4 py-2 font-medium">Central Govt Employees</td>
                  <td className="border px-4 py-2">Serving staff drawing salary from central civil estimates</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="border px-4 py-2 font-medium">Pensioners &amp; Family Pensioners</td>
                  <td className="border px-4 py-2">Retired and family pensioners residing in CGHS cities</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="border px-4 py-2 font-medium">Others</td>
                  <td className="border px-4 py-2">Ex-MPs, judges, freedom fighters, railway board, journalists, police</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-blue-900 mb-2">Enrollment Steps:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Apply through prescribed CGHS form with ID, pay slips, family details, and proof of residence</li>
              <li>Pensioners deposit 10 years contribution for lifetime card at retirement</li>
              <li>Plastic CGHS card issued after verification and renewed online as needed</li>
            </ul>
          </div>
        </Card>

        {/* Contribution Rates */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-md rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-7 h-7 text-green-600" />
            <h2 className="text-2xl font-semibold text-green-700">Contribution Rates (2026)</h2>
          </div>
          <p className="text-gray-700">
            CGHS contributions vary by pay level (7th CPC). Pensioners get lifetime cards by making a one-time contribution.
          </p>
          
          

          <div className="overflow-x-auto rounded-lg border border-green-200">
            <table className="min-w-full table-auto text-gray-700 text-sm">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-4 py-3 text-left font-semibold">Pay Level</th>
                  <th className="border px-4 py-3 text-left font-semibold">Monthly Contribution</th>
                  <th className="border px-4 py-3 text-left font-semibold">Lifetime Card (Pensioner)</th>
                  <th className="border px-4 py-3 text-left font-semibold">Ward Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2 font-medium">Level 1 to 5</td>
                  <td className="border px-4 py-2">250 per month</td>
                  <td className="border px-4 py-2">30000 one-time</td>
                  <td className="border px-4 py-2">General Ward</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2 font-medium">Level 6</td>
                  <td className="border px-4 py-2">450 per month</td>
                  <td className="border px-4 py-2">54000 one-time</td>
                  <td className="border px-4 py-2">Semi-private Ward</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2 font-medium">Level 7 to 11</td>
                  <td className="border px-4 py-2">650 per month</td>
                  <td className="border px-4 py-2">78000 one-time</td>
                  <td className="border px-4 py-2">Private Ward</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="border px-4 py-2 font-medium">Level 12 and above</td>
                  <td className="border px-4 py-2">1000 per month</td>
                  <td className="border px-4 py-2">120000 one-time</td>
                  <td className="border px-4 py-2">Private/Suite</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200 mt-4">
            <h4 className="font-semibold text-green-900 mb-2">Important Notes:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Rates are revised periodically as per CPC recommendations</li>
              <li>• Lifetime card for pensioners avoids future renewal payments</li>
              <li>• Family members covered under employee contribution</li>
            </ul>
          </div>
        </Card>

        {/* Empanelled Hospitals */}
        <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Hospital className="w-7 h-7 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-indigo-700">Empanelled Hospitals (2026)</h2>
          </div>
          <p className="text-gray-700">
            CGHS has partnerships with 500+ hospitals across India offering multi-specialty services. Here are some major empanelled hospitals:
          </p>
          
          

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full table-auto text-gray-700 text-sm">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="border px-4 py-3 text-left font-semibold">Hospital</th>
                  <th className="border px-4 py-3 text-left font-semibold">Location</th>
                  <th className="border px-4 py-3 text-left font-semibold">Specialties</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-indigo-50">
                  <td className="border px-4 py-2 font-medium">Max Super Speciality</td>
                  <td className="border px-4 py-2">Delhi NCR</td>
                  <td className="border px-4 py-2">Multi-specialty, Cancer, Cardiology</td>
                </tr>
                <tr className="hover:bg-indigo-50">
                  <td className="border px-4 py-2 font-medium">Moolchand Hospital</td>
                  <td className="border px-4 py-2">Delhi</td>
                  <td className="border px-4 py-2">Cardiology, Orthopedics, Oncology, Surgery</td>
                </tr>
                <tr className="hover:bg-indigo-50">
                  <td className="border px-4 py-2 font-medium">Yashoda Superspeciality</td>
                  <td className="border px-4 py-2">Ghaziabad</td>
                  <td className="border px-4 py-2">Cancer, General Specialist</td>
                </tr>
                <tr className="hover:bg-indigo-50">
                  <td className="border px-4 py-2 font-medium">Apollo Hospitals</td>
                  <td className="border px-4 py-2">Pan India</td>
                  <td className="border px-4 py-2">All Specialties, Super Specialty</td>
                </tr>
                <tr className="hover:bg-indigo-50">
                  <td className="border px-4 py-2 font-medium">Narendra Mohan Hospital</td>
                  <td className="border px-4 py-2">Ghaziabad</td>
                  <td className="border px-4 py-2">General, Cardiac, Neuro Surgery</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-indigo-900 mb-2">Key Information:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Hundreds of diagnostic centers and multi-specialty hospitals across India</li>
              <li>• Cashless treatment for pensioners, reimbursement for others</li>
              <li>• Check CGHS portal for full city-wise hospital list and accreditation status</li>
            </ul>
          </div>
        </Card>

        {/* Benefits & Features */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 shadow-md rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCcw className="w-7 h-7 text-purple-600" />
            <h2 className="text-2xl font-semibold text-purple-700">Key Benefits &amp; Online Renewal</h2>
          </div>
          
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Healthcare Coverage</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Free OPD consultations</li>
                <li>✓ Medicines and diagnostics</li>
                <li>✓ Hospitalization benefits</li>
                <li>✓ Specialist consultations</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Online Renewal Process</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Apply via CGHS portal</li>
                <li>✓ Submit updated documents</li>
                <li>✓ Pay renewal contribution</li>
                <li>✓ Auto-renewed plastic card</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Preventive Services</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Wellness check-ups</li>
                <li>✓ Health screening camps</li>
                <li>✓ Immunization programs</li>
                <li>✓ Fitness counseling</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Pensioner Benefits</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Lifetime card option</li>
                <li>✓ Cashless hospitalization</li>
                <li>✓ No future contributions</li>
                <li>✓ Priority at empanelled centers</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-red-700 via-pink-700 to-red-800 rounded-3xl p-10 sm:p-14 text-white mb-8 shadow-2xl">
          <h2 className="text-4xl font-black mb-3 text-center text-white drop-shadow-lg">
            Questions About CGHS? 🏥
          </h2>
          <p className="text-center text-white mb-10 text-lg font-medium drop-shadow-md max-w-2xl mx-auto">
            Need help with enrollment, contributions, or finding empanelled hospitals? Contact us today!
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
                Share your CGHS questions and feedback
              </p>
              <p className="text-xs text-green-800 mt-4 font-semibold">We value your input!</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          {/* Note: Update href if you have an eligibility checker tool */}
          <Link href="/">
            <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-red-700 hover:to-pink-700 transition-all text-lg hover:shadow-xl">
              Back to Home
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}