'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../components/ProductCard';
import { getProducts, Product } from '../utils/excelHandler';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

// Component chính bọc trong Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}

// Component con sử dụng useSearchParams
function SearchResults() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        
        // Filter products based on search query
        const filtered = allProducts.filter((product) => {
          const query = searchQuery.toLowerCase();
          return (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
          );
        });
        
        setProducts(filtered);
        setError('');
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Có lỗi xảy ra khi tìm kiếm sản phẩm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [searchQuery]);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Kết Quả Tìm Kiếm: "{searchQuery}"</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <FaSearch className="mx-auto text-gray-400 text-5xl mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Không tìm thấy sản phẩm nào phù hợp</h2>
          <p className="text-gray-500 mb-6">Vui lòng thử lại với từ khóa khác hoặc duyệt qua danh mục sản phẩm của chúng tôi.</p>
          <Link 
            href="/products" 
            className="bg-red-600 text-white px-6 py-3 rounded-lg inline-block hover:bg-red-700 transition"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>
      ) : (
        <div>
          <p className="mb-6 text-gray-600">Tìm thấy {products.length} sản phẩm</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 