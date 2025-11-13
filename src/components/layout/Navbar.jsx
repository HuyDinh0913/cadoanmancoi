import React, { useState, useContext } from 'react';
// SỬA 1: Import <Link>, <NavLink> (để làm nổi bật link active) và <useNavigate>
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { MenuIcon, XIcon, UserIcon } from '../../utils/icons';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // SỬA 2: Chỉ lấy `isLoggedIn` và `logout` từ Context.
  // Xóa `Maps` và `activePage` vì React Router sẽ quản lý.
  const { isLoggedIn, logout } = useContext(AppContext);

  // SỬA 3: Lấy hàm navigate "thật" từ React Router.
  const navigate = useNavigate();

  // SỬA 4: Đổi `page` (tên state) thành `path` (đường dẫn URL)
  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Giới Thiệu', path: '/about' },
    { name: 'Hoạt Động', path: '/activities' },
    { name: 'Góc Âm Nhạc', path: '/music' },
    { name: 'Tìm Bài Hát', path: '/song-search' },
    { name: 'Lịch Phụng Vụ', path: '/liturgical-calendar' },
    { name: 'Liên Hệ', path: '/contact' },
  ];

  // SỬA 5: Xóa bỏ hoàn toàn component <NavLink> tùy chỉnh.
  // Chúng ta sẽ dùng <NavLink> của React Router trực tiếp.

  return (
    <nav className="bg-cream shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Title */}
          <div className="flex-shrink-0">
            {/* SỬA 6: Dùng <Link> thay vì <a> và `onClick` */}
            <Link
              to="/"
              className="text-3xl font-bold font-serif text-navy-900 hover:text-gold-600 transition-colors tracking-wide"
            >
              Ca Đoàn Mân Côi
            </Link>
          </div>

          {/* Nav Links (Desktop) - Căn giữa */}
          <div className="hidden md:flex flex-grow items-center justify-center">
            <div className="flex items-center space-x-2">
              {/* SỬA 7: Dùng <NavLink> của React Router và "children as a function" */}
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  // `end` để "Trang Chủ" không bị active khi ở trang con
                  end={link.path === '/'} 
                  className="relative" // Đặt 'relative' trên wrapper
                >
                  {/* Dùng hàm này để `isActive` có thể điều khiển cả text VÀ gạch chân */}
                  {({ isActive }) => (
                    <>
                      <span
                        className={`block font-medium ${
                          isActive ? 'text-gold-600' : 'text-navy-700'
                        } hover:text-gold-600 transition-colors duration-200 px-3 py-2 rounded-md text-center`}
                      >
                        {link.name}
                      </span>
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gold-600 transition-all duration-300 ${
                          isActive ? 'w-4/5' : 'w-0' // <-- Tự động xử lý active
                        }`}
                      ></span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* User Auth Section (Giữ nguyên ở bên phải) */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center">
              {isLoggedIn ? (
                // --- KHI ĐÃ ĐĂNG NHẬP ---
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    onBlur={() => setTimeout(() => setIsProfileMenuOpen(false), 200)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-600"
                    aria-label="Mở menu người dùng"
                  >
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src="https://placehold.co/40x40/B08F5A/FFFFFF?text=A"
                      alt="Avatar"
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                      {/* SỬA 8: Dùng <Link> cho "Góc Thành Viên" */}
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-navy-700 hover:bg-gray-100 transition-colors"
                      >
                        Góc Thành Viên
                      </Link>
                      {/* SỬA 9: Sửa `onClick` của "Đăng xuất" */}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          logout(); // Gọi hàm logout
                          navigate('/'); // Tự điều hướng về trang chủ
                          setIsProfileMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-navy-700 hover:bg-gray-100 transition-colors"
                      >
                        Đăng xuất
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                // --- KHI CHƯA ĐĂNG NHẬP ---
                <div className="relative group">
                  {/* SỬA 10: Dùng navigate() của router với đúng path */}
                  <button
                    onClick={() => navigate('/login')}
                    className="w-10 h-10 flex items-center justify-center bg-gold-600 rounded-full hover:bg-gold-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-600"
                    aria-label="Đăng nhập"
                  >
                    <UserIcon className="h-5 w-5 text-white transition-colors duration-300" />
                  </button>
                  <div className="absolute top-full right-0 mt-2 p-2 bg-navy-900 text-white text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none z-50">
                    Đăng nhập
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button (Giữ nguyên) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-navy-700 hover:text-gold-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* SỬA 11: Dùng <NavLink> cho các link mobile */}
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setIsMobileMenuOpen(false)} // Giữ lại
              // Dùng function className để xử lý active
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'text-gold-600 bg-gray-100'
                    : 'text-navy-700'
                } hover:text-gold-600 hover:bg-gray-50`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 px-2">
          {isLoggedIn ? (
            <>
              {/* SỬA 12: Dùng <Link> cho "Góc Thành Viên" */}
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-navy-700 hover:text-gold-600 hover:bg-gray-50"
              >
                Góc Thành Viên
              </Link>
              {/* SỬA 13: Sửa `onClick` của "Đăng xuất" */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  navigate('/'); // Thêm điều hướng
                  setIsMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-navy-700 hover:text-gold-600 hover:bg-gray-50"
              >
                Đăng xuất
              </a>
            </>
          ) : (
            /* SỬA 14: Dùng <Link> cho "Đăng Nhập" */
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center justify-center px-4 py-3 rounded-md text-base font-medium text-white bg-gold-600 hover:bg-gold-700 transition-colors"
            >
              <UserIcon className="h-5 w-5 mr-2" />
              Đăng Nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
