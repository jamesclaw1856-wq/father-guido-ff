import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Father Guido Fantasy Football',
  description: 'Las Vegas Fantasy Football Command Center',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.className} dark`}>
      <body className="bg-slate-950 text-white min-h-screen">{children}</body>
    </html>
  );
}
