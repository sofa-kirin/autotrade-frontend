import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const email = localStorage.getItem('userEmail');
    const role = localStorage.getItem('userRole');
    return email ? { email, role } : null;
  });

  const loginUser = (authResponse) => {
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('userEmail', authResponse.email);
    localStorage.setItem('userRole', authResponse.role);
    setToken(authResponse.token);
    setUser({ email: authResponse.email, role: authResponse.role });
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
