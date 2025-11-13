import React, { useState, useEffect } from 'react';
// ĐÃ XÓA: import ReactPlayer from 'react-player';
// Chúng ta sẽ dùng iframe tiêu chuẩn để thay thế.

// Do '../components/common/UIElements' không tồn tại trong môi trường này,
// chúng ta định nghĩa một component SectionTitle đơn giản ở đây.
const SectionTitle = ({ children }) => (
  <h1 className="text-3xl font-bold font-serif text-navy-900 mb-8 pb-4 border-b border-navy-900/20">
    {children}
  </h1>
);

// Do '../components/common/Loading' không tồn tại,
// chúng ta định nghĩa một component LoadingSpinner đơn giản ở đây.
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12" role="status">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-navy-900"></div>
    <span className="ml-3 text-navy-700 font-medium">Đang tải...</span>
  </div>
);

// Do '../utils/constants' không tồn tại,
// chúng ta tạm thời định nghĩa API_BASE_URL (mặc dù không dùng trong bản giả lập)
const API_BASE_URL = '/api'; // Placeholder

/**
 * Hàm trợ giúp để chuyển đổi URL YouTube (watch?v=...) 
 * hoặc (youtu.be/...) thành URL có thể nhúng (embed/...).
 * Nó cũng thêm 'autoplay=1' để video tự động phát.
 */
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  let videoId = null;
  try {
    const videoUrl = new URL(url);
    if (videoUrl.hostname === 'www.youtube.com' || videoUrl.hostname === 'youtube.com') {
      videoId = videoUrl.searchParams.get('v');
    } else if (videoUrl.hostname === 'youtu.be') {
      videoId = videoUrl.pathname.substring(1); // Xóa dấu '/' ở đầu
    }
  } catch (error) {
    console.error("URL video không hợp lệ:", error);
    return null;
  }
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  return null;
};


