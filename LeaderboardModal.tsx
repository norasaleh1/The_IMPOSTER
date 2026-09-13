import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';
import { fetchLeaderboard } from '../services/api';
import { Trophy, Medal, X, Shield, Clock, Search, Filter } from 'lucide-react';
import { sound } from '../services/audio';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [caseFilter, setCaseFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadLeaderboard(caseFilter);
    }
  }, [isOpen, caseFilter]);

  const loadLeaderboard = async (cId: string) => {
    setLoading(true);
    try {
      const data = await fetchLeaderboard(cId || undefined);
      setEntries(data);
    } catch (e) {
      console.error('Failed to load leaderboard:', e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const filteredEntries = entries.filter(e =>
    e.player_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins}m ${remaining}s`;
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return <span style={{ color: '#fbbf24', fontWeight: 800 }}>🥇 #1</span>;
    if (index === 1) return <span style={{ color: '#cbd5e1', fontWeight: 800 }}>🥈 #2</span>;
    if (index === 2) return <span style={{ color: '#d97706', fontWeight: 800 }}>🥉 #3</span>;
    return <span className="mono" style={{ color: 'var(--text-muted)' }}>#{index + 1}</span>;
  };

  const getCaseLabel = (cId: string) => {
    switch (cId) {
      case 'case-01': return 'Case #01';
      case 'case-02': return 'Case #02';
      case 'case-03': return 'Case #03';
      default: return cId;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: '28px',
          border: '1px solid #334155',
          boxShadow: '0 20px 60px rgba(0,0,0,0.9)'
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <Trophy size={26} color="var(--accent-amber)" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
                HALL OF FAME LEADERBOARD
              </h2>
              <span className="stamp-classified" style={{ borderColor: 'var(--accent-amber)', color: 'var(--accent-amber)' }}>
                GLOBAL SCORES
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Top-ranked forensic investigators and solved case clearance times.
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search investigator by name..."
              style={{
                width: '100%',
                background: '#0a0c10',
                border: '1px solid var(--border-color)',
                color: '#fff',
                padding: '8px 12px 8px 36px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { id: '', label: 'All Cases' },
              { id: 'case-01', label: 'Case #01' },
              { id: 'case-02', label: 'Case #02' },
              { id: 'case-03', label: 'Case #03' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { sound.playClick(); setCaseFilter(tab.id); }}
                style={{
                  background: caseFilter === tab.id ? 'var(--accent-amber)' : 'rgba(30, 41, 59, 0.6)',
                  color: caseFilter === tab.id ? '#000' : 'var(--text-secondary)',
                  border: '1px solid #334155',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  fontWeight: caseFilter === tab.id ? 800 : 500,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #2a3349', borderRadius: '6px', background: 'rgba(10, 12, 16, 0.6)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'rgba(30, 41, 59, 0.5)', borderBottom: '1px solid #2a3349' }}>
                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>POS</th>
                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>INVESTIGATOR</th>
                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>CASE</th>
                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>RANK</th>
                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>TIME</th>
                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textAlign: 'right' }}>SCORE</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No investigation records found.
                  </td>
                </tr>
              ) : (
                filteredEntries.map((item, idx) => (
                  <tr
                    key={item.id || idx}
                    style={{
                      borderBottom: '1px solid rgba(42, 51, 73, 0.4)',
                      background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'
                    }}
                  >
                    <td style={{ padding: '12px 16px' }}>{getRankBadge(idx)}</td>
                    <td style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>{item.player_name}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--accent-red)' }}>
                        {getCaseLabel(item.case_id)}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--accent-cyan)', fontSize: '0.8rem' }}>
                      {item.rank}
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      {formatDuration(item.duration_seconds)}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <span className="mono" style={{ fontWeight: 800, color: 'var(--accent-amber)', fontSize: '0.95rem' }}>
                        {item.score}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
