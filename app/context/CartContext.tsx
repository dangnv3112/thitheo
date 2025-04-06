'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product } from '../utils/excelHandler';

// Define cart item interface
interface CartItem {
  product: Product;
  quantity: number;
}

// Define cart interface
interface Cart {
  items: CartItem[];
  total: number;
}

// Define cart context interface
interface CartContextType {
  cart: Cart;
  itemCount: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider props interface
interface CartProviderProps {
  children: ReactNode;
}

// Provider component
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [itemCount, setItemCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Khi component mount, lấy giỏ hàng từ localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('thogio_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        calculateItemCount(parsedCart.items);
      } catch (error) {
        console.error('Error parsing cart data from localStorage:', error);
        setCart({ items: [], total: 0 });
      }
    }
    setMounted(true);
  }, []);
  
  // Lưu giỏ hàng vào localStorage khi có thay đổi
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('thogio_cart', JSON.stringify(cart));
    }
  }, [cart, mounted]);
  
  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const calculateItemCount = (items: CartItem[]) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
  };
  
  // Tính tổng giá trị giỏ hàng
  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };
  
  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product: Product, quantity: number) => {
    if (quantity <= 0) return;
    
    setCart(currentCart => {
      // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
      const existingItemIndex = currentCart.items.findIndex(
        item => item.product.id === product.id
      );
      
      let newItems = [...currentCart.items];
      
      if (existingItemIndex >= 0) {
        // Nếu sản phẩm đã có, cập nhật số lượng
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Nếu chưa có, thêm mới
        newItems.push({ product, quantity });
      }
      
      const newCart = {
        items: newItems,
        total: calculateTotal(newItems)
      };
      
      calculateItemCount(newItems);
      return newCart;
    });
  };
  
  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId: number) => {
    setCart(currentCart => {
      const newItems = currentCart.items.filter(item => item.product.id !== productId);
      
      const newCart = {
        items: newItems,
        total: calculateTotal(newItems)
      };
      
      calculateItemCount(newItems);
      return newCart;
    });
  };
  
  // Cập nhật số lượng sản phẩm
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(currentCart => {
      const newItems = currentCart.items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      );
      
      const newCart = {
        items: newItems,
        total: calculateTotal(newItems)
      };
      
      calculateItemCount(newItems);
      return newCart;
    });
  };
  
  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCart({ items: [], total: 0 });
    setItemCount(0);
  };
  
  // Giá trị context
  const cartContextValue: CartContextType = {
    cart,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
  
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 