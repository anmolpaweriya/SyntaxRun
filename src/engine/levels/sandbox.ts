import { LevelDefinition } from '@/types/game';

export const createSandboxLevel = (worldId = 'forest'): LevelDefinition => {
  return {
    id: `sandbox-${worldId}`,
    worldId,
    worldName: 'Practice Arena',
    worldIndex: 0,
    levelNumber: 0,
    title: 'Free-Play Practice Arena',
    subtitle: 'Code Playground Sandbox',
    storyIntro: 'An open training simulation ground. Test your JavaScript code, write loops, define functions, and experiment freely with all game APIs!',
    concept: {
      topic: 'JavaScript Free-Play Playground',
      summary: 'Experiment with variables, loops, conditionals, objects, and algorithms with no restrictions.',
      explanation: 'Use any SyntaxRun functions: moveRight(), moveLeft(), moveUp(), moveDown(), collectCoin(), toggleSwitch(), openDoor(), setSpeed(), console.log().',
      codeSnippet: `for (let i = 0; i < 5; i++) {\n  moveRight(1);\n  collectCoin();\n}`,
      tips: [
        'Use console.log() to print variables and debug.',
        'Use setSpeed(3) to accelerate your hero.',
      ],
    },
    objectivesText: [
      'Experiment with any JavaScript code in the editor',
      'Collect coins, test commands, or reach the practice portal',
    ],
    startingCode: `// Welcome to the Practice Arena!
// Try writing a loop to collect all 5 coins:
for (let i = 0; i < 5; i++) {
  moveRight(1);
  collectCoin();
}

console.log("Practice coins collected:", getCoins());
`,
    hints: [
      'Write any valid JavaScript code and click "Run Code"!',
    ],
    allowedFunctions: [
      'moveRight', 'moveLeft', 'moveUp', 'moveDown', 'moveForward', 
      'turnLeft', 'turnRight', 'collectCoin', 'openDoor', 'toggleSwitch', 
      'attack', 'castSpell', 'setSpeed', 'hasKey', 'isPathClear', 'getCoins', 'getPosition', 'console.log'
    ],
    gridWidth: 9,
    gridHeight: 6,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 7, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'exit', 'wall'],
      ['wall', 'empty', 'empty', 'switch_off', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [
      { id: 'sb_c1', type: 'coin', x: 2, y: 2, value: 10 },
      { id: 'sb_c2', type: 'coin', x: 3, y: 2, value: 10 },
      { id: 'sb_c3', type: 'coin', x: 4, y: 2, value: 10 },
      { id: 'sb_c4', type: 'coin', x: 5, y: 2, value: 10 },
      { id: 'sb_c5', type: 'gem', x: 6, y: 2, value: 50 },
    ],
    rewards: { xp: 50, coins: 20 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 7 && state.player.y === 2;
      return {
        success: atExit,
        message: 'Practice run completed! Well done experimenting!',
        stars: 3,
      };
    },
  };
};

