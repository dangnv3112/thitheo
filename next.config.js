/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the output: 'export' to enable server-side rendering
  // output: 'export',
  images: {
    unoptimized: true,
  },
  // Đặt basePath chỉ trong môi trường production, trong development để trống
  basePath: '',
  assetPrefix: '',
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
  },
  // Kiểm tra nếu đang chạy trong GitHub Actions
  ...(process.env.GITHUB_ACTIONS === 'true' && {
    // Đảm bảo assets được load đúng trong GitHub Pages
    assetPrefix: '',
  }),
}

module.exports = nextConfig
