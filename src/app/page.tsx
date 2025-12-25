"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-cyber-dark cyber-grid">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyber-green/10 border border-cyber-green/30 mb-8">
              <span className="text-cyber-green text-sm font-medium">
                🔒 Enterprise Security Platform
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Secure Your</span>
              <br />
              <span className="neon-green">Digital Infrastructure</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Professional security issue management platform. Track vulnerabilities,
              manage assessments, and protect your assets with cutting-edge tools.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/register">
                <Button variant="primary" className="text-lg px-8 py-4">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="text-lg px-8 py-4">
                  Sign In
                </Button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-cyber-green">✓</span>
                <span>Enterprise Grade</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyber-green">✓</span>
                <span>End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyber-green">✓</span>
                <span>SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyber-green/5 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Powerful</span>{" "}
              <span className="neon-cyan">Features</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to manage security issues efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass p-8 rounded-xl hover:border-cyber-green/50 transition-all duration-300 transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-green-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ApniSec Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-cyber-darker/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="neon-green">ApniSec</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Trusted by security teams worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {whyUs.map((item, index) => (
                <div key={index} className="flex items-start gap-4 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex-shrink-0 w-12 h-12 bg-cyber-green/10 rounded-lg flex items-center justify-center border border-cyber-green/30">
                    <span className="text-cyber-green text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="glass-strong p-8 rounded-2xl border border-cyber-green/20">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-cyber-green/5 rounded-lg border border-cyber-green/20">
                  <span className="text-gray-300">Security Level</span>
                  <span className="text-cyber-green font-bold">Enterprise</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-cyber-cyan/5 rounded-lg border border-cyber-cyan/20">
                  <span className="text-gray-300">Uptime</span>
                  <span className="text-cyber-cyan font-bold">99.9%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-cyber-green/5 rounded-lg border border-cyber-green/20">
                  <span className="text-gray-300">Data Encryption</span>
                  <span className="text-cyber-green font-bold">AES-256</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-cyber-cyan/5 rounded-lg border border-cyber-cyan/20">
                  <span className="text-gray-300">Compliance</span>
                  <span className="text-cyber-cyan font-bold">SOC 2, ISO 27001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-strong p-12 rounded-2xl border border-cyber-green/30 glow-green">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="neon-green">Secure</span> Your Assets?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of security professionals who trust ApniSec for their
              vulnerability management needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button variant="primary" className="text-lg px-8 py-4">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="text-lg px-8 py-4">
                  Sign In to Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const features = [
  {
    icon: "🔐",
    title: "Cloud Security",
    description:
      "Comprehensive cloud infrastructure security assessment and vulnerability tracking.",
  },
  {
    icon: "🛡️",
    title: "VAPT Management",
    description:
      "Streamlined Vulnerability Assessment and Penetration Testing workflow management.",
  },
  {
    icon: "👥",
    title: "Reteam Assessment",
    description:
      "Collaborative security assessment tools for your entire team.",
  },
  {
    icon: "📊",
    title: "Real-time Analytics",
    description:
      "Track security metrics and generate comprehensive reports instantly.",
  },
  {
    icon: "⚡",
    title: "Fast & Reliable",
    description:
      "Lightning-fast performance with 99.9% uptime guarantee.",
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    description:
      "End-to-end encryption and compliance with industry standards.",
  },
];

const whyUs = [
  {
    icon: "🚀",
    title: "Lightning Fast",
    description:
      "Built for performance with instant response times and real-time updates.",
  },
  {
    icon: "🔐",
    title: "Bank-Level Security",
    description:
      "Your data is protected with military-grade encryption and security protocols.",
  },
  {
    icon: "📈",
    title: "Scalable Platform",
    description:
      "Grows with your team from startup to enterprise without missing a beat.",
  },
  {
    icon: "💼",
    title: "Enterprise Ready",
    description:
      "Compliant with SOC 2, ISO 27001, and other industry standards.",
  },
];
