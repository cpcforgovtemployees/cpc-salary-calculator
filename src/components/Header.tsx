"use client";

import { IndianRupee, Share2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Calculator" },
    { href: "/nps-calculator", label: "NPS Calculator" },
    { href: "/da-arrear-calculator", label: "DA Arrears" },
    { href: "/hra-class-calculator", label: "HRA Class" },
  ];

  // ✅ Toast state
  const [showToast, setShowToast] = useState(false);

  // ✅ Reference to mobile menu for auto-close
  const menuRef = useRef<HTMLDetailsElement>(null);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for browsers without clipboard API
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setShowToast(true);

      // ✅ Auto-close mobile menu after 300ms
      setTimeout(() => {
        if (menuRef.current && menuRef.current.open) {
          menuRef.current.open = false;
        }
      }, 300);

      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3 relative">
          
          {/* Logo + Title */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-indigo-600 text-white shadow-sm flex-shrink-0">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-gray-900">
                CPC Salary Calculator
              </h1>
              <p className="text-xs text-gray-600">7th & 8th Pay Commission</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
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

            {/* ✅ SHARE BUTTON */}
            <button
              onClick={handleShare}
              className="ml-2 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-md transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </nav>

          {/* Mobile Navigation (Hamburger Menu) */}
          <details ref={menuRef} className="md:hidden relative">
            <summary className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer list-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </summary>

            <div className="absolute right-0 top-12 w-44 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col py-2 z-50">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium ${
                    pathname === link.href
                      ? "text-indigo-700 bg-indigo-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* ✅ Mobile Share Option */}
              <button
                onClick={handleShare}
                className="px-4 py-2 text-sm font-medium text-left text-gray-700 hover:bg-gray-100"
              >
                Share Link
              </button>
            </div>
          </details>

          {/* ✅ Toast (Bottom Right) */}
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
