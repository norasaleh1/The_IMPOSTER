import React from 'react';
import { Suspect } from '../types';
import { Shield, MessageSquare, AlertCircle, HelpCircle, CheckCircle, UserCheck } from 'lucide-react';
import { sound } from '../services/audio';

interface SuspectVaultProps {
  suspects: Suspect[];
  suspicionData: Record<string, string>;
  reviewedSuspects: string[];
  interrogatedSuspects: string[];
  onUpdateSuspicion: (suspectId: string, level: string) => void;
  onOpenInterrogation: (suspectId: string) => void;
  onOpenSuspectModal: (suspect: Suspect) => void;
}

export const SuspectVault: React.FC<SuspectVaultProps> = ({
  suspects,
  suspicionData,
  reviewedSuspects,
  interrogatedSuspects,
  onUpdateSuspicion,
  onOpenInterrogation,
  onOpenSuspectModal
}) => {
  const suspicionLevels = [
    { label: 'Unclear', color: '#64748b' },
    { label: 'Innocent', color: '#10b981' },
    { label: 'Suspect', color: '#f59e0b' },
    { label: 'Prime Suspect', color: '#ef4444' }
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="stamp-classified">PERSONNEL DOSSIERS</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
            SUSPECT VAULT & ALIBI MATRIX
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Assign suspicion tags based on your investigative reasoning and interrogate suspects to cross-examine their claims.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {suspects.map((suspect) => {
          const currentSuspicion = suspicionData[suspect.id] || 'Unclear';
          const isInterrogated = interrogatedSuspects.includes(suspect.id);

          return (
            <div
              key={suspect.id}
              className="glass-panel"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `4px solid ${suspicionLevels.find(s => s.label === currentSuspicion)?.color || '#2a3349'}`
              }}
            >
              <div>
                {/* Avatar & Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '2.5rem', background: 'rgba(255,255,255,0.06)', padding: '8px', borderRadius: '10px' }}>
                      {suspect.avatar}
                    </div>
                    <div>
                      <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>{suspect.name}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{suspect.role}</p>
                      <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-red)' }}>
                        {suspect.clearance}
                      </span>
                    </div>
                  </div>

                  {isInterrogated && (
                    <span style={{
                      fontSize: '0.75rem',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#10b981',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      INTERROGATED
                    </span>
                  )}
                </div>

                {/* Statement */}
                <div style={{
                  background: 'rgba(10, 12, 16, 0.7)',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #1e2638',
                  marginBottom: '16px'
                }}>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    INITIAL STATEMENT:
                  </span>
                  <p style={{ color: '#e2e8f0', fontSize: '0.88rem', fontStyle: 'italic', lineHeight: '1.5' }}>
                    "{suspect.statement}"
                  </p>
                </div>

                {/* Known Activity summary */}
                <div style={{ marginBottom: '16px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Known Activity:</span> {suspect.knownActivities}
                </div>
              </div>

              <div>
                {/* Suspicion Level Assignment */}
                <div style={{ marginBottom: '16px' }}>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    INVESTIGATOR SUSPICION TAG:
                  </span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {suspicionLevels.map((lvl) => {
                      const isSelected = currentSuspicion === lvl.label;
                      return (
                        <button
                          key={lvl.label}
                          onClick={() => {
                            sound.playClick();
                            onUpdateSuspicion(suspect.id, lvl.label);
                          }}
                          style={{
                            background: isSelected ? lvl.color : 'rgba(30, 41, 59, 0.6)',
                            color: isSelected ? '#fff' : 'var(--text-secondary)',
                            border: `1px solid ${isSelected ? lvl.color : '#334155'}`,
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: isSelected ? 700 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          {lvl.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => { sound.playClick(); onOpenInterrogation(suspect.id); }}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center', padding: '8px 12px', fontSize: '0.85rem' }}
                  >
                    <MessageSquare size={15} /> Interrogate
                  </button>
                  <button
                    onClick={() => { sound.playClick(); onOpenSuspectModal(suspect); }}
                    className="btn-secondary"
                    style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                    title="View Full Personnel Dossier"
                  >
                    View File
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
