import React from 'react';
import { X, ShieldAlert, FileText, Clock, Server, Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import { Evidence } from '../types';
import { soundManager } from '../utils/audio';

interface EvidenceModalProps {
  evidence: Evidence | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  evidence,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !evidence) return null;

  return (
    <div
      id="evidence-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="evidence-modal"
        className="relative w-full max-w-2xl bg-neutral-900 border-2 border-neutral-700/90 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-neutral-100 space-y-6 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="classified-stamp text-[10px] sm:text-xs">
                {evidence.classification}
              </span>
            </div>
            <h2
              id="modal-evidence-title"
              className="text-xl sm:text-2xl font-bold font-cinzel text-neutral-100"
            >
              {evidence.title}
            </h2>
            <p className="text-xs font-mono text-neutral-400">
              Source: <span className="text-neutral-200">{evidence.source}</span>
            </p>
          </div>

          <button
            id="close-evidence-modal-btn"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Finding Box */}
        <div className="p-4 rounded-xl bg-black/80 border border-red-900/60 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span className="text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Official Finding
            </span>
            <span className="text-neutral-500">{evidence.timestamp}</span>
          </div>
          <p
            id="modal-evidence-finding"
            className="text-sm sm:text-base font-mono font-bold text-neutral-100 leading-relaxed"
          >
            {evidence.shortSummary}
          </p>
        </div>

        {/* Chronological Raw Telemetry / Log Audit */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-neutral-500" />
              <span>Full Chronological System Audit</span>
            </h3>
            <span className="text-[10px] font-mono text-neutral-500">FORMAT: ISO_8601 // SYNCHRONIZED</span>
          </div>

          <div className="rounded-xl bg-neutral-950 border border-neutral-800 divide-y divide-neutral-900 overflow-hidden font-mono text-xs">
            {evidence.logEntries.map((entry, idx) => (
              <div
                key={idx}
                className={`p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors ${
                  entry.flagged
                    ? 'bg-red-950/20 text-red-300 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-900/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-black/60 border border-neutral-800 text-amber-400 text-[11px]">
                    {entry.time}
                  </span>
                  <span className="font-semibold text-neutral-200">{entry.event}</span>
                </div>
                <span className="text-neutral-400 text-[11px] sm:text-xs">
                  {entry.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Footer Note */}
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Digital Cryptographic Signature Verified</span>
          </div>
          <span className="text-[10px] text-neutral-600">HASH: SHA256-789c09</span>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-xs font-bold cursor-pointer transition-colors"
          >
            Return to Investigation Board
          </button>
        </div>
      </div>
    </div>
  );
};
