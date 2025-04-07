/** @type {import('next').NextConfig} */
const nextConfig = {
  // Xuất tĩnh
  output: 'export',
  
  // Tối ưu hóa hình ảnh
  images: {
    unoptimized: true,
    disableStaticImages: true,
    remotePatterns: [],
  },
  
  // Cấu hình cho GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/thitheo' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/thitheo' : '',
  
  // Thêm dấu / cuối URL
  trailingSlash: true,
  
  // Bỏ qua lỗi TypeScript và ESLint
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Giảm giới hạn bộ nhớ
  webpack: (config, { dev, isServer }) => {
    // Giảm kích thước bundle
    config.optimization = {
      ...config.optimization,
      minimize: true
    }
    
    return config
  },
  
  // Giảm thông tin
  poweredByHeader: false,
  
  // Bỏ qua lỗi khi build
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
};

module.exports = nextConfig;
