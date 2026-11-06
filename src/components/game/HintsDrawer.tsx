'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { HelpCircle, ChevronRight, Sparkles } from 'lucide-react';

export const HintsDrawer: React.FC = () => {
  const { currentLevel } = useGameStore();
  const [revealedCount, setRevealedCount] = useState(1);

  if (!currentLevel) return null;

  const hints = currentLevel.hints;

  return (
    <div className="p-4 space-y-4 text-sm text-slate-300 overflow-y-auto max-h-full">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
        <HelpCircle className="w-4 h-4 text-amber-400" />
        <h3 className="font-semibold text-slate-100 text-sm">Need a Hint?</h3>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        If you are feeling stuck, unlock progressive hints one by one to guide your solution.
      </p>

      <div className="space-y-2.5">
        {hints.map((hint, idx) => {
          const isRevealed = idx < revealedCount;
          return (
            <div
              key={idx}
              className={`p-3 rounded-lg border transition-all ${
                isRevealed
                  ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                  : 'bg-slate-900/30 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-amber-400">Hint {idx + 1}</span>
                {isRevealed && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              {isRevealed ? (
                <p className="text-xs text-slate-200 leading-relaxed">{hint}</p>
              ) : (
                <div className="text-xs italic text-slate-500">Locked hint</div>
              )}
            </div>
          );
        })}
      </div>

      {revealedCount < hints.length && (
        <button
          onClick={() => setRevealedCount((c) => c + 1)}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-semibold transition-colors border border-slate-700"
        >
          <span>Unlock Next Hint</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

