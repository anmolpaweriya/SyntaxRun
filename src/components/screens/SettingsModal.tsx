'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { X, Volume2, Music, Type, Palette, AlertTriangle, RotateCcw, User, Lock, Sparkles, Check } from 'lucide-react';
import { heroesData } from '@/data/heroes';

export const SettingsModal: React.FC = () => {
  const { settingsModalOpen, setSettingsModalOpen, progress, updateSettings, resetAllProgress, selectHero, unlockHero } = useGameStore();
  const [confirmReset, setConfirmReset] = useState(false);

  if (!settingsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn select-none">
      <div className="w-full max-w-md bg-game-panel border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-lg font-bold text-slate-100">Settings & Hero</h3>
          <button
            onClick={() => {
              setConfirmReset(false);
              setSettingsModalOpen(false);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Character Selection / Unlock */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-sky-400" />
              <span>Hero Character</span>
            </span>
            <span className="text-amber-400 font-bold">{progress.totalCoins} Coins</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {heroesData.map((h) => {
              const isUnlocked = progress.unlockedHeroes.includes(h.id);
              const isSelected = progress.selectedHeroId === h.id;
              const canAfford = progress.totalCoins >= h.cost;

              return (
                <div
                  key={h.id}
                  className={`p-2.5 rounded-xl border flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'bg-sky-950/60 border-sky-400 text-sky-200'
                      : isUnlocked
                      ? 'bg-slate-900 border-slate-800 text-slate-300'
                      : 'bg-slate-950/60 border-slate-850 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{h.avatarIcon}</span>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold truncate">{h.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{h.title}</div>
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="text-[10px] font-bold text-sky-400 text-center py-1 bg-sky-950/80 rounded flex items-center justify-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Active</span>
                    </div>
                  ) : isUnlocked ? (
                    <button
                      type="button"
                      onClick={() => selectHero(h.id)}
                      className="w-full py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-semibold transition-colors"
                    >
                      Select
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => unlockHero(h.id)}
                      className={`w-full py-1 rounded text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Lock className="w-3 h-3" />
                      <span>{h.cost} Coins</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Audio Controls */}
        <div className="space-y-4 pt-3 border-t border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-sky-400" />
                <span>Sound Effects (SFX) Volume</span>
              </span>
              <span>{Math.round(progress.settings.sfxVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={progress.settings.sfxVolume}
              onChange={(e) => updateSettings({ sfxVolume: parseFloat(e.target.value) })}
              className="w-full accent-sky-400 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Music className="w-4 h-4 text-emerald-400" />
                <span>Ambient Music (BGM) Volume</span>
              </span>
              <span>{Math.round(progress.settings.musicVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={progress.settings.musicVolume}
              onChange={(e) => updateSettings({ musicVolume: parseFloat(e.target.value) })}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Code Editor Customization */}
        <div className="space-y-4 pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Type className="w-4 h-4 text-amber-400" />
              <span>Editor Font Size</span>
            </div>
            <select
              value={progress.settings.editorFontSize}
              onChange={(e) => updateSettings({ editorFontSize: Number(e.target.value) })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200"
            >
              <option value={12}>12 px</option>
              <option value={14}>14 px (Default)</option>
              <option value={16}>16 px</option>
              <option value={18}>18 px</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Palette className="w-4 h-4 text-purple-400" />
              <span>Editor Theme</span>
            </div>
            <select
              value={progress.settings.editorTheme}
              onChange={(e) => updateSettings({ editorTheme: e.target.value as any })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200"
            >
              <option value="vs-dark">Dark Theme (Default)</option>
              <option value="vs-light">Light Theme</option>
              <option value="hc-black">High Contrast</option>
            </select>
          </div>
        </div>

        {/* Danger Zone: Reset Data */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs font-semibold border border-red-800/60 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Game Progress</span>
            </button>
          ) : (
            <div className="p-3 bg-red-950/80 border border-red-600 rounded-lg space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-300">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>Are you completely sure?</span>
              </div>
              <p className="text-[11px] text-red-200 leading-relaxed">
                This will wipe your completed levels, XP, coins, and reset heroes.
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => {
                    resetAllProgress();
                    setConfirmReset(false);
                    setSettingsModalOpen(false);
                  }}
                  className="flex-1 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-bold transition-colors"
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
