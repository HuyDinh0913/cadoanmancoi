import React from 'react';
// 1. Import <Outlet> từ React Router
import { Outlet } from 'react-router-dom';

// Layout
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

/**
 * Component App chính
 * Giờ đây chỉ đóng vai trò là Layout chung (Navbar, Footer)
 * <Outlet> là nơi React Router sẽ render trang con (HomePage, AboutPage...)
 */
export default function App() {
  // 3. XÓA BỎ useContext và logic "currentPage"
  // const { currentPage, isLoggedIn } = useContext(AppContext);
  // const renderPage = () => { ... }; // XÓA BỎ toàn bộ hàm này

  return (
    <div className="min-h-screen flex flex-col bg-cream text-navy-900">
      {/* Navbar */}
      <Navbar />

      {/* 4. <Outlet /> là cổng để React Router 
        tự động render component trang đúng 
        (dựa trên URL) vào đây.
      */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}