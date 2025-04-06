'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCartPlus, FaFilter, FaTimes, FaSearch } from 'react-icons/fa';
import { getProducts, Product } from '../utils/excelHandler';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';

// Categories for filter
const categories = [
  { id: 'all', name: 'Tất cả sản phẩm' },
  { id: 'thit-heo-tuoi', name: 'Thịt heo tươi' },
  { id: 'thit-heo-dong-lanh', name: 'Thịt heo đông lạnh' },
  { id: 'thit-heo-che-bien', name: 'Thịt heo chế biến' },
  { id: 'combo-tiet-kiem', name: 'Combo tiết kiệm' },
];

// Sort options
const sortOptions = [
  { value: 'default', label: 'Mặc định' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'name-asc', label: 'Tên: A-Z' },
  { value: 'name-desc', label: 'Tên: Z-A' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const { addToCart } = useCart();
  
  // Tải dữ liệu sản phẩm từ Excel
  useEffect(() => {
    let isMounted = true;
    
    async function loadProducts() {
      try {
        console.log('[ProductsPage] Attempting to load products from Excel');
        const allProducts = await getProducts();
        
        if (!isMounted) return;

        if (allProducts && allProducts.length > 0) {
          console.log('[ProductsPage] Loaded products:', allProducts.length);
          setProducts(allProducts);
        } else {
          // Giữ nguyên danh sách rỗng nếu không có sản phẩm
          console.warn('[ProductsPage] No products found from API');
        }
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    loadProducts();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageError = (productId: number) => {
    console.log(`[ProductsPage] Image error for product ${productId}`);
    setImageError(prev => ({ ...prev, [productId]: true }));
  };

  // Filter products based on search, category, price range, and stock status
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (product.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const price = product.discountPrice !== null ? product.discountPrice : product.price;
    const matchesPriceRange = price >= priceRange[0] && price <= priceRange[1];
    const matchesStock = inStockOnly ? product.inStock : true;
    
    return matchesSearch && matchesCategory && matchesPriceRange && matchesStock;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discountPrice !== null ? a.discountPrice : a.price;
    const priceB = b.discountPrice !== null ? b.discountPrice : b.price;
    
    switch (sortBy) {
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('default');
    setPriceRange([0, 300000]);
    setInStockOnly(false);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Sản Phẩm</h1>
      
      {/* Search and Filter Controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center mb-4 gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Sort */}
          <div className="md:w-64">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Filter toggle button for mobile */}
          <button
            className="md:hidden flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? (
              <>
                <FaTimes className="mr-2" /> Đóng bộ lọc
              </>
            ) : (
              <>
                <FaFilter className="mr-2" /> Bộ lọc
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block bg-white p-4 rounded-lg shadow-md h-fit`}>
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Danh mục</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    className={`w-full text-left py-1 px-2 rounded ${
                      selectedCategory === category.id ? 'bg-red-100 text-red-600 font-medium' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Giá</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span>{formatCurrency(priceRange[0])}</span>
                <span>{formatCurrency(priceRange[1])}</span>
              </div>
              <div className="flex gap-4">
                <input
                  type="range"
                  min="0"
                  max="300000"
                  step="10000"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(e, 0)}
                  className="w-full accent-red-600"
                />
                <input
                  type="range"
                  min="0"
                  max="300000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(e, 1)}
                  className="w-full accent-red-600"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={() => setInStockOnly(!inStockOnly)}
                className="form-checkbox rounded text-red-600"
              />
              <span>Chỉ hiển thị sản phẩm còn hàng</span>
            </label>
          </div>
          
          <button
            onClick={resetFilters}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Đặt lại bộ lọc
          </button>
        </div>
        
        {/* Products Grid */}
        <div className="md:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">Không tìm thấy sản phẩm phù hợp với bộ lọc của bạn.</p>
              <button
                onClick={resetFilters}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => {
                const displayPrice = product.discountPrice !== null ? product.discountPrice : product.price;
                const hasDiscount = product.discountPrice !== null && product.discountPrice > 0;
                const discountPercent = hasDiscount
                  ? Math.round(((product.price - (product.discountPrice as number)) / product.price) * 100)
                  : 0;
                
                return (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <Link href={`/products/${product.id}`}>
                      <div className="relative h-48 w-full">
                        {imageError[product.id] ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <FaSearch className="text-gray-400 text-5xl" />
                          </div>
                        ) : (
                          <Image
                            src={product.image || '/images/products/product-placeholder.svg'}
                            alt={product.name}
                            fill
                            className="object-contain p-4"
                            onError={() => handleImageError(product.id)}
                            unoptimized={true}
                          />
                        )}
                        {hasDiscount && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                            -{discountPercent}% Giảm
                          </div>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">Hết Hàng</span>
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg mb-1 hover:text-red-600 transition-colors">{product.name}</h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-2">{product.unit}</p>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          {hasDiscount ? (
                            <>
                              <span className="font-bold text-red-600 mr-2">{formatCurrency(displayPrice)}</span>
                              <span className="text-gray-500 text-sm line-through">{formatCurrency(product.price)}</span>
                            </>
                          ) : (
                            <span className="font-bold text-red-600">{formatCurrency(product.price)}</span>
                          )}
                        </div>
                        
                        <button 
                          className={`p-2 rounded-full ${product.inStock ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                          disabled={!product.inStock}
                          onClick={(e) => product.inStock && handleAddToCart(e, product)}
                        >
                          <FaCartPlus size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 