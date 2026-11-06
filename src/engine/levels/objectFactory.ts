import { LevelDefinition } from '@/types/game';

export const objectFactoryLevels: LevelDefinition[] = [
  {
    id: 'factory-1',
    worldId: 'factory',
    worldName: 'Object Factory',
    worldIndex: 5,
    levelNumber: 1,
    title: 'The Blueprint Terminal',
    subtitle: 'Objects and Properties',
    storyIntro: 'Configure machines and robots using JavaScript objects with key-value pairs.',
    concept: {
      topic: 'JavaScript Objects',
      summary: 'Objects group related data and functionality into key-value pairs.',
      explanation: 'Define: `const config = { speed: 3, steps: 4 };`. Access: `config.steps`.',
      codeSnippet: `const config = {\n  speed: 3,\n  steps: 4,\n};\nsetSpeed(config.speed);\nmoveRight(config.steps);`,
      tips: [
        'Access properties using dot notation: object.property',
      ],
    },
    objectivesText: [
      'Create an object `const config = { speed: 3, steps: 4 };`',
      'Use `config.steps` to advance your hero to the factory gateway at (5, 2)',
    ],
    startingCode: `// Mission: Create a config object with speed and steps properties!
// Example: const config = { speed: 3, steps: 4 };
// Then call setSpeed(config.speed) and moveRight(config.steps).
// Write your code below:

`,
    hints: [
      'const config = { speed: 3, steps: 4 }; setSpeed(config.speed); moveRight(config.steps);',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'setSpeed'],
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
    rewards: { xp: 850, coins: 250 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'Config object applied with machine precision!' : 'Reach the exit portal.',
        stars: 3,
      };
    },
  },

  {
    id: 'factory-2',
    worldId: 'factory',
    worldName: 'Object Factory',
    worldIndex: 5,
    levelNumber: 2,
    title: 'Object Methods',
    subtitle: 'Functions Inside Objects',
    storyIntro: 'When a function is stored inside an object, it is called a method!',
    concept: {
      topic: 'Object Methods',
      summary: 'A method is a function defined as a property on an object.',
      explanation: 'Methods can access object state or perform actions. Call with `drone.scout()`.',
      codeSnippet: `const drone = {\n  scout: function() {\n    moveRight(2);\n    collectCoin();\n  }\n};\ndrone.scout();`,
      tips: [
        'Methods provide clean encapsulation.',
      ],
    },
    objectivesText: [
      'Define an object with a method `drone.scout()`',
      'Call the method to collect the batteries and reach the exit at (5, 2)',
    ],
    startingCode: `// Mission: Create a drone object with a scout() method that moves right 2 and collects coins!
// Call drone.scout() to collect both batteries and reach the exit.
// Write your code below:

`,
    hints: [
      'const drone = { scout() { moveRight(2); collectCoin(); } }; drone.scout(); drone.scout(); moveRight(1);',
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
      { id: 'b1', type: 'gem', x: 3, y: 2, value: 60 },
      { id: 'b2', type: 'gem', x: 5, y: 2, value: 60 },
    ],
    rewards: { xp: 900, coins: 280 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'Method execution operated flawlessly!' : 'Collect batteries and reach the exit.',
        stars: 3,
      };
    },
  },

  {
    id: 'factory-3',
    worldId: 'factory',
    worldName: 'Object Factory',
    worldIndex: 5,
    levelNumber: 3,
    title: 'Classes and Constructors',
    subtitle: 'The Golem Blueprint',
    storyIntro: 'Instantiate a warrior robot using ES6 `class` and the `new` keyword!',
    concept: {
      topic: 'ES6 Classes & Constructors',
      summary: 'A class serves as a template or blueprint for creating multiple objects.',
      explanation: 'Use `class Robot { constructor(name) { ... } patrol() { ... } }`. Instantiate with `new Robot("Mech")`.',
      codeSnippet: `class Mech {\n  constructor(name) { this.name = name; }\n  patrol() { moveRight(4); }\n}\nconst m = new Mech("Alpha");\nm.patrol();`,
      tips: [
        'The constructor runs automatically when `new` is called.',
      ],
    },
    objectivesText: [
      'Define a class `Mech` with a `patrol()` method',
      'Instantiate `new Mech("Alpha")` and call `patrol()`',
      'Reach the factory master hall at (5, 2)',
    ],
    startingCode: `// Mission: Define class Mech with constructor(name) and patrol() method!
// Instantiate it with 'new Mech("Alpha")' and call .patrol().
// Write your code below:

`,
    hints: [
      'class Mech { constructor(name) { this.name = name; } patrol() { moveRight(4); } } const m = new Mech("Alpha"); m.patrol();',
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
    rewards: { xp: 950, coins: 300 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'Class instantiation successful! Object-oriented power unlocked!' : 'Reach the exit portal.',
        stars: 3,
      };
    },
  },

  {
    id: 'factory-4',
    worldId: 'factory',
    worldName: 'Object Factory',
    worldIndex: 5,
    levelNumber: 4,
    title: 'BOSS: The Autonomous Golem',
    subtitle: 'The Titan of Iron & Code',
    storyIntro: 'A colossal bronze automaton rises (200 HP). Deploy an object-oriented attack protocol to breach its core!',
    concept: {
      topic: 'Boss Encounter: Object-Oriented Protocols',
      summary: 'Use objects and methods to coordinate an attack on the Golem.',
      explanation: 'The Golem has 200 HP. Create an object with an attack routine and call it to dismantle the Golem!',
      codeSnippet: `const bot = {\n  strike: () => { attack(); castSpell("spark"); }\n};\nfor (let i = 0; i < 4; i++) bot.strike();`,
      tips: [
        'Combine loops with object methods for maximum combat effectiveness.',
      ],
    },
    objectivesText: [
      'Approach the Autonomous Golem at (4, 2)',
      'Execute an object attack protocol to deal 200 damage',
      'Open World 6: Async Cyber City!',
    ],
    startingCode: `// Mission: Approach the Golem at (4, 2) and execute a combat bot object strike routine!
// Available functions: moveRight(steps), attack(), castSpell("spark")
// Write your code below:

`,
    hints: [
      'Move right 2. Define const bot = { strike() { attack(); castSpell("spark"); } }; and loop 4 times, then move right 2.',
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
      id: 'boss-golem',
      name: 'The Autonomous Golem',
      title: 'Titan of Object Encapsulation',
      hp: 200,
      maxHp: 200,
      x: 4,
      y: 2,
      color: '#D97706',
      weakness: 'classes',
      dialogue: [
        'INITIATING THREAT EVALUATION...',
        'SYSTEM ARCHITECTURE: INDESTRUCTIBLE!',
        'FATAL RUNTIME EXCEPTION IN OBJECT CORE...',
      ],
    },
    rewards: { xp: 1200, coins: 600 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 4;
      return {
        success: atExit,
        message: 'The Autonomous Golem powers down safely! World 6: Async Cyber City is now accessible!',
        stars: 3,
      };
    },
  },
];
