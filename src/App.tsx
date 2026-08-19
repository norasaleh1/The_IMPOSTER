/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GameState, Suspect, Evidence, DetectiveRank } from './types';
import { SUSPECTS, EVIDENCE_LIST, calculateRank } from './data/gameData';
import { StartScreen } from './components/StartScreen';
import { Header } from './components/Header';
import { InvestigationBoard } from './components/InvestigationBoard';
import { SuspectModal } from './components/SuspectModal';
import { EvidenceModal } from './components/EvidenceModal';
import { NotesModal } from './components/NotesModal';
import { HintModal } from './components/HintModal';
import { WrongAccusationModal } from './components/WrongAccusationModal';
import { CaseSolvedScreen } from './components/CaseSolvedScreen';
import { CaseFailedScreen } from './components/CaseFailedScreen';
import { soundManager } from './utils/audio';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  
  // Game metrics
  const [attempts, setAttempts] = useState<number>(3);
  const [score, setScore] = useState<number>(1000);
  const [hintUsed, setHintUsed] = useState<boolean>(false);
  const [wrongAccusationsCount, setWrongAccusationsCount] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  
  // Inspected items
  const [inspectedEvidenceIds, setInspectedEvidenceIds] = useState<string[]>([]);
  
  // Active modals
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isHintOpen, setIsHintOpen] = useState<boolean>(false);
  const [wrongAccusedSuspect, setWrongAccusedSuspect] = useState<Suspect | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Start new case
  const handleStartInvestigation = () => {
    setAttempts(3);
    setScore(1000);
    setHintUsed(false);
    setWrongAccusationsCount(0);
    setNotes('');
    setInspectedEvidenceIds([]);
    setSelectedSuspect(null);
    setSelectedEvidence(null);
    setIsNotesOpen(false);
    setIsHintOpen(false);
    setWrongAccusedSuspect(null);
    setGameState('investigating');
  };

  // Restart / Reset case handler
  const handleResetCase = () => {
    soundManager.playClick();
    handleStartInvestigation();
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
  };

  // Inspect Suspect Dossier
  const handleInspectSuspect = (suspect: Suspect) => {
    setSelectedSuspect(suspect);
  };

  // Inspect Evidence Record
  const handleInspectEvidence = (evidence: Evidence) => {
    if (!inspectedEvidenceIds.includes(evidence.id)) {
      setInspectedEvidenceIds((prev) => [...prev, evidence.id]);
    }
    setSelectedEvidence(evidence);
  };

  // Accuse Suspect
  const handleAccuseSuspect = (suspect: Suspect) => {
    // Close any open profile modal
    setSelectedSuspect(null);

    if (suspect.isGuilty) {
      // Alex Carter is guilty!
      soundManager.playCaseSolved();
      setGameState('solved');
    } else {
      // Wrong Accusation: Maya, Daniel, or Sophia
      soundManager.playWrongAccusation();
      const nextAttempts = attempts - 1;
      const nextScore = Math.max(0, score - 200);
      
      setAttempts(nextAttempts);
      setScore(nextScore);
      setWrongAccusationsCount((prev) => prev + 1);
      setWrongAccusedSuspect(suspect);
    }
  };

  // Dismiss wrong accusation modal
  const handleCloseWrongAccusation = () => {
    setWrongAccusedSuspect(null);
    if (attempts <= 0) {
      soundManager.playWrongAccusation();
      setGameState('failed');
    }
  };

  // Use Hint
  const handleConfirmHint = () => {
    if (!hintUsed) {
      setHintUsed(true);
      setScore((prev) => Math.max(0, prev - 100));
    }
  };

  const currentRank: DetectiveRank = calculateRank(score);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between selection:bg-red-500/30 selection:text-red-200 font-sans">
      
      {/* 1. START SCREEN */}
      {gameState === 'start' && (
        <StartScreen
          onStart={handleStartInvestigation}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* 2. MAIN INVESTIGATION SCREEN */}
      {gameState === 'investigating' && (
        <div className="flex flex-col min-h-screen corkboard-bg">
          <Header
            attempts={attempts}
            score={score}
            hintUsed={hintUsed}
            onOpenNotes={() => setIsNotesOpen(true)}
            onOpenHint={() => setIsHintOpen(true)}
            onResetCase={handleResetCase}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />

          <div className="flex-1">
            <InvestigationBoard
              suspects={SUSPECTS}
              evidenceList={EVIDENCE_LIST}
              inspectedEvidenceIds={inspectedEvidenceIds}
              isSolved={false}
              onInspectSuspect={handleInspectSuspect}
              onAccuseSuspect={handleAccuseSuspect}
              onInspectEvidence={handleInspectEvidence}
            />
          </div>

          {/* Suspect Profile Modal */}
          <SuspectModal
            suspect={selectedSuspect}
            isOpen={!!selectedSuspect}
            isSolved={false}
            onClose={() => setSelectedSuspect(null)}
            onAccuse={handleAccuseSuspect}
          />

          {/* Evidence Record Modal */}
          <EvidenceModal
            evidence={selectedEvidence}
            isOpen={!!selectedEvidence}
            onClose={() => setSelectedEvidence(null)}
          />

          {/* Field Notes Modal */}
          <NotesModal
            notes={notes}
            isOpen={isNotesOpen}
            onClose={() => setIsNotesOpen(false)}
            onSaveNotes={(newNotes) => setNotes(newNotes)}
          />

          {/* Hint Modal */}
          <HintModal
            isOpen={isHintOpen}
            hintUsed={hintUsed}
            onClose={() => setIsHintOpen(false)}
            onConfirmHint={handleConfirmHint}
          />

          {/* Wrong Accusation Alert Modal */}
          <WrongAccusationModal
            suspect={wrongAccusedSuspect}
            isOpen={!!wrongAccusedSuspect}
            attemptsRemaining={attempts}
            onClose={handleCloseWrongAccusation}
          />
        </div>
      )}

      {/* 3. CASE SOLVED (VICTORY) SCREEN */}
      {gameState === 'solved' && (
        <CaseSolvedScreen
          score={score}
          rank={currentRank}
          attemptsUsed={wrongAccusationsCount}
          hintUsed={hintUsed}
          onPlayAgain={handleStartInvestigation}
        />
      )}

      {/* 4. CASE FAILED (GAME OVER) SCREEN */}
      {gameState === 'failed' && (
        <CaseFailedScreen
          score={score}
          onTryAgain={handleStartInvestigation}
        />
      )}
    </div>
  );
}
