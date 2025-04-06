'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { formatCurrency } from '../utils/format';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  
  // Tránh hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  // Nếu giỏ hàng trống
  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Giỏ Hàng</h1>
        <div className="bg-white p-8 rounded shadow-md max-w-2xl mx-auto text-center">
          <p className="text-lg mb-6">Giỏ hàng của bạn đang trống.</p>
          <Link 
            href="/products" 
            className="bg-red-600 text-white px-6 py-3 rounded-lg inline-flex items-center hover:bg-red-700 transition"
          >
            <FaArrowLeft className="mr-2" />
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Giỏ Hàng</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Danh sách sản phẩm */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thành tiền</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cart.items.map((item) => {
                  const price = item.product.discountPrice || item.product.price;
                  const totalPrice = price * item.quantity;
                  
                  return (
                    <tr key={item.product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover object-center"
                            />
                          </div>
                          <div className="ml-4">
                            <Link 
                              href={`/products/${item.product.id}`}
                              className="text-lg font-medium text-gray-900 hover:text-red-600"
                            >
                              {item.product.name}
                            </Link>
                            <p className="mt-1 text-sm text-gray-500">{item.product.unit}</p>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {formatCurrency(price)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
                          >
                            <FaMinus size={14} />
                          </button>
                          <span className="mx-3 w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
                          >
                            <FaPlus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {formatCurrency(totalPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-between">
            <Link
              href="/products"
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <FaArrowLeft className="mr-2" />
              Tiếp tục mua sắm
            </Link>
            
            <button
              onClick={clearCart}
              className="text-gray-500 hover:text-gray-700"
            >
              Xóa giỏ hàng
            </button>
          </div>
        </div>
        
        {/* Tóm tắt đơn hàng */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-900 border-b pb-4">Tóm Tắt Đơn Hàng</h2>
            
            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Tạm tính</p>
                <p className="font-medium">{formatCurrency(cart.total)}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-gray-600">Phí vận chuyển</p>
                <p className="font-medium">Miễn phí</p>
              </div>
              
              <div className="border-t pt-4 flex justify-between items-center">
                <p className="text-lg font-medium">Tổng cộng</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(cart.total)}</p>
              </div>
            </div>
            
            <button
              className="mt-6 w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition"
            >
              Thanh Toán
            </button>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>* Phương thức thanh toán sẽ được chọn ở bước tiếp theo</p>
              <p>* Giá đã bao gồm VAT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 