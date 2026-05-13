import FirebaseConfigNotice from '@/components/FirebaseConfigNotice';
import { getFirebaseConfigurationError, getDb } from '@/lib/firebase-admin';
import type { NflTeam } from '@/lib/types';

async function getTeams(): Promise<{ teams: NflTeam[]; error: string | null }> {
  const configurationError = getFirebaseConfigurationError();
  if (configurationError) {
    return { teams: [], error: configurationError };
  }

  try {
    const db = getDb();
    const snapshot = await db.collection('nflTeams').orderBy('name').get();
    return {
      teams: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as NflTeam[],
      error: null,
    };
  } catch {
    return {
      teams: [],
      error: 'NFL teams are unavailable right now. Check your Firebase Admin setup and Firestore data.',
    };
  }
}

function TeamCard({ team, tone }: { team: NflTeam; tone: 'WIN' | 'LOSE' | 'Situational' }) {
  const toneStyles = {
    WIN: {
      card: 'bg-slate-800/50 border border-green-500/20',
      badge: 'bg-green-500/20 text-green-400 border border-green-500/30',
      label: 'WIN',
    },
    LOSE: {
      card: 'bg-slate-800/50 border border-red-500/20',
      badge: 'bg-red-500/20 text-red-400 border border-red-500/30',
      label: 'LOSE',
    },
    Situational: {
      card: 'bg-slate-800/50 border border-slate-700',
      badge: 'bg-slate-700 text-slate-400',
      label: 'Situational',
    },
  } as const;

  const style = toneStyles[tone];

  return (
    <div className={`${style.card} rounded-xl p-4`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-white">{team.name}</h3>
        <span className={`px-2 py-0.5 rounded-full text-xs ${style.badge}`}>{style.label}</span>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between"><span className="text-slate-500">QB:</span><span className="text-slate-300">{team.qb1}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">RB:</span><span className="text-slate-300">{team.rb1}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">WR:</span><span className="text-slate-300">{team.wr1}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">K:</span><span className="text-slate-300">{team.kicker}</span></div>
      </div>
      {team.notes && <p className="text-xs text-slate-500 mt-2 border-t border-slate-700 pt-2">{team.notes}</p>}
    </div>
  );
}

export default async function TeamsPage() {
  const { teams, error } = await getTeams();

  const winTeams = teams.filter((team) => team.pickType === 'WIN');
  const loseTeams = teams.filter((team) => team.pickType === 'LOSE');
  const sitTeams = teams.filter((team) => team.pickType === 'Situational' || !team.pickType);

  return (
    <div className="space-y-6">
      {error && <FirebaseConfigNotice message={error} />}

      <div>
        <h1 className="text-3xl font-bold">NFL Teams</h1>
        <p className="text-slate-400 mt-1">Depth charts, WIN/LOSE recommendations, and offseason news</p>
      </div>

      {teams.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
          No NFL team recommendations found in Firestore yet.
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold text-green-400 mb-3">WIN Pick Candidates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {winTeams.map((team) => <TeamCard key={team.abbreviation} team={team} tone="WIN" />)}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-red-400 mb-3">LOSE Pick Candidates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loseTeams.map((team) => <TeamCard key={team.abbreviation} team={team} tone="LOSE" />)}
            </div>
          </div>

          {sitTeams.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-slate-400 mb-3">Situational / Monitor</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sitTeams.map((team) => <TeamCard key={team.abbreviation} team={team} tone="Situational" />)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
