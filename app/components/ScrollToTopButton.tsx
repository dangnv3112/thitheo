'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Kiểm tra vị trí cuộn để hiển thị/ẩn nút
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Xử lý sự kiện khi click vào nút
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Thêm event listener khi component mount
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out z-50"
          aria-label="Cuộn lên đầu trang"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
} 