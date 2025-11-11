import React from 'react';

/**
 * Component này chứa các style global (hoặc mô phỏng tailwind.config.js)
 * Nó được import trong main.jsx
 */
export const GlobalStyles = () => (
  <style>{`
    body {
      font-family: 'Inter', sans-serif;
      background-color: #FDFBF5; /* Màu bg-cream */
      color: #1a2333; /* Màu text-navy-900 */
    }

    h1, h2, h3, h4, h5, h6, .font-serif {
      font-family: 'Merriweather', serif;
    }

    /* Màu tùy chỉnh (Giả lập tailwind.config.js)
      Trong dự án thật, bạn sẽ định nghĩa chúng trong tailwind.config.js
      và Tailwind sẽ tự động tạo ra các class này.
    */
    .bg-cream { background-color: #FDFBF5; }
    .text-navy-900 { color: #1a2333; }
    .text-navy-700 { color: #2C3A55; }
    .bg-navy-900 { background-color: #1a2333; }
    
    .text-gold-600 { color: #B08F5A; }
    .bg-gold-600 { background-color: #B08F5A; }
    .hover\\:bg-gold-700:hover { background-color: #9A7C4E; }
    .border-gold-600 { border-color: #B08F5A; }
    
    /* Cấu hình cho thư viện 'prose' (dùng cho bài viết) */
    .prose {
        --tw-prose-body: #2C3A55; /* text-navy-700 */
        --tw-prose-headings: #1a2333; /* text-navy-900 */
        --tw-prose-lead: #2C3A55;
        --tw-prose-links: #B08F5A; /* text-gold-600 */
        --tw-prose-bold: #1a2333;
        --tw-prose-counters: #2C3A55;
        --tw-prose-bullets: #B08F5A;
        --tw-prose-hr: #e5e7eb;
        --tw-prose-quotes: #1a2333;
        --tw-prose-quote-borders: #B08F5A;
        /* ... và các biến khác nếu cần */
    }
    
    .text-shadow-heavy {
      /* Thêm một lớp bóng mờ, đậm ngay sau chữ */
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
    }
  `}</style>
);