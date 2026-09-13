import React from 'react';
import { EvidenceItem } from '../types';
import { X, ShieldAlert, Clock, Tag, FileText, CheckCircle } from 'lucide-react';
import { sound } from '../services/audio';

interface EvidenceModalProps {
  evidence: EvidenceItem | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  evidence,
  onClose
}) => {
  if (!evidence) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '640px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="stamp-classified">OFFICIAL EXHIBIT FILE</span>
          {evidence.isCritical && (
            <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
              CRITICAL LEAD
            </span>
          )}
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
          {evidence.title}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '18px' }}>
          Category: <strong>{evidence.category}</strong> • Exhibit Type: <strong>{evidence.type}</strong>
        </p>

        {/* Timestamp & Metadata Box */}
        <div style={{
          background: 'rgba(10, 12, 16, 0.7)',
          border: '1px solid #1e2638',
          padding: '14px',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color="var(--accent-cyan)" />
            <span className="mono" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              TIMESTAMP: <strong>{evidence.timestamp}</strong>
            </span>
          </div>
          <span className="mono" style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={14} /> CHAIN VERIFIED
          </span>
        </div>

        {/* Summary */}
        <div style={{ marginBottom: '16px' }}>
          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
            EXHIBIT SUMMARY:
          </span>
          <p style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: '1.5' }}>
            {evidence.summary}
          </p>
        </div>

        {/* Deep Details / Technical Forensics */}
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          borderLeft: '3px solid var(--accent-red)',
          padding: '14px',
          borderRadius: '0 6px 6px 0',
          marginBottom: '24px'
        }}>
          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-red)', display: 'block', marginBottom: '4px', fontWeight: 700 }}>
            FORENSIC BREAKDOWN & RAW LOGS:
          </span>
          <p className="mono" style={{ color: '#f1f5f9', fontSize: '0.86rem', lineHeight: '1.6' }}>
            {evidence.details}
          </p>
        </div>

        {/* Footer Close */}
        <button
          onClick={() => { sound.playClick(); onClose(); }}
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
        >
          Return to Locker
        </button>
      </div>
    </div>
  );
};
