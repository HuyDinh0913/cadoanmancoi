import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../components/common/UIElements';
import LoadingSpinner from '../components/common/Loading';
import { CalendarIcon, ClockIcon } from '../utils/icons';
import { API_BASE_URL } from '../utils/constants';

// Component con để render chi tiết chương trình
const EventProgram = ({ program }) => {
  if (!program) return null;

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-navy-700 space-y-1">
      {Object.entries(program).map(([part, details]) => {
        const separator = '-';
        const lastSeparatorIndex = details.lastIndexOf(separator);

        let mainPart = details;
        let highlightPart = null;

        if (lastSeparatorIndex >= 0) {
          mainPart = details.substring(0, lastSeparatorIndex).trim();
          highlightPart = details.substring(lastSeparatorIndex + separator.length).trim();
        }

        return (
          <div key={part}>
            <strong className="text-navy-900">{part}:</strong>
            <span> {mainPart}</span>
            {highlightPart !== null && (
              <>
                {mainPart && <span> - </span>}
                {!mainPart && <span>- </span>}
                <span className="text-teal-600 font-medium">{highlightPart}</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Trang Lịch
const EventsCalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        // const response = await fetch(`${API_BASE_URL}/events`);
        // if (!response.ok) {
        //   throw new Error('Không thể tải lịch sự kiện');
        // }
        // const data = await response.json();
        // setEvents(data);

        // --- GIẢ LẬP DỮ LIỆU (vì chưa có API thật) ---
        // (Đây là MOCK_EVENTS từ tệp gốc)
        setTimeout(() => { // Giả lập độ trễ mạng
           setEvents([
            { 
              id: 1, 
              title: 'Lễ Các Thánh Nam Nữ', 
              event_type: 'mass', 
              start_time: '2025-11-01T09:00:00', 
              location: 'Nhà thờ Chính Tòa',
              program: {
                "Nhập lễ": "- Thân con bụi đất - Giấy",
                "Đáp ca": "- TV22 tr 15 TN @Diễm",
                "Alleluia": "- tr 245A TN",
                "Dâng lễ": "- Dâng lên lời kinh - 568 HCĐ",
                "Hiệp lễ": "- Về bên Chúa - 34 TCTH3 (Tím)",
                "Kết lễ": "- Từ chốn luyện hình - 581 HCĐ",
                "Đức Mẹ": "- Mẹ có thấu - 582 HCĐ"
              }
            },
            { id: 2, title: 'Thánh Lễ Hôn Phối (Gia đình A & B)', event_type: 'wedding', start_time: '2025-05-10T14:00:00', location: 'Nhà thờ Giáo xứ', program: null },
            { id: 3, title: 'Tập hát chuẩn bị Lễ Bổn Mạng', event_type: 'meeting', start_time: '2025-05-12T19:30:00', location: 'Phòng sinh hoạt', program: null },
            { id: 4, title: 'Thánh Lễ An Táng (Ông C)', event_type: 'funeral', start_time: '2025-05-15T08:00:00', location: 'Nhà thờ Giáo xứ', program: null },
          ]);
          setLoading(false);
        }, 500);
        // --- KẾT THÚC GIẢ LẬP ---

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle>Lịch Phục Vụ & Sự Kiện</SectionTitle>
      
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-6">
          Component `EventCalendar.js` (dùng react-big-calendar) sẽ được tích hợp tại
          đây.
        </h3>
        <p className="mb-4">Dưới đây là danh sách mô phỏng từ API:</p>
        
        {loading && <LoadingSpinner />}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="p-4 rounded-lg border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <h4 className="font-semibold font-serif text-navy-700">
                      {event.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>{new Date(event.start_time).toLocaleString('vi-VN')}</span>
                    </div>
                  </div>
                  <span className="mt-2 sm:mt-0 inline-block bg-gold-600/10 text-gold-600 text-xs font-medium px-2.5 py-0.5 rounded-full self-start sm:self-center">
                    {event.event_type === 'mass'
                      ? 'Thánh Lễ'
                      : event.event_type === 'wedding'
                      ? 'Hôn Phối'
                      : 'Sự Kiện'}
                  </span>
                </div>
                
                {/* Hiển thị chương trình */}
                <EventProgram program={event.program} />

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCalendarPage;