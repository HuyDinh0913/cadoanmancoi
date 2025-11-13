import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppContextProvider } from './context/AppContext.jsx';
import { GlobalStyles } from './styles/global.jsx';

// 1. Import các hàm router và file App
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'; // 👈 File App.jsx của bạn

// 2. Import TẤT CẢ các "Page" của bạn
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ActivitiesPage from './pages/ActivitiesPage.jsx';
import EventsCalendarPage from './pages/EventsCalendarPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import NewsDetailPage from './pages/NewsDetailPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import MusicPage from './pages/MusicPage.jsx';
import SongSearchPage from './pages/SongSearchPage.jsx';
import JoinPage from './pages/JoinPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MemberDashboard from './pages/MemberDashboard.jsx';
// (Import thêm component ProtectedRoute chúng ta sẽ tạo ở Bước 5)
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';

// 3. Tạo router - Đây là nơi thay thế switch statement của bạn
const router = createBrowserRouter([
  {
    // File App.jsx của bạn sẽ là "Layout" chính
    // Nó chứa Navbar, Footer và render các trang con
    path: '/',
    element: <App />, 
    children: [
      // Đây là các route tương ứng với 'case' của bạn
      { path: '/', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'activities', element: <ActivitiesPage /> },
      { path: 'events-calendar', element: <EventsCalendarPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'news/:slug', element: <NewsDetailPage /> }, // 👈 Dùng :slug cho route động
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'music', element: <MusicPage /> },
      { path: 'song-search', element: <SongSearchPage /> },
      { path: 'join', element: <JoinPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'liturgical-calendar', element: <LituryTable /> },
      
      // 4. Xử lý route được bảo vệ (MemberDashboard)
      {
        path: 'dashboard',
        element: <ProtectedRoute />, // 👈 Dùng wrapper này
        children: [
          // Các route con bên trong dashboard (nếu có)
          // Trang chính của dashboard
          { path: '', element: <MemberDashboard /> }, 
          // Ví dụ: { path: 'profile', element: <ProfilePage /> }
        ],
      },
    ],
  },
]);

// 5. Render ứng dụng
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ContextProvider vẫn cần để quản lý isLoggedIn */}
    <AppContextProvider>
      <GlobalStyles />
      {/* Cung cấp router cho ứng dụng, thay vì <App /> */}
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);
