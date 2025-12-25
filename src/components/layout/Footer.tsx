"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cyber-green/20 bg-cyber-darker mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold neon-green">ApniSec</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Professional security issue management platform. Track, manage, and
              resolve security vulnerabilities with enterprise-grade tools.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cyber-green font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#features"
                  className="text-gray-400 hover:text-cyber-green transition-colors text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-gray-400 hover:text-cyber-green transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-cyber-green transition-colors text-sm"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-400 hover:text-cyber-green transition-colors text-sm"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-cyber-green font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>support@apnisec.com</li>
              <li>+1 (555) 123-4567</li>
              <li className="pt-2">
                <span className="inline-flex items-center px-2 py-1 rounded bg-cyber-green/10 text-cyber-green text-xs">
                  🔒 Secure & Encrypted
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cyber-green/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ApniSec. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-500 hover:text-cyber-green transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-cyber-green transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

