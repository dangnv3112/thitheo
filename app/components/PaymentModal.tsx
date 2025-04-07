'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { CartItem, OrderData } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const { cart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const totalPrice = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !phone) {
      toast.error('Vui lòng nhập tên và số điện thoại');
      return;
    }
    
    setLoading(true);
    
    try {
      // Chuẩn bị dữ liệu đơn hàng
      const orderData: OrderData = {
        customerName,
        phone,
        address,
        note,
        total: totalPrice,
        orderDate: new Date().toISOString(),
        items: cart.map((item: CartItem) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity
        }))
      };
      
      // Gửi dữ liệu đến API endpoint
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setOrderSuccess(true);
        setOrderId(result.orderId);
        clearCart();
        toast.success('Đặt hàng thành công!');
      } else {
        toast.error(result.message || 'Có lỗi xảy ra khi đặt hàng');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Có lỗi xảy ra khi đặt hàng');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">
          {orderSuccess ? 'Đặt hàng thành công' : 'Thông tin đặt hàng'}
        </h2>
        
        {orderSuccess ? (
          <div className="text-center">
            <div className="mb-4 text-green-600">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <p className="mb-2">Cảm ơn bạn đã đặt hàng!</p>
            <p className="mb-4">Mã đơn hàng: <span className="font-bold">{orderId}</span></p>
            
            <div className="border rounded-lg p-4 mb-4 bg-gray-50">
              <h3 className="font-bold mb-2">Thông tin thanh toán</h3>
              <p>Ngân hàng: <strong>Vietcombank</strong></p>
              <p>Số tài khoản: <strong>1234567890</strong></p>
              <p>Chủ tài khoản: <strong>NGUYỄN VĂN A</strong></p>
              <p className="mt-2 text-sm">Nội dung chuyển khoản: <strong>{orderId}</strong></p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Quét mã QR để thanh toán</p>
              <div className="flex justify-center">
                <Image 
                  src="/images/qr-code-example.png" 
                  alt="QR Code" 
                  width={150} 
                  height={150}
                  className="border"
                />
              </div>
            </div>
            
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Tên người nhận *
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Số điện thoại *
              </label>
              <input
                id="phone"
                type="text"
                className="w-full px-3 py-2 border rounded-lg" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="address">
                Địa chỉ
              </label>
              <textarea
                id="address"
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="note">
                Ghi chú
              </label>
              <textarea
                id="note"
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold mb-2">Thông tin giỏ hàng</h3>
              <div className="border rounded-lg divide-y">
                {cart.map((item: CartItem) => (
                  <div key={item.id} className="p-2 flex justify-between">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 text-sm"> x{item.quantity}</span>
                    </div>
                    <div className="font-medium">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-right font-bold">
                Tổng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-2 border rounded-lg flex-1"
                onClick={onClose}
                disabled={loading}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex-1"
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Đặt hàng'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentModal; 