'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProducts, Product } from '../../utils/excelHandler';
import { FaArrowLeft, FaShoppingCart, FaImage } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/format';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [mounted, setMounted] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const products = await getProducts();
        const foundProduct = products.find(p => p.id === Number(id));
        
        if (foundProduct) {
          console.log(`[ProductDetail] Product found: ${foundProduct.name}`);
          console.log(`[ProductDetail] Original image path: ${foundProduct.image}`);
          
          // Đảm bảo đường dẫn hình ảnh đúng
          let newImageSrc = foundProduct.image;
          if (!newImageSrc.startsWith('/')) {
            newImageSrc = '/' + newImageSrc;
          }
          
          console.log(`[ProductDetail] Updated image path: ${newImageSrc}`);
          setImageSrc(newImageSrc);
          
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProduct();
  }, [id]);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setQuantity(1);
      // Thông báo đã thêm vào giỏ hàng (có thể thêm toast notification ở đây)
    }
  };
  
  const handleImageError = () => {
    console.log(`[ProductDetail] Image error: ${imageSrc}`);
    setImageError(true);
  };

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h1>
          <Link href="/products" className="text-red-600 flex items-center justify-center">
            <FaArrowLeft className="mr-2" />
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  // Giá hiển thị (giá giảm nếu có, nếu không thì giá gốc)
  const displayPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice !== null && product.discountPrice > 0;
  
  // Tính phần trăm giảm giá
  const discountPercent = hasDiscount && product.discountPrice !== null
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/products" className="inline-flex items-center text-red-600 mb-8">
        <FaArrowLeft className="mr-2" />
        Quay lại danh sách sản phẩm
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative h-96 md:h-full rounded-lg overflow-hidden">
            {imageError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <FaImage className="text-gray-400 text-5xl" />
              </div>
            ) : (
              <img
                src={imageSrc ? imageSrc.split('?')[0].replace('/public/', '/') : '/images/products/product-placeholder.svg'}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover object-center"
                onError={handleImageError}
              />
            )}
            
            {hasDiscount && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-lg font-bold">
                -{discountPercent}%
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="space-y-6">
              {/* Price */}
              <div>
                {hasDiscount && (
                  <span className="line-through text-gray-500 mr-3">{formatCurrency(product.price)}</span>
                )}
                <span className="text-2xl font-bold text-red-600">{formatCurrency(displayPrice)}</span>
                <span className="ml-2 text-gray-600">/ {product.unit}</span>
              </div>
              
              {/* Description */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              {/* Quantity */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Số lượng</h2>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 rounded-l border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <div className="w-14 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 rounded-r border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition"
              >
                <FaShoppingCart className="mr-2" />
                Thêm vào giỏ hàng
              </button>
              
              {/* Product Details */}
              <div className="border-t pt-6 mt-6">
                <h2 className="text-lg font-semibold mb-3">Thông tin chi tiết</h2>
                
                <div className="grid grid-cols-1 gap-2">
                  <div className="grid grid-cols-2">
                    <span className="text-gray-600">Xuất xứ:</span>
                    <span>{product.origin || 'Việt Nam'}</span>
                  </div>
                  
                  <div className="grid grid-cols-2">
                    <span className="text-gray-600">Đóng gói:</span>
                    <span>{product.unit}</span>
                  </div>
                  
                  <div className="grid grid-cols-2">
                    <span className="text-gray-600">Bảo quản:</span>
                    <span>{product.storage || 'Bảo quản lạnh 2-5°C'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 