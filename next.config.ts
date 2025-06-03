/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/users',
        destination: 'https://dummyjson.com/users',
      },
    ];
  },
};

module.exports = nextConfig;
