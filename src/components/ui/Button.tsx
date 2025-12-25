"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-green-500 text-black hover:from-cyan-400 hover:to-green-400 glow-green shadow-lg",
    secondary:
      "bg-cyber-gray text-cyber-green border border-cyber-green hover:bg-cyber-gray-light hover:glow-green",
    outline:
      "bg-transparent text-cyber-cyan border-2 border-cyber-cyan hover:bg-cyber-cyan/10 hover:glow-cyan",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

