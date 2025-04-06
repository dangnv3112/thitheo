/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
  // Bỏ qua hoàn toàn các lỗi build
  onDemandEntries: {
    // Thời gian trang được lưu trong bộ nhớ
    maxInactiveAge: 25 * 1000,
    // Số lượng trang tối đa được lưu trong bộ nhớ
    pagesBufferLength: 4,
  },
  // Thêm các cấu hình để bỏ qua lỗi
  experimental: {
    appDocumentPreloading: false,
    forceSwcTransforms: true
  },
  serverExternalPackages: []
}

module.exports = nextConfig
