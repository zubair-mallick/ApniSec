"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/profile");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-cyber-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-green-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="text-black font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold neon-green">ApniSec</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isDashboard && (
              <>
                <Link
                  href="/#features"
                  className="text-gray-300 hover:text-cyber-green transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/#about"
                  className="text-gray-300 hover:text-cyber-green transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/#contact"
                  className="text-gray-300 hover:text-cyber-green transition-colors"
                >
                  Contact
                </Link>
              </>
            )}

            {isDashboard ? (
              <Link href="/profile">
                <Button variant="outline" className="text-sm px-4 py-2">
                  Profile
                </Button>
              </Link>
            ) : !isAuthPage ? (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="outline" className="text-sm px-4 py-2">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" className="text-sm px-4 py-2">
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyber-green p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            {!isDashboard && (
              <>
                <Link
                  href="/#features"
                  className="block text-gray-300 hover:text-cyber-green transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/#about"
                  className="block text-gray-300 hover:text-cyber-green transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/#contact"
                  className="block text-gray-300 hover:text-cyber-green transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </>
            )}
            {!isAuthPage && !isDashboard && (
              <div className="flex flex-col space-y-2 pt-4 border-t border-cyber-green/20">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full text-sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full text-sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

