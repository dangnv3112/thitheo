'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes, FaCopy, FaCheck } from 'react-icons/fa';
import { getAssetPath } from '../utils/paths';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onSubmitOrder: (data: any) => void;
}

export default function PaymentModal({ isOpen, onClose, total, onSubmitOrder }: PaymentModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({
    customerName: '',
    phone: '',
  });

  // Hỗ trợ tùy chọn Escape để đóng modal
  useEffect(() => {
    function handleEscapeKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Thông tin ngân hàng
  const bankInfo = {
    accountName: 'CÔNG TY TNHH THO GIÒ',
    accountNumber: '123456789012',
    bank: 'Ngân hàng TMCP Công Thương Việt Nam (VietinBank)',
    branch: 'Chi nhánh TP.HCM',
    qrCode: '/images/payment-qr.png' // Placeholder QR code
  };

  // Copy số tài khoản
  const copyAccountNumber = () => {
    navigator.clipboard.writeText(bankInfo.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Xác thực form - đơn giản hóa kiểm tra
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      customerName: '',
      phone: '',
    };

    if (!customerName.trim()) {
      newErrors.customerName = 'Vui lòng nhập họ tên';
      valid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Xử lý submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Gửi thông tin đơn hàng
      onSubmitOrder({
        customerName,
        phone,
        address,
        note,
        total,
        orderDate: new Date().toISOString()
      });
      
      // Đóng modal
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 my-8 relative z-10 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-20 flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-red-600">Đặt Hàng & Thanh Toán</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Thông tin đặt hàng - đơn giản hóa form */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Thông tin giao hàng</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Họ và tên <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.customerName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="phone">
                    Số điện thoại <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="address">
                    Địa chỉ giao hàng
                  </label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="note">
                    Ghi chú
                  </label>
                  <textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition font-medium"
                >
                  Xác Nhận Đặt Hàng
                </button>
              </form>
            </div>
            
            {/* Thông tin thanh toán */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Thông tin thanh toán</h3>
              
              <div className="bg-red-50 p-4 rounded-md mb-6">
                <p className="font-medium text-red-600 mb-2">Tổng thanh toán: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</p>
                <p className="text-sm">Vui lòng chuyển khoản đúng số tiền và ghi chú số điện thoại của bạn</p>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Thông tin tài khoản ngân hàng</h4>
                
                <div className="mb-4">
                  <div className="mb-2 flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">Chủ tài khoản:</p>
                    <p>{bankInfo.accountName}</p>
                  </div>
                  
                  <div className="mb-2 flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">Số tài khoản:</p>
                    <div className="flex items-center">
                      <p className="mr-2 font-medium">{bankInfo.accountNumber}</p>
                      <button 
                        onClick={copyAccountNumber}
                        className="text-blue-500 hover:text-blue-700"
                        title="Sao chép số tài khoản"
                      >
                        {copied ? <FaCheck size={16} className="text-green-500" /> : <FaCopy size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-2 flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">Ngân hàng:</p>
                    <p>{bankInfo.bank}</p>
                  </div>
                  
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">Chi nhánh:</p>
                    <p>{bankInfo.branch}</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="bg-white p-2 border border-gray-200 rounded-md h-64 w-64 relative flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <img
                        src={getAssetPath(bankInfo.qrCode)}
                        alt="Mã QR thanh toán"
                        className="object-contain h-full w-full"
                        onError={(e) => {
                          e.currentTarget.src = getAssetPath('/images/qr-placeholder.png');
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <p className="text-center text-sm mt-3 text-gray-500">
                  Quét mã QR để thanh toán
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h4 className="font-semibold text-yellow-700 mb-2">Lưu ý:</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                  <li>Đơn hàng sẽ được xác nhận sau khi chúng tôi nhận được thanh toán</li>
                  <li>Vui lòng kiểm tra kỹ thông tin trước khi thanh toán</li>
                  <li>Mọi thắc mắc xin liên hệ Hotline: <span className="font-semibold">0987 654 321</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 