'use client';

import { useState } from 'react';
import type { NewsItem, Ripple } from '@/lib/types';

function RippleNode({ ripple }: { ripple: Ripple }) {
  const isUp = ripple.direction === 'up';
  const severityColors = {
    high: isUp ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10',
    medium: isUp ? 'border-green-400 bg-green-400/5' : 'border-red-400 bg-red-400/5',
    low: isUp ? 'border-green-300 bg-green-300/5' : 'border-red-300 bg-red-300/5',
  };

  return (
    <div className={`border-l-4 ${severityColors[ripple.severity]} rounded-r-lg p-3 ml-6`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{isUp ? '📈' : '📉'}</span>
        <span className="font-semibold text-white">{ripple.player}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
          {ripple.team} {ripple.position}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          ripple.severity === 'high' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-700 text-slate-400'
        }`}>
          {ripple.severity}
        </span>
      </div>

      <div className="space-y-1 text-sm ml-8">
        <div className="flex gap-2">
          <span className="text-slate-500 font-medium shrink-0">Cause:</span>
          <span className="text-slate-300">{ripple.cause}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-slate-500 font-medium shrink-0">Impact:</span>
          <span className="text-slate-300">{ripple.impact}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-slate-500 font-medium shrink-0">Draft shift:</span>
          <span className={`font-medium ${isUp ? 'text-green-400' : 'text-red-400'}`}>
            {ripple.draftValueShift}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RippleTree({ item }: { item: NewsItem }) {
  const [expanded, setExpanded] = useState(false);

  const fromRipples = item.ripples.filter(r => r.affectedSide === 'from');
  const toRipples = item.ripples.filter(r => r.affectedSide === 'to');
  const upCount = item.ripples.filter(r => r.direction === 'up').length;
  const downCount = item.ripples.filter(r => r.direction === 'down').length;

  const typeColors: Record<string, string> = {
    Trade: 'bg-purple-500/20 text-purple-400',
    Signing: 'bg-blue-500/20 text-blue-400',
    Injury: 'bg-red-500/20 text-red-400',
    Draft: 'bg-yellow-500/20 text-yellow-400',
    Release: 'bg-orange-500/20 text-orange-400',
    Retirement: 'bg-slate-500/20 text-slate-400',
    Contract: 'bg-green-500/20 text-green-400',
    'Trade Talks': 'bg-purple-500/20 text-purple-300',
    'Team Impact': 'bg-cyan-500/20 text-cyan-400',
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left hover:bg-slate-700/30 transition-colors"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                typeColors[item.type] || 'bg-slate-700 text-slate-300'
              }`}>
                {item.type}
              </span>
              <span className="text-xs text-slate-500">{item.date}</span>
            </div>
            <h3 className="text-white font-semibold">{item.headline}</h3>
            <p className="text-slate-400 text-sm mt-1">{item.details}</p>
          </div>

          <div className="flex items-center gap-3 ml-4 shrink-0">
            {upCount > 0 && (
              <span className="flex items-center gap-1 text-green-400 text-sm">
                <span>📈</span> {upCount}
              </span>
            )}
            {downCount > 0 && (
              <span className="flex items-center gap-1 text-red-400 text-sm">
                <span>📉</span> {downCount}
              </span>
            )}
            <span className="text-slate-500 text-lg">{expanded ? '▼' : '▶'}</span>
          </div>
        </div>
      </button>

      {/* Ripple Tree — expanded view */}
      {expanded && item.ripples.length > 0 && (
        <div className="border-t border-slate-700 p-4 space-y-4">
          {/* FROM side (team losing the player) */}
          {fromRipples.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-sm font-medium text-orange-400">
                  CAUSE: {item.player} leaves {item.fromTeam}
                </span>
              </div>
              <div className="space-y-2">
                {fromRipples.map((ripple, i) => (
                  <RippleNode key={`from-${i}`} ripple={ripple} />
                ))}
              </div>
            </div>
          )}

          {/* TO side (team gaining the player) */}
          {toRipples.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium text-blue-400">
                  CAUSE: {item.player} joins {item.toTeam}
                </span>
              </div>
              <div className="space-y-2">
                {toRipples.map((ripple, i) => (
                  <RippleNode key={`to-${i}`} ripple={ripple} />
                ))}
              </div>
            </div>
          )}

          {/* Source */}
          {item.source && (
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-700/50">
              Source: {item.sourceUrl ? (
                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  {item.source}
                </a>
              ) : item.source}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
