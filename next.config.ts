import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["payhip.com"], // ✅ Add Payhip to the allowed domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "payhip.com",
      },
    ],
  },
};

export default nextConfig;
