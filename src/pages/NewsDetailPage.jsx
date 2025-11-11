import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import LoadingSpinner from '../components/common/Loading';
import { API_BASE_URL } from '../utils/constants';

// Trang Chi Tiết Tin Tức
const NewsDetailPage = () => {
  const { currentSlug } = useContext(AppContext);
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentSlug) {
      setError('Không tìm thấy bài viết.');
      setLoading(false);
      return;
    }

    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        // API thật
        // const response = await fetch(`${API_BASE_URL}/news/${currentSlug}`);
        // if (!response.ok) {
        //   throw new Error('Không tìm thấy bài viết');
        // }
        // const data = await response.json();
        // setNews(data);
        
        // --- GIẢ LẬP DỮ LIỆU (vì chưa có API thật) ---
        setTimeout(() => { // Giả lập độ trễ mạng
          // (Tìm trong MOCK_NEWS cũ để giả lập)
          const mockData = [
            { id: 1, title: 'Ca đoàn mừng Lễ Bổn Mạng Thánh Cecilia 2024', slug: 'mung-bon-mang-2024', author_id: 1, featured_image_url: 'https://placehold.co/600x400/B08F5A/FFFFFF?text=Lễ+Bổn+Mạng', published_at: '2024-11-23', content: 'Ngày 22/11 vừa qua, ca đoàn đã long trọng tổ chức... (Đây là nội dung chi tiết bài viết)...' },
            { id: 2, title: 'Chuyến dã ngoại hè 2024 tại Vũng Tàu', slug: 'da-ngoai-he-2024', author_id: 1, featured_image_url: 'https://placehold.co/600x400/2C3A55/FFFFFF?text=Dã+Ngoại', published_at: '2024-07-15', content: 'Chuyến đi đã mang lại nhiều niềm vui và gắn kết... (Đây là nội dung chi tiết bài viết)...' },
            { id: 3, title: 'Thông báo tuyển thành viên đợt II/2024', slug: 'tuyen-thanh-vien-dot-2', author_id: 2, featured_image_url: 'https://placehold.co/600x400/CCCCCC/000000?text=Tuyển+Quân', published_at: '2024-06-01', content: 'Nhằm chuẩn bị cho mùa Giáng Sinh... (Đây là nội dung chi tiết bài viết)...' },
          ];
          const foundNews = mockData.find(n => n.slug === currentSlug);
          if (foundNews) {
            setNews(foundNews);
          } else {
            setError('Không tìm thấy bài viết.');
          }
          setLoading(false);
        }, 500);
        // --- KẾT THÚC GIẢ LẬP ---

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [currentSlug]); // Phụ thuộc vào slug

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        {error}
      </div>
    );
  }
  if (!news) return null; // Trường hợp không loading, không lỗi, không có tin

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="prose prose-lg max-w-none text-navy-700">
        <h1 className="font-serif text-navy-900">{news.title}</h1>
        <p className="text-gray-500">
          Đăng ngày: {new Date(news.published_at).toLocaleDateString('vi-VN')}
        </p>
        <img
          src={news.featured_image_url}
          alt={news.title}
          className="w-full rounded-lg shadow-lg"
        />
        <p>{news.content}</p>
        <p>
          Đây là phần nội dung chi tiết của bài viết. Trong ứng dụng thật, nội
          dung này sẽ là HTML hoặc Markdown được render ra.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </article>
    </div>
  );
};

export default NewsDetailPage;