/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Image Optimization ───
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
      protocol: "https",
      hostname: "example.com",
      pathname: "/**",
    },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
    // Modern AVIF & WebP image formats for ultra-fast loading
    formats: ['image/avif', 'image/webp'],
    // Responsive breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Increased cache TTL (24 Hours)
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ─── Experimental Performance ───
  experimental: {
    // Tree-shaking and high-speed package imports optimization
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-icons',
    ],
  },
// Ignore TypeScript & ESLint errors during build
typescript: {
  ignoreBuildErrors: true,
},

eslint: {
  ignoreDuringBuilds: true,
},
  // ─── Compiler Options ───
  compiler: {
    // Remove console.log / console.info in production builds
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ─── Core Performance Settings ───
  poweredByHeader: false, // Security: Hide X-Powered-By header
  compress: true,        // Gzip / Brotli compression enabled

  // ─── High-Speed Cache & Security Headers ───
  async headers() {
    return [
      {
        // Global Security Headers for all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
      {
        // High-Speed Immutable Cache for Next static assets
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Static Images Cache
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // ─── Redirects ───
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;