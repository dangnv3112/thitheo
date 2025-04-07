'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Kiểm tra vị trí cuộn để hiển thị/ẩn nút và cập nhật tiến trình cuộn
  const toggleVisibility = () => {
    // Tính toán phần trăm cuộn trang
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentProgress = scrollHeight > 0 
      ? Math.min(Math.round((window.scrollY / scrollHeight) * 100), 100) 
      : 0;
    
    setScrollProgress(currentProgress);
    
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Xử lý sự kiện khi click vào nút
  const scrollToTop = () => {
    // Thêm class để tạo hiệu ứng bắn lên
    document.body.classList.add('scroll-smooth');
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    
    // Sau khi cuộn xong, xóa class
    setTimeout(() => {
      document.body.classList.remove('scroll-smooth');
    }, 1000);
  };

  // Thêm event listener khi component mount
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 opacity-100">
      <div className="relative">
        {/* Circular progress */}
        <svg className="w-14 h-14" viewBox="0 0 100 100">
          <circle 
            className="text-gray-200" 
            strokeWidth="8" 
            stroke="currentColor" 
            fill="transparent" 
            r="40" 
            cx="50" 
            cy="50" 
          />
          <circle 
            className="text-red-600 transition-all duration-300" 
            strokeWidth="8" 
            strokeDasharray={circumference} 
            strokeDashoffset={circumference - (scrollProgress / 100) * circumference} 
            strokeLinecap="round" 
            stroke="currentColor" 
            fill="transparent" 
            r="40" 
            cx="50" 
            cy="50" 
          />
        </svg>
        
        {/* Button inside the progress circle */}
        <button
          onClick={scrollToTop}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-red-600 hover:text-red-700 p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out"
          aria-label="Cuộn lên đầu trang"
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FaArrowUp className="text-xl" />
        </button>
      </div>
      
      {/* Tooltip */}
      <span className="absolute bottom-16 right-0 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Về đầu trang
      </span>
    </div>
  );
}

// Constant for SVG circle circumference
const circumference = 2 * Math.PI * 40; 