"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";

interface Issue {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
}

interface Stats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  byType: {
    cloudSecurity: number;
    reteamAssessment: number;
    vapt: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [newIssue, setNewIssue] = useState({
    type: "Cloud Security",
    title: "",
    description: "",
    priority: "medium"
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchIssues();
      fetchStats();
    }
  }, [user, filterType, filterStatus, searchTerm]);

  async function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const data = await res.json();
      setUser(data.data.user);
      setLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }

  async function fetchIssues() {
    const token = localStorage.getItem("token");
    let url = "/api/issues?";
    
    if (filterType) url += `type=${encodeURIComponent(filterType)}&`;
    if (filterStatus) url += `status=${filterStatus}&`;
    if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      const data = await res.json();
      setIssues(data.data);
    }
  }

  async function fetchStats() {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/issues/stats", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      const data = await res.json();
      setStats(data.data);
    }
  }

  async function handleCreateIssue(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("/api/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newIssue)
    });

    if (res.ok) {
      setShowCreateModal(false);
      setNewIssue({
        type: "Cloud Security",
        title: "",
        description: "",
        priority: "medium"
      });
      fetchIssues();
      fetchStats();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to create issue");
    }
  }

  async function handleDeleteIssue(id: string) {
    if (!confirm("Are you sure you want to delete this issue?")) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`/api/issues/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      fetchIssues();
      fetchStats();
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark cyber-grid flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyber-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyber-green text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark cyber-grid">
      <Navbar />
      
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-white">Welcome back, </span>
              <span className="neon-green">{user?.name}</span>
            </h1>
            <p className="text-gray-400 text-lg">Manage your security issues efficiently</p>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="glass p-6 rounded-xl border border-cyber-green/20 hover:border-cyber-green/40 transition-all transform hover:scale-105 animate-fade-in glow-green">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-400">Total Issues</h3>
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-3xl font-bold text-cyber-green">{stats.total}</p>
              </div>
              
              <div className="glass p-6 rounded-xl border border-cyber-cyan/20 hover:border-cyber-cyan/40 transition-all transform hover:scale-105 animate-fade-in glow-cyan" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-400">Open</h3>
                  <span className="text-2xl">🔓</span>
                </div>
                <p className="text-3xl font-bold text-cyber-cyan">{stats.open}</p>
              </div>
              
              <div className="glass p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all transform hover:scale-105 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-400">In Progress</h3>
                  <span className="text-2xl">⚡</span>
                </div>
                <p className="text-3xl font-bold text-yellow-400">{stats.inProgress}</p>
              </div>
              
              <div className="glass p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all transform hover:scale-105 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-400">Resolved</h3>
                  <span className="text-2xl">✅</span>
                </div>
                <p className="text-3xl font-bold text-green-400">{stats.resolved}</p>
              </div>
            </div>
          )}

          {/* Filters and Create Button */}
          <div className="glass-strong p-6 rounded-xl mb-6 border border-cyber-green/20 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-4 flex-1">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all"
                >
                  <option value="">All Types</option>
                  <option value="Cloud Security">Cloud Security</option>
                  <option value="Reteam Assessment">Reteam Assessment</option>
                  <option value="VAPT">VAPT</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all"
                >
                  <option value="">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>

                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all"
                />
              </div>

              <Button
                onClick={() => setShowCreateModal(true)}
                variant="primary"
                className="w-full lg:w-auto"
              >
                + Create Issue
              </Button>
            </div>
          </div>

          {/* Issues List */}
          <div className="space-y-4">
            {issues.length === 0 ? (
              <div className="glass-strong text-center py-16 rounded-xl border border-cyber-green/20 animate-fade-in">
                <div className="text-6xl mb-4">🔒</div>
                <p className="text-gray-400 text-lg mb-4">No issues found</p>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  variant="primary"
                >
                  Create Your First Issue
                </Button>
              </div>
            ) : (
              issues.map((issue, index) => (
                <div
                  key={issue.id}
                  className="glass p-6 rounded-xl border border-cyber-gray-light hover:border-cyber-green/50 transition-all transform hover:scale-[1.02] animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green text-xs font-medium rounded-full border border-cyber-green/30">
                          {issue.type}
                        </span>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                          issue.status === 'open' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                          issue.status === 'in-progress' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                          issue.status === 'resolved' ? 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30' :
                          'bg-gray-500/10 text-gray-400 border-gray-500/30'
                        }`}>
                          {issue.status}
                        </span>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                          issue.priority === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                          issue.priority === 'high' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' :
                          issue.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                          'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        }`}>
                          {issue.priority}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{issue.title}</h3>
                      <p className="text-gray-400 line-clamp-2 mb-3">{issue.description}</p>
                      <p className="text-xs text-gray-500">
                        Created {new Date(issue.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteIssue(issue.id)}
                      className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/30 hover:border-red-500/50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Create Issue Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-strong p-8 rounded-2xl max-w-2xl w-full border border-cyber-green/30 glow-green animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                <span className="neon-green">Create New Issue</span>
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleCreateIssue} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Issue Type</label>
                <select
                  value={newIssue.type}
                  onChange={(e) => setNewIssue({ ...newIssue, type: e.target.value })}
                  className="w-full px-4 py-3 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all"
                  required
                >
                  <option>Cloud Security</option>
                  <option>Reteam Assessment</option>
                  <option>VAPT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                  className="w-full px-4 py-3 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all"
                  placeholder="Enter issue title"
                  required
                  minLength={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                  className="w-full px-4 py-3 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all h-32 resize-none"
                  placeholder="Describe the security issue in detail"
                  required
                  minLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                <select
                  value={newIssue.priority}
                  onChange={(e) => setNewIssue({ ...newIssue, priority: e.target.value })}
                  className="w-full px-4 py-3 bg-cyber-gray border border-cyber-gray-light rounded-lg text-white focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/20 transition-all"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                >
                  Create Issue
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
