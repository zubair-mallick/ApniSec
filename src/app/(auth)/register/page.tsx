"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Registration failed");
        return;
      }

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cyber-dark cyber-grid">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] pt-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="glass-strong p-8 md:p-10 rounded-2xl border border-cyber-green/30 glow-green animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-green-500 rounded-xl mb-4">
                <span className="text-black text-2xl font-bold">A</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h1>
              <p className="text-gray-400">
                Join ApniSec and secure your infrastructure
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green rounded-lg animate-fade-in">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span className="text-sm">{success}</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg animate-fade-in">
                <div className="flex items-center gap-2">
                  <span>⚠️</span>
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all"
                  placeholder="John Doe"
                  required
                  minLength={2}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Minimum 8 characters required
                </p>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 rounded bg-cyber-gray border-cyber-gray-light text-cyber-green focus:ring-cyber-green"
                  required
                />
                <label htmlFor="terms" className="text-gray-400">
                  I agree to the{" "}
                  <Link href="#" className="text-cyber-green hover:text-cyber-cyan">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-cyber-green hover:text-cyber-cyan">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-cyber-green hover:text-cyber-cyan font-semibold transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="mt-8 pt-6 border-t border-cyber-green/10 text-center">
              <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                <span>🔒</span>
                <span>256-bit encryption • SOC 2 compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
