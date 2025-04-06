'use client';

import { useState, useEffect } from 'react';
import { FaUser, FaHistory, FaHeart, FaSignOutAlt, FaKey } from 'react-icons/fa';
import Link from 'next/link';

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function UserPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Thêm logic đăng nhập ở đây - giả lập người dùng đăng nhập
  useEffect(() => {
    // Kiểm tra nếu có thông tin người dùng trong localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);
  
  // Hàm đăng nhập
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Giả lập đăng nhập thành công
    const mockUser: UserData = {
      id: 1,
      name: 'Người Dùng',
      email: 'user@example.com',
      phone: '0901234567',
      address: '123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh'
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoggedIn(true);
  };
  
  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };
  
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Đăng Nhập</h1>
        
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition"
            >
              Đăng nhập
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Chưa có tài khoản?{' '}
              <Link href="#" className="text-red-600 hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Tài Khoản Của Tôi</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <FaUser className="text-gray-500 text-2xl" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{user?.name}</h2>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>
            </div>
            
            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center w-full p-3 rounded-lg ${
                      activeTab === 'profile' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FaUser className="mr-3" />
                    Thông tin cá nhân
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`flex items-center w-full p-3 rounded-lg ${
                      activeTab === 'orders' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FaHistory className="mr-3" />
                    Lịch sử đơn hàng
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`flex items-center w-full p-3 rounded-lg ${
                      activeTab === 'wishlist' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FaHeart className="mr-3" />
                    Sản phẩm yêu thích
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('password')}
                    className={`flex items-center w-full p-3 rounded-lg ${
                      activeTab === 'password' ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FaKey className="mr-3" />
                    Đổi mật khẩu
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <FaSignOutAlt className="mr-3" />
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 pb-4 border-b">Thông Tin Cá Nhân</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Họ và tên</label>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Email</label>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Số điện thoại</label>
                    <p className="font-medium">{user?.phone}</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Địa chỉ</label>
                    <p className="font-medium">{user?.address}</p>
                  </div>
                </div>
                
                <button className="mt-8 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition">
                  Cập nhật thông tin
                </button>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 pb-4 border-b">Lịch Sử Đơn Hàng</h2>
                
                <div className="text-center py-12">
                  <FaHistory className="mx-auto text-gray-300 text-5xl mb-4" />
                  <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 pb-4 border-b">Sản Phẩm Yêu Thích</h2>
                
                <div className="text-center py-12">
                  <FaHeart className="mx-auto text-gray-300 text-5xl mb-4" />
                  <p className="text-gray-500">Bạn chưa có sản phẩm yêu thích nào.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'password' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 pb-4 border-b">Đổi Mật Khẩu</h2>
                
                <form className="max-w-md">
                  <div className="mb-4">
                    <label htmlFor="current-password" className="block text-gray-700 font-medium mb-2">
                      Mật khẩu hiện tại
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="new-password" className="block text-gray-700 font-medium mb-2">
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-2">
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                  >
                    Cập nhật mật khẩu
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}