import { getProducts } from './utils/excelHandler';

// Hàm này sẽ được export và sử dụng cho tất cả các dynamic routes
export async function generateProductStaticParams() {
  try {
    const products = await getProducts();
    
    return products.map((product) => ({
      id: String(product.id),
    }));
  } catch (error) {
    console.error('Error generating static params for products:', error);
    // Fallback với một số ID cơ bản
    return [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' }
    ];
  }
}
