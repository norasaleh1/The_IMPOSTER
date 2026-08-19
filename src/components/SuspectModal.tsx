import React from 'react';
import { X, ShieldAlert, Fingerprint, Clock, Building, Key, FileText, CheckCircle2 } from 'lucide-react';
import { Suspect } from '../types';
import { soundManager } from '../utils/audio';

interface SuspectModalProps {
  suspect: Suspect | null;
  isOpen: boolean;
  isSolved: boolean;
  onClose: () => void;
  onAccuse: (suspect: Suspect) => void;
}

export const SuspectModal: React.FC<SuspectModalProps> = ({
  suspect,
  isOpen,
  isSolved,
  onClose,
  onAccuse,
}) => {
  if (!isOpen || !suspect) return null;

  const isLiar = isSolved && suspect.isGuilty;

  return (
    <div
      id="suspect-profile-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="suspect-profile-modal"
        className="relative w-full max-w-xl bg-neutral-900 border-2 border-neutral-700/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-neutral-100 space-y-6 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center font-cinzel font-black text-xl text-red-400 shadow-inner">
              {suspect.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold">
                  PERSONNEL DOSSIER
                </span>
              </div>
              <h2
                id="modal-suspect-name"
                className="text-2xl font-bold font-cinzel text-neutral-100"
              >
                {suspect.name}
              </h2>
              <p
                id="modal-suspect-role"
                className="text-sm font-mono text-neutral-400 font-semibold"
              >
                {suspect.role}
              </p>
            </div>
          </div>

          <button
            id="close-suspect-modal-btn"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-neutral-800">
          <span className="text-xs font-mono text-neutral-400">INVESTIGATION STATUS:</span>
          {isLiar ? (
            <span className="liar-stamp text-xs font-black animate-stamp">
              CONFIRMED LIAR & THIEF
            </span>
          ) : (
            <span
              id="modal-suspect-status"
              className="px-3 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 tracking-wider"
            >
              STATUS: UNKNOWN
            </span>
          )}
        </div>

        {/* Official Statement */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Official Sworn Statement</span>
          </label>
          <div
            id="modal-suspect-statement"
            className="p-4 rounded-xl bg-black/80 border border-red-950/80 font-typewriter text-neutral-200 italic text-sm sm:text-base leading-relaxed"
          >
            {suspect.statement}
          </div>
        </div>

        {/* Personnel Background Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
            <div className="text-neutral-500 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-neutral-400" />
              <span>Department</span>
            </div>
            <p className="text-neutral-200 font-semibold">{suspect.department}</p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
            <div className="text-neutral-500 flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-neutral-400" />
              <span>Assigned Keycard ID</span>
            </div>
            <p className="text-amber-400 font-bold">{suspect.keycardId}</p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1 sm:col-span-2">
            <div className="text-neutral-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Scheduled Shift & Activity</span>
            </div>
            <p className="text-neutral-300">{suspect.shiftHours}</p>
          </div>
        </div>

        {/* Detective Field Notes */}
        <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs font-mono text-neutral-400 leading-relaxed">
          <span className="text-neutral-500 font-bold block mb-1">DOSSIER NOTES:</span>
          {suspect.notes}
        </div>

        {/* Modal Action Bottom Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800 gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono text-xs font-semibold cursor-pointer transition-colors"
          >
            Close Dossier
          </button>

          <button
            id={`modal-accuse-btn-${suspect.id}`}
            onClick={() => {
              onClose();
              onAccuse(suspect);
            }}
            className="px-6 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-900/50 cursor-pointer flex items-center gap-2 transition-all"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>ACCUSE THIS SUSPECT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
