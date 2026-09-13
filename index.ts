export interface Question {
  id: string;
  question: string;
  answer: string;
}

export interface UnlockedQuestion {
  id: string;
  triggerEvidenceId: string;
  question: string;
  answer: string;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  clearance: string;
  statement: string;
  accessInfo: string;
  knownActivities: string;
  initialQuestions: Question[];
  unlockedQuestions: UnlockedQuestion[];
}

export interface EvidenceItem {
  id: string;
  title: string;
  type: string;
  category: 'Digital' | 'Physical' | 'Forensic';
  icon: string;
  timestamp: string;
  status: 'Available' | 'Locked' | 'Reviewed';
  unlockRequirement?: string;
  isCritical: boolean;
  summary: string;
  details: string;
}

export interface TimelineEvent {
  time: string;
  label: string;
  description: string;
  verified: boolean;
  suspectId?: string;
}

export interface ValidConnection {
  id: string;
  itemA: string;
  itemB: string;
  type: 'Contradiction' | 'Alibi Disproved' | 'Corroboration' | 'Motive';
  explanation: string;
}

export interface BoardConnection {
  id: string;
  itemA: string;
  itemB: string;
  type: string;
  explanation: string;
  isValidContradiction?: boolean;
}

export interface InterrogationLog {
  suspectId: string;
  questionId: string;
  question: string;
  answer: string;
  timestamp: number;
}

export interface CaseSummary {
  id: string;
  caseNumber: string;
  title: string;
  location: string;
  timeOfIncident: string;
  difficulty: 'Normal' | 'Hard' | 'Expert';
  estimatedTime: string;
  briefing: {
    headline: string;
    summary: string;
    objective: string;
  };
  suspectCount: number;
  evidenceCount: number;
}

export interface CaseDetail extends CaseSummary {
  suspects: Suspect[];
  evidence: EvidenceItem[];
  timeline: TimelineEvent[];
  validConnections: ValidConnection[];
  initialDiscoveredEvidence: string[];
}

export interface SessionState {
  id: string;
  player_id: string;
  player_name: string;
  case_id: string;
  status: 'IN_PROGRESS' | 'SOLVED' | 'FAILED';
  score: number;
  attempts_left: number;
  hints_used: number;
  ai_consultations: number;
  notes: string;
  suspicion_data: Record<string, string>; // suspectId -> 'Innocent' | 'Unclear' | 'Suspect' | 'Prime Suspect'
  discovered_evidence: string[];
  unlocked_questions: string[];
  reviewed_suspects: string[];
  interrogated_suspects: string[];
  interrogation_logs: InterrogationLog[];
  connections: BoardConnection[];
  start_time: number;
  completed_at: number | null;
}

export interface FinalReport {
  caseNumber: string;
  caseTitle: string;
  status: 'CASE CLOSED' | 'CASE FAILED';
  isSuccess: boolean;
  culprit: string;
  motive: string;
  criticalContradiction: string;
  closingNarrative: string;
  playerName: string;
  finalScore: number;
  rank: string;
  durationSeconds: number;
  accuracy: number;
  attemptsUsed: number;
  hintsUsed: number;
  aiConsultations: number;
}

export interface LeaderboardEntry {
  id: string;
  session_id: string;
  player_name: string;
  case_id: string;
  score: number;
  rank: string;
  duration_seconds: number;
  accuracy: number;
  attempts_used: number;
  hints_used: number;
  ai_consultations: number;
  completed_at: string;
}
