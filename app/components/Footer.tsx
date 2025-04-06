import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { getCompanyInfo } from '../utils/excelHandler';
import { getAssetPath } from '../utils/paths';

export default function Footer() {
  return (
    <footer className="bg-red-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center mb-4">
              <div className="relative w-48 h-16">
                <Image 
                  src={getAssetPath('/images/tho-gio-logo-white.svg')} 
                  alt="Tho Giò Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="mb-4">
              Tho Giò cung cấp các sản phẩm thịt heo tươi ngon, sạch, đảm bảo an toàn vệ sinh thực phẩm, 
              được kiểm soát nghiêm ngặt từ khâu chăn nuôi đến khi đến tay người tiêu dùng.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com/thogio" target="_blank" rel="noopener noreferrer" className="hover:text-red-300">
                <FaFacebook size={24} />
              </Link>
              <Link href="https://zalo.me/thogio" target="_blank" rel="noopener noreferrer" className="hover:text-red-300">
                <SiZalo size={24} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-red-700 pb-2">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="hover:text-red-300">Sản Phẩm</Link>
              </li>
              <li>
                <Link href="/promotions" className="hover:text-red-300">Khuyến Mãi</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-300">Về Chúng Tôi</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-red-300">Tin Tức</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-red-300">Câu Hỏi Thường Gặp</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-red-700 pb-2">Dịch Vụ Khách Hàng</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping-policy" className="hover:text-red-300">Chính Sách Giao Hàng</Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-red-300">Chính Sách Đổi Trả</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-red-300">Chính Sách Bảo Mật</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-red-300">Điều Khoản Dịch Vụ</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-300">Liên Hệ</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-red-700 pb-2">Thông Tin Liên Hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>123 Nguyễn Văn A, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <a href="tel:0987654321" className="hover:text-red-300">0987 654 321</a>
              </li>
              <li className="flex items-center">
                <MdEmail className="mr-2" />
                <a href="mailto:info@thogio.vn" className="hover:text-red-300">info@thogio.vn</a>
              </li>
              <li className="flex items-center">
                <FaClock className="mr-2" />
                <span>08:00 - 22:00 (Tất cả các ngày)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-red-950 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Tho Giò. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
} 