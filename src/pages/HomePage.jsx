import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../components/common/UIElements';
import LoadingSpinner from '../components/common/Loading';
import { CalendarIcon } from '../utils/icons';
import { API_BASE_URL } from '../utils/constants';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// SỬA: Import các component Ant Design cho Modal
import { Modal, Spin, Tabs } from 'antd';

// SỬA: Hàm trợ giúp để chuyển đổi link YouTube thường thành link embed
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    // Xử lý link rút gọn (youtu.be/...)
    if (urlObj.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
    }
    // Xử lý link đầy đủ (youtube.com/watch?v=...)
    if (urlObj.hostname.includes('youtube.com')) {
      const videoId = urlObj.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    return null; // Không phải link YouTube hợp lệ
  } catch (e) {
    console.error("Lỗi xử lý URL YouTube:", e);
    return null;
  }
};


// --- Component con: Lịch Sắp Tới ---
const UpcomingEventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // SỬA: Thêm state cho Modal chi tiết bài hát
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null); // Dữ liệu bài hát đầy đủ
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      // ... (code fetchEvents giữ nguyên)
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

  // SỬA: Hàm xử lý khi click vào tên bài hát
  const handleSongClick = async (songId) => {
    if (!songId) {
      console.warn("Bài hát không có ID.");
      return;
    }
    
    setIsModalOpen(true);
    setModalLoading(true);
    setModalError(null);
    setSelectedSong(null); // Xóa bài hát cũ

    try {
      // Gọi API để lấy *toàn bộ* chi tiết bài hát (bao gồm lyrics, URLs)
      const response = await fetch(`${API_BASE_URL}/songs/${songId}`);
      if (!response.ok) {
        throw new Error('Không thể tải chi tiết bài hát');
      }
      const data = await response.json();
      setSelectedSong(data);
    } catch (err) {
      setModalError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  // SỬA: Hàm đóng modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSong(null);
    setModalError(null);
  };


  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  // SỬA: Component con để render tên bài hát (giúp code gọn hơn)
  const SongTitle = ({ song, note }) => {
    if (!song) {
      return <span className="text-gray-500 italic">N/A</span>;
    }
    return (
      <>
        <span 
          className="text-teal-600 font-medium cursor-pointer hover:underline"
          onClick={() => handleSongClick(song.id)}
        >
          {song.title}
        </span>
        <span className="text-navy-600 font-medium"> - {song.songbook} tr.{song.songbook_page}</span>
        {note && <span className="text-red-600 font-medium"> ({note})</span>}
      </>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col h-full"
          >
            <div className="flex-grow">
              <h4 className="font-semibold font-serif text-navy-700 text-lg">
                {event.title}
              </h4>
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span>{new Date(event.date).toLocaleDateString('vi-VN')}</span>
              </div>
              
              {/* SỬA: Dùng component SongTitle và kiểm tra null */}
              <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-navy-700">
                <p className="flex">
                  <strong className="text-navy-900 w-16 flex-shrink-0">Nhập Lễ</strong> 
                  <span className="flex-1">
                    <strong className="text-navy-900">: </strong>
                    <SongTitle song={event.nhapLeSong} note={event.nhapLe_note} />
                  </span>
                </p>
                <p className="flex">
                  <strong className="text-navy-900 w-16 flex-shrink-0">Đáp Ca</strong>
                  <span className="flex-1">
                    <strong className="text-navy-900">: </strong>
                    <SongTitle song={event.dapCaSong} note={event.dapCa_note} />
                  </span>
                </p>
                  <p className="flex">
                  <strong className="text-navy-900 w-16 flex-shrink-0">Alleluia</strong>
                  <span className="flex-1">
                    <strong className="text-navy-900">: </strong>
                    <SongTitle song={event.alleluiaSong} note={event.alleluia_note} />
                  </span>
                </p>
                  <p className="flex">
                  <strong className="text-navy-900 w-16 flex-shrink-0">Dâng Lễ</strong>
                  <span className="flex-1">
                    <strong className="text-navy-900">: </strong>
                    <SongTitle song={event.dangLeSong} note={event.dangLe_note} />
                  </span>
                </p>
                <p className="flex">
                  <strong className="text-navy-900 w-16 flex-shrink-0">Hiệp Lễ</strong>
                  <span className="flex-1">
                    <strong className="text-navy-900">: </strong>
                    <SongTitle song={event.hiepLeSong} note={event.hiepLe_note} />
                  </span>
                </p>
                <p className="flex">
                  <strong className="text-navy-900 w-16 flex-shrink-0">Kết Lễ</strong>
                  <span className="flex-1">
                    <strong className="text-navy-900">: </strong>
                    <SongTitle song={event.ketLeSong} note={event.ketLe_note} />
                  </span>
                </p>
                <p className="flex">
                  <strong className="text-navy-900 w-16 flex-shrink-0">Đức Mẹ</strong>
                  <span className="flex-1">
                    <strong className="text-navy-900">: </strong>
                    <SongTitle song={event.ducMeSong} note={event.ducMe_note} />
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
        ))}
      </div>

      {/* SỬA: Thêm Modal hiển thị chi tiết bài hát */}
      <Modal
        title={selectedSong ? selectedSong.title : "Đang tải..."}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null} // Không cần nút OK/Cancel
        width={800} // Tăng chiều rộng
      >
        <Spin spinning={modalLoading}>
          {modalError && <p className="text-red-600 text-center">{modalError}</p>}
          {selectedSong && (
            <div className="space-y-4">
              {/* Thông tin cơ bản */}
              <div className="text-sm">
                <p><strong>Tác giả:</strong> {selectedSong.author || 'N/A'}</p>
                <p><strong>Sách:</strong> {selectedSong.songbook || 'N/A'} - <strong>Trang:</strong> {selectedSong.songbook_page || 'N/A'}</p>
              </div>

              {/* Tabs cho các nội dung */}
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Lời Bài Hát" key="1">
                  <div className="
                    whitespace-pre-wrap  
                    font-serif           
                    text-base            
                    leading-relaxed      
                    text-navy-800        
                    h-80 overflow-y-auto bg-gray-50 p-4 rounded
                  ">
                    {selectedSong.lyrics || 'Chưa có lời bài hát.'}
                  </div>
                </Tabs.TabPane>
                
                <Tabs.TabPane tab="Sheet Nhạc (PDF)" key="2">
                  {selectedSong.sheet_music_url ? (
                    <iframe 
                      src={selectedSong.sheet_music_url}
                      className="w-full h-[500px]" // Đặt chiều cao cố định cho PDF
                      title="Sheet Music"
                    />
                  ) : (
                    <p className="text-center p-8">Không tìm thấy sheet nhạc.</p>
                  )}
                </Tabs.TabPane>

                <Tabs.TabPane tab="YouTube" key="3">
                  {getYouTubeEmbedUrl(selectedSong.youtube_url) ? (
                    <iframe 
                      src={getYouTubeEmbedUrl(selectedSong.youtube_url)}
                      className="w-full aspect-video" // Tỷ lệ 16:9
                      title="YouTube Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    />
                  ) : (
                    <p className="text-center p-8">Không tìm thấy link YouTube.</p>
                  )}
                </Tabs.TabPane>
              </Tabs>
            </div>
          )}
        </Spin>
      </Modal>
    </>
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
  // (Danh sách ảnh slider giữ nguyên)
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
      
      {/* Hero Section (Giữ nguyên) */}
      <section className="relative h-[70vh] min-h-[500px] text-white">
        
        {/* Lớp 1: Slider (z-0) */}
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

        {/* Lớp 3: Container Căn Giữa (z-10) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"> 
          
          <div className="bg-black/10 backdrop-brightness-[.7] p-8 md:p-12 w-full h-full flex flex-col items-center justify-center"> 
            
            <h1 className="text-4xl md:text-6xl font-black font-serif mb-4">
              Phụng Vụ Bằng Lời Ca Tiếng Hát
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
