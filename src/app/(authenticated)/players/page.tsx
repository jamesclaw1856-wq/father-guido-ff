'use client';

import playersData from '@/data/players.json';
import type { PlayerData } from '@/lib/types';
import PlayerTable from './PlayerTable';

export default function PlayersPage() {
  const players = playersData as PlayerData[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Player Database</h1>
        <p className="text-slate-400 mt-1">3-year performance data with preseason vs actual analysis</p>
      </div>
      <PlayerTable players={players} />
    </div>
  );
}
