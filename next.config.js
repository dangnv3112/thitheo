/** @type {import('next').NextConfig} */
const nextConfig = {
  // Xuất tĩnh
  output: 'export',
  
  // Tối ưu hóa hình ảnh
  images: {
    unoptimized: true,
  },
  
  // Cấu hình cho GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/thitheo' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/thitheo' : '',
  
  // Thêm dấu / cuối URL
  trailingSlash: true,
};

module.exports = nextConfig;
