'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

export default function HomePage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/Pages/Dashboard');
    } else {
      router.replace('/Pages/Login');
    }
  }, [isAuthenticated, router]);

  return null;
}
