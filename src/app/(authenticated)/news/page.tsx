'use client';

import { useState, useEffect, useCallback } from 'react';
import fallbackNews from '@/data/news.json';
import type { NewsItem } from '@/lib/types';
import RippleTree from '@/components/RippleTree';
import { fetchCollection } from '@/lib/firebase-client';

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(fallbackNews as NewsItem[]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);

  const loadFromFirestore = useCallback(async () => {
    setLoading(true);
    try {
      const docs = await fetchCollection('news');
      if (docs && docs.length > 0) {
        setNews(docs as NewsItem[]);
        setLastUpdated(new Date());
        setFetchFailed(false);
      } else {
        setFetchFailed(true);
      }
    } catch (e) {
      console.error('Failed to load news from Firestore:', e);
      setFetchFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load from Firestore
  useEffect(() => {
    loadFromFirestore();
  }, [loadFromFirestore]);

  const grouped = news.reduce((acc: Record<string, NewsItem[]>, item) => {
    const date = item.date || 'Unknown';
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const isToday = (dateStr: string) => {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    return dateStr === today;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News & Ripple Effects</h1>
          <p className="text-gray-500 mt-1">NFL transactions and their cascading fantasy impact</p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs text-gray-400">
              Fetched {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button
            onClick={loadFromFirestore}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors ${
              loading
                ? 'bg-gray-100 text-gray-400 cursor-wait'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {fetchFailed && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-xs text-amber-800">
          <strong>Live database unreachable.</strong> Showing cached news bundled with the app — items may be out of date. Try Refresh again in a minute.
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
        <strong>How updates work:</strong> News auto-updates daily at 7 AM PT. For an immediate fresh search, open Claude Code and run the <code className="bg-blue-100 px-1.5 py-0.5 rounded">ff-daily-player-news</code> task. The Refresh button above pulls the latest data from the database.
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-200">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500"></span> Value Up</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"></span> Value Down</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500"></span> From Team</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500"></span> To Team</span>
        <span className="text-gray-300">|</span>
        <span>Click any item to expand</span>
      </div>

      {sortedDates.map(date => (
        <div key={date}>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            {isToday(date) && <span className="text-blue-600 mr-2">TODAY</span>}
            {formatDate(date)} <span className="text-gray-300">({grouped[date].length} items)</span>
          </h2>
          <div className="space-y-3">
            {grouped[date].map((item) => <RippleTree key={item.id} item={item} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
