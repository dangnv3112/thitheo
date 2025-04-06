'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
import { getCategories, Category } from '../utils/excelHandler';

// Fallback categories nếu không load được từ file Excel
const fallbackCategories: Category[] = [
  {
    id: 1,
    name: 'Thịt Heo Tươi',
    slug: 'thit-heo-tuoi',
    description: 'Thịt heo tươi ngon, được đảm bảo nguồn gốc và an toàn thực phẩm',
    image: '/images/categories/thitheotuoi.png'
  },
  {
    id: 2,
    name: 'Thịt Heo Đông Lạnh',
    slug: 'thit-heo-dong-lanh',
    description: 'Thịt heo đông lạnh giữ nguyên dưỡng chất và hương vị',
    image: '/images/categories/donglanh.jpg'
  },
  {
    id: 3,
    name: 'Thịt Heo Chế Biến',
    slug: 'thit-heo-che-bien',
    description: 'Các sản phẩm từ thịt heo đã được sơ chế và chế biến sẵn',
    image: '/images/categories/bachi.jpg'
  },
  {
    id: 4,
    name: 'Sản Phẩm Đặc Biệt',
    slug: 'san-pham-dac-biet',
    description: 'Các sản phẩm đặc biệt và cao cấp từ thịt heo',
    image: '/images/categories/suon-non.jpg'
  },
  {
    id: 5,
    name: 'Xương Heo',
    slug: 'xuong-heo',
    description: 'Xương heo tươi ngon, thích hợp để nấu nước dùng hoặc hầm',
    image: '/images/categories/xuongheo.jpg'
  }
];

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string | number, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        console.log('[CategoryGrid] Attempting to load categories');
        const loadedCategories = await getCategories();
        console.log('[CategoryGrid] Loaded categories:', loadedCategories.length);
        
        if (loadedCategories.length > 0) {
          setCategories(loadedCategories);
        } else {
          console.log('[CategoryGrid] No categories found, using fallback');
          setCategories(fallbackCategories);
        }
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Không thể tải danh mục sản phẩm.');
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    // Set timeout để chuyển sang dữ liệu fallback nếu loading quá lâu
    const timeoutId = setTimeout(() => {
      if (loading && categories.length === 0) {
        console.log('[CategoryGrid] Loading timeout, using fallback');
        setCategories(fallbackCategories);
        setLoading(false);
      }
    }, 5000);

    loadCategories();

    // Cleanup timeout
    return () => clearTimeout(timeoutId);
  }, [loading]);

  // Handle image error
  const handleImageError = (categoryId: string | number) => {
    console.log(`[CategoryGrid] Image error for category ID ${categoryId}`);
    // Thử tìm danh mục trong fallbackCategories
    const fallbackCategory = fallbackCategories.find(c => c.id == categoryId);
    if (fallbackCategory && fallbackCategory.image) {
      console.log(`[CategoryGrid] Using fallback image for category ID ${categoryId}: ${fallbackCategory.image}`);
      // Cập nhật danh mục với hình ảnh từ fallbackCategories
      setCategories(prevCategories => 
        prevCategories.map(c => 
          c.id == categoryId 
            ? {...c, image: fallbackCategory.image} 
            : c
        )
      );
    } else {
      // Nếu không tìm thấy, đánh dấu lỗi
      setImageErrors(prev => ({...prev, [categoryId]: true}));
    }
  };

  // Xử lý đường dẫn hình ảnh để hoạt động với basePath
  const getImagePath = (path: string | undefined) => {
    if (!path) return '/images/categories/product-placeholder.svg';
    
    // Loại bỏ tham số query nếu có
    const cleanPath = path.split('?')[0];
    
    // Kiểm tra xem đường dẫn đã có /thitheo chưa
    if (cleanPath.startsWith('/thitheo/')) {
      return cleanPath;
    }
    
    // Với môi trường development, trả về đường dẫn không có /thitheo
    return cleanPath;
  };

  // Hiển thị loading spinner khi chưa mount hoặc đang loading
  if (!mounted || (loading && categories.length === 0)) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Danh Mục Sản Phẩm</h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Danh Mục Sản Phẩm</h2>
      
      {error && (
        <div className="text-red-600 text-center mb-6">{error}</div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map(category => (
          <Link 
            key={category.id} 
            href={`/products?category=${category.slug}`}
            className="relative overflow-hidden rounded-lg shadow-md group h-64"
          >
            {imageErrors[category.id] ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <FaImage className="text-gray-400 text-5xl" />
              </div>
            ) : (
              <img
                src={getImagePath(category.image)}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition duration-300"
                onError={() => handleImageError(category.id)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-gray-200 line-clamp-2">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 