"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    checkAuthAndFetchProfile();
  }, []);

  async function checkAuthAndFetchProfile() {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const data = await res.json();
      setUser(data.data);
      setFormData({
        name: data.data.name,
        email: data.data.email,
        password: "",
        confirmPassword: ""
      });
      setLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setUpdating(true);

    const token = localStorage.getItem("token");
    const updateData: any = {
      name: formData.name,
      email: formData.email
    };

    if (formData.password) {
      updateData.password = formData.password;
    }

    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Failed to update profile");
        return;
      }

      setMessage("Profile updated successfully!");
      setUser(data.data);
      setFormData({
        ...formData,
        password: "",
        confirmPassword: ""
      });

      await checkAuthAndFetchProfile();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark cyber-grid flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyber-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyber-green text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark cyber-grid">
      <Navbar />
      
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-gray-400 hover:text-cyber-green transition-colors mb-4 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">Profile </span>
              <span className="neon-green">Settings</span>
            </h1>
          </div>

          {/* User Info Card */}
          <div className="glass p-8 rounded-xl border border-cyber-green/20 mb-8 animate-fade-in">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full flex items-center justify-center text-3xl font-bold text-black">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
                <p className="text-gray-400">{user?.email}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Member since {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Update Profile Form */}
          <div className="glass-strong p-8 rounded-xl border border-cyber-green/20 animate-fade-in">
            <h3 className="text-xl font-bold mb-6 text-white">
              <span className="neon-cyan">Update Profile</span>
            </h3>

            {message && (
              <div className="mb-6 p-4 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green rounded-lg animate-fade-in">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>{message}</span>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg animate-fade-in">
                <div className="flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all"
                  required
                  minLength={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all"
                  required
                />
              </div>

              <div className="pt-4 border-t border-cyber-green/10">
                <h4 className="text-sm font-medium mb-4 text-gray-400">
                  Change Password (leave blank to keep current password)
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all"
                      minLength={6}
                      placeholder="••••••••"
                    />
                    {formData.password && formData.password.length < 6 && (
                      <p className="text-xs text-yellow-400 mt-1">
                        Password must be at least 6 characters
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={updating}
              >
                {updating ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Updating...
                  </span>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="glass p-8 rounded-xl border border-red-500/30 mt-8 bg-red-500/5 animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-red-400">Danger Zone</h3>
            <p className="text-gray-400 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              onClick={() => alert("Account deletion not yet implemented")}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
