'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';
import Loader from '@/components/Loader/Loader';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const {setUser, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const data = await checkSession();
        
        if (data?.email) {
          setUser(data);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearAuth]);

  if (loading) return <Loader />;

  return <>{children}</>;
}