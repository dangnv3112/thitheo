/**
 * @typedef {Object} Category
 * @property {number} id - ID danh mục
 * @property {string} name - Tên danh mục
 * @property {string} slug - Slug URL của danh mục
 * @property {string} image - Đường dẫn hình ảnh
 * @property {string} description - Mô tả danh mục
 */

/** @type {Object} */
const config = {
  // Tắt chế độ bảo trì
  maintenanceMode: false,
  
  // Thông điệp bảo trì
  maintenanceMessage: {
    title: "Đang Bảo Trì",
    message: "Website đang được nâng cấp để mang đến trải nghiệm tốt hơn.",
    details: "Chúng tôi sẽ sớm trở lại với nhiều sản phẩm thịt heo tươi ngon hơn."
  },
  
  // Liên hệ
  contact: {
    phone: "0123 456 789",
    email: "info@thogio.com",
    address: "123 Đường Trần Hưng Đạo, Huế, Việt Nam",
    workingHours: "08:00 - 18:00, thứ 2 - chủ nhật"
  },
  
  // Mạng xã hội
  social: {
    facebook: "https://facebook.com/thogio",
    instagram: "https://instagram.com/thogio",
    zalo: "https://zalo.me/thogio"
  },
  
  // Cấu hình cửa hàng
  store: {
    name: "Tho Giò - Thịt Heo Sạch",
    slogan: "Thịt heo tươi ngon mỗi ngày",
    description: "Chuyên cung cấp thịt heo sạch, tươi ngon, chất lượng cao đến tận tay người tiêu dùng"
  },
  
  // Cấu hình Google Sheets
  sheets: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL || '',
    privateKey: process.env.GOOGLE_PRIVATE_KEY || '',
    sheetsId: {
      products: '1rnBQfBoZKOCXcr4QTUXIubTN0DlGCkqJ4iqUuRdGZLA',
      categories: '1rnBQfBoZKOCXcr4QTUXIubTN0DlGCkqJ4iqUuRdGZLA',
      orders: '1rnBQfBoZKOCXcr4QTUXIubTN0DlGCkqJ4iqUuRdGZLA',
      about: '1rnBQfBoZKOCXcr4QTUXIubTN0DlGCkqJ4iqUuRdGZLA',
    }
  },
  
  // Các tùy chọn liên quan đến đơn hàng
  order: {
    minOrderAmount: 100000, // Đơn hàng tối thiểu
    deliveryFee: 30000,     // Phí giao hàng
    freeShippingThreshold: 500000, // Miễn phí giao hàng cho đơn từ 500k
  },
  
  // Cấu hình Google Maps
  maps: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    defaultLocation: {
      lat: 16.463713,
      lng: 107.585695
    },
    zoom: 15
  },
  
  // Danh sách cửa hàng
  stores: [
    {
      id: 1,
      name: "Tho Giò - Chi nhánh Trần Hưng Đạo",
      address: "123 Đường Trần Hưng Đạo, Huế",
      phone: "0123 456 789",
      location: { lat: 16.463713, lng: 107.585695 },
      openingHours: "08:00 - 18:00"
    },
    {
      id: 2,
      name: "Tho Giò - Chi nhánh Đống Đa",
      address: "45 Đường Đống Đa, Huế",
      phone: "0123 456 789",
      location: { lat: 16.458565, lng: 107.595151 },
      openingHours: "08:00 - 18:00"
    }
  ],
  
  /** @type {Category[]} */
  // Các danh mục sản phẩm mặc định
  defaultCategories: [
    {
      id: 1,
      name: "Thịt Heo Tươi",
      slug: "thit-heo-tuoi",
      image: "/images/categories/thitheotuoi.jpg",
      description: "Thịt heo tươi ngon, được chọn lọc kỹ càng"
    },
    {
      id: 2,
      name: "Thịt Đông Lạnh",
      slug: "thit-dong-lanh",
      image: "/images/categories/donglanh.jpg",
      description: "Thịt heo đông lạnh, giữ nguyên dưỡng chất"
    },
    {
      id: 3,
      name: "Thịt Chế Biến Sẵn",
      slug: "thit-che-bien-san",
      image: "/images/categories/chebiensans.jpg",
      description: "Các sản phẩm thịt chế biến sẵn, tiện lợi"
    },
    {
      id: 4,
      name: "Combo Tiết Kiệm",
      slug: "combo-tiet-kiem",
      image: "/images/categories/combo.jpg",
      description: "Combo tiết kiệm, đa dạng sản phẩm"
    }
  ],
};

export default config; 