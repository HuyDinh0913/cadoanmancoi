import React, { useMemo } from 'react';
// Trong dự án thật, bạn cần cài đặt và import như sau:
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// KHAI BÁO CÁC HÀM CẦN THIẾT (Trong dự án thật)
// const localizer = momentLocalizer(moment);
const localizer = {
    // Đây là placeholder cho localizer
    localize: (label, method) => label,
    format: (value, format) => value,
    propType: () => null,
};


/**
 * @typedef {Object} EventData
 * @property {number} id
 * @property {string} title
 * @property {string} start_time
 * @property {string} location
 * // ... và các trường khác
 */

/**
 * Component mô phỏng việc sử dụng react-big-calendar.
 * @param {Array<EventData>} events - Mảng các sự kiện đã được tải từ API.
 */
const CalendarComponent = ({ events }) => {
    
    // --- 1. CHUYỂN ĐỔI DỮ LIỆU SỰ KIỆN CHO LỊCH ---
    const calendarEvents = useMemo(() => {
        if (!events || events.length === 0) return [];
        
        // react-big-calendar yêu cầu các trường 'title', 'start', 'end'
        return events.map(event => ({
            id: event.id,
            title: event.title,
            start: new Date(event.start_time), // Phải là đối tượng Date
            end: new Date(event.start_time),   // Giả sử sự kiện kéo dài 1 giờ
            resource: {
                location: event.location,
                eventType: event.event_type
            }
        }));
    }, [events]);


    // --- 2. CÀI ĐẶT CÁC THIẾT LẬP CỦA LỊCH ---
    const defaultDate = new Date(); 
    
    const messages = { // Tùy chỉnh ngôn ngữ tiếng Việt
        next: 'Sau',
        previous: 'Trước',
        today: 'Hôm nay',
        month: 'Tháng',
        week: 'Tuần',
        day: 'Ngày',
        agenda: 'Danh sách',
        noEventsInRange: 'Không có sự kiện nào trong khoảng này.',
    };
    
    // Thiết lập tùy chỉnh màu sắc cho các loại sự kiện
    const eventStyleGetter = (event, start, end, isSelected) => {
        let backgroundColor = '#3174AD'; // Màu mặc định
        switch (event.resource.eventType) {
            case 'mass': // Thánh Lễ
                backgroundColor = '#B08F5A'; // Màu Vàng Đồng (Gold-600)
                break;
            case 'wedding': // Hôn Phối
                backgroundColor = '#2C3A55'; // Màu Navy (Navy-700)
                break;
            case 'meeting': // Tập hát/Họp
                backgroundColor = '#10B981'; // Màu Xanh lá (Teal/Emerald)
                break;
            default:
                backgroundColor = '#9CA3AF'; // Xám
        }
        
        return {
            style: {
                backgroundColor,
                borderRadius: '5px',
                opacity: 0.9,
                color: 'white',
                border: '0px',
                display: 'block',
            }
        };
    };

    // --- 3. COMPONENT LỊCH (Mô phỏng) ---
    return (
        <div className="calendar-container h-[70vh] min-h-[500px]">
            {/* Trong dự án thật, bạn sẽ dùng thẻ <Calendar /> */}
            {/* <Calendar 
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                defaultDate={defaultDate}
                messages={messages}
                style={{ height: '100%' }}
                eventPropGetter={eventStyleGetter}
            /> */}
            
            <div className="flex flex-col items-center justify-center h-full border-4 border-dashed border-gold-600/50 rounded-lg p-8 bg-gray-50/50">
                <CalendarIcon className="w-16 h-16 text-gold-600 mb-4"/>
                <p className="text-xl font-medium text-navy-700 text-center">
                    PLACEHOLDER: Component `react-big-calendar` sẽ được tích hợp tại đây.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    Tổng số sự kiện đã tải: {calendarEvents.length}
                </p>
                <div className="mt-4 text-xs">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#B08F5A] text-white mr-2">Thánh Lễ</span>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#2C3A55] text-white mr-2">Hôn Phối</span>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#10B981] text-white">Tập Hát</span>
                </div>
            </div>
            
        </div>
    );
};

export default CalendarComponent;