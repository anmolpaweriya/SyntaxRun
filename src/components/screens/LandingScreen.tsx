'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Play, Sparkles, Trophy, Compass, Code, Terminal, ChevronRight } from 'lucide-react';
import { heroesData } from '@/data/heroes';

export const LandingScreen: React.FC = () => {
  const { setScreen, progress } = useGameStore();

  const handleStartGame = () => {
    if (!progress.hasCompletedTutorial) {
      setScreen('player-setup');
    } else {
      setScreen('dashboard');
    }
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-game-bg flex flex-col justify-between select-none">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Navbar */}
      <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center shadow-glow">
            <Code className="w-6 h-6 text-slate-950 font-black" />
          </div>
          <div>
            <span className="text-xl font-black tracking-wider text-slate-100">SYNTAX</span>
            <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
              RUN
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('practice-arena')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Practice Arena</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col items-center text-center space-y-8 my-auto">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-sky-500/40 text-xs text-sky-300 shadow-glow">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Learn JavaScript by Playing an Epic 2D Adventure</span>
        </div>

        {/* Cinematic Title */}
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-slate-100 max-w-3xl leading-none">
          YOUR CODE IS YOUR{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
            CONTROLLER.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
          Embark on a grand quest through seven distinct worlds. Master variables, logical branches, loops, functions, and algorithms by writing genuine JavaScript to overcome challenges and defeat bosses!
        </p>

        {/* Main CTA Play Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button
            onClick={handleStartGame}
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 hover:from-sky-400 hover:to-emerald-300 text-slate-950 font-black text-lg shadow-glow hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{progress.hasCompletedTutorial ? 'CONTINUE ADVENTURE' : 'START YOUR QUEST'}</span>
          </button>

          <button
            onClick={() => setScreen('world-map')}
            className="flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all hover:border-sky-500/50"
          >
            <Compass className="w-4 h-4 text-sky-400" />
            <span>Explore World Map</span>
          </button>
        </div>

        {/* Hero Characters Preview Cards */}
        <div className="pt-10 w-full">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Choose Your Coding Hero
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {heroesData.map((hero) => (
              <div
                key={hero.id}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-600 transition-all flex flex-col items-center space-y-2 group"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform">
                  {hero.avatarIcon}
                </div>
                <div className="text-sm font-bold text-slate-200">{hero.name}</div>
                <div className="text-[11px] text-slate-400">{hero.title}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        SyntaxRun • In-Browser Educational Game Engine • Real JavaScript Execution Sandbox
      </footer>
    </div>
  );
};

