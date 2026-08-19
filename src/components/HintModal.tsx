import React from 'react';
import { X, Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HintModalProps {
  isOpen: boolean;
  hintUsed: boolean;
  onClose: () => void;
  onConfirmHint: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  hintUsed,
  onClose,
  onConfirmHint,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="hint-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="hint-modal"
        className="relative w-full max-w-md bg-neutral-900 border-2 border-red-900/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-neutral-100 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-950/60 border border-red-800/80 text-red-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="hint-modal-title"
                className="text-xl font-bold font-cinzel text-neutral-100"
              >
                DETECTIVE HINT
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                {hintUsed ? 'Hint already revealed' : 'Agency intelligence advisory'}
              </p>
            </div>
          </div>

          <button
            id="close-hint-modal-btn"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {hintUsed ? (
          /* Hint Display When Already Unlocked */
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-black/80 border border-amber-500/40 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Classified Hint:</span>
              </div>
              <p
                id="revealed-hint-text"
                className="text-base sm:text-lg font-typewriter text-amber-200 leading-relaxed italic"
              >
                “Compare the suspects’ timelines with the access records.”
              </p>
            </div>

            <p className="text-xs font-mono text-neutral-400 text-center">
              (This hint cost 100 points from your total investigation score.)
            </p>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 font-mono text-xs font-bold text-neutral-200 cursor-pointer transition-colors"
            >
              Close Advisory
            </button>
          </div>
        ) : (
          /* Confirmation Before Unlocking Hint */
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/60 text-xs font-mono text-red-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Penalty Warning</span>
              </div>
              <p>
                Requesting a tactical hint will deduct <strong className="text-red-400 font-bold">100 points</strong> from your final investigation score and may lower your Detective Rank.
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="w-1/2 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono text-xs font-semibold cursor-pointer transition-colors"
              >
                Cancel
              </button>

              <button
                id="confirm-reveal-hint-btn"
                onClick={() => {
                  soundManager.playHint();
                  onConfirmHint();
                }}
                className="w-1/2 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-mono font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-red-900/50 transition-all"
              >
                Reveal Hint (-100 pts)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
