# Thịt Heo Tươi - Tho Gio

Website bán thịt heo tươi với đầy đủ các chức năng quản lý sản phẩm, giỏ hàng, đặt hàng và tìm kiếm.

## Demo

Live demo: [https://thitheo.vercel.app](https://thitheo.vercel.app)

## Tính năng

- Hiển thị danh sách sản phẩm và danh mục
- Tìm kiếm sản phẩm
- Giỏ hàng và thanh toán
- Quản lý người dùng
- Khuyến mãi và ưu đãi
- Đáp ứng trên mọi thiết bị (Responsive design)
- Dữ liệu được quản lý qua file Excel

## Công nghệ sử dụng

- Next.js 15
- TypeScript
- Tailwind CSS
- React Hooks
- Context API
- Excel file integration

## Cài đặt và chạy dự án

1. **Clone repository:**

   ```bash
   git clone https://github.com/dangnv3112/thitheo.git
   cd thitheo
   ```

2. **Cài đặt dependencies:**

   ```bash
   npm install
   ```

3. **Chạy phiên bản development:**

   ```bash
   npm run dev
   ```

   Truy cập [http://localhost:3000](http://localhost:3000) để xem website.

4. **Build và chạy phiên bản production:**

   ```bash
   npm run build
   npm start
   ```

## Quản lý dữ liệu

Dữ liệu sản phẩm, danh mục và thông tin khác được quản lý qua file Excel trong thư mục `/public/data/tho-gio-data.xlsx`.

Chi tiết về cách quản lý dữ liệu có thể xem trong file `/public/data/README.md`.

## Deploy lên Vercel

### Deploy tự động từ GitHub

1. Fork repository này
2. Tạo tài khoản [Vercel](https://vercel.com/)
3. Import GitHub repository
4. Deploy

### Deploy thủ công

1. Cài đặt Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

## Hỗ trợ

Nếu có bất kỳ câu hỏi hoặc vấn đề, vui lòng tạo issue trong repository này.

## License

[MIT](LICENSE)
