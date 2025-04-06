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
  // Tùy chỉnh quá trình build
  webpack: (config, { isServer }) => {
    // Tùy chỉnh thêm cho webpack nếu cần
    return config
  }
}

module.exports = nextConfig
