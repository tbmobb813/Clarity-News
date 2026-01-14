/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['newsapi.org', 'images.unsplash.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig
