'use client';

import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { LandingScreen } from '@/components/screens/LandingScreen';
import { PlayerSetupModal } from '@/components/screens/PlayerSetupModal';
import { DashboardScreen } from '@/components/screens/DashboardScreen';
import { WorldMapScreen } from '@/components/screens/WorldMapScreen';
import { GameplayScreen } from '@/components/screens/GameplayScreen';
import { PracticeArenaScreen } from '@/components/screens/PracticeArenaScreen';
import { SettingsModal } from '@/components/screens/SettingsModal';

export default function Home() {
  const { screen } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen w-screen bg-[#0B0F19] flex items-center justify-center text-slate-400 font-mono text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
          <span>Booting SyntaxRun Engine...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-game-bg text-slate-100 font-game">
      {screen === 'landing' && <LandingScreen />}
      {screen === 'player-setup' && <PlayerSetupModal />}
      {screen === 'dashboard' && <DashboardScreen />}
      {screen === 'world-map' && <WorldMapScreen />}
      {screen === 'gameplay' && <GameplayScreen />}
      {screen === 'practice-arena' && <PracticeArenaScreen />}

      {/* Persistent Global Modals */}
      <SettingsModal />
    </div>
  );
}
