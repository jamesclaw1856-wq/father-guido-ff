import { getDb } from '@/lib/firebase-admin';
import type { NflTeam } from '@/lib/types';

async function getTeams(): Promise<NflTeam[]> {
  try {
    const db = getDb();
    const snapshot = await db.collection('nflTeams').orderBy('name').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NflTeam[];
  } catch {
    return [];
  }
}

const defaultTeams: NflTeam[] = [
  { name: 'Arizona Cardinals', abbreviation: 'ARI', division: 'NFC West', conference: 'NFC', qb1: 'Kyler Murray → MIN', rb1: 'James Conner', wr1: 'Marvin Harrison Jr', kicker: 'Chad Ryland', outlook: 'Rebuild — lost Murray', pickType: 'LOSE', notes: 'QB downgrade, McBride value drops' },
  { name: 'Baltimore Ravens', abbreviation: 'BAL', division: 'AFC North', conference: 'AFC', qb1: 'Lamar Jackson', rb1: 'Derrick Henry', wr1: 'Zay Flowers', kicker: 'Justin Tucker', outlook: 'Elite + Hendrickson signing', pickType: 'WIN', notes: 'Added Trey Hendrickson (4yr/$112M)' },
  { name: 'Buffalo Bills', abbreviation: 'BUF', division: 'AFC East', conference: 'AFC', qb1: 'Josh Allen', rb1: 'James Cook', wr1: 'Khalil Shakir', kicker: 'Tyler Bass', outlook: 'Elite offense', pickType: 'WIN', notes: 'Added Bradley Chubb (3yr/$43.5M)' },
  { name: 'Detroit Lions', abbreviation: 'DET', division: 'NFC North', conference: 'NFC', qb1: 'Jared Goff', rb1: 'Jahmyr Gibbs', wr1: 'Amon-Ra St. Brown', kicker: 'Jake Bates', outlook: 'Dominant offense', pickType: 'WIN', notes: 'Goff: 356→523→415' },
  { name: 'Las Vegas Raiders', abbreviation: 'LV', division: 'AFC West', conference: 'AFC', qb1: 'Fernando Mendoza (draft)', rb1: 'Ashton Jeanty', wr1: 'TBD', kicker: 'Daniel Carlson', outlook: 'Rebuilding + rookie QB', pickType: 'Situational', notes: '#1 pick Mendoza. Cousins as backup.' },
  { name: 'Los Angeles Rams', abbreviation: 'LAR', division: 'NFC West', conference: 'NFC', qb1: 'Matthew Stafford', rb1: 'Kyren Williams', wr1: 'Puka Nacua', kicker: 'Joshua Karty', outlook: 'Elite offense — Stafford MVP', pickType: 'WIN', notes: 'Stafford confirmed for 2026' },
  { name: 'Minnesota Vikings', abbreviation: 'MIN', division: 'NFC North', conference: 'NFC', qb1: 'Kyler Murray / J.J. McCarthy', rb1: 'Aaron Jones', wr1: 'Justin Jefferson', kicker: 'Will Reichard', outlook: 'Improved with Murray', pickType: 'WIN', notes: 'Murray signed. Reichard is All-Pro.' },
  { name: 'New England Patriots', abbreviation: 'NE', division: 'AFC East', conference: 'AFC', qb1: 'Drake Maye', rb1: 'Rhamondre Stevenson', wr1: 'Romeo Doubs (new)', kicker: 'Andres Borregales', outlook: 'Improving — Maye MVP runner-up', pickType: 'Situational', notes: 'Added Doubs, Dre\'Mont Jones' },
  { name: 'New York Giants', abbreviation: 'NYG', division: 'NFC East', conference: 'NFC', qb1: 'TBD', rb1: 'Tyrone Tracy', wr1: 'Malik Nabers', kicker: 'Graham Gano', outlook: 'Weak — Dexter Lawrence trade talks', pickType: 'LOSE', notes: 'Defense collapsing if Lawrence leaves' },
  { name: 'Philadelphia Eagles', abbreviation: 'PHI', division: 'NFC East', conference: 'NFC', qb1: 'Jalen Hurts', rb1: 'Saquon Barkley', wr1: 'A.J. Brown', kicker: 'Jake Elliott', outlook: 'Strong offense', pickType: 'WIN', notes: 'Added WR Dontayvion Wicks' },
  { name: 'Washington Commanders', abbreviation: 'WAS', division: 'NFC East', conference: 'NFC', qb1: 'Jayden Daniels', rb1: 'Brian Robinson', wr1: 'Terry McLaurin', kicker: 'Austin Seibert', outlook: 'Strong — Father Guido tradition', pickType: 'WIN', notes: '3-year consistent team pick value' },
];

export default async function TeamsPage() {
  let teams = await getTeams();
  if (teams.length === 0) teams = defaultTeams;

  const winTeams = teams.filter(t => t.pickType === 'WIN');
  const loseTeams = teams.filter(t => t.pickType === 'LOSE');
  const sitTeams = teams.filter(t => t.pickType === 'Situational' || !t.pickType);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">NFL Teams</h1>
        <p className="text-slate-400 mt-1">Depth charts, WIN/LOSE recommendations, and offseason news</p>
      </div>

      {/* WIN Candidates */}
      <div>
        <h2 className="text-lg font-semibold text-green-400 mb-3">WIN Pick Candidates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {winTeams.map(team => (
            <div key={team.abbreviation} className="bg-slate-800/50 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">{team.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">WIN</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">QB:</span><span className="text-slate-300">{team.qb1}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">RB:</span><span className="text-slate-300">{team.rb1}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">WR:</span><span className="text-slate-300">{team.wr1}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">K:</span><span className="text-slate-300">{team.kicker}</span></div>
              </div>
              {team.notes && <p className="text-xs text-slate-500 mt-2 border-t border-slate-700 pt-2">{team.notes}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* LOSE Candidates */}
      <div>
        <h2 className="text-lg font-semibold text-red-400 mb-3">LOSE Pick Candidates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loseTeams.map(team => (
            <div key={team.abbreviation} className="bg-slate-800/50 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">{team.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-xs bg-red-500/20 text-red-400 border border-red-500/30">LOSE</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">QB:</span><span className="text-slate-300">{team.qb1}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">RB:</span><span className="text-slate-300">{team.rb1}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">WR:</span><span className="text-slate-300">{team.wr1}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">K:</span><span className="text-slate-300">{team.kicker}</span></div>
              </div>
              {team.notes && <p className="text-xs text-slate-500 mt-2 border-t border-slate-700 pt-2">{team.notes}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Situational */}
      {sitTeams.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-400 mb-3">Situational / Monitor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sitTeams.map(team => (
              <div key={team.abbreviation} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{team.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-slate-700 text-slate-400">Situational</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">QB:</span><span className="text-slate-300">{team.qb1}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">RB:</span><span className="text-slate-300">{team.rb1}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">WR:</span><span className="text-slate-300">{team.wr1}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">K:</span><span className="text-slate-300">{team.kicker}</span></div>
                </div>
                {team.notes && <p className="text-xs text-slate-500 mt-2 border-t border-slate-700 pt-2">{team.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
