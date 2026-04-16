'use client';

import type { NflTeam } from '@/lib/types';

const teams: NflTeam[] = [
  { name: 'Baltimore Ravens', abbreviation: 'BAL', division: 'AFC North', conference: 'AFC', qb1: 'Lamar Jackson', rb1: 'Derrick Henry', wr1: 'Zay Flowers', kicker: 'Justin Tucker', outlook: 'Elite + Hendrickson signing', pickType: 'WIN', notes: 'Added Trey Hendrickson (4yr/$112M)' },
  { name: 'Buffalo Bills', abbreviation: 'BUF', division: 'AFC East', conference: 'AFC', qb1: 'Josh Allen', rb1: 'James Cook', wr1: 'Khalil Shakir', kicker: 'Tyler Bass', outlook: 'Elite offense', pickType: 'WIN', notes: 'Added Bradley Chubb (3yr/$43.5M)' },
  { name: 'Detroit Lions', abbreviation: 'DET', division: 'NFC North', conference: 'NFC', qb1: 'Jared Goff', rb1: 'Jahmyr Gibbs', wr1: 'Amon-Ra St. Brown', kicker: 'Jake Bates', outlook: 'Dominant offense', pickType: 'WIN', notes: 'Goff: 356→523→415' },
  { name: 'Los Angeles Rams', abbreviation: 'LAR', division: 'NFC West', conference: 'NFC', qb1: 'Matthew Stafford', rb1: 'Kyren Williams', wr1: 'Puka Nacua', kicker: 'Joshua Karty', outlook: 'Elite — Stafford MVP', pickType: 'WIN', notes: 'Stafford confirmed for 2026' },
  { name: 'Minnesota Vikings', abbreviation: 'MIN', division: 'NFC North', conference: 'NFC', qb1: 'Kyler Murray / J.J. McCarthy', rb1: 'Aaron Jones', wr1: 'Justin Jefferson', kicker: 'Will Reichard', outlook: 'Improved with Murray', pickType: 'WIN', notes: 'Murray signed. Reichard is All-Pro.' },
  { name: 'Philadelphia Eagles', abbreviation: 'PHI', division: 'NFC East', conference: 'NFC', qb1: 'Jalen Hurts', rb1: 'Saquon Barkley', wr1: 'A.J. Brown', kicker: 'Jake Elliott', outlook: 'Strong offense', pickType: 'WIN', notes: 'Added WR Dontayvion Wicks' },
  { name: 'Washington Commanders', abbreviation: 'WAS', division: 'NFC East', conference: 'NFC', qb1: 'Jayden Daniels', rb1: 'Brian Robinson', wr1: 'Terry McLaurin', kicker: 'Austin Seibert', outlook: 'Strong', pickType: 'WIN', notes: '3-year Father Guido tradition' },
  { name: 'Arizona Cardinals', abbreviation: 'ARI', division: 'NFC West', conference: 'NFC', qb1: 'TBD (Murray left)', rb1: 'James Conner', wr1: 'Marvin Harrison Jr', kicker: 'Chad Ryland', outlook: 'Rebuild — lost Murray', pickType: 'LOSE', notes: 'QB downgrade, McBride value drops' },
  { name: 'Cleveland Browns', abbreviation: 'CLE', division: 'AFC North', conference: 'AFC', qb1: 'TBD', rb1: 'Quinshon Judkins', wr1: 'Jerry Jeudy', kicker: 'Dustin Hopkins', outlook: 'Weak', pickType: 'LOSE', notes: 'Rebuilding' },
  { name: 'New York Giants', abbreviation: 'NYG', division: 'NFC East', conference: 'NFC', qb1: 'TBD', rb1: 'Tyrone Tracy', wr1: 'Malik Nabers', kicker: 'Graham Gano', outlook: 'Weak', pickType: 'LOSE', notes: 'Dexter Lawrence trade — defense collapsing' },
  { name: 'Tennessee Titans', abbreviation: 'TEN', division: 'AFC South', conference: 'AFC', qb1: 'Will Levis', rb1: 'Tony Pollard', wr1: 'Calvin Ridley', kicker: 'Nick Folk', outlook: 'Rebuild', pickType: 'LOSE', notes: '' },
  { name: 'Las Vegas Raiders', abbreviation: 'LV', division: 'AFC West', conference: 'AFC', qb1: 'Fernando Mendoza (draft)', rb1: 'Ashton Jeanty', wr1: 'TBD', kicker: 'Daniel Carlson', outlook: 'Rebuilding + rookie QB', pickType: 'Situational', notes: '#1 pick Mendoza. Cousins as backup.' },
  { name: 'New England Patriots', abbreviation: 'NE', division: 'AFC East', conference: 'AFC', qb1: 'Drake Maye', rb1: 'Rhamondre Stevenson', wr1: 'Romeo Doubs', kicker: 'Andres Borregales', outlook: 'Improving', pickType: 'Situational', notes: 'Maye MVP runner-up. Added Doubs.' },
];

export default function TeamsPage() {
  const win = teams.filter(t => t.pickType === 'WIN');
  const lose = teams.filter(t => t.pickType === 'LOSE');
  const sit = teams.filter(t => t.pickType === 'Situational');

  const TeamCard = ({ team, borderColor }: { team: NflTeam; borderColor: string }) => (
    <div className={`bg-white border ${borderColor} rounded-xl p-4 shadow-sm`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{team.name}</h3>
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          team.pickType === 'WIN' ? 'bg-green-100 text-green-800' :
          team.pickType === 'LOSE' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
        }`}>{team.pickType}</span>
      </div>
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between"><span className="text-gray-500 font-medium">QB:</span><span className="text-gray-800">{team.qb1}</span></div>
        <div className="flex justify-between"><span className="text-gray-500 font-medium">RB:</span><span className="text-gray-800">{team.rb1}</span></div>
        <div className="flex justify-between"><span className="text-gray-500 font-medium">WR:</span><span className="text-gray-800">{team.wr1}</span></div>
        <div className="flex justify-between"><span className="text-gray-500 font-medium">K:</span><span className="text-gray-800">{team.kicker}</span></div>
      </div>
      {team.notes && <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-100">{team.notes}</p>}
    </div>
  );

  return (
    <div className="space-y-8">
      <div><h1 className="text-2xl font-bold text-gray-900">NFL Teams</h1><p className="text-gray-500 mt-1">Depth charts, WIN/LOSE recommendations, and offseason news</p></div>

      <div>
        <h2 className="text-lg font-semibold text-green-800 mb-3">WIN Pick Candidates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {win.map(t => <TeamCard key={t.abbreviation} team={t} borderColor="border-green-200" />)}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-red-800 mb-3">LOSE Pick Candidates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lose.map(t => <TeamCard key={t.abbreviation} team={t} borderColor="border-red-200" />)}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-600 mb-3">Situational / Monitor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sit.map(t => <TeamCard key={t.abbreviation} team={t} borderColor="border-gray-200" />)}
        </div>
      </div>
    </div>
  );
}
