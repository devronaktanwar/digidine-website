'use client';

import { useSessionStore } from '@/store/customerStore';
import { useEffect } from 'react';

export default function SessionInitializer() {
  const fetchSession = useSessionStore((state) => state.fetchSession);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return null;
}
