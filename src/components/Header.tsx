"use client";
import React, { useState, useRef, useEffect } from "react";
import { IndianRupee, Share2, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const handbookLinks = [
  { href: "/Salaryhandbook/nps", label: "NPS (National Pension System)" },
  { href: "/Salaryhandbook/incometax", label: "Income Tax (New Regime)" },
  { href: "/Salaryhandbook/providentfund", label: "Provident Fund (PF)" },
  { href: "/Salaryhandbook/ltc", label: "LTC (Leave Travel Concession)" },
  { href: "/Salaryhandbook/ta", label: "TA (Transport Allowance)" },
  { href: "/Salaryhandbook/cghs", label: "CGHS (Health Scheme)" },
];

const navLinks = [
  { href: "/", label: "CPC Calculator" },
  { href: "/nps-calculator", label: "NPS Calculator" },
  { href: "/da-arrear-calculator", label: "DA Arrears" },
  { href: "/hra-class-calculator", label: "HRA Class" },
  { href: "/pf-calculator", label: "PF Calculator" },
  { href: "/income-tax-calculator", label: "Income Tax (New Regime)" },
];

export function Header() {
  const pathname = usePathname();
  const [showToast, setShowToast] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch {
      /* Ignore */
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-1 relative">
          {/* Logo + Title */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-indigo-600 text-white shadow-sm flex-shrink-0">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-gray-900">CPC Salary Calculator</p>
              <p className="text-xs text-gray-600">7th & 8th Pay Commission</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 relative">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === link.href
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Salary Handbook Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className={`px-3 py-2 text-sm font-medium rounded-md flex items-center gap-1 transition-colors ${
                  pathname.startsWith("/Salaryhandbook")
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                Salary Handbook 2026
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div
                  tabIndex={0}
                  role="listbox"
                  className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 animate-fade-in"
                  onMouseLeave={() => setDropdownOpen(false)}
                  onMouseEnter={() => setDropdownOpen(true)}
                >
                  {handbookLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      tabIndex={0}
                      onClick={() => setDropdownOpen(false)}
                      className={`flex items-center px-5 py-3 text-sm rounded-xl font-medium transition-colors 
                                ${pathname === item.href
                          ? "bg-indigo-50 text-indigo-700 font-bold"
                          : "text-gray-700 hover:bg-gray-100"}`
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleShare}
              className="ml-2 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-md transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </nav>

          {/* Mobile Navigation */}
          <details className="md:hidden relative group">
            <summary className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer list-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col py-2 z-50">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
                    ${pathname === link.href
                      ? "text-indigo-700 bg-indigo-50"
                      : "text-gray-700 hover:bg-gray-100"}`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Salary Handbook dropdown mobile */}
              <details className="group" open>
                <summary className="px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 flex justify-between items-center">
                  Salary Handbook 2026 <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="flex flex-col pl-4 border-l border-gray-200">
                  {handbookLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-4 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100
                        ${pathname === item.href ? "bg-indigo-50 text-indigo-700 font-bold" : ""}`
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>
              <button
                onClick={handleShare}
                className="px-4 py-2 text-sm font-medium text-left text-gray-700 hover:bg-gray-100"
              >
                Share Link
              </button>
            </div>
          </details>
          {showToast && (
            <div className="fixed bottom-5 right-5 bg-gray-900 text-white text-sm px-4 py-2 rounded-md shadow-lg animate-fade-in-out z-[9999]">
              ✅ Link Copied!
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
