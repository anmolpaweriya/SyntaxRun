import { LevelDefinition } from '@/types/game';

export const asyncCityLevels: LevelDefinition[] = [
  {
    id: 'cyber-1',
    worldId: 'cyber',
    worldName: 'Async Cyber City',
    worldIndex: 6,
    levelNumber: 1,
    title: 'Neon Signals & Promises',
    subtitle: 'The JavaScript Promise',
    storyIntro: 'Skyscrapers glow in brilliant neon. The city network operates with Promises that resolve asynchronously!',
    concept: {
      topic: 'Promises in JavaScript',
      summary: 'A Promise represents an eventual completion (or failure) of an asynchronous operation.',
      explanation: 'Promises have 3 states: pending, fulfilled, and rejected. Handle resolved values using `.then()`.',
      codeSnippet: `const downloadData = new Promise((resolve) => {\n  resolve(4);\n});\ndownloadData.then((steps) => {\n  moveRight(steps);\n});`,
      tips: [
        'Promises let you write non-blocking asynchronous code.',
      ],
    },
    objectivesText: [
      'Resolve the data promise',
      'Use the resolved distance to reach the cyber portal at (5, 2)',
    ],
    startingCode: `// Mission: Create a Promise that resolves with 4 steps and call .then() to moveRight!
// Available functions: moveRight(steps), new Promise((resolve) => { resolve(4); })
// Write your code below:

`,
    hints: [
      'const p = new Promise(res => res(4)); p.then(steps => moveRight(steps));',
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
    rewards: { xp: 1100, coins: 350 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'Promise fulfilled! Connection established!' : 'Reach the cyber portal.',
        stars: 3,
      };
    },
  },

  {
    id: 'cyber-2',
    worldId: 'cyber',
    worldName: 'Async Cyber City',
    worldIndex: 6,
    levelNumber: 2,
    title: 'Async and Await',
    subtitle: 'Synchronous-Looking Async Code',
    storyIntro: 'The `async/await` syntax makes asynchronous code read just like normal synchronous code!',
    concept: {
      topic: 'async / await Syntax',
      summary: 'The `await` keyword pauses execution inside an `async` function until a Promise resolves.',
      explanation: 'Mark functions with `async`. Inside, execute your route step-by-step.',
      codeSnippet: `async function travel() {\n  moveRight(2);\n  collectCoin();\n  moveRight(2);\n  collectCoin();\n  moveRight(1);\n}\ntravel();`,
      tips: [
        'Remember to invoke your async function after defining it!',
      ],
    },
    objectivesText: [
      'Write an `async function runRoute()`',
      'Collect both data shards and reach the exit at (5, 2)',
    ],
    startingCode: `// Mission: Define an async function runRoute() that moves right and collects data shards!
// Available functions: moveRight(steps), collectCoin()
// Write your code below:

`,
    hints: [
      'async function runRoute() { moveRight(2); collectCoin(); moveRight(2); collectCoin(); moveRight(1); } runRoute();',
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
      { id: 'd1', type: 'gem', x: 3, y: 2, value: 70 },
      { id: 'd2', type: 'gem', x: 5, y: 2, value: 70 },
    ],
    rewards: { xp: 1200, coins: 400 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'async / await sequence executed cleanly!' : 'Collect data shards and reach the exit.',
        stars: 3,
      };
    },
  },

  {
    id: 'cyber-3',
    worldId: 'cyber',
    worldName: 'Async Cyber City',
    worldIndex: 6,
    levelNumber: 3,
    title: 'Error Handling with try / catch',
    subtitle: 'The Firewall Deflector',
    storyIntro: 'Catch errors safely using `try ... catch` so your runner avoids crashing.',
    concept: {
      topic: 'try / catch / finally',
      summary: '`try ... catch` allows you to intercept and handle runtime errors gracefully.',
      explanation: 'Code inside `try` runs; if an error throws, execution jumps straight to `catch (error)`.',
      codeSnippet: `try {\n  throw new Error("Firewall blocked!");\n} catch (err) {\n  console.log("Safe reroute active:", err.message);\n  moveRight(4);\n}`,
      tips: [
        'Always provide a fallback path in catch blocks.',
      ],
    },
    objectivesText: [
      'Catch the firewall error with `try ... catch`',
      'Execute the fallback route to reach the safe zone at (5, 2)',
    ],
    startingCode: `// Mission: Wrap the risky breach in a try / catch block!
// In the catch (error) block, log the message and moveRight(4) to safety.
// Write your code below:

`,
    hints: [
      'try { throw new Error("Blocked!"); } catch(e) { console.log(e.message); moveRight(4); }',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'console.log'],
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
    rewards: { xp: 1300, coins: 450 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 5;
      return {
        success: atExit,
        message: atExit ? 'Firewall safely neutralized with try / catch!' : 'Reach the portal tile.',
        stars: 3,
      };
    },
  },

  {
    id: 'cyber-4',
    worldId: 'cyber',
    worldName: 'Async Cyber City',
    worldIndex: 6,
    levelNumber: 4,
    title: 'BOSS: The Cyber Overlord',
    subtitle: 'Master of the Mainframe',
    storyIntro: 'The Cyber Overlord (250 HP) controls the central Megatower. Overwhelm its quantum core with repeated attacks!',
    concept: {
      topic: 'Boss Encounter: Async Strike Coordination',
      summary: 'Coordinate asynchronous attack cycles against the AI Overlord.',
      explanation: 'The Cyber Overlord has 250 HP. Use an async loop to hit the boss with repeated attacks and spells!',
      codeSnippet: `async function overloadBoss() {\n  for (let i = 0; i < 5; i++) {\n    attack();\n    castSpell("spark");\n  }\n}\noverloadBoss();`,
      tips: [
        '5 cycles of attack + spell deal 250 damage to shut down the Overlord.',
      ],
    },
    objectivesText: [
      'Advance to the Cyber Overlord at (4, 2)',
      'Deploy the overload strike protocol (250 HP)',
      'Claim the Quantum Core and open World 7: Algorithm Realm!',
    ],
    startingCode: `// Mission: Approach the Cyber Overlord at (4, 2) and strike with an attack loop!
// Available functions: moveRight(steps), attack(), castSpell("spark")
// Write your code below:

`,
    hints: [
      'Move right 2. Run a loop 5 times: attack(); castSpell("spark"); then move right 2.',
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
      id: 'boss-overlord',
      name: 'The Cyber Overlord',
      title: 'Sentient Nexus of Async Protocols',
      hp: 250,
      maxHp: 250,
      x: 4,
      y: 2,
      color: '#DB2777',
      weakness: 'async',
      dialogue: [
        'ALL PROCESSES RUN ACCORDING TO MY SCHEDULE!',
        'UNRESOLVED PROMISES CANNOT HARM ME!',
        'CRITICAL SYSTEM REJECT: PROTOCOL TERMINATED...',
      ],
    },
    rewards: { xp: 1500, coins: 750 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 4;
      return {
        success: atExit,
        message: 'The Cyber Overlord is purged! Final World 7: Algorithm Realm unlocked!',
        stars: 3,
      };
    },
  },
];
