import React, { useState } from 'react';
import { Suspect, EvidenceItem, BoardConnection } from '../types';
import { GitCommit, Plus, CheckCircle, AlertTriangle, Link2, Sparkles, X } from 'lucide-react';
import { sound } from '../services/audio';

interface InvestigationBoardProps {
  suspects: Suspect[];
  evidence: EvidenceItem[];
  discoveredEvidence: string[];
  connections: BoardConnection[];
  onAddConnection: (itemA: string, itemB: string, type: string, customExplanation: string) => void;
}

export const InvestigationBoard: React.FC<InvestigationBoardProps> = ({
  suspects,
  evidence,
  discoveredEvidence,
  connections,
  onAddConnection
}) => {
  const [selectedA, setSelectedA] = useState<string>('');
  const [selectedB, setSelectedB] = useState<string>('');
  const [connType, setConnType] = useState<string>('Contradiction');
  const [customNote, setCustomNote] = useState<string>('');
  const [boardNotice, setBoardNotice] = useState<string | null>(null);

  const discoveredItems = evidence.filter(e => discoveredEvidence.includes(e.id));

  // Combine items for connection selector
  const connectableItems = [
    ...suspects.map(s => ({ id: s.id, label: `👤 Suspect: ${s.name} (${s.role})`, type: 'suspect' })),
    ...discoveredItems.map(e => ({ id: e.id, label: `📄 [${e.type}] ${e.title}`, type: 'evidence' }))
  ];

  const handleCreateConnection = () => {
    if (!selectedA || !selectedB) {
      setBoardNotice('Please select two distinct clues or suspects to link together on the board.');
      return;
    }
    if (selectedA === selectedB) {
      setBoardNotice('Cannot link an item to itself. Please select two different clues or suspects.');
      return;
    }

    setBoardNotice(null);
    sound.playContradiction();
    onAddConnection(selectedA, selectedB, connType, customNote.trim() || `${connType} link between clues`);
    setSelectedA('');
    setSelectedB('');
    setCustomNote('');
  };

  const getItemLabel = (id: string) => {
    const sus = suspects.find(s => s.id === id);
    if (sus) return `👤 ${sus.name}`;
    const ev = evidence.find(e => e.id === id);
    if (ev) return `📄 ${ev.title}`;
    return id;
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="stamp-classified">CORRELATION MATRIX</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
          INVESTIGATION BOARD & RED STRING CONNECTIONS
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Pin discovered clues, cross-examine statements, and classify contradictions to crack open the culprit's cover story.
        </p>
      </div>

      {/* Connection Builder Panel */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', border: '1px solid #334155' }}>
        <h3 className="mono" style={{ fontSize: '0.9rem', color: 'var(--accent-red)', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Link2 size={16} /> ESTABLISH NEW CLUE LINK
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '16px' }}>
          {/* Select Item A */}
          <div>
            <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              SOURCE ITEM (A):
            </label>
            <select
              value={selectedA}
              onChange={(e) => setSelectedA(e.target.value)}
              style={{
                width: '100%',
                background: '#0a0c10',
                border: '1px solid var(--border-color)',
                color: '#fff',
                padding: '8px 10px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}
            >
              <option value="">-- Choose Item A --</option>
              {connectableItems.map(item => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>

          {/* Select Item B */}
          <div>
            <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              TARGET ITEM (B):
            </label>
            <select
              value={selectedB}
              onChange={(e) => setSelectedB(e.target.value)}
              style={{
                width: '100%',
                background: '#0a0c10',
                border: '1px solid var(--border-color)',
                color: '#fff',
                padding: '8px 10px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}
            >
              <option value="">-- Choose Item B --</option>
              {connectableItems.map(item => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>

          {/* Classification Type */}
          <div>
            <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              LINK CLASSIFICATION:
            </label>
            <select
              value={connType}
              onChange={(e) => setConnType(e.target.value)}
              style={{
                width: '100%',
                background: '#0a0c10',
                border: '1px solid var(--border-color)',
                color: '#fff',
                padding: '8px 10px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}
            >
              <option value="Contradiction">⚡ Contradiction (+150 pts)</option>
              <option value="Alibi Disproved">❌ Alibi Disproved (+150 pts)</option>
              <option value="Corroboration">🔗 Corroborating Clue</option>
              <option value="Motive">🎯 Suspect Motive</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="Optional: Investigator hypothesis note..."
            style={{
              flex: 1,
              background: '#0a0c10',
              border: '1px solid var(--border-color)',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem'
            }}
          />
          <button
            onClick={handleCreateConnection}
            className="btn-primary"
            style={{ whiteSpace: 'nowrap' }}
          >
            <Plus size={16} /> Link on Board
          </button>
        </div>

        {boardNotice && (
          <div style={{ marginTop: '10px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '8px 12px', borderRadius: '4px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>⚠️ {boardNotice}</span>
            <button onClick={() => setBoardNotice(null)} style={{ background: 'transparent', border: 'none', color: '#fca5a5', cursor: 'pointer' }}>✕</button>
          </div>
        )}
      </div>

      {/* Board Area */}
      <div className="corkboard" style={{
        padding: '24px',
        borderRadius: '8px',
        border: '2px solid #2a3349',
        minHeight: '400px',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--accent-red)', fontWeight: 700, letterSpacing: '0.05em' }}>
            PINNED CONNECTIONS ({connections.length})
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            ⚡ Valid contradictions boost score by +150
          </span>
        </div>

        {connections.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <GitCommit size={36} style={{ margin: '0 auto 12px auto', opacity: 0.4 }} />
            <p style={{ fontSize: '0.95rem' }}>No connections linked yet on the Investigation Board.</p>
            <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Select two clues above and classify their relationship to register contradictions!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {connections.map((conn) => (
              <div
                key={conn.id}
                style={{
                  background: 'rgba(18, 22, 32, 0.92)',
                  border: conn.isValidContradiction ? '1px solid var(--accent-red)' : '1px solid #334155',
                  padding: '16px',
                  borderRadius: '6px',
                  boxShadow: conn.isValidContradiction ? '0 0 15px rgba(230, 57, 70, 0.25)' : '0 4px 12px rgba(0,0,0,0.5)',
                  position: 'relative'
                }}
              >
                {/* Red Pin icon */}
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '16px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: conn.isValidContradiction ? '#ef4444' : '#f59e0b',
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)'
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingTop: '4px' }}>
                  <span className="mono" style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: conn.isValidContradiction ? '#ef4444' : 'var(--accent-cyan)',
                    textTransform: 'uppercase'
                  }}>
                    {conn.type}
                  </span>
                  {conn.isValidContradiction && (
                    <span className="stamp-classified" style={{ fontSize: '0.65rem', padding: '1px 4px' }}>
                      VALID CONTRADICTION
                    </span>
                  )}
                </div>

                {/* Items Connected */}
                <div style={{ background: 'rgba(10, 12, 16, 0.7)', padding: '8px 10px', borderRadius: '4px', marginBottom: '10px', fontSize: '0.82rem', border: '1px solid #1e2638' }}>
                  <p style={{ color: '#fff', fontWeight: 600, marginBottom: '4px' }}>
                    {getItemLabel(conn.itemA)}
                  </p>
                  <p style={{ color: 'var(--accent-red)', fontSize: '0.75rem', fontWeight: 700, textAlign: 'center' }}>
                    ⚡ CONNECTED TO ⚡
                  </p>
                  <p style={{ color: '#fff', fontWeight: 600, marginTop: '4px' }}>
                    {getItemLabel(conn.itemB)}
                  </p>
                </div>

                {/* Explanation */}
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: '1.4' }}>
                  {conn.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
