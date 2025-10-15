// src/app/auth/register/page.tsx
'use client';
import { useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import LoginPage from '@/components/common/LoginPage';

export default function Login() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace('/main/all-clients'); // redirect logged-in users
  }, [user]);

  return <LoginPage />;
}
