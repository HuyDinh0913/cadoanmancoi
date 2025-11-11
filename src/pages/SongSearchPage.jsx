// import React, { useState, useEffect } from 'react';
// import { SectionTitle } from '../components/common/UIElements';
// import LoadingSpinner from '../components/common/Loading';
// import {
//   SearchIcon,
//   FileTextIcon,
//   YoutubeIcon,
//   MusicIcon,
// } from '../utils/icons';
// import { API_BASE_URL, normalizeVietnamese } from '../utils/constants';

// // Trang Tìm Bài Hát
// const SongSearchPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredSongs, setFilteredSongs] = useState([]);
//   const [masterSongList, setMasterSongList] = useState([]); // Lưu trữ danh sách gốc
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedSongId, setExpandedSongId] = useState(null);

//   // 1. Tải toàn bộ danh sách bài hát (hoặc một phần) khi component mount
//   useEffect(() => {
//     const fetchAllSongs = async () => {
//       try {
//         setLoading(true);
//         // API thật: /api/v1/songs (có thể cần phân trang sau)
//         const response = await fetch(`${API_BASE_URL}/songs`);
//         if (!response.ok) {
//           throw new Error('Không thể tải danh sách bài hát');
//         }
//         const data = await response.json();
//         setMasterSongList(data);
//         setFilteredSongs(data);
//         setLoading(false);

//         // --- GIẢ LẬP DỮ LIỆU (vì chưa có API thật) ---
//         // setTimeout(() => { // Giả lập độ trễ mạng
//         //   const mockData = [
//         //     { id: 1, title: 'Kinh Hòa Bình', first_line: 'Lạy Chúa từ nhân, xin cho con biết mến yêu', author: 'Lm. Kim Long', songbook: 'Thánh Ca Cộng Đồng', songbook_page: 150, sheet_music_url: '#', youtube_url: 'https://youtube.com', audio_url: '#', lyrics: '...' },
//         //     { id: 2, title: 'Lắng Nghe Lời Chúa', first_line: 'Xin cho con biết lắng nghe Lời Ngài', author: 'Lm. Nguyễn Duy', songbook: 'Ca Lên Đi 2', songbook_page: 52, sheet_music_url: '#', youtube_url: null, audio_url: '#', lyrics: 'Xin cho con biết lắng nghe Lời Ngài...' },
//         //     { id: 3, title: 'Tình Chúa Yêu Con', first_line: 'Tình Chúa yêu con ôi bao la', author: 'Không rõ', songbook: 'Thánh Ca Cộng Đồng', songbook_page: 211, sheet_music_url: null, youtube_url: 'https://youtube.com', audio_url: null, lyrics: '...' },
//         //     { id: 4, title: 'Chúa Chiên Lành', first_line: 'Chúa là mục tử chăn dắt tôi', author: 'Hùng Lân', songbook: 'Tuyển Tập Thánh Ca', songbook_page: null, sheet_music_url: '#', youtube_url: null, audio_url: '#', lyrics: '...' },
//         //     { id: 5, title: 'Tán Tụng Hồng Ân', first_line: 'Ngợi ca tình Chúa, tình Chúa cao vời', author: 'Lm. Kim Long', songbook: 'Ca Lên Đi 1', songbook_page: 12, sheet_music_url: '#', youtube_url: 'https://youtube.com', audio_url: '#', lyrics: '...' },
//         //   ];
//         //   setMasterSongList(mockData);
//         //   setFilteredSongs(mockData);
//         //   setLoading(false);
//         // }, 500);
//         // --- KẾT THÚC GIẢ LẬP ---

//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchAllSongs();
//   }, []);

//   // 2. Lọc danh sách (phía client) khi searchTerm thay đổi
//   useEffect(() => {
//     // Nếu dùng API search:
//     // Hủy bỏ (debounce) và gọi API: fetch(`${API_BASE_URL}/songs/search?q=${searchTerm}`)
//     // Hiện tại, chúng ta lọc phía client:

//     if (!searchTerm) {
//       setFilteredSongs(masterSongList);
//       return;
//     }

