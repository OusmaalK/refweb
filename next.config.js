/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
  // Ajout de cette règle pour aider le routage
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: '/fr/blog',
      },
    ];
  },
};

module.exports = nextConfig;