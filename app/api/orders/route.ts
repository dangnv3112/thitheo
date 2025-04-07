import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint để xử lý đơn hàng và (tùy chọn) gửi dữ liệu đến Google Sheets
 * 
 * Trong môi trường thực tế, bạn sẽ tích hợp Google Sheets API ở đây:
 * 1. Cài đặt 'googleapis' npm package
 * 2. Cấu hình OAuth2 hoặc service account credentials
 * 3. Gửi dữ liệu đến Google Sheets
 * 
 * Mã mẫu ở đây chỉ xử lý dữ liệu cơ bản và trả về success response
 */

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface OrderData {
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  total: number;
  orderDate: string;
  items: OrderItem[];
}

export async function POST(request: NextRequest) {
  try {
    // Lấy dữ liệu đơn hàng từ request body
    const orderData: OrderData = await request.json();
    
    // Log đơn hàng (chỉ để debug)
    console.log('Order received:', orderData);
    
    // Validate dữ liệu đơn hàng
    if (!orderData.customerName || !orderData.phone) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Thiếu thông tin khách hàng' 
        }, 
        { status: 400 }
      );
    }
    
    // Tạo dòng dữ liệu để ghi vào Google Sheets
    // Mỗi mục trong đơn hàng sẽ là một dòng riêng
    const orderRows = orderData.items.map(item => [
      orderData.orderDate,         // Ngày đặt hàng
      orderData.customerName,      // Tên khách hàng
      orderData.phone,             // Số điện thoại
      orderData.address || '',     // Địa chỉ (có thể trống)
      item.name,                   // Tên sản phẩm
      item.price,                  // Giá sản phẩm
      item.quantity,               // Số lượng
      item.totalPrice,             // Thành tiền
      orderData.note || '',        // Ghi chú (có thể trống)
    ]);
    
    // TODO: Tích hợp Google Sheets API ở đây
    // Đoạn mã ví dụ (đã được comment) cho việc gửi dữ liệu đến Google Sheets:
    
    /*
    const { google } = require('googleapis');
    const sheets = google.sheets({ version: 'v4' });
    
    // Khởi tạo auth - trong thực tế bạn sẽ cần thiết lập OAuth2 hoặc service account
    const auth = new google.auth.GoogleAuth({
      keyFile: 'path/to/service-account-key.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    const client = await auth.getClient();
    const sheetsAPI = google.sheets({ version: 'v4', auth: client });
    
    const spreadsheetId = 'YOUR_SPREADSHEET_ID';
    const range = 'Sheet1!A:I'; // Điều chỉnh tầm nhìn theo cấu trúc spreadsheet
    
    await sheetsAPI.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: orderRows,
      },
    });
    */
    
    // Trả về thành công và ID đơn hàng giả
    return NextResponse.json({
      success: true,
      message: 'Đơn hàng đã được ghi nhận',
      orderId: `ORD-${Date.now()}`,
      // Trong môi trường thực tế, bạn sẽ lưu đơn hàng vào cơ sở dữ liệu
      // và trả về ID thật của đơn hàng từ database
    });
    
  } catch (error) {
    console.error('Error processing order:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Đã xảy ra lỗi khi xử lý đơn hàng',
        error: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
} 