// Trang Góc Âm Nhạc
const MusicPage = () => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State mới để lưu URL của video đang được chọn
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  // State mới để lưu tiêu đề của video đang được chọn
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');

  // Danh sách mùa Phụng Vụ (static)
  const seasons = [
    { key: 'advent', name: 'Mùa Vọng' },
    { key: 'christmas', name: 'Mùa Giáng Sinh' },
    { key: 'lent', name: 'Mùa Chay' },
    { key: 'easter', name: 'Mùa Phục Sinh' },
    { key: 'ordinary_time', name: 'Mùa Thường Niên' },
  ];

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        setLoading(true);
        // Tạm thời vô hiệu hóa API thật vì chúng ta đang dùng mock data
        // ...

        // --- GIẢ LẬP DỮ LIỆU (với video_url là link YouTube) ---
        setTimeout(() => {
          const mockData = [
            { id: 1, title: 'Cao cung lên', video_url: 'https://www.youtube.com/watch?v=TJhGLx5mIcg&list=RDTJhGLx5mIcg&start_radio=1&pp=ygUNY2FvIGN1bmcgbMOqbqAHAQ%3D%3D', season: 'christmas' },
            { id: 2, title: 'Lễ vật dâng Chúa Hài Nhi', video_url: 'https://www.youtube.com/watch?v=A27dDqRzUCQ&list=RDA27dDqRzUCQ&start_radio=1', season: 'christmas' },
            { id: 3, title: 'Chúa sẽ đền bù', video_url: 'https://www.youtube.com/watch?v=AArjzw5KAVM&list=RDAArjzw5KAVM&start_radio=1&pp=ygUfY2jDumEgc-G6vSDEkeG7gW4gYsO5IG1pIHRy4bqnbaAHAQ%3D%3D', season: 'ordinary_time' },
            { id: 4, title: 'Thập giá Đức Ki Tô', video_url: 'https://www.youtube.com/watch?v=wnVPszyqGVM&list=RDwnVPszyqGVM&start_radio=1', season: 'lent' },
            { id: 5, title: 'Xuất hành', video_url: 'https://www.youtube.com/watch?v=nG4_t0qN2oA&list=RDnG4_t0qN2oA&start_radio=1&pp=ygUZbeG7q25nIGNow7phIHPhu5FuZyBs4bqhaaAHAdIHCQkDCgGHKiGM7w%3D%3D', season: 'lent' },
            { id: 6, title: 'Chúa sống lại rồi', video_url: 'https://www.youtube.com/watch?v=r1WE0RLerbA&list=RDr1WE0RLerbA&start_radio=1&pp=ygUZbeG7q25nIGNow7phIHPhu5FuZyBs4bqhaaAHAQ%3D%3D', season: 'easter' },
            { id: 7, title: 'Hôm nay toàn dân Chúa Trời', video_url: 'https://www.youtube.com/watch?v=5jB0vPKQaPI', season: 'christmas' },
          ];
          
          setRecordings(mockData);
          
          setLoading(false);
        }, 500);
        // --- KẾT THÚC GIẢ LẬP ---

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecordings();
  }, []);
  
  // Hàm xử lý khi nhấp vào một bài hát
  // Giờ đây hoạt động như một nút bật/tắt
  const handlePlayRecording = (rec) => {
    // Nếu bấm vào bài đang phát, hãy đóng nó lại
    if (currentVideoUrl === rec.video_url) {
      setCurrentVideoUrl(null);
      setCurrentVideoTitle('');
    } else { // Nếu bấm vào bài khác, phát bài đó
      setCurrentVideoUrl(rec.video_url);
      setCurrentVideoTitle(rec.title);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle>Góc Âm Nhạc</SectionTitle>

      {/* --- ĐÃ XÓA: KHU VỰC TRÌNH PHÁT NHẠC --- */}

      {/* Hiển thị spinner ở chính giữa nếu đang tải lần đầu */}
      {loading && <LoadingSpinner />}

      {/* Chỉ hiển thị danh sách khi không loading và không có lỗi */}
      {!loading && !error && (
        <div className="space-y-12">
          {seasons.map((season) => {
            // Lọc các bài hát theo mùa
            const seasonRecordings = recordings.filter(
              (r) => r.season === season.key
            );

            // Chỉ render nếu có bài hát
            if (seasonRecordings.length === 0) return null;

            return (
              <section key={season.key}>
                <h3 className="text-2xl font-bold font-serif text-gold-600 mb-6 pb-2 border-b border-gold-600/30">
                  {season.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Thay đổi cách render danh sách */}
                  {seasonRecordings.map((rec) => {
                    const isPlaying = currentVideoUrl === rec.video_url;
                    // Lấy URL embed cho video *này*
                    const embedUrl = getYouTubeEmbedUrl(rec.video_url);

                    return (
                      // Bọc mọi thứ trong một div để chứa cả nút và trình phát
                      <div key={rec.id} className={`rounded-lg shadow-sm transition-all duration-200 ${
                        isPlaying ? 'bg-gold-100 ring-2 ring-gold-600' : 'bg-white'
                      }`}>
                        <button
                          onClick={() => handlePlayRecording(rec)}
                          className={`p-4 flex items-center justify-between text-left w-full focus:outline-none ${
                            isPlaying ? '' : 'hover:bg-gray-50'
                          } ${isPlaying && embedUrl ? 'rounded-t-lg' : 'rounded-lg'}`} // Bo góc
                        >
                          <span className={`font-medium ${
                            isPlaying ? 'text-gold-900' : 'text-navy-700'
                          }`}>
                            {rec.title}
                          </span>
                          {/* Icon thay đổi tùy theo đang phát hay không */}
                          <div
                            className={`p-2 rounded-full ${
                              isPlaying ? 'bg-gold-600' : 'bg-gray-100'
                            }`}
                          >
                            {/* Nếu đang phát, hiển thị icon "Đóng" (X) */}
                            {isPlaying ? (
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            ) : (
                              // Nếu không, hiển thị icon "Phát"
                              <svg className={`w-5 h-5 text-gold-600`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>

                        {/* Trình phát video, chỉ hiển thị nếu 'isPlaying' là true và có embedUrl */}
                        {isPlaying && embedUrl && (
                          <div className="relative" style={{ paddingTop: '56.25%' /* 16:9 */ }}>
                            <iframe
                              width="100%"
                              height="100%"
                              src={embedUrl} // URL đã thêm ?autoplay=1
                              title={rec.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="absolute top-0 left-0 w-full h-full rounded-b-lg" // Bo góc dưới
                            ></iframe>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
      
      {/* Hiển thị lỗi nếu có */}
      {!loading && error && (
        <p className="text-center text-red-600 text-lg bg-red-100 p-4 rounded-lg">
          <span className="font-bold">Lỗi:</span> {error}
        </p>
      )}
    </div>
  );
};

export default MusicPage;
