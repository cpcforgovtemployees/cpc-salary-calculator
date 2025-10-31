"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function NPSPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          National Pension System (NPS)
        </h1>
        <p className="text-lg text-gray-600">
          A Complete Guide for Central and State Government Employees — Part of
          Salary Handbook 2026
        </p>
      </header>

      {/* Overview Section */}
      <Card className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">
          What is the National Pension System (NPS)?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The <strong>National Pension System (NPS)</strong> is a voluntary,
          defined-contribution pension scheme introduced by the Government of
          India on <strong>January 1, 2004</strong>. It replaced the Old
          Pension Scheme (OPS) for all new Central Government employees (except
          Armed Forces). NPS is regulated by the{" "}
          <strong>
            Pension Fund Regulatory and Development Authority (PFRDA)
          </strong>{" "}
          and is now mandatory for government employees while remaining open to
          all Indian citizens.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Under NPS, both employees and the government contribute regularly to
          build a retirement corpus. The accumulated fund is invested in equity,
          corporate bonds, and government securities by PFRDA-regulated Pension
          Fund Managers.
        </p>
        <p className="text-gray-700 leading-relaxed">
          In <strong>April 2025</strong>, the government introduced the{" "}
          <strong>Unified Pension Scheme (UPS)</strong> as an optional
          alternative for Central Government employees, offering assured monthly
          pension benefits.
        </p>
      </Card>

      {/* Contribution Rules */}
      <Card className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">
          NPS Contribution Rules
        </h2>
        <h3 className="text-xl font-medium text-gray-800">
          Employee Contribution
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Every government employee must contribute{" "}
          <strong>10% of Basic Pay + Dearness Allowance (DA)</strong> every
          month to their NPS Tier-I account. This contribution is mandatory and
          automatically deducted from the monthly salary.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-4">
          Government Contribution
        </h3>
        <p className="text-gray-700 leading-relaxed">
          From <strong>April 1, 2019</strong>, the Central Government increased
          its matching contribution from 10% to{" "}
          <strong>14% of Basic Pay + DA</strong>. This applies to all serving
          Central Government employees under NPS.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-4">
          Total Monthly Contribution
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Employee:</strong> 10% of (Basic Pay + DA)
          </li>
          <li>
            <strong>Government:</strong> 14% of (Basic Pay + DA)
          </li>
          <li>
            <strong>Total:</strong> 24% of (Basic Pay + DA) goes into the
            pension fund monthly.
          </li>
        </ul>
      </Card>

      {/* Pension Benefits */}
      <Card className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">
          Pension Benefits Under NPS
        </h2>
        <p className="text-gray-700 leading-relaxed">
          NPS is a <strong>market-linked</strong> pension scheme. Your final
          pension depends on the total accumulated corpus at retirement and the
          annuity plan you choose.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-4">
          At Retirement (Superannuation at 60 years)
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>60% of the accumulated corpus</strong> can be withdrawn as a
            lump sum (tax-free).
          </li>
          <li>
            <strong>40% must be used to purchase an annuity</strong> from a
            PFRDA-registered insurance company to receive monthly pension.
          </li>
        </ul>

        <h3 className="text-xl font-medium text-gray-800 mt-4">
          Premature Exit (Before 60 years)
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>80% must be invested in an annuity</strong>.
          </li>
          <li>
            <strong>20% can be withdrawn</strong> as lump sum.
          </li>
        </ul>

        <h3 className="text-xl font-medium text-gray-800 mt-4">
          Death or Disability
        </h3>
        <p className="text-gray-700 leading-relaxed">
          In case of death or permanent disability during service, the
          subscriber or nominee is entitled to the entire corpus and benefits as
          per Old Pension Scheme rules (if applicable).
        </p>
      </Card>

      {/* Withdrawal Rules */}
      <Card className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">
          NPS Withdrawal Rules
        </h2>
        <p className="text-gray-700 leading-relaxed">
          NPS offers limited withdrawal options during service:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Partial Withdrawal:</strong> Allowed for specific needs such
            as children's higher education, marriage, or critical illness
            (conditions apply).
          </li>
          <li>
            Maximum <strong>25% of employee's contribution</strong> can be
            withdrawn (up to 3 times during the entire tenure).
          </li>
          <li>
            Minimum <strong>3 years of account operation</strong> required before
            partial withdrawal.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          The full corpus becomes accessible only at retirement, as per the
          60-40 rule mentioned above.
        </p>
      </Card>

      {/* Tax Benefits */}
      <Card className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">
          Tax Benefits Under NPS
        </h2>
        <p className="text-gray-700 leading-relaxed">
          NPS offers attractive tax benefits under the Income Tax Act, 1961:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Section 80C:</strong> Deduction up to ₹1.5 lakh for
            employee's contribution.
          </li>
          <li>
            <strong>Section 80CCD(1B):</strong> Additional deduction of ₹50,000
            exclusively for NPS contributions.
          </li>
          <li>
            <strong>Section 80CCD(2):</strong> Employer's contribution (14% for
            government employees) is fully tax-deductible with no upper limit.
          </li>
          <li>
            <strong>At Retirement:</strong> 60% lump sum withdrawal is{" "}
            <strong>tax-free</strong>.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          These benefits make NPS one of the most tax-efficient retirement
          savings options available in India for 2026.
        </p>
      </Card>

      {/* NPS vs UPS */}
      <Card className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">
          NPS vs Unified Pension Scheme (UPS)
        </h2>
        <p className="text-gray-700 leading-relaxed">
          In <strong>April 2025</strong>, the government introduced the{" "}
          <strong>Unified Pension Scheme (UPS)</strong>, giving employees a
          choice between NPS and UPS.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-4">Key Differences</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>NPS:</strong> Market-linked returns, no guaranteed pension,
            60-40 withdrawal rule.
          </li>
          <li>
            <strong>UPS:</strong> Assured pension of 50% of average Basic Pay
            (last 12 months) for 25+ years of service; minimum ₹10,000/month
            pension for 10+ years of service.
          </li>
          <li>
            <strong>Contribution:</strong> NPS (14% govt.), UPS (18.5% govt.
            including pool corpus).
          </li>
          <li>
            <strong>Family Pension:</strong> UPS offers 60% of last drawn
            pension; NPS depends on annuity choice.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          Employees had until <strong>September 30, 2025</strong>, to opt for
          UPS. UPS is designed to provide stability and guaranteed income,
          especially for long-serving employees.
        </p>
      </Card>

      {/* Key Takeaways */}
      <Card className="bg-indigo-50 shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-900">
          Key Takeaways
        </h2>
        <ul className="list-disc list-inside text-gray-800 space-y-2">
          <li>
            NPS is mandatory for all Central Government employees joining after
            January 1, 2004 (except Armed Forces).
          </li>
          <li>
            Monthly contribution: <strong>10% (employee)</strong> +{" "}
            <strong>14% (government)</strong> = 24% of Basic Pay + DA.
          </li>
          <li>
            At retirement: 60% lump sum (tax-free), 40% for annuity (monthly
            pension).
          </li>
          <li>
            Tax benefits under Sections 80C, 80CCD(1B), and 80CCD(2) make NPS
            highly tax-efficient.
          </li>
          <li>
            UPS (2025) offers assured pension with higher govt. contribution but
            no lump sum withdrawal.
          </li>
          <li>
            Use our{" "}
            <Link
              href="/nps-calculator"
              className="inline-block bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium px-4 py-2 rounded-md shadow-sm hover:from-indigo-700 hover:to-blue-600 transition-all duration-300"
            >
              NPS Calculator
            </Link>{" "}
            to estimate your retirement corpus and monthly pension.
          </li>
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
    </main>
  );
}