//     const normalizedTerm = normalizeVietnamese(searchTerm.trim());
//     const results = masterSongList.filter(
//       (song) =>
//         normalizeVietnamese(song.title).includes(normalizedTerm) ||
//         normalizeVietnamese(song.first_line).includes(normalizedTerm) ||
//         normalizeVietnamese(song.author).includes(normalizedTerm) ||
//         normalizeVietnamese(song.songbook).includes(normalizedTerm)
//     );
//     setFilteredSongs(results);
//   }, [searchTerm, masterSongList]);

//   const toggleLyrics = (id) => {
//     setExpandedSongId((prevId) => (prevId === id ? null : id));
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//       <SectionTitle>Tra Cứu Thánh Ca</SectionTitle>

//       {/* Thanh tìm kiếm */}
//       <div className="max-w-2xl mx-auto mb-12">
//         <div className="relative">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Nhập tên bài hát, câu đầu, tác giả..."
//             className="block w-full px-5 py-4 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold-600 focus:border-gold-600 sm:text-sm"
//           />
//           <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//             <SearchIcon className="h-5 w-5 text-gray-400" />
//           </div>
//         </div>
//       </div>

//       {/* Hiển thị kết quả */}
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         {loading && <LoadingSpinner />}
//         {error && <p className="text-center text-red-600 p-8">{error}</p>}
        
//         {!loading && !error && (
//           <div className="space-y-4 p-4 md:p-8">
//             {filteredSongs.length > 0 ? (
//               filteredSongs.map((song) => (
//                 <div
//                   key={song.id}
//                   className="p-4 border border-gray-200 rounded-lg shadow-sm"
//                 >
//                   <h3 className="text-xl font-bold font-serif text-navy-900">
//                     {song.title}
//                   </h3>

//                   <div className="flex justify-between items-center mt-1">
//                     <p className="text-navy-700 italic">
//                       "{song.first_line}"
//                     </p>
//                     {song.lyrics && (
//                       <button
//                         onClick={() => toggleLyrics(song.id)}
//                         className="text-sm font-medium text-gold-600 hover:text-gold-700 ml-4 flex-shrink-0"
//                       >
//                         {expandedSongId === song.id ? 'Ẩn bớt' : 'Xem đầy đủ'}
//                       </button>
//                     )}
//                   </div>

//                   {expandedSongId === song.id && (
//                     <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
//                       <pre className="whitespace-pre-wrap font-sans text-navy-700">
//                         {song.lyrics.trim()}
//                       </pre>
//                     </div>
//                   )}

//                   <div className="text-sm text-gray-600 mt-2">
//                     <p>
//                       <strong>Tác giả:</strong> {song.author}
//                     </p>
//                     <p>
//                       <strong>Sách:</strong> {song.songbook}
//                       {song.songbook_page && (
//                         <span className="text-gray-500">
//                           {' '}
//                           (tr. {song.songbook_page})
//                         </span>
//                       )}
//                     </p>
//                   </div>

//                   <div className="flex items-center space-x-4 mt-4">
//                     {song.sheet_music_url && (
//                       <a
//                         href={song.sheet_music_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
//                       >
//                         <FileTextIcon className="w-5 h-5 mr-1" />
//                         File nhạc (PDF)
//                       </a>
//                     )}
//                     {song.youtube_url && (
//                       <a
//                         href={song.youtube_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center text-sm font-medium text-red-600 hover:text-red-800"
//                       >
//                         <YoutubeIcon className="w-5 h-5 mr-1" />
//                         YouTube
//                       </a>
//                     )}
//                     {song.audio_url && (
//                       <a
//                         href={song.audio_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center text-sm font-medium text-green-600 hover:text-green-800"
//                       >
//                         <MusicIcon className="w-5 h-5 mr-1" />
//                         File ghi âm
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-navy-700 py-8">
//                 Không tìm thấy bài hát nào phù hợp.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SongSearchPage;

import React, { useState, useEffect, useMemo } from 'react';
import { SectionTitle } from '../components/common/UIElements';
import LoadingSpinner from '../components/common/Loading';
import {
  SearchIcon,
  FileTextIcon,
  YoutubeIcon,
  MusicIcon,
} from '../utils/icons';
import { API_BASE_URL, normalizeVietnamese } from '../utils/constants';

