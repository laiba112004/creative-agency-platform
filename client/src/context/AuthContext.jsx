import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('creative_agency_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('creative_agency_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('creative_agency_user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setIsLoginModalOpen(false);
  };

  const loginWithGoogle = () => {
    const googleUser = {
      name: 'Client Workspace',
      email: 'creator.client@gmail.com',
      role: 'Verified Client',
      provider: 'Google SSO'
    };
    setUser(googleUser);
    setIsLoginModalOpen(false);
    return googleUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        login,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
