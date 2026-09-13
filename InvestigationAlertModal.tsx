import React from 'react';
import { AlertOctagon, ShieldAlert, X, ArrowRight } from 'lucide-react';
import { sound } from '../services/audio';

interface InvestigationAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'WARNING' | 'ERROR' | 'INFO';
  attemptsLeft?: number;
}

export const InvestigationAlertModal: React.FC<InvestigationAlertModalProps> = ({
  isOpen,
  onClose,
  title = 'INVESTIGATION NOTICE',
  message,
  type = 'WARNING',
  attemptsLeft
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '28px',
          position: 'relative',
          border: '2px solid #ef4444',
          boxShadow: '0 0 35px rgba(239, 68, 68, 0.4), 0 20px 50px rgba(0,0,0,0.95)',
          textAlign: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close X */}
        <button
          onClick={() => { sound.playClick(); onClose(); }}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Pulsing Icon */}
        <div style={{
          display: 'inline-flex',
          background: 'rgba(239, 68, 68, 0.15)',
          padding: '16px',
          borderRadius: '50%',
          border: '2px solid rgba(239, 68, 68, 0.5)',
          marginBottom: '16px'
        }}>
          <AlertOctagon size={36} color="#ef4444" className="pulse-red" />
        </div>

        {/* Stamps & Header */}
        <div style={{ marginBottom: '8px' }}>
          <span className="stamp-classified" style={{ fontSize: '0.7rem', padding: '1px 6px' }}>
            CONFIDENTIAL NOTICE
          </span>
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
          {title}
        </h3>

        {/* Message Box */}
        <div style={{
          background: 'rgba(10, 12, 16, 0.8)',
          border: '1px solid #1e2638',
          borderLeft: '4px solid #ef4444',
          padding: '14px 16px',
          borderRadius: '6px',
          marginBottom: '20px',
          textAlign: 'left'
        }}>
          <p style={{ color: '#f1f5f9', fontSize: '0.92rem', lineHeight: '1.5' }}>
            {message}
          </p>
          {attemptsLeft !== undefined && (
            <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>REMAINING ATTEMPTS:</span>
              <span className="mono" style={{ fontSize: '0.85rem', color: attemptsLeft > 1 ? '#f59e0b' : '#ef4444', fontWeight: 800 }}>
                {attemptsLeft} / 3
              </span>
            </div>
          )}
        </div>

        {/* Acknowledge Button */}
        <button
          onClick={() => { sound.playClick(); onClose(); }}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}
        >
          ACKNOWLEDGE & RESUME INVESTIGATION <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
