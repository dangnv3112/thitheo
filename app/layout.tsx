import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import ScrollToTopButton from './components/ScrollToTopButton';
import type { Metadata } from "next";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Thỏ Giò - Đặc Sản Cây Nhà Lá Vườn',
  description: 'Thực phẩm sạch từ nông trại gia đình, đảm bảo chất lượng và an toàn',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning className={inter.className}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollToTopButton />
        </CartProvider>
      </body>
    </html>
  );
}
