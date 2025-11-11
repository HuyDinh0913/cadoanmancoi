import React from 'react';

/**
 * Component hiển thị spinner loading đơn giản
 */
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div
      className="w-12 h-12 rounded-full animate-spin
                  border-4 border-solid border-gold-600 border-t-transparent"
    ></div>
  </div>
);

export default LoadingSpinner;