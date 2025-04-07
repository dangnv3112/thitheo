'use client';

// Đánh dấu trang này là không tĩnh, không cần pre-render trong quá trình build
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Tắt tính năng tạo trang tĩnh cho trang này
export async function generateStaticParams() {
  return [];
}

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import PaymentModal from '../components/PaymentModal';
import { createUrlPath } from '../config/paths';
import { getAssetPath } from '../utils/paths';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  // Chuẩn bị dữ liệu giỏ hàng
  const cartItems = cart.items.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.discountPrice || item.product.price,
    quantity: item.quantity,
    image: item.product.image
  }));
  
  // Lấy tổng giá trị từ cart context
  const totalPrice = cart.total;
  
  const handleIncreaseQuantity = (id: number) => {
    const item = cart.items.find(item => item.product.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };
  
  const handleDecreaseQuantity = (id: number) => {
    const item = cart.items.find(item => item.product.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };
  
  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };
  
  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto p-4 max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Giỏ Hàng</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
              <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 6h-4c0-2.76-2.24-5-5-5S7 3.24 7 6H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1zm-9-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z" />
              </svg>
            </div>
            <p className="text-lg text-gray-600 mb-4">Giỏ hàng của bạn đang trống</p>
            <Link href={createUrlPath('/products')} className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold">Sản phẩm</h2>
                </div>
                
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 flex flex-col sm:flex-row items-center">
                      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 flex-shrink-0">
                        <div className="relative w-24 h-24 mx-auto">
                          <Image
                            src={getAssetPath(item.image || '/images/products/product-placeholder.svg')}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-cover rounded-md"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = getAssetPath('/images/products/product-placeholder.svg');
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex-grow ml-0 sm:ml-4 text-center sm:text-left">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                        </p>
                      </div>
                      
                      <div className="flex items-center mt-4 sm:mt-0">
                        <button
                          onClick={() => handleDecreaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center border rounded"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleIncreaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center border rounded"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 sm:ml-6 text-right">
                        <p className="font-semibold">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 mt-1 hover:text-red-700"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
                
                <div className="border-t border-b py-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Tạm tính</span>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span>Miễn phí</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>Tổng cộng</span>
                  <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                </div>
                
                <button
                  onClick={openPaymentModal}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Đặt Hàng
                </button>
                
                <Link href={createUrlPath('/products')} className="w-full block text-center mt-4 text-blue-600">
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
      />
    </div>
  );
} 