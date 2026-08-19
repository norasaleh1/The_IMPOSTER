import React, { useState } from 'react';
import { X, BookOpen, Trash2, Check, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NotesModalProps {
  notes: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveNotes: (notes: string) => void;
}

export const NotesModal: React.FC<NotesModalProps> = ({
  notes,
  isOpen,
  onClose,
  onSaveNotes,
}) => {
  const [localNotes, setLocalNotes] = useState(notes);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNotes(e.target.value);
    soundManager.playTypewriter();
  };

  const handleSave = () => {
    soundManager.playClick();
    onSaveNotes(localNotes);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  };

  const handleClear = () => {
    soundManager.playClick();
    setLocalNotes('');
    onSaveNotes('');
  };

  const handleInsertTemplate = (template: string) => {
    soundManager.playClick();
    const updated = localNotes ? `${localNotes}\n\n${template}` : template;
    setLocalNotes(updated);
    onSaveNotes(updated);
  };

  return (
    <div
      id="investigation-notes-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="investigation-notes-modal"
        className="relative w-full max-w-xl bg-neutral-900 border-2 border-amber-800/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-neutral-100 space-y-5 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="notes-modal-title"
                className="text-xl font-bold font-cinzel text-neutral-100"
              >
                INVESTIGATION NOTES
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                Classified detective field scratchpad & timeline deductions
              </p>
            </div>
          </div>

          <button
            id="close-notes-modal-btn"
            onClick={() => {
              handleSave();
              onClose();
            }}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Helper Chips */}
        <div className="flex flex-wrap gap-2 text-[11px] font-mono">
          <span className="text-neutral-500 py-1">Quick Prompts:</span>
          <button
            onClick={() => handleInsertTemplate('• Timeline 9:00 PM: Stolen File')}
            className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
          >
            + 9:00 PM Theft
          </button>
          <button
            onClick={() => handleInsertTemplate('• Check Alex Carter keycard vs 8:30 PM statement')}
            className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
          >
            + Check Alex
          </button>
          <button
            onClick={() => handleInsertTemplate('• Alibi confirmed: Maya (Video Call), Daniel (CCTV Lobby), Sophia (Design Lab)')}
            className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
          >
            + Alibis
          </button>
        </div>

        {/* Text Area */}
        <div className="space-y-1.5">
          <textarea
            id="investigation-notes-textarea"
            rows={8}
            value={localNotes}
            onChange={handleChange}
            placeholder="Type your detective notes, suspect cross-examinations, and alibi timestamps here..."
            className="w-full p-4 rounded-xl bg-black/80 border border-neutral-700 focus:border-amber-500 font-typewriter text-amber-100/90 text-sm placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed shadow-inner"
          />
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
          <button
            id="clear-notes-btn"
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-red-400 font-mono text-xs cursor-pointer transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Notes</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              id="save-notes-btn"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-mono font-bold text-xs cursor-pointer shadow-md transition-all"
            >
              {isSaved ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{isSaved ? 'Saved!' : 'Save & Keep Open'}</span>
            </button>
            <button
              onClick={() => {
                handleSave();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-xs font-semibold cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
