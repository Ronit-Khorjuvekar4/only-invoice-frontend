'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  console.log("user:",user,"isAuthenticated:",isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) router.replace('/auth/login');
  }, [isAuthenticated]);

  if (!isAuthenticated) return null; // or a loader

  return <>{children}</>;
};
