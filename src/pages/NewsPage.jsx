import React, { useState, useEffect, useContext } from 'react';
// import { AppContext } from '../context/AppContext';
import { SectionTitle } from '../components/common/UIElements';
import LoadingSpinner from '../components/common/Loading';
import { API_BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

// Trang Tin Tức (Danh sách)
const NewsPage = () => {
  // const { navigate } = useContext(AppContext);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // const response = await fetch(`${API_BASE_URL}/news`);
        // if (!response.ok) {
        //   throw new Error('Không thể tải tin tức');
        // }
        // const data = await response.json();
        // setNewsList(data);
        
        // --- GIẢ LẬP DỮ LIỆU (vì chưa có API thật) ---
        setTimeout(() => { // Giả lập độ trễ mạng
           setNewsList([
            { id: 1, title: 'Ca đoàn mừng Lễ Bổn Mạng Thánh Cecilia 2024', slug: 'mung-bon-mang-2024', author_id: 1, featured_image_url: 'https://placehold.co/600x400/B08F5A/FFFFFF?text=Lễ+Bổn+Mạng', published_at: '2024-11-23' },
            { id: 2, title: 'Chuyến dã ngoại hè 2024 tại Vũng Tàu', slug: 'da-ngoai-he-2024', author_id: 1, featured_image_url: 'https://placehold.co/600x400/2C3A55/FFFFFF?text=Dã+Ngoại', published_at: '2024-07-15' },
            { id: 3, title: 'Thông báo tuyển thành viên đợt II/2024', slug: 'tuyen-thanh-vien-dot-2', author_id: 2, featured_image_url: 'https://placehold.co/600x400/CCCCCC/000000?text=Tuyển+Quân', published_at: '2024-06-01' },
          ]);
          setLoading(false);
        }, 500);
        // --- KẾT THÚC GIẢ LẬP ---

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle>Tin Tức & Sự Kiện</SectionTitle>

      {loading && <LoadingSpinner />}
      {error && <p className="text-center text-red-600">{error}</p>}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img
                className="h-56 w-full object-cover"
                src={news.featured_image_url}
                alt={news.title}
              />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(news.published_at).toLocaleDateString('vi-VN')}
                </p>
                <h3 className="text-xl font-bold font-serif text-navy-900 mb-3 h-20">
                  {news.title}
                </h3>
                {/* <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('news-detail', news.slug);
                  }}
                  className="font-medium text-gold-600 hover:text-gold-700"
                >
                  Đọc tiếp &rarr;
                </a> */}
                <Link
                  to={`/news/${news.slug}`}
                  className="font-medium text-gold-600 hover:text-gold-700"
                >
                  Đọc tiếp &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;