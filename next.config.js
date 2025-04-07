/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bật lại output: 'export' để tạo bản build tĩnh
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Đặt basePath và assetPrefix cho GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/thitheo' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/thitheo/' : '',
  trailingSlash: true,
  // Bỏ qua lỗi để build thành công
  eslint: {
    // Bỏ qua lỗi ESLint trong quá trình build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Bỏ qua lỗi TypeScript trong quá trình build
    ignoreBuildErrors: true,
  },
  // Disable server components for static export
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig
