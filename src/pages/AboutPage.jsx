import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../components/common/UIElements';
import LoadingSpinner from '../components/common/Loading';
import { API_BASE_URL } from '../utils/constants';

// Component con để render danh sách ban điều hành
const CommitteeList = () => {
  const [committee, setCommittee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        // const response = await fetch(`${API_BASE_URL}/committee`);
        // if (!response.ok) {
        //   throw new Error('Không thể tải danh sách Ban Điều Hành');
        // }
        // const data = await response.json();
        // MÔ PHỎNG API: API thật sẽ trả về 'data'
        // setCommittee(data);
        
        // GIẢ LẬP DỮ LIỆU (vì chưa có API thật)
        setCommittee([
          { id: 1, full_name: 'Giuse Nguyễn Văn A', position: 'Ca trưởng', avatar_url: 'https://placehold.co/200x200/B08F5A/FFFFFF?text=A' },
          { id: 2, full_name: 'Maria Trần Thị B', position: 'Ca phó', avatar_url: 'https://placehold.co/200x200/2C3A55/FFFFFF?text=B' },
          { id: 3, full_name: 'Phaolô Lê Văn C', position: 'Thư ký', avatar_url: 'https://placehold.co/200x200/CCCCCC/000000?text=C' },
          { id: 4, full_name: 'Anna Đỗ Thị D', position: 'Thủ quỹ', avatar_url: 'https://placehold.co/200x200/DDDDDD/000000?text=D' },
        ]);
        // KẾT THÚC GIẢ LẬP
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Tạm thời comment ra vì chưa có API
    // fetchCommittee();
    
    // Dùng dữ liệu giả lập
    fetchCommittee(); // Vẫn gọi để giả lập
    
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {committee.map((member) => (
        <div key={member.id} className="text-center">
          <img
            className="w-40 h-40 rounded-full mx-auto object-cover shadow-lg border-4 border-gold-600/50"
            src={member.avatar_url}
            alt={member.full_name}
          />
          <h4 className="mt-4 text-xl font-bold font-serif text-navy-900">
            {member.full_name}
          </h4>
          <p className="text-gold-600 font-medium">{member.position}</p>
        </div>
      ))}
    </div>
  );
};

// Trang Giới Thiệu
const AboutPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
    <SectionTitle>Giới Thiệu Về Chúng Tôi</SectionTitle>

    {/* Sứ mạng & Lịch sử */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold font-serif text-gold-600 mb-4">Sứ Mạng</h3>
        <p className="text-lg leading-relaxed text-navy-700">
          Sứ mạng của chúng tôi là dùng lời ca tiếng hát để phục vụ các Thánh lễ,
          góp phần thăng tiến đời sống đức tin của cộng đồng,
          và cùng nhau xây dựng một tập thể hiệp nhất, yêu thương trong Chúa.
        </p>
      </div>
      <div className="prose prose-lg text-navy-700">
        <h3 className="text-2xl font-bold font-serif text-gold-600 mb-4">
          Lịch Sử Hình Thành
        </h3>
        <p>
          Được thành lập vào năm 1990 bởi... (Nội dung về lịch sử ca đoàn).
          Trải qua hơn 30 năm, ca đoàn đã...
        </p>
        <p>
          Thánh bổn mạng của chúng tôi là Thánh Cecilia,
          quan thầy của các nhạc sĩ. Chúng tôi mừng lễ vào ngày 22 tháng 11 hàng năm.
        </p>
      </div>
    </div>

    {/* Ban Điều Hành */}
    <section>
      <SectionTitle>Ban Điều Hành</SectionTitle>
      <CommitteeList />
    </section>
  </div>
);

export default AboutPage;