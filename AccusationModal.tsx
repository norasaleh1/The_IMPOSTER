import React, { useState } from 'react';
import { Suspect, EvidenceItem } from '../types';
import { AlertOctagon, X, ShieldAlert, CheckCircle, Flame, ArrowRight } from 'lucide-react';
import { sound } from '../services/audio';

interface AccusationModalProps {
  isOpen: boolean;
  onClose: () => void;
  suspects: Suspect[];
  evidence: EvidenceItem[];
  discoveredEvidence: string[];
  attemptsLeft: number;
  onSubmitAccusation: (suspectId: string, contradictionId?: string, supportingEvidenceId?: string) => void;
}

export const AccusationModal: React.FC<AccusationModalProps> = ({
  isOpen,
  onClose,
  suspects,
  evidence,
  discoveredEvidence,
  attemptsLeft,
  onSubmitAccusation
}) => {
  const [selectedSuspectId, setSelectedSuspectId] = useState<string>('');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>('');
  const [validationNotice, setValidationNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const discoveredItems = evidence.filter(e => discoveredEvidence.includes(e.id));

  const handleAccuse = () => {
    if (!selectedSuspectId) {
      setValidationNotice('Please select the prime suspect you are indicting before submitting.');
      return;
    }
    setValidationNotice(null);
    sound.playAccusationGong();
    onSubmitAccusation(selectedSuspectId, undefined, selectedEvidenceId || undefined);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '28px',
          position: 'relative',
          border: '2px solid #ef4444',
          boxShadow: '0 0 40px rgba(239, 68, 68, 0.4), 0 20px 50px rgba(0,0,0,0.9)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => { sound.playClick(); onClose(); }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="stamp-classified">OFFICIAL ACCUSATION TERMINAL</span>
          <span className="mono" style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>
            {attemptsLeft} ATTEMPT(S) REMAINING
          </span>
        </div>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
          INDICT THE CULPRIT
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.5' }}>
          Review the evidence and select the perpetrator. An incorrect accusation carries a <strong style={{ color: '#ef4444' }}>-250 point penalty</strong> and consumes one investigation attempt.
        </p>

        {/* Step 1: Suspect Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontWeight: 700 }}>
            STEP 1: SELECT PRIMARY PERPETRATOR:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            {suspects.map(suspect => {
              const isSelected = selectedSuspectId === suspect.id;
              return (
                <div
                  key={suspect.id}
                  onClick={() => { sound.playClick(); setSelectedSuspectId(suspect.id); }}
                  style={{
                    background: isSelected ? 'rgba(230, 57, 70, 0.25)' : 'rgba(10, 12, 16, 0.6)',
                    border: isSelected ? '2px solid var(--accent-red)' : '1px solid #2a3349',
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 0 15px rgba(230, 57, 70, 0.4)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '4px' }}>{suspect.avatar}</div>
                  <h4 style={{ color: isSelected ? '#fff' : 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700 }}>
                    {suspect.name}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {suspect.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Supporting Evidence */}
        <div style={{ marginBottom: '24px' }}>
          <label className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontWeight: 700 }}>
            STEP 2: PRIMARY INCRIMINATING EVIDENCE:
          </label>
          <select
            value={selectedEvidenceId}
            onChange={(e) => setSelectedEvidenceId(e.target.value)}
            style={{
              width: '100%',
              background: '#0a0c10',
              border: '1px solid var(--border-color)',
              color: '#fff',
              padding: '10px 12px',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem'
            }}
          >
            <option value="">-- Choose Key Incriminating Exhibit --</option>
            {discoveredItems.map(ev => (
              <option key={ev.id} value={ev.id}>
                [{ev.category}] {ev.title} ({ev.timestamp})
              </option>
            ))}
          </select>
        </div>

        {validationNotice && (
          <div style={{ marginBottom: '16px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '8px 12px', borderRadius: '4px', fontSize: '0.85rem', textAlign: 'center' }}>
            ⚠️ {validationNotice}
          </div>
        )}

        {/* Accuse Action */}
        <button
          onClick={handleAccuse}
          disabled={!selectedSuspectId}
          className="btn-primary"
          style={{
            width: '100%',
            justifyContent: 'center',
            padding: '14px',
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
            borderColor: '#ef4444'
          }}
        >
          <AlertOctagon size={20} /> SUBMIT FINAL INDICTMENT <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
