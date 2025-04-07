'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import ScrollToTopButton from './components/ScrollToTopButton';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

// Hiệu ứng chuyển trang
const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -20 },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
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
            <AnimatePresence mode="wait">
              <motion.main 
                key={pathname}
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ type: 'linear', duration: 0.5 }}
                className="flex-grow"
              >
                {children}
              </motion.main>
            </AnimatePresence>
            <Footer />
            <ScrollToTopButton />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
