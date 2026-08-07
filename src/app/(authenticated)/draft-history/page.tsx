'use client';

import { useState } from 'react';
import draftHistory from '@/data/draft-history.json';

type Pick = {
  round: number;
  pick: number;
  overall: number;
  player: string;
  position: string;
  nflTeam: string;
  points: number | null;
  result: 'hit' | 'meh' | 'bust';
  notes: string;
};

type YearData = {
  draftSlot: number;
  format: string;
  overallGrade: string;
  overallNotes: string;
  picks: Pick[];
  grades: { category: string; grade: string; notes: string }[];
  keyTakeaways: string[];
};

const history = draftHistory as unknown as Record<string, YearData>;
const years = Object.keys(history).sort((a, b) => b.localeCompare(a));

const resultBadge: Record<Pick['result'], string> = {
  hit: 'bg-green-100 text-green-700',
  meh: 'bg-amber-100 text-amber-700',
  bust: 'bg-red-100 text-red-700',
};

const posBadge: Record<string, string> = {
  QB: 'bg-purple-100 text-purple-700',
  RB: 'bg-blue-100 text-blue-700',
  WR: 'bg-green-100 text-green-700',
  TE: 'bg-amber-100 text-amber-700',
  'TE/WR': 'bg-amber-100 text-amber-700',
  K: 'bg-pink-100 text-pink-700',
  Team: 'bg-gray-200 text-gray-600',
};

export default function DraftHistoryPage() {
  const [year, setYear] = useState(years[0]);
  const data = history[year];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Draft History</h1>
          <p className="text-gray-500 mt-1">Father Guido&apos;s past drafts, pick by pick</p>
        </div>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 bg-white shadow-sm"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y} Season</option>
          ))}
        </select>
      </div>

      {years.length < 3 && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-xs text-amber-800">
          Only {years.join(', ')} is digitized right now — 2023/2024 draft results still live in PDF/XLSX
          files under <code className="bg-amber-100 px-1 rounded">Claude Projects/Fantasy Football/</code> and
          haven&apos;t been transcribed yet.
        </div>
      )}

      {data && (
        <>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {year} — Draft Slot {data.draftSlot}
                </h2>
                <p className="text-xs text-gray-400 mt-1">{data.format}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">{data.overallGrade}</div>
                <div className="text-xs text-gray-400">Overall Grade</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">{data.overallNotes}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">All Picks</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200 bg-gray-50">
                    <th className="p-2.5 font-medium">Rd</th>
                    <th className="p-2.5 font-medium">Pick</th>
                    <th className="p-2.5 font-medium">Player</th>
                    <th className="p-2.5 font-medium">Pos</th>
                    <th className="p-2.5 font-medium">NFL Team</th>
                    <th className="p-2.5 font-medium">Pts</th>
                    <th className="p-2.5 font-medium">Result</th>
                    <th className="p-2.5 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {data.picks.map((p) => (
                    <tr key={p.overall} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-2.5 text-gray-700">{p.round}</td>
                      <td className="p-2.5 font-semibold text-gray-900">{p.overall}</td>
                      <td className="p-2.5 font-semibold text-gray-900">{p.player}</td>
                      <td className="p-2.5">
                        {p.position && (
                          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${posBadge[p.position] || 'bg-gray-100 text-gray-600'}`}>
                            {p.position}
                          </span>
                        )}
                      </td>
                      <td className="p-2.5 text-gray-500 text-xs">{p.nflTeam}</td>
                      <td className="p-2.5 text-gray-700">{p.points ?? '—'}</td>
                      <td className="p-2.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${resultBadge[p.result]}`}>
                          {p.result}
                        </span>
                      </td>
                      <td className="p-2.5 text-gray-500 text-xs">{p.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Grade Breakdown</h2>
            <div className="space-y-2">
              {data.grades.map((g, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="text-lg font-bold text-gray-900 w-8 shrink-0">{g.grade}</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{g.category}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{g.notes}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Takeaways</h2>
            <ul className="space-y-1.5">
              {data.keyTakeaways.map((t, i) => (
                <li key={i} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-blue-500 shrink-0">▸</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
