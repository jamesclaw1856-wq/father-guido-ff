const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require(path.resolve(__dirname, 'firebase-credentials.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'fantasy-football-father-2f71e',
});

const db = admin.firestore();

async function seed() {
  console.log('Seeding Firestore...');

  // --- NEWS (with ripple effects) ---
  const newsItems = [
    {
      date: '2026-04-15',
      type: 'Signing',
      headline: 'Kyler Murray → MIN Vikings (1-yr, vet minimum)',
      player: 'Kyler Murray',
      fromTeam: 'ARI',
      toTeam: 'MIN',
      details: 'Cardinals released Murray. Vikings signed him to compete with J.J. McCarthy for QB1.',
      source: 'NFL.com',
      sourceUrl: 'https://www.nfl.com/news/cardinals-officially-release-kyler-murray-vikings-considered-favorite-to-land-qb',
      ripples: [
        { player: 'Will Reichard', team: 'MIN', position: 'K', direction: 'up', severity: 'high', cause: 'Murray joins MIN → dual-threat QB improves offense → more scoring drives reach FG/PAT range', impact: 'More FG/PAT opportunities for Reichard', draftValueShift: 'Rises from rd 6 to rd 4-5', affectedSide: 'to' },
        { player: 'Justin Jefferson', team: 'MIN', position: 'WR', direction: 'up', severity: 'medium', cause: 'Murray joins MIN → more proven deep-ball passer than McCarthy → Jefferson gets better QB play', impact: 'Increased big-play opportunities (key for distance-tiered TD scoring)', draftValueShift: 'Stable rd 2-3', affectedSide: 'to' },
        { player: 'J.J. McCarthy', team: 'MIN', position: 'QB', direction: 'down', severity: 'high', cause: 'Murray joins MIN → McCarthy faces real QB competition → may lose starting job entirely', impact: 'If McCarthy doesn\'t start, he\'s undraftable', draftValueShift: 'Drops from rd 10-12 to undraftable until camp winner named', affectedSide: 'to' },
        { player: 'Trey McBride', team: 'ARI', position: 'TE/WR', direction: 'down', severity: 'high', cause: 'Murray leaves ARI → ARI loses proven starting QB → passing game degrades significantly', impact: 'McBride loses his best QB, target volume and TD upside drops', draftValueShift: 'Drops from rd 10-12 to rd 14-16', affectedSide: 'from' },
        { player: 'Marvin Harrison Jr', team: 'ARI', position: 'WR', direction: 'down', severity: 'high', cause: 'Murray leaves ARI → rookie/backup QB lacks chemistry with Harrison → already struggled in 2025', impact: 'WR1 on a bad offense with a downgrade at QB', draftValueShift: 'Fade in rd 1-4', affectedSide: 'from' },
      ],
    },
    {
      date: '2026-04-15',
      type: 'Draft',
      headline: 'Fernando Mendoza → LV Raiders (projected #1 overall pick)',
      player: 'Fernando Mendoza',
      fromTeam: '',
      toTeam: 'LV',
      details: 'Heisman winner (41 TDs, 6 INTs at Indiana). Raiders expected to draft him #1 overall on April 23.',
      source: 'ESPN',
      sourceUrl: 'https://www.espn.com/nfl/story/_/id/48488757/raiders-spytek-says-teams-inquired-no-1-draft-pick',
      ripples: [
        { player: 'Ashton Jeanty', team: 'LV', position: 'RB', direction: 'up', severity: 'medium', cause: 'Mendoza drafted by LV → franchise QB upgrades offense → better play-action and game scripts for Jeanty', impact: 'Rushing lanes improve with a credible passing threat', draftValueShift: 'Recovers from rd 6-8 back to rd 3-5', affectedSide: 'to' },
        { player: 'Kirk Cousins', team: 'LV', position: 'QB', direction: 'down', severity: 'high', cause: 'Mendoza drafted by LV → Cousins becomes backup → unlikely to see meaningful playing time', impact: 'Remove from draft board entirely', draftValueShift: 'Undraftable', affectedSide: 'to' },
      ],
    },
    {
      date: '2026-04-15',
      type: 'Trade',
      headline: 'Dontayvion Wicks (PHI ← GB) — traded for draft picks',
      player: 'Dontayvion Wicks',
      fromTeam: 'GB',
      toTeam: 'PHI',
      details: 'Eagles acquired WR Wicks from Packers for 2026 5th + 2027 6th round picks. Signed 1-yr $12.5M extension.',
      source: 'ESPN',
      sourceUrl: '',
      ripples: [
        { player: 'DeVonta Smith', team: 'PHI', position: 'WR', direction: 'down', severity: 'medium', cause: 'Wicks joins PHI → another mouth to feed → AJ Brown locked as WR1, Wicks competes with Smith', impact: 'Target share risk increases for Smith', draftValueShift: 'Drops from rd 6 to rd 8-9', affectedSide: 'to' },
        { player: 'Jake Elliott', team: 'PHI', position: 'K', direction: 'up', severity: 'low', cause: 'Wicks joins PHI → more offensive weapons → PHI likely scores even more', impact: 'Slight increase in PAT and FG opportunities', draftValueShift: 'Minor bump', affectedSide: 'to' },
      ],
    },
    {
      date: '2026-04-15',
      type: 'Trade Talks',
      headline: 'Dexter Lawrence trade negotiations with Giants "broken off"',
      player: 'Dexter Lawrence',
      fromTeam: 'NYG',
      toTeam: '',
      details: 'Pro Bowl DT requested trade. Contract extension talks reached an impasse. Trade still possible before draft.',
      source: 'Yahoo Sports',
      sourceUrl: '',
      ripples: [
        { player: 'Malik Nabers', team: 'NYG', position: 'WR', direction: 'up', severity: 'low', cause: 'Lawrence trade → NYG defense weakens → more shootouts → negative game scripts increase NYG passing volume', impact: 'Nabers gets more garbage-time targets', draftValueShift: 'Holds steady rd 5-7', affectedSide: 'from' },
      ],
    },
    {
      date: '2026-04-15',
      type: 'Signing',
      headline: 'Trey Hendrickson → BAL Ravens (4yr/$112M)',
      player: 'Trey Hendrickson',
      fromTeam: '',
      toTeam: 'BAL',
      details: 'Ravens add elite pass rusher to bolster already strong defense.',
      source: 'CBS Sports',
      sourceUrl: '',
      ripples: [
        { player: 'Lamar Jackson', team: 'BAL', position: 'QB', direction: 'up', severity: 'low', cause: 'Hendrickson joins BAL → defense gets elite → more positive game scripts for BAL offense', impact: 'Jackson benefits from more leads, controls game flow', draftValueShift: 'Holds in rd 3-5 QB range', affectedSide: 'to' },
      ],
    },
    {
      date: '2026-04-15',
      type: 'Signing',
      headline: 'Bradley Chubb → BUF Bills (3yr/$43.5M)',
      player: 'Bradley Chubb',
      fromTeam: '',
      toTeam: 'BUF',
      details: 'Bills signed edge rusher Chubb to bolster defense.',
      source: 'PFF',
      sourceUrl: '',
      ripples: [
        { player: 'James Cook', team: 'BUF', position: 'RB', direction: 'up', severity: 'medium', cause: 'Chubb joins BUF → defense improves → more leads for BUF → positive game scripts mean more rushing', impact: 'Cook gets more carries in clock-control situations', draftValueShift: 'Solidifies as rd 3-5 RB target', affectedSide: 'to' },
      ],
    },
    {
      date: '2026-04-14',
      type: 'Award',
      headline: 'Matthew Stafford wins 2025 NFL MVP',
      player: 'Matthew Stafford',
      fromTeam: '',
      toTeam: 'LAR',
      details: 'Stafford won closest MVP vote since 2003 (24-23 over Drake Maye). Confirmed return for 2026 season.',
      source: 'Sky Sports',
      sourceUrl: 'https://www.skysports.com/nfl/news/12118/13503946/matthew-stafford-beats-drake-maye-to-nfl-mvp-award-before-confirming-return-with-los-angeles-rams-for-2026-season',
      ripples: [
        { player: 'Puka Nacua', team: 'LAR', position: 'WR', direction: 'up', severity: 'high', cause: 'Stafford wins MVP + confirms return → LAR passing game remains elite → Nacua is his top target', impact: 'Nacua locked in as WR1 on the best passing offense', draftValueShift: 'Rises to rd 3-5 WR range', affectedSide: 'to' },
        { player: 'Matthew Stafford', team: 'LAR', position: 'QB', direction: 'up', severity: 'high', cause: 'MVP validates 520-pt season → confirmed returning → eliminates retirement risk', impact: 'Stafford is THE steal-window QB target for 2026', draftValueShift: 'Target in rd 7-10 (was rd 13 in 2025 draft)', affectedSide: 'to' },
      ],
    },
  ];

  for (const item of newsItems) {
    await db.collection('news').add(item);
  }
  console.log(`✓ Seeded ${newsItems.length} news items with ripple effects`);

  // --- ANALYSIS DATA ---
  const topScorers = [
    { year: 2025, rank: 1, player: 'Matthew Stafford', pos: 'QB', team: 'LAR', pts: 520, preseasonRank: '#18 QB' },
    { year: 2025, rank: 2, player: 'Jason Myers', pos: 'K', team: 'SEA', pts: 504, preseasonRank: '#16 K' },
    { year: 2025, rank: 3, player: 'Brandon Aubrey', pos: 'K', team: 'DAL', pts: 493, preseasonRank: '#2 K' },
    { year: 2025, rank: 4, player: "Ka'imi Fairbairn", pos: 'K', team: 'HOU', pts: 474, preseasonRank: '#3 K' },
    { year: 2025, rank: 5, player: 'Josh Allen', pos: 'QB', team: 'BUF', pts: 443, preseasonRank: '#1 QB' },
    { year: 2025, rank: 6, player: 'Cam Little', pos: 'K', team: 'JAC', pts: 427, preseasonRank: '#20 K' },
    { year: 2025, rank: 7, player: 'Jared Goff', pos: 'QB', team: 'DET', pts: 415, preseasonRank: '#9 QB' },
    { year: 2025, rank: 8, player: 'Will Reichard', pos: 'K', team: 'MIN', pts: 408, preseasonRank: '#13 K' },
    { year: 2025, rank: 9, player: 'Dak Prescott', pos: 'QB', team: 'DAL', pts: 404, preseasonRank: '#12 QB' },
    { year: 2025, rank: 10, player: 'Chris Boswell', pos: 'K', team: 'PIT', pts: 403, preseasonRank: '#5 K' },
    { year: 2024, rank: 1, player: 'Joe Burrow', pos: 'QB', team: 'CIN', pts: 595, preseasonRank: '#1 QB' },
    { year: 2024, rank: 2, player: 'Lamar Jackson', pos: 'QB', team: 'BAL', pts: 538, preseasonRank: '#9 QB' },
    { year: 2024, rank: 3, player: 'Jared Goff', pos: 'QB', team: 'DET', pts: 523, preseasonRank: '#11 QB' },
    { year: 2024, rank: 4, player: 'Brandon Aubrey', pos: 'K', team: 'DAL', pts: 510, preseasonRank: '#1 K' },
    { year: 2024, rank: 5, player: 'Baker Mayfield', pos: 'QB', team: 'TB', pts: 503, preseasonRank: '#13 QB' },
    { year: 2024, rank: 6, player: 'Chris Boswell', pos: 'K', team: 'PIT', pts: 475, preseasonRank: '#18 K' },
    { year: 2024, rank: 7, player: 'Josh Allen', pos: 'QB', team: 'BUF', pts: 473, preseasonRank: '#2 QB' },
    { year: 2024, rank: 8, player: 'Cameron Dicker', pos: 'K', team: 'LAC', pts: 430, preseasonRank: '#7 K' },
    { year: 2024, rank: 9, player: "Ka'imi Fairbairn", pos: 'K', team: 'HOU', pts: 426, preseasonRank: '#3 K' },
    { year: 2024, rank: 10, player: 'Jake Bates', pos: 'K', team: 'DET', pts: 408, preseasonRank: 'Unranked' },
    { year: 2023, rank: 1, player: 'Josh Allen', pos: 'QB', team: 'BUF', pts: 494, preseasonRank: '#5 QB' },
    { year: 2023, rank: 2, player: 'Dak Prescott', pos: 'QB', team: 'DAL', pts: 471, preseasonRank: '#10 QB' },
    { year: 2023, rank: 3, player: 'Brandon Aubrey', pos: 'K', team: 'DAL', pts: 443, preseasonRank: 'Unranked' },
    { year: 2023, rank: 4, player: 'Jake Elliott', pos: 'K', team: 'PHI', pts: 392, preseasonRank: '#16 K' },
    { year: 2023, rank: 5, player: 'Brock Purdy', pos: 'QB', team: 'SF', pts: 390, preseasonRank: '#21 QB' },
    { year: 2023, rank: 6, player: 'Jalen Hurts', pos: 'QB', team: 'PHI', pts: 385, preseasonRank: '#4 QB' },
    { year: 2023, rank: 7, player: 'C.J. Stroud', pos: 'QB', team: 'HOU', pts: 383, preseasonRank: '#29 QB' },
    { year: 2023, rank: 8, player: 'Matt Gay', pos: 'K', team: 'IND', pts: 382, preseasonRank: 'Unranked' },
    { year: 2023, rank: 9, player: 'Cameron Dicker', pos: 'K', team: 'LAC', pts: 375, preseasonRank: '#8 K' },
    { year: 2023, rank: 10, player: 'Justin Tucker', pos: 'K', team: 'BAL', pts: 375, preseasonRank: '#1 K' },
  ];

  const eliteKickers = [
    { name: 'Brandon Aubrey', team: 'DAL', y2023: 443, y2024: 510, y2025: 493, avg: 482, notes: 'Rock-solid elite, top-5 every year' },
    { name: 'Cameron Dicker', team: 'LAC', y2023: 375, y2024: 430, y2025: 399, avg: 401, notes: 'Top-10 every year' },
    { name: "Ka'imi Fairbairn", team: 'HOU', y2023: 363, y2024: 627, y2025: 474, avg: 488, notes: 'Rising trajectory' },
    { name: 'Chase McLaughlin', team: 'TB', y2023: 324, y2024: 406, y2025: 398, avg: 376, notes: 'Top-15 every year' },
    { name: 'Jason Myers', team: 'SEA', y2023: 374, y2024: 357, y2025: 504, avg: 412, notes: '2025 #2 overall scorer' },
    { name: 'Chris Boswell', team: 'PIT', y2023: 318, y2024: 475, y2025: 403, avg: 399, notes: 'Strong last 2 years' },
    { name: 'Will Reichard', team: 'MIN', y2023: 0, y2024: 339, y2025: 408, avg: 374, notes: 'All-Pro 2025' },
    { name: 'Jake Bates', team: 'DET', y2023: 0, y2024: 408, y2025: 376, avg: 392, notes: 'Back-to-back top-20' },
  ];

  const eliteQBs = [
    { name: 'Josh Allen', team: 'BUF', y2023: 494, y2024: 473, y2025: 443, avg: 470, verdict: 'Most consistent player in league' },
    { name: 'Jared Goff', team: 'DET', y2023: 356, y2024: 523, y2025: 415, avg: 431, verdict: 'Consistent top-10' },
    { name: 'Matthew Stafford', team: 'LAR', y2023: 276, y2024: 0, y2025: 520, avg: 398, verdict: '2025 MVP & #1 overall' },
    { name: 'Jalen Hurts', team: 'PHI', y2023: 385, y2024: 350, y2025: 365, avg: 367, verdict: 'Consistent, never elite' },
    { name: 'Dak Prescott', team: 'DAL', y2023: 471, y2024: 0, y2025: 404, avg: 438, verdict: 'Health-dependent' },
    { name: 'Drake Maye', team: 'NE', y2023: 0, y2024: 0, y2025: 381, avg: 381, verdict: 'Rookie breakout, MVP runner-up' },
    { name: 'Bo Nix', team: 'DEN', y2023: 0, y2024: 350, y2025: 357, avg: 354, verdict: 'Consistent mid-tier' },
  ];

  const adpVsActual = [
    { year: 2023, player: 'Christian McCaffrey', pos: 'RB', preseasonRank: '#2 overall', actualFinish: '#32 overall', delta: -30, category: 'TRAP' },
    { year: 2023, player: "Ja'Marr Chase", pos: 'WR', preseasonRank: '#4 overall', actualFinish: '~#100', delta: -96, category: 'TRAP' },
    { year: 2023, player: 'Patrick Mahomes', pos: 'QB', preseasonRank: '#1 overall', actualFinish: '#53', delta: -52, category: 'TRAP' },
    { year: 2023, player: 'Brandon Aubrey', pos: 'K', preseasonRank: 'Unranked', actualFinish: '#3 overall (443)', delta: 999, category: 'STEAL' },
    { year: 2023, player: 'Dak Prescott', pos: 'QB', preseasonRank: '#10 QB', actualFinish: '#2 overall (471)', delta: 999, category: 'STEAL' },
    { year: 2023, player: 'C.J. Stroud', pos: 'QB', preseasonRank: '#29 QB', actualFinish: '#7 overall (383)', delta: 999, category: 'STEAL' },
    { year: 2024, player: 'Christian McCaffrey', pos: 'RB', preseasonRank: '#1 overall', actualFinish: 'Injured (0 pts)', delta: -999, category: 'TRAP' },
    { year: 2024, player: 'CeeDee Lamb', pos: 'WR', preseasonRank: '#4 overall', actualFinish: '~#43 (273)', delta: -39, category: 'TRAP' },
    { year: 2024, player: 'Jared Goff', pos: 'QB', preseasonRank: '#11 QB', actualFinish: '#3 overall (523)', delta: 999, category: 'STEAL' },
    { year: 2024, player: 'Jake Bates', pos: 'K', preseasonRank: 'Unranked', actualFinish: '#10 overall (408)', delta: 999, category: 'STEAL' },
    { year: 2024, player: 'Chris Boswell', pos: 'K', preseasonRank: '#18 K', actualFinish: '#6 overall (475)', delta: 999, category: 'STEAL' },
    { year: 2025, player: "Ja'Marr Chase", pos: 'WR', preseasonRank: '#1 WR', actualFinish: '~#87 (160)', delta: -86, category: 'TRAP' },
    { year: 2025, player: 'Josh Jacobs', pos: 'RB', preseasonRank: '#1 RB', actualFinish: '~#50 (160)', delta: -49, category: 'TRAP' },
    { year: 2025, player: 'Matthew Stafford', pos: 'QB', preseasonRank: '#18 QB', actualFinish: '#1 overall (520)', delta: 999, category: 'STEAL' },
    { year: 2025, player: 'Jason Myers', pos: 'K', preseasonRank: '#16 K', actualFinish: '#2 overall (504)', delta: 999, category: 'STEAL' },
    { year: 2025, player: 'Will Reichard', pos: 'K', preseasonRank: '#13 K', actualFinish: '#8 overall (408)', delta: 999, category: 'STEAL' },
  ];

  await db.collection('analysis').doc('multiYear').set({
    topScorers,
    eliteKickers,
    eliteQBs,
    adpVsActual,
  });
  console.log('✓ Seeded multi-year analysis data');

  // --- DRAFT STRATEGY ---
  await db.collection('analysis').doc('draftStrategy').set({
    pickSlots: [
      { round: 1, pick: 9, target: 'Best skill (RB/WR)', dataSupport: 'Don\'t reach for consensus #1 WR' },
      { round: 2, pick: 12, target: 'Pair with rd 1', dataSupport: 'Turn pick advantage' },
      { round: 3, pick: 29, target: 'Skill depth', dataSupport: 'Watch for kicker run' },
      { round: 4, pick: 32, target: 'Skill depth', dataSupport: '' },
      { round: 5, pick: 49, target: '⭐ ELITE KICKER (K1)', dataSupport: 'Aubrey/Dicker/Fairbairn — winning edge' },
      { round: 6, pick: 52, target: 'Skill or 2nd K', dataSupport: '' },
      { round: 7, pick: 69, target: '⭐ TOP-TIER QB', dataSupport: 'Goff/Stafford range — steal window' },
      { round: 8, pick: 72, target: 'RB/WR depth', dataSupport: '' },
      { round: 9, pick: 89, target: '2nd K or skill', dataSupport: '' },
      { round: 10, pick: 92, target: 'Skill depth', dataSupport: '' },
      { round: 11, pick: 109, target: 'QB2', dataSupport: 'Prescott/Lawrence precedent' },
      { round: 12, pick: 112, target: 'Team WIN pick', dataSupport: '' },
      { round: 13, pick: 129, target: 'Depth', dataSupport: '' },
      { round: 14, pick: 132, target: '⭐ 2nd KICKER (K2)', dataSupport: 'Bates/Bass won from here' },
      { round: 15, pick: 149, target: 'Depth', dataSupport: '' },
      { round: 16, pick: 152, target: 'Team LOSE pick', dataSupport: '' },
      { round: 17, pick: 169, target: 'Depth', dataSupport: '' },
      { round: 18, pick: 172, target: 'COMMANDERS', dataSupport: '3-year tradition' },
    ],
    playerTargets: [
      { priority: 'must-get', player: 'Brandon Aubrey', pos: 'K', round: '3-5', why: '482 avg over 3 years' },
      { priority: 'must-get', player: 'Jared Goff', pos: 'QB', round: '7-9', why: '3 champions had him or similar' },
      { priority: 'strong', player: 'Cameron Dicker', pos: 'K', round: '5-7', why: '401 3yr avg' },
      { priority: 'strong', player: "Ka'imi Fairbairn", pos: 'K', round: '5-7', why: 'Rising trajectory' },
      { priority: 'strong', player: 'Josh Allen', pos: 'QB', round: '1-3', why: 'Only 3-year top-10 QB' },
      { priority: 'strong', player: 'Matthew Stafford', pos: 'QB', round: '7-10', why: '2025 MVP, confirmed returning' },
      { priority: 'value', player: 'James Cook', pos: 'RB', round: '3-5', why: '270→305, improving on BUF' },
      { priority: 'value', player: 'Drake Maye', pos: 'QB', round: '7-10', why: 'MVP runner-up, NE improving' },
      { priority: 'value', player: 'Puka Nacua', pos: 'WR', round: '4-6', why: '220 pts with MVP Stafford' },
    ],
    fadePlayers: [
      { player: "Ja'Marr Chase", pos: 'WR', reason: '155→310→160. Wildly volatile. Drafted rd 1 TWICE.' },
      { player: 'CeeDee Lamb', pos: 'WR', reason: '273→?→105. Declining.' },
      { player: 'Josh Jacobs', pos: 'RB', reason: '?→200→160. Former #1 RB, consistent miss.' },
      { player: 'Consensus #1 RB', pos: 'RB', reason: '0/3 hit rate across 3 years' },
      { player: 'Consensus #1 WR', pos: 'WR', reason: '0/3 hit rate across 3 years' },
    ],
  });
  console.log('✓ Seeded draft strategy');

  // --- NFL TEAMS ---
  const nflTeams = [
    { abbreviation: 'ARI', name: 'Arizona Cardinals', division: 'NFC West', conference: 'NFC', qb1: 'Kyler Murray → MIN', rb1: 'James Conner', wr1: 'Marvin Harrison Jr', kicker: 'Chad Ryland', outlook: 'Rebuild — lost Murray', pickType: 'LOSE', notes: 'QB downgrade, McBride value drops' },
    { abbreviation: 'BAL', name: 'Baltimore Ravens', division: 'AFC North', conference: 'AFC', qb1: 'Lamar Jackson', rb1: 'Derrick Henry', wr1: 'Zay Flowers', kicker: 'Justin Tucker', outlook: 'Elite + Hendrickson signing', pickType: 'WIN', notes: 'Added Trey Hendrickson (4yr/$112M)' },
    { abbreviation: 'BUF', name: 'Buffalo Bills', division: 'AFC East', conference: 'AFC', qb1: 'Josh Allen', rb1: 'James Cook', wr1: 'Khalil Shakir', kicker: 'Tyler Bass', outlook: 'Elite offense', pickType: 'WIN', notes: 'Added Bradley Chubb (3yr/$43.5M)' },
    { abbreviation: 'DET', name: 'Detroit Lions', division: 'NFC North', conference: 'NFC', qb1: 'Jared Goff', rb1: 'Jahmyr Gibbs', wr1: 'Amon-Ra St. Brown', kicker: 'Jake Bates', outlook: 'Dominant offense', pickType: 'WIN', notes: 'Goff: 356→523→415' },
    { abbreviation: 'LV', name: 'Las Vegas Raiders', division: 'AFC West', conference: 'AFC', qb1: 'Fernando Mendoza (draft)', rb1: 'Ashton Jeanty', wr1: 'TBD', kicker: 'Daniel Carlson', outlook: 'Rebuilding + rookie QB', pickType: 'Situational', notes: '#1 pick Mendoza. Cousins as backup.' },
    { abbreviation: 'LAR', name: 'Los Angeles Rams', division: 'NFC West', conference: 'NFC', qb1: 'Matthew Stafford', rb1: 'Kyren Williams', wr1: 'Puka Nacua', kicker: 'Joshua Karty', outlook: 'Elite offense — Stafford MVP', pickType: 'WIN', notes: 'Stafford confirmed for 2026' },
    { abbreviation: 'MIN', name: 'Minnesota Vikings', division: 'NFC North', conference: 'NFC', qb1: 'Kyler Murray / J.J. McCarthy', rb1: 'Aaron Jones', wr1: 'Justin Jefferson', kicker: 'Will Reichard', outlook: 'Improved with Murray', pickType: 'WIN', notes: 'Murray signed. Reichard is All-Pro.' },
    { abbreviation: 'NE', name: 'New England Patriots', division: 'AFC East', conference: 'AFC', qb1: 'Drake Maye', rb1: 'Rhamondre Stevenson', wr1: 'Romeo Doubs (new)', kicker: 'Andres Borregales', outlook: 'Improving — Maye MVP runner-up', pickType: 'Situational', notes: 'Added Doubs, Dre\'Mont Jones' },
    { abbreviation: 'NYG', name: 'New York Giants', division: 'NFC East', conference: 'NFC', qb1: 'TBD', rb1: 'Tyrone Tracy', wr1: 'Malik Nabers', kicker: 'Graham Gano', outlook: 'Weak — Dexter Lawrence trade talks', pickType: 'LOSE', notes: 'Defense collapsing if Lawrence leaves' },
    { abbreviation: 'PHI', name: 'Philadelphia Eagles', division: 'NFC East', conference: 'NFC', qb1: 'Jalen Hurts', rb1: 'Saquon Barkley', wr1: 'A.J. Brown', kicker: 'Jake Elliott', outlook: 'Strong offense', pickType: 'WIN', notes: 'Added WR Dontayvion Wicks' },
    { abbreviation: 'WAS', name: 'Washington Commanders', division: 'NFC East', conference: 'NFC', qb1: 'Jayden Daniels', rb1: 'Brian Robinson', wr1: 'Terry McLaurin', kicker: 'Austin Seibert', outlook: 'Strong — Father Guido tradition', pickType: 'WIN', notes: '3-year consistent team pick value' },
  ];

  for (const team of nflTeams) {
    await db.collection('nflTeams').doc(team.abbreviation).set(team);
  }
  console.log(`✓ Seeded ${nflTeams.length} NFL teams`);

  // --- PLAYERS (key players with 3-year data) ---
  const players = [
    { name: 'Josh Allen', team: 'BUF', position: 'QB', preseason: { y2023: 5, y2024: 2, y2025: 1 }, actual: { y2023: 494, y2024: 473, y2025: 443 }, consistency: '⭐⭐⭐', draftTarget: 'strong', targetRound: '1-3', notes: 'Most consistent player in league' },
    { name: 'Matthew Stafford', team: 'LAR', position: 'QB', preseason: { y2023: 28, y2024: 10, y2025: 18 }, actual: { y2023: 276, y2024: null, y2025: 520 }, consistency: '⭐⭐', draftTarget: 'strong', targetRound: '7-10', notes: '2025 MVP, confirmed returning' },
    { name: 'Jared Goff', team: 'DET', position: 'QB', preseason: { y2023: 15, y2024: 11, y2025: 9 }, actual: { y2023: 356, y2024: 523, y2025: 415 }, consistency: '⭐⭐', draftTarget: 'must-get', targetRound: '7-9', notes: '3 champions had Goff or similar' },
    { name: 'Drake Maye', team: 'NE', position: 'QB', preseason: { y2023: null, y2024: null, y2025: 16 }, actual: { y2023: null, y2024: null, y2025: 381 }, consistency: '⭐', draftTarget: 'value', targetRound: '7-10', notes: 'MVP runner-up, NE improving' },
    { name: 'Dak Prescott', team: 'DAL', position: 'QB', preseason: { y2023: 10, y2024: 7, y2025: 12 }, actual: { y2023: 471, y2024: null, y2025: 404 }, consistency: '⭐', draftTarget: 'value', targetRound: '8-11', notes: 'Health-dependent but steal potential' },
    { name: 'Brandon Aubrey', team: 'DAL', position: 'K', preseason: { y2023: null, y2024: 1, y2025: 2 }, actual: { y2023: 443, y2024: 510, y2025: 493 }, consistency: '⭐⭐⭐', draftTarget: 'must-get', targetRound: '3-5', notes: '482 3-yr avg. Most consistent elite kicker.' },
    { name: 'Cameron Dicker', team: 'LAC', position: 'K', preseason: { y2023: 8, y2024: 7, y2025: 1 }, actual: { y2023: 375, y2024: 430, y2025: 399 }, consistency: '⭐⭐', draftTarget: 'strong', targetRound: '5-7', notes: '401 3-yr avg' },
    { name: "Ka'imi Fairbairn", team: 'HOU', position: 'K', preseason: { y2023: 22, y2024: 3, y2025: 3 }, actual: { y2023: 363, y2024: 627, y2025: 474 }, consistency: '⭐⭐', draftTarget: 'strong', targetRound: '5-7', notes: 'Father Guido\'s personal goldmine' },
    { name: 'Jason Myers', team: 'SEA', position: 'K', preseason: { y2023: 5, y2024: 13, y2025: 16 }, actual: { y2023: 374, y2024: 357, y2025: 504 }, consistency: '⭐⭐', draftTarget: 'value', targetRound: '8-10', notes: '2025 breakout but regression risk' },
    { name: 'Chris Boswell', team: 'PIT', position: 'K', preseason: { y2023: 9, y2024: 18, y2025: 5 }, actual: { y2023: 318, y2024: 475, y2025: 403 }, consistency: '⭐⭐', draftTarget: 'value', targetRound: '8-10', notes: 'Strong last 2 years' },
    { name: 'Will Reichard', team: 'MIN', position: 'K', preseason: { y2023: null, y2024: 25, y2025: 13 }, actual: { y2023: null, y2024: 339, y2025: 408 }, consistency: '⭐', draftTarget: 'value', targetRound: '8-10', notes: 'All-Pro 2025. Murray signing helps.' },
    { name: 'James Cook', team: 'BUF', position: 'RB', preseason: { y2023: null, y2024: 18, y2025: 6 }, actual: { y2023: null, y2024: 270, y2025: 305 }, consistency: '⭐', draftTarget: 'value', targetRound: '3-5', notes: 'Improving on elite BUF offense' },
    { name: 'Jahmyr Gibbs', team: 'DET', position: 'RB', preseason: { y2023: null, y2024: 5, y2025: 4 }, actual: { y2023: null, y2024: 305, y2025: 305 }, consistency: '⭐', draftTarget: 'value', targetRound: '3-5', notes: 'Identical 2-year production on DET' },
    { name: 'Puka Nacua', team: 'LAR', position: 'WR', preseason: { y2023: null, y2024: 8, y2025: 20 }, actual: { y2023: null, y2024: null, y2025: 220 }, consistency: '⭐', draftTarget: 'value', targetRound: '4-6', notes: '220 pts with MVP Stafford' },
    { name: "Ja'Marr Chase", team: 'CIN', position: 'WR', preseason: { y2023: 1, y2024: 2, y2025: 1 }, actual: { y2023: 155, y2024: 310, y2025: 160 }, consistency: 'volatile', draftTarget: 'fade', targetRound: '', notes: '155→310→160. AVOID.' },
    { name: 'CeeDee Lamb', team: 'DAL', position: 'WR', preseason: { y2023: 7, y2024: 1, y2025: 10 }, actual: { y2023: 273, y2024: null, y2025: 105 }, consistency: 'volatile', draftTarget: 'fade', targetRound: '', notes: 'Declining' },
    { name: 'Josh Jacobs', team: 'GB', position: 'RB', preseason: { y2023: 3, y2024: 23, y2025: 1 }, actual: { y2023: null, y2024: 200, y2025: 160 }, consistency: 'volatile', draftTarget: 'fade', targetRound: '', notes: 'Former #1 RB, consistent miss' },
  ];

  for (const p of players) {
    await db.collection('players').add(p);
  }
  console.log(`✓ Seeded ${players.length} players`);

  console.log('\n🎉 Firestore seeding complete!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