// --- SỬA: TẠO MỘT HOOK ĐỂ "DEBOUNCE" ---
// Hook này giúp trì hoãn việc tìm kiếm cho đến khi người dùng gõ xong
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// --- SỬA: TẠO COMPONENT PHÂN TRANG (PAGINATION) ---
// (Bạn có thể tách component này ra file riêng)
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  // Logic đơn giản để hiển thị 5 trang xung quanh trang hiện tại
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (currentPage - 2 < 1) {
    endPage = Math.min(totalPages, 5);
  }
  if (currentPage + 2 > totalPages) {
    startPage = Math.max(1, totalPages - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null; // Không hiển thị nếu chỉ có 1 trang

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        Trước
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="px-3 py-1 rounded-md text-sm font-medium">1</button>
          <span className="text-gray-500">...</span>
        </>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            currentPage === number
              ? 'bg-gold-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
         <>
          <span className="text-gray-500">...</span>
          <button onClick={() => onPageChange(totalPages)} className="px-3 py-1 rounded-md text-sm font-medium">{totalPages}</button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        Sau
      </button>
    </div>
  );
};


// --- TRANG TÌM BÀI HÁT (ĐÃ SỬA) ---
const SongSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // SỬA: `filteredSongs` đổi thành `songs` (chỉ chứa dữ liệu trang hiện tại)
  const [songs, setSongs] = useState([]); 
  // SỬA: Bỏ `masterSongList`
  // const [masterSongList, setMasterSongList] = useState([]); 
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSongId, setExpandedSongId] = useState(null);

  // SỬA: Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalSongs, setTotalSongs] = useState(0);

  // SỬA: Giới hạn số bài hát mỗi trang
  const SONGS_PER_PAGE = 20;

  // SỬA: Dùng "debounced" search term để gọi API
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Trì hoãn 300ms

  // SỬA: 1. Effect này sẽ reset về trang 1 MỖI KHI người dùng thay đổi tìm kiếm
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm]); // Chỉ phụ thuộc vào `debouncedSearchTerm`

  // SỬA: 2. Effect này fetch data MỖI KHI trang hoặc từ khóa tìm kiếm thay đổi
  useEffect(() => {
    const fetchPaginatedSongs = async () => {
      try {
        setLoading(true);
        setError(null);

        // --- SỬA: Xây dựng query params cho API ---
        const params = new URLSearchParams();
        params.append('page', currentPage);
        params.append('limit', SONGS_PER_PAGE);
        
        const normalizedTerm = normalizeVietnamese(debouncedSearchTerm.trim());
        if (normalizedTerm) {
          params.append('q', normalizedTerm);
        }

        // API thật: /api/v1/songs?page=1&limit=20&q=kinh+hoa+binh
        const response = await fetch(`${API_BASE_URL}/songs?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Không thể tải danh sách bài hát');
        }
        const data = await response.json(); // API thật nên trả về: { data: [], total: 100, totalPages: 5 }
        
        setSongs(data.data);
        setTotalSongs(data.total);
        setTotalPages(data.totalPages);
        setLoading(false);


        // --- SỬA: GIẢ LẬP DỮ LIỆU (MÔ PHỎNG API PHÂN TRANG) ---
        // (Tạo 100 bài hát giả)
        // const mockMasterList = Array.from({ length: 100 }, (_, i) => ({
        //   id: i + 1,
        //   title: i === 0 ? 'Kinh Hòa Bình' : `Bài Hát ${i + 1}`,
        //   first_line: i === 0 ? 'Lạy Chúa từ nhân' : `Câu đầu của bài ${i + 1}`,
        //   author: (i % 5 === 0) ? 'Lm. Kim Long' : 'Không rõ',
        //   songbook: 'Thánh Ca Cộng Đồng',
        //   songbook_page: i + 1,
        //   sheet_music_url: (i % 2 === 0) ? '#' : null,
        //   youtube_url: (i % 3 === 0) ? 'https://youtube.com' : null,
        //   audio_url: (i % 4 === 0) ? '#' : null,
        //   lyrics: 'Lạy Chúa từ nhân, xin cho con biết mến yêu...\nĐem yêu thương vào nơi oán thù...',
        // }));

        // // (Giả lập server lọc)
        // const filteredResults = mockMasterList.filter(
        //   (song) =>
        //     !normalizedTerm ||
        //     normalizeVietnamese(song.title).includes(normalizedTerm) ||
        //     normalizeVietnamese(song.first_line).includes(normalizedTerm) ||
        //     normalizeVietnamese(song.author).includes(normalizedTerm)
        // );

        // // (Giả lập server phân trang)
        // const total = filteredResults.length;
        // const totalPages = Math.ceil(total / SONGS_PER_PAGE);
        // const startIndex = (currentPage - 1) * SONGS_PER_PAGE;
        // const endIndex = startIndex + SONGS_PER_PAGE;
        // const paginatedData = filteredResults.slice(startIndex, endIndex);

        // setTimeout(() => { // Giả lập độ trễ mạng
        //   const mockApiResponse = {
        //     data: paginatedData,
        //     total: total,
        //     totalPages: totalPages,
        //   };

        //   setSongs(mockApiResponse.data);
        //   setTotalSongs(mockApiResponse.total);
        //   setTotalPages(mockApiResponse.totalPages);
        //   setLoading(false);
        // }, 300);
        // --- KẾT THÚC GIẢ LẬP ---

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPaginatedSongs();
  }, [currentPage, debouncedSearchTerm]); // Chạy lại khi trang hoặc từ khóa (debounced) thay đổi

  // SỬA: Bỏ Effect lọc phía client

  const toggleLyrics = (id) => {
    setExpandedSongId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle>Tra Cứu Thánh Ca</SectionTitle>

      {/* Thanh tìm kiếm */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            // SỬA: Chỉ set `searchTerm`, không set `currentPage` ở đây
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Nhập tên bài hát, câu đầu, tác giả, tên sách..."
            className="block w-full px-5 py-4 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold-600 focus:border-gold-600 sm:text-sm"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Hiển thị kết quả */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {loading && <LoadingSpinner />}
        {error && <p className="text-center text-red-600 p-8">{error}</p>}
        
        {!loading && !error && (
          <>
            <div className="space-y-4 p-4 md:p-8">
              {/* SỬA: Hiển thị tổng số kết quả */}
              <p className="text-sm text-gray-600 mb-4">
                Hiển thị {songs.length} trong tổng số {totalSongs} kết quả.
              </p>

              {/* SỬA: Lặp qua `songs` (thay vì `filteredSongs`) */}
              {songs.length > 0 ? (
                songs.map((song) => (
                  <div
                    key={song.id}
                    className="p-4 border border-gray-200 rounded-lg shadow-sm"
                  >
                    {/* ... (Toàn bộ code hiển thị 1 bài hát giữ nguyên) ... */}
                    <h3 className="text-xl font-bold font-serif text-navy-900">
                      {song.title}
                    </h3>
                    {/* ... (first_line, lyrics, author, links...) ... */}
                     <div className="flex justify-between items-center mt-1">
                      <p className="text-navy-700 italic">
                        "{song.first_line}"
                      </p>
                      {song.lyrics && (
                        <button
                          onClick={() => toggleLyrics(song.id)}
                          className="text-sm font-medium text-gold-600 hover:text-gold-700 ml-4 flex-shrink-0"
                        >
                          {expandedSongId === song.id ? 'Ẩn bớt' : 'Xem đầy đủ'}
                        </button>
                      )}
                    </div>

                    {expandedSongId === song.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                        <pre className="whitespace-pre-wrap font-sans text-navy-700">
                          {song.lyrics.trim()}
                        </pre>
                      </div>
                    )}

                    <div className="text-sm text-gray-600 mt-2">
                      <p>
                        <strong>Tác giả:</strong> {song.author}
                      </p>
                      <p>
                        <strong>Sách:</strong> {song.songbook}
                        {song.songbook_page && (
                          <span className="text-gray-500">
                            {' '}
                            (tr. {song.songbook_page})
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 mt-4">
                      {song.sheet_music_url && (
                        <a
                          href={song.sheet_music_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          <FileTextIcon className="w-5 h-5 mr-1" />
                          File nhạc (PDF)
                        </a>
                      )}
                      {song.youtube_url && (
                        <a
                          href={song.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          <YoutubeIcon className="w-5 h-5 mr-1" />
                          YouTube
                        </a>
                      )}
                      {song.audio_url && (
                        <a
                          href={song.audio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm font-medium text-green-600 hover:text-green-800"
                        >
                          <MusicIcon className="w-5 h-5 mr-1" />
                          File ghi âm
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-navy-700 py-8">
                  Không tìm thấy bài hát nào phù hợp.
                </p>
              )}
            </div>

            {/* SỬA: Thêm component phân trang ở cuối */}
            <div className="p-4 md:p-8 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SongSearchPage;