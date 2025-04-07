/**
 * Cấu hình đường dẫn tĩnh cho Next.js
 * Tệp này định nghĩa các trang không cần pre-render
 */

// Những đường dẫn này sẽ không được pre-render trong quá trình build
export const DYNAMIC_PATHS = [
  '/cart',
  '/checkout',
  '/account',
  '/api',
];

// Kiểm tra xem một đường dẫn có nên được coi là động không
export function isDynamicPath(path) {
  if (!path) return false;
  
  // Chuẩn hóa đường dẫn
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Kiểm tra xem đường dẫn có trong danh sách đường dẫn động không
  return DYNAMIC_PATHS.some(dynamicPath => 
    normalizedPath === dynamicPath || normalizedPath.startsWith(`${dynamicPath}/`)
  );
} 