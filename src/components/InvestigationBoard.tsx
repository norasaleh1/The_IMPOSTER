import React from 'react';
import { Users, FileSearch, Pin, AlertTriangle, HelpCircle } from 'lucide-react';
import { Suspect, Evidence } from '../types';
import { SuspectCard } from './SuspectCard';
import { EvidenceCard } from './EvidenceCard';

interface InvestigationBoardProps {
  suspects: Suspect[];
  evidenceList: Evidence[];
  inspectedEvidenceIds: string[];
  isSolved: boolean;
  onInspectSuspect: (suspect: Suspect) => void;
  onAccuseSuspect: (suspect: Suspect) => void;
  onInspectEvidence: (evidence: Evidence) => void;
}

export const InvestigationBoard: React.FC<InvestigationBoardProps> = ({
  suspects,
  evidenceList,
  inspectedEvidenceIds,
  isSolved,
  onInspectSuspect,
  onAccuseSuspect,
  onInspectEvidence,
}) => {
  return (
    <main
      id="investigation-board"
      className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10"
    >
      {/* Visual Corkboard Header Pin */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Pin className="w-4 h-4 text-red-500 fill-red-500 rotate-45" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            MASTER EVIDENCE PINBOARD & SUSPECT ROSTER
          </span>
        </div>
        <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
          CROSS-EXAMINE TIMELINES & IDENTIFY CONTRADICTION
        </span>
      </div>

      {/* SECTION 1: SUSPECTS */}
      <section id="suspects-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="suspects-heading"
                className="text-xl sm:text-2xl font-black font-cinzel text-neutral-100 tracking-wide uppercase"
              >
                SUSPECTS
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                4 personnel with physical access during the incident window
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-neutral-500">
            [ 4 PROFILES LOGGED ]
          </span>
        </div>

        {/* 4 Suspect Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {suspects.map((suspect) => (
            <SuspectCard
              key={suspect.id}
              suspect={suspect}
              isSolved={isSolved}
              onInspect={onInspectSuspect}
              onAccuse={onAccuseSuspect}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: EVIDENCE */}
      <section id="evidence-section" className="space-y-4 pt-4 border-t border-neutral-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-950/60 border border-amber-800/80 text-amber-400">
              <FileSearch className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="evidence-heading"
                className="text-xl sm:text-2xl font-black font-cinzel text-neutral-100 tracking-wide uppercase"
              >
                EVIDENCE
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                Classified access badges, surveillance recordings, and meeting telemetries
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-neutral-500">
            [ 4 RECORDS AVAILABLE ]
          </span>
        </div>

        {/* 4 Clickable Evidence Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {evidenceList.map((evidence) => (
            <EvidenceCard
              key={evidence.id}
              evidence={evidence}
              isInspected={inspectedEvidenceIds.includes(evidence.id)}
              onInspect={onInspectEvidence}
            />
          ))}
        </div>
      </section>

      {/* Detective Tip Footer Notice */}
      <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>
            Compare each suspect's stated departure time with digital badge swipes and camera timestamps.
          </span>
        </div>
        <span className="text-neutral-500 text-[11px] whitespace-nowrap">
          Click any card to inspect full records
        </span>
      </div>
    </main>
  );
};
