import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    isrMemoryCacheSize: 0,
  },
  staticPageGenerationTimeout: 0,
};

export default nextConfig;
