/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/thitheo',
  trailingSlash: true,
}

module.exports = nextConfig 