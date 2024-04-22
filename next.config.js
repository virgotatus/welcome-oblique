/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
        '@react-email/components',
        '@react-email/render',
        '@react-email/tailwind'
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's11.ax1x.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.imgrender.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "via.placeholder.com",
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
