import React from 'react';
import { ShieldAlert, BookOpen, Lightbulb, RotateCcw, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  attempts: number;
  score: number;
  hintUsed: boolean;
  onOpenNotes: () => void;
  onOpenHint: () => void;
  onResetCase: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  attempts,
  score,
  hintUsed,
  onOpenNotes,
  onOpenHint,
  onResetCase,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="w-full bg-neutral-950/90 border-b border-red-950/80 backdrop-blur-md sticky top-0 z-30 px-4 py-3 sm:py-4 shadow-lg shadow-black/80">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Case Title & Synopsis */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <h1
              id="case-title"
              className="text-lg sm:text-2xl font-black font-cinzel tracking-wider text-red-500 uppercase flex items-center gap-2"
            >
              CASE #01 — THE MISSING FILE
            </h1>
          </div>
          <p
            id="case-synopsis"
            className="text-xs sm:text-sm font-mono text-neutral-300 max-w-2xl"
          >
            A confidential file disappeared from the office at <span className="text-red-400 font-bold">9:00 PM</span>. One suspect is lying.
          </p>
        </div>

        {/* Status Indicators & Control Toolbar */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 w-full md:w-auto">
          
          {/* Attempts Metric */}
          <div
            id="attempts-display"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-bold transition-all ${
              attempts === 1
                ? 'bg-red-950/80 border-red-500 text-red-400 animate-red-warning'
                : 'bg-neutral-900/90 border-neutral-800 text-neutral-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Attempts:</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((num) => (
                <span
                  key={num}
                  className={`w-2.5 h-2.5 rounded-full inline-block ${
                    num <= attempts ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-neutral-800'
                  }`}
                />
              ))}
            </div>
            <span className="text-red-400 font-bold ml-1">{attempts}</span>
          </div>

          {/* Current Score */}
          <div
            id="score-display"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800 font-mono text-xs sm:text-sm font-bold text-neutral-200"
          >
            <span className="text-neutral-500 text-xs">SCORE:</span>
            <span className="text-amber-400 font-extrabold">{score}</span>
            <span className="text-[10px] text-neutral-500">PTS</span>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            
            {/* Notes Button */}
            <button
              id="investigation-notes-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenNotes();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500/60 text-xs font-mono text-neutral-200 hover:text-amber-400 transition-all cursor-pointer shadow-sm"
              title="Open Investigation Notes"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">INVESTIGATION NOTES</span>
              <span className="sm:hidden">NOTES</span>
            </button>

            {/* Hint Button */}
            <button
              id="request-hint-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenHint();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer shadow-sm ${
                hintUsed
                  ? 'bg-neutral-900/60 border-neutral-800 text-neutral-500 hover:text-neutral-300'
                  : 'bg-red-950/40 hover:bg-red-950/70 border-red-800 hover:border-red-600 text-red-300 hover:text-red-200'
              }`}
              title={hintUsed ? 'View Used Hint' : 'Request Hint (-100 pts)'}
            >
              <Lightbulb className={`w-3.5 h-3.5 ${hintUsed ? 'text-neutral-500' : 'text-red-400 animate-pulse'}`} />
              <span className="hidden sm:inline">{hintUsed ? 'HINT (USED)' : 'REQUEST HINT'}</span>
              <span className="sm:hidden">HINT</span>
            </button>

            {/* Audio Toggle */}
            <button
              id="audio-toggle-btn"
              onClick={onToggleMute}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-all cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Reset Game */}
            <button
              id="reset-case-btn"
              onClick={() => {
                soundManager.playClick();
                onResetCase();
              }}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-red-400 transition-all cursor-pointer"
              title="Restart Investigation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </header>
  );
};
