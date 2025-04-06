'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaImage } from 'react-icons/fa';
import { getProducts, Product } from '../utils/excelHandler';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';

// Fallback products khi không load được dữ liệu
const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'Thịt đùi heo',
    price: 150000,
    discountPrice: 135000,
    description: 'Thịt đùi heo tươi ngon, thích hợp cho các món kho, xào, rán...',
    unit: '1kg',
    category: 'thit-heo-tuoi',
    image: '/images/products/WyEj4GfSGOpnl56GRCM4I8EkdkgXqpn4m0atOv59.jpeg',
    origin: 'Việt Nam',
    inStock: true,
    popular: true,
    storage: 'Bảo quản lạnh 2-5°C'
  },
  {
    id: 2,
    name: 'Thịt ba chỉ',
    price: 180000,
    discountPrice: null,
    description: 'Thịt ba chỉ tươi ngon với lớp mỡ vừa phải, thích hợp để nướng, quay...',
    unit: '1kg',
    category: 'thit-heo-tuoi',
    image: '/images/products/bachi.jpg',
    origin: 'Việt Nam',
    inStock: true,
    popular: true,
    storage: 'Bảo quản lạnh 2-5°C'
  },
  {
    id: 3,
    name: 'Sườn non',
    price: 200000,
    discountPrice: 180000,
    description: 'Sườn non mềm, nhiều thịt, thích hợp để nướng, kho, om...',
    unit: '1kg',
    category: 'thit-heo-tuoi',
    image: '/images/products/suon-non.jpg',
    origin: 'Việt Nam',
    inStock: true,
    popular: true,
    storage: 'Bảo quản lạnh 2-5°C'
  },
  {
    id: 4,
    name: 'Xương heo',
    price: 80000,
    discountPrice: null,
    description: 'Xương heo tươi ngon, thích hợp nấu nước dùng, súp...',
    unit: '1kg',
    category: 'thit-heo-tuoi',
    image: '/images/products/topmo.jpg',
    origin: 'Việt Nam',
    inStock: true,
    popular: true,
    storage: 'Bảo quản lạnh 2-5°C'
  }
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const { addToCart } = useCart();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log('[FeaturedProducts] Attempting to load products');
        const loadedProducts = await getProducts();
        console.log('[FeaturedProducts] Loaded products:', loadedProducts.length);

        if (loadedProducts.length > 0) {
          const featured = loadedProducts.filter(product => product.popular);
          
          if (featured.length > 0) {
            console.log('[FeaturedProducts] Featured products found:', featured.length);
            setProducts(featured.slice(0, 4)); // Chỉ lấy 4 sản phẩm nổi bật
          } else {
            console.log('[FeaturedProducts] No featured products found, using fallback');
            setProducts(fallbackProducts);
          }
        } else {
          console.log('[FeaturedProducts] No products loaded, using fallback');
          setProducts(fallbackProducts);
        }
      } catch (err) {
        console.error('Error loading featured products:', err);
        setError('Không thể tải danh sách sản phẩm nổi bật.');
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    // Set timeout để chuyển sang dữ liệu fallback nếu loading quá lâu
    const timeoutId = setTimeout(() => {
      if (loading && products.length === 0) {
        console.log('[FeaturedProducts] Loading timeout, using fallback');
        setProducts(fallbackProducts);
        setLoading(false);
      }
    }, 5000);

    loadProducts();

    // Cleanup timeout
    return () => clearTimeout(timeoutId);
  }, [loading]);

  // Handle adding a product to the cart
  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  // Handle image error
  const handleImageError = (productId: number) => {
    console.log(`[FeaturedProducts] Image error for product ID ${productId}`);
    // Thử tìm sản phẩm trong defaultProducts
    const defaultProduct = fallbackProducts.find(p => p.id === productId);
    if (defaultProduct && defaultProduct.image) {
      console.log(`[FeaturedProducts] Using fallback image for product ID ${productId}: ${defaultProduct.image}`);
      // Cập nhật sản phẩm với hình ảnh từ defaultProducts
      setProducts(prevProducts => 
        prevProducts.map(p => 
          p.id === productId 
            ? {...p, image: defaultProduct.image} 
            : p
        )
      );
    } else {
      // Nếu không tìm thấy, đánh dấu lỗi
      setImageErrors(prev => ({...prev, [productId]: true}));
    }
  };

  // Hiển thị loading spinner khi chưa mount hoặc đang loading
  if (!mounted || (loading && products.length === 0)) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Sản Phẩm Nổi Bật</h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Sản Phẩm Nổi Bật</h2>
      
      {error && (
        <div className="text-red-600 text-center mb-6">{error}</div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => {
          const displayPrice = product.discountPrice || product.price;
          const hasDiscount = product.discountPrice !== null && product.discountPrice < product.price;
          
          return (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <Link href={`/products/${product.id}`} className="block relative h-64">
                {imageErrors[product.id] ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <FaImage className="text-gray-400 text-5xl" />
                  </div>
                ) : (
                  <div className="relative w-full pb-[100%] overflow-hidden">
                    <img
                      src={product.image ? product.image.split('?')[0] : '/images/products/product-placeholder.svg'}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/products/product-placeholder.svg';
                      }}
                    />
                  </div>
                )}
                {hasDiscount && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                    Sale
                  </div>
                )}
              </Link>
              
              <div className="p-4">
                <Link href={`/products/${product.id}`} className="block">
                  <h3 className="text-lg font-semibold mb-2 hover:text-red-600">{product.name}</h3>
                </Link>
                
                <div className="flex justify-between items-end mb-4">
                  <div>
                    {hasDiscount && (
                      <span className="text-gray-500 line-through text-sm mr-2">
                        {formatCurrency(product.price)}
                      </span>
                    )}
                    <span className="text-xl font-bold text-red-600">
                      {formatCurrency(displayPrice)}
                    </span>
                    <span className="text-gray-500 text-sm">/{product.unit}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2 bg-red-600 text-white rounded flex items-center justify-center hover:bg-red-700 transition"
                >
                  <FaShoppingCart className="mr-2" />
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="text-center mt-8">
        <Link href="/products" className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Xem tất cả sản phẩm
        </Link>
      </div>
    </div>
  );
} 