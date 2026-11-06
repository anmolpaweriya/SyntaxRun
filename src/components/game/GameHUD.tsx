'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { ArrowLeft, Coins, Award, Settings, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const GameHUD: React.FC = () => {
  const { currentLevel, progress, setScreen, setSettingsModalOpen, updateSettings } = useGameStore();

  if (!currentLevel) return null;

  const isMuted = progress.settings.sfxVolume === 0;

  const toggleSound = () => {
    updateSettings({
      sfxVolume: isMuted ? 0.6 : 0,
      musicVolume: isMuted ? 0.3 : 0,
    });
  };

  return (
    <header className="h-14 bg-game-panel border-b border-game-border px-4 flex items-center justify-between z-10 select-none">
      {/* Left: Back button + Level Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setScreen('world-map')}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 flex items-center gap-1 text-xs font-semibold"
          title="Return to World Map"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Map</span>
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-950/80 text-sky-400 border border-sky-800/60">
              {currentLevel.worldName}
            </span>
            <span className="text-xs text-slate-400">Level {currentLevel.levelNumber}</span>
          </div>
          <h2 className="text-sm font-bold text-slate-100 truncate max-w-[200px] sm:max-w-xs">
            {currentLevel.title}
          </h2>
        </div>
      </div>

      {/* Right: Currency, XP, Settings */}
      <div className="flex items-center gap-3">
        {/* Coins Counter */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-bold text-amber-300 shadow-glow-gold">
          <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>{progress.totalCoins}</span>
        </div>

        {/* XP Counter */}
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/90 border border-sky-500/30 px-2.5 py-1 rounded-full text-xs font-bold text-sky-300 shadow-glow">
          <Award className="w-4 h-4 text-sky-400" />
          <span>{progress.totalXp} XP</span>
        </div>

        {/* Mute/Sound toggle */}
        <button
          onClick={toggleSound}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-slate-300" />}
        </button>

        {/* Settings button */}
        <button
          onClick={() => setSettingsModalOpen(true)}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          title="Game Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

