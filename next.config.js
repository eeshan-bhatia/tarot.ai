/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Handle AWS SDK for server-side
      config.externals = [...(config.externals || []), '@aws-sdk']
    }
    return config
  },
}

module.exports = nextConfig


