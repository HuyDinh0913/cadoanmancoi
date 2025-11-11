import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../components/common/UIElements';
import LoadingSpinner from '../components/common/Loading';
import { API_BASE_URL } from '../utils/constants';

// Component Card Album
const GalleryAlbumCard = ({ album }) => (
  <div className="group relative rounded-lg shadow-lg overflow-hidden cursor-pointer">
    <img
      src={album.cover_image_url}
      alt={album.title}
      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60"></div>
    <div className="absolute bottom-0 left-0 p-6">
      <h3 className="text-2xl font-bold font-serif text-white">{album.title}</h3>
    </div>
  </div>
);

// Trang Thư Viện
const GalleryPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        // const response = await fetch(`${API_BASE_URL}/gallery/albums`);
        // if (!response.ok) {
        //   throw new Error('Không thể tải thư viện ảnh');
        // }
        // const data = await response.json();
        // setAlbums(data);

        // --- GIẢ LẬP DỮ LIỆU (vì chưa có API thật) ---
        setTimeout(() => { // Giả lập độ trễ mạng
          setAlbums([
            { id: 1, title: 'Đêm Thánh Ca Giáng Sinh 2024', cover_image_url: 'https://placehold.co/400x300/B08F5A/FFFFFF?text=Giáng+Sinh' },
            { id: 2, title: 'Hình Ảnh Lễ Bổn Mạng 2024', cover_image_url: 'https://placehold.co/400x300/2C3A55/FFFFFF?text=Bổn+Mạng' },
            { id: 3, title: 'Dã ngoại hè 2024', cover_image_url: 'https://placehold.co/400x300/CCCCCC/000000?text=Dã+Ngoại' },
          ]);
           setLoading(false);
        }, 500);
        // --- KẾT THÚC GIẢ LẬP ---

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle>Thư Viện Ảnh</SectionTitle>
      
      {loading && <LoadingSpinner />}
      {error && <p className="text-center text-red-600">{error}</p>}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <GalleryAlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;