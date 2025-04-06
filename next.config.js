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
  // Cấu hình để bỏ qua các lỗi trong quá trình build
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  // Thêm cấu hình exportPathMap để xử lý các dynamic routes
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/products': { page: '/products' },
      '/products/1': { page: '/products/[id]', query: { id: '1' } },
      '/products/2': { page: '/products/[id]', query: { id: '2' } },
      '/products/3': { page: '/products/[id]', query: { id: '3' } },
      '/products/4': { page: '/products/[id]', query: { id: '4' } },
      '/cart': { page: '/cart' },
      '/about': { page: '/about' },
      '/promotions': { page: '/promotions' },
      '/contact': { page: '/contact' }
    };
  }
}

module.exports = nextConfig
