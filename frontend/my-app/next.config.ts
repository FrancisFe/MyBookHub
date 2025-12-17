// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5140/api/:path*', // Tu backend local
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;