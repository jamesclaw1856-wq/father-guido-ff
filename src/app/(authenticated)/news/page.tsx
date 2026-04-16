'use client';

import newsData from '@/data/news.json';
import type { NewsItem } from '@/lib/types';
import RippleTree from '@/components/RippleTree';

export default function NewsPage() {
  const news = newsData as NewsItem[];
  const grouped = news.reduce((acc: Record<string, NewsItem[]>, item) => {
    const date = item.date || 'Unknown';
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">News & Ripple Effects</h1>
        <p className="text-gray-500 mt-1">NFL transactions and their cascading fantasy impact</p>
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-200">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500"></span> Value Up</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"></span> Value Down</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500"></span> From Team</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500"></span> To Team</span>
        <span className="text-gray-300">|</span>
        <span>Click any item to expand</span>
      </div>

      {Object.entries(grouped).map(([date, items]) => (
        <div key={date}>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">{date} <span className="text-gray-300">({items.length} items)</span></h2>
          <div className="space-y-3">{items.map((item) => <RippleTree key={item.id} item={item} />)}</div>
        </div>
      ))}
    </div>
  );
}
