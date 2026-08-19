import React from 'react';
import { Skull, AlertOctagon, RotateCcw, ShieldX, FileWarning } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CaseFailedScreenProps {
  score: number;
  onTryAgain: () => void;
}

export const CaseFailedScreen: React.FC<CaseFailedScreenProps> = ({
  score,
  onTryAgain,
}) => {
  return (
    <div
      id="case-failed-screen"
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 corkboard-bg text-neutral-100 animate-fadeIn"
    >
      <div className="relative z-10 max-w-xl w-full mx-auto space-y-6 p-6 sm:p-10 rounded-2xl bg-neutral-900/95 border-2 border-red-700 shadow-[0_0_60px_rgba(239,68,68,0.4)] backdrop-blur-xl text-center">
        
        {/* Warning Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-red-950/80 border-2 border-red-500 flex items-center justify-center text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)]">
          <ShieldX className="w-10 h-10 animate-pulse" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <span className="classified-stamp text-xs">
            INVESTIGATION CLOSED // UNSOLVED
          </span>
          <h1
            id="case-failed-title"
            className="text-4xl sm:text-5xl font-black font-cinzel tracking-wider text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]"
          >
            CASE FAILED
          </h1>
        </div>

        {/* Required Subtitle by Specification */}
        <div className="p-5 rounded-2xl bg-black/80 border border-red-950/80 space-y-2">
          <p
            id="case-failed-message"
            className="text-xl sm:text-2xl font-bold font-cinzel text-neutral-200"
          >
            The thief escaped.
          </p>
          <p className="text-xs sm:text-sm font-mono text-neutral-400 leading-relaxed">
            You exhausted all 3 allowed accusation attempts. The perpetrator was tipped off by false arrests and successfully smuggled the confidential file out of the building.
          </p>
        </div>

        {/* Score Report */}
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono flex items-center justify-around">
          <div>
            <span className="text-neutral-500 block">FINAL SCORE:</span>
            <span className="text-red-400 font-extrabold text-base">{score} PTS</span>
          </div>
          <div className="h-6 w-px bg-neutral-800" />
          <div>
            <span className="text-neutral-500 block">INVESTIGATION STATUS:</span>
            <span className="text-neutral-300 font-bold">DISMISSED</span>
          </div>
        </div>

        {/* Try Again Button */}
        <div className="pt-2">
          <button
            id="try-again-btn"
            onClick={() => {
              soundManager.playStamp();
              onTryAgain();
            }}
            className="w-full group py-4 px-8 rounded-xl font-cinzel font-black text-lg uppercase tracking-widest text-white bg-gradient-to-r from-red-700 via-red-600 to-red-800 hover:from-red-600 hover:to-red-700 shadow-[0_0_30px_rgba(239,68,68,0.5)] cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform" />
            <span>TRY AGAIN</span>
          </button>
        </div>

      </div>
    </div>
  );
};
