'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/news', label: 'News & Ripples', icon: '📰' },
  { href: '/players', label: 'Player Database', icon: '🏃' },
  { href: '/analysis', label: '3-Year Analysis', icon: '🔬' },
  { href: '/draft', label: 'Draft Board', icon: '🎯' },
  { href: '/teams', label: 'NFL Teams', icon: '🏟️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-700 min-h-screen flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-3xl">🏈</span>
          <div>
            <h1 className="font-bold text-white text-sm">Father Guido</h1>
            <p className="text-slate-400 text-xs">Fantasy Football</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-blue-600/20 text-blue-400 font-medium'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="text-xs text-slate-500">
          <p>2026 Draft: Pick 9 of 10</p>
          <p className="mt-1">Full redraft league</p>
        </div>
      </div>
    </aside>
  );
}
