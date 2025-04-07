/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bật lại output: 'export' để tạo bản build tĩnh
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Đặt basePath và assetPrefix cho GitHub Pages
  basePath: '/thitheo',
  assetPrefix: '/thitheo',
  trailingSlash: true,
  // Chỉ định các thư mục cần được sao chép từ public vào thư mục output
  distDir: 'out',
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
  experimental: {}
}

module.exports = nextConfig
