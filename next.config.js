/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.um.edu.my',
        pathname: '/images/img-logo-UM.png',
      },
    ],
  },
}

module.exports = nextConfig
