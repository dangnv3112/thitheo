/**
 * Tiện ích xử lý đường dẫn cho hình ảnh và tài nguyên tĩnh trong cả development và production
 */

// Kiểm tra nếu đang chạy phía client
const isClient = typeof window !== 'undefined';

/**
 * Kiểm tra xem ứng dụng có đang chạy trong môi trường production không
 * Trong production, URL sẽ có '/thitheo'
 */
export const isProduction = isClient && window.location.pathname.includes('/thitheo');

/**
 * Lấy đường dẫn đúng cho tài nguyên tĩnh (hình ảnh, data, v.v.)
 * @param path Đường dẫn gốc (ví dụ: /images/products/product.jpg)
 * @returns Đường dẫn đầy đủ tích hợp với basePath
 */
export function getAssetPath(path: string): string {
  if (!path) return '/images/products/product-placeholder.svg';
  
  // Loại bỏ tham số query nếu có
  const cleanPath = path.split('?')[0];
  
  // Nếu đường dẫn đã có tiền tố '/thitheo', giữ nguyên
  if (cleanPath.startsWith('/thitheo/')) {
    return cleanPath;
  }
  
  // Trong môi trường production, thêm '/thitheo' vào trước đường dẫn
  if (isProduction) {
    return cleanPath.startsWith('/') 
      ? `/thitheo${cleanPath}` 
      : `/thitheo/${cleanPath}`;
  }
  
  // Trong development, giữ nguyên đường dẫn
  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
}

/**
 * Lấy đường dẫn đúng cho hình ảnh sản phẩm
 */
export function getProductImagePath(path: string): string {
  if (!path) return getAssetPath('/images/products/product-placeholder.svg');
  return getAssetPath(path);
}

/**
 * Lấy đường dẫn đúng cho hình ảnh danh mục
 */
export function getCategoryImagePath(path: string): string {
  if (!path) return getAssetPath('/images/categories/product-placeholder.svg');
  return getAssetPath(path);
}

/**
 * Lấy đường dẫn đúng cho dữ liệu Excel
 */
export function getDataPath(path: string): string {
  if (!path) return getAssetPath('/data/tho-gio-data.xlsx');
  return getAssetPath(path);
} 