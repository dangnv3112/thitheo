// Biến môi trường cho đường dẫn cơ sở
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/thitheo' : '';

// Hàm để tạo URL tuyệt đối với basePath
export function createUrl(path: string): string {
  // Đảm bảo path không bắt đầu bằng dấu / nếu là chuỗi rỗng
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}

// Hàm tạo URL cho hình ảnh
export function createImageUrl(path: string): string {
  // Nếu path đã là URL đầy đủ, trả về nguyên bản
  if (path.startsWith('http')) {
    return path;
  }

  // Đảm bảo path bắt đầu bằng dấu /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
} 