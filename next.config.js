/** @type {import('next').NextConfig} */
const nextConfig = {



    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: '/api/:path*'
        }
      ];
    },




  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['nopay.storage.iran.liara.space'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nopay.storage.iran.liara.space',
        port: '',
        pathname: '/**',
      }
    ],
  }
}

module.exports = nextConfig
