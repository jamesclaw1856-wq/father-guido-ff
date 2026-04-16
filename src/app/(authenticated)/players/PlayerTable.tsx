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
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.team.toLowerCase().includes(search.toLowerCase())) return false;
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

  const targetStyles: Record<string, string> = {
    'must-get': 'bg-green-100 text-green-800 border-green-300',
    'strong': 'bg-blue-100 text-blue-800 border-blue-300',
    'value': 'bg-amber-100 text-amber-800 border-amber-300',
    'fade': 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search player or team..."
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
        <select value={posFilter} onChange={e => setPosFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700">
          <option value="ALL">All Positions</option><option value="QB">QB</option><option value="RB">RB</option><option value="WR">WR</option><option value="K">K</option>
        </select>
        <select value={targetFilter} onChange={e => setTargetFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700">
          <option value="ALL">All Targets</option><option value="must-get">Must-Get</option><option value="strong">Strong</option><option value="value">Value</option><option value="fade">Fade</option>
        </select>
        <span className="text-sm text-gray-400 self-center">{filtered.length} players</span>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200">
            <th className="p-3 cursor-pointer hover:text-gray-900 font-medium" onClick={() => toggleSort('name')}>Player {sortBy === 'name' && (sortDir === 'asc' ? '↑' : '↓')}</th>
            <th className="p-3 font-medium">Pos</th><th className="p-3 font-medium">Team</th>
            <th className="p-3 cursor-pointer hover:text-gray-900 font-medium" onClick={() => toggleSort('y2023')}>2023 {sortBy === 'y2023' && (sortDir === 'asc' ? '↑' : '↓')}</th>
            <th className="p-3 cursor-pointer hover:text-gray-900 font-medium" onClick={() => toggleSort('y2024')}>2024 {sortBy === 'y2024' && (sortDir === 'asc' ? '↑' : '↓')}</th>
            <th className="p-3 cursor-pointer hover:text-gray-900 font-medium" onClick={() => toggleSort('y2025')}>2025 {sortBy === 'y2025' && (sortDir === 'asc' ? '↑' : '↓')}</th>
            <th className="p-3 font-medium">Consistency</th><th className="p-3 font-medium">2026 Target</th><th className="p-3 font-medium">Round</th>
          </tr></thead>
          <tbody>{filtered.map((p) => (
            <tr key={p.id || p.name} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="p-3 font-semibold text-gray-900">{p.name}</td>
              <td className="p-3"><span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700 font-medium">{p.position}</span></td>
              <td className="p-3 text-gray-600">{p.team}</td>
              <td className="p-3 text-gray-700">{p.actual.y2023 || '—'}</td>
              <td className="p-3 text-gray-700">{p.actual.y2024 || '—'}</td>
              <td className="p-3 text-gray-700 font-medium">{p.actual.y2025 || '—'}</td>
              <td className="p-3">{p.consistency}</td>
              <td className="p-3">{p.draftTarget && <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${targetStyles[p.draftTarget] || ''}`}>{p.draftTarget}</span>}</td>
              <td className="p-3 text-gray-500">{p.targetRound || '—'}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
