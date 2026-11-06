'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { heroesData } from '@/data/heroes';
import { Sparkles, ArrowRight, Check, Lock } from 'lucide-react';

export const PlayerSetupModal: React.FC = () => {
  const { startLevel, selectHero, setPlayerName, progress } = useGameStore();
  const [name, setName] = useState(progress.name || 'Cipher');
  const [selectedHeroId, setSelectedHeroId] = useState(progress.selectedHeroId || 'hero-cipher');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || 'Cipher';
    setPlayerName(finalName);
    selectHero(selectedHeroId);
    startLevel('forest-1');
  };

  return (
    <div className="min-h-screen w-screen bg-game-bg flex items-center justify-center p-4 relative select-none">
      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl bg-game-panel border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800 text-xs text-sky-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hero Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
            Initialize Your Coder
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Begin your journey with Cipher the Code Wizard! Earn coins to unlock more heroes.
          </p>
        </div>

        <form onSubmit={handleStart} className="space-y-6">
          {/* Player Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Adventurer Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              placeholder="Enter name (e.g. Cipher, Ada, Turing)"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 focus:border-sky-500 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium text-sm transition-colors"
            />
          </div>

          {/* Character Selection Cards */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Hero Roster
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {heroesData.map((hero) => {
                const isUnlocked = progress.unlockedHeroes.includes(hero.id);
                const isSelected = selectedHeroId === hero.id;

                return (
                  <button
                    key={hero.id}
                    type="button"
                    disabled={!isUnlocked}
                    onClick={() => {
                      if (isUnlocked) setSelectedHeroId(hero.id);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all relative flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-sky-950/40 border-sky-500 shadow-glow'
                        : isUnlocked
                        ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-950/40 border-slate-900 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-3xl p-2 rounded-lg bg-slate-800/80 shrink-0">
                      {hero.avatarIcon}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-200">{hero.name}</span>
                        {isSelected ? (
                          <Check className="w-4 h-4 text-sky-400" />
                        ) : !isUnlocked ? (
                          <span className="text-[10px] text-amber-400 font-bold flex items-center gap-0.5">
                            <Lock className="w-3 h-3 text-amber-400" />
                            <span>{hero.cost} Coins</span>
                          </span>
                        ) : null}
                      </div>
                      <div className="text-[11px] font-medium text-sky-400">{hero.title}</div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {hero.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 hover:from-sky-400 hover:to-emerald-300 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Begin Adventure</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
