'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaClock, FaCheckCircle, FaHistory, FaLightbulb, FaEye, FaListAlt } from 'react-icons/fa';
import { getAboutInfo, AboutInfo } from '../utils/excelHandler';

export default function AboutPage() {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAboutInfo = async () => {
      try {
        const info = await getAboutInfo();
        setAboutInfo(info);
      } catch (error) {
        console.error('Error loading about info:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAboutInfo();
  }, []);

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </main>
    );
  }

  if (!aboutInfo) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Không thể tải thông tin</h2>
          <p className="text-gray-600">Vui lòng thử lại sau.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{aboutInfo.title}</h1>
      
      {/* Banner Image */}
      <div className="relative h-80 w-full mb-10 rounded-lg overflow-hidden">
        <Image
          src={aboutInfo.image}
          alt={aboutInfo.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">{aboutInfo.title}</h2>
        </div>
      </div>
      
      {/* About Content */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-red-700">Giới Thiệu</h2>
        <div className="space-y-4">
          {aboutInfo.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700">{paragraph}</p>
          ))}
        </div>
      </div>
      
      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaLightbulb className="text-red-600 mr-3" size={24} />
            <h2 className="text-xl font-bold text-red-700">Sứ Mệnh</h2>
          </div>
          <p className="text-gray-700">{aboutInfo.mission}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaEye className="text-red-600 mr-3" size={24} />
            <h2 className="text-xl font-bold text-red-700">Tầm Nhìn</h2>
          </div>
          <p className="text-gray-700">{aboutInfo.vision}</p>
        </div>
      </div>
      
      {/* Core Values */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-10">
        <div className="flex items-center mb-6">
          <FaListAlt className="text-red-600 mr-3" size={24} />
          <h2 className="text-2xl font-bold text-red-700">Giá Trị Cốt Lõi</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aboutInfo.values.map((value, index) => (
            <div key={index} className="flex items-start">
              <FaCheckCircle className="text-red-600 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-700">{value}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Company History */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-6">
          <FaHistory className="text-red-600 mr-3" size={24} />
          <h2 className="text-2xl font-bold text-red-700">Lịch Sử Phát Triển</h2>
        </div>
        
        <div className="space-y-6">
          {aboutInfo.history.sort((a, b) => a.year - b.year).map((item, index) => (
            <div key={index} className="flex">
              <div className="mr-6 relative">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                  {item.year}
                </div>
                {index < aboutInfo.history.length - 1 && (
                  <div className="absolute top-12 left-1/2 w-0.5 h-16 bg-red-200 -translate-x-1/2"></div>
                )}
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex-1">
                <p className="text-gray-700">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 