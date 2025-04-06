'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAssetPath } from '../utils/paths';
import Image from 'next/image';

const banners = [
  {
    image: '/images/products/product-placeholder.svg',
    title: 'Thịt Tươi Ngon Mỗi Ngày',
    description: 'Sản phẩm tươi ngon từ trang trại đến bàn ăn',
  },
  {
    image: '/images/products/product-placeholder.svg',
    title: 'Khuyến Mãi Đặc Biệt',
    description: 'Giảm giá lên đến 15% cho đơn hàng đầu tiên',
  },
  {
    image: '/images/products/product-placeholder.svg',
    title: 'Miễn Phí Giao Hàng',
    description: 'Cho đơn hàng từ 300.000đ trong phạm vi 5km',
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-red-50">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30">
              <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{banner.title}</h2>
                <p className="text-lg md:text-xl mb-6">{banner.description}</p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium">
                  Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-red-600' : 'bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 