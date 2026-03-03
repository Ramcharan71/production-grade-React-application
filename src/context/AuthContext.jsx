import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '../data/user';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('aps-auth') === 'true';
  });
  const [user, setUser] = useState(() => {
    return isAuthenticated ? mockUser : null;
  });

  const login = useCallback((formData) => {
    setIsAuthenticated(true);
    setUser(mockUser);
    localStorage.setItem('aps-auth', 'true');
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('aps-auth');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
