import React, { createContext, useState } from 'react';
// 1. XÓA BỎ API_BASE_URL (trừ khi dùng cho login)

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  // 3. GIỮ LẠI state của Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password) => {
    // ... (logic đăng nhập của bạn)
    
    // ----- MÔ PHỎNG ĐƠN GIẢN -----
    console.log("Simulating login for:", email);
    setIsLoggedIn(true);
    setAuthToken("mock_token_123");
    // 4. XÓA navigate('dashboard') ở đây.
    // Component Login sẽ tự điều hướng sau khi gọi hàm này.
    return true; // Báo hiệu login thành công
    // ----- KẾT THÚC MÔ PHỎNG -----
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    setCurrentUser(null);
  };

  const value = {
    isLoggedIn,
    authToken,
    currentUser,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};