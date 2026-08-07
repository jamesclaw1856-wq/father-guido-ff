'use client';

import { useState } from 'react';
import type { NewsItem, Ripple } from '@/lib/types';

function RippleNode({ ripple }: { ripple: Ripple }) {
  const isUp = ripple.direction === 'up';

  return (
    <div className={`border-l-4 ${isUp ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'} rounded-r-lg p-3 ml-6`}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-base">{isUp ? '📈' : '📉'}</span>
        <span className="font-semibold text-gray-900">{ripple.player}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">{ripple.team} {ripple.position}</span>
        {ripple.severity === 'high' && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">high impact</span>}
      </div>
      <div className="space-y-1 text-sm ml-7">
        <div><span className="text-gray-500 font-medium">Cause: </span><span className="text-gray-800">{ripple.cause}</span></div>
        <div><span className="text-gray-500 font-medium">Impact: </span><span className="text-gray-800">{ripple.impact}</span></div>
        <div><span className="text-gray-500 font-medium">Draft shift: </span><span className={`font-semibold ${isUp ? 'text-green-700' : 'text-red-700'}`}>{ripple.draftValueShift}</span></div>
      </div>
    </div>
  );
}

export default function RippleTree({ item }: { item: NewsItem }) {
  const [expanded, setExpanded] = useState(false);

  // Never trust the shape coming out of Firestore. A doc written without a
  // `ripples` array used to crash the whole page here (`.filter` of undefined),
  // taking every other item down with it.
  const ripples: Ripple[] = Array.isArray(item.ripples) ? item.ripples : [];

  const fromRipples = ripples.filter(r => r?.affectedSide === 'from');
  const toRipples = ripples.filter(r => r?.affectedSide === 'to');
  // Anything with a missing or unrecognised affectedSide. These used to be
  // filtered into oblivion — the item showed a headline and expanded to nothing.
  // They now surface under their own heading so bad data is visible, not silent.
  const orphanRipples = ripples.filter(r => r?.affectedSide !== 'from' && r?.affectedSide !== 'to');

  const upCount = ripples.filter(r => r?.direction === 'up').length;
  const downCount = ripples.filter(r => r?.direction === 'down').length;
  const hasRipples = ripples.length > 0;

  const typeBadge: Record<string, string> = {
    Trade: 'bg-purple-100 text-purple-700',
    Signing: 'bg-blue-100 text-blue-700',
    Injury: 'bg-red-100 text-red-700',
    Draft: 'bg-amber-100 text-amber-700',
    Release: 'bg-orange-100 text-orange-700',
    Award: 'bg-green-100 text-green-700',
    'Trade Talks': 'bg-purple-100 text-purple-600',
  };

  const header = (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBadge[item.type] || 'bg-gray-100 text-gray-600'}`}>{item.type}</span>
          <span className="text-xs text-gray-400">{item.date}</span>
          {!hasRipples && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">headline only</span>
          )}
        </div>
        <h3 className="text-gray-900 font-semibold">{item.headline}</h3>
        <p className="text-gray-600 text-sm mt-1">{item.details}</p>
      </div>
      <div className="flex items-center gap-3 ml-4 shrink-0">
        {upCount > 0 && <span className="flex items-center gap-1 text-green-600 text-sm font-medium">📈 {upCount}</span>}
        {downCount > 0 && <span className="flex items-center gap-1 text-red-600 text-sm font-medium">📉 {downCount}</span>}
        {hasRipples && <span className="text-gray-400">{expanded ? '▼' : '▶'}</span>}
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Only clickable when there is something to reveal — a card that expands
          to nothing is the exact "ripples aren't working" symptom. */}
      {hasRipples ? (
        <button onClick={() => setExpanded(!expanded)} className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
          {header}
        </button>
      ) : (
        <div className="w-full p-4">{header}</div>
      )}

      {expanded && hasRipples && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
          {fromRipples.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                <span className="text-sm font-semibold text-orange-700">CAUSE: {item.player} leaves {item.fromTeam}</span>
              </div>
              <div className="space-y-2">{fromRipples.map((r, i) => <RippleNode key={`f-${i}`} ripple={r} />)}</div>
            </div>
          )}
          {toRipples.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <span className="text-sm font-semibold text-blue-700">CAUSE: {item.player} joins {item.toTeam}</span>
              </div>
              <div className="space-y-2">{toRipples.map((r, i) => <RippleNode key={`t-${i}`} ripple={r} />)}</div>
            </div>
          )}
          {orphanRipples.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                <span className="text-sm font-semibold text-gray-600">OTHER IMPACTS</span>
                <span className="text-xs text-gray-400">(unclassified — missing affectedSide)</span>
              </div>
              <div className="space-y-2">{orphanRipples.map((r, i) => <RippleNode key={`o-${i}`} ripple={r} />)}</div>
            </div>
          )}
          {item.source && (
            <div className="text-xs text-gray-400 pt-2 border-t border-gray-200">
              Source:{' '}
              {item.sourceUrl ? (
                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {item.source}
                </a>
              ) : (
                item.source
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
