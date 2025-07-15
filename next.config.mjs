/** @type {import('next').NextConfig} */
const nextConfig = {
   typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/furnace/:path*',
        destination: '/:path*',
      },
      {
        source: '/uci/:path*',
        destination: '/:path*',
      },
      {
        source: '/dabur/:path*',
        destination: '/:path*',
      },
      {
        source: '/patanjali/:path*',
        destination: '/:path*',
      },
    ];
  },
};

export default nextConfig;
