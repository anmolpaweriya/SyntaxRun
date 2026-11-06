import { LevelDefinition } from '@/types/game';

export const logicDungeonLevels: LevelDefinition[] = [
  {
    id: 'dungeon-1',
    worldId: 'dungeon',
    worldName: 'Logic Dungeon',
    worldIndex: 2,
    levelNumber: 1,
    title: 'The Fork of Truth',
    subtitle: 'Booleans and if Statements',
    storyIntro: 'Deep within the Logic Dungeon, twin stone paths diverge. An ancient inscription warns: only the true path is free of deadly pit traps. Use `if` statements to choose wisely!',
    concept: {
      topic: 'Booleans and if Statements',
      summary: 'Booleans are `true` or `false`. `if` statements execute code only when a condition is true.',
      explanation: 'Use `if (condition) { ... }` to make decisions in code.',
      codeSnippet: `const isBridgeSafe = true;\nif (isBridgeSafe) {\n  moveRight(4);\n}`,
      tips: [
        'Conditions evaluate to either true or false.',
        'Code inside { } runs only if the condition evaluates to true.',
      ],
    },
    objectivesText: [
      'Check `if (isBridgeSafe)`',
      'Cross the safe bridge to reach the portal at (5, 2)',
    ],
    startingCode: `// Mission: Use an if statement to verify if the bridge is safe before crossing!
// Available functions: moveRight(steps), moveLeft(steps)
const isBridgeSafe = true;

// Write your if condition below:

`,
    hints: [
      'Write `if (isBridgeSafe) { moveRight(4); }`.',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown'],
    gridWidth: 7,
    gridHeight: 5,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 5, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'hazard', 'hazard', 'hazard', 'hazard', 'hazard', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'exit', 'wall'],
      ['wall', 'hazard', 'hazard', 'hazard', 'hazard', 'hazard', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [],
    rewards: { xp: 320, coins: 80 },
    validateCompletion: (state) => {
      const atExit = state.player.x === 5 && state.player.y === 2;
      return {
        success: atExit,
        message: atExit ? 'Truth guided your steps safely across!' : 'Reach the portal tile.',
        stars: 3,
      };
    },
  },

  {
    id: 'dungeon-2',
    worldId: 'dungeon',
    worldName: 'Logic Dungeon',
    worldIndex: 2,
    levelNumber: 2,
    title: 'Dichotomy of Paths',
    subtitle: 'if / else Branching',
    storyIntro: 'A magical rune sensor detects whether the top or bottom gate is unlocked. Use `if ... else` to steer your hero down the open corridor!',
    concept: {
      topic: 'if / else Statements',
      summary: 'Provide an alternative path when a condition is false with `else`.',
      explanation: 'When the `if` condition is true, its block runs. Otherwise, the `else` block runs.',
      codeSnippet: `if (topDoorOpen) {\n  moveUp(1);\n} else {\n  moveDown(1);\n}`,
      tips: [
        '`else` never takes a condition—it catches everything the `if` did not.',
      ],
    },
    objectivesText: [
      'Use `if ... else` to choose the open hallway',
      'Collect the crystal and reach the exit at (5, 3)',
    ],
    startingCode: `// Mission: Use if / else to steer down the open hallway!
// The top door is closed (false), so take the bottom path.
const topDoorOpen = false;

// Write your if / else logic below:

`,
    hints: [
      'if (topDoorOpen) { ... } else { moveDown(1); moveRight(3); } collectCoin(); moveRight(1);',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'collectCoin'],
    gridWidth: 7,
    gridHeight: 5,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 5, y: 3 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'exit', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [
      { id: 'c1', type: 'gem', x: 4, y: 3, value: 50 },
    ],
    rewards: { xp: 350, coins: 90 },
    validateCompletion: (state) => {
      const atExit = state.player.x === 5 && state.player.y === 3;
      return {
        success: atExit,
        message: atExit ? 'Branching logic executed flawlessly!' : 'Navigate the lower hallway to the exit.',
        stars: 3,
      };
    },
  },

  {
    id: 'dungeon-3',
    worldId: 'dungeon',
    worldName: 'Logic Dungeon',
    worldIndex: 2,
    levelNumber: 3,
    title: 'The Key Sensor',
    subtitle: 'Dynamic Conditions with hasKey()',
    storyIntro: 'An iron door is locked! You must first collect the brass key, verify that you possess it using `hasKey()`, and then unlock the door.',
    concept: {
      topic: 'Predicate Functions',
      summary: 'Predicate functions return true or false (boolean).',
      explanation: 'In SyntaxRun, `hasKey()` returns true if your hero holds a key. Use `if (hasKey()) { openDoor(); }`.',
      codeSnippet: `moveRight(2);\ncollectCoin(); // Pick up the key\nif (hasKey()) {\n  moveRight(2);\n  openDoor();\n}`,
      tips: [
        'Collect the key before checking hasKey()!',
      ],
    },
    objectivesText: [
      'Collect the key at (3, 2)',
      'Use `if (hasKey())` to open the door at (5, 2)',
      'Reach the exit at (6, 2)',
    ],
    startingCode: `// Mission: Collect the key at (3, 2), check hasKey(), open the door, and reach the exit!
// Available functions: moveRight(steps), collectCoin(), hasKey(), openDoor()
// Write your code below:

`,
    hints: [
      'Move right 2, collectCoin() to get key. If hasKey(), move right 2, openDoor(), then move right 1.',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'collectCoin', 'openDoor', 'hasKey'],
    gridWidth: 8,
    gridHeight: 5,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 6, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'door_locked', 'exit', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [
      { id: 'k1', type: 'key', x: 3, y: 2, label: 'Iron Key' },
    ],
    rewards: { xp: 400, coins: 100 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'The iron door yields to your logical key check!' : 'Collect the key, open the door, and advance!',
        stars: 3,
      };
    },
  },

  {
    id: 'dungeon-4',
    worldId: 'dungeon',
    worldName: 'Logic Dungeon',
    worldIndex: 2,
    levelNumber: 4,
    title: 'Logical Operators (&&, ||, !)',
    subtitle: 'Dual Lock Chamber',
    storyIntro: 'Two pressure plates power the master gate. Both switches must be activated to pass through!',
    concept: {
      topic: 'Logical Operators (AND, OR, NOT)',
      summary: '`&&` (AND) requires both sides to be true. `||` (OR) requires at least one side. `!` (NOT) inverts a boolean.',
      explanation: 'Example: `if (switchA && switchB) { ... }` requires both statements to be truthy.',
      codeSnippet: `const switchA = true;\nconst switchB = true;\nif (switchA && switchB) {\n  moveRight(4);\n}`,
      tips: [
        '`true && true` is true.',
      ],
    },
    objectivesText: [
      'Activate switch 1 at (3, 2)',
      'Activate switch 2 at (5, 3)',
      'Reach the portal at (7, 2)',
    ],
    startingCode: `// Mission: Toggle both switches to power down the electric barrier!
// Available functions: moveRight(steps), moveDown(steps), moveUp(steps), toggleSwitch()
// Write your code below:

`,
    hints: [
      'Move right 2, toggleSwitch(). Then move down 1, right 2, toggleSwitch(). Finally up 1, right 2 to exit.',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'toggleSwitch'],
    gridWidth: 9,
    gridHeight: 5,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 7, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'laser_active', 'empty', 'wall'],
      ['wall', 'empty', 'empty', 'switch_off', 'empty', 'empty', 'laser_active', 'exit', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'switch_off', 'laser_active', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [],
    rewards: { xp: 450, coins: 120 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 7;
      const sw1 = state.switchesActive['switch_3_2'];
      const sw2 = state.switchesActive['switch_5_3'];
      const bothSwitches = Boolean(sw1 && sw2);
      return {
        success: atExit && bothSwitches,
        message: atExit && bothSwitches ? 'Both switches hummed with energy! The barrier deactivated!' : 'You must activate both switches (switch_3_2 and switch_5_3) to power down the electric barrier!',
        stars: 3,
      };
    },
  },

  {
    id: 'dungeon-5',
    worldId: 'dungeon',
    worldName: 'Logic Dungeon',
    worldIndex: 2,
    levelNumber: 5,
    title: 'BOSS: Gatekeeper of Truth',
    subtitle: 'The Infallible Judge',
    storyIntro: 'The Gatekeeper of Truth looms before the dungeon throne. If power is greater than 50 AND shield is down, strike with attack()!',
    concept: {
      topic: 'Boss Encounter: Complex Boolean Logic',
      summary: 'Combine comparisons (===, >, <) and logical operators (&&, ||) to solve the Gatekeeper\'s riddle.',
      explanation: 'Evaluate the Gatekeeper\'s riddle: if power is greater than 50 AND shield is down, strike with attack()!',
      codeSnippet: `const power = 100;\nconst shieldActive = false;\nif (power > 50 && !shieldActive) {\n  attack();\n}`,
      tips: [
        '!shieldActive turns false into true.',
        'Deliver 3 attacks to defeat the Gatekeeper (90 HP)!',
      ],
    },
    objectivesText: [
      'Approach the Gatekeeper at (4, 2)',
      'Use logical condition `if (power > 50 && !shieldActive)`',
      'Defeat the Gatekeeper and claim the Dungeon Star!',
    ],
    startingCode: `// Mission: Approach the Gatekeeper at (4, 2) and attack if power > 50 AND !shieldActive!
// Available functions: moveRight(steps), attack()
const power = 100;
const shieldActive = false;

// Write your code below:

`,
    hints: [
      'Move right 2. Write `if (power > 50 && !shieldActive) { attack(); attack(); attack(); }` then move right 2.',
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
      id: 'boss-gatekeeper',
      name: 'Gatekeeper of Truth',
      title: 'Dungeon Sentinel of Booleans',
      hp: 90,
      maxHp: 90,
      x: 4,
      y: 2,
      color: '#EA580C',
      weakness: 'truth',
      dialogue: [
        'ONLY THOSE WHO EMBRACE PURE LOGIC MAY PASS!',
        'IS YOUR STATEMENT TRUE OR FALSE?!',
        'NO... YOUR LOGIC IS SOUND! THE GATES OPEN...',
      ],
    },
    rewards: { xp: 600, coins: 300 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 4;
      return {
        success: atExit,
        message: 'The Gatekeeper of Truth crumbles into ancient stone! World 3: Loop Mountains unlocked!',
        stars: 3,
      };
    },
  },
];
