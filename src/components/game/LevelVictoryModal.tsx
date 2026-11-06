'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/store/useGameStore';
import { Star, Coins, Award, ArrowRight, Map, RotateCcw } from 'lucide-react';

export const LevelVictoryModal: React.FC = () => {
  const { victoryModalOpen, victoryDetails, goToNextLevel, setScreen, resetLevel, closeVictoryModal } = useGameStore();

  useEffect(() => {
    if (victoryModalOpen) {
      // Fire confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38BDF8', '#FBBF24', '#10B981', '#A855F7'],
      });
    }
  }, [victoryModalOpen]);

  if (!victoryModalOpen || !victoryDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-game-panel border border-sky-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden text-center space-y-5">
        {/* Decorative background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Stars */}
        <div className="flex justify-center items-center gap-3 pt-2">
          {[1, 2, 3].map((starIdx) => {
            const isEarned = starIdx <= victoryDetails.stars;
            return (
              <div
                key={starIdx}
                className={`transition-all duration-500 transform ${
                  isEarned
                    ? 'scale-110 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                    : 'scale-90 text-slate-700'
                }`}
              >
                <Star className="w-10 h-10 fill-current" />
              </div>
            );
          })}
        </div>

        {/* Victory Title & Message */}
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
            QUEST COMPLETED!
          </h2>
          <p className="text-sm text-slate-300 px-4 leading-relaxed">
            {victoryDetails.message}
          </p>
        </div>

        {/* Rewards Box */}
        <div className="flex justify-center items-center gap-6 py-3 px-4 bg-slate-900/80 rounded-xl border border-slate-850">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <div className="text-left">
              <div className="text-[10px] uppercase text-slate-400 font-bold">Coins</div>
              <div className="text-base font-black text-amber-300">+{victoryDetails.coins}</div>
            </div>
          </div>

          <div className="w-px h-8 bg-slate-800" />

          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-sky-400" />
            <div className="text-left">
              <div className="text-[10px] uppercase text-slate-400 font-bold">EXP</div>
              <div className="text-base font-black text-sky-300">+{victoryDetails.xp} XP</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              closeVictoryModal();
              setScreen('world-map');
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 transition-colors"
          >
            <Map className="w-4 h-4" />
            <span>World Map</span>
          </button>

          {victoryDetails.nextLevelId ? (
            <button
              onClick={goToNextLevel}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-glow-forest transition-all"
            >
              <span>Next Level</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                closeVictoryModal();
                setScreen('world-map');
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-bold text-xs shadow-glow transition-all"
            >
              <span>Return to Map</span>
              <Map className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

