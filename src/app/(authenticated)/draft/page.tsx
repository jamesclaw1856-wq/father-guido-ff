'use client';

import strategyData from '@/data/draft-strategy.json';

export default function DraftPage() {
  const pickSlots = strategyData?.pickSlots || [];
  const targets = strategyData?.playerTargets || [];
  const fades = strategyData?.fadePlayers || [];
  const ffi = (strategyData as any)?.ffi2026;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">2026 Draft Board</h1><p className="text-gray-500 mt-1">Pick 9 of 10 | Snake Draft | 18 Rounds | Full Redraft</p></div>

      {(strategyData as any)?.rulesInsights && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">League Rules — Strategy Implications</h2>
          <p className="text-xs text-gray-400 mb-3">{(strategyData as any).rosterRules}</p>
          <ul className="space-y-1.5">
            {(strategyData as any).rulesInsights.map((r: string, i: number) => (
              <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-blue-500 shrink-0">▸</span>{r}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Pick Schedule (Slot 9)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm"><thead><tr className="text-left text-gray-500 border-b border-gray-200 bg-gray-50"><th className="p-2.5 font-medium">Round</th><th className="p-2.5 font-medium">Pick #</th><th className="p-2.5 font-medium">Target Position</th><th className="p-2.5 font-medium">Data Support</th></tr></thead>
          <tbody>{pickSlots.map((slot: any) => {
            const isKey = slot.target?.includes('⭐');
            return (<tr key={slot.round} className={`border-b border-gray-100 ${isKey ? 'bg-green-50' : 'hover:bg-gray-50'}`}>
              <td className={`p-2.5 ${isKey ? 'text-green-700 font-bold' : 'text-gray-700'}`}>{slot.round}</td>
              <td className="p-2.5 font-semibold text-gray-900">{slot.pick}</td>
              <td className={`p-2.5 ${isKey ? 'text-green-700 font-bold' : 'text-gray-900 font-medium'}`}>{slot.target}</td>
              <td className="p-2.5 text-gray-500 text-xs">{slot.dataSupport}</td>
            </tr>);
          })}</tbody></table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-green-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-green-800 mb-4">Target Players</h2>
          <div className="space-y-2">{targets.map((t: any, i: number) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${t.priority === 'must-get' ? 'bg-green-500' : t.priority === 'strong' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                <span className="text-gray-900 text-sm font-semibold">{t.player}</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-gray-200 text-gray-600 font-medium">{t.pos}</span>
              </div>
              <span className="text-xs text-gray-500 font-medium">Rd {t.round}</span>
            </div>
          ))}</div>
        </div>
        <div className="bg-white border border-red-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-red-800 mb-4">Fade Players (Avoid)</h2>
          <div className="space-y-2">{fades.map((f: any, i: number) => (
            <div key={i} className="p-2.5 rounded-lg bg-red-50 border border-red-100">
              <div className="flex items-center gap-2"><span className="text-gray-900 text-sm font-semibold">{f.player}</span><span className="text-xs px-1.5 py-0.5 rounded bg-gray-200 text-gray-600 font-medium">{f.pos}</span></div>
              <div className="text-xs text-red-700 mt-1">{f.reason}</div>
            </div>
          ))}</div>
        </div>
      </div>

      {ffi && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Fantasy Index 2026 Rankings</h2>
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-2">{ffi.caveat}</p>
          {ffi.stretchRunKey && (
            <p className="text-xs text-sky-800 bg-sky-50 border border-sky-200 rounded-lg p-2.5 mb-4">❄️ {ffi.stretchRunKey}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-green-800 mb-2">Kickers (FFI order)</h3>
              <div className="space-y-1">{ffi.kickers.map((k: any) => (
                <div key={k.rank} className="flex items-center gap-2 text-sm p-1.5 rounded bg-gray-50">
                  <span className="w-5 text-gray-400 font-bold text-xs">{k.rank}</span>
                  <span className="font-semibold text-gray-900">{k.player}</span>
                  <span className="text-xs text-gray-500">{k.team}</span>
                  {k.note && <span className="text-xs text-gray-400 truncate">— {k.note}</span>}
                </div>
              ))}</div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-purple-800 mb-2">Quarterbacks (FFI order)</h3>
              <div className="space-y-1">{ffi.quarterbacks.map((q: any) => (
                <div key={q.rank} className="flex items-center gap-2 text-sm p-1.5 rounded bg-gray-50">
                  <span className="w-5 text-gray-400 font-bold text-xs">{q.rank}</span>
                  <span className="font-semibold text-gray-900">{q.player}</span>
                  <span className="text-xs text-gray-500">{q.team}</span>
                  {q.note && <span className="text-xs text-gray-400 truncate">— {q.note}</span>}
                </div>
              ))}</div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Sleepers</h3>
              <div className="space-y-1">{ffi.sleepers.map((s: any, i: number) => (
                <div key={i} className="text-sm p-1.5 rounded bg-blue-50">
                  <span className="font-semibold text-gray-900">{s.player}</span>
                  <span className="text-xs text-gray-500 ml-1.5">{s.pos} · {s.team}</span>
                  <div className="text-xs text-blue-800">{s.note}</div>
                </div>
              ))}</div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-800 mb-2">Drafted Too Early (FFI busts)</h3>
              <div className="space-y-1">{ffi.busts.map((b: any, i: number) => (
                <div key={i} className="text-sm p-1.5 rounded bg-red-50">
                  <span className="font-semibold text-gray-900">{b.player}</span>
                  <span className="text-xs text-gray-500 ml-1.5">{b.pos}</span>
                  <div className="text-xs text-red-700">{b.note}</div>
                </div>
              ))}</div>
            </div>
          </div>

          {ffi.explosiveness && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Explosiveness Board (Distance-Tier Scoring)</h3>
              <p className="text-xs text-gray-500 mb-3">{ffi.explosiveness.rule}</p>
              <div className="space-y-4">
                {ffi.explosiveness.tiers.map((tier: any, ti: number) => (
                  <div key={ti}>
                    <h4 className={`text-xs font-bold uppercase mb-2 ${
                      tier.tier.startsWith('ELITE') ? 'text-green-700' :
                      tier.tier.startsWith('STRONG') ? 'text-blue-700' :
                      tier.tier.startsWith('ROOKIE') ? 'text-amber-700' : 'text-red-700'
                    }`}>{tier.tier}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                      {tier.players.map((pl: any, pi: number) => (
                        <div key={pi} className={`text-sm p-2 rounded ${
                          tier.tier.startsWith('ELITE') ? 'bg-green-50' :
                          tier.tier.startsWith('STRONG') ? 'bg-blue-50' :
                          tier.tier.startsWith('ROOKIE') ? 'bg-amber-50' : 'bg-red-50'
                        }`}>
                          <span className="font-semibold text-gray-900">{pl.player}</span>
                          <span className="text-xs text-gray-500 ml-1.5">{pl.pos} · {pl.team}</span>
                          <div className="text-xs text-gray-600 mt-0.5">{pl.evidence}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {ffi.rbTouchWatch && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">RB 350-Touch Rule (Rounds 1-2 filter)</h3>
              <p className="text-xs text-gray-500 mb-3">{ffi.rbTouchWatch.rule}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-red-700 uppercase mb-2">Over 350 — Avoid</h4>
                  {ffi.rbTouchWatch.over350.map((r: any, i: number) => (
                    <div key={i} className="text-sm p-1.5 rounded bg-red-50 mb-1">
                      <span className="font-semibold text-gray-900">{r.player}</span>
                      <span className="ml-1.5 text-red-700 font-bold">{r.touches}</span>
                      <div className="text-xs text-red-700">{r.note}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-700 uppercase mb-2">Borderline</h4>
                  {ffi.rbTouchWatch.borderline.map((r: any, i: number) => (
                    <div key={i} className="text-sm p-1.5 rounded bg-amber-50 mb-1">
                      <span className="font-semibold text-gray-900">{r.player}</span>
                      <span className="ml-1.5 text-amber-700 font-bold">{r.touches}</span>
                      <div className="text-xs text-amber-800">{r.note}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-green-700 uppercase mb-2">Clean Workload</h4>
                  {ffi.rbTouchWatch.clean.map((r: any, i: number) => (
                    <div key={i} className="text-sm p-1.5 rounded bg-green-50 mb-1">
                      <span className="font-semibold text-gray-900">{r.player}</span>
                      <span className="ml-1.5 text-green-700 font-bold">{r.touches}</span>
                      <div className="text-xs text-gray-600">{r.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
