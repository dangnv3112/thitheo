/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/thitheo',
  trailingSlash: true,
  eslint: {
    // Bỏ qua lỗi ESLint trong quá trình build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Bỏ qua lỗi TypeScript trong quá trình build
    ignoreBuildErrors: true,
  },
  // Bỏ qua các lỗi Dynamic Routes khi export static
  experimental: {
    missingSuspenseWithCSRInDevelopment: true,
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
      '/cart': { page: '/cart' },
      '/products': { page: '/products' },
      '/promotions': { page: '/promotions' },
      '/search': { page: '/search' },
      '/user': { page: '/user' },
      '/products/1': { page: '/products/[id]', query: { id: '1' } },
      '/products/2': { page: '/products/[id]', query: { id: '2' } },
      '/products/3': { page: '/products/[id]', query: { id: '3' } },
      '/products/4': { page: '/products/[id]', query: { id: '4' } },
    }
  },
}

module.exports = nextConfig
