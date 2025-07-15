 import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/dabur",
  // assetPrefix: '/dabur/',
  // distDir: "build",
  // output: "standalone",
    trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export', // Enables static export
//   images: {
//     unoptimized: true, // Required if using the Next.js Image component
//   },
//   typescript: {
//         ignoreBuildErrors: true,
//       },
// };

// module.exports = nextConfig;