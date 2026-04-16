'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('ff_session');
    if (session === 'authenticated') {
      setAuthed(true);
    } else {
      setAuthed(false);
      router.push('/login');
    }
  }, [router]);

  if (authed === null) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;
  if (!authed) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-white">
        <div className="max-w-7xl mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
