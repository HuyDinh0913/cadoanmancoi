import React from 'react';

// Các component UI tái sử dụng

export const SectionTitle = ({ children }) => (
  <h2 className="text-3xl font-bold font-serif text-navy-900 mb-8 text-center">
    {children}
  </h2>
);

export const PrimaryButton = ({ children, onClick, type = 'button', className = '', disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gold-600 hover:bg-gold-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-600 ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    } ${className}`}
  >
    {children}
  </button>
);

export const FormInput = ({ id, label, type = 'text', required = true, value, onChange, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-navy-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        type={type}
        name={id}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold-600 focus:border-gold-600 sm:text-sm"
        {...props}
      />
    </div>
  </div>
);

export const FormTextarea = ({ id, label, rows = 4, required = true, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-navy-700">
      {label}
    </label>
    <div className="mt-1">
      <textarea
        id={id}
        name={id}
        rows={rows}
        required={required}
        value={value}
        onChange={onChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold-600 focus:border-gold-600 sm:text-sm"
      ></textarea>
    </div>
  </div>
);