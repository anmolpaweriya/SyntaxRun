'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { heroesData } from '@/data/heroes';
import { worldsData } from '@/data/worlds';
import { allLevels, getLevelsByWorld } from '@/engine/levels';
import { 
  Play, 
  Map, 
  Terminal, 
  Settings, 
  Coins, 
  Award, 
  CheckCircle2, 
  Lock, 
  ChevronRight,
  UserCheck,
  Check,
  X,
  Sparkles
} from 'lucide-react';

export const DashboardScreen: React.FC = () => {
  const { progress, setScreen, startLevel, selectHero, unlockHero, setSettingsModalOpen } = useGameStore();
  const [characterModalOpen, setCharacterModalOpen] = useState(false);

  const hero = heroesData.find((h) => h.id === progress.selectedHeroId) || heroesData[0];

  // Calculate statistics
  const totalCompleted = Object.keys(progress.completedLevels).length;
  const totalStars = Object.values(progress.completedLevels).reduce((acc, curr) => acc + curr.stars, 0);

  const handleContinue = () => {
    startLevel(progress.currentLevelId || 'forest-1');
  };

  return (
    <div className="min-h-screen w-screen bg-game-bg text-slate-100 flex flex-col select-none overflow-x-hidden">
      {/* Top Header */}
      <header className="h-16 bg-game-panel border-b border-game-border px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('landing')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-sm">
              SR
            </div>
            <span className="font-black text-lg tracking-wider text-slate-100">SYNTAXRUN</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-amber-500/30 text-xs font-bold text-amber-300">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>{progress.totalCoins}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-sky-500/30 text-xs font-bold text-sky-300">
            <Award className="w-4 h-4 text-sky-400" />
            <span>{progress.totalXp} XP</span>
          </div>

          <button
            onClick={() => setSettingsModalOpen(true)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        {/* Hero Banner & Quick Continue */}
        <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-game-panel to-slate-900 border border-slate-700/80 p-6 sm:p-8 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 z-10">
            {/* Clickable Hero Avatar to change/unlock character */}
            <button
              onClick={() => setCharacterModalOpen(true)}
              className="text-5xl sm:text-6xl p-4 bg-slate-800/80 hover:bg-slate-700/80 rounded-2xl border border-slate-700 hover:border-sky-400 shadow-glow transition-all group relative cursor-pointer"
              title="Click to switch or unlock characters"
            >
              <span>{hero.avatarIcon}</span>
              <span className="absolute bottom-1 right-1 bg-sky-500 text-slate-950 p-1 rounded-full text-[10px] font-bold">
                ✎
              </span>
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-slate-100">{progress.name}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-800 font-bold">
                  {hero.title}
                </span>
                <button
                  onClick={() => setCharacterModalOpen(true)}
                  className="text-xs text-sky-400 hover:text-sky-300 underline font-medium ml-1"
                >
                  Switch / Unlock Hero
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Levels Conquered: <span className="font-bold text-emerald-400">{totalCompleted}</span> / {allLevels.length} • Total Stars: <span className="font-bold text-amber-400">{totalStars} ★</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 z-10 w-full md:w-auto">
            <button
              onClick={handleContinue}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-glow-forest hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>CONTINUE QUEST</span>
            </button>

            <button
              onClick={() => setScreen('world-map')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-colors"
            >
              <Map className="w-4 h-4 text-sky-400" />
              <span>World Map</span>
            </button>
          </div>
        </div>

        {/* Action Hub Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setScreen('world-map')}
            className="p-5 rounded-xl bg-game-panel border border-slate-800 hover:border-sky-500/50 transition-all text-left space-y-2 group"
          >
            <div className="flex items-center justify-between text-sky-400">
              <Map className="w-5 h-5" />
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-bold text-base text-slate-100">7 Game Worlds</div>
            <p className="text-xs text-slate-400">Explore Syntax Forest, Logic Dungeon, Loop Mountains, Function Castle, Object Factory, Async Cyber City & Algorithm Realm.</p>
          </button>

          <button
            onClick={() => setScreen('practice-arena')}
            className="p-5 rounded-xl bg-game-panel border border-slate-800 hover:border-emerald-500/50 transition-all text-left space-y-2 group"
          >
            <div className="flex items-center justify-between text-emerald-400">
              <Terminal className="w-5 h-5" />
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-bold text-base text-slate-100">Practice Arena</div>
            <p className="text-xs text-slate-400">Free-play sandbox to experiment with custom algorithms and test game APIs without restrictions.</p>
          </button>
        </div>

        {/* Worlds Progression Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-200">Worlds Progression</h3>
            <button
              onClick={() => setScreen('world-map')}
              className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              <span>View Map</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {worldsData.map((world) => {
              const isUnlocked = progress.unlockedWorlds.includes(world.id);
              const worldLevels = getLevelsByWorld(world.id);
              const completedInWorld = worldLevels.filter((l) => progress.completedLevels[l.id]).length;
              const isFullyDone = completedInWorld === worldLevels.length && worldLevels.length > 0;

              return (
                <div
                  key={world.id}
                  onClick={() => {
                    if (isUnlocked) {
                      const firstLevel = worldLevels[0];
                      if (firstLevel) startLevel(firstLevel.id);
                    }
                  }}
                  className={`p-5 rounded-xl border transition-all ${
                    isUnlocked
                      ? 'bg-slate-900/80 border-slate-800 hover:border-slate-600 cursor-pointer hover:scale-[1.02]'
                      : 'bg-slate-950/40 border-slate-900 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {world.badge}
                    </span>
                    {isUnlocked ? (
                      isFullyDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <span className="text-[11px] font-bold text-sky-400">
                          {completedInWorld}/{worldLevels.length}
                        </span>
                      )
                    ) : (
                      <Lock className="w-4 h-4 text-slate-600" />
                    )}
                  </div>

                  <h4 className="font-bold text-base text-slate-100">{world.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {world.conceptSummary}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Boss: {world.bossName}</span>
                    {isUnlocked && <span className="text-sky-400 font-semibold">Play →</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Change / Unlock Character Modal */}
      {characterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-game-panel border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-sky-400" />
                <h3 className="text-lg font-bold text-slate-100">Hero Character Roster</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-full border border-amber-500/30 text-xs font-bold text-amber-300">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>{progress.totalCoins} Coins</span>
                </div>
                <button
                  onClick={() => setCharacterModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {heroesData.map((h) => {
                const isUnlocked = progress.unlockedHeroes.includes(h.id);
                const isSelected = progress.selectedHeroId === h.id;
                const canAfford = progress.totalCoins >= h.cost;

                return (
                  <div
                    key={h.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-sky-950/50 border-sky-400 shadow-glow'
                        : isUnlocked
                        ? 'bg-slate-900/70 border-slate-700/80'
                        : 'bg-slate-950/60 border-slate-850 opacity-90'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl p-2.5 rounded-lg bg-slate-800/80 shrink-0">
                        {h.avatarIcon}
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-100">{h.name}</span>
                          {isSelected && (
                            <span className="text-[10px] bg-sky-500 text-slate-950 font-black px-1.5 py-0.5 rounded">
                              ACTIVE
                            </span>
                          )}
                          {!isUnlocked && (
                            <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                              <Lock className="w-3 h-3 text-amber-400" />
                              <span>{h.cost} Coins</span>
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-sky-400">{h.title}</div>
                        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                          {h.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-end">
                      {isSelected ? (
                        <div className="text-xs font-bold text-sky-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Currently Selected</span>
                        </div>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => {
                            selectHero(h.id);
                            setCharacterModalOpen(false);
                          }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-colors border border-slate-700"
                        >
                          Select Hero
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            unlockHero(h.id);
                          }}
                          disabled={!canAfford}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            canAfford
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-glow-gold'
                              : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Unlock for {h.cost} Coins</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
