export interface Ripple {
  player: string;
  team: string;
  position: string;
  direction: 'up' | 'down';
  severity: 'high' | 'medium' | 'low';
  cause: string;
  impact: string;
  draftValueShift: string;
  // Optional on purpose: live Firestore docs exist without it. RippleTree shows
  // these under "Other impacts" rather than silently dropping them, so typing it
  // as required would be a lie that hides real data.
  affectedSide?: 'from' | 'to';
}

export interface NewsItem {
  id?: string;
  date: string;
  type: string;
  headline: string;
  player: string;
  fromTeam: string;
  toTeam: string;
  details: string;
  source: string;
  // Nice to have, not load-bearing: shown as a link on the source line when
  // present. Items without one render normally.
  sourceUrl?: string;
  ripples?: Ripple[];
}

export interface PlayerData {
  id?: string;
  name: string;
  team: string;
  position: string;
  preseason: { y2023: number | null; y2024: number | null; y2025: number | null };
  actual: { y2023: number | null; y2024: number | null; y2025: number | null };
  consistency: string;
  draftTarget: 'must-get' | 'strong' | 'value' | 'fade' | '';
  targetRound: string;
  notes: string;
}

export interface DraftPick {
  round: number;
  pick: number;
  overall: number;
  team: string;
  player: string;
  position: string;
  nflTeam: string;
  points: number;
  grade: string;
  notes: string;
}

export interface Standing {
  rank: number;
  team: string;
  record: string;
  pointsFor: number;
  avgPerWeek: number;
  pointsAgainst: number;
  champion?: boolean;
}

export interface NflTeam {
  id?: string;
  name: string;
  abbreviation: string;
  division: string;
  conference: string;
  qb1: string;
  rb1: string;
  wr1: string;
  kicker: string;
  outlook: string;
  pickType: 'WIN' | 'LOSE' | 'Situational' | '';
  notes: string;
}

export interface PickSlot {
  round: number;
  pick: number;
  target: string;
  dataSupport: string;
}
