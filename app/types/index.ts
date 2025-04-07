import { Product } from '../utils/excelHandler';

// Interface cho item trong giỏ hàng
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Interface cho đơn hàng
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface OrderData {
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  total: number;
  orderDate: string;
  items: OrderItem[];
} 