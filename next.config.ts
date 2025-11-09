import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // ✅ allow all https hosts
      },
      {
        protocol: 'http',
        hostname: '**', // optional — allow http as well
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: 'https://digidine-backend-server.onrender.com/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
