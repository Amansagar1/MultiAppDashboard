import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/patanjali",
  //  assetPrefix: '/patanjali',
  // distDir: "build",
  // output: "standalone",
      trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
