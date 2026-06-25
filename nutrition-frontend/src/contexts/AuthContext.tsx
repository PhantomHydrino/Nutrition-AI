
import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as loginApi } from '../api/auth';
import api, { setAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();




  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        setAuthToken(storedToken);

        await api.get('/auth/me');

        setToken(storedToken);
      } catch {
        localStorage.removeItem('token');
        setAuthToken(undefined);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);


  
  const login = async (email: string, password: string) => {
    const t = await loginApi(email, password);

    localStorage.setItem('token', t);
    setAuthToken(t);
    setToken(t);

    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(undefined);
    setToken(null);

    navigate('/login');
  };

 
  if (loading==true){
    return <div>....loading....</div>
  }
  return (
    <AuthContext.Provider value={{ token, login, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const c = useContext(AuthContext);
  if (!c) throw new Error('useAuth must be used within AuthProvider');
  return c;
};