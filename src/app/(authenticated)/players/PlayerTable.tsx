'use client';

import { useState, useMemo } from 'react';
import type { PlayerData } from '@/lib/types';

export default function PlayerTable({ players }: { players: PlayerData[] }) {
  const [search, setSearch] = useState('');
  const [posFilter, setPosFilter] = useState('ALL');
  const [targetFilter, setTargetFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    let result = players.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) &&
          !p.team.toLowerCase().includes(search.toLowerCase())) return false;
      if (posFilter !== 'ALL' && p.position !== posFilter) return false;
      if (targetFilter !== 'ALL' && p.draftTarget !== targetFilter) return false;
      return true;
    });

    result.sort((a, b) => {
      let aVal: any, bVal: any;
      if (sortBy === 'name') { aVal = a.name; bVal = b.name; }
      else if (sortBy === 'y2025') { aVal = a.actual.y2025 || 0; bVal = b.actual.y2025 || 0; }
      else if (sortBy === 'y2024') { aVal = a.actual.y2024 || 0; bVal = b.actual.y2024 || 0; }
      else if (sortBy === 'y2023') { aVal = a.actual.y2023 || 0; bVal = b.actual.y2023 || 0; }
      else { aVal = a.name; bVal = b.name; }

      if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });

    return result;
  }, [players, search, posFilter, targetFilter, sortBy, sortDir]);

  const toggleSort = (col: string) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('desc'); }
  };

  const targetColors: Record<string, string> = {
    'must-get': 'bg-green-500/20 text-green-400 border-green-500/30',
    'strong': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'value': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'fade': 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search player or team..."
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
        <select value={posFilter} onChange={e => setPosFilter(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white">
          <option value="ALL">All Positions</option>
          <option value="QB">QB</option>
          <option value="RB">RB</option>
          <option value="WR">WR</option>
          <option value="K">K</option>
        </select>
        <select value={targetFilter} onChange={e => setTargetFilter(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white">
          <option value="ALL">All Targets</option>
          <option value="must-get">Must-Get</option>
          <option value="strong">Strong Target</option>
          <option value="value">Value</option>
          <option value="fade">Fade</option>
        </select>
        <span className="text-sm text-slate-500 self-center">{filtered.length} players</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-slate-800/50 border border-slate-700 rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700 bg-slate-800/80">
              <th className="p-3 cursor-pointer hover:text-white" onClick={() => toggleSort('name')}>
                Player {sortBy === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-3">Pos</th>
              <th className="p-3">Team</th>
              <th className="p-3 cursor-pointer hover:text-white" onClick={() => toggleSort('y2023')}>
                2023 {sortBy === 'y2023' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-3 cursor-pointer hover:text-white" onClick={() => toggleSort('y2024')}>
                2024 {sortBy === 'y2024' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-3 cursor-pointer hover:text-white" onClick={() => toggleSort('y2025')}>
                2025 {sortBy === 'y2025' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-3">Consistency</th>
              <th className="p-3">2026 Target</th>
              <th className="p-3">Round</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id || p.name} className="border-b border-slate-800 hover:bg-slate-800/50">
                <td className="p-3 font-medium text-white">{p.name}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-700">
                    {p.position}
                  </span>
                </td>
                <td className="p-3 text-slate-400">{p.team}</td>
                <td className="p-3 text-slate-300">{p.actual.y2023 || '—'}</td>
                <td className="p-3 text-slate-300">{p.actual.y2024 || '—'}</td>
                <td className="p-3 text-slate-300">{p.actual.y2025 || '—'}</td>
                <td className="p-3">{p.consistency}</td>
                <td className="p-3">
                  {p.draftTarget && (
                    <span className={`px-2 py-0.5 rounded-full text-xs border ${targetColors[p.draftTarget] || ''}`}>
                      {p.draftTarget}
                    </span>
                  )}
                </td>
                <td className="p-3 text-slate-400">{p.targetRound || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
