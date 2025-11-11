import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../components/common/UIElements';
import LoadingSpinner from '../components/common/Loading';
import { CalendarIcon } from '../utils/icons';
import { API_BASE_URL } from '../utils/constants';

// SỬA 1: Import Swiper để dùng slider
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

// SỬA 2: Import CSS của Swiper
import 'swiper/css';
import 'swiper/css/effect-fade'; // CSS cho hiệu ứng mờ
import 'swiper/css/pagination'; // CSS cho dấu chấm (nếu muốn)

// --- Component con: Lịch Sắp Tới ---
// (Component này không thay đổi, giữ nguyên)
const UpcomingEventsList = () => {
  // ... (Toàn bộ code của component này giữ nguyên)
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/events?limit=3`); 
        if (!response.ok) {
          throw new Error('Không thể tải sự kiện');
        }
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map((event) => {
        // const transformedEvent = transformSingleEvent(event); // Bạn đã comment dòng này
        return(
        <div
          key={event.id}
          className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col h-full"
        >
          {/* ... (Toàn bộ code render event giữ nguyên) ... */}
          <div className="flex-grow">
            <h4 className="font-semibold font-serif text-navy-700 text-lg">
              {event.title}
            </h4>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>{new Date(event.date).toLocaleDateString('vi-VN')}</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-navy-700">
              <p className="flex">
                <strong className="text-navy-900 w-16 flex-shrink-0">Nhập Lễ</strong> 
                <span className="flex-1">
                  <strong className="text-navy-900">: </strong>
                  <span className="text-teal-600 font-medium">{event.nhapLeSong.title}</span>
                  <span className="text-navy-600 font-medium"> - {event.nhapLeSong.songbook} tr.{event.nhapLeSong.songbook_page}</span>
                </span>
              </p>
              {/* ... (Các thẻ <p> khác giữ nguyên) ... */}
              <p className="flex">
                <strong className="text-navy-900 w-16 flex-shrink-0">Đáp Ca</strong>
                <span className="flex-1">
                  <strong className="text-navy-900">: </strong>
                  <span className="text-teal-600 font-medium">{event.dapCaSong.title}</span>
                  <span className="text-navy-600 font-medium"> - {event.dapCaSong.songbook} tr.{event.dapCaSong.songbook_page}</span>
                  <span className="text-red-600 font-medium">{event.dapCa_note && ` (${event.dapCa_note})`}</span>
                </span>
              </p>
                <p className="flex">
                <strong className="text-navy-900 w-16 flex-shrink-0">Alleluia</strong>
                <span className="flex-1">
                  <strong className="text-navy-900">: </strong>
                  <span className="text-teal-600 font-medium">{event.alleluiaSong.title}</span>
                  <span className="text-navy-600 font-medium"> - {event.alleluiaSong.songbook} tr.{event.alleluiaSong.songbook_page}</span>
                </span>
              </p>
                <p className="flex">
                <strong className="text-navy-900 w-16 flex-shrink-0">Dâng Lễ</strong>
                <span className="flex-1">
                  <strong className="text-navy-900">: </strong>
                  <span className="text-teal-600 font-medium">{event.dangLeSong.title}</span>
                  <span className="text-navy-600 font-medium"> - {event.dangLeSong.songbook} tr.{event.dangLeSong.songbook_page}</span>
                </span>
              </p>
              <p className="flex">
                <strong className="text-navy-900 w-16 flex-shrink-0">Hiệp Lễ</strong>
                <span className="flex-1">
                  <strong className="text-navy-900">: </strong>
                  <span className="text-teal-600 font-medium">{event.hiepLeSong.title}</span>
                  <span className="text-navy-600 font-medium"> - {event.hiepLeSong.songbook} tr.{event.hiepLeSong.songbook_page}</span>
                </span>
              </p>
              <p className="flex">
                <strong className="text-navy-900 w-16 flex-shrink-0">Kết Lễ</strong>
                <span className="flex-1">
                  <strong className="text-navy-900">: </strong>
                  <span className="text-teal-600 font-medium">{event.ketLeSong.title}</span>
                  <span className="text-navy-600 font-medium"> - {event.ketLeSong.songbook} tr.{event.ketLeSong.songbook_page}</span>
                </span>
              </p>
              <p className="flex">
                <strong className="text-navy-900 w-16 flex-shrink-0">Đức Mẹ</strong>
                <span className="flex-1">
                  <strong className="text-navy-900">: </strong>
                  <span className="text-teal-600 font-medium">{event.ducMeSong.title}</span>
                  <span className="text-navy-600 font-medium"> - {event.ducMeSong.songbook} tr.{event.ducMeSong.songbook_page}</span>
                </span>
              </p>
          </div>
          </div>
          <div className="mt-4">
            <span className="inline-block bg-gold-600/10 text-gold-600 text-xs font-medium py-0.5 rounded-full">
              {event.type === 'Lễ'
                ? 'Thánh Lễ'
                : event.type === 'Hôn Phối'
                ? 'Hôn Phối'
                : 'Sự Kiện'}
            </span>
          </div>
        </div>
      )})}
    </div>
  );
};

// --- Component con: Tin Mới Nhất ---
// (Component này không thay đổi, giữ nguyên)
const LatestNewsFeed = () => {
  // ... (Toàn bộ code của component này giữ nguyên)
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/news?limit=3`); 
        if (!response.ok) {
          throw new Error('Không thể tải tin tức');
        }
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {news.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
        > 
          <img
            className="h-48 w-full object-cover"
            src={item.featured_image_url || 'https://placehold.co/600x400/CCCCCC/000000?text=No+Image'}
            alt={item.title}
          />
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-1">
              {new Date(item.createdAt).toLocaleDateString('vi-VN')}
            </p>
            <h3 className="text-xl font-bold font-serif text-navy-900 mb-3">
              {item.title}
            </h3>
            <Link
              to={`/news/${item.slug}`}
              className="font-medium text-gold-600 hover:text-gold-700"
            >
              Đọc tiếp &rarr;
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Trang Chủ ---
const HomePage = () => {
  // SỬA 3: Thêm danh sách ảnh cho slider (thay bằng ảnh của bạn)
  const slideImages = [
    'https://images.pexels.com/photos/415585/pexels-photo-415585.jpeg',
    'https://images.pexels.com/photos/1170070/pexels-photo-1170070.jpeg',
    'https://images.pexels.com/photos/705778/pexels-photo-705778.jpeg',
    'https://images.pexels.com/photos/3234167/pexels-photo-3234167.jpeg',
    'https://images.pexels.com/photos/356658/pexels-photo-356658.jpeg',
    'https://images.pexels.com/photos/819806/pexels-photo-819806.jpeg',
  ];

  return (
    <div className="space-y-24">
      
      {/* SỬA 4: Thay thế Hero Section cũ */}
      <section className="relative h-[70vh] min-h-[500px] text-white">
        
        {/* Lớp 1: Slider (z-0) - Giữ nguyên */}
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
          className="absolute inset-0 w-full h-full z-0"
        >
          {slideImages.map((src, index) => (
            <SwiperSlide key={index}>
              <img 
                src={src} 
                alt={`Slide ca đoàn ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Lớp 2: Lớp Phủ Tối TOÀN BỘ (z-5) */}
        {/* SỬA: Giảm độ mờ tổng thể xuống 20% */}
        {/* <div className="absolute inset-0 z-5"></div>  */}

        {/* Lớp 3: Container Căn Giữa (z-10) - Giữ nguyên */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"> 
          
          {/* SỬA: Thêm Lớp 3.5 - "Card" Nền cho Chữ */}
          {/* Đây là giải pháp triệt để: một "card" bán trong suốt với hiệu ứng mờ */}
          <div className="bg-black/10 backdrop-brightness-[.7] p-8 md:p-12 w-full h-full flex flex-col items-center justify-center"> 
            
            <h1 className="text-4xl md:text-6xl font-black font-serif mb-4">
              Phụng Sự Bằng Lời Ca Tiếng Hát
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Chào mừng đến với trang web của Ca Đoàn Mân Côi
            </p>
            
            <Link
              to="/join"
              className="inline-block px-8 py-3 bg-gold-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gold-700 transition-colors duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-opacity-75"
            >
              Gia Nhập Cùng Chúng Tôi
            </Link>
          </div>

        </div>
      </section>

      {/* Main Content (Giữ nguyên) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Upcoming Events */}
        <section>
          <SectionTitle>Lịch Phục Vụ Sắp Tới</SectionTitle>
          <UpcomingEventsList />
        </section>

        {/* Latest News */}
        <section>
          <SectionTitle>Tin Tức & Sự Kiện</SectionTitle>
          <LatestNewsFeed />
        </section>
      </div>
    </div>
  );
};

export default HomePage;