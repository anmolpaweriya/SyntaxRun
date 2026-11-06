'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { worldsData, WorldMetadata } from '@/data/worlds';
import { getLevelsByWorld } from '@/engine/levels';
import { ArrowLeft, Lock, Star, Play, CheckCircle2, Trophy, Coins, Award } from 'lucide-react';

export const WorldMapScreen: React.FC = () => {
  const { setScreen, startLevel, progress } = useGameStore();
  const [selectedWorld, setSelectedWorld] = useState<WorldMetadata>(worldsData[0]);

  const levels = getLevelsByWorld(selectedWorld.id);
  const isSelectedWorldUnlocked = progress.unlockedWorlds.includes(selectedWorld.id);

  return (
    <div className="h-screen w-screen bg-game-bg text-slate-100 flex flex-col select-none overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 shrink-0 bg-game-panel border-b border-game-border px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setScreen('dashboard')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-semibold border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <h2 className="text-lg font-black tracking-wide text-slate-100 hidden sm:block">
            WORLD MAP OF SYNTAXRUN
          </h2>
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
        </div>
      </header>

      {/* Main Map Content: Split with Interactive World Node Grid + Level Details */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* Left / Main Map Area */}
        <div className="flex-1 min-h-[45vh] lg:min-h-0 p-4 sm:p-6 relative overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-game-bg to-slate-950 flex flex-col justify-start lg:justify-center">
          <div className="max-w-4xl mx-auto w-full space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs uppercase tracking-widest text-sky-400 font-bold">
                The Seven Lands of JavaScript
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
                Select a Destination
              </h1>
            </div>

            {/* Interactive World Nodes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {worldsData.map((world, idx) => {
                const isUnlocked = progress.unlockedWorlds.includes(world.id);
                const isSelected = selectedWorld.id === world.id;
                const worldLvls = getLevelsByWorld(world.id);
                const completedCount = worldLvls.filter((l) => progress.completedLevels[l.id]).length;

                return (
                  <button
                    key={world.id}
                    onClick={() => setSelectedWorld(world)}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-44 ${isSelected
                      ? 'border-sky-400 shadow-glow bg-slate-800/90'
                      : isUnlocked
                        ? 'border-slate-800 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-800/60'
                        : 'border-slate-900 bg-slate-950/40 opacity-50 cursor-not-allowed'
                      }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {world.badge}
                      </span>
                      {isUnlocked ? (
                        completedCount === worldLvls.length && worldLvls.length > 0 ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <span className="text-[11px] font-bold text-sky-400">
                            {completedCount}/{worldLvls.length}
                          </span>
                        )
                      ) : (
                        <Lock className="w-4 h-4 text-slate-600" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-slate-100">{world.name}</h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {world.conceptSummary}
                      </p>
                    </div>

                    <div className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-500 pt-2 border-t border-slate-800/60">
                      <span>{world.bossName}</span>
                      {isSelected && <span className="text-sky-400">Selected</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Pane: Selected World Level Selector */}
        <div className="w-full lg:w-96 h-[55vh] lg:h-full bg-game-panel border-t lg:border-t-0 lg:border-l border-game-border p-5 sm:p-6 flex flex-col min-h-0 shrink-0 overflow-hidden">
          <div className="space-y-3 pb-4 border-b border-slate-800 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                {selectedWorld.subtitle}
              </span>
              {!isSelectedWorldUnlocked && (
                <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Locked</span>
                </span>
              )}
            </div>

            <h3 className="text-xl font-black text-slate-100">{selectedWorld.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {selectedWorld.description}
            </p>
          </div>

          {/* Level List */}
          <div className="flex-1 flex flex-col min-h-0 pt-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5 shrink-0 flex items-center justify-between">
              <span>World Levels ({levels.length})</span>
              <span className="text-[11px] text-slate-400">Scroll to explore</span>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 space-y-2.5 pr-1.5 pb-2">
              {isSelectedWorldUnlocked ? (
                levels.map((lvl) => {
                  const completion = progress.completedLevels[lvl.id];
                  const isCompleted = Boolean(completion);
                  const stars = completion?.stars || 0;

                  return (
                    <div
                      key={lvl.id}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${isCompleted
                        ? 'bg-slate-900/80 border-emerald-500/30'
                        : 'bg-slate-900/40 border-slate-800'
                        }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-200">
                            {lvl.levelNumber}. {lvl.title}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">{lvl.subtitle}</div>

                        {/* Stars */}
                        <div className="flex items-center gap-0.5 pt-0.5">
                          {[1, 2, 3].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${s <= stars ? 'text-amber-400 fill-current' : 'text-slate-700'
                                }`}
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => startLevel(lvl.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow-forest transition-all shrink-0 ml-2"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{isCompleted ? 'Replay' : 'Play'}</span>
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-slate-500 space-y-3">
                  <Lock className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-xs leading-relaxed">
                    This world is currently sealed. Defeat the final Boss of the previous world to unlock the gateway!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

