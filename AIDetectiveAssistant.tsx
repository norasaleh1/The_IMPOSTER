import React, { useState } from 'react';
import { BrainCircuit, Send, Sparkles, ShieldCheck, X, AlertTriangle, MessageSquare } from 'lucide-react';
import { sound } from '../services/audio';

interface AIDetectiveAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  aiConsultations: number;
  onConsultAI: (question: string) => Promise<{ reply: string; source: string }>;
}

export const AIDetectiveAssistant: React.FC<AIDetectiveAssistantProps> = ({
  isOpen,
  onClose,
  aiConsultations,
  onConsultAI
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'USER' | 'AI'; text: string; source?: string }>>([
    {
      sender: 'AI',
      text: `Greetings, Detective. I am **AIDEN**, your confidential AI Investigative Partner powered by Gemini.

I can cross-reference your discovered evidence, analyze timeline gaps, and point out logical contradictions in suspect statements without directly spoiling the culprit.

How can I assist your investigation?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (qText?: string) => {
    const query = qText || inputValue;
    if (!query.trim() || loading) return;

    sound.playClick();
    setMessages(prev => [...prev, { sender: 'USER', text: query.trim() }]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await onConsultAI(query.trim());
      sound.playClue();
      setMessages(prev => [...prev, { sender: 'AI', text: response.reply, source: response.source }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { sender: 'AI', text: `⚠️ AI Tactical Link Offline: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'What evidence items should I cross-reference next?',
    'Is there an alibi contradiction in the timestamps?',
    'Which suspect has the most suspicious timeline gap?'
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '680px',
          height: '620px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: '24px',
          border: '1px solid var(--accent-cyan)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.85), 0 0 20px rgba(6, 182, 212, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #2a3349' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.4)' }}>
              <BrainCircuit size={22} color="var(--accent-cyan)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>AIDEN • AI DETECTIVE</h3>
                <span className="stamp-classified" style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)', fontSize: '0.65rem' }}>
                  GEMINI SECURE
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Consultations: <strong>{aiConsultations}</strong> (Score penalty: -40 pts each)
              </p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Guardrail Disclaimer Banner */}
        <div style={{
          background: 'rgba(6, 182, 212, 0.08)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          padding: '8px 12px',
          borderRadius: '4px',
          margin: '12px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.78rem',
          color: 'var(--accent-cyan)'
        }}>
          <ShieldCheck size={16} />
          <span>Spoiler-Free Protocol: AI will guide logic without revealing the culprit.</span>
        </div>

        {/* Message Stream */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          paddingRight: '6px',
          marginBottom: '14px'
        }}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: m.sender === 'USER' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: m.sender === 'USER'
                  ? 'linear-gradient(135deg, rgba(230, 57, 70, 0.3) 0%, rgba(185, 28, 28, 0.3) 100%)'
                  : 'rgba(18, 22, 32, 0.95)',
                border: m.sender === 'USER' ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid #2a3349',
                borderLeft: m.sender === 'AI' ? '3px solid var(--accent-cyan)' : undefined,
                padding: '12px 16px',
                borderRadius: m.sender === 'USER' ? '8px 8px 0 8px' : '0 8px 8px 8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span className="mono" style={{ fontSize: '0.72rem', color: m.sender === 'USER' ? 'var(--accent-red)' : 'var(--accent-cyan)', fontWeight: 700 }}>
                  {m.sender === 'USER' ? 'DETECTIVE' : 'AIDEN NEURAL COGNITION'}
                </span>
                {m.source && (
                  <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    [{m.source.toUpperCase()}]
                  </span>
                )}
              </div>
              <div style={{ color: '#f1f5f9', fontSize: '0.88rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ alignSelf: 'flex-start', background: 'rgba(18, 22, 32, 0.8)', padding: '10px 16px', borderRadius: '6px', color: 'var(--accent-cyan)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} className="pulse-red" />
              <span>Cross-referencing forensic data with Gemini...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '8px' }}>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              disabled={loading}
              style={{
                background: 'rgba(10, 12, 16, 0.7)',
                border: '1px solid #2a3349',
                color: 'var(--text-secondary)',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '0.74rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              💡 {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            placeholder="Ask AI Detective a question about discovered clues..."
            disabled={loading}
            style={{
              flex: 1,
              background: '#0a0c10',
              border: '1px solid var(--border-color)',
              color: '#fff',
              padding: '10px 14px',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem'
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !inputValue.trim()}
            className="btn-primary"
            style={{ background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)', borderColor: '#06b6d4' }}
          >
            <Send size={16} /> Consult
          </button>
        </div>
      </div>
    </div>
  );
};
