import React, { useEffect } from 'react';
import { FinalReport } from '../types';
import { Award, Trophy, CheckCircle, XCircle, Clock, ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../services/audio';

interface FinalReportModalProps {
  report: FinalReport | null;
  onClose: () => void;
  onReturnToArchive: () => void;
  onOpenLeaderboard: () => void;
}

export const FinalReportModal: React.FC<FinalReportModalProps> = ({
  report,
  onClose,
  onReturnToArchive,
  onOpenLeaderboard
}) => {
  if (!report) return null;

  useEffect(() => {
    if (report.isSuccess) {
      sound.playVictoryFanfare();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } else {
      sound.playFailDrone();
    }
  }, [report]);

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${mins}m ${remainingSec}s`;
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Master Detective': return '#f59e0b';
      case 'Elite Detective': return '#06b6d4';
      case 'Senior Investigator': return '#10b981';
      case 'Sharp Investigator': return '#3b82f6';
      case 'Junior Detective': return '#8b5cf6';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="modal-backdrop">
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '750px',
          padding: '32px',
          position: 'relative',
          border: report.isSuccess ? '2px solid #10b981' : '2px solid #ef4444',
          boxShadow: report.isSuccess
            ? '0 0 50px rgba(16, 185, 129, 0.3), 0 20px 60px rgba(0,0,0,0.9)'
            : '0 0 50px rgba(239, 68, 68, 0.3), 0 20px 60px rgba(0,0,0,0.9)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Stamp & Case Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <span className={report.isSuccess ? 'stamp-solved' : 'stamp-failed'}>
              {report.status}
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '8px' }}>
              {report.caseTitle}
            </h2>
            <p className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {report.caseNumber} • Lead Agent: <strong>{report.playerName}</strong>
            </p>
          </div>

          {/* Detective Rank Badge */}
          <div style={{
            background: 'rgba(10, 12, 16, 0.8)',
            border: `2px solid ${getRankColor(report.rank)}`,
            padding: '10px 16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
              DETECTIVE RANK
            </span>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: getRankColor(report.rank) }}>
              {report.rank}
            </span>
          </div>
        </div>

        {/* Core Findings Box */}
        <div style={{
          background: 'rgba(10, 12, 16, 0.7)',
          border: '1px solid #1e2638',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-red)', fontWeight: 700 }}>
                IDENTIFIED CULPRIT:
              </span>
              <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800 }}>{report.culprit}</p>
            </div>
            <div>
              <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                MOTIVE:
              </span>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{report.motive}</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1e2638', paddingTop: '10px' }}>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
              CRITICAL CONTRADICTION:
            </span>
            <p style={{ color: '#e2e8f0', fontSize: '0.88rem', lineHeight: '1.5' }}>
              {report.criticalContradiction}
            </p>
          </div>
        </div>

        {/* Debrief Narrative */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderLeft: '3px solid var(--accent-red)',
          padding: '12px 16px',
          borderRadius: '0 6px 6px 0',
          marginBottom: '20px'
        }}>
          <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
            FINAL INVESTIGATION SUMMARY:
          </span>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
            {report.closingNarrative}
          </p>
        </div>

        {/* Performance Statistics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
          background: 'rgba(18, 22, 32, 0.8)',
          padding: '14px',
          borderRadius: '8px',
          marginBottom: '24px',
          border: '1px solid #2a3349',
          textAlign: 'center'
        }}>
          <div>
            <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>FINAL SCORE</span>
            <p className="mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
              {report.finalScore}
            </p>
          </div>
          <div>
            <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>DURATION</span>
            <p className="mono" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
              {formatDuration(report.durationSeconds)}
            </p>
          </div>
          <div>
            <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ACCURACY</span>
            <p className="mono" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#10b981' }}>
              {report.accuracy}%
            </p>
          </div>
          <div>
            <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>AI ASSISTS</span>
            <p className="mono" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
              {report.aiConsultations}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => { sound.playClick(); onReturnToArchive(); }}
            className="btn-primary"
            style={{ flex: 1, justifyContent: 'center', padding: '12px' }}
          >
            <RotateCcw size={16} /> Return to Case Archive
          </button>
          <button
            onClick={() => { sound.playClick(); onOpenLeaderboard(); }}
            className="btn-secondary"
            style={{ padding: '12px 20px' }}
          >
            <Trophy size={16} color="var(--accent-amber)" /> View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};
