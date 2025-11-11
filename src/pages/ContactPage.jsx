import React, { useState } from 'react';
import {
  SectionTitle,
  FormInput,
  FormTextarea,
  PrimaryButton,
} from '../components/common/UIElements';
import { API_BASE_URL } from '../utils/constants';

// Component Form liên hệ
const ContactForm = () => {
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_message: '',
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
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Gửi liên hệ thất bại. Vui lòng thử lại.');
      }

      // const result = await response.json();
      // console.log(result);
      
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
          Gửi Thành Công!
        </h3>
        <p className="text-lg text-navy-700">
          Cảm ơn bạn. Chúng tôi sẽ phản hồi sớm nhất có thể.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white rounded-lg shadow-lg">
      <FormInput
        id="contact_name"
        label="Họ và Tên"
        value={formData.contact_name}
        onChange={handleChange}
      />
      <FormInput
        id="contact_email"
        label="Email"
        type="email"
        value={formData.contact_email}
        onChange={handleChange}
      />
      <FormTextarea
        id="contact_message"
        label="Lời nhắn"
        value={formData.contact_message}
        onChange={handleChange}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div>
        <PrimaryButton type="submit" className="w-full justify-center" disabled={submitting}>
          {submitting ? 'Đang gửi...' : 'Gửi Liên Hệ'}
        </PrimaryButton>
      </div>
    </form>
  );
};

// Trang Liên Hệ
const ContactPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <SectionTitle>Liên Hệ</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      <div className="prose prose-lg text-navy-700">
        <h3 className="font-serif text-gold-600">Thông tin</h3>
        <p>
          <strong>Email:</strong> cadoanmancoi@gmail.com
          <br />
          <strong>Liên hệ Ca trưởng:</strong> (Giuse Nguyễn Văn A) - 090 xxx xxxx
        </p>
        <h3 className="font-serif text-gold-600">Địa điểm</h3>
        <p>
          Nhà thờ Giáo xứ Mân Côi
          <br />
          123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh
        </p>
        {/* Nhúng Google Map (dùng iframe) */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447041434199!2d106.69543111533088!3d10.77701479232078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3607e49e29%3A0x6b490f8903c6f852!2zTmjDoCBUaOG7nSDEkOG7qWMgQsOgIFPDoGkgR8Oybg!5e0!3m2!1svi!2s!4v1678888888888!5m2!1svi!2s"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>
      <ContactForm />
    </div>
  </div>
);

export default ContactPage;