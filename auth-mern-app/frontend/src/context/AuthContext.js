import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(localStorage.getItem('loggedInUser') || '');

  const login = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('loggedInUser', username);
    setIsAuthenticated(true);
    setUser(username);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser('');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
