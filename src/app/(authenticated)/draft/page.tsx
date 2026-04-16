'use client';

import strategyData from '@/data/draft-strategy.json';

export default function DraftPage() {
  const pickSlots = strategyData?.pickSlots || [];
  const targets = strategyData?.playerTargets || [];
  const fades = strategyData?.fadePlayers || [];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">2026 Draft Board</h1><p className="text-gray-500 mt-1">Pick 9 of 10 | Snake Draft | 18 Rounds | Full Redraft</p></div>

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
    </div>
  );
}
