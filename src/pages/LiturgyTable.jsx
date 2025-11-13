import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';

// ====================================================
// 1. DATA VÀ HÀM TRỢ GIÚP CHO LỊCH PHỤNG VỤ
// ====================================================

const daysOfWeekVi = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

// Hàm chuyển đổi ngày từ 'YYYY-MM-DD' sang 'DD/MM'
const formatDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return "N/A";
    const parts = dateString.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}`;
    }
    return dateString;
}

// Hàm xác định ngày trong tuần
const getDayOfWeek = (dateString) => {
    try {
        const [y, m, d] = dateString.split('-').map(Number);
        const date = new Date(Date.UTC(y, m - 1, d));
        const dayIndex = date.getUTCDay(); // 0 = CN, 1 = T2, ..., 6 = T7
        return daysOfWeekVi[dayIndex];
    } catch (e) { return "N/A"; }
};

// Dữ liệu Phụng Vụ đầy đủ cho Tháng 11 và Tháng 12 năm 2025
const fullCalendarData = [
    // --- DỮ LIỆU THÁNG 11 NĂM 2025 ---
    { date: "2025-11-01", title: "Lễ trọng Các Thánh Nam Nữ", color: "Trắng", readings: "Bài đọc: Rm 11:1-2,11-12,25-29; Tv 94:12-13,14-15,17-18; Lc 14:1,7-11" },
    { date: "2025-11-02", title: "Cầu Cho Các Tín Hữu Đã Qua Đời", color: "Tím", readings: "Bài đọc: Rm 6:3-9; Ga 6:51-59; Kh 3:1-9; Lc 23:33,39-43; Rm 5:4-11; Ga 17:24-26" },
    { date: "2025-11-03", title: "Thứ Hai tuần XXXI Mùa Quanh Năm (Thánh Mác-ti-nô Pô-rét)", color: "Xanh", readings: "Bài đọc: Rm 11:29-36; Tv 69:30-31,33-34,36-37; Lc 14:12-14" },
    { date: "2025-11-04", title: "Lễ nhớ Thánh Ca-rô-lô Bô-rô-mê-ô, giám mục", color: "Trắng", readings: "Bài đọc: Rm 12:5-16a; Tv 131:1,2,3; Lc 14:15-24" },
    { date: "2025-11-05", title: "Thứ Tư tuần XXXI Mùa Quanh Năm", color: "Xanh", readings: "Bài đọc: Rm 13:8-10; Tv 112:1-2,4-5,9; Lc 14:25-33" },
    { date: "2025-11-06", title: "Thứ Năm tuần XXXI Mùa Quanh Năm", color: "Xanh", readings: "Bài đọc: Rm 14:7-12; Tv 139:1-3,4-6,13-14ab; Lc 15:1-10" },
    { date: "2025-11-07", title: "Thứ Sáu tuần XXXI Mùa Quanh Năm", color: "Xanh", readings: "Bài đọc: Rm 15:14-21; Tv 98:1,2-3ab,3cd-4; Lc 16:1-8" },
    { date: "2025-11-08", title: "Thứ Bảy tuần XXXI Mùa Quanh Năm", color: "Xanh", readings: "Bài đọc: Rm 16:3-9,16,22-27; Tv 145:2-3,4-5,10-11; Lc 16:9-15" },
    { date: "2025-11-09", title: "Chúa Nhật XXXII Thường Niên", color: "Xanh", readings: "Bài đọc: Kh 7:2-4, 9-14; Tv 24:1-2, 3-4ab, 5-6; 1 Ga 3:1-3; Mt 5:1-12a" },
    { date: "2025-11-10", title: "Thứ Hai tuần XXXII Mùa Quanh Năm (Thánh Lê-ô Cả, giáo hoàng)", color: "Xanh", readings: "Bài đọc: Kh 1:1-4,2:1-5; Tv 1:1-2,3,4,6; Lc 18:35-43" },
    { date: "2025-11-11", title: "Lễ nhớ Thánh Mác-ti-nô Tua, giám mục", color: "Trắng", readings: "Bài đọc: Kh 3:1-6,14-22; Tv 15:2-3ab,3cd-4ab,5; Lc 19:1-10" },
    { date: "2025-11-12", title: "Thứ Tư tuần XXXII Mùa Quanh Năm (Thánh Giô-sa-phát)", color: "Xanh", readings: "Bài đọc: Kh 4:1-11; Tv 150:1-2,3-4,5-6; Lc 19:11-28" },
    { date: "2025-11-13", title: "Thứ Năm tuần XXXII Mùa Quanh Năm", color: "Xanh", readings: "Bài đọc: Kh 5:1-10; Tv 149:1-2,3-4,5-6a,9b; Lc 19:41-44" },
    { date: "2025-11-14", title: "Thứ Sáu tuần XXXII Mùa Quanh Năm", color: "Xanh", readings: "Bài đọc: Kh 10:8-11; Tv 119:14,24,72,103,111,131; Lc 19:45-48" },
    { date: "2025-11-15", title: "Thứ Bảy tuần XXXII Mùa Quanh Năm (Thánh An-béc-tô Cả)", color: "Xanh", readings: "Bài đọc: Kh 11:4-12; Tv 144:1,2,9-10; Lc 20:27-40" },
    { date: "2025-11-16", title: "Chúa Nhật XXXIII Thường Niên", color: "Xanh", readings: "Bài đọc: Cn 31:10-13, 19-20, 30-31; Tv 128:1-2, 3, 4-5; 1 Tx 5:1-6; Mt 25:14-30" },
    { date: "2025-11-17", title: "Thứ Hai tuần XXXIII Mùa Quanh Năm (Thánh Ép-rai-mơ)", color: "Xanh", readings: "Bài đọc: Kh 14:1-3,4b-5; Tv 24:1-2,3-4ab,5-6; Lc 21:1-4" },
    { date: "2025-11-18", title: "Lễ nhớ Cung hiến hai đền thờ Thánh Phê-rô và Thánh Phao-lô", color: "Trắng", readings: "Bài đọc: Kh 14:14-19; Tv 96:10,11-12,13; Lc 21:5-11" },
    { date: "2025-11-19", title: "Thứ Tư tuần XXXIII Mùa Quanh Năm", color: "Xanh", readings: "Bài đọc: Kh 15:1-4; Tv 98:1,2-3ab,7-8,9; Lc 21:12-19" },
    { date: "2025-11-20", title: "Thứ Năm tuần XXXIII Mùa Quanh Năm", color: "Xanh", readings: "Bài đọc: Kh 18:1-2,21-23;19:1-3,9a; Tv 100:2,3,4,5; Lc 21:20-28" },
    { date: "2025-11-21", title: "Lễ nhớ Đức Mẹ dâng mình trong đền thờ", color: "Trắng", readings: "Bài đọc: 1 Mcb 4:36-37,52-59; 1 Sb 29:10,11,11-12,12; Lc 19:45-48" },
    { date: "2025-11-22", title: "Lễ nhớ Thánh Xê-xi-li-a, trinh nữ, tử đạo", color: "Đỏ", readings: "Bài đọc: 1 Mcb 6:1-13; Tv 9:2-3,4,6,16,19; Lc 20:27-40" },
    { date: "2025-11-23", title: "Lễ trọng Chúa Kitô Vua", color: "Trắng", readings: "Bài đọc: 2 Sm 5:1-3; Tv 122:1-2,3-4,4-5; Cl 1:12-20; Lc 23:35-43" },
    { date: "2025-11-24", title: "Thứ Hai tuần XXXIV Mùa Quanh Năm (Thánh An-rê Dũng Lạc và Các Bạn Tử Đạo VN)", color: "Xanh", readings: "Bài đọc: St 6:5-11,21; Tv 33:1-2,4-5,18-19; Lc 21:1-4" },
    { date: "2025-11-25", title: "Thứ Ba tuần XXXIV Mùa Quanh Năm", color: "Xanh", readings: "Bài đọc: Kh 20:1-4,11-21:2; Tv 84:3,4,5-6a,8a; Lc 21:5-11" },
    { date: "2025-11-26", title: "Thứ Tư tuần XXXIV Mùa Quanh Năm", color: "Xanh", readings: "Bài đọc: Kh 21:9b-14; Tv 145:10-11,12-13ab,17-18; Lc 21:12-19" },
    { date: "2025-11-27", title: "Thứ Năm tuần XXXIV Mùa Quanh Năm", color: "Xanh", readings: "Bài đọc: Kh 22:1-7; Tv 95:1-2ab,5-6,7b-8a,9; Lc 21:20-28" },
    { date: "2025-11-28", title: "Thứ Sáu tuần XXXIV Mùa Quanh Năm", color: "Xanh", readings: "Bài đọc: Kh 22:8-17; Tv 23:1-3a,3b-4,5,6; Lc 21:29-33" },
    { date: "2025-11-29", title: "Thứ Bảy tuần XXXIV Mùa Quanh Năm", color: "Xanh", readings: "Bài đọc: Kh 22:1-7; Tv 95:1-2ab,5-6,7b-8a,9; Lc 21:20-28" },
    { date: "2025-11-30", title: "Chúa Nhật I Mùa Vọng", color: "Tím", readings: "Bài đọc: Is 2:1-5; Tv 122:1-2,3-4,4-5,6-7,8-9; Rm 13:11-14; Mt 24:37-44" },
    
    // --- DỮ LIỆU THÁNG 12 NĂM 2025 ---
    { date: "2025-12-01", title: "Thứ Hai tuần I Mùa Vọng", color: "Tím", readings: "Bài đọc: Is 4:2-6; Tv 122:1-2,3-4,4-5,6-7,8-9; Mt 8:5-11" },
    { date: "2025-12-02", title: "Thứ Ba tuần I Mùa Vọng", color: "Tím", readings: "Bài đọc: Is 11:1-10; Tv 72:1-2,7-8,12-13,17; Lc 10:21-24" },
    { date: "2025-12-03", title: "Lễ nhớ Thánh Phan-xi-cô Xa-vi-ê, linh mục", color: "Trắng", readings: "Bài đọc: Is 25:6-10a; Tv 23:1-3a,3b-4,5,6; Mt 15:29-37" },
    { date: "2025-12-04", title: "Thứ Năm tuần I Mùa Vọng (Thánh Gio-an Đa-mát-xen-nô)", color: "Tím", readings: "Bài đọc: Is 26:1-6; Tv 118:1,8-9,19-21,25-27a; Mt 7:21,24-27" },
    { date: "2025-12-05", title: "Thứ Sáu tuần I Mùa Vọng", color: "Tím", readings: "Bài đọc: Is 29:17-24; Tv 27:1,4,13-14; Mt 9:27-31" },
    { date: "2025-12-06", title: "Thứ Bảy tuần I Mùa Vọng (Thánh Ni-cô-la)", color: "Tím", readings: "Bài đọc: Is 30:19-21,23-26; Tv 147:1-2,3-4,5-6; Mt 9:35-10:1,5a,6-8" },
    { date: "2025-12-07", title: "Chúa Nhật II Mùa Vọng", color: "Tím", readings: "Bài đọc: Is 11:1-10; Tv 72:1-2,7-8,12-13,17; Rm 15:4-9; Mt 3:1-12" },
    { date: "2025-12-08", title: "Lễ trọng Đức Mẹ Vô Nhiễm Nguyên Tội (Lễ buộc)", color: "Trắng", readings: "Bài đọc: St 3:9-15, 20; Tv 98:1, 2-3ab, 3cd-4, 4; Ep 1:3-6, 11-12; Lc 1:26-38" },
    { date: "2025-12-09", title: "Thứ Hai tuần II Mùa Vọng (Thánh Gio-an Đi-ê-gô)", color: "Tím", readings: "Bài đọc: Is 35:1-10; Tv 85:9ab,10,11-12,13-14; Lc 5:17-26" },
    { date: "2025-12-10", title: "Thứ Ba tuần II Mùa Vọng", color: "Tím", readings: "Bài đọc: Is 40:1-11; Tv 96:1-2,3,10,11-12,13; Mt 18:12-14" },
    { date: "2025-12-11", title: "Thứ Tư tuần II Mùa Vọng (Thánh Đa-ma-sô I)", color: "Tím", readings: "Bài đọc: Is 40:25-31; Tv 103:1-2,3-4,8,10; Mt 11:28-30" },
    { date: "2025-12-12", title: "Thứ Năm tuần II Mùa Vọng (Đức Mẹ Guadalupe)", color: "Tím", readings: "Bài đọc: Is 41:13-20; Tv 145:1,9,10-11,12-13ab; Mt 11:7,11-15" },
    { date: "2025-12-13", title: "Lễ nhớ Thánh Lu-xi-a, trinh nữ, tử đạo", color: "Đỏ", readings: "Bài đọc: Is 48:17-19; Tv 1:1-2,3,4,6; Mt 11:16-19" },
    { date: "2025-12-14", title: "Chúa Nhật III Mùa Vọng (Gaudete)", color: "Hồng", readings: "Bài đọc: Is 35:1-6a, 10; Tv 146:6-7,8-9,9-10; Gc 5:7-10; Mt 11:2-11" },
    { date: "2025-12-15", title: "Thứ Hai tuần III Mùa Vọng (Thánh Gio-an Thánh Giá)", color: "Tím", readings: "Bài đọc: Dân số 24:2-7,15-17a; Tv 25:4-5ab,6,7bc,8-9; Mt 21:23-27" },
    { date: "2025-12-16", title: "Thứ Ba tuần III Mùa Vọng", color: "Tím", readings: "Bài đọc: Xph 3:1-2,9-13; Tv 34:2-3,6-7,17-18,19,23; Mt 21:28-32" },
    { date: "2025-12-17", title: "Thứ Tư tuần III Mùa Vọng (7 Ngày trước Lễ Giáng Sinh)", color: "Tím", readings: "Bài đọc: St 49:2,8-10; Tv 72:1-2,3-4ab,7-8,17; Mt 1:1-17" },
    { date: "2025-12-18", title: "Thứ Năm tuần III Mùa Vọng (6 Ngày trước Lễ Giáng Sinh)", color: "Tím", readings: "Bài đọc: Gr 23:5-8; Tv 72:1-2,12-13,18-19; Mt 1:18-25" },
    { date: "2025-12-19", title: "Thứ Sáu tuần III Mùa Vọng (5 Ngày trước Lễ Giáng Sinh)", color: "Tím", readings: "Bài đọc: Tl 13:2-7,24-25a; Tv 71:3-4a,5-6ab,16-17; Lc 1:5-25" },
    { date: "2025-12-20", title: "Thứ Bảy tuần III Mùa Vọng (4 Ngày trước Lễ Giáng Sinh)", color: "Tím", readings: "Bài đọc: Is 7:10-14; Tv 24:1-2,3-4ab,5-6; Lc 1:26-38" },
    { date: "2025-12-21", title: "Chúa Nhật IV Mùa Vọng (3 Ngày trước Lễ Giáng Sinh)", color: "Tím", readings: "Bài đọc: Is 7:10-14; Tv 24:1-2,3-4,5-6; Rm 1:1-7; Mt 1:18-24" },
    { date: "2025-12-22", title: "Thứ Hai tuần IV Mùa Vọng (2 Ngày trước Lễ Giáng Sinh)", color: "Tím", readings: "Bài đọc: 1 Sm 1:24-28; 1 Sm 2:1,4-5,6-7,8; Lc 1:46-56" },
    { date: "2025-12-23", title: "Thứ Ba tuần IV Mùa Vọng (1 Ngày trước Lễ Giáng Sinh)", color: "Tím", readings: "Bài đọc: St 3:1-4,23-24; Tv 25:4-5,8-9,10,14; Lc 1:57-66" },
    { date: "2025-12-24", title: "Lễ Vọng Chúa Giáng Sinh (Tối 24)", color: "Tím", readings: "Bài đọc: Is 62:1-5; Tv 89:4-5,16-17,27-29; Cv 13:16-17,22-25; Mt 1:1-25; Is 9:1-6; Tv 96:1-2,2-3,11-12,132; Lc 2:1-14" },
    { date: "2025-12-25", title: "Lễ trọng Chúa Giáng Sinh", color: "Trắng", readings: "Lễ Ban Ngày: Is 52:7-10; Tv 98:1, 2-3ab, 3cd-4, 5-6; Dt 1:1-6; Ga 1:1-18" },
    { date: "2025-12-26", title: "Lễ kính Thánh Stê-pha-nô, tử đạo tiên khởi", color: "Đỏ", readings: "Bài đọc: Cv 6:8-10; 7:54-59; Tv 31:3cd-4,6,8ab,16bc,17; Mt 10:17-22" },
    { date: "2025-12-27", title: "Lễ kính Thánh Gio-an, tông đồ, thánh sử", color: "Trắng", readings: "Bài đọc: 1 Ga 1:1-4; Tv 97:1-2,5-6,11-12; Ga 20:2-8" },
    { date: "2025-12-28", title: "Lễ kính Thánh Gia Thất", color: "Trắng", readings: "Bài đọc: St 15:1-6; 21:1-3; Tv 105:1-2,3-4,5-6,8-9; Dt 11:8,11-12,17-19; Lc 2:22-40" },
    { date: "2025-12-29", title: "Thứ Hai trong Tuần Bát Nhật Giáng Sinh (Các Thánh Anh Hài)", color: "Trắng", readings: "Bài đọc: 1 Ga 2:3-11; Tv 96:1-2a,2b-3,5b-6; Lc 2:22-35" },
    { date: "2025-12-30", title: "Thứ Ba trong Tuần Bát Nhật Giáng Sinh", color: "Trắng", readings: "Bài đọc: 1 Ga 2:12-17; Tv 96:7-8a,8b-9,10; Lc 2:36-40" },
    { date: "2025-12-31", title: "Thứ Tư trong Tuần Bát Nhật Giáng Sinh (Thánh Xy-ve-xtơ I)", color: "Trắng", readings: "Bài đọc: 1 Ga 2:18-21; Tv 96:1-2,11-12,13; Ga 1:1-18" }
];

// Phân nhóm dữ liệu theo tháng
const calendarData = fullCalendarData.reduce((acc, item) => {
    const month = parseInt(item.date.split('-')[1]);
    if (!acc[month]) {
        acc[month] = { name: `Tháng ${month} Năm 2025`, data: [] };
    }
    acc[month].data.push(item);
    return acc;
}, {});


const getColorClasses = (color) => {
    const safeColor = color.replace('Áo Lễ:', '').trim();
    switch (safeColor) {
        case "Trắng":
            return { bg: 'bg-white border border-gray-300/80', text: 'text-gray-800 font-semibold' };
        case "Đỏ":
            return { bg: 'bg-red-200', text: 'text-red-800 font-semibold' };
        case "Tím":
            return { bg: 'bg-purple-200', text: 'text-purple-800 font-semibold' };
        case "Hồng":
            return { bg: 'bg-pink-200', text: 'text-pink-800 font-semibold' };
        case "Xanh":
        default:
            return { bg: 'bg-green-200', text: 'text-green-800 font-semibold' };
    }
};

// ====================================================
// 2. COMPONENT LỊCH PHỤNG VỤ
// ====================================================

const LiturgyTable = () => {
    // Chỉ hiển thị tháng 11 mặc định
    const [currentMonth, setCurrentMonth] = useState(11); 
    const [message, setMessage] = useState(null);

    const switchMonth = (month) => {
        if (!calendarData[month]) {
            setMessage(`Không có dữ liệu lịch cho Tháng ${month} năm 2025.`);
            return;
        }
        setCurrentMonth(month);
    };

    const closeMessage = () => {
        setMessage(null);
    };

    const currentMonthData = calendarData[currentMonth];
    const calendarDays = currentMonthData ? currentMonthData.data : [];

    // CSS tùy chỉnh cho bảng và màu sắc
    const customStyle = `
        .styled-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border-radius: 0.75rem;
            overflow: hidden; 
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .styled-table thead th {
            padding: 1rem 0.75rem;
            background-color: #3b82f6; /* Blue-500 */
            color: white;
            font-weight: bold;
            text-align: left;
            border: none;
        }
        .styled-table tbody tr:not(.sunday-row) {
            transition: background-color 0.15s ease-in-out;
        }
        .styled-table tbody tr:nth-child(even):not(.sunday-row) {
            background-color: #FDFBF5; /* gray-50 */
        }
        .styled-table tbody tr:hover:not(.sunday-row) {
            background-color: #FDFBF5; /* gray-100 */
        }
        .sunday-row {
            background-color: #FFE5E5 !important;
            color: #A00000;
            font-weight: 600;
        }
        .sunday-row:hover {
            background-color: #FFD0D0 !important;
        }
        /* Responsive Table */
        @media (max-width: 768px) {
            .styled-table { display: block; }
            .styled-table thead { display: none; }
            .styled-table tbody, .styled-table tr { display: block; width: 100%; }
            .styled-table tr {
                margin-bottom: 0.75rem;
                border: 1px solid #3b82f6;
                border-radius: 0.5rem;
            }
            .styled-table td {
                display: block;
                text-align: right;
                border: none;
                border-bottom: 1px solid #eee;
                position: relative;
                padding-left: 50%;
            }
            .styled-table td:before {
                content: attr(data-label);
                position: absolute;
                left: 0.75rem;
                width: 45%;
                white-space: nowrap;
                text-align: left;
                font-weight: bold;
                color: #1e3a8a; /* Blue-900 */
            }
            .styled-table td:last-child { border-bottom: none; }
        }
    `;

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans">
            <style>{customStyle}</style>

            <div className="max-w-7xl mx-auto">
                <header className="text-center py-6">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 flex items-center justify-center space-x-3">
                        <Calendar className="w-10 h-10 text-blue-600" />
                        <span>Lịch Phụng Vụ Công Giáo</span>
                    </h1>
                    <p className="mt-2 text-xl font-semibold text-gray-600">
                        {currentMonthData ? currentMonthData.name : "Đang tải..."}
                    </p>
                </header>

                {/* Nút chuyển đổi tháng */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {[11, 12].map(month => (
                        <button 
                            key={month}
                            onClick={() => switchMonth(month)} 
                            className={`px-6 py-2 rounded-lg text-white transition shadow-md font-medium hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                                ${currentMonth === month ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                        >
                            Xem Tháng {month}
                        </button>
                    ))}
                </div>

                {/* Container Lịch (Bảng) */}
                <div className="overflow-x-auto">
                    <table className="styled-table bg-white">
                        <thead>
                            <tr>
                                <th className="w-[15%]">Ngày</th>
                                <th className="w-[10%]">Màu Áo Lễ</th>
                                <th className="w-[25%]">Nội Dung Lễ</th>
                                <th className="w-[50%]">Bài Đọc / Tin Mừng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calendarDays.length > 0 ? (
                                calendarDays.map((day, index) => {
                                    const dayOfWeek = getDayOfWeek(day.date);
                                    // Kiểm tra nếu là Chủ Nhật hoặc có chứa từ "Chúa Nhật"
                                    const isSunday = dayOfWeek === 'Chủ Nhật' || day.title.includes("Chúa Nhật"); 
                                    const { bg, text } = getColorClasses(day.color);
                                    
                                    const rowClass = isSunday 
                                        ? 'sunday-row' 
                                        : (index % 2 === 0 ? 'bg-white' : 'bg-gray-50');

                                    return (
                                        <tr key={day.date} className={rowClass}>
                                            <td data-label="Ngày" className="whitespace-nowrap py-3 px-2 sm:px-4 text-sm">
                                                <span className="font-semibold">{dayOfWeek}</span>, {formatDate(day.date)}
                                            </td>
                                            <td data-label="Màu Áo Lễ" className="py-3 px-2 sm:px-4">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs ${bg} ${text}`}>
                                                    {day.color.replace('Áo Lễ:', '').trim()}
                                                </span>
                                            </td>
                                            <td data-label="Nội Dung Lễ" className="text-sm py-3 px-2 sm:px-4 text-gray-800">
                                                {day.title}
                                            </td>
                                            <td data-label="Bài Đọc / Tin Mừng" className="text-xs text-gray-600 py-3 px-2 sm:px-4 break-words">
                                                {day.readings}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-500">
                                        Không tìm thấy dữ liệu lịch phụng vụ cho tháng này.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Thông Báo */}
            {message && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full relative">
                        <button onClick={closeMessage} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                        <p className="text-lg font-medium text-gray-800 mb-4 text-center">{message}</p>
                        <button 
                            onClick={closeMessage} 
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-150 mt-2"
                        >
                            Đã hiểu
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default LiturgyTable;
