/** @type {import('next').NextConfig} */
const nextConfig = {
   typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/furnace/:path*',
        destination: 'http://localhost:3001/:path*',
      },
      {
        source: '/uci/:path*',
        destination: 'http://localhost:3002/:path*',
      },
      {
        source: '/dabur/:path*',
        destination: 'http://localhost:3003/:path*',
      },
      {
        source: '/patanjali/:path*',
        destination: 'http://localhost:3004/:path*',
      },
    ];
  },
};

export default nextConfig;
