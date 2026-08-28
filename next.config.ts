import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // tldraw ships ESM that Next.js needs to transpile
  transpilePackages: ["tldraw", "@tldraw/editor"],

  // Allow the tablet to load dev assets when hitting the laptop over the LAN.
  // Next 16 blocks cross-origin requests to /_next/* dev resources by default,
  // which silently breaks tldraw's lazy-loaded chunks on the device.
  // Update the IP if DHCP reassigns the laptop a new address.
  allowedDevOrigins: ["192.168.1.4", "192.168.1.*"],
};

export default nextConfig;
