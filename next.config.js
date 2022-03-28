/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'cdn.sanity.io'],
  },
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
