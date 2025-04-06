'use client';

import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import Map from '../components/Map';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Liên Hệ</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Thông Tin Liên Hệ</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start mb-6">
              <FaMapMarkerAlt className="text-red-600 mt-1 mr-3 flex-shrink-0" size={22} />
              <div>
                <h3 className="font-semibold mb-1">Địa Chỉ</h3>
                <p className="text-gray-700">123 Nguyễn Văn A, Quận 1, TP.HCM</p>
                <p className="text-gray-700">456 Lê Văn B, Quận 2, TP.HCM</p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <FaPhone className="text-red-600 mt-1 mr-3 flex-shrink-0" size={22} />
              <div>
                <h3 className="font-semibold mb-1">Điện Thoại</h3>
                <p className="text-gray-700">
                  <a href="tel:0987654321" className="hover:text-red-600">0987 654 321</a>
                </p>
                <p className="text-gray-700">
                  <a href="tel:0987654322" className="hover:text-red-600">0987 654 322</a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <FaEnvelope className="text-red-600 mt-1 mr-3 flex-shrink-0" size={22} />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-700">
                  <a href="mailto:info@thogio.vn" className="hover:text-red-600">info@thogio.vn</a>
                </p>
                <p className="text-gray-700">
                  <a href="mailto:hotro@thogio.vn" className="hover:text-red-600">hotro@thogio.vn</a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaClock className="text-red-600 mt-1 mr-3 flex-shrink-0" size={22} />
              <div>
                <h3 className="font-semibold mb-1">Giờ Mở Cửa</h3>
                <p className="text-gray-700">Thứ Hai - Chủ Nhật: 08:00 - 22:00</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Vị Trí Cửa Hàng</h2>
            <div className="h-80 bg-gray-200 rounded-lg overflow-hidden shadow-md">
              <Map />
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Gửi Tin Nhắn Cho Chúng Tôi</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            {submitSuccess ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {submitError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {submitError}
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Họ tên <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Chủ đề <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="order">Đơn hàng</option>
                    <option value="product">Sản phẩm</option>
                    <option value="shipping">Vận chuyển</option>
                    <option value="return">Đổi trả</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Nội dung <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'
                  }`}
                >
                  {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 