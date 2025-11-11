// import React, { useContext } from 'react';
// import { AppContext } from '../context/AppContext';
// import { SectionTitle } from '../components/common/UIElements';
// import { CalendarIcon, UserIcon, MenuIcon } from '../utils/icons'; // Giả sử MenuIcon là icon cho Gallery

// const ActivitiesPage = () => {
//   const { navigate } = useContext(AppContext);

//   const activityItems = [
//     {
//       title: 'Lịch Phục Vụ',
//       description: 'Xem lịch tập hát và các Thánh lễ ca đoàn phục vụ.',
//       icon: <CalendarIcon className="w-16 h-16 mx-auto text-gold-600 mb-4" />,
//       page: 'events-calendar',
//     },
//     {
//       title: 'Tin Tức & Sự Kiện',
//       description: 'Cập nhật các tin tức, thông báo, và sự kiện mới nhất.',
//       icon: <UserIcon className="w-16 h-16 mx-auto text-gold-600 mb-4" />, // Cần thay icon
//       page: 'news',
//     },
//     {
//       title: 'Thư Viện Ảnh',
//       description: 'Khoảnh khắc đáng nhớ của ca đoàn qua hình ảnh.',
//       icon: <MenuIcon className="w-16 h-16 mx-auto text-gold-600 mb-4" />, // Cần thay icon
//       page: 'gallery',
//     },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//       <SectionTitle>Hoạt Động Ca Đoàn</SectionTitle>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//         {activityItems.map((item) => (
//           <div
//             key={item.page}
//             onClick={() => navigate(item.page)}
//             className="p-8 bg-white rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
//           >
//             {item.icon}
//             <h3 className="text-2xl font-bold font-serif text-navy-900">
//               {item.title}
//             </h3>
//             <p className="mt-2 text-navy-700">{item.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ActivitiesPage;
import React from 'react';
// SỬA 1: Import <Link> thay vì AppContext
import { Link } from 'react-router-dom';
// import { AppContext } from '../context/AppContext'; // 👈 XÓA DÒNG NÀY
import { SectionTitle } from '../components/common/UIElements';
import { CalendarIcon, UserIcon, MenuIcon } from '../utils/icons'; // Giả sử MenuIcon là icon cho Gallery

const ActivitiesPage = () => {
  // SỬA 2: Xóa dòng `useContext`
  // const { navigate } = useContext(AppContext);

  // SỬA 3: Đổi `page` thành `path` (đường dẫn URL)
  const activityItems = [
    {
      title: 'Lịch Phục Vụ',
      description: 'Xem lịch tập hát và các Thánh lễ ca đoàn phục vụ.',
      icon: <CalendarIcon className="w-16 h-16 mx-auto text-gold-600 mb-4" />,
      path: '/events-calendar', // 👈 Đổi
    },
    {
      title: 'Tin Tức & Sự Kiện',
      description: 'Cập nhật các tin tức, thông báo, và sự kiện mới nhất.',
      icon: <UserIcon className="w-16 h-16 mx-auto text-gold-600 mb-4" />, // Cần thay icon
      path: '/news', // 👈 Đổi
    },
    {
      title: 'Thư Viện Ảnh',
      description: 'Khoảnh khắc đáng nhớ của ca đoàn qua hình ảnh.',
      icon: <MenuIcon className="w-16 h-16 mx-auto text-gold-600 mb-4" />, // Cần thay icon
      path: '/gallery', // 👈 Đổi
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle>Hoạt Động Ca Đoàn</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {activityItems.map((item) => (
          // SỬA 4: Thay <div> bằng <Link> và dùng prop `to`
          <Link
            key={item.path}
            to={item.path} // 👈 Chỉ định đường dẫn
            // 👈 Xóa `onClick`
            className="block p-8 bg-white rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            // 👆 Thêm `block` để <Link> (thẻ <a>) xử lý như <div>
          >
            {/* Nội dung bên trong giữ nguyên */}
            {item.icon}
            <h3 className="text-2xl font-bold font-serif text-navy-900">
              {item.title}
            </h3>
            <p className="mt-2 text-navy-700">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;