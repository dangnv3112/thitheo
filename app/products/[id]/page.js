import { getProducts } from '../../../utils/excelHandler';
import ClientPage from './page.client';

// Hàm này chạy ở server-side để tạo các tham số tĩnh cho trang
export async function generateStaticParams() {
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

// Component chính của trang (server component)
export default function Page({ params }) {
  // Render client component
  return <ClientPage />;
} 