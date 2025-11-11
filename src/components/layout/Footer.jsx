import React from 'react';
import { FacebookIcon, YoutubeIcon } from '../../utils/icons';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white mt-32">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FacebookIcon className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <YoutubeIcon className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2025 Ca Đoàn Mân Côi. Mọi quyền được bảo lưu.
            </p>
            <p className="text-center text-sm text-gray-500 mt-1">
              Địa chỉ: 123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;