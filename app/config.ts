// Configuration settings for the application
const config = {
  // Set to true to show maintenance mode
  maintenanceMode: false,
  
  // Maintenance mode message
  maintenanceMessage: {
    title: 'Website đang bảo trì',
    message: 'Vui lòng quay lại sau.',
    details: 'Chúng tôi đang nâng cấp hệ thống để mang đến trải nghiệm tốt hơn.'
  },
  
  // Site information
  siteInfo: {
    name: 'Tho Giò',
    description: 'Thịt heo tươi ngon mỗi ngày',
    phone: '0123456789',
    email: 'contact@thogio.com'
  },

  // Danh mục sản phẩm mặc định
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
  ]
};

export default config; 