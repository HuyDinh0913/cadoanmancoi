import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { SectionTitle } from '../components/common/UIElements';
import LoadingSpinner from '../components/common/Loading';
import { API_BASE_URL } from '../utils/constants';

// Trang Góc Thành Viên (đã đăng nhập)
const MemberDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AppContext); // Lấy token để xác thực

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!authToken) {
        setError('Lỗi xác thực. Vui lòng đăng nhập lại.');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // API thật
        // const response = await fetch(`${API_BASE_URL}/members/documents`, {
        //   headers: {
        //     'Authorization': `Bearer ${authToken}`
        //   }
        // });
        // if (!response.ok) {
        //   throw new Error('Không thể tải tài liệu nội bộ');
        // }
        // const data = await response.json();
        // setDocuments(data);
        
        // --- GIẢ LẬP DỮ LIỆU (vì chưa có API thật) ---
        setTimeout(() => { // Giả lập độ trễ mạng
          setDocuments([
            { id: 1, title: 'Đáp Ca Lễ Chúa Nhật V Phục Sinh (PDF)', file_url: '#', document_type: 'sheet_music' },
            { id: 2, title: 'Bài hát mới: "Tình Yêu Chúa"', file_url: '#', document_type: 'sheet_music' },
            { id: 3, title: 'File thu âm bè Alto - "Tình Yêu Chúa" (MP3)', file_url: '#', document_type: 'audio_practice' },
            { id: 4, title: 'Thông báo lịch tập hát Lễ Bổn Mạng', file_url: '#', document_type: 'announcement' },
          ]);
          setLoading(false);
        }, 500);
        // --- KẾT THÚC GIẢ LẬP ---

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [authToken]); // Phụ thuộc vào authToken

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle>Chào Mừng Trở Lại!</SectionTitle>
      
      {loading && <LoadingSpinner />}
      {error && <p className="text-center text-red-600">{error}</p>}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Tài liệu */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold font-serif text-gold-600 mb-6">
              Tài Liệu Tập Hát
            </h3>
            <div className="space-y-3">
              {documents.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-md bg-gray-50 hover:bg-gray-100 border border-gray-200"
                >
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      doc.document_type === 'sheet_music'
                        ? 'bg-blue-100 text-blue-800'
                        : doc.document_type === 'audio_practice'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {doc.document_type === 'sheet_music'
                      ? 'Bản Nhạc'
                      : doc.document_type === 'audio_practice'
                      ? 'File Bè'
                      : 'Thông Báo'}
                  </span>
                  <p className="font-semibold text-navy-700 mt-2">{doc.title}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Thông báo nội bộ (API /members/announcements) */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold font-serif text-gold-600 mb-6">
              Thông Báo Nội Bộ
            </h3>
            <div className="prose text-navy-700">
              <p>
                <strong>Thông báo (25/04/2025):</strong> Nhắc các thành viên đóng quỹ
                sinh hoạt tháng 05/2025 trước ngày 01/05.
              </p>
              <p>
                <strong>Thông báo (20/04/2025):</strong> Lịch tập hát cho Lễ Bổn Mạng
                sẽ tăng cường vào tối thứ 2 và thứ 4 hàng tuần.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;