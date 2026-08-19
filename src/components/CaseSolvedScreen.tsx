import React from 'react';
import { Award, CheckCircle2, RotateCcw, ShieldCheck, Sparkles, Star, FileText, ArrowRight } from 'lucide-react';
import { DetectiveRank } from '../types';
import { soundManager } from '../utils/audio';

interface CaseSolvedScreenProps {
  score: number;
  rank: DetectiveRank;
  attemptsUsed: number;
  hintUsed: boolean;
  onPlayAgain: () => void;
}

export const CaseSolvedScreen: React.FC<CaseSolvedScreenProps> = ({
  score,
  rank,
  attemptsUsed,
  hintUsed,
  onPlayAgain,
}) => {
  const getRankBadgeColor = (r: DetectiveRank) => {
    switch (r) {
      case 'Master Detective':
        return 'from-amber-400 to-yellow-600 border-amber-300 text-amber-950';
      case 'Sharp Investigator':
        return 'from-emerald-400 to-teal-600 border-emerald-300 text-emerald-950';
      case 'Junior Detective':
        return 'from-blue-400 to-indigo-600 border-blue-300 text-blue-950';
      case 'Rookie Investigator':
        return 'from-neutral-400 to-slate-600 border-neutral-300 text-neutral-950';
    }
  };

  return (
    <div
      id="case-solved-screen"
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 corkboard-bg text-neutral-100 animate-fadeIn"
    >
      <div className="relative z-10 max-w-2xl w-full mx-auto space-y-6 p-6 sm:p-10 rounded-2xl bg-neutral-900/95 border-2 border-emerald-500/80 shadow-[0_0_60px_rgba(34,197,94,0.3)] backdrop-blur-xl animate-green-solved">
        
        {/* Top Header Badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase">
            <CheckCircle2 className="w-4 h-4" />
            <span>CONFIDENTIAL CASE ARCHIVE // RESOLVED</span>
          </div>

          <h1
            id="case-solved-title"
            className="text-4xl sm:text-5xl font-black font-cinzel tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.5)]"
          >
            CASE SOLVED
          </h1>
        </div>

        {/* Core Conviction Headline */}
        <div className="p-5 rounded-2xl bg-black/80 border border-emerald-900/80 text-center space-y-3">
          <p
            id="case-solved-headline"
            className="text-xl sm:text-2xl font-bold font-cinzel text-red-400 tracking-wide"
          >
            Alex Carter was lying.
          </p>

          <div className="h-px w-24 mx-auto bg-neutral-800" />

          {/* Explanation Required by Specification */}
          <p
            id="case-solved-explanation"
            className="text-sm sm:text-base font-typewriter text-neutral-200 leading-relaxed italic"
          >
            “Alex claimed he left at 8:30 PM, but his keycard was used at 9:12 PM.”
          </p>

          <p className="text-xs font-mono text-neutral-400 pt-1">
            RFID Turnstile Log B-04 proves Alex re-entered via the side fire door during the theft window.
          </p>
        </div>

        {/* Detective Rank Showcase */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-950 to-neutral-900 border border-neutral-800 text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block font-semibold">
            Detective Evaluation
          </span>

          <div className="flex items-center justify-center">
            <div
              id="detective-rank-badge"
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r ${getRankBadgeColor(
                rank
              )} font-cinzel font-black text-lg sm:text-xl shadow-lg uppercase tracking-wider`}
            >
              <Award className="w-6 h-6" />
              <span>Detective Rank: {rank}</span>
            </div>
          </div>

          {/* Score & Deductions Breakdown */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-800 font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-black/60 border border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">FINAL SCORE</span>
              <span id="final-score-value" className="text-amber-400 font-extrabold text-sm sm:text-base">
                {score} PTS
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/60 border border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">WRONG ACCUSATIONS</span>
              <span className="text-neutral-300 font-bold text-sm sm:text-base">
                {attemptsUsed}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/60 border border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">HINT USED</span>
              <span className="text-neutral-300 font-bold text-sm sm:text-base">
                {hintUsed ? 'Yes (-100)' : 'No (+0)'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            id="play-again-btn"
            onClick={() => {
              soundManager.playStamp();
              onPlayAgain();
            }}
            className="w-full group py-4 px-8 rounded-xl font-cinzel font-black text-lg uppercase tracking-widest text-neutral-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 hover:from-emerald-300 hover:to-emerald-400 shadow-[0_0_30px_rgba(34,197,94,0.5)] cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform" />
            <span>PLAY AGAIN</span>
          </button>
        </div>

      </div>
    </div>
  );
};
