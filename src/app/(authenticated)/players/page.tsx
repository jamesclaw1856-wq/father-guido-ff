import { getDb } from '@/lib/firebase-admin';
import type { PlayerData } from '@/lib/types';
import PlayerTable from './PlayerTable';

async function getPlayers(): Promise<PlayerData[]> {
  try {
    const db = getDb();
    const snapshot = await db.collection('players').orderBy('name').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PlayerData[];
  } catch {
    return [];
  }
}

export default async function PlayersPage() {
  const players = await getPlayers();

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
