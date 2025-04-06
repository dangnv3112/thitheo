'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { FaCalendarAlt, FaTag, FaRegClock } from 'react-icons/fa';
import { getPromotions, Promotion } from '../utils/excelHandler';

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        const promotionsData = await getPromotions();
        setPromotions(promotionsData);
      } catch (error) {
        console.error('Error loading promotions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPromotions();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: vi });
    } catch (error) {
      return dateString;
    }
  };

  const isActive = (promotion: Promotion) => {
    const today = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    
    return promotion.isActive && today >= startDate && today <= endDate;
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Khuyến Mãi</h1>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : promotions.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Hiện tại không có khuyến mãi nào</h2>
          <p className="text-gray-600">Vui lòng quay lại sau để xem các khuyến mãi mới nhất.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {promotions.map((promotion) => (
            <div 
              key={promotion.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden ${!isActive(promotion) ? 'opacity-60' : ''}`}
            >
              <div className="relative h-56 w-full">
                <Image
                  src={promotion.image}
                  alt={promotion.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 left-0 bg-red-600 text-white px-4 py-2 rounded-br-lg">
                  {isActive(promotion) ? 'Đang diễn ra' : 'Đã kết thúc'}
                </div>
                <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-2 rounded-bl-lg">
                  Giảm {promotion.discountPercent}%
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-red-700">{promotion.title}</h2>
                <p className="text-gray-700 mb-4">{promotion.description}</p>
                
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <FaCalendarAlt className="mr-2" />
                  <span>Thời gian: {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}</span>
                </div>
                
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <FaTag className="mr-2" />
                  <span>Mã khuyến mãi: <span className="font-semibold">{promotion.code}</span></span>
                </div>
                
                {isActive(promotion) ? (
                  <Link 
                    href="/products" 
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
                  >
                    Mua ngay
                  </Link>
                ) : (
                  <div className="inline-block bg-gray-400 text-white font-semibold py-2 px-6 rounded-md cursor-not-allowed">
                    Đã kết thúc
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 