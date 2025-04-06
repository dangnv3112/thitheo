import { getProducts } from '../../utils/excelHandler';

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    
    return products.map((product) => ({
      id: String(product.id),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Trả về một mảng rỗng nếu có lỗi
    return [];
  }
}
