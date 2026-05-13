import FirebaseConfigNotice from '@/components/FirebaseConfigNotice';
import { getDb, getFirebaseConfigurationError } from '@/lib/firebase-admin';
import type { PlayerData } from '@/lib/types';
import PlayerTable from './PlayerTable';

async function getPlayers(): Promise<{ players: PlayerData[]; error: string | null }> {
  try {
    const db = getDb();
    const snapshot = await db.collection('players').orderBy('name').get();
    return {
      players: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PlayerData[],
      error: null,
    };
  } catch (error) {
    return {
      players: [],
      error: error instanceof Error ? error.message : 'Failed to load player data.',
    };
  }
}

export default async function PlayersPage() {
  const { players, error } = await getPlayers();
  const configurationError = getFirebaseConfigurationError();

  return (
    <div className="space-y-6">
      {error && (
        <FirebaseConfigNotice message={configurationError ?? error} />
      )}

      <div>
        <h1 className="text-3xl font-bold">Player Database</h1>
        <p className="text-slate-400 mt-1">3-year performance data with preseason vs actual analysis</p>
      </div>
      <PlayerTable players={players} />
    </div>
  );
}
