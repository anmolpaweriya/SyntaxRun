import { LevelDefinition } from '@/types/game';

export const functionCastleLevels: LevelDefinition[] = [
  {
    id: 'castle-1',
    worldId: 'castle',
    worldName: 'Function Castle',
    worldIndex: 4,
    levelNumber: 1,
    title: 'The Parameter Gate',
    subtitle: 'Passing Arguments to Functions',
    storyIntro: 'To unlock the castle drawbridge, create a function that accepts custom parameters to adapt your movement dynamically.',
    concept: {
      topic: 'Function Parameters',
      summary: 'Parameters act as placeholder variables inside functions that receive values when called.',
      explanation: 'Define: `function walk(distance) { moveRight(distance); }`. Call: `walk(2);` passes 2 into distance.',
      codeSnippet: `function walk(distance) {\n  moveRight(distance);\n  collectCoin();\n}\nwalk(2);`,
      tips: [
        'Functions can accept parameters to customize their behavior.',
      ],
    },
    objectivesText: [
      'Define `function walk(distance)`',
      'Call `walk(2)` twice to collect both gems',
      'Reach the throne entrance at (5, 2)',
    ],
    startingCode: `// Mission: Define a function 'walk(distance)' that moves right and collects coins!
// Then call walk(2) twice and advance to the exit portal.
// Write your code below:

`,
    hints: [
      'function walk(distance) { moveRight(distance); collectCoin(); } walk(2); walk(2); moveRight(1);',
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
      { id: 'c1', type: 'gem', x: 3, y: 2, value: 50 },
      { id: 'c2', type: 'gem', x: 5, y: 2, value: 50 },
    ],
    rewards: { xp: 700, coins: 200 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'Parameters granted you full dynamic control!' : 'Collect gems and reach the exit.',
        stars: 3,
      };
    },
  },

  {
    id: 'castle-2',
    worldId: 'castle',
    worldName: 'Function Castle',
    worldIndex: 4,
    levelNumber: 2,
    title: 'The Return Chamber',
    subtitle: 'Returning Values from Functions',
    storyIntro: 'An alchemical scale requires exact formulas. Write a function that calculates and `return`s the exact steps needed to cross the hall.',
    concept: {
      topic: 'The `return` Statement',
      summary: 'The `return` statement sends a value back to whoever called the function.',
      explanation: 'Once a return statement executes, the function stops immediately and passes back the result.',
      codeSnippet: `function calculateSteps(a, b) {\n  return a + b;\n}\nconst steps = calculateSteps(2, 2); // 4\nmoveRight(steps);`,
      tips: [
        'A function without a return statement implicitly returns `undefined`.',
      ],
    },
    objectivesText: [
      'Define a function with `return`',
      'Use the returned value to move right 4 steps',
      'Reach the throne room at (5, 2)',
    ],
    startingCode: `// Mission: Write a function calculateSteps(a, b) that returns a + b!
// Then pass the returned 4 steps to moveRight().
// Write your code below:

`,
    hints: [
      'function calculateSteps(a, b) { return a + b; } moveRight(calculateSteps(2, 2));',
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
    rewards: { xp: 750, coins: 220 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'The return statement delivered exact precision!' : 'Reach the exit portal.',
        stars: 3,
      };
    },
  },

  {
    id: 'castle-3',
    worldId: 'castle',
    worldName: 'Function Castle',
    worldIndex: 4,
    levelNumber: 3,
    title: 'Arrow Functions',
    subtitle: 'Modern ES6 Syntax',
    storyIntro: 'The royal scribes use a compact shorthand for spells called Arrow Functions (`=>`). Master this sleek syntax!',
    concept: {
      topic: 'Arrow Functions (=>)',
      summary: 'Arrow functions offer a concise syntax for writing function expressions.',
      explanation: 'Instead of `function(x) { return x * 2; }`, write `(x) => x * 2;`.',
      codeSnippet: `const leap = (dist) => {\n  moveRight(dist);\n  collectCoin();\n};\nleap(2);`,
      tips: [
        'Arrow functions provide a clean, modern syntax.',
      ],
    },
    objectivesText: [
      'Write an arrow function `const leap = (dist) => { ... }`',
      'Collect royal treasure and reach the exit at (5, 2)',
    ],
    startingCode: `// Mission: Create an arrow function 'leap' that moves right and collects coins!
// Syntax: const leap = (dist) => { moveRight(dist); collectCoin(); };
// Write your code below:

`,
    hints: [
      'const leap = (dist) => { moveRight(dist); collectCoin(); }; leap(2); leap(2); moveRight(1);',
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
      { id: 'c1', type: 'gem', x: 3, y: 2, value: 75 },
      { id: 'c2', type: 'gem', x: 5, y: 2, value: 75 },
    ],
    rewards: { xp: 800, coins: 250 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'Arrow functions unlocked clean, modern JavaScript mastery!' : 'Collect gems and reach the exit.',
        stars: 3,
      };
    },
  },

  {
    id: 'castle-4',
    worldId: 'castle',
    worldName: 'Function Castle',
    worldIndex: 4,
    levelNumber: 4,
    title: 'BOSS: The Grand Alchemist',
    subtitle: 'Master of Transmutation',
    storyIntro: 'The Grand Alchemist mixes volatile elements (180 HP). Combine functions to unleash powerful combos!',
    concept: {
      topic: 'Boss Encounter: Function Composition',
      summary: 'Combine helper functions to orchestrate powerful combat sequences.',
      explanation: 'The Grand Alchemist has 180 HP. Create a helper function `castCombo()` to deal massive burst damage!',
      codeSnippet: `const castCombo = () => {\n  castSpell("fireball");\n  attack();\n};\ncastCombo();`,
      tips: [
        'Each fireball deals 35 damage, each attack deals 30 damage (65 per combo).',
      ],
    },
    objectivesText: [
      'Advance to the Alchemist at (4, 2)',
      'Create and invoke a function combo to deal 180+ damage',
      'Claim the Royal Crest and unlock World 5: Object Factory!',
    ],
    startingCode: `// Mission: Approach the Alchemist at (4, 2) and defeat them using function combos!
// Available functions: moveRight(steps), castSpell("fireball"), attack()
// Write your code below:

`,
    hints: [
      'Move right 2. Define const combo = () => { castSpell("fireball"); attack(); }; and run it 3 times, then move right 2.',
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
      id: 'boss-alchemist',
      name: 'The Grand Alchemist',
      title: 'Sorcerer of First-Class Functions',
      hp: 180,
      maxHp: 180,
      x: 4,
      y: 2,
      color: '#7C3AED',
      weakness: 'functions',
      dialogue: [
        'ALL OF REALITY CAN BE TRANSMUTED BY MY FORMULAS!',
        'BEHOLD MY HIGHER-ORDER CONCOCTIONS!',
        'YOUR FUNCTION COMPOSITION... IS PURE PERFECTION...',
      ],
    },
    rewards: { xp: 1000, coins: 500 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 4;
      return {
        success: atExit,
        message: 'The Grand Alchemist concedes defeat! World 5: Object Factory is open!',
        stars: 3,
      };
    },
  },
];
