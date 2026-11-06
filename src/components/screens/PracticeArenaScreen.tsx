'use client';

import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameCanvas } from '@/components/game/GameCanvas';
import { CodeEditor } from '@/components/game/CodeEditor';
import { GameConsole } from '@/components/game/GameConsole';
import { ArrowLeft, Sparkles, Terminal, Code2, RotateCcw, Palette, Play, Zap } from 'lucide-react';

const worldThemes = [
  { id: 'forest', name: '🌿 Forest' },
  { id: 'dungeon', name: '🔥 Dungeon' },
  { id: 'mountains', name: '❄️ Mountains' },
  { id: 'castle', name: '🏰 Castle' },
  { id: 'factory', name: '⚙️ Factory' },
  { id: 'cyber', name: '⚡ Cyber City' },
  { id: 'algo', name: '✨ Algorithm' },
];

const sandboxPresets: { label: string; code: string }[] = [
  {
    label: 'Loop Coin Collector',
    code: `// Collect coins across a 5-tile path using a loop
for (let i = 0; i < 5; i++) {
  moveRight(1);
  collectCoin();
}
console.log("Coins collected:", getCoins());
`,
  },
  {
    label: 'While Path Clear',
    code: `// Walk forward until encountering an obstacle
while (isPathClear()) {
  moveRight(1);
  collectCoin();
}
console.log("Reached boundary at:", getPosition());
`,
  },
  {
    label: 'Array Traversal',
    code: `// Define movement steps in an array
const moves = [1, 2, 1, 1];

for (const dist of moves) {
  moveRight(dist);
  collectCoin();
}
console.log("Array traversal complete!");
`,
  },
  {
    label: 'Object Robot Protocol',
    code: `// Control character with an object method
const bot = {
  speed: 3,
  sweep: function(steps) {
    setSpeed(this.speed);
    for (let i = 0; i < steps; i++) {
      moveRight(1);
      collectCoin();
    }
  }
};

bot.sweep(5);
`,
  },
];

export const PracticeArenaScreen: React.FC = () => {
  const { setScreen, startLevel, setUserCode, currentLevel, resetLevel } = useGameStore();
  const [selectedTheme, setSelectedTheme] = useState('forest');

  // Ensure sandbox is initialized when entering practice arena
  useEffect(() => {
    if (!currentLevel || !currentLevel.id.startsWith('sandbox')) {
      startLevel(`sandbox-${selectedTheme}`);
    }
  }, [currentLevel, selectedTheme, startLevel]);

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    startLevel(`sandbox-${themeId}`);
  };

  const handleApplyPreset = (code: string) => {
    setUserCode(code);
    resetLevel();
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-game-bg select-none">
      {/* Top Header */}
      <header className="h-14 bg-game-panel border-b border-game-border px-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('dashboard')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              Practice Arena
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">Free-Play Sandbox</span>
          </div>
        </div>

        {/* Theme Picker & Presets */}
        <div className="flex items-center gap-2">
          {/* World Theme selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 px-2 py-1 rounded-md text-xs">
            <Palette className="w-3.5 h-3.5 text-sky-400" />
            <select
              value={selectedTheme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="bg-transparent border-none text-xs text-slate-200 focus:ring-0 cursor-pointer"
            >
              {worldThemes.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Presets */}
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-semibold ml-1">Presets:</span>
            {sandboxPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset.code)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-medium transition-colors border border-slate-700"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Split Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: 2D Game Canvas */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative border-b lg:border-b-0 lg:border-r border-game-border overflow-hidden">
          <GameCanvas />
        </div>

        {/* Right: Monaco Editor + Live Console */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col bg-slate-950 overflow-hidden">
          <div className="h-[65%] w-full relative">
            <CodeEditor />
          </div>

          <div className="h-[35%] flex flex-col bg-slate-900 border-t border-slate-800">
            <GameConsole />
          </div>
        </div>
      </div>
    </div>
  );
};
