import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://192.168.1.11:3000",
    "http://192.168.1.11",
    "192.168.1.11:3000",
    "192.168.1.11",
  ],
};

export default nextConfig;
