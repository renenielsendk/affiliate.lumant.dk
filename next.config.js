/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  }
];

module.exports = {
 transpilePackages: ['mui-color-input'],
  swcMinify: false,
  trailingSlash: false,
  images: {
    domains: [
      'images.clerk.dev',
      'firebasestorage.googleapis.com',
      'cdn.sanity.io',
    ],
    formats: ['image/webp'],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
};