import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // basePath: "/furnace",
  //  assetPrefix: '/furnace/',
  // distDir: "build",
  // output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
