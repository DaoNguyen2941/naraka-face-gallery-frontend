import type { NextConfig } from "next";

const r2Hostname = process.env.NEXT_PUBLIC_R2_HOSTNAME || "";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: r2Hostname,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
