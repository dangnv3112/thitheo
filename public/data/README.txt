Hướng dẫn chuyển đổi các file CSV thành một file Excel duy nhất

1. Mở Microsoft Excel (hoặc phần mềm bảng tính khác như Google Sheets, LibreOffice Calc)

2. Tạo một file Excel mới với 6 sheet có tên chính xác như sau:
   - Products
   - Categories
   - StoreLocations
   - CompanyInfo
   - Promotions
   - AboutInfo

3. Với mỗi file CSV, thực hiện các bước sau:
   a. Mở file CSV tương ứng bằng Excel
   b. Chọn tất cả dữ liệu (Ctrl+A)
   c. Sao chép (Ctrl+C)
   d. Chuyển đến sheet tương ứng trong file Excel đã tạo
   e. Dán dữ liệu (Ctrl+V)

4. Lưu file Excel với tên "tho-gio-data.xlsx" trong thư mục này (public/data)

Lưu ý quan trọng:
- Cấu trúc file CSV:
  * products.csv -> sheet "Products"
  * categories.csv -> sheet "Categories" 
  * store_locations.csv -> sheet "StoreLocations"
  * company_info.csv -> sheet "CompanyInfo"
  * promotions.csv -> sheet "Promotions"
  * about_info.csv -> sheet "AboutInfo"

- Đảm bảo tên các sheet trong Excel chính xác như đã nêu
- Giá trị TRUE/FALSE phải viết hoa
- Định dạng ngày tháng phải là YYYY-MM-DD (ví dụ: 2025-04-01)
- Sau khi chuyển đổi xong, khởi động lại server

Mô tả cấu trúc dữ liệu:

1. Products:
   - id: Mã sản phẩm (số)
   - name: Tên sản phẩm
   - price: Giá gốc (số)
   - discountPrice: Giá giảm (số, để trống nếu không có)
   - image: Đường dẫn hình ảnh
   - description: Mô tả sản phẩm
   - unit: Đơn vị (ví dụ: 500g)
   - inStock: Còn hàng hay không (TRUE/FALSE)
   - category: Mã danh mục
   - quantity: Số lượng còn lại
   - origin: Xuất xứ
   - storage: Hướng dẫn bảo quản

2. Categories:
   - id: Mã danh mục
   - name: Tên danh mục
   - image: Đường dẫn hình ảnh
   - description: Mô tả danh mục
   - slug: Đường dẫn URL

3. StoreLocations:
   - id: Mã cửa hàng (số)
   - name: Tên cửa hàng
   - address: Địa chỉ
   - phone: Số điện thoại
   - position_lat: Vĩ độ (số)
   - position_lng: Kinh độ (số)
   - hours: Giờ mở cửa

4. CompanyInfo:
   - name: Tên công ty
   - logo: Đường dẫn logo
   - logoWhite: Đường dẫn logo trắng
   - address_1, address_2, ...: Địa chỉ các chi nhánh
   - phone_1, phone_2, ...: Số điện thoại
   - email_1, email_2, ...: Email
   - facebook: Link Facebook
   - zalo: Link Zalo
   - businessHours: Giờ làm việc

5. Promotions:
   - id: Mã khuyến mãi (số)
   - title: Tiêu đề
   - description: Mô tả
   - startDate: Ngày bắt đầu (YYYY-MM-DD)
   - endDate: Ngày kết thúc (YYYY-MM-DD)
   - discountPercent: Phần trăm giảm giá (số)
   - image: Đường dẫn hình ảnh
   - code: Mã giảm giá
   - isActive: Đang kích hoạt hay không (TRUE/FALSE)

6. AboutInfo:
   - title: Tiêu đề
   - content_1, content_2, ...: Các đoạn nội dung
   - image: Đường dẫn hình ảnh
   - mission: Sứ mệnh
   - vision: Tầm nhìn
   - value_1, value_2, ...: Các giá trị cốt lõi
   - history_year_1, history_event_1, history_year_2, history_event_2, ...: Lịch sử công ty 