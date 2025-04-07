'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaPhone, FaCheckCircle, FaShippingFast, FaLeaf, FaAward, FaClock, FaCarrot, FaStar } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { motion } from "framer-motion";
import Banner from "./components/Banner";
import FeaturedProducts from "./components/FeaturedProducts";
import CategoryGrid from "./components/CategoryGrid";
import config from './config';
import { getAssetPath } from './utils/paths';
import { createUrlPath } from './config/paths';

// Định nghĩa kiểu dữ liệu cho category
interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Danh mục sản phẩm mặc định trong trường hợp không lấy được từ config
const defaultCategories: Category[] = [
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
];

export default function Home() {
  // Tắt chế độ bảo trì
  const [isMaintenanceMode] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  
  useEffect(() => {
    // Load animation library
    require('aos/dist/aos.css');
    const AOS = require('aos');
    AOS.init({
      duration: 1000,
      once: true,
    });
    
    // Detect scroll for hero section
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowHero(false);
      } else {
        setShowHero(true);
      }
    };
    
    // Load categories từ config nếu có
    if (config.defaultCategories && Array.isArray(config.defaultCategories)) {
      setCategories(config.defaultCategories as Category[]);
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMaintenanceMode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{config.maintenanceMessage.title}</h1>
          <p className="text-gray-600 mb-6">{config.maintenanceMessage.message}</p>
          <div className="w-16 h-1 bg-red-500 mx-auto mb-6"></div>
          <p className="text-sm text-gray-500">
            {config.maintenanceMessage.details}
            <br />Xin lỗi vì sự bất tiện này.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 scale-105"
          style={{
            backgroundImage: `url(${getAssetPath('/images/banner/thitheotuoi.png')})`,
            transform: `translateY(${showHero ? '0' : '-10%'})`,
            filter: 'brightness(0.7)'
          }}
        ></div>
        <div className="relative container mx-auto px-4 z-10 text-white">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Thịt Heo Tươi Ngon Mỗi Ngày</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">Sản phẩm thịt heo chất lượng cao, tươi sạch, từ trang trại đến bàn ăn chỉ trong 24h.</p>
            <div className="flex flex-wrap gap-4">
              <Link href={createUrlPath('/products')} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 inline-flex items-center">
                <FaShippingFast className="mr-2" /> Mua ngay
              </Link>
              <Link href={createUrlPath('/about')} className="bg-transparent hover:bg-white/20 border-2 border-white text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
                Tìm hiểu thêm
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Trust Badges */}
      <section className="bg-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
            <div className="flex items-center">
              <FaLeaf className="text-green-600 text-2xl mr-2" />
              <span className="font-medium">100% Tự Nhiên</span>
            </div>
            <div className="flex items-center">
              <FaShippingFast className="text-red-600 text-2xl mr-2" />
              <span className="font-medium">Giao Hàng Trong 2h</span>
            </div>
            <div className="flex items-center">
              <FaAward className="text-yellow-600 text-2xl mr-2" />
              <span className="font-medium">Cam Kết Chất Lượng</span>
            </div>
            <div className="flex items-center">
              <FaClock className="text-blue-600 text-2xl mr-2" />
              <span className="font-medium">Tươi Mỗi Ngày</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories with modern grid */}
      <section className="py-16 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Khám Phá Các Loại Thịt</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Chọn lựa đa dạng các loại thịt heo tươi ngon, được lựa chọn cẩn thận để đảm bảo chất lượng tốt nhất.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category: Category, index: number) => (
              <div 
                key={category.id} 
                className="group relative overflow-hidden rounded-lg shadow-lg h-64 transition-transform duration-300 hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img 
                  src={getAssetPath(category.image)} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{category.description}</p>
                  <Link href={createUrlPath(`/products?category=${category.slug}`)} 
                    className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors duration-300">
                    Xem sản phẩm <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products with enhanced styling */}
      <section className="py-16 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sản Phẩm Nổi Bật</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Những sản phẩm được khách hàng yêu thích và đánh giá cao về chất lượng cũng như hương vị.</p>
          </div>
          
          <FeaturedProducts />
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quy Trình Từ Trang Trại Đến Bàn Ăn</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Cam kết mang đến thịt heo sạch, an toàn với quy trình chăn nuôi và vận chuyển khép kín.</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-xs w-full transform transition-transform hover:scale-105 duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCarrot className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Chăn Nuôi Tự Nhiên</h3>
              <p className="text-gray-600">Heo được nuôi với thức ăn tự nhiên, không sử dụng chất tăng trưởng hay kháng sinh.</p>
            </div>
            
            <div className="hidden md:block text-gray-400">
              <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6H48L42 1M48 6L42 11" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-xs w-full transform transition-transform hover:scale-105 duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Kiểm Tra Chất Lượng</h3>
              <p className="text-gray-600">Mỗi sản phẩm đều được kiểm tra nghiêm ngặt về chất lượng trước khi đến tay khách hàng.</p>
            </div>
            
            <div className="hidden md:block text-gray-400">
              <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6H48L42 1M48 6L42 11" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-xs w-full transform transition-transform hover:scale-105 duration-300" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShippingFast className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Giao Hàng Nhanh Chóng</h3>
              <p className="text-gray-600">Đội ngũ giao hàng chuyên nghiệp, đảm bảo thịt luôn tươi ngon khi đến tay bạn.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials with modern cards */}
      <section className="py-16 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Khách Hàng Nói Gì Về Chúng Tôi</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Hãy xem những đánh giá từ khách hàng đã trải nghiệm sản phẩm của Tho Giò.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow transition-shadow hover:shadow-lg relative" data-aos="fade-up" data-aos-delay="100">
              <div className="absolute -top-5 left-6 text-red-600 text-5xl">"</div>
              <div className="pt-4">
                <p className="text-gray-600 italic mb-6">Thịt heo Tho Giò luôn tươi ngon, thơm và chắc thịt. Tôi rất hài lòng với chất lượng và dịch vụ giao hàng. Sẽ tiếp tục ủng hộ!</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    TH
                  </div>
                  <div>
                    <h4 className="font-semibold">Trần Hương</h4>
                    <p className="text-gray-500 text-sm">Khách hàng thường xuyên</p>
                  </div>
                </div>
                <div className="mt-3 flex text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow transition-shadow hover:shadow-lg relative" data-aos="fade-up" data-aos-delay="200">
              <div className="absolute -top-5 left-6 text-red-600 text-5xl">"</div>
              <div className="pt-4">
                <p className="text-gray-600 italic mb-6">Là đầu bếp, tôi rất kỹ tính về nguyên liệu. Thịt heo Tho Giò đáp ứng được các tiêu chuẩn khắt khe của tôi về độ tươi và chất lượng.</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    NV
                  </div>
                  <div>
                    <h4 className="font-semibold">Nguyễn Văn</h4>
                    <p className="text-gray-500 text-sm">Đầu bếp nhà hàng</p>
                  </div>
                </div>
                <div className="mt-3 flex text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow transition-shadow hover:shadow-lg relative" data-aos="fade-up" data-aos-delay="300">
              <div className="absolute -top-5 left-6 text-red-600 text-5xl">"</div>
              <div className="pt-4">
                <p className="text-gray-600 italic mb-6">Tôi luôn mua thịt heo Tho Giò vì sự an tâm về nguồn gốc và vệ sinh. Các món ăn từ thịt heo này luôn được gia đình tôi khen ngợi.</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    LT
                  </div>
                  <div>
                    <h4 className="font-semibold">Lê Trang</h4>
                    <p className="text-gray-500 text-sm">Nội trợ</p>
                  </div>
                </div>
                <div className="mt-3 flex text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced CTA Section */}
      <section className="py-20 relative" data-aos="fade-up">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: `url(${getAssetPath('/images/banner/thitheotuoi.png')})`, filter: 'brightness(0.3)'}}></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Đặt Hàng Ngay Hôm Nay</h2>
            <p className="text-xl mb-8">Khám phá sự khác biệt với thịt heo Tho Giò - tươi ngon, sạch, an toàn và giàu dinh dưỡng. Đặt hàng ngay để nhận ưu đãi!</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={createUrlPath('/products')} className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg transition-colors duration-300 transform hover:scale-105 inline-flex items-center">
                <FaShippingFast className="mr-2" /> Mua ngay
              </Link>
              <Link href={createUrlPath('/contact')} className="bg-transparent hover:bg-white/20 border-2 border-white text-white font-bold py-4 px-10 rounded-lg transition-colors duration-300 transform hover:scale-105">
                Liên hệ với chúng tôi
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="font-bold text-xl">Giao hàng miễn phí</p>
                <p className="text-sm text-gray-200">Cho đơn từ 500.000đ</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="font-bold text-xl">Tươi mới mỗi ngày</p>
                <p className="text-sm text-gray-200">Đảm bảo chất lượng</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm hidden md:block">
                <p className="font-bold text-xl">Hỗ trợ 24/7</p>
                <p className="text-sm text-gray-200">Luôn sẵn sàng phục vụ</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
