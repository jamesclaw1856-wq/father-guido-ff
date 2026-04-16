'use client';

import analysisData from '@/data/analysis.json';

export default function AnalysisPage() {
  const topScorers = analysisData?.topScorers || [];
  const adpVsActual = analysisData?.adpVsActual || [];
  const eliteKickers = analysisData?.eliteKickers || [];

  return (
    <div className="space-y-8">
      <div><h1 className="text-2xl font-bold text-gray-900">3-Year Analysis</h1><p className="text-gray-500 mt-1">2023-2025 preseason rankings vs actual performance</p></div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Preseason #1 Pick Hit Rate (3 Years)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { pos: 'RB', rate: '0%', hits: '0/3', bad: true, detail: 'McCaffrey 2x, Jacobs' },
            { pos: 'WR', rate: '0%', hits: '0/3', bad: true, detail: 'Chase 2x, Lamb' },
            { pos: 'QB', rate: '33%', hits: '1/3', bad: false, detail: 'Only Burrow (2024)' },
            { pos: 'K', rate: '33%', hits: '1/3', bad: false, detail: 'Aubrey (2024)' },
          ].map(item => (
            <div key={item.pos} className={`rounded-xl p-4 border ${item.bad ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="text-2xl font-bold text-gray-900">{item.rate}</div>
              <div className={`text-sm font-semibold ${item.bad ? 'text-red-700' : 'text-amber-700'}`}>{item.pos} #1 → {item.hits}</div>
              <div className="text-xs text-gray-500 mt-1">{item.detail}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"><p className="text-sm text-red-800 font-medium">The preseason #1 pick is wrong 83% of the time (2 of 12 hits).</p></div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Scorers by Year</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm"><thead><tr className="text-left text-gray-500 border-b border-gray-200 bg-gray-50"><th className="p-2.5 font-medium">Year</th><th className="p-2.5 font-medium">#</th><th className="p-2.5 font-medium">Player</th><th className="p-2.5 font-medium">Pos</th><th className="p-2.5 font-medium">Team</th><th className="p-2.5 font-medium">Pts</th><th className="p-2.5 font-medium">Preseason</th></tr></thead>
          <tbody>{topScorers.map((s: any, i: number) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50"><td className="p-2.5 text-gray-500">{s.year}</td><td className="p-2.5 text-gray-700">{s.rank}</td><td className="p-2.5 text-gray-900 font-semibold">{s.player}</td>
            <td className="p-2.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${s.pos === 'K' ? 'bg-amber-100 text-amber-800' : s.pos === 'QB' ? 'bg-blue-100 text-blue-800' : s.pos === 'RB' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>{s.pos}</span></td>
            <td className="p-2.5 text-gray-600">{s.team}</td><td className="p-2.5 font-bold text-gray-900">{s.pts}</td><td className="p-2.5 text-gray-500">{s.preseasonRank}</td></tr>
          ))}</tbody></table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Elite Kicker Club</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm"><thead><tr className="text-left text-gray-500 border-b border-gray-200 bg-gray-50"><th className="p-2.5 font-medium">Kicker</th><th className="p-2.5 font-medium">Team</th><th className="p-2.5 font-medium">2023</th><th className="p-2.5 font-medium">2024</th><th className="p-2.5 font-medium">2025</th><th className="p-2.5 font-medium">Avg</th><th className="p-2.5 font-medium">Notes</th></tr></thead>
          <tbody>{eliteKickers.map((k: any, i: number) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50"><td className="p-2.5 text-gray-900 font-semibold">{k.name}</td><td className="p-2.5 text-gray-600">{k.team}</td><td className="p-2.5 text-gray-700">{k.y2023 || '—'}</td><td className="p-2.5 text-gray-700">{k.y2024 || '—'}</td><td className="p-2.5 text-gray-700">{k.y2025 || '—'}</td><td className="p-2.5 font-bold text-amber-700">{k.avg}</td><td className="p-2.5 text-gray-500 text-xs">{k.notes}</td></tr>
          ))}</tbody></table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">ADP Traps vs Steals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><h3 className="text-red-700 font-semibold mb-3">🚫 Trap Players (Overvalued)</h3><div className="space-y-2">{adpVsActual.filter((a: any) => a.category === 'TRAP').map((a: any, i: number) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-red-50 border border-red-100"><div><span className="text-gray-900 text-sm font-semibold">{a.player}</span><span className="text-gray-500 text-xs ml-2">{a.pos} ({a.year})</span></div><div className="text-right"><div className="text-xs text-gray-500">Pre: {a.preseasonRank}</div><div className="text-xs text-red-700 font-medium">Act: {a.actualFinish}</div></div></div>
          ))}</div></div>
          <div><h3 className="text-green-700 font-semibold mb-3">⭐ Steal Picks (Undervalued)</h3><div className="space-y-2">{adpVsActual.filter((a: any) => a.category === 'STEAL').map((a: any, i: number) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-green-50 border border-green-100"><div><span className="text-gray-900 text-sm font-semibold">{a.player}</span><span className="text-gray-500 text-xs ml-2">{a.pos} ({a.year})</span></div><div className="text-right"><div className="text-xs text-gray-500">Pre: {a.preseasonRank}</div><div className="text-xs text-green-700 font-medium">Act: {a.actualFinish}</div></div></div>
          ))}</div></div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Father Guido Draft Tendencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><h3 className="text-green-700 font-semibold mb-2">Strengths</h3><ul className="space-y-2 text-sm text-gray-700"><li>✅ Late-round QB steals (Prescott rd 11, Lawrence rd 12)</li><li>✅ Kicker identification (Koo, Fairbairn, Reichard)</li><li>✅ Commanders as consistent team pick</li><li>✅ Mid-season roster upgrades</li></ul></div>
          <div><h3 className="text-red-700 font-semibold mb-2">Weaknesses</h3><ul className="space-y-2 text-sm text-gray-700"><li>❌ Round 1 WR addiction (Chase 2x)</li><li>❌ Kicker draft round getting LATER</li><li>❌ Too many mid-round RBs who bust</li><li>❌ K2 declining each year</li></ul></div>
        </div>
      </div>
    </div>
  );
}
