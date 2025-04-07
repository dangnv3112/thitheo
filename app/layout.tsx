'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tho Giò - Thịt Heo Sạch, Tươi Ngon</title>
        <meta name="description" content="Tho Giò - Chuyên cung cấp thịt heo sạch, tươi ngon, chất lượng cao, giao hàng tận nơi" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
