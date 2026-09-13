import React from 'react';
import { Shield, Volume2, VolumeX, Trophy, AlertOctagon, FileText, ArrowLeft, BrainCircuit } from 'lucide-react';
import { sound } from '../services/audio';

interface HeaderProps {
  playerName: string;
  caseNumber?: string;
  caseTitle?: string;
  score: number;
  attemptsLeft: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenLeaderboard: () => void;
  onOpenAccusation: () => void;
  onOpenAIDetective: () => void;
  onBackToArchive: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  playerName,
  caseNumber,
  caseTitle,
  score,
  attemptsLeft,
  isMuted,
  onToggleMute,
  onOpenLeaderboard,
  onOpenAccusation,
  onOpenAIDetective,
  onBackToArchive,
  activeTab,
  setActiveTab
}) => {
  return (
    <header style={{
      background: 'rgba(18, 22, 32, 0.95)',
      borderBottom: '1px solid var(--border-color)',
      padding: '12px 24px',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        {/* Left: Branding & Case Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {caseNumber && (
            <button
              onClick={() => { sound.playClick(); onBackToArchive(); }}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              title="Return to Case Archive"
            >
              <ArrowLeft size={16} /> Archives
            </button>
          )}

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="stamp-classified">TOP SECRET</span>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em', color: '#fff' }}>
                THE IMPOSTOR
              </h1>
            </div>
            {caseNumber && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span className="mono" style={{ color: 'var(--accent-red)', fontWeight: 600 }}>{caseNumber}</span>
                <span>•</span>
                <span style={{ color: 'var(--text-secondary)' }}>{caseTitle}</span>
              </div>
            )}
          </div>
        </div>

        {/* Center: Detective Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(10, 12, 16, 0.6)', padding: '6px 16px', borderRadius: '6px', border: '1px solid #2a3349' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield size={16} color="var(--accent-red)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>AGENT:</span>
            <span className="mono" style={{ fontWeight: 700, color: '#f1f5f9' }}>{playerName || 'ANONYMOUS'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>SCORE:</span>
            <span className="mono" style={{ fontWeight: 700, color: 'var(--accent-amber)', fontSize: '1rem' }}>{score}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ATTEMPTS:</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '2px',
                    backgroundColor: i <= attemptsLeft ? '#ef4444' : '#334155',
                    boxShadow: i <= attemptsLeft ? '0 0 6px rgba(239, 68, 68, 0.8)' : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => { sound.playClick(); onOpenAIDetective(); }}
            className="btn-secondary"
            style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
            title="Consult AI Detective Assistant"
          >
            <BrainCircuit size={16} /> AI Detective
          </button>

          <button
            onClick={() => { sound.playClick(); onOpenLeaderboard(); }}
            className="btn-secondary"
            title="View Hall of Fame Leaderboard"
          >
            <Trophy size={16} color="var(--accent-amber)" /> Leaderboard
          </button>

          {caseNumber && (
            <button
              onClick={() => { sound.playAccusationGong(); onOpenAccusation(); }}
              className="btn-primary"
              title="Submit Final Case Accusation"
            >
              <AlertOctagon size={16} /> Make Accusation
            </button>
          )}

          <button
            onClick={() => { sound.playClick(); onToggleMute(); }}
            className="btn-secondary"
            style={{ padding: '8px' }}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={18} color="#94a3b8" /> : <Volume2 size={18} color="#ef4444" />}
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs when in a Case */}
      {caseNumber && (
        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '12px',
          borderTop: '1px solid rgba(42, 51, 73, 0.6)',
          paddingTop: '8px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'briefing', label: 'Incident Briefing' },
            { id: 'suspects', label: 'Suspect Dossiers' },
            { id: 'evidence', label: 'Evidence Locker' },
            { id: 'board', label: 'Investigation Board' },
            { id: 'timeline', label: 'Timeline Chronology' },
            { id: 'notes', label: 'Investigator Notes' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { sound.playClick(); setActiveTab(tab.id); }}
                style={{
                  background: isActive ? 'var(--accent-red)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
