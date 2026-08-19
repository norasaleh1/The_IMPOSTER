import React from 'react';
import { Key, Video, Camera, FileCheck, Eye, Clock, ShieldCheck } from 'lucide-react';
import { Evidence } from '../types';
import { soundManager } from '../utils/audio';

interface EvidenceCardProps {
  evidence: Evidence;
  isInspected: boolean;
  onInspect: (evidence: Evidence) => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  isInspected,
  onInspect,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'keycard':
        return <Key className="w-5 h-5 text-amber-400" />;
      case 'meeting':
        return <Video className="w-5 h-5 text-blue-400" />;
      case 'security_cam':
        return <Camera className="w-5 h-5 text-emerald-400" />;
      case 'design_cam':
        return <Camera className="w-5 h-5 text-purple-400" />;
      default:
        return <FileCheck className="w-5 h-5 text-red-400" />;
    }
  };

  const getBorderColor = (id: string) => {
    switch (id) {
      case 'keycard':
        return 'hover:border-amber-600/70';
      case 'meeting':
        return 'hover:border-blue-600/70';
      case 'security_cam':
        return 'hover:border-emerald-600/70';
      case 'design_cam':
        return 'hover:border-purple-600/70';
      default:
        return 'hover:border-red-600/70';
    }
  };

  return (
    <div
      id={`evidence-card-${evidence.id}`}
      onClick={() => {
        soundManager.playFolderOpen();
        onInspect(evidence);
      }}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 ${getBorderColor(
        evidence.id
      )} cursor-pointer transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-2xl hover:scale-[1.01] overflow-hidden`}
    >
      {/* Top Bar with Badge Category and Timestamp */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-black/70 border border-neutral-800 shadow-inner group-hover:scale-105 transition-transform">
            {getIcon(evidence.id)}
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold block">
              {evidence.category}
            </span>
            <h3
              id={`evidence-title-${evidence.id}`}
              className="text-base font-bold font-cinzel text-neutral-100 group-hover:text-red-300 transition-colors"
            >
              {evidence.title}
            </h3>
          </div>
        </div>

        {/* Inspected Pill Badge */}
        {isInspected && (
          <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/80 text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> INSPECTED
          </span>
        )}
      </div>

      {/* Main Evidence Finding Summary */}
      <div className="my-2 p-3.5 rounded-xl bg-black/80 border border-neutral-800/90 group-hover:border-neutral-700 transition-all space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span className="flex items-center gap-1 text-amber-400/90 font-semibold">
            <Clock className="w-3 h-3" /> Logged Timestamp: {evidence.timestamp}
          </span>
        </div>
        <p
          id={`evidence-summary-${evidence.id}`}
          className="text-xs sm:text-sm font-mono text-neutral-200 font-medium leading-relaxed"
        >
          {evidence.shortSummary}
        </p>
      </div>

      {/* Footer Details */}
      <div className="mt-3 pt-2.5 border-t border-neutral-800/70 flex items-center justify-between text-[11px] font-mono text-neutral-500">
        <span className="truncate max-w-[200px] text-neutral-400">{evidence.source}</span>
        <span className="flex items-center gap-1 text-red-400 group-hover:text-red-300 font-bold group-hover:translate-x-0.5 transition-all">
          <Eye className="w-3.5 h-3.5" /> Inspect Evidence &rarr;
        </span>
      </div>
    </div>
  );
};
