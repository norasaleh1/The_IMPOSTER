export type GameState = 'start' | 'investigating' | 'solved' | 'failed';

export interface Suspect {
  id: 'alex' | 'maya' | 'daniel' | 'sophia';
  name: string;
  role: string;
  statement: string;
  isGuilty: boolean;
  avatarSeed: string;
  department: string;
  keycardId: string;
  shiftHours: string;
  notes: string;
}

export interface Evidence {
  id: 'keycard' | 'meeting' | 'security_cam' | 'design_cam';
  title: string;
  category: 'Keycard Access Log' | 'Virtual Meeting Log' | 'CCTV Security Camera' | 'CCTV Facility Camera';
  shortSummary: string;
  timestamp: string;
  source: string;
  classification: string;
  logEntries: Array<{
    time: string;
    event: string;
    detail: string;
    flagged?: boolean;
  }>;
}

export interface InvestigationNotes {
  content: string;
}

export type DetectiveRank = 'Master Detective' | 'Sharp Investigator' | 'Junior Detective' | 'Rookie Investigator';

export interface GameScoreResult {
  finalScore: number;
  rank: DetectiveRank;
  attemptsUsed: number;
  hintUsed: boolean;
  accuracy: string;
}
