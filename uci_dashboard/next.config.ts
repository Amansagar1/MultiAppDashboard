/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/uci",
   assetPrefix: '/uci',
  distDir: "build",
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   basePath: "/uci",
//   distDir: "build",
//   output: "export",  // Important for static export
//   typescript: {
//     ignoreBuildErrors: true,
//   },
// };

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export', // Enables static export
//   images: {
//     unoptimized: true, // Required if using the Next.js Image component
//   },
//     typescript: {
//     ignoreBuildErrors: true,
//   },
// };

// module.exports = nextConfig;