export type Direction = 'up' | 'down' | 'left' | 'right';

export type TileType = 
  | 'empty' 
  | 'wall' 
  | 'water' 
  | 'hazard' 
  | 'exit' 
  | 'door_locked' 
  | 'door_open' 
  | 'switch_on' 
  | 'switch_off'
  | 'laser_active'
  | 'ice'
  | 'terminal'
  | 'brambles';

export type ItemType = 
  | 'coin' 
  | 'key' 
  | 'gem' 
  | 'switch' 
  | 'chest' 
  | 'obstacle' 
  | 'crystal' 
  | 'boss'
  | 'potion'
  | 'battery'
  | 'data_shard';

export interface GridItem {
  id: string;
  type: ItemType;
  x: number;
  y: number;
  collected?: boolean;
  active?: boolean;
  value?: any;
  label?: string;
  color?: string;
  properties?: Record<string, any>;
}

export interface BossEntity {
  id: string;
  name: string;
  title: string;
  hp: number;
  maxHp: number;
  x: number;
  y: number;
  color: string;
  weakness: string;
  dialogue: string[];
}

export interface GridPosition {
  x: number;
  y: number;
}

export interface LevelConcept {
  topic: string;
  summary: string;
  explanation: string;
  codeSnippet: string;
  tips: string[];
}

export interface LevelDefinition {
  id: string;
  worldId: string;
  worldName: string;
  worldIndex: number;
  levelNumber: number;
  title: string;
  subtitle: string;
  storyIntro: string;
  concept: LevelConcept;
  objectivesText: string[];
  startingCode: string;
  hints: string[];
  allowedFunctions: string[];
  gridWidth: number;
  gridHeight: number;
  playerStart: {
    x: number;
    y: number;
    direction: Direction;
  };
  exitPosition?: GridPosition;
  tiles: TileType[][];
  items: GridItem[];
  boss?: BossEntity;
  rewards: {
    xp: number;
    coins: number;
  };
  maxSteps?: number;
  timeLimitMs?: number;
  validateCompletion?: (state: LevelState) => { success: boolean; message: string; stars: number };
}

export interface LevelState {
  player: {
    x: number;
    y: number;
    direction: Direction;
    speed: number;
    energy: number;
    hasKey: boolean;
    keysCount: number;
    collectedCoins: number;
    inventory: string[];
    variables: Record<string, any>;
  };
  tiles: TileType[][];
  items: GridItem[];
  boss?: BossEntity;
  isExitReached: boolean;
  switchesActive: Record<string, boolean>;
  doorsUnlocked: Record<string, boolean>;
  logs: ConsoleMessage[];
  status: 'idle' | 'running' | 'paused' | 'completed' | 'failed';
  stepCount: number;
}

export interface ConsoleMessage {
  id: string;
  type: 'log' | 'info' | 'warn' | 'error' | 'success';
  text: string;
  timestamp: number;
  line?: number;
}

export type ActionType = 
  | 'MOVE' 
  | 'COLLECT' 
  | 'OPEN_DOOR' 
  | 'TOGGLE_SWITCH' 
  | 'ATTACK' 
  | 'SET_SPEED' 
  | 'WAIT' 
  | 'CAST_SPELL' 
  | 'INSPECT' 
  | 'LOG' 
  | 'ERROR';

export interface GameAction {
  type: ActionType;
  payload?: any;
  line?: number;
  description?: string;
}

export interface ExecutionResult {
  success: boolean;
  actions: GameAction[];
  logs: ConsoleMessage[];
  error?: {
    name: string;
    message: string;
    line?: number;
    friendlyExplanation: string;
  };
  totalSteps: number;
}

export interface CharacterHero {
  id: string;
  name: string;
  title: string;
  description: string;
  color: string;
  accent: string;
  avatarIcon: string;
  cost: number;
  unlockedByDefault: boolean;
}

export interface PlayerProgress {
  name: string;
  selectedHeroId: string;
  unlockedHeroes: string[];
  totalXp: number;
  totalCoins: number;
  unlockedWorlds: string[];
  currentWorldId: string;
  currentLevelId: string;
  completedLevels: Record<string, {
    stars: number;
    bestSteps: number;
    code: string;
    completedAt: number;
  }>;
  hasCompletedTutorial: boolean;
  settings: {
    sfxVolume: number;
    musicVolume: number;
    editorTheme: 'vs-dark' | 'vs-light' | 'hc-black';
    editorFontSize: number;
    playbackSpeed: number;
    animationsEnabled: boolean;
  };
}
