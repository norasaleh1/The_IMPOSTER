import React, { useState } from 'react';
import { EvidenceItem } from '../types';
import { Lock, FileSearch, Eye, ShieldAlert, Key, Server, Receipt, Briefcase, Search, Cpu, Wifi, Video, LogOut, CreditCard, FlaskConical, DoorOpen, Wine, FileSpreadsheet, FileWarning, Fingerprint } from 'lucide-react';
import { sound } from '../services/audio';

interface EvidenceLockerProps {
  evidence: EvidenceItem[];
  discoveredEvidence: string[];
  onInspectEvidence: (evidence: EvidenceItem) => void;
}

export const EvidenceLocker: React.FC<EvidenceLockerProps> = ({
  evidence,
  discoveredEvidence,
  onInspectEvidence
}) => {
  const [filter, setFilter] = useState<'ALL' | 'DIGITAL' | 'PHYSICAL' | 'FORENSIC'>('ALL');

  const filtered = evidence.filter(ev => {
    if (filter === 'ALL') return true;
    return ev.category.toUpperCase() === filter;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Key': return <Key size={20} color="var(--accent-amber)" />;
      case 'Server': return <Server size={20} color="var(--accent-cyan)" />;
      case 'Receipt': return <Receipt size={20} color="#10b981" />;
      case 'Briefcase': return <Briefcase size={20} color="var(--accent-amber)" />;
      case 'Search': return <Search size={20} color="var(--accent-red)" />;
      case 'Cpu': return <Cpu size={20} color="var(--accent-cyan)" />;
      case 'Wifi': return <Wifi size={20} color="var(--accent-cyan)" />;
      case 'Video': return <Video size={20} color="var(--accent-amber)" />;
      case 'LogOut': return <LogOut size={20} color="#94a3b8" />;
      case 'CreditCard': return <CreditCard size={20} color="#10b981" />;
      case 'FlaskConical': return <FlaskConical size={20} color="var(--accent-red)" />;
      case 'DoorOpen': return <DoorOpen size={20} color="var(--accent-amber)" />;
      case 'Wine': return <Wine size={20} color="var(--accent-red)" />;
      case 'FileSpreadsheet': return <FileSpreadsheet size={20} color="#10b981" />;
      case 'FileWarning': return <FileWarning size={20} color="var(--accent-red)" />;
      case 'Fingerprint': return <Fingerprint size={20} color="var(--accent-cyan)" />;
      default: return <FileSearch size={20} color="var(--accent-red)" />;
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="stamp-classified">CHAIN OF CUSTODY</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
            EVIDENCE LOCKER & FORENSICS
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Cataloged physical items, access logs, network records, and surveillance tapes.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(10, 12, 16, 0.6)', padding: '4px', borderRadius: '6px', border: '1px solid #2a3349' }}>
          {['ALL', 'DIGITAL', 'PHYSICAL', 'FORENSIC'].map((f) => (
            <button
              key={f}
              onClick={() => { sound.playClick(); setFilter(f as any); }}
              style={{
                background: filter === f ? 'var(--accent-red)' : 'transparent',
                color: filter === f ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '0.78rem',
                fontWeight: filter === f ? 700 : 500,
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {filtered.map((item) => {
          const isDiscovered = discoveredEvidence.includes(item.id);

          if (!isDiscovered) {
            // LOCKED EVIDENCE CARD
            return (
              <div
                key={item.id}
                className="glass-panel"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  background: 'rgba(15, 18, 26, 0.5)',
                  border: '1px dashed #334155',
                  minHeight: '220px'
                }}
              >
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '50%', marginBottom: '12px' }}>
                  <Lock size={28} color="#64748b" />
                </div>
                <h4 style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>
                  CLASSIFIED EVIDENCE [RESTRICTED]
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', maxWidth: '280px', lineHeight: '1.4' }}>
                  🔒 {item.unlockRequirement || 'Interrogate suspects or connect related clues to unlock.'}
                </p>
              </div>
            );
          }

          // DISCOVERED EVIDENCE CARD
          return (
            <div
              key={item.id}
              onClick={() => { sound.playClick(); onInspectEvidence(item); }}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                borderLeft: item.isCritical ? '4px solid var(--accent-red)' : '4px solid #3b82f6',
                position: 'relative'
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.06)', padding: '8px', borderRadius: '6px' }}>
                      {getIcon(item.icon)}
                    </div>
                    <div>
                      <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {item.type.toUpperCase()} • {item.category}
                      </span>
                      <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700 }}>
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {item.isCritical && (
                    <span className="stamp-classified" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                      CRITICAL
                    </span>
                  )}
                </div>

                {/* Summary */}
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: '1.5', marginBottom: '14px' }}>
                  {item.summary}
                </p>
              </div>

              {/* Timestamp & Inspect trigger */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255,255,255,0.06)'
              }}>
                <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  ⏰ {item.timestamp}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <Eye size={14} /> Inspect Full File
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
