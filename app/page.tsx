'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaPhone, FaCheckCircle } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import Banner from "./components/Banner";
import FeaturedProducts from "./components/FeaturedProducts";
import CategoryGrid from "./components/CategoryGrid";
import config from './config';
import { getAssetPath } from './utils/paths';
import { createUrlPath } from './config/paths';

export default function Home() {
  // Tắt chế độ bảo trì
  const [isMaintenanceMode] = useState(false);

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
      <Banner />
      
      <FeaturedProducts />
      
      <CategoryGrid />
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tại Sao Chọn Thịt Heo Tho Giò?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4">
                <img src={getAssetPath('/images/fresh-icon.svg')} alt="Tươi ngon" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tươi Ngon</h3>
              <p className="text-gray-600">Thịt heo của chúng tôi luôn đảm bảo độ tươi ngon, được kiểm định chất lượng hàng ngày.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4">
                <img src={getAssetPath('/images/quality-icon.svg')} alt="Chất lượng" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Chất Lượng</h3>
              <p className="text-gray-600">Thịt heo được chăn nuôi theo quy trình vệ sinh an toàn, không sử dụng chất tăng trọng.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4">
                <img src={getAssetPath('/images/delivery-icon.svg')} alt="Giao hàng" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Giao Hàng Nhanh</h3>
              <p className="text-gray-600">Dịch vụ giao hàng nhanh chóng, đảm bảo thịt heo luôn tươi ngon khi đến tay khách hàng.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Khách Hàng Nói Gì Về Chúng Tôi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  TH
                </div>
                <div>
                  <h4 className="font-semibold">Trần Hương</h4>
                  <p className="text-gray-500 text-sm">Khách hàng thường xuyên</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"Thịt heo Tho Giò luôn tươi ngon, thơm và chắc thịt. Tôi rất hài lòng với chất lượng và dịch vụ giao hàng."</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  NV
                </div>
                <div>
                  <h4 className="font-semibold">Nguyễn Văn</h4>
                  <p className="text-gray-500 text-sm">Đầu bếp nhà hàng</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"Là đầu bếp, tôi rất kỹ tính về nguyên liệu. Thịt heo Tho Giò đáp ứng được các tiêu chuẩn khắt khe của tôi về độ tươi và chất lượng."</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  LT
                </div>
                <div>
                  <h4 className="font-semibold">Lê Trang</h4>
                  <p className="text-gray-500 text-sm">Nội trợ</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"Tôi luôn mua thịt heo Tho Giò vì sự an tâm về nguồn gốc và vệ sinh. Các món ăn từ thịt heo này luôn được gia đình tôi khen ngợi."</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Đặt Hàng Ngay Hôm Nay</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Khám phá sự khác biệt với thịt heo Tho Giò - tươi ngon, sạch, an toàn và giàu dinh dưỡng.</p>
          <Link href={createUrlPath('/products')} className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition">
            Mua Ngay
          </Link>
        </div>
      </section>
    </>
  );
}
