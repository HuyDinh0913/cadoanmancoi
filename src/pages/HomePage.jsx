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

// Import các component Ant Design cho Modal
import { Modal, Spin, Tabs } from 'antd';

// Import thư viện Lightbox và CSS (Masonry library không cần nữa)
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";


// Hàm trợ giúp để chuyển đổi link YouTube thường thành link embed
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
    return null;
  } catch (e) {
    console.error("Lỗi xử lý URL YouTube:", e);
    return null;
  }
};

// --- Component con: Lịch Sắp Tới (Không đổi) ---
const UpcomingEventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

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

  const handleSongClick = async (songId) => {
    if (!songId) {
      console.warn("Bài hát không có ID.");
      return;
    }
    setIsModalOpen(true);
    setModalLoading(true);
    setModalError(null);
    setSelectedSong(null);
    try {
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

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSong(null);
    setModalError(null);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600">{error}</p>;

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
              <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-navy-700">
                <p className="flex mb-2">
                  <strong className="text-navy-900 w-16 flex-shrink-0">Nhập Lễ</strong> 
                  <span className="flex-1">
                    <strong className="text-navy-900">: </strong>
                    <SongTitle song={event.nhapLeSong} note={event.nhapLe_note} />
                  </span>
                </p>
                <p className="flex mb-2">
                  <strong className="text-navy-900 w-16 flex-shrink-0">Đáp Ca</strong>
                  <span className="flex-1">
                    <strong className="text-navy-900">: </strong>
                    <SongTitle song={event.dapCaSong} note={event.dapCa_note} />
                  </span>
                </p>
                  <p className="flex mb-2">
                  <strong className="text-navy-900 w-16 flex-shrink-0">Alleluia</strong>
                  <span className="flex-1">
                    <strong className="text-navy-900">: </strong>
                    <SongTitle song={event.alleluiaSong} note={event.alleluia_note} />
                  </span>
                </p>
                  <p className="flex mb-2">
                  <strong className="text-navy-900 w-16 flex-shrink-0">Dâng Lễ</strong>
                  <span className="flex-1">
                    <strong className="text-navy-900">: </strong>
                    <SongTitle song={event.dangLeSong} note={event.dangLe_note} />
                  </span>
                </p>
                <p className="flex mb-2">
                  <strong className="text-navy-900 w-16 flex-shrink-0">Hiệp Lễ</strong>
                  <span className="flex-1">
                    <strong className="text-navy-900">: </strong>
                    <SongTitle song={event.hiepLeSong} note={event.hiepLe_note} />
                  </span>
                </p>
                <p className="flex mb-2">
                  <strong className="text-navy-900 w-16 flex-shrink-0">Kết Lễ</strong>
                  <span className="flex-1">
                    <strong className="text-navy-900">: </strong>
                    <SongTitle song={event.ketLeSong} note={event.ketLe_note} />
                  </span>
                </p>
                <p className="flex mb-2">
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

      {/* Modal chi tiết bài hát (giữ nguyên) */}
      <Modal
        title={selectedSong ? selectedSong.title : "Đang tải..."}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        <Spin spinning={modalLoading}>
          {modalError && <p className="text-red-600 text-center">{modalError}</p>}
          {selectedSong && (
            <div className="space-y-4">
              <div className="text-sm">
                <p><strong>Tác giả:</strong> {selectedSong.author || 'N/A'}</p>
                <p><strong>Sách:</strong> {selectedSong.songbook || 'N/A'} - <strong>Trang:</strong> {selectedSong.songbook_page || 'N/A'}</p>
              </div>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Lời Bài Hát" key="1">
                  <div className="
                    whitespace-pre-wrap font-serif text-base
                    leading-relaxed text-navy-800 h-80
                    overflow-y-auto bg-gray-50 p-4 rounded
                  ">
                    {selectedSong.lyrics || 'Chưa có lời bài hát.'}
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Sheet Nhạc (PDF)" key="2">
                  {selectedSong.sheet_music_url ? (
                    <iframe 
                      src={selectedSong.sheet_music_url}
                      className="w-full h-[500px]"
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
                      className="w-full aspect-video"
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

// --- Component con: Tin Mới Nhất (ĐÃ CẬP NHẬT GALLERY) ---
const LatestNewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State cho Modal Thư Viện Ảnh
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedNewsItem, setSelectedNewsItem] = useState(null); 
  
  // State để tải ảnh bên trong Modal
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState(null);

  // State cho Lightbox (bên trong Modal)
  const [lightboxOpen, setLightboxOpen] =useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  // // Hàm fetch *ảnh* cho tin tức đó (Đang dùng giả lập)
  // const fetchGalleryForNews = async (newsId) => {
  //   if (!newsId) return;

  //   setGalleryLoading(true);
  //   setGalleryError(null);
  //   setGalleryImages([]);

  //   try {
  //     // --- GIẢ LẬP DỮ LIỆU ---
  //     setTimeout(() => {
  //       let mockImages = [];
  //       if (newsId === 1) { // Giả lập gallery cho tin ID 1
  //          mockImages = [
  //           { id: 101, src: 'https://images.pexels.com/photos/1819825/pexels-photo-1819825.jpeg', alt: 'Mô tả ảnh 1', width: 600, height: 800 },
  //           { id: 102, src: 'https://images.pexels.com/photos/29169916/pexels-photo-29169916.jpeg', alt: 'Mô tả ảnh 2', width: 800, height: 600 },
  //           { id: 103, src: 'https://images.pexels.com/photos/62645/pexels-photo-62645.jpeg', alt: 'Mô tả ảnh 3', width: 600, height: 600 },
  //           { id: 104, src: 'https://images.pexels.com/photos/218480/pexels-photo-218480.jpeg', alt: 'Mô tả ảnh 4', width: 600, height: 300 },
  //           { id: 105, src: 'https://images.pexels.com/photos/19143152/pexels-photo-19143152.jpeg', alt: 'Mô tả ảnh 5', width: 400, height: 900 },
  //         ];
  //       } else if (newsId === 2) { // Giả lập gallery cho tin ID 2
  //          mockImages = [
  //           { id: 201, src: 'https://placehold.co/600x700/2C3A55/FFFFFF?text=Dã+Ngoại+1', alt: 'Mô tả ảnh 4', width: 600, height: 700 },
  //           { id: 202, src: 'https://placehold.co/700x900/2C3A55/FFFFFF?text=Dã+Ngoại+2', alt: 'Mô tả ảnh 5', width: 700, height: 900 },
  //           { id: 203, src: 'https://placehold.co/800x500/2C3A55/FFFFFF?text=Dã+Ngoại+3', alt: 'Mô tả ảnh 6', width: 800, height: 500 },
  //           { id: 204, src: 'https://placehold.co/500x700/2C3A55/FFFFFF?text=Dã+Ngoại+4', alt: 'Mô tả ảnh 7', width: 500, height: 700 },
  //           { id: 205, src: 'https://placehold.co/900x500/2C3A55/FFFFFF?text=Dã+Ngoại+5', alt: 'Mô tả ảnh 8', width: 900, height: 500 },
  //         ];
  //       } else { // Tin khác không có ảnh
  //         setGalleryError("Tin tức này không có thư viện ảnh.");
  //       }

  //       if(mockImages.length > 0) {
  //         setGalleryImages(mockImages);
  //       }
  //       setGalleryLoading(false);
  //     }, 800);
  //     // --- KẾT THÚC GIẢ LẬP ---

  //   } catch (err) {
  //     setGalleryError(err.message);
  //     setGalleryLoading(false);
  //   }
  // };
  
  // SỬA: Hàm fetch ảnh thực tế từ API
    const fetchGalleryForNews = async (newsId) => {
      if (!newsId) return;

      setGalleryLoading(true);
      setGalleryError(null);
      setGalleryImages([]);

      try {
        // --- CODE THẬT: GỌI API BACKEND SỬ DỤNG newsId ---
        const response = await fetch(`${API_BASE_URL}/news/${newsId}/gallery`);
        
        if (!response.ok) {
          // Bắt lỗi nếu status code không phải 2xx
          throw new Error('Không thể tải thư viện ảnh cho tin tức này.');
        }

        const data = await response.json();
        
        if (data && data.length > 0) {
          setGalleryImages(data);
        } else {
          // Xử lý trường hợp API trả về mảng rỗng
          setGalleryError("Tin tức này hiện chưa có thư viện ảnh.");
        }
        // --- KẾT THÚC CODE THẬT ---
        
      } catch (err) {
        // Dùng err.message từ lỗi throw hoặc mặc định
        setGalleryError(err.message || "Đã xảy ra lỗi trong quá trình tải ảnh.");
      } finally {
        setGalleryLoading(false);
      }
    };

  // Hàm mở Modal Gallery
  const handleReadMoreClick = (newsItem) => {
    setSelectedNewsItem(newsItem);
    setIsGalleryModalOpen(true);
    fetchGalleryForNews(newsItem.id); // Bắt đầu tải ảnh khi mở modal
  };

  // Hàm đóng Modal Gallery
  const handleGalleryModalClose = () => {
    setIsGalleryModalOpen(false);
    setSelectedNewsItem(null);
    setGalleryImages([]); 
    setGalleryError(null);
  };

  // Hàm mở Lightbox (bên trong modal)
  const handleImageClickInModal = (imageIndex) => {
    setLightboxIndex(imageIndex);
    setLightboxOpen(true);
  };

  // Chuẩn bị slide cho Lightbox
  const slides = galleryImages.map(img => {
  if (img.type === 'video') {
    return {
      type: "video",
      sources: [
        {
          src: img.src, // URL của video
          type: "video/mp4" // Giả định định dạng là mp4, có thể cần tùy chỉnh
        }
      ]
    };
  }
  return { 
    src: img.src, 
    width: img.width, 
    height: img.height 
  };
});

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
          > 
            <img
              className="h-48 w-full object-cover"
              src={item.featured_image_url || 'https://res.cloudinary.com/ddnzxqyip/image/upload/v1762939988/z7216443717875_a3c9861f8b05e8f04a2b8a1c3d5a90d8_ewxkid.jpg'}
              alt={item.title}
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-1">
                {new Date(item.createdAt).toLocaleDateString('vi-VN')}
              </p>
              <h3 className="text-xl font-bold font-serif text-navy-900 mb-3">
                {item.title}
              </h3>
              
              {/* Thay thế Link bằng Span có onClick để mở Modal */}
              <span
                onClick={() => handleReadMoreClick(item)}
                className="font-medium text-gold-600 hover:text-gold-700 cursor-pointer"
              >
                Xem thư viện ảnh &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal cho Thư Viện Ảnh */}
      <Modal
        title={selectedNewsItem ? `Thư viện: ${selectedNewsItem.title}` : "Đang tải..."}
        open={isGalleryModalOpen}
        onCancel={handleGalleryModalClose}
        footer={null}
        width="90%" 
        style={{ top: 20 }}
      >
        <Spin spinning={galleryLoading}>
          <div className="py-4" style={{ minHeight: '400px', maxHeight: '80vh', overflowY: 'auto' }}>
            {galleryError && (
              <p className="text-red-600 text-center p-8">{galleryError}</p>
            )}
            
            {!galleryError && galleryImages.length > 0 && (
              // DÙNG CSS COLUMNS (giống Pexels)
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                {galleryImages.map((image, idx) => (
                  // break-inside-avoid ngăn ảnh bị ngắt qua 2 cột
                  <div key={image.id} className="mb-4 break-inside-avoid">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105"
                      onClick={() => handleImageClickInModal(idx)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Spin>
      </Modal>

      {/* Lightbox để phóng to ảnh */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        plugins={[Video]}
      />
    </>
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
      
      {/* Hero Section */}
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

      {/* Main Content */}
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
