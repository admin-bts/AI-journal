import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // tldraw ships ESM that Next.js needs to transpile
  transpilePackages: ["tldraw", "@tldraw/editor"],
};

export default nextConfig;
