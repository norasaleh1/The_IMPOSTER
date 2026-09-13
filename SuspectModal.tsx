import React from 'react';
import { Suspect } from '../types';
import { X, Shield, Key, MapPin, FileText, MessageSquare } from 'lucide-react';
import { sound } from '../services/audio';

interface SuspectModalProps {
  suspect: Suspect | null;
  onClose: () => void;
  onInterrogate: (suspectId: string) => void;
}

export const SuspectModal: React.FC<SuspectModalProps> = ({
  suspect,
  onClose,
  onInterrogate
}) => {
  if (!suspect) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '28px',
          position: 'relative',
          border: '1px solid #3b4252',
          boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{ fontSize: '3rem', background: 'rgba(255,255,255,0.06)', padding: '12px', borderRadius: '12px' }}>
            {suspect.avatar}
          </div>
          <div>
            <span className="stamp-classified">PERSONNEL FILE</span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              {suspect.name}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {suspect.role} • <span style={{ color: 'var(--accent-red)' }}>{suspect.department}</span>
            </p>
          </div>
        </div>

        {/* Access Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '20px',
          background: 'rgba(10, 12, 16, 0.6)',
          padding: '14px',
          borderRadius: '6px',
          border: '1px solid #1e2638'
        }}>
          <div>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SECURITY CLEARANCE:</span>
            <p style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{suspect.clearance}</p>
          </div>
          <div>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ACCESS PERMISSIONS:</span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{suspect.accessInfo}</p>
          </div>
        </div>

        {/* Known Activities */}
        <div style={{ marginBottom: '20px' }}>
          <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            KNOWN SURVEILLANCE & MOVEMENTS:
          </span>
          <p style={{ color: '#e2e8f0', fontSize: '0.9rem', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '6px', borderLeft: '3px solid var(--accent-cyan)' }}>
            {suspect.knownActivities}
          </p>
        </div>

        {/* Official Statement */}
        <div style={{ marginBottom: '24px' }}>
          <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            RECORDED INTERVIEW STATEMENT:
          </span>
          <p style={{ color: '#f87171', fontSize: '0.9rem', fontStyle: 'italic', background: 'rgba(239, 68, 68, 0.08)', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #ef4444' }}>
            "{suspect.statement}"
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
            onInterrogate(suspect.id);
          }}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
        >
          <MessageSquare size={16} /> Open Interrogation Terminal
        </button>
      </div>
    </div>
  );
};
