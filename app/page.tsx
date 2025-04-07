'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaPhone } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import Banner from "./components/Banner";
import FeaturedProducts from "./components/FeaturedProducts";
import CategoryGrid from "./components/CategoryGrid";
import config from './config';

export default function Home() {
  // Use the configuration for maintenance mode
  const [isMaintenanceMode] = useState(config.maintenanceMode);

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
      
      <div className="container mx-auto px-4 py-12">
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-red-700">Cam Kết Của Tho Giò</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/images/fresh-icon.svg" alt="Tươi ngon" width={32} height={32} />
              </div>
              <h3 className="font-semibold mb-2">Thịt Tươi Mỗi Ngày</h3>
              <p>Thịt được cung cấp tươi mới hàng ngày, đảm bảo chất lượng</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/images/delivery-icon.svg" alt="Giao hàng" width={32} height={32} />
              </div>
              <h3 className="font-semibold mb-2">Giao Hàng Tận Nơi</h3>
              <p>Giao hàng nhanh chóng trong vòng 2 giờ kể từ khi đặt hàng</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/images/quality-icon.svg" alt="Chất lượng" width={32} height={32} />
              </div>
              <h3 className="font-semibold mb-2">Đảm Bảo Chất Lượng</h3>
              <p>Cam kết hoàn tiền 100% nếu không hài lòng về chất lượng</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
