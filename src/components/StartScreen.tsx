import React from 'react';
import { ShieldAlert, Search, FileText, Volume2, VolumeX, AlertTriangle, Eye } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface StartScreenProps {
  onStart: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  isMuted,
  onToggleMute,
}) => {
  const handleStart = () => {
    soundManager.playStamp();
    soundManager.startAmbient();
    onStart();
  };

  return (
    <div
      id="start-screen"
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 corkboard-bg text-neutral-100 overflow-hidden select-none"
    >
      {/* Background vignette & dark surveillance lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1)_0%,rgba(5,5,8,0.95)_70%)] pointer-events-none" />

      {/* Subtle scanning line effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

      {/* Top right mute button */}
      <div className="absolute top-5 right-5 z-20">
        <button
          id="sound-toggle-start"
          onClick={onToggleMute}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900/90 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-800/60 transition-all text-xs font-mono backdrop-blur-md cursor-pointer"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-red-400" />}
          <span>{isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}</span>
        </button>
      </div>

      {/* Main Dossier Folder Card */}
      <div className="relative z-10 max-w-2xl w-full mx-auto text-center space-y-8 p-8 sm:p-12 rounded-2xl bg-neutral-900/90 border-2 border-neutral-800/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.9)] animate-flicker">
        
        {/* Top Confidential Stamp */}
        <div className="flex items-center justify-center">
          <div className="classified-stamp text-xs sm:text-sm">
            TOP SECRET // CASE FILE #01
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-4">
          <h1
            id="game-title"
            className="text-4xl sm:text-6xl font-black font-cinzel tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-red-500 to-red-600 drop-shadow-[0_0_25px_rgba(239,68,68,0.4)]"
          >
            THE IMPOSTOR
          </h1>
          <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        </div>

        {/* 3 Core Directives */}
        <div
          id="start-tagline"
          className="space-y-2 font-mono text-base sm:text-xl font-bold tracking-wide"
        >
          <p className="text-red-400 font-semibold tracking-wider">
            One of them is lying.
          </p>
          <p className="text-neutral-200 font-semibold tracking-wider">
            Find the contradiction.
          </p>
          <p className="text-amber-400 font-semibold tracking-wider">
            Catch the thief.
          </p>
        </div>

        {/* Narrative Context Briefing Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-neutral-800/80 text-left font-mono text-xs sm:text-sm text-neutral-300 space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-bold uppercase text-xs tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Incident Briefing</span>
          </div>
          <p className="leading-relaxed text-neutral-300">
            A confidential research dossier disappeared from the corporate executive floor at <strong className="text-red-300 font-bold">9:00 PM</strong>. Four primary personnel were present in the facility. Cross-examine their recorded statements against timestamped surveillance logs, door turnstiles, and telecommunication feeds.
          </p>
          <div className="flex items-center justify-between pt-2 text-[11px] text-neutral-500 border-t border-neutral-800">
            <span>SUSPECTS: 4</span>
            <span>AVAILABLE ATTEMPTS: 3</span>
            <span>STARTING SCORE: 1000 PTS</span>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-2">
          <button
            id="start-investigation-btn"
            onClick={handleStart}
            className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 text-lg sm:text-xl font-black font-cinzel tracking-widest uppercase text-white bg-gradient-to-r from-red-700 via-red-600 to-red-800 hover:from-red-600 hover:to-red-700 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer overflow-hidden border border-red-500/50"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>START INVESTIGATION</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
          </button>
        </div>

      </div>
    </div>
  );
};
