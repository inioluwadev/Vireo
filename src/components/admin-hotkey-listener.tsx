"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AdminHotkeyListener({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Using event.key === '@' captures Shift + 2 on US keyboards and is a simple trigger
      if (event.key === '@') {
        router.push('/login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  return <>{children}</>;
}
