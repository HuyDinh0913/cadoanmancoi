// file: src/components/layout/ProtectedRoute.jsx (TẠO MỚI)
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AppContext);

  // Nếu đã đăng nhập, cho phép render các trang con (Dashboard)
  // <Outlet> ở đây sẽ render <MemberDashboard />
  if (isLoggedIn) {
    return <Outlet />;
  }

  // Nếu chưa đăng nhập, tự động chuyển hướng về trang /login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;