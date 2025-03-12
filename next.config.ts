import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["payhip.com", "pe56d.s3.amazonaws.com"], // ✅ Allow both domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "payhip.com",
      },
      {
        protocol: "https",
        hostname: "pe56d.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
