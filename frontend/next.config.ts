import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3333",
        pathname: "/uploads/**",
        search: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3333",
        pathname: "/uploads/**",
        search: "",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
