import React, { useState, useEffect } from 'react';
import { FileEdit, Save, CheckCircle2, BookmarkPlus } from 'lucide-react';
import { sound } from '../services/audio';

interface InvestigatorNotesProps {
  notes: string;
  onSaveNotes: (text: string) => void;
}

export const InvestigatorNotes: React.FC<InvestigatorNotesProps> = ({
  notes,
  onSaveNotes
}) => {
  const [text, setText] = useState(notes || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setText(notes || '');
  }, [notes]);

  const handleSave = () => {
    sound.playClick();
    onSaveNotes(text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addTag = (tag: string) => {
    sound.playClick();
    setText(prev => (prev ? prev + '\n' + tag : tag));
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="stamp-classified">OFFICIAL LOGBOOK</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
            INVESTIGATOR SCRATCHPAD
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Record personal suspicions, timestamp comparisons, and deductive hypotheses. Notes are persisted in the case database.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          {saved ? 'Notes Saved ✓' : 'Save Notes'}
        </button>
      </div>

      {/* Quick Tag Insertors */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
        <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <BookmarkPlus size={14} /> Quick Tags:
        </span>
        {[
          '⚡ [CONTRADICTION FOUND]: ',
          '⏰ [TIMESTAMP CONFLICT]: ',
          '🎯 [PRIME SUSPECT MOTIVE]: ',
          '✅ [ALIBI CONFIRMED]: '
        ].map(tag => (
          <button
            key={tag}
            onClick={() => addTag(tag)}
            className="btn-secondary"
            style={{ padding: '4px 8px', fontSize: '0.75rem' }}
          >
            {tag.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your investigation deductions, cross-references, and alibi checks here..."
          rows={14}
          style={{
            width: '100%',
            background: '#0a0c10',
            border: '1px solid var(--border-color)',
            color: '#f1f5f9',
            padding: '16px',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            resize: 'vertical'
          }}
        />
      </div>
    </div>
  );
};
