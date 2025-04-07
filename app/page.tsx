'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaPhone, FaCheckCircle, FaShippingFast, FaLeaf, FaAward, FaClock, FaCarrot, FaStar } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
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
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  
  useEffect(() => {
    // Load categories từ config nếu có
    if (config.defaultCategories && Array.isArray(config.defaultCategories)) {
      setCategories(config.defaultCategories as Category[]);
    }
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
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${getAssetPath('/images/banner/thitheotuoi.png')})`,
            filter: 'brightness(0.7)'
          }}
        ></div>
        <div className="relative container mx-auto px-4 z-10 text-white">
          <div className="max-w-2xl">
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
          </div>
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
      <section className="py-16 bg-gray-50">
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sản Phẩm Nổi Bật</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Những sản phẩm được khách hàng yêu thích và đánh giá cao về chất lượng cũng như hương vị.</p>
          </div>
          
          <FeaturedProducts />
        </div>
      </section>
    </>
  );
}
