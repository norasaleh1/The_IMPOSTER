import React, { useState, useEffect } from 'react';
import { CaseSummary, CaseDetail, SessionState, Suspect, EvidenceItem, FinalReport } from './types';
import { fetchCases, fetchCase, createSession, performAction, consultAI, submitAccusation } from './services/api';
import { sound } from './services/audio';
import { Header } from './components/Header';
import { CaseArchive } from './components/CaseArchive';
import { IncidentBriefing } from './components/IncidentBriefing';
import { SuspectVault } from './components/SuspectVault';
import { SuspectModal } from './components/SuspectModal';
import { InterrogationRoom } from './components/InterrogationRoom';
import { EvidenceLocker } from './components/EvidenceLocker';
import { EvidenceModal } from './components/EvidenceModal';
import { InvestigationBoard } from './components/InvestigationBoard';
import { CaseTimeline } from './components/CaseTimeline';
import { InvestigatorNotes } from './components/InvestigatorNotes';
import { AIDetectiveAssistant } from './components/AIDetectiveAssistant';
import { AccusationModal } from './components/AccusationModal';
import { FinalReportModal } from './components/FinalReportModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { InvestigationAlertModal } from './components/InvestigationAlertModal';

export default function App() {
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('impostor_player_name') || 'Agent Miller';
  });

  const [cases, setCases] = useState<CaseSummary[]>([]);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [session, setSession] = useState<SessionState | null>(null);
  const [activeTab, setActiveTab] = useState<string>('briefing');
  const [loading, setLoading] = useState<boolean>(true);

  // Audio State
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals & Sub-views
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isAIDetectiveOpen, setIsAIDetectiveOpen] = useState<boolean>(false);
  const [isAccusationOpen, setIsAccusationOpen] = useState<boolean>(false);
  const [finalReport, setFinalReport] = useState<FinalReport | null>(null);
  const [inGameNotice, setInGameNotice] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type?: 'WARNING' | 'ERROR' | 'INFO';
    attemptsLeft?: number;
  }>({
    isOpen: false,
    title: '',
    message: ''
  });

  const [selectedSuspectForModal, setSelectedSuspectForModal] = useState<Suspect | null>(null);
  const [selectedEvidenceForModal, setSelectedEvidenceForModal] = useState<EvidenceItem | null>(null);
  const [interrogatingSuspectId, setInterrogatingSuspectId] = useState<string>('');

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Initial cases load
  useEffect(() => {
    fetchCases()
      .then(data => {
        setCases(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch cases:', err);
        setLoading(false);
      });
  }, []);

  const handleSetPlayerName = (name: string) => {
    setPlayerName(name);
    localStorage.setItem('impostor_player_name', name);
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Start / Select a Case
  const handleSelectCase = async (caseId: string) => {
    setLoading(true);
    try {
      const detail = await fetchCase(caseId);
      const sessionData = await createSession(playerName, caseId);
      setCaseDetail(detail);
      setSession(sessionData.session);
      setActiveCaseId(caseId);
      setActiveTab('briefing');
      if (detail.suspects.length > 0) {
        setInterrogatingSuspectId(detail.suspects[0].id);
      }
      showToast(`Case File [${detail.caseNumber}] Initialized`);
    } catch (err: any) {
      setInGameNotice({
        isOpen: true,
        title: 'CASE INITIALIZATION ERROR',
        message: err.message || 'Unable to open case file. Please try again.',
        type: 'ERROR'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToArchive = () => {
    setActiveCaseId(null);
    setCaseDetail(null);
    setSession(null);
    setFinalReport(null);
  };

  // Actions
  const handleInspectSuspect = (suspectId: string) => {
    if (!session) return;
    performAction(session.id, 'REVIEW_SUSPECT', { suspectId })
      .then(res => {
        setSession(res.session);
      })
      .catch(console.error);
  };

  const handleInspectEvidence = (evidence: EvidenceItem) => {
    setSelectedEvidenceForModal(evidence);
    sound.playClue();
    if (!session) return;
    performAction(session.id, 'REVIEW_EVIDENCE', { evidenceId: evidence.id })
      .then(res => {
        setSession(res.session);
        showToast(`Discovered Clue: ${evidence.title}`);
      })
      .catch(console.error);
  };

  const handleAskQuestion = (suspectId: string, questionId: string, questionText: string, answerText: string) => {
    if (!session) return;
    performAction(session.id, 'ASK_QUESTION', { suspectId, questionId, questionText, answerText })
      .then(res => {
        setSession(res.session);
        showToast(`Testimony recorded (+30 pts)`);
      })
      .catch(console.error);
  };

  const handleAddConnection = (itemA: string, itemB: string, type: string, customExplanation: string) => {
    if (!session) return;
    performAction(session.id, 'ADD_CONNECTION', { itemA, itemB, type, customExplanation })
      .then(res => {
        setSession(res.session);
        showToast(res.message);
      })
      .catch(console.error);
  };

  const handleUpdateSuspicion = (suspectId: string, level: string) => {
    if (!session) return;
    performAction(session.id, 'UPDATE_SUSPICION', { suspectId, level })
      .then(res => {
        setSession(res.session);
        showToast(`Suspicion updated: ${level}`);
      })
      .catch(console.error);
  };

  const handleSaveNotes = (text: string) => {
    if (!session) return;
    performAction(session.id, 'UPDATE_NOTES', { text })
      .then(res => {
        setSession(res.session);
        showToast('Notes saved to dossier');
      })
      .catch(console.error);
  };

  const handleConsultAI = async (question: string) => {
    if (!session) throw new Error('No active investigation session');
    const res = await consultAI(session.id, question);
    setSession(prev => prev ? {
      ...prev,
      score: res.score,
      ai_consultations: res.aiConsultations
    } : null);
    return { reply: res.reply, source: res.source };
  };

  const handleSubmitAccusation = async (suspectId: string, contradictionId?: string, supportingEvidenceId?: string) => {
    if (!session) return;
    setIsAccusationOpen(false);

    try {
      const result = await submitAccusation(session.id, suspectId, contradictionId, supportingEvidenceId);
      if (result.solved) {
        setFinalReport(result.report!);
      } else {
        if (result.attemptsLeft <= 0) {
          // Failed
          setFinalReport(result.report!);
        } else {
          // Still attempts left
          setSession(prev => prev ? {
            ...prev,
            attempts_left: result.attemptsLeft,
            score: result.score || prev.score
          } : null);

          sound.playFailDrone();
          setInGameNotice({
            isOpen: true,
            title: 'INDICTMENT REJECTED',
            message: result.message || 'Incorrect suspect! The suspect provided a corroborated alibi or lacked sufficient motive.',
            type: 'WARNING',
            attemptsLeft: result.attemptsLeft
          });
        }
      }
    } catch (err: any) {
      setInGameNotice({
        isOpen: true,
        title: 'INDICTMENT PROCESSING ERROR',
        message: err.message || 'Failed to submit accusation.',
        type: 'ERROR'
      });
    }
  };

  const openInterrogation = (suspectId: string) => {
    setInterrogatingSuspectId(suspectId);
    handleInspectSuspect(suspectId);
    setActiveTab('interrogation');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header */}
      <Header
        playerName={playerName}
        caseNumber={caseDetail?.caseNumber}
        caseTitle={caseDetail?.title}
        score={session?.score || 1000}
        attemptsLeft={session?.attempts_left || 3}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenAccusation={() => setIsAccusationOpen(true)}
        onOpenAIDetective={() => setIsAIDetectiveOpen(true)}
        onBackToArchive={handleBackToArchive}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Screen Content */}
      <main style={{ flex: 1 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-muted)' }}>
            <span className="stamp-classified">LOADING CLASSIFIED DOSSIERS...</span>
          </div>
        ) : !activeCaseId || !caseDetail || !session ? (
          /* Case Archive Selection */
          <CaseArchive
            cases={cases}
            playerName={playerName}
            onSetPlayerName={handleSetPlayerName}
            onSelectCase={handleSelectCase}
          />
        ) : (
          /* Active Case Investigation Tabs */
          <>
            {activeTab === 'briefing' && (
              <IncidentBriefing
                caseData={caseDetail}
                onNavigate={setActiveTab}
                onSelectSuspect={(suspectId) => openInterrogation(suspectId)}
              />
            )}

            {activeTab === 'suspects' && (
              <SuspectVault
                suspects={caseDetail.suspects}
                suspicionData={session.suspicion_data}
                reviewedSuspects={session.reviewed_suspects}
                interrogatedSuspects={session.interrogated_suspects}
                onUpdateSuspicion={handleUpdateSuspicion}
                onOpenInterrogation={(susId) => openInterrogation(susId)}
                onOpenSuspectModal={(sus) => {
                  setSelectedSuspectForModal(sus);
                  handleInspectSuspect(sus.id);
                }}
              />
            )}

            {activeTab === 'interrogation' && (
              <InterrogationRoom
                suspects={caseDetail.suspects}
                activeSuspectId={interrogatingSuspectId || caseDetail.suspects[0].id}
                onSelectSuspect={(susId) => {
                  setInterrogatingSuspectId(susId);
                  handleInspectSuspect(susId);
                }}
                unlockedQuestions={session.unlocked_questions}
                interrogationLogs={session.interrogation_logs}
                onAskQuestion={handleAskQuestion}
              />
            )}

            {activeTab === 'evidence' && (
              <EvidenceLocker
                evidence={caseDetail.evidence}
                discoveredEvidence={session.discovered_evidence}
                onInspectEvidence={handleInspectEvidence}
              />
            )}

            {activeTab === 'board' && (
              <InvestigationBoard
                suspects={caseDetail.suspects}
                evidence={caseDetail.evidence}
                discoveredEvidence={session.discovered_evidence}
                connections={session.connections}
                onAddConnection={handleAddConnection}
              />
            )}

            {activeTab === 'timeline' && (
              <CaseTimeline
                timeline={caseDetail.timeline}
                suspects={caseDetail.suspects}
                timeOfIncident={caseDetail.timeOfIncident}
              />
            )}

            {activeTab === 'notes' && (
              <InvestigatorNotes
                notes={session.notes}
                onSaveNotes={handleSaveNotes}
              />
            )}
          </>
        )}
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'rgba(18, 22, 32, 0.95)',
          borderLeft: '4px solid var(--accent-red)',
          border: '1px solid #334155',
          color: '#fff',
          padding: '12px 18px',
          borderRadius: '6px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          zIndex: 100,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>🔍</span> {toastMessage}
        </div>
      )}

      {/* Suspect Detail Modal */}
      <SuspectModal
        suspect={selectedSuspectForModal}
        onClose={() => setSelectedSuspectForModal(null)}
        onInterrogate={(susId) => {
          setSelectedSuspectForModal(null);
          openInterrogation(susId);
        }}
      />

      {/* Evidence Detail Modal */}
      <EvidenceModal
        evidence={selectedEvidenceForModal}
        onClose={() => setSelectedEvidenceForModal(null)}
      />

      {/* AI Detective Assistant Modal */}
      <AIDetectiveAssistant
        isOpen={isAIDetectiveOpen}
        onClose={() => setIsAIDetectiveOpen(false)}
        aiConsultations={session?.ai_consultations || 0}
        onConsultAI={handleConsultAI}
      />

      {/* Final Accusation Modal */}
      {caseDetail && (
        <AccusationModal
          isOpen={isAccusationOpen}
          onClose={() => setIsAccusationOpen(false)}
          suspects={caseDetail.suspects}
          evidence={caseDetail.evidence}
          discoveredEvidence={session?.discovered_evidence || []}
          attemptsLeft={session?.attempts_left || 3}
          onSubmitAccusation={handleSubmitAccusation}
        />
      )}

      {/* Final Investigation Report Modal */}
      <FinalReportModal
        report={finalReport}
        onClose={() => setFinalReport(null)}
        onReturnToArchive={handleBackToArchive}
        onOpenLeaderboard={() => {
          setFinalReport(null);
          setIsLeaderboardOpen(true);
        }}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      {/* In-Game Detective Alert Modal */}
      <InvestigationAlertModal
        isOpen={inGameNotice.isOpen}
        onClose={() => setInGameNotice(prev => ({ ...prev, isOpen: false }))}
        title={inGameNotice.title}
        message={inGameNotice.message}
        type={inGameNotice.type}
        attemptsLeft={inGameNotice.attemptsLeft}
      />
    </div>
  );
}
