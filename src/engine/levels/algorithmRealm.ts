import { LevelDefinition } from '@/types/game';

export const algorithmRealmLevels: LevelDefinition[] = [
  {
    id: 'algo-1',
    worldId: 'algo',
    worldName: 'Algorithm Realm',
    worldIndex: 7,
    levelNumber: 1,
    title: 'Arrays of Destiny',
    subtitle: 'Indexing and Traversal',
    storyIntro: 'Traverse the sequence of coordinates stored in an array!',
    concept: {
      topic: 'Arrays and Indexing',
      summary: 'Arrays store ordered lists of items. Access elements using zero-based index `array[i]`.',
      explanation: 'Define: `const steps = [2, 2];`. Iterate using `for...of` or a loop.',
      codeSnippet: `const steps = [2, 2];\nfor (const s of steps) {\n  moveRight(s);\n  collectCoin();\n}`,
      tips: [
        'Array indices start at 0: `steps[0]` is the first item.',
      ],
    },
    objectivesText: [
      'Iterate through the array of movements',
      'Collect celestial shards and reach the exit at (5, 2)',
    ],
    startingCode: `// Mission: Define an array \`const steps = [2, 2];\` and iterate over it with a loop!
// Move and collect shards at each destination.
// Write your code below:

`,
    hints: [
      'const steps = [2, 2]; for (const s of steps) { moveRight(s); collectCoin(); } moveRight(1);',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'collectCoin'],
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
      { id: 's1', type: 'gem', x: 3, y: 2, value: 100 },
      { id: 's2', type: 'gem', x: 5, y: 2, value: 100 },
    ],
    rewards: { xp: 1400, coins: 500 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'Array indexed and navigated with total mastery!' : 'Collect shards and reach the exit.',
        stars: 3,
      };
    },
  },

  {
    id: 'algo-2',
    worldId: 'algo',
    worldName: 'Algorithm Realm',
    worldIndex: 7,
    levelNumber: 2,
    title: 'Map, Filter & Reduce',
    subtitle: 'Functional Array Transformation',
    storyIntro: 'An array of raw crystal powers needs filtering! Discard negative values with `.filter()` and calculate the total distance with `.reduce()`.',
    concept: {
      topic: 'Array Methods: filter() and reduce()',
      summary: '`.filter()` creates a new array with elements that pass a test. `.reduce()` accumulates elements into a single value.',
      explanation: 'Use `array.filter(x => x > 0)` and `array.reduce((acc, x) => acc + x, 0)`.',
      codeSnippet: `const raw = [2, -10, 2];\nconst clean = raw.filter(n => n > 0);\nconst total = clean.reduce((sum, n) => sum + n, 0); // 4\nmoveRight(total);`,
      tips: [
        'Functional methods do not mutate the original array.',
      ],
    },
    objectivesText: [
      'Filter out negative numbers from `data = [2, -10, 2]`',
      'Sum the valid distances with `.reduce()`',
      'Advance to the stellar nexus at (5, 2)',
    ],
    startingCode: `const data = [2, -10, 2];

// Mission: Filter out negative numbers and sum the positive steps with reduce()!
// Then call moveRight(totalSteps) to reach the portal.
// Write your code below:

`,
    hints: [
      'const clean = data.filter(n => n > 0); const total = clean.reduce((a, b) => a + b, 0); moveRight(total);',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown'],
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
    rewards: { xp: 1600, coins: 600 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'Functional data pipelines are breathtakingly elegant!' : 'Reach the portal tile.',
        stars: 3,
      };
    },
  },

  {
    id: 'algo-3',
    worldId: 'algo',
    worldName: 'Algorithm Realm',
    worldIndex: 7,
    levelNumber: 3,
    title: 'The Mirror of Recursion',
    subtitle: 'Functions Calling Themselves',
    storyIntro: 'A cosmic labyrinth folds in on itself! Solve the path using a recursive function that stops at a base case.',
    concept: {
      topic: 'Recursion',
      summary: 'A recursive function solves a problem by calling itself with smaller inputs until reaching a base condition.',
      explanation: 'Every recursive function MUST have a base condition to avoid a call stack overflow!',
      codeSnippet: `function stepRecursively(count) {\n  if (count <= 0) return;\n  moveRight(1);\n  stepRecursively(count - 1);\n}\nstepRecursively(4);`,
      tips: [
        'Always check the base condition first.',
      ],
    },
    objectivesText: [
      'Write a recursive navigation function',
      'Reach the base case after traversing 4 tiles',
      'Step into the portal at (5, 2)',
    ],
    startingCode: `// Mission: Write a recursive function 'recurseStep(remaining)' that moves right until remaining <= 0!
// Then invoke recurseStep(4).
// Write your code below:

`,
    hints: [
      'function recurse(n) { if (n <= 0) return; moveRight(1); recurse(n - 1); } recurse(4);',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'collectCoin'],
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
    rewards: { xp: 1800, coins: 700 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'The beauty of recursion has unfolded before you!' : 'Traverse the portal using recursion.',
        stars: 3,
      };
    },
  },

  {
    id: 'algo-4',
    worldId: 'algo',
    worldName: 'Algorithm Realm',
    worldIndex: 7,
    levelNumber: 4,
    title: 'FINAL BOSS: The Void Dragon',
    subtitle: 'The Ultimate Singularity',
    storyIntro: 'From the galactic abyss awakens The Void Dragon (300 HP)! Combine spells, loops, and attacks to defeat the final guardian of SyntaxRun!',
    concept: {
      topic: 'Grand Finale: Complete JavaScript Mastery',
      summary: 'Harness everything you have learned across all 7 worlds in an epic final confrontation.',
      explanation: 'The Void Dragon has 300 HP. Unleash an array of spell combos to deliver the ultimate strike!',
      codeSnippet: `const spells = ["fireball", "spark", "fireball", "spark", "fireball", "spark"];\nfor (const s of spells) {\n  castSpell(s);\n  attack();\n}`,
      tips: [
        'Each spell + attack deals 65 damage (390 total), enough to vanquish the 300 HP Dragon!',
      ],
    },
    objectivesText: [
      'Approach The Void Dragon at (4, 2)',
      'Execute the ultimate algorithm combo (300 HP)',
      'Ascend as a Master JavaScript Architect!',
    ],
    startingCode: `// Mission: Approach The Void Dragon at (4, 2) and defeat it using an array of spell combos!
// Available functions: moveRight(steps), castSpell(name), attack()
// Write your code below:

`,
    hints: [
      'Move right 2. Loop through a list of spells, calling castSpell(s) and attack(), then move right 2 to victory!',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'castSpell', 'attack'],
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
      id: 'boss-void-dragon',
      name: 'The Void Dragon',
      title: 'Cosmic Singularity of All Algorithms',
      hp: 300,
      maxHp: 300,
      x: 4,
      y: 2,
      color: '#4F46E5',
      weakness: 'algorithms',
      dialogue: [
        'I AM THE BOUNDLESS COMPLEXITY OF COMPUTATION!',
        'CAN YOUR CODE CONQUER THE INFINITE VOID?!',
        'IMPOSSIBLE... THE ALGORITHM IS HARMONIOUS... YOU ARE A TRUE CODE MASTER!',
      ],
    },
    rewards: { xp: 3000, coins: 1500 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 4;
      return {
        success: atExit,
        message: 'THE VOID DRAGON HAS BEEN SUBDUED! YOU HAVE COMPLETED SYNTAXRUN!',
        stars: 3,
      };
    },
  },
];
