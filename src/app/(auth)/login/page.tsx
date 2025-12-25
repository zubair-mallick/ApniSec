"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.data.token);
      router.push("/dashboard");
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
                Welcome Back
              </h1>
              <p className="text-gray-400">
                Sign in to your ApniSec account
              </p>
            </div>

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
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-400">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded bg-cyber-gray border-cyber-gray-light text-cyber-green focus:ring-cyber-green"
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  href="#"
                  className="text-cyber-green hover:text-cyber-cyan transition-colors"
                >
                  Forgot password?
                </Link>
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
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-cyber-green hover:text-cyber-cyan font-semibold transition-colors"
                >
                  Create one now
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="mt-8 pt-6 border-t border-cyber-green/10 text-center">
              <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                <span>🔒</span>
                <span>Your data is encrypted and secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
