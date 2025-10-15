// src/context/AuthContext.tsx
'use client';
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface User {
  userId: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  login: () => { },
  logout: () => { },
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter()

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      try {
        const decoded: any = jwtDecode(savedToken);
        setUser({ userId: decoded.userId, email: decoded.email });
        setToken(savedToken);
      } catch (err) {
        console.error('Invalid token', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (jwt: string) => {
    try {
      const decoded: any = jwtDecode(jwt);
      setUser({ userId: decoded.userId, email: decoded.email });
      setToken(jwt);
      localStorage.setItem('token', jwt);
      setTimeout(() => {
        router.push('/main/all-clients');
      }, 800);

    } catch (err) {
      console.error('Invalid JWT', err);
      setUser(null);
      setToken(null);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
