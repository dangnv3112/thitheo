'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaImage } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';
import { Product } from '../utils/excelHandler';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  
  // Cập nhật đường dẫn hình ảnh mỗi khi product thay đổi
  useEffect(() => {
    // Thêm timestamp để tránh cache
    const timestamp = Date.now();
    // Kiểm tra nếu đường dẫn ảnh đã có tham số truy vấn
    const hasQueryParams = product.image.includes('?');
    const newImageSrc = hasQueryParams 
      ? `${product.image}&t=${timestamp}` 
      : `${product.image}?t=${timestamp}`;
    
    console.log(`[ProductCard] Setting image src for ${product.name}: ${newImageSrc}`);
    setImageSrc(newImageSrc);
    setImageError(false); // Reset lỗi ảnh khi product thay đổi
  }, [product]);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    addToCart(product, 1);
    
    // Reset sau 1 giây
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleImageError = () => {
    console.log(`[ProductCard] Image error for ${product.name}: ${imageSrc}`);
    setImageError(true);
  };

  const displayPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice !== null && product.discountPrice > 0;
  const discountPercent = hasDiscount && product.discountPrice !== null
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden group relative h-full flex flex-col">
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold z-10">
            -{discountPercent}%
          </div>
        )}
        
        <div className="relative w-full pt-[100%]">
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <FaImage className="text-gray-400 text-5xl" />
            </div>
          ) : (
            <Image
              src={imageSrc || '/images/products/product-placeholder.svg'}
              alt={product.name}
              fill
              className="object-cover object-center group-hover:scale-105 transition duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={handleImageError}
              priority={false}
              unoptimized={true} // Tắt tối ưu hóa để tránh cache của Next.js
            />
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 h-14">
            {product.name}
          </h3>
          
          <p className="text-gray-500 text-sm mb-2">{product.unit}</p>
          
          <div className="mt-auto">
            {hasDiscount && (
              <p className="text-gray-500 line-through text-sm">
                {formatCurrency(product.price)}
              </p>
            )}
            
            <div className="flex justify-between items-center mt-1">
              <p className="text-red-600 font-bold text-lg">
                {formatCurrency(displayPrice)}
              </p>
              
              <button
                onClick={handleAddToCart}
                className={`p-2 rounded ${
                  isAdding 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                } transition`}
                aria-label="Thêm vào giỏ hàng"
              >
                {isAdding ? 'Đã thêm' : <FaShoppingCart />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}