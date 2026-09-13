import { CaseSummary, CaseDetail, SessionState, FinalReport, LeaderboardEntry } from '../types';

const API_BASE = '/api';

export async function fetchCases(): Promise<CaseSummary[]> {
  const res = await fetch(`${API_BASE}/cases`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch cases');
  return data.cases;
}

export async function fetchCase(id: string): Promise<CaseDetail> {
  const res = await fetch(`${API_BASE}/cases/${id}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch case details');
  return data.case;
}

export async function createSession(playerName: string, caseId: string): Promise<{ sessionId: string; session: SessionState }> {
  const res = await fetch(`${API_BASE}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerName, caseId })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to initialize session');
  return { sessionId: data.sessionId, session: data.session };
}

export async function fetchSession(sessionId: string): Promise<SessionState> {
  const res = await fetch(`${API_BASE}/sessions/${sessionId}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch session');
  return data.session;
}

export async function performAction(
  sessionId: string,
  actionType: 'REVIEW_SUSPECT' | 'REVIEW_EVIDENCE' | 'ASK_QUESTION' | 'ADD_CONNECTION' | 'UPDATE_SUSPICION' | 'UPDATE_NOTES',
  payload: any
): Promise<{ session: SessionState; message: string }> {
  const res = await fetch(`${API_BASE}/sessions/${sessionId}/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ actionType, payload })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to record action');
  return { session: data.session, message: data.message };
}

export async function consultAI(
  sessionId: string,
  question: string
): Promise<{ reply: string; source: string; score: number; aiConsultations: number }> {
  const res = await fetch(`${API_BASE}/sessions/${sessionId}/ai-consult`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'AI Detective request failed');
  return data;
}

export async function submitAccusation(
  sessionId: string,
  suspectId: string,
  contradictionId?: string,
  supportingEvidenceId?: string
): Promise<{
  solved: boolean;
  attemptsLeft: number;
  score?: number;
  message?: string;
  report?: FinalReport;
}> {
  const res = await fetch(`${API_BASE}/sessions/${sessionId}/accuse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ suspectId, contradictionId, supportingEvidenceId })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Accusation processing failed');
  return data;
}

export async function fetchLeaderboard(caseId?: string): Promise<LeaderboardEntry[]> {
  const url = caseId ? `${API_BASE}/leaderboard?caseId=${caseId}` : `${API_BASE}/leaderboard`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch leaderboard');
  return data.leaderboard;
}
