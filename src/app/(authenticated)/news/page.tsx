import { getDb } from '@/lib/firebase-admin';
import type { NewsItem } from '@/lib/types';
import RippleTree from '@/components/RippleTree';
import NewsActions from './NewsActions';

async function getNews(): Promise<NewsItem[]> {
  try {
    const db = getDb();
    const snapshot = await db.collection('news')
      .orderBy('date', 'desc')
      .limit(50)
      .get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as NewsItem[];
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const news = await getNews();

  // Group by date
  const grouped = news.reduce((acc: Record<string, NewsItem[]>, item) => {
    const date = item.date || 'Unknown';
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">News & Ripple Effects</h1>
          <p className="text-slate-400 mt-1">NFL transactions and their cascading fantasy impact</p>
        </div>
        <NewsActions />
      </div>

      {/* Ripple Legend */}
      <div className="flex items-center gap-6 text-sm text-slate-400 bg-slate-800/30 rounded-lg p-3">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500"></span> Value Up</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> Value Down</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500"></span> From Team (losing player)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500"></span> To Team (gaining player)</span>
        <span className="text-slate-600">|</span>
        <span>Click any item to expand the ripple tree</span>
      </div>

      {/* News Feed by Date */}
      {Object.keys(grouped).length > 0 ? (
        Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <h2 className="text-sm font-medium text-slate-500 mb-3 sticky top-0 bg-slate-950 py-2 z-10">
              {date}
              <span className="text-slate-600 ml-2">({items.length} items)</span>
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <RippleTree key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-slate-300">No news yet</h3>
          <p className="text-slate-500 mt-2">Click &quot;Run News Update&quot; above to fetch the latest NFL news with ripple analysis</p>
        </div>
      )}
    </div>
  );
}
