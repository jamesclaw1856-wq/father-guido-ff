'use client';

import Link from 'next/link';
import newsData from '@/data/news.json';

export default function Dashboard() {
  const recentNews = newsData.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Las Vegas Fantasy Football | Father Guido</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="text-amber-700 text-sm font-medium">2026 Draft Position</div>
          <div className="text-3xl font-bold text-gray-900 mt-1">9th</div>
          <div className="text-amber-600 text-xs mt-1">of 10 teams (snake draft)</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="text-green-700 text-sm font-medium">2023 Result</div>
          <div className="text-3xl font-bold text-gray-900 mt-1">🏆 1st</div>
          <div className="text-green-600 text-xs mt-1">Champion (2271 pts)</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="text-gray-600 text-sm font-medium">2024 Result</div>
          <div className="text-3xl font-bold text-gray-900 mt-1">5th</div>
          <div className="text-gray-500 text-xs mt-1">1960 pts</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="text-gray-600 text-sm font-medium">2025 Result</div>
          <div className="text-3xl font-bold text-gray-900 mt-1">5th</div>
          <div className="text-gray-500 text-xs mt-1">1798 pts</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Insights (3-Year Analysis)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
            <div className="text-xl">⚠️</div>
            <div><div className="font-semibold text-red-800">Preseason #1 is wrong 83% of the time</div><div className="text-sm text-red-700">Only 2 of 12 preseason #1 picks delivered across 3 years</div></div>
          </div>
          <div className="flex gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="text-xl">🏆</div>
            <div><div className="font-semibold text-green-800">All 3 champions drafted QB in rounds 7-11</div><div className="text-sm text-green-700">Prescott rd 11, Goff rd 9, Goff rd 7 — never early</div></div>
          </div>
          <div className="flex gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
            <div className="text-xl">⭐</div>
            <div><div className="font-semibold text-amber-800">10 of top 20 scorers are KICKERS</div><div className="text-sm text-amber-700">Zero RBs/WRs in top 20 for 3 straight years</div></div>
          </div>
          <div className="flex gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
            <div className="text-xl">📉</div>
            <div><div className="font-semibold text-orange-800">Never draft consensus #1 WR or #1 RB</div><div className="text-sm text-orange-700">0% hit rate — Chase 2x, McCaffrey 2x, Jacobs all busted</div></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/news" className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all">
          <div className="text-blue-700 font-semibold">📰 News & Ripple Effects</div>
          <div className="text-sm text-gray-500 mt-1">View transactions and impact chains</div>
        </Link>
        <Link href="/draft" className="bg-white border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-sm transition-all">
          <div className="text-purple-700 font-semibold">🎯 2026 Draft Board</div>
          <div className="text-sm text-gray-500 mt-1">Pick slots, targets, and tracker</div>
        </Link>
        <Link href="/analysis" className="bg-white border border-gray-200 rounded-xl p-4 hover:border-green-300 hover:shadow-sm transition-all">
          <div className="text-green-700 font-semibold">🔬 3-Year Analysis</div>
          <div className="text-sm text-gray-500 mt-1">ADP vs Actual, position values</div>
        </Link>
      </div>

      {/* Championship Blueprint */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">🏆 Championship Draft Blueprint</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-500 border-b border-gray-200"><th className="pb-2 pr-4 font-medium">Round</th><th className="pb-2 pr-4 font-medium">Pick #</th><th className="pb-2 pr-4 font-medium">Target</th><th className="pb-2 font-medium">Data Support</th></tr></thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-100"><td className="py-2.5 pr-4">1-2</td><td className="pr-4">9, 12</td><td className="pr-4 font-medium">Best skill (RB/WR)</td><td className="text-gray-500">Fill roster slots</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2.5 pr-4">3-4</td><td className="pr-4">29, 32</td><td className="pr-4 font-medium">More skill depth</td><td className="text-gray-500">Avoid trap players</td></tr>
              <tr className="border-b border-gray-100 bg-green-50"><td className="py-2.5 pr-4 text-green-700 font-bold">5-6</td><td className="pr-4">49, 52</td><td className="pr-4 font-bold text-green-700">⭐ ELITE KICKER (K1)</td><td className="text-green-700">Every champion did this</td></tr>
              <tr className="border-b border-gray-100 bg-blue-50"><td className="py-2.5 pr-4 text-blue-700 font-bold">7-9</td><td className="pr-4">69, 72, 89</td><td className="pr-4 font-bold text-blue-700">⭐ TOP QB STEAL</td><td className="text-blue-700">Goff/Prescott — all won</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2.5 pr-4">10-13</td><td className="pr-4">92-129</td><td className="pr-4 font-medium">QB2 + Team picks</td><td className="text-gray-500">Lawrence rd 12 was a steal</td></tr>
              <tr className="border-b border-gray-100 bg-amber-50"><td className="py-2.5 pr-4 text-amber-700 font-bold">14-16</td><td className="pr-4">132-152</td><td className="pr-4 font-bold text-amber-700">⭐ 2nd KICKER (K2)</td><td className="text-amber-700">Bates/Bass won from here</td></tr>
              <tr><td className="py-2.5 pr-4">17-18</td><td className="pr-4">169, 172</td><td className="pr-4 font-medium">COMMANDERS + depth</td><td className="text-gray-500">3-year tradition</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent News */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">📰 Recent News</h2>
          <Link href="/news" className="text-blue-600 text-sm hover:underline">View all →</Link>
        </div>
        <div className="space-y-3">
          {recentNews.map((item: any) => (
            <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium shrink-0 mt-0.5">{item.type}</span>
              <div><div className="text-sm text-gray-900 font-medium">{item.headline}</div><div className="text-xs text-gray-500 mt-0.5">{item.date}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
