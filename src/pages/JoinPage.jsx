import React, { useState } from 'react';
import {
  SectionTitle,
  FormInput,
  FormTextarea,
  PrimaryButton,
} from '../components/common/UIElements';
import { API_BASE_URL } from '../utils/constants';

// Component Form Đăng Ký
const JoinForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    voice_part: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Gọi API thật
      // const response = await fetch(`${API_BASE_URL}/join/register`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Gửi đăng ký thất bại. Vui lòng thử lại.');
      // }

      // --- GIẢ LẬP GỌI API ---
      console.log("Đang gửi form đăng ký:", formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      // --- KẾT THÚC GIẢ LẬP ---

      setSubmitted(true);

    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold font-serif text-gold-600 mb-4">
          Đăng Ký Thành Công!
        </h3>
        <p className="text-lg text-navy-700">
          Cảm ơn bạn đã quan tâm. Chúng tôi sẽ liên hệ với bạn trong thời gian
          sớm nhất.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white rounded-lg shadow-lg">
      <FormInput
        id="full_name"
        name="full_name"
        label="Họ và Tên (Tên Thánh)"
        value={formData.full_name}
        onChange={handleChange}
      />
      <FormInput
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <FormInput
        id="phone_number"
        name="phone_number"
        label="Số điện thoại"
        type="tel"
        value={formData.phone_number}
        onChange={handleChange}
      />
      <FormInput
        id="voice_part"
        name="voice_part"
        label="Bè (Soprano, Alto, Tenor, Bass) (Nếu biết)"
        required={false}
        value={formData.voice_part}
        onChange={handleChange}
      />
      <FormTextarea
        id="message"
        name="message"
        label="Lời nhắn (Vài dòng giới thiệu về bạn)"
        required={false}
        value={formData.message}
        onChange={handleChange}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div>
        <PrimaryButton type="submit" className="w-full justify-center" disabled={submitting}>
          {submitting ? 'Đang gửi...' : 'Gửi Đơn Đăng Ký'}
        </PrimaryButton>
      </div>
    </form>
  );
};

// Trang Tuyển Thành Viên
const JoinPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="max-w-3xl mx-auto">
      <SectionTitle>Gia Nhập Cùng Chúng Tôi</SectionTitle>
      <div className="prose prose-lg text-navy-700 max-w-none text-center mb-12">
        <p>
          Bạn có đam mê thánh ca? Bạn muốn dùng giọng hát của mình để phục vụ
          Chúa và cộng đoàn? Hãy đến và tham gia cùng đại gia đình Ca Đoàn Mân Côi!
        </p>
      </div>
      <JoinForm />
    </div>
  </div>
);

export default JoinPage;