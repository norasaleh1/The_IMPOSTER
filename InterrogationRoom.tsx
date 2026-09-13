import React, { useState } from 'react';
import { Suspect, InterrogationLog } from '../types';
import { MessageSquare, ShieldAlert, Sparkles, User, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { sound } from '../services/audio';

interface InterrogationRoomProps {
  suspects: Suspect[];
  activeSuspectId: string;
  onSelectSuspect: (suspectId: string) => void;
  unlockedQuestions: string[];
  interrogationLogs: InterrogationLog[];
  onAskQuestion: (suspectId: string, questionId: string, questionText: string, answerText: string) => void;
}

export const InterrogationRoom: React.FC<InterrogationRoomProps> = ({
  suspects,
  activeSuspectId,
  onSelectSuspect,
  unlockedQuestions,
  interrogationLogs,
  onAskQuestion
}) => {
  const currentSuspect = suspects.find(s => s.id === activeSuspectId) || suspects[0];

  const currentLogs = interrogationLogs.filter(log => log.suspectId === currentSuspect.id);

  // Available questions for this suspect
  const availableInitial = currentSuspect.initialQuestions || [];
  const availableUnlocked = (currentSuspect.unlockedQuestions || []).filter(uq =>
    unlockedQuestions.includes(uq.id)
  );

  const handleAsk = (qId: string, qText: string, aText: string) => {
    sound.playClick();
    onAskQuestion(currentSuspect.id, qId, qText, aText);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
      {/* Title */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="stamp-classified">SECURE INTERVIEW ROOM</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
          SUSPECT INTERROGATION CHAMBER
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Confront suspects with newly uncovered evidence to break their alibis and reveal hidden contradictions.
        </p>
      </div>

      {/* Main Grid: Suspect Switcher & Chat Room */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px', alignItems: 'start' }}>
        {/* Suspect Switcher List */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>
            SELECT SUBJECT ({suspects.length})
          </span>
          {suspects.map(s => {
            const isSelected = s.id === currentSuspect.id;
            const susLogs = interrogationLogs.filter(l => l.suspectId === s.id);
            return (
              <button
                key={s.id}
                onClick={() => { sound.playClick(); onSelectSuspect(s.id); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: isSelected ? 'rgba(230, 57, 70, 0.2)' : 'rgba(10, 12, 16, 0.6)',
                  border: isSelected ? '1px solid var(--accent-red)' : '1px solid #1e2638',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontSize: '1.6rem' }}>{s.avatar}</span>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ color: isSelected ? '#fff' : 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: isSelected ? 700 : 500, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {s.name}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    {susLogs.length} Questions Asked
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Interrogation Terminal */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '520px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #2a3349', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '2.5rem', background: 'rgba(255,255,255,0.06)', padding: '6px', borderRadius: '8px' }}>
                {currentSuspect.avatar}
              </div>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800 }}>{currentSuspect.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {currentSuspect.role} • <span style={{ color: 'var(--accent-red)' }}>{currentSuspect.department}</span>
                </p>
              </div>
            </div>

            <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              LIVE RECORDING ACTIVE
            </span>
          </div>

          {/* Chat Transcript Area */}
          <div style={{
            flex: 1,
            maxHeight: '340px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            paddingRight: '8px',
            marginBottom: '20px'
          }}>
            {/* Initial Statement Bubble */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.4)',
              borderLeft: '3px solid #64748b',
              padding: '12px 16px',
              borderRadius: '0 8px 8px 8px',
              maxWidth: '85%'
            }}>
              <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                INITIAL STATEMENT
              </span>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', fontStyle: 'italic' }}>
                "{currentSuspect.statement}"
              </p>
            </div>

            {/* Conversation Log */}
            {currentLogs.map((log, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Question (Detective) */}
                <div style={{
                  alignSelf: 'flex-end',
                  background: 'linear-gradient(135deg, rgba(230, 57, 70, 0.25) 0%, rgba(185, 28, 28, 0.25) 100%)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  padding: '10px 14px',
                  borderRadius: '8px 8px 0 8px',
                  maxWidth: '85%'
                }}>
                  <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--accent-red)', display: 'block', marginBottom: '2px', fontWeight: 700 }}>
                    YOU (INVESTIGATOR)
                  </span>
                  <p style={{ color: '#fff', fontSize: '0.9rem' }}>{log.question}</p>
                </div>

                {/* Answer (Suspect) */}
                <div style={{
                  alignSelf: 'flex-start',
                  background: 'rgba(18, 22, 32, 0.85)',
                  border: '1px solid #2a3349',
                  borderLeft: '3px solid var(--accent-cyan)',
                  padding: '12px 16px',
                  borderRadius: '0 8px 8px 8px',
                  maxWidth: '85%'
                }}>
                  <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', display: 'block', marginBottom: '2px', fontWeight: 700 }}>
                    {currentSuspect.name}
                  </span>
                  <p style={{ color: '#f1f5f9', fontSize: '0.9rem', lineHeight: '1.5' }}>{log.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interrogation Question Prompts */}
          <div style={{ borderTop: '1px solid #2a3349', paddingTop: '16px' }}>
            <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
              AVAILABLE INTERROGATION QUESTIONS:
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Initial Questions */}
              {availableInitial.map((q) => {
                const alreadyAsked = currentLogs.some(l => l.questionId === q.id);
                return (
                  <button
                    key={q.id}
                    disabled={alreadyAsked}
                    onClick={() => handleAsk(q.id, q.question, q.answer)}
                    style={{
                      background: alreadyAsked ? 'rgba(15, 23, 42, 0.4)' : 'rgba(30, 41, 59, 0.6)',
                      border: alreadyAsked ? '1px solid #1e293b' : '1px solid #334155',
                      color: alreadyAsked ? '#64748b' : '#f1f5f9',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      cursor: alreadyAsked ? 'default' : 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.88rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{q.question}</span>
                    {alreadyAsked ? (
                      <span className="mono" style={{ fontSize: '0.75rem', color: '#10b981' }}>Asked ✓</span>
                    ) : (
                      <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>Ask +30 pts</span>
                    )}
                  </button>
                );
              })}

              {/* Unlocked / Discovered Evidence Confrontations */}
              {availableUnlocked.map((uq) => {
                const alreadyAsked = currentLogs.some(l => l.questionId === uq.id);
                return (
                  <button
                    key={uq.id}
                    disabled={alreadyAsked}
                    onClick={() => handleAsk(uq.id, uq.question, uq.answer)}
                    style={{
                      background: alreadyAsked ? 'rgba(15, 23, 42, 0.4)' : 'rgba(230, 57, 70, 0.15)',
                      border: alreadyAsked ? '1px solid #1e293b' : '1px solid var(--accent-red)',
                      color: alreadyAsked ? '#64748b' : '#fff',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      cursor: alreadyAsked ? 'default' : 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.88rem',
                      boxShadow: alreadyAsked ? 'none' : '0 0 10px rgba(230, 57, 70, 0.2)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} color="var(--accent-red)" />
                      <span>{uq.question}</span>
                    </div>
                    {alreadyAsked ? (
                      <span className="mono" style={{ fontSize: '0.75rem', color: '#10b981' }}>Confronted ✓</span>
                    ) : (
                      <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                        CONFRONT +30 pts
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
