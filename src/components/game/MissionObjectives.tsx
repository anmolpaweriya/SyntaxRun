'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Target, CheckCircle2, Circle, Scroll } from 'lucide-react';

export const MissionObjectives: React.FC = () => {
  const { currentLevel, levelState } = useGameStore();

  if (!currentLevel) return null;

  return (
    <div className="p-4 space-y-4 text-sm text-slate-300 overflow-y-auto max-h-full">
      {/* Story Intro */}
      <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 flex gap-3">
        <Scroll className="w-5 h-5 text-game-accent shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider text-game-accent">
            Adventure Mission
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            "{currentLevel.storyIntro}"
          </p>
        </div>
      </div>

      {/* Objectives Checklist */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Target className="w-4 h-4 text-amber-400" />
          <span>Objectives</span>
        </div>

        <div className="space-y-1.5">
          {currentLevel.objectivesText.map((obj, idx) => {
            // Check if objective is reached dynamically
            let isDone = false;
            if (idx === 0 && levelState?.items.every((it) => it.collected)) isDone = true;
            if (idx === currentLevel.objectivesText.length - 1 && levelState?.isExitReached) isDone = true;

            return (
              <div
                key={idx}
                className={`flex items-start gap-2.5 p-2 rounded-md border transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-300'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                )}
                <span className="text-xs">{obj}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Allowed APIs */}
      <div className="pt-2 border-t border-slate-800">
        <div className="text-xs font-semibold text-slate-400 mb-2">Available Game Commands:</div>
        <div className="flex flex-wrap gap-1.5">
          {currentLevel.allowedFunctions.map((fn) => (
            <code
              key={fn}
              className="px-2 py-0.5 bg-slate-800 text-sky-400 rounded text-[11px] font-mono border border-slate-700/60"
            >
              {fn}()
            </code>
          ))}
        </div>
      </div>
    </div>
  );
};

