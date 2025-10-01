import type { NextConfig } from "next";

const r2Hostname = process.env.NEXT_R2_HOSTNAME || "";
const r2HostnamePublic = process.env.NEXT_PUBLIC_R2_HOSTNAME || "";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: r2Hostname,
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: r2HostnamePublic,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
