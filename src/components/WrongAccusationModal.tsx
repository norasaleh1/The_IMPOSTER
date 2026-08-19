import React from 'react';
import { AlertOctagon, X, ShieldAlert, RotateCcw } from 'lucide-react';
import { Suspect } from '../types';
import { soundManager } from '../utils/audio';

interface WrongAccusationModalProps {
  suspect: Suspect | null;
  isOpen: boolean;
  attemptsRemaining: number;
  onClose: () => void;
}

export const WrongAccusationModal: React.FC<WrongAccusationModalProps> = ({
  suspect,
  isOpen,
  attemptsRemaining,
  onClose,
}) => {
  if (!isOpen || !suspect) return null;

  return (
    <div
      id="wrong-accusation-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="wrong-accusation-modal"
        className="relative w-full max-w-md bg-neutral-900 border-2 border-red-600 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(239,68,68,0.5)] text-neutral-100 space-y-6 text-center animate-red-warning"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Warning Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-red-950/80 border-2 border-red-500 flex items-center justify-center text-red-500 shadow-lg shadow-red-900/60">
          <AlertOctagon className="w-9 h-9 animate-pulse" />
        </div>

        {/* Accusation Outcome Heading */}
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
            WARING // FAILED HYPOTHESIS
          </span>
          <h2
            id="wrong-accusation-title"
            className="text-2xl sm:text-3xl font-black font-cinzel text-red-500 tracking-wider"
          >
            WRONG ACCUSATION
          </h2>
        </div>

        {/* Exact Specification Description */}
        <div className="p-4 rounded-xl bg-black/80 border border-red-950/90 text-sm sm:text-base font-mono text-neutral-200 leading-relaxed">
          <p id="wrong-accusation-reason" className="font-semibold text-red-200">
            The evidence does not contradict this suspect’s statement.
          </p>
          <p className="text-xs text-neutral-400 mt-2">
            <strong className="text-neutral-200">{suspect.name}</strong>’s alibi aligns with the documented logs.
          </p>
        </div>

        {/* Attempt & Score Penalty Notice */}
        <div className="flex items-center justify-around p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono">
          <div>
            <span className="text-neutral-500 block">PENALTY:</span>
            <span className="text-red-400 font-bold">-200 PTS</span>
          </div>
          <div className="h-6 w-px bg-neutral-800" />
          <div>
            <span className="text-neutral-500 block">ATTEMPTS LEFT:</span>
            <span className={`font-bold ${attemptsRemaining <= 1 ? 'text-red-500 font-black' : 'text-amber-400'}`}>
              {attemptsRemaining} / 3
            </span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          id="dismiss-wrong-accusation-btn"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="w-full py-3.5 px-6 rounded-xl bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-mono font-bold text-xs uppercase tracking-widest cursor-pointer shadow-lg shadow-red-900/60 transition-all"
        >
          {attemptsRemaining > 0 ? 'CONTINUE INVESTIGATION' : 'VIEW FINAL REPORT'}
        </button>
      </div>
    </div>
  );
};
