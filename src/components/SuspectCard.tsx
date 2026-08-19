import React from 'react';
import { User, AlertCircle, ShieldAlert, Eye, Fingerprint } from 'lucide-react';
import { Suspect } from '../types';
import { soundManager } from '../utils/audio';

interface SuspectCardProps {
  suspect: Suspect;
  isSolved: boolean;
  onInspect: (suspect: Suspect) => void;
  onAccuse: (suspect: Suspect) => void;
}

export const SuspectCard: React.FC<SuspectCardProps> = ({
  suspect,
  isSolved,
  onInspect,
  onAccuse,
}) => {
  const isLiar = isSolved && suspect.isGuilty;

  const getAvatarColor = (id: string) => {
    switch (id) {
      case 'alex':
        return 'from-blue-950/60 to-slate-900 border-blue-800/50 text-blue-300';
      case 'maya':
        return 'from-purple-950/60 to-slate-900 border-purple-800/50 text-purple-300';
      case 'daniel':
        return 'from-emerald-950/60 to-slate-900 border-emerald-800/50 text-emerald-300';
      case 'sophia':
        return 'from-amber-950/60 to-slate-900 border-amber-800/50 text-amber-300';
      default:
        return 'from-neutral-900 to-black border-neutral-800 text-neutral-300';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <div
      id={`suspect-card-${suspect.id}`}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-neutral-900/90 border transition-all duration-300 backdrop-blur-md shadow-xl hover:shadow-2xl overflow-hidden ${
        isLiar
          ? 'border-red-600 bg-red-950/30 shadow-[0_0_30px_rgba(220,38,38,0.3)]'
          : 'border-neutral-800 hover:border-red-800/70 hover:bg-neutral-900/95'
      }`}
    >
      {/* Top Dossier Clip / Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar Icon / Initial Badge */}
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAvatarColor(
              suspect.id
            )} border flex items-center justify-center font-cinzel font-black text-base shadow-inner relative group-hover:scale-105 transition-transform`}
          >
            {getInitials(suspect.name)}
            <Fingerprint className="w-8 h-8 absolute opacity-10 pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3
                id={`suspect-name-${suspect.id}`}
                className="text-base sm:text-lg font-bold font-cinzel text-neutral-100 group-hover:text-red-300 transition-colors"
              >
                {suspect.name}
              </h3>
            </div>
            <p className="text-xs font-mono text-neutral-400 font-semibold">
              {suspect.role}
            </p>
          </div>
        </div>

        {/* Status Stamp */}
        <div className="text-right">
          {isLiar ? (
            <span className="liar-stamp text-[10px] sm:text-xs font-black animate-stamp">
              LIAR
            </span>
          ) : (
            <span className="inline-block px-2.5 py-1 rounded bg-neutral-800/80 border border-neutral-700 font-mono text-[10px] text-neutral-400 tracking-wider">
              STATUS: UNKNOWN
            </span>
          )}
        </div>
      </div>

      {/* Statement Box */}
      <div
        onClick={() => {
          soundManager.playFolderOpen();
          onInspect(suspect);
        }}
        className="my-2 p-3.5 rounded-xl bg-black/70 border border-neutral-800/80 cursor-pointer hover:border-neutral-700 transition-all space-y-1.5"
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
          <span>Official Statement</span>
          <span className="text-[10px] text-neutral-600 flex items-center gap-1 group-hover:text-red-400/80">
            <Eye className="w-3 h-3" /> View Profile
          </span>
        </div>
        <p
          id={`suspect-statement-${suspect.id}`}
          className="text-xs sm:text-sm font-typewriter text-neutral-200 italic leading-relaxed"
        >
          {suspect.statement}
        </p>
      </div>

      {/* Card Footer: Profile Details & Accuse Action Button */}
      <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
        <button
          id={`inspect-suspect-btn-${suspect.id}`}
          onClick={() => {
            soundManager.playFolderOpen();
            onInspect(suspect);
          }}
          className="px-3 py-2 text-xs font-mono text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 rounded-lg transition-colors cursor-pointer"
        >
          Inspect Dossier
        </button>

        <button
          id={`accuse-btn-${suspect.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onAccuse(suspect);
          }}
          className="px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase text-white bg-red-700/90 hover:bg-red-600 active:bg-red-800 rounded-lg transition-all shadow-md shadow-red-900/40 hover:shadow-red-700/60 cursor-pointer flex items-center gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>ACCUSE</span>
        </button>
      </div>
    </div>
  );
};
