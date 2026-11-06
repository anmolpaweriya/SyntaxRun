import { create } from 'zustand';
import {
  LevelDefinition,
  LevelState,
  ExecutionResult,
  PlayerProgress,
  GameAction,
  Direction
} from '@/types/game';
import { allLevels, getLevelById, getNextLevel } from '@/engine/levels';
import { executePlayerCode } from '@/engine/executor';
import { sound } from '@/engine/audio';
import { heroesData } from '@/data/heroes';

const STORAGE_KEY = 'syntaxrun_player_save_v1';
const LEGACY_STORAGE_KEY = 'syntaxrun_player_save_v1';

const defaultProgress: PlayerProgress = {
  name: 'Cipher',
  selectedHeroId: 'hero-cipher',
  unlockedHeroes: ['hero-cipher'],
  totalXp: 0,
  totalCoins: 0,
  unlockedWorlds: ['forest'],
  currentWorldId: 'forest',
  currentLevelId: 'forest-1',
  completedLevels: {},
  hasCompletedTutorial: false,
  settings: {
    sfxVolume: 0.6,
    musicVolume: 0.3,
    editorTheme: 'vs-dark',
    editorFontSize: 14,
    playbackSpeed: 1,
    animationsEnabled: true,
  },
};

const loadInitialProgress = (): PlayerProgress => {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const unlockedHeroes = Array.isArray(parsed.unlockedHeroes) && parsed.unlockedHeroes.length > 0
        ? parsed.unlockedHeroes
        : ['hero-cipher'];
      return {
        ...defaultProgress,
        ...parsed,
        unlockedHeroes,
        selectedHeroId: unlockedHeroes.includes(parsed.selectedHeroId) ? parsed.selectedHeroId : 'hero-cipher',
      };
    }
  } catch (e) {
    console.error('Failed to load saved progress', e);
  }
  return defaultProgress;
};

const saveProgress = (progress: PlayerProgress) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
};

export type ScreenType =
  | 'landing'
  | 'player-setup'
  | 'dashboard'
  | 'world-map'
  | 'gameplay'
  | 'practice-arena';

interface GameStore {
  // Navigation & Screen state
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;

  // Player progress & settings
  progress: PlayerProgress;
  setPlayerName: (name: string) => void;
  selectHero: (heroId: string) => void;
  unlockHero: (heroId: string) => boolean;
  updateSettings: (newSettings: Partial<PlayerProgress['settings']>) => void;
  resetAllProgress: () => void;

  // Current level & editor
  currentLevel: LevelDefinition | null;
  levelState: LevelState | null;
  userCode: string;
  setUserCode: (code: string) => void;
  startLevel: (levelId: string) => void;
  resetLevel: () => void;

  // Execution & playback
  isRunning: boolean;
  isPaused: boolean;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  executionResult: ExecutionResult | null;
  currentStepIndex: number;
  highlightedLine: number | null;
  activeEditorTab: 'mission' | 'concept' | 'console' | 'hints';
  setActiveEditorTab: (tab: 'mission' | 'concept' | 'console' | 'hints') => void;

  // Run controls
  runCode: () => void;
  pauseExecution: () => void;
  resumeExecution: () => void;
  stepExecution: () => void;
  completeLevel: (stars: number, xp: number, coins: number) => void;

  // Victory modal
  victoryModalOpen: boolean;
  victoryDetails: {
    stars: number;
    xp: number;
    coins: number;
    message: string;
    nextLevelId?: string;
  } | null;
  closeVictoryModal: () => void;
  goToNextLevel: () => void;

  // Settings modal
  settingsModalOpen: boolean;
  setSettingsModalOpen: (open: boolean) => void;
}

