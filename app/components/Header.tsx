'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaUserAlt, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

// Interface for search result items
interface SearchResult {
  id: number;
  name: string;
}

// Tách riêng phần CartIcon thành một component riêng để tránh hydration mismatch
function CartIcon() {
  const { itemCount } = useCart();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <Link href="/cart" className="text-gray-700 hover:text-red-600 relative" key="cart-icon">
      <FaShoppingCart size={24} />
      {mounted && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Xử lý click bên ngoài kết quả tìm kiếm để đóng dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Xử lý khi gõ vào ô tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 1) {
      setShowSearchResults(true);
      // Trong dự án thực tế, bạn sẽ gọi API tìm kiếm ở đây
      // Hiện tại, chúng ta sẽ để trống kết quả tìm kiếm
      setSearchResults([]);
    } else {
      setShowSearchResults(false);
    }
  };

  // Xử lý khi submit form tìm kiếm
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchResults(false);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-16">
              <Image 
                src="/images/tho-gio-logo.svg" 
                alt="Tho Giò Logo" 
                fill 
                className="object-contain"
                priority
                unoptimized={true}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium" key="home">
              Trang Chủ
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-red-600 font-medium" key="products">
              Sản Phẩm
            </Link>
            <Link href="/promotions" className="text-gray-700 hover:text-red-600 font-medium" key="promotions">
              Khuyến Mãi
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium" key="about">
              Về Chúng Tôi
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium" key="contact">
              Liên Hệ
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <CartIcon />
            <Link href="/account" className="text-gray-700 hover:text-red-600" key="account-icon">
              <FaUserAlt size={22} />
            </Link>
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-inner">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
              key="mobile-home"
            >
              Trang Chủ
            </Link>
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
              key="mobile-products"
            >
              Sản Phẩm
            </Link>
            <Link 
              href="/promotions" 
              className="text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
              key="mobile-promotions"
            >
              Khuyến Mãi
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
              key="mobile-about"
            >
              Về Chúng Tôi
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
              key="mobile-contact"
            >
              Liên Hệ
            </Link>
          </nav>
          {/* Mobile Search */}
          <div className="mt-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-red-50 py-3 hidden md:block" ref={searchRef}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm thịt heo..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-full"
              >
                Tìm Kiếm
              </button>
            </form>
            
            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 max-w-2xl mx-auto mt-1 bg-white rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <ul className="py-2">
                    {searchResults.map((result) => (
                      <li key={result.id} className="px-4 py-2 hover:bg-gray-100">
                        <Link href={`/products/${result.id}`} className="block" onClick={() => setShowSearchResults(false)}>
                          {result.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {searchQuery.length > 1 ? 'Không tìm thấy kết quả phù hợp' : 'Nhập ít nhất 2 ký tự để tìm kiếm'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 