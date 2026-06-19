import { getDb } from '@/lib/firebase-admin';

type TopScorer = {
  year: number;
  rank: number;
  player: string;
  pos: string;
  team: string;
  pts: number;
  preseasonRank: string;
};

type EliteKicker = {
  name: string;
  team: string;
  y2023: number;
  y2024: number;
  y2025: number;
  avg: number;
  notes: string;
};

type AdpEntry = {
  year: number;
  player: string;
  pos: string;
  preseasonRank: string;
  actualFinish: string;
  category: 'TRAP' | 'STEAL';
};

type AnalysisData = {
  topScorers?: TopScorer[];
  adpVsActual?: AdpEntry[];
  eliteKickers?: EliteKicker[];
};

async function getAnalysis(): Promise<AnalysisData | null> {
  try {
    const db = getDb();
    const doc = await db.collection('analysis').doc('multiYear').get();
    return doc.exists ? (doc.data() as AnalysisData) : null;
  } catch {
    return null;
  }
}

export default async function AnalysisPage() {
  const data = await getAnalysis();
  const topScorers = data?.topScorers || [];
  const adpVsActual = data?.adpVsActual || [];
  const eliteKickers = data?.eliteKickers || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">3-Year Analysis</h1>
        <p className="text-slate-400 mt-1">2023-2025 preseason rankings vs actual performance</p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Preseason #1 Pick Hit Rate (3 Years)</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { pos: 'RB', rate: '0%', hits: '0/3', color: 'red', detail: 'McCaffrey 2x busted, Jacobs busted' },
            { pos: 'WR', rate: '0%', hits: '0/3', color: 'red', detail: 'Chase 2x busted, Lamb busted' },
            { pos: 'QB', rate: '33%', hits: '1/3', color: 'yellow', detail: 'Only Burrow (2024) delivered' },
            { pos: 'K', rate: '33%', hits: '1/3', color: 'yellow', detail: 'Aubrey (2024) delivered' },
          ].map((item) => (
            <div key={item.pos} className={`rounded-xl p-4 border ${item.color === 'red' ? 'bg-red-500/10 border-red-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
              <div className="text-2xl font-bold text-white">{item.rate}</div>
              <div className={`text-sm font-medium ${item.color === 'red' ? 'text-red-400' : 'text-yellow-400'}`}>
                {item.pos} #1 → {item.hits}
              </div>
              <div className="text-xs text-slate-500 mt-1">{item.detail}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-400 font-medium">
            Overall: The preseason #1 pick is wrong 83% of the time (2 of 12 hits). Never pay the #1 premium.
          </p>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Top 20 Overall Scorers by Year</h2>
        {topScorers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-700">
                  <th className="pb-2 pr-3">Year</th>
                  <th className="pb-2 pr-3">Rank</th>
                  <th className="pb-2 pr-3">Player</th>
                  <th className="pb-2 pr-3">Pos</th>
                  <th className="pb-2 pr-3">Team</th>
                  <th className="pb-2 pr-3">Points</th>
                  <th className="pb-2 pr-3">Preseason</th>
                </tr>
              </thead>
              <tbody>
                {topScorers.map((s, i) => (
                  <tr key={`${s.player}-${s.year}-${i}`} className="border-b border-slate-800">
                    <td className="py-2 pr-3 text-slate-400">{s.year}</td>
                    <td className="py-2 pr-3 font-medium">{s.rank}</td>
                    <td className="py-2 pr-3 text-white font-medium">{s.player}</td>
                    <td className="py-2 pr-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${s.pos === 'K' ? 'bg-yellow-500/20 text-yellow-400' : s.pos === 'QB' ? 'bg-blue-500/20 text-blue-400' : s.pos === 'RB' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>{s.pos}</span>
                    </td>
                    <td className="py-2 pr-3 text-slate-400">{s.team}</td>
                    <td className="py-2 pr-3 font-bold text-white">{s.pts}</td>
                    <td className="py-2 pr-3 text-slate-500">{s.preseasonRank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-500">Data will appear after seeding. Run the data migration script.</p>
        )}
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Elite Kicker Club (3-Year Performance)</h2>
        {eliteKickers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-700">
                  <th className="pb-2 pr-4">Kicker</th>
                  <th className="pb-2 pr-4">Team</th>
                  <th className="pb-2 pr-4">2023</th>
                  <th className="pb-2 pr-4">2024</th>
                  <th className="pb-2 pr-4">2025</th>
                  <th className="pb-2 pr-4">3-Yr Avg</th>
                  <th className="pb-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {eliteKickers.map((k, i) => (
                  <tr key={`${k.name}-${i}`} className="border-b border-slate-800">
                    <td className="py-2 pr-4 text-white font-medium">{k.name}</td>
                    <td className="py-2 pr-4 text-slate-400">{k.team}</td>
                    <td className="py-2 pr-4">{k.y2023 || '—'}</td>
                    <td className="py-2 pr-4">{k.y2024 || '—'}</td>
                    <td className="py-2 pr-4">{k.y2025 || '—'}</td>
                    <td className="py-2 pr-4 font-bold text-yellow-400">{k.avg}</td>
                    <td className="py-2 text-slate-500 text-xs">{k.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-500">Data will appear after seeding.</p>
        )}
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">ADP Traps vs Steals (3 Years)</h2>
        {adpVsActual.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-red-400 font-medium mb-3">🚫 ADP Trap Players (Consistently Overvalued)</h3>
              <div className="space-y-2">
                {adpVsActual.filter((a) => a.category === 'TRAP').slice(0, 10).map((a, i) => (
                  <div key={`${a.player}-${a.year}-${i}`} className="flex items-center justify-between p-2 rounded bg-red-500/5 border border-red-500/10">
                    <div>
                      <span className="text-white text-sm font-medium">{a.player}</span>
                      <span className="text-slate-500 text-xs ml-2">{a.pos} ({a.year})</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Preseason: {a.preseasonRank}</div>
                      <div className="text-xs text-red-400">Actual: {a.actualFinish}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-green-400 font-medium mb-3">⭐ Steal Picks (Consistently Undervalued)</h3>
              <div className="space-y-2">
                {adpVsActual.filter((a) => a.category === 'STEAL').slice(0, 10).map((a, i) => (
                  <div key={`${a.player}-${a.year}-${i}`} className="flex items-center justify-between p-2 rounded bg-green-500/5 border border-green-500/10">
                    <div>
                      <span className="text-white text-sm font-medium">{a.player}</span>
                      <span className="text-slate-500 text-xs ml-2">{a.pos} ({a.year})</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Preseason: {a.preseasonRank}</div>
                      <div className="text-xs text-green-400">Actual: {a.actualFinish}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-500">Data will appear after seeding.</p>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Father Guido Draft Tendencies (3-Year Pattern)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-green-400 font-medium mb-2">Strengths (Keep Doing)</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-2"><span>✅</span>Late-round QB steals (Prescott rd 11, Lawrence rd 12)</li>
              <li className="flex gap-2"><span>✅</span>Kicker identification (Koo, Fairbairn, Reichard)</li>
              <li className="flex gap-2"><span>✅</span>Commanders as consistent team pick (3 years)</li>
              <li className="flex gap-2"><span>✅</span>Mid-season roster upgrades (Fairbairn swap in 2023)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-red-400 font-medium mb-2">Weaknesses (Fix in 2026)</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-2"><span>❌</span>Round 1 WR addiction (Chase 2x — must break)</li>
              <li className="flex gap-2"><span>❌</span>Kicker draft round getting LATER each year (rd 6→8→16)</li>
              <li className="flex gap-2"><span>❌</span>Too many mid-round RBs who don&apos;t pan out</li>
              <li className="flex gap-2"><span>❌</span>K2 declining each year (363→608→258)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
