// Danh sách các trang động không cần pre-render
export const DYNAMIC_ROUTES = [
  '/cart',
  '/checkout',
  '/account',
  '/search',
];

// Kiểm tra xem một đường dẫn có phải là trang động không
export function isDynamicRoute(path: string): boolean {
  if (!path) return false;
  
  // Chuẩn hóa đường dẫn
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Kiểm tra xem đường dẫn có trong danh sách trang động không
  return DYNAMIC_ROUTES.some(route => 
    normalizedPath === route || normalizedPath.startsWith(`${route}/`)
  );
}

// Tạo trang fallback cho các trang động
export function createFallbackHtml(path: string): string {
  const title = path === '/cart' ? 'Giỏ hàng' : 
                path === '/checkout' ? 'Thanh toán' :
                path === '/account' ? 'Tài khoản' : 'Trang không tồn tại';
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Tho Giò</title>
  <meta http-equiv="refresh" content="0;url=/thitheo/">
  <script>window.location.href = "/thitheo/";</script>
</head>
<body>
  <p>Đang chuyển hướng...</p>
</body>
</html>`;
} 