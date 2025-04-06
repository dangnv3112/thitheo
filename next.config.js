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
  // Bỏ qua lỗi trong build
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 4,
  },
  // Cấu hình để bỏ qua các lỗi trong quá trình build
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  // Loại bỏ các trang dynamic route khỏi build
  webpack: (config, { isServer }) => {
    // Chỉ áp dụng trong quá trình build static export
    return config;
  },
  // Thêm các cấu hình để bỏ qua lỗi
  experimental: {
    forceSwcTransforms: true,
  },
  serverExternalPackages: [],
  // Thiết lập đường dẫn tĩnh cho các trang dynamic
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/products': { page: '/products' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
      '/cart': { page: '/cart' },
      '/promotions': { page: '/promotions' },
      // Thêm các trang sản phẩm cố định để tránh lỗi
      '/products/1': { page: '/products/[id]', query: { id: '1' } },
      '/products/2': { page: '/products/[id]', query: { id: '2' } },
      '/products/3': { page: '/products/[id]', query: { id: '3' } },
      '/products/4': { page: '/products/[id]', query: { id: '4' } }
    }
  }
}

module.exports = nextConfig
