import Link from 'next/link';
import FirebaseConfigNotice from '@/components/FirebaseConfigNotice';
import { getDb, getFirebaseConfigurationError } from '@/lib/firebase-admin';

type RecentNewsItem = {
  id: string;
  type: string;
  headline: string;
  date: string;
};

async function getRecentNews(): Promise<{ items: RecentNewsItem[]; error: string | null }> {
  try {
    const db = getDb();
    const snapshot = await db.collection('news')
      .orderBy('date', 'desc')
      .limit(5)
      .get();
    return {
      items: snapshot.docs.map((doc) => ({
        id: doc.id,
        type: String(doc.data().type ?? ''),
        headline: String(doc.data().headline ?? ''),
        date: String(doc.data().date ?? ''),
      })),
      error: null,
    };
  } catch (error) {
    return {
      items: [],
      error: error instanceof Error ? error.message : 'Failed to load recent news.',
    };
  }
}

export default async function Dashboard() {
  const { items: recentNews, error } = await getRecentNews();
  const configurationError = getFirebaseConfigurationError();

  return (
    <div className="space-y-6">
      {error && (
        <FirebaseConfigNotice message={configurationError ?? error} />
      )}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-400 mt-1">Las Vegas Fantasy Football | Father Guido</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="text-yellow-400 text-sm font-medium">2026 Draft Position</div>
          <div className="text-3xl font-bold text-white mt-1">9th</div>
          <div className="text-yellow-400/60 text-xs mt-1">of 10 teams (snake draft)</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-4">
          <div className="text-green-400 text-sm font-medium">2023 Result</div>
          <div className="text-3xl font-bold text-white mt-1">🏆 1st</div>
          <div className="text-green-400/60 text-xs mt-1">Champion (2271 pts)</div>
        </div>

        <div className="bg-gradient-to-br from-slate-500/20 to-slate-600/10 border border-slate-500/30 rounded-xl p-4">
          <div className="text-slate-400 text-sm font-medium">2024 Result</div>
          <div className="text-3xl font-bold text-white mt-1">5th</div>
          <div className="text-slate-400/60 text-xs mt-1">1960 pts</div>
        </div>

        <div className="bg-gradient-to-br from-slate-500/20 to-slate-600/10 border border-slate-500/30 rounded-xl p-4">
          <div className="text-slate-400 text-sm font-medium">2025 Result</div>
          <div className="text-3xl font-bold text-white mt-1">5th</div>
          <div className="text-slate-400/60 text-xs mt-1">1798 pts</div>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">🔑 Key Insights (3-Year Analysis)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <div className="font-medium text-red-400">Preseason #1 is wrong 83% of the time</div>
              <div className="text-sm text-slate-400">Only 2 of 12 preseason #1 picks delivered across 3 years</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-2xl">🏆</div>
            <div>
              <div className="font-medium text-green-400">All 3 champions drafted QB in rounds 7-11</div>
              <div className="text-sm text-slate-400">Prescott rd 11, Goff rd 9, Goff rd 7 — never early</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-2xl">⭐</div>
            <div>
              <div className="font-medium text-yellow-400">10 of top 20 scorers are KICKERS</div>
              <div className="text-sm text-slate-400">Zero RBs/WRs in top 20 for 3 straight years</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-2xl">📉</div>
            <div>
              <div className="font-medium text-orange-400">Never draft consensus #1 WR or #1 RB</div>
              <div className="text-sm text-slate-400">0% hit rate — Chase 2x, McCaffrey 2x, Jacobs all busted</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/news" className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-4 hover:bg-blue-600/30 transition-colors group">
          <div className="text-blue-400 font-medium group-hover:text-blue-300">📰 News & Ripple Effects</div>
          <div className="text-sm text-slate-400 mt-1">View latest transactions and their impact chains</div>
        </Link>
        <Link href="/draft" className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-4 hover:bg-purple-600/30 transition-colors group">
          <div className="text-purple-400 font-medium group-hover:text-purple-300">🎯 2026 Draft Board</div>
          <div className="text-sm text-slate-400 mt-1">Pick slots, targets, and live tracker</div>
        </Link>
        <Link href="/analysis" className="bg-green-600/20 border border-green-500/30 rounded-xl p-4 hover:bg-green-600/30 transition-colors group">
          <div className="text-green-400 font-medium group-hover:text-green-300">🔬 3-Year Analysis</div>
          <div className="text-sm text-slate-400 mt-1">ADP vs Actual, position values, draft strategy</div>
        </Link>
      </div>

      <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-3">🏆 Championship Draft Blueprint (Proven by 3 Years of Data)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="pb-2 pr-4">Round</th>
                <th className="pb-2 pr-4">Pick #</th>
                <th className="pb-2 pr-4">Target</th>
                <th className="pb-2">Data Support</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-800"><td className="py-2 pr-4">1-2</td><td className="pr-4">9, 12</td><td className="pr-4 font-medium">Best skill (RB/WR)</td><td className="text-slate-500">Fill roster slots — don&apos;t reach for QB</td></tr>
              <tr className="border-b border-slate-800"><td className="py-2 pr-4">3-4</td><td className="pr-4">29, 32</td><td className="pr-4 font-medium">More skill depth</td><td className="text-slate-500">Avoid consensus #1 WR/RB trap players</td></tr>
              <tr className="border-b border-slate-800 bg-green-500/5"><td className="py-2 pr-4 text-green-400 font-bold">5-6</td><td className="pr-4">49, 52</td><td className="pr-4 font-bold text-green-400">⭐ ELITE KICKER (K1)</td><td className="text-green-400/70">THE winning edge — every champion did this</td></tr>
              <tr className="border-b border-slate-800 bg-blue-500/5"><td className="py-2 pr-4 text-blue-400 font-bold">7-9</td><td className="pr-4">69, 72, 89</td><td className="pr-4 font-bold text-blue-400">⭐ TOP QB STEAL</td><td className="text-blue-400/70">Goff rd 7+9, Prescott rd 11 — all won</td></tr>
              <tr className="border-b border-slate-800"><td className="py-2 pr-4">10-13</td><td className="pr-4">92-129</td><td className="pr-4 font-medium">QB2 + Team picks</td><td className="text-slate-500">Lawrence rd 12 (2025) was a steal</td></tr>
              <tr className="border-b border-slate-800 bg-yellow-500/5"><td className="py-2 pr-4 text-yellow-400 font-bold">14-16</td><td className="pr-4">132-152</td><td className="pr-4 font-bold text-yellow-400">⭐ 2nd KICKER (K2)</td><td className="text-yellow-400/70">Bates 376, Bass 362 won from here</td></tr>
              <tr><td className="py-2 pr-4">17-18</td><td className="pr-4">169, 172</td><td className="pr-4 font-medium">COMMANDERS + depth</td><td className="text-slate-500">3-year Father Guido tradition</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">📰 Recent News</h2>
          <Link href="/news" className="text-blue-400 text-sm hover:underline">View all →</Link>
        </div>
        {recentNews.length > 0 ? (
          <div className="space-y-3">
            {recentNews.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                  {item.type}
                </span>
                <div>
                  <div className="text-sm text-white">{item.headline}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-slate-500 text-sm">Recent news is unavailable until Firebase Admin credentials are configured.</p>
        ) : (
          <p className="text-slate-500 text-sm">No news yet. Click &quot;Run News Update&quot; on the News page to get started.</p>
        )}
      </div>
    </div>
  );
}
