/**
 * Cấu hình đường dẫn cơ sở cho dự án
 */

// Đường dẫn cơ sở cho môi trường production (GitHub Pages)
export const BASE_PATH = '/thitheo';

// Đường dẫn tuyệt đối (URL) của dự án
export const PROJECT_URL = 'https://dangnv3112.github.io/thitheo';

// Kiểm tra xem ứng dụng đang chạy trong môi trường nào
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * Tạo URL đầy đủ cho đường dẫn trong dự án
 * @param {string} path Đường dẫn tương đối (ví dụ: /products/1)
 * @returns {string} Đường dẫn đầy đủ có basePath (ví dụ: /thitheo/products/1)
 */
export function createUrlPath(path) {
  if (!path) return isProduction ? BASE_PATH : '';
  
  // Chuẩn hóa đường dẫn
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Thêm basePath nếu đang trong môi trường production
  return isProduction ? `${BASE_PATH}${normalizedPath}` : normalizedPath;
}

/**
 * Tạo URL tuyệt đối (đầy đủ kèm domain) cho đường dẫn
 * @param {string} path Đường dẫn tương đối 
 * @returns {string} URL tuyệt đối (ví dụ: https://dangnv3112.github.io/thitheo/products/1)
 */
export function createAbsoluteUrl(path) {
  const relativePath = createUrlPath(path);
  return isProduction ? `${PROJECT_URL}${relativePath}` : relativePath;
} 