import { LevelDefinition } from '@/types/game';

export const loopMountainsLevels: LevelDefinition[] = [
  {
    id: 'mountains-1',
    worldId: 'mountains',
    worldName: 'Loop Mountains',
    worldIndex: 3,
    levelNumber: 1,
    title: 'The Staircase of Repetition',
    subtitle: 'The Classic for Loop',
    storyIntro: 'A mountain stairway ascends into the icy clouds. Don\'t write repeated code—use a `for` loop to march your hero forward and collect coins!',
    concept: {
      topic: 'The `for` Loop',
      summary: 'A `for` loop repeats a block of code a specified number of times.',
      explanation: 'Syntax: `for (let i = 0; i < count; i++) { ... }`.',
      codeSnippet: `for (let i = 0; i < 5; i++) {\n  moveRight(1);\n  collectCoin();\n}`,
      tips: [
        'Loops save time and eliminate repetitive code.',
      ],
    },
    objectivesText: [
      'Write a `for` loop to collect all 5 coins along the path',
      'Reach the summit portal at (6, 2)',
    ],
    startingCode: `// Mission: Use a for loop to repeat moveRight(1) and collectCoin() 5 times!
// Syntax: for (let i = 0; i < 5; i++) { ... }
// Write your loop below:

`,
    hints: [
      'Write `for (let i = 0; i < 5; i++) { moveRight(1); collectCoin(); }`.',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'collectCoin'],
    gridWidth: 8,
    gridHeight: 5,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 6, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'exit', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [
      { id: 'c1', type: 'coin', x: 2, y: 2, value: 10 },
      { id: 'c2', type: 'coin', x: 3, y: 2, value: 10 },
      { id: 'c3', type: 'coin', x: 4, y: 2, value: 10 },
      { id: 'c4', type: 'coin', x: 5, y: 2, value: 10 },
      { id: 'c5', type: 'coin', x: 6, y: 2, value: 10 },
    ],
    rewards: { xp: 500, coins: 150 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 6;
      return {
        success: atExit,
        message: atExit ? '5 coins collected in just 4 lines of code! Loops are magnificent!' : 'Use the for loop to reach the summit.',
        stars: 3,
      };
    },
  },

  {
    id: 'mountains-2',
    worldId: 'mountains',
    worldName: 'Loop Mountains',
    worldIndex: 3,
    levelNumber: 2,
    title: 'March of the while Loop',
    subtitle: 'Iterating While Path is Clear',
    storyIntro: 'Mountain fog obscures how far the path extends. A `while` loop continues running as long as its condition remains `true`!',
    concept: {
      topic: 'The `while` Loop',
      summary: 'A `while` loop runs indefinitely until its condition becomes false.',
      explanation: 'Use `while (isPathClear()) { moveRight(1); collectCoin(); }`. `isPathClear()` returns false when a wall is reached.',
      codeSnippet: `while (isPathClear()) {\n  moveRight(1);\n  collectCoin();\n}`,
      tips: [
        'Always ensure the condition eventually becomes false to prevent an infinite loop!',
      ],
    },
    objectivesText: [
      'Use `while (isPathClear())` to traverse the foggy mountain pass',
      'Reach the summit archway at (6, 2)',
    ],
    startingCode: `// Mission: Use a while loop with isPathClear() to advance until reaching the summit wall!
// Available functions: while (isPathClear()) { ... }, moveRight(1), collectCoin()
// Write your code below:

`,
    hints: [
      'Write `while (isPathClear()) { moveRight(1); collectCoin(); }`.',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'collectCoin', 'isPathClear'],
    gridWidth: 8,
    gridHeight: 5,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 6, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'exit', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [
      { id: 'c1', type: 'gem', x: 3, y: 2, value: 50 },
      { id: 'c2', type: 'gem', x: 5, y: 2, value: 50 },
    ],
    rewards: { xp: 550, coins: 160 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 6;
      return {
        success: atExit,
        message: atExit ? 'The while loop guided you through the thick mountain mist!' : 'Traverse the pass using the while loop.',
        stars: 3,
      };
    },
  },

  {
    id: 'mountains-3',
    worldId: 'mountains',
    worldName: 'Loop Mountains',
    worldIndex: 3,
    levelNumber: 3,
    title: 'The `break` Statement',
    subtitle: 'Escaping the Endless Path',
    storyIntro: 'Stop the loop immediately when you find the Frost Rune at (4, 2) using the `break` statement.',
    concept: {
      topic: 'The `break` Keyword',
      summary: '`break` immediately exits a loop, skipping any remaining iterations.',
      explanation: 'Inside a loop, write `if (hasKey()) break;` to break out early as soon as an objective is reached.',
      codeSnippet: `for (let i = 0; i < 20; i++) {\n  moveRight(1);\n  collectCoin();\n  if (hasKey()) break;\n}`,
      tips: [
        '`break` only terminates the innermost loop enclosing it.',
      ],
    },
    objectivesText: [
      'Loop forward through the pass',
      'Use `if (hasKey()) break;` upon collecting the rune',
      'Reach the portal at (5, 2)',
    ],
    startingCode: `// Mission: Loop forward, collect items, and break early when hasKey() is true!
// Then step into the exit portal at (5, 2).
// Write your code below:

`,
    hints: [
      'for (let i = 0; i < 20; i++) { moveRight(1); collectCoin(); if (hasKey()) break; } moveRight(1);',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'collectCoin', 'hasKey'],
    gridWidth: 7,
    gridHeight: 5,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 5, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'exit', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [
      { id: 'k1', type: 'key', x: 4, y: 2, label: 'Frost Rune' },
    ],
    rewards: { xp: 600, coins: 180 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'Break statement successfully terminated the loop!' : 'Collect the Frost Rune and break out to exit.',
        stars: 3,
      };
    },
  },

  {
    id: 'mountains-4',
    worldId: 'mountains',
    worldName: 'Loop Mountains',
    worldIndex: 3,
    levelNumber: 4,
    title: 'Nested Loops in 2D',
    subtitle: 'The Mountain Terrace Grid',
    storyIntro: 'An entire terrace of gems is laid out in rows. Sweep across both rows using loops!',
    concept: {
      topic: 'Nested Loops & Multi-Row Iteration',
      summary: 'Loops allow sweeping across multiple rows and columns in a 2D environment.',
      explanation: 'Use loops to traverse row 1, descend, and traverse row 2.',
      codeSnippet: `for (let c = 0; c < 3; c++) {\n  moveRight(1);\n  collectCoin();\n}`,
      tips: [
        'Organize movement row-by-row.',
      ],
    },
    objectivesText: [
      'Collect all crystals across the terrace',
      'Reach the mountain gateway at (5, 2)',
    ],
    startingCode: `// Mission: Use loops to sweep row 1, drop down to row 2, and sweep the remaining gems!
// Available functions: moveRight(steps), moveDown(steps), moveLeft(steps), collectCoin()
// Write your code below:

`,
    hints: [
      'Loop 3 times right and collect row 1. Move down 1, left 2, then loop 3 times to collect row 2 and reach the exit!',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'collectCoin'],
    gridWidth: 7,
    gridHeight: 5,
    playerStart: { x: 1, y: 1, direction: 'right' },
    exitPosition: { x: 5, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'exit', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [
      { id: 'c1', type: 'gem', x: 2, y: 1, value: 25 },
      { id: 'c2', type: 'gem', x: 3, y: 1, value: 25 },
      { id: 'c3', type: 'gem', x: 4, y: 1, value: 25 },
      { id: 'c4', type: 'gem', x: 2, y: 2, value: 25 },
      { id: 'c5', type: 'gem', x: 3, y: 2, value: 25 },
      { id: 'c6', type: 'gem', x: 4, y: 2, value: 25 },
    ],
    rewards: { xp: 650, coins: 200 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'Terrace cleared with loops!' : 'Sweep the grid and reach the exit.',
        stars: 3,
      };
    },
  },

  {
    id: 'mountains-5',
    worldId: 'mountains',
    worldName: 'Loop Mountains',
    worldIndex: 3,
    levelNumber: 5,
    title: 'BOSS: The Infinite Hydra',
    subtitle: 'The Beast of Many Cycles',
    storyIntro: 'At the summit awaits The Infinite Hydra (150 HP)! Strike 5 times in rapid succession using a `for` loop to sever all heads!',
    concept: {
      topic: 'Boss Encounter: High-Frequency Loops',
      summary: 'Defeat multi-phase bosses by running loops of attacks.',
      explanation: 'The Hydra has 150 HP. Strike it 5 times using a loop of attacks to conquer the mountain!',
      codeSnippet: `for (let i = 0; i < 5; i++) {\n  attack(); // Deals 30 damage\n}`,
      tips: [
        'Loops execute consecutive attacks cleanly without code duplication.',
      ],
    },
    objectivesText: [
      'Approach the Hydra at (4, 2)',
      'Run a `for` loop executing 5 attacks to vanquish all Hydra heads',
      'Enter the victory portal to World 4: Function Castle!',
    ],
    startingCode: `// Mission: Approach the Hydra at (4, 2) and use a for loop to strike it 5 times!
// Available functions: moveRight(steps), attack()
// Write your code below:

`,
    hints: [
      'Move right 2. Write `for (let i = 0; i < 5; i++) { attack(); }` then move right 2 to exit.',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'attack', 'castSpell'],
    gridWidth: 7,
    gridHeight: 5,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 5, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'exit', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [],
    boss: {
      id: 'boss-hydra',
      name: 'The Infinite Hydra',
      title: 'Serpent of Endless Iterations',
      hp: 150,
      maxHp: 150,
      x: 4,
      y: 2,
      color: '#0284C7',
      weakness: 'loop',
      dialogue: [
        'CUT ONE HEAD, TWO SHALL TAKE ITS PLACE!',
        'YOUR CODE RUNS IN CIRCLES!',
        'NOOO... TOO FAST! MY HEADS CANNOT REGENERATE!',
      ],
    },
    rewards: { xp: 800, coins: 400 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 4;
      return {
        success: atExit,
        message: 'The Infinite Hydra dissolves into frozen mist! World 4: Function Castle unlocked!',
        stars: 3,
      };
    },
  },
];
