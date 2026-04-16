import { getDb } from '@/lib/firebase-admin';

async function getDraftData() {
  try {
    const db = getDb();
    const strategyDoc = await db.collection('analysis').doc('draftStrategy').get();
    return strategyDoc.exists ? strategyDoc.data() : null;
  } catch {
    return null;
  }
}

export default async function DraftPage() {
  const data = await getDraftData();
  const pickSlots = data?.pickSlots || [];
  const targets = data?.playerTargets || [];
  const fades = data?.fadePlayers || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">2026 Draft Board</h1>
        <p className="text-slate-400 mt-1">Pick 9 of 10 | Snake Draft | 18 Rounds | Full Redraft</p>
      </div>

      {/* Pick Slot Schedule */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Your Pick Schedule (Slot 9)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="pb-2 pr-4">Round</th>
                <th className="pb-2 pr-4">Pick #</th>
                <th className="pb-2 pr-4">Target Position</th>
                <th className="pb-2">Data Support</th>
              </tr>
            </thead>
            <tbody>
              {(pickSlots.length > 0 ? pickSlots : [
                { round: 1, pick: 9, target: 'Best skill (RB/WR)', dataSupport: 'Don\'t reach for consensus #1 WR' },
                { round: 2, pick: 12, target: 'Pair with rd 1', dataSupport: 'Turn pick advantage' },
                { round: 3, pick: 29, target: 'Skill depth', dataSupport: 'Watch for kicker run' },
                { round: 4, pick: 32, target: 'Skill depth', dataSupport: '' },
                { round: 5, pick: 49, target: '⭐ ELITE KICKER (K1)', dataSupport: 'Aubrey/Dicker/Fairbairn — winning edge' },
                { round: 6, pick: 52, target: 'Skill or 2nd K', dataSupport: '' },
                { round: 7, pick: 69, target: '⭐ TOP-TIER QB', dataSupport: 'Goff/Stafford range — steal window' },
                { round: 8, pick: 72, target: 'RB/WR depth', dataSupport: '' },
                { round: 9, pick: 89, target: '2nd K or skill', dataSupport: '' },
                { round: 10, pick: 92, target: 'Skill depth', dataSupport: '' },
                { round: 11, pick: 109, target: 'QB2', dataSupport: 'Prescott/Lawrence precedent' },
                { round: 12, pick: 112, target: 'Team WIN pick', dataSupport: '' },
                { round: 13, pick: 129, target: 'Depth', dataSupport: '' },
                { round: 14, pick: 132, target: '⭐ 2nd KICKER (K2)', dataSupport: 'Bates/Bass won from here' },
                { round: 15, pick: 149, target: 'Depth', dataSupport: '' },
                { round: 16, pick: 152, target: 'Team LOSE pick', dataSupport: '' },
                { round: 17, pick: 169, target: 'Depth', dataSupport: '' },
                { round: 18, pick: 172, target: 'COMMANDERS', dataSupport: '3-year tradition' },
              ]).map((slot: any) => {
                const isKey = slot.target?.includes('⭐');
                return (
                  <tr key={slot.round} className={`border-b border-slate-800 ${
                    isKey ? 'bg-green-500/5' : ''
                  }`}>
                    <td className={`py-2 pr-4 ${isKey ? 'text-green-400 font-bold' : ''}`}>{slot.round}</td>
                    <td className="py-2 pr-4 font-medium">{slot.pick}</td>
                    <td className={`py-2 pr-4 ${isKey ? 'text-green-400 font-bold' : 'text-white'}`}>{slot.target}</td>
                    <td className="py-2 text-slate-500 text-xs">{slot.dataSupport}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Player Targets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-green-500/30 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-green-400 mb-4">Target Players</h2>
          <div className="space-y-2">
            {(targets.length > 0 ? targets : [
              { priority: 'must-get', player: 'Brandon Aubrey', pos: 'K', round: '3-5', why: '482 avg over 3 years' },
              { priority: 'must-get', player: 'Jared Goff', pos: 'QB', round: '7-9', why: '3 champions had him or similar' },
              { priority: 'strong', player: 'Cameron Dicker', pos: 'K', round: '5-7', why: '401 3yr avg' },
              { priority: 'strong', player: "Ka'imi Fairbairn", pos: 'K', round: '5-7', why: 'Rising trajectory' },
              { priority: 'strong', player: 'Josh Allen', pos: 'QB', round: '1-3', why: 'Only 3-year top-10 QB' },
              { priority: 'strong', player: 'Matthew Stafford', pos: 'QB', round: '7-10', why: '2025 MVP, confirmed returning' },
              { priority: 'value', player: 'James Cook', pos: 'RB', round: '3-5', why: '270→305, improving' },
              { priority: 'value', player: 'Drake Maye', pos: 'QB', round: '7-10', why: 'MVP runner-up' },
              { priority: 'value', player: 'Puka Nacua', pos: 'WR', round: '4-6', why: '220 pts with MVP Stafford' },
            ]).map((t: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    t.priority === 'must-get' ? 'bg-green-500' :
                    t.priority === 'strong' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}></span>
                  <span className="text-white text-sm font-medium">{t.player}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">{t.pos}</span>
                </div>
                <span className="text-xs text-slate-500">Rd {t.round}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-red-500/30 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-4">Fade Players (Avoid)</h2>
          <div className="space-y-2">
            {(fades.length > 0 ? fades : [
              { player: "Ja'Marr Chase", pos: 'WR', reason: '155→310→160. Volatile. Drafted rd 1 TWICE.' },
              { player: 'CeeDee Lamb', pos: 'WR', reason: '273→?→105. Declining. DAL concerns.' },
              { player: 'Josh Jacobs', pos: 'RB', reason: '?→200→160. Former #1 RB, consistent miss.' },
              { player: 'Consensus #1 RB', pos: 'RB', reason: '0 for 3 hit rate across 3 years' },
              { player: 'Consensus #1 WR', pos: 'WR', reason: '0 for 3 hit rate across 3 years' },
            ]).map((f: any, i: number) => (
              <div key={i} className="p-2 rounded bg-red-500/5 border border-red-500/10">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">{f.player}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">{f.pos}</span>
                </div>
                <div className="text-xs text-red-400/70 mt-0.5">{f.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
