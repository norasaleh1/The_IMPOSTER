import React, { useState } from 'react';
import { CaseSummary } from '../types';
import { FolderLock, ShieldAlert, Clock, Users, FileSearch, ArrowRight, UserCheck } from 'lucide-react';
import { sound } from '../services/audio';

interface CaseArchiveProps {
  cases: CaseSummary[];
  playerName: string;
  onSetPlayerName: (name: string) => void;
  onSelectCase: (caseId: string) => void;
}

export const CaseArchive: React.FC<CaseArchiveProps> = ({
  cases,
  playerName,
  onSetPlayerName,
  onSelectCase
}) => {
  const [tempName, setTempName] = useState(playerName || 'Agent Miller');
  const [nameSaved, setNameSaved] = useState(false);
  const [nameWarning, setNameWarning] = useState<string | null>(null);

  const handleStart = (caseId: string) => {
    if (!tempName.trim()) {
      setNameWarning('Please enter your detective badge name before accessing case files.');
      return;
    }
    setNameWarning(null);
    onSetPlayerName(tempName.trim());
    sound.playClick();
    onSelectCase(caseId);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Normal': return '#10b981';
      case 'Hard': return '#f59e0b';
      case 'Expert': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Dossier Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span className="stamp-classified">CENTRAL INTELLIGENCE ARCHIVE</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
          <img
            src="/logo.png"
            alt="The Impostor Detective Logo"
            style={{
              width: '210px',
              height: '210px',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: '8px' }}>
          CONFIDENTIAL CASE FILES
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
          Welcome, Investigator. Select an active incident file to commence forensic examination, suspect interrogation, and contradiction analysis.
        </p>
      </div>

      {/* Detective Name Identification Panel */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <UserCheck size={20} color="var(--accent-red)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>INVESTIGATOR CREDENTIALS</h3>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Enter Detective / Agent Name..."
            style={{
              flex: 1,
              background: '#0a0c10',
              border: '1px solid var(--border-color)',
              color: '#fff',
              padding: '10px 14px',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem'
            }}
          />
          <button
            onClick={() => {
              if (tempName.trim()) {
                onSetPlayerName(tempName.trim());
                setNameSaved(true);
                setNameWarning(null);
                sound.playClick();
                setTimeout(() => setNameSaved(false), 2000);
              }
            }}
            className="btn-secondary"
          >
            {nameSaved ? 'Badge Saved ✓' : 'Register Badge'}
          </button>
        </div>

        {nameWarning && (
          <div style={{ marginTop: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '8px 12px', borderRadius: '4px', fontSize: '0.82rem', textAlign: 'center' }}>
            ⚠️ {nameWarning}
          </div>
        )}
      </div>

      {/* Case Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {cases.map((c) => (
          <div
            key={c.id}
            className="glass-panel glass-panel-hover"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Red accent strip */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #e63946 0%, #ef4444 100%)'
            }} />

            <div>
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span className="mono" style={{
                  color: 'var(--accent-red)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em'
                }}>
                  {c.caseNumber}
                </span>
                <span style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: `1px solid ${getDifficultyColor(c.difficulty)}`,
                  color: getDifficultyColor(c.difficulty),
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)'
                }}>
                  {c.difficulty.toUpperCase()}
                </span>
              </div>

              {/* Title & Location */}
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                {c.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📍</span> {c.location}
              </p>

              {/* Briefing summary */}
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
                {c.briefing.summary}
              </p>

              {/* Metadata counters */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                background: 'rgba(10, 12, 16, 0.6)',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '20px',
                border: '1px solid #1e2638'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Users size={16} color="var(--accent-cyan)" />
                  <span><strong>{c.suspectCount}</strong> Suspects</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <FileSearch size={16} color="var(--accent-amber)" />
                  <span><strong>{c.evidenceCount}</strong> Evidence Items</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Clock size={16} color="#94a3b8" />
                  <span><strong>{c.timeOfIncident}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <ShieldAlert size={16} color="var(--accent-red)" />
                  <span>Est: {c.estimatedTime}</span>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <button
              onClick={() => handleStart(c.id)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              <FolderLock size={18} /> OPEN CASE DOSSIER <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