export const useGameStore = create<GameStore>((set, get) => {
  const initialProgress = loadInitialProgress();

  return {
    screen: initialProgress.hasCompletedTutorial ? 'dashboard' : 'landing',
    setScreen: (screen) => {
      set({ screen });
      // Adaptive BGM trigger based on screen/world
      if (screen === 'gameplay' && get().currentLevel) {
        sound.startBgm(get().currentLevel!.worldId);
      } else if (screen === 'world-map' || screen === 'dashboard') {
        sound.startBgm('ambient');
      }
    },

    progress: initialProgress,
    setPlayerName: (name) => {
      const updated = { ...get().progress, name: name.trim() || 'Cipher' };
      saveProgress(updated);
      set({ progress: updated });
    },
    selectHero: (heroId) => {
      const { progress } = get();
      if (!progress.unlockedHeroes.includes(heroId)) return;
      const updated = { ...progress, selectedHeroId: heroId };
      saveProgress(updated);
      set({ progress: updated });
    },
    unlockHero: (heroId) => {
      const { progress } = get();
      const hero = heroesData.find((h) => h.id === heroId);
      if (!hero) return false;
      if (progress.unlockedHeroes.includes(heroId)) {
        get().selectHero(heroId);
        return true;
      }
      if (progress.totalCoins < hero.cost) {
        sound.playError();
        return false;
      }

      const updated = {
        ...progress,
        totalCoins: progress.totalCoins - hero.cost,
        unlockedHeroes: [...progress.unlockedHeroes, heroId],
        selectedHeroId: heroId,
      };
      sound.playVictory();
      saveProgress(updated);
      set({ progress: updated });
      return true;
    },
    updateSettings: (newSettings) => {
      const updated = {
        ...get().progress,
        settings: { ...get().progress.settings, ...newSettings },
      };
      if (newSettings.sfxVolume !== undefined) sound.setSfxVolume(newSettings.sfxVolume);
      if (newSettings.musicVolume !== undefined) sound.setBgmVolume(newSettings.musicVolume);
      saveProgress(updated);
      set({ progress: updated });
    },
    resetAllProgress: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
      set({ progress: defaultProgress, screen: 'landing' });
    },

    currentLevel: null,
    levelState: null,
    userCode: '',
    setUserCode: (code) => set({ userCode: code }),

    startLevel: (levelId) => {
      const level = getLevelById(levelId);
      if (!level) return;

      const savedCode = get().progress.completedLevels[levelId]?.code || level.startingCode;

      const initialLvlState: LevelState = {
        player: {
          x: level.playerStart.x,
          y: level.playerStart.y,
          direction: level.playerStart.direction,
          speed: 1,
          energy: 100,
          hasKey: false,
          keysCount: 0,
          collectedCoins: 0,
          inventory: [],
          variables: {},
        },
        tiles: JSON.parse(JSON.stringify(level.tiles)),
        items: JSON.parse(JSON.stringify(level.items)),
        boss: level.boss ? JSON.parse(JSON.stringify(level.boss)) : undefined,
        isExitReached: false,
        switchesActive: {},
        doorsUnlocked: {},
        logs: [],
        status: 'idle',
        stepCount: 0,
      };

      set({
        currentLevel: level,
        levelState: initialLvlState,
        userCode: savedCode,
        executionResult: null,
        isRunning: false,
        isPaused: false,
        currentStepIndex: 0,
        highlightedLine: null,
        activeEditorTab: 'mission',
        screen: 'gameplay',
        victoryModalOpen: false,
        victoryDetails: null,
      });

      sound.startBgm(level.worldId);
    },

    resetLevel: () => {
      const level = get().currentLevel;
      if (!level) return;

      const initialLvlState: LevelState = {
        player: {
          x: level.playerStart.x,
          y: level.playerStart.y,
          direction: level.playerStart.direction,
          speed: 1,
          energy: 100,
          hasKey: false,
          keysCount: 0,
          collectedCoins: 0,
          inventory: [],
          variables: {},
        },
        tiles: JSON.parse(JSON.stringify(level.tiles)),
        items: JSON.parse(JSON.stringify(level.items)),
        boss: level.boss ? JSON.parse(JSON.stringify(level.boss)) : undefined,
        isExitReached: false,
        switchesActive: {},
        doorsUnlocked: {},
        logs: [],
        status: 'idle',
        stepCount: 0,
      };

      set({
        levelState: initialLvlState,
        executionResult: null,
        isRunning: false,
        isPaused: false,
        currentStepIndex: 0,
        highlightedLine: null,
      });
    },

    isRunning: false,
    isPaused: false,
    playbackSpeed: 1,
    setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
    executionResult: null,
    currentStepIndex: 0,
    highlightedLine: null,
    activeEditorTab: 'mission',
    setActiveEditorTab: (tab) => set({ activeEditorTab: tab }),

    runCode: () => {
      const level = get().currentLevel;
      const initialLvlState = get().levelState;
      if (!level || !initialLvlState) return;

      // First reset level state cleanly
      get().resetLevel();

      // Execute code in sandboxed engine
      const result = executePlayerCode(get().userCode, initialLvlState);

      set({
        executionResult: result,
        isRunning: true,
        isPaused: false,
        currentStepIndex: 0,
      });

      // If syntax or runtime error occurred before actions
      if (!result.success && result.actions.length === 0) {
        sound.playError();
        set({
          isRunning: false,
          activeEditorTab: 'console',
          levelState: {
            ...initialLvlState,
            logs: result.logs,
            status: 'failed',
          },
        });
        return;
      }

      // Start action playback ticker
      const playStep = () => {
        const state = get();
        if (!state.isRunning || state.isPaused) return;

        const { executionResult, currentStepIndex, currentLevel, levelState } = state;
        if (!executionResult || !levelState) return;

        if (currentStepIndex >= executionResult.actions.length) {
          // Playback finished! Evaluate completion
          set({ isRunning: false, highlightedLine: null });

          let validation = { success: false, message: 'Objective not completed.', stars: 1 };
          if (currentLevel?.validateCompletion) {
            validation = currentLevel.validateCompletion(levelState);
          } else if (levelState.isExitReached) {
            validation = { success: true, message: 'Level completed!', stars: 3 };
          }

          if (validation.success) {
            sound.playVictory();
            get().completeLevel(validation.stars, currentLevel?.rewards.xp || 100, currentLevel?.rewards.coins || 50);
            const nextLvl = currentLevel ? getNextLevel(currentLevel.id) : undefined;
            set({
              victoryModalOpen: true,
              victoryDetails: {
                stars: validation.stars,
                xp: currentLevel?.rewards.xp || 100,
                coins: currentLevel?.rewards.coins || 50,
                message: validation.message,
                nextLevelId: nextLvl?.id,
              },
            });
          } else {
            sound.playError();
            set({
              levelState: {
                ...levelState,
                status: 'failed',
                logs: [
                  ...levelState.logs,
                  {
                    id: Math.random().toString(),
                    type: 'error',
                    text: validation.message,
                    timestamp: Date.now(),
                  },
                ],
              },
            });
          }
          return;
        }

        // Execute current action step
        const action: GameAction = executionResult.actions[currentStepIndex];
        const nextState = { ...levelState };

        switch (action.type) {
          case 'MOVE': {
            if (action.payload) {
              nextState.player.direction = action.payload.dir;
              nextState.player.x = action.payload.x;
              nextState.player.y = action.payload.y;
              sound.playStep();
            }
            break;
          }
          case 'COLLECT': {
            sound.playCoin();
            if (action.payload?.itemId) {
              const item = nextState.items.find((it) => it.id === action.payload.itemId);
              if (item) item.collected = true;
            } else {
              // Collect item at player coordinates
              const item = nextState.items.find(
                (it) => !it.collected && it.x === nextState.player.x && it.y === nextState.player.y
              );
              if (item) {
                item.collected = true;
                if (item.type === 'key') {
                  nextState.player.hasKey = true;
                  nextState.player.keysCount += 1;
                  sound.playKey();
                } else if (item.type === 'coin' || item.type === 'gem') {
                  nextState.player.collectedCoins += (item.value || 10);
                }
              }
            }
            break;
          }
          case 'OPEN_DOOR': {
            sound.playDoorOpen();
            nextState.doorsUnlocked['door'] = true;
            for (let r = 0; r < nextState.tiles.length; r++) {
              for (let c = 0; c < (nextState.tiles[0]?.length || 0); c++) {
                if (nextState.tiles[r][c] === 'door_locked') {
                  nextState.tiles[r][c] = 'door_open';
                }
              }
            }
            break;
          }
          case 'TOGGLE_SWITCH': {
            sound.playSwitch();
            const swKey = `switch_${nextState.player.x}_${nextState.player.y}`;
            nextState.switchesActive[swKey] = !nextState.switchesActive[swKey];
            if (nextState.switchesActive['switch_3_2'] && nextState.switchesActive['switch_5_3']) {
              for (let r = 0; r < nextState.tiles.length; r++) {
                for (let c = 0; c < (nextState.tiles[0]?.length || 0); c++) {
                  if (nextState.tiles[r][c] === 'laser_active') {
                    nextState.tiles[r][c] = 'empty';
                  }
                }
              }
            }
            break;
          }
          case 'ATTACK': {
            sound.playAttack();
            if (nextState.boss) {
              nextState.boss.hp = Math.max(0, nextState.boss.hp - 30);
            }
            break;
          }
          case 'CAST_SPELL': {
            sound.playLaser();
            if (nextState.boss) {
              nextState.boss.hp = Math.max(0, nextState.boss.hp - 35);
            }
            for (let r = 0; r < nextState.tiles.length; r++) {
              for (let c = 0; c < (nextState.tiles[0]?.length || 0); c++) {
                if (nextState.tiles[r][c] === 'brambles') {
                  nextState.tiles[r][c] = 'empty';
                }
              }
            }
            break;
          }
          case 'SET_SPEED': {
            if (action.payload?.speed) {
              nextState.player.speed = action.payload.speed;
            }
            break;
          }
        }

        // Check if player stepped on exit
        if (
          currentLevel?.exitPosition &&
          nextState.player.x === currentLevel.exitPosition.x &&
          nextState.player.y === currentLevel.exitPosition.y
        ) {
          nextState.isExitReached = true;
        }

        set({
          levelState: nextState,
          currentStepIndex: currentStepIndex + 1,
          highlightedLine: action.payload?.line || null,
        });

        // Delay until next step based on playbackSpeed & character speed
        const baseDelay = 400;
        const speedMultiplier = (state.playbackSpeed || 1) * (nextState.player.speed || 1);
        const delay = Math.max(50, Math.floor(baseDelay / speedMultiplier));

        setTimeout(playStep, delay);
      };

      // Kick off first step
      setTimeout(playStep, 100);
    },

    pauseExecution: () => set({ isPaused: true }),
    resumeExecution: () => {
      set({ isPaused: false });
      get().runCode();
    },
    stepExecution: () => {
      // Step by single action
    },

    completeLevel: (stars, xp, coins) => {
      const { currentLevel, progress, userCode } = get();
      if (!currentLevel) return;

      const levelId = currentLevel.id;
      const prevCompletion = progress.completedLevels[levelId];
      const isNewCompletion = !prevCompletion;

      const newStars = Math.max(prevCompletion?.stars || 0, stars);
      const earnedXp = isNewCompletion ? xp : Math.floor(xp * 0.2);
      const earnedCoins = isNewCompletion ? coins : Math.floor(coins * 0.2);

      const nextLevel = getNextLevel(levelId);
      const unlockedWorlds = [...progress.unlockedWorlds];
      if (nextLevel && !unlockedWorlds.includes(nextLevel.worldId)) {
        unlockedWorlds.push(nextLevel.worldId);
      }

      const updatedProgress: PlayerProgress = {
        ...progress,
        totalXp: progress.totalXp + earnedXp,
        totalCoins: progress.totalCoins + earnedCoins,
        hasCompletedTutorial: true,
        unlockedWorlds,
        completedLevels: {
          ...progress.completedLevels,
          [levelId]: {
            stars: newStars,
            bestSteps: 1,
            code: userCode,
            completedAt: Date.now(),
          },
        },
      };

      saveProgress(updatedProgress);
      set({ progress: updatedProgress });
    },

    victoryModalOpen: false,
    victoryDetails: null,
    closeVictoryModal: () => set({ victoryModalOpen: false }),
    goToNextLevel: () => {
      const nextId = get().victoryDetails?.nextLevelId;
      set({ victoryModalOpen: false });
      if (nextId) {
        get().startLevel(nextId);
      } else {
        set({ screen: 'world-map' });
      }
    },

    settingsModalOpen: false,
    setSettingsModalOpen: (open) => set({ settingsModalOpen: open }),
  };
});
