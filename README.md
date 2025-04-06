# Tho Gio - Website Thịt Heo Tươi Ngon

Website bán thịt heo chất lượng cao, hỗ trợ đặt hàng trực tuyến và giao hàng tận nơi.

## Tính năng chính

- Hiển thị danh sách sản phẩm thịt heo phân loại theo danh mục
- Tìm kiếm và lọc sản phẩm theo nhiều tiêu chí
- Trang thông tin chi tiết sản phẩm
- Hiển thị bản đồ cửa hàng với Google Maps
- Liên hệ qua form và qua các kênh mạng xã hội
- Responsive design cho cả máy tính và điện thoại di động
- Quản lý dữ liệu sản phẩm qua file Excel

## Công nghệ sử dụng

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript với kiểm tra kiểu dữ liệu
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [React Icons](https://react-icons.github.io/react-icons/) - Thư viện icon
- [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) - Tích hợp Google Maps
- [xlsx](https://www.npmjs.com/package/xlsx) - Đọc/ghi file Excel

## Cài đặt và chạy

### Yêu cầu:

- Node.js 16+ và npm

### Các bước cài đặt:

1. Clone repository:
```bash
git clone https://github.com/username/tho-gio.git
cd tho-gio
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy server development:
```bash
npm run dev
```

4. Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000)

### Để build cho production:

```bash
npm run build
npm start
```

## Cấu trúc dự án

```
tho-gio/
├── app/                   # Next.js App Router
│   ├── components/        # React components
│   ├── products/          # Products pages
│   ├── contact/           # Contact page
│   ├── about/             # About page
│   ├── utils/             # Utility functions
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                # Static assets
│   ├── images/            # Images and icons
│   └── data/              # Data files (Excel)
└── ...                    # Other configuration files
```

## Quản lý dữ liệu với Excel

Website hỗ trợ quản lý dữ liệu thông qua file Excel. Để cập nhật thông tin sản phẩm, danh mục, thông tin cửa hàng và thông tin công ty, bạn có thể:

1. Chỉnh sửa file Excel trong thư mục `/public/data/tho-gio-data.xlsx`
2. File Excel cần có 4 sheet: "Products", "Categories", "StoreLocations", và "CompanyInfo"
3. Mỗi sheet có cấu trúc cột riêng (xem hướng dẫn trong file `/public/data/README.md`)

Website sẽ tự động đọc dữ liệu từ file Excel này và hiển thị thông tin mới nhất.

## Google Maps API

Để sử dụng tính năng bản đồ, bạn cần thay thế API key Google Maps trong file `Map.tsx` với key của bạn:

```typescript
<LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
```

## Liên hệ

- Email: info@thogio.vn
- Website: https://thogio.vn
- Facebook: https://facebook.com/thogio
- Zalo: https://zalo.me/thogio
