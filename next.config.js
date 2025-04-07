/** @type {import('next').NextConfig} */
const nextConfig = {
  // Xuất tĩnh
  output: 'export',
  
  // Tối ưu hóa hình ảnh
  images: {
    unoptimized: true,
  },
  
  // Cấu hình cho GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/tho-gio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/tho-gio' : '',
  
  // Thêm dấu / cuối URL
  trailingSlash: true,
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
