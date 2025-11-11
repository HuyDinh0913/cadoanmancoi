import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {
  FormInput,
  PrimaryButton,
} from '../components/common/UIElements';

// Component Form Đăng Nhập
const LoginForm = () => {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Hàm login trong context sẽ xử lý API
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Email hoặc mật khẩu không đúng.');
      setLoading(false);
    }
    // Không cần setLoading(false) ở đây
    // vì hàm login sẽ tự động điều hướng đi
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        id="password"
        label="Mật khẩu"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div>
        <PrimaryButton type="submit" className="w-full justify-center" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
        </PrimaryButton>
      </div>
    </form>
  );
};

// Trang Đăng Nhập
const LoginPage = () => (
  <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold font-serif text-navy-900 mb-8 text-center">
        Góc Thành Viên
      </h2>
      <LoginForm />
    </div>
  </div>
);

export default LoginPage;