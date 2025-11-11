/**
 * URL gốc của API backend.
 * Khi ở local, nó có thể là 'http://localhost:8080/api/v1'
 * Khi deploy, nó là '/api/v1' (nếu dùng proxy)
 */
export const API_BASE_URL = 'https://cadoanmancoiproject.onrender.com'; // Mô phỏng proxy

/**
 * Hàm helper để chuẩn hóa (bỏ dấu) chữ Tiếng Việt
 * Dùng cho tính năng search phía client
 */
export const normalizeVietnamese = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
};
