import { AlertTriangle, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl mb-8 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator is for informational purposes only.
            Always verify official calculations with your Pay &amp; Accounts Office.
          </p>
        </div>

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} <strong>CPC Salary Calculator</strong>. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              An open-source project built to simplify Government salary calculations.
            </p>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Terms
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-500 hover:text-indigo-700 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-500 hover:text-indigo-700 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-indigo-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
