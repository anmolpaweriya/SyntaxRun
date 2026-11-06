'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameHUD } from '@/components/game/GameHUD';
import { GameCanvas } from '@/components/game/GameCanvas';
import { CodeEditor } from '@/components/game/CodeEditor';
import { MissionObjectives } from '@/components/game/MissionObjectives';
import { ConceptGuide } from '@/components/game/ConceptGuide';
import { GameConsole } from '@/components/game/GameConsole';
import { HintsDrawer } from '@/components/game/HintsDrawer';
import { LevelVictoryModal } from '@/components/game/LevelVictoryModal';
import { Target, BookOpen, Terminal, HelpCircle } from 'lucide-react';

export const GameplayScreen: React.FC = () => {
  const { currentLevel, activeEditorTab, setActiveEditorTab, levelState } = useGameStore();

  if (!currentLevel) return null;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-game-bg">
      {/* Top Header HUD */}
      <GameHUD />

      {/* Main Split Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left / Top: 2D Game World View */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative border-b lg:border-b-0 lg:border-r border-game-border overflow-hidden">
          <GameCanvas />
        </div>

        {/* Right / Bottom: Code Editor & Tabbed Panels */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col bg-slate-950 overflow-hidden">
          {/* Top Half of Right Pane: Monaco Editor */}
          <div className="h-[60%] w-full relative">
            <CodeEditor />
          </div>

          {/* Bottom Half of Right Pane: Tab Navigation & Content */}
          <div className="h-[40%] flex flex-col bg-slate-900/90 border-t border-slate-800">
            {/* Tab Bar */}
            <div className="flex items-center px-2 bg-slate-950 border-b border-slate-800 text-xs">
              <button
                onClick={() => setActiveEditorTab('mission')}
                className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-semibold transition-colors ${
                  activeEditorTab === 'mission'
                    ? 'border-sky-400 text-sky-400 bg-slate-900/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Mission</span>
              </button>

              <button
                onClick={() => setActiveEditorTab('concept')}
                className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-semibold transition-colors ${
                  activeEditorTab === 'concept'
                    ? 'border-sky-400 text-sky-400 bg-slate-900/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Concept Guide</span>
              </button>

              <button
                onClick={() => setActiveEditorTab('console')}
                className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-semibold transition-colors relative ${
                  activeEditorTab === 'console'
                    ? 'border-sky-400 text-sky-400 bg-slate-900/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Console</span>
                {levelState?.logs && levelState.logs.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-sky-400 inline-block ml-0.5" />
                )}
              </button>

              <button
                onClick={() => setActiveEditorTab('hints')}
                className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-semibold transition-colors ${
                  activeEditorTab === 'hints'
                    ? 'border-amber-400 text-amber-400 bg-slate-900/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Hints</span>
              </button>
            </div>

            {/* Tab Panel Content Container */}
            <div className="flex-1 overflow-y-auto">
              {activeEditorTab === 'mission' && <MissionObjectives />}
              {activeEditorTab === 'concept' && <ConceptGuide />}
              {activeEditorTab === 'console' && <GameConsole />}
              {activeEditorTab === 'hints' && <HintsDrawer />}
            </div>
          </div>
        </div>
      </div>

      {/* Victory Celebration Modal */}
      <LevelVictoryModal />
    </div>
  );
};

