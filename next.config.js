/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Amplify compatibility: AWS SDK should be bundled for Lambda/API routes
  // Amplify automatically handles Next.js API routes as serverless functions
  webpack: (config, { isServer }) => {
    // For Amplify, we want to bundle AWS SDK for server-side API routes
    // This ensures it works correctly in the Lambda environment
    if (isServer) {
      // Don't externalize AWS SDK - it needs to be bundled for Lambda
      config.externals = config.externals || []
      // Remove @aws-sdk from externals if it was there
      if (Array.isArray(config.externals)) {
        config.externals = config.externals.filter((ext) => {
          if (typeof ext === 'string') {
            return !ext.includes('@aws-sdk')
          }
          return true
        })
      }
    }
    return config
  },
}

module.exports = nextConfig


