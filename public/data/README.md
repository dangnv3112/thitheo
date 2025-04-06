# Hướng dẫn sử dụng file Excel để quản lý dữ liệu

## Tổng quan
File Excel `tho-gio-data.xlsx` được sử dụng để quản lý tất cả dữ liệu cho trang web bán hàng Tho Gio, bao gồm:
- Danh sách sản phẩm
- Danh mục sản phẩm
- Thông tin cửa hàng
- Thông tin công ty
- Khuyến mãi
- Thông tin giới thiệu

## Cách cập nhật

1. Tạo một bản sao của file Excel hiện tại trước khi chỉnh sửa
2. Mở file bằng Microsoft Excel hoặc phần mềm tương tự
3. Chỉnh sửa các sheet tương ứng với thông tin cần cập nhật
4. Lưu file và thay thế file cũ trong thư mục `/public/data/`
5. Khởi động lại server để áp dụng các thay đổi

## Cấu trúc file Excel

### Sheet "Products"
- **id**: Số định danh của sản phẩm (không trùng lặp)
- **name**: Tên sản phẩm
- **price**: Giá gốc (VND)
- **discountPrice**: Giá khuyến mãi (VND), để trống nếu không có
- **description**: Mô tả sản phẩm
- **unit**: Đơn vị tính (vd: 1kg, 500g)
- **inStock**: Tình trạng còn hàng (1 = còn, 0 = hết)
- **category**: Slug của danh mục (phải trùng với slug trong sheet Categories)
- **image**: Đường dẫn đến hình ảnh sản phẩm (vd: images/products/bachi.jpg hoặc tên file như bachi.jpg)
- **origin**: Xuất xứ sản phẩm
- **storage**: Hướng dẫn bảo quản
- **popular**: Sản phẩm nổi bật (1 = có, 0 = không) - sản phẩm nổi bật sẽ hiển thị ở trang chủ

### Sheet "Categories"
- **id**: Số định danh của danh mục (không trùng lặp)
- **name**: Tên danh mục hiển thị
- **slug**: Định danh duy nhất của danh mục, dùng trong URL (không dấu, không khoảng trắng)
- **description**: Mô tả danh mục
- **image**: Đường dẫn đến hình ảnh danh mục (vd: images/products/thitheotuoi.png hoặc tên file như thitheotuoi.png)

### Sheet "StoreLocations"
- **id**: Số định danh của cửa hàng
- **name**: Tên cửa hàng
- **address**: Địa chỉ cửa hàng
- **phone**: Số điện thoại
- **position_lat**: Vĩ độ (latitude) vị trí cửa hàng
- **position_lng**: Kinh độ (longitude) vị trí cửa hàng
- **hours**: Giờ mở cửa

### Sheet "CompanyInfo"
- **name**: Tên công ty
- **logo**: Đường dẫn đến logo (nền sáng)
- **logoWhite**: Đường dẫn đến logo (nền tối)
- **address_1, address_2**: Các địa chỉ của công ty
- **phone_1, phone_2**: Các số điện thoại liên hệ
- **email_1, email_2**: Các email liên hệ
- **facebook**: Link Facebook
- **zalo**: Link Zalo
- **instagram**: Link Instagram (nếu có)
- **businessHours**: Giờ làm việc

### Sheet "Promotions"
- **id**: Số định danh của khuyến mãi
- **title**: Tiêu đề khuyến mãi
- **description**: Mô tả chi tiết
- **startDate**: Ngày bắt đầu (YYYY-MM-DD)
- **endDate**: Ngày kết thúc (YYYY-MM-DD)
- **discountPercent**: Phần trăm giảm giá
- **image**: Đường dẫn hình ảnh khuyến mãi
- **code**: Mã khuyến mãi
- **isActive**: Trạng thái (1 = kích hoạt, 0 = vô hiệu)

### Sheet "AboutInfo"
- **title**: Tiêu đề trang giới thiệu
- **content_1, content_2, ...**: Các đoạn văn nội dung
- **image**: Hình ảnh chính trong trang giới thiệu
- **mission**: Sứ mệnh của công ty
- **vision**: Tầm nhìn của công ty
- **value_1, value_2, ...**: Các giá trị cốt lõi
- **history_year_1, history_event_1, ...**: Năm và sự kiện lịch sử công ty

## Lưu ý quan trọng về hình ảnh

1. **Đường dẫn hình ảnh**: 
   - Cách tốt nhất: Chỉ nhập tên file (vd: `bachi.jpg`) - hệ thống sẽ tự động thêm đường dẫn `/images/products/`
   - Hoặc đường dẫn tương đối (vd: `images/products/bachi.jpg`)
   - Hoặc đường dẫn tuyệt đối bắt đầu bằng `/` (vd: `/images/products/bachi.jpg`)
   - **KHÔNG** sử dụng `/public/` trong đường dẫn (vd: `/public/images/products/bachi.jpg` sẽ gây lỗi)

2. **Vị trí lưu trữ hình ảnh**:
   - Tất cả hình ảnh sản phẩm và danh mục nên được lưu trong thư mục `/public/images/products/`
   - Đảm bảo tên file không có khoảng trắng và ký tự đặc biệt

3. **Kích thước và định dạng**:
   - Sử dụng các định dạng JPG, JPEG, PNG, hoặc WebP
   - Nên tối ưu hóa kích thước hình ảnh để trang web tải nhanh hơn

## Quy trình cập nhật hình ảnh

1. Tải hình ảnh mới vào thư mục `/public/images/products/`
2. Cập nhật đường dẫn trong file Excel (cột `image`)
3. Lưu file Excel và khởi động lại server
4. Kiểm tra trang web để đảm bảo hình ảnh hiển thị đúng

## Xử lý sự cố

Nếu hình ảnh không hiển thị sau khi cập nhật:
1. Kiểm tra đường dẫn trong file Excel có chính xác không
2. Đảm bảo hình ảnh đã được tải lên đúng thư mục
3. Xóa cache của trình duyệt và tải lại trang
4. Khởi động lại server (chạy lại lệnh `npm run dev`) 