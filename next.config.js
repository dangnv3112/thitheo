/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Đặt basePath chỉ trong môi trường production, trong development để trống
  basePath: process.env.NODE_ENV === 'production' ? '/thitheo' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/thitheo/' : '',
  trailingSlash: true,
  eslint: {
    // Bỏ qua lỗi ESLint trong quá trình build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Bỏ qua lỗi TypeScript trong quá trình build
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
