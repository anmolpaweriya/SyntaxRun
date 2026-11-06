import { LevelDefinition, TileType } from '@/types/game';

export const syntaxForestLevels: LevelDefinition[] = [
  {
    id: 'forest-1',
    worldId: 'forest',
    worldName: 'Syntax Forest',
    worldIndex: 1,
    levelNumber: 1,
    title: 'First Steps in Syntax',
    subtitle: 'Awakening in the Forest',
    storyIntro: 'Welcome, young coder! You have entered the ancient Syntax Forest. Guide your hero to the golden exit portal by calling movement functions.',
    concept: {
      topic: 'Function Invocations & Movement',
      summary: 'In JavaScript, functions are commands that tell the computer to perform actions. Parentheses () trigger the execution.',
      explanation: 'To move your hero, call functions such as moveRight(), moveLeft(), moveUp(), or moveDown(). You can pass an optional number inside the parentheses to specify how many tiles to move.',
      codeSnippet: `// Move 3 tiles to the right\nmoveRight(3);\n\n// Or step-by-step\nmoveRight();\nmoveRight();`,
      tips: [
        'Always end statements with a semicolon (;) as a good habit.',
        'JavaScript is case-sensitive: moveRight() is not the same as MoveRight().',
        'Check the coordinates HUD to plan your steps.',
      ],
    },
    objectivesText: [
      'Reach the golden portal tile at (5, 2)',
      'Use moveRight() to navigate the path',
    ],
    startingCode: `// Mission: Reach the golden portal at (5, 2)
// Available functions: moveRight(steps), moveLeft(steps), moveUp(steps), moveDown(steps)
// Write your JavaScript code below:

`,
    hints: [
      'The portal is 4 tiles to your right.',
      'You can call moveRight(4); or moveRight(); 4 times.',
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
    rewards: { xp: 100, coins: 25 },
    validateCompletion: (state) => {
      const reached = state.player.x === 5 && state.player.y === 2;
      return {
        success: reached,
        message: reached ? 'Great job! You made your first moves in JavaScript!' : 'You need to reach the portal at position (5, 2)!',
        stars: reached ? 3 : 0,
      };
    },
  },

  {
    id: 'forest-2',
    worldId: 'forest',
    worldName: 'Syntax Forest',
    worldIndex: 1,
    levelNumber: 2,
    title: 'Gathering Mana Coins',
    subtitle: 'The Gleaming Clearing',
    storyIntro: 'The forest glade is scattered with ancient Mana Coins. Collect them using collectCoin() to power up your abilities.',
    concept: {
      topic: 'Sequential Execution',
      summary: 'JavaScript executes lines of code in order, from top to bottom.',
      explanation: 'When your code runs, each line completes before moving to the next. Stand on a coin tile and call collectCoin() to pick it up.',
      codeSnippet: `moveRight(2);\ncollectCoin();\nmoveRight(2);\ncollectCoin();`,
      tips: [
        'Make sure your hero is on the exact tile where the coin is before calling collectCoin().',
        'Commands happen in sequence: move first, then collect!',
      ],
    },
    objectivesText: [
      'Collect both Mana Coins on the path',
      'Reach the exit portal at (6, 2)',
    ],
    startingCode: `// Mission: Collect both coins and reach the exit portal at (6, 2)
// Available functions: moveRight(steps), moveLeft(steps), moveUp(steps), moveDown(steps), collectCoin()
// Remember: Stand on a coin tile before calling collectCoin()!
// Write your code below:

`,
    hints: [
      'Coins are located at (3, 2) and (5, 2).',
      'Move 2 steps right, collectCoin(), move 2 steps right, collectCoin(), then reach the exit at (6, 2).',
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
      { id: 'c1', type: 'coin', x: 3, y: 2, value: 10 },
      { id: 'c2', type: 'coin', x: 5, y: 2, value: 10 },
    ],
    rewards: { xp: 120, coins: 40 },
    validateCompletion: (state) => {
      const collectedAll = state.items.filter((it) => it.type === 'coin').every((it) => it.collected);
      const atExit = state.player.x === 6 && state.player.y === 2;
      return {
        success: collectedAll && atExit,
        message: collectedAll && atExit ? 'Awesome! Both coins collected and exit reached!' : 'Make sure to collect both coins and reach the exit.',
        stars: collectedAll && atExit ? 3 : 1,
      };
    },
  },

  {
    id: 'forest-3',
    worldId: 'forest',
    worldName: 'Syntax Forest',
    worldIndex: 1,
    levelNumber: 3,
    title: 'Variables with let',
    subtitle: 'The Dynamic Path',
    storyIntro: 'The distance ahead can change! In JavaScript, we use variables created with let to store values that can be reused and changed.',
    concept: {
      topic: 'Variables with `let`',
      summary: 'A variable is a named container for storing data. Use the keyword `let` to declare a variable.',
      explanation: 'Variables allow you to avoid repeating hardcoded numbers. You can assign a value using `=`. Later, you can update that variable!',
      codeSnippet: `let distance = 3;\nmoveRight(distance);\n\n// Updating a variable:\ndistance = 2;\nmoveDown(distance);`,
      tips: [
        'Variable names should be descriptive (e.g., stepsToMove, coinCount).',
        'Do not use spaces in variable names (use camelCase).',
      ],
    },
    objectivesText: [
      'Declare a variable `let steps = 4;`',
      'Use the variable in `moveRight(steps)`',
      'Reach the portal at (5, 2)',
    ],
    startingCode: `// Mission: Declare a variable named 'steps' with value 4 and pass it to moveRight()
// Example: let steps = 4;
// Write your code below:

`,
    hints: [
      'Declare `let steps = 4;` then call `moveRight(steps);`.',
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
    rewards: { xp: 140, coins: 30 },
    validateCompletion: (state) => {
      const atExit = state.player.x === 5 && state.player.y === 2;
      return {
        success: atExit,
        message: atExit ? 'Superb! Variables make your code flexible!' : 'Reach the exit at (5, 2) using your variable.',
        stars: 3,
      };
    },
  },

  {
    id: 'forest-4',
    worldId: 'forest',
    worldName: 'Syntax Forest',
    worldIndex: 1,
    levelNumber: 4,
    title: 'Constants with const',
    subtitle: 'The Unbreakable Rune',
    storyIntro: 'Some values never change. In JavaScript, `const` declares constants—variables that cannot be reassigned.',
    concept: {
      topic: 'Constants with `const`',
      summary: 'Use `const` for values that stay constant throughout your program.',
      explanation: 'If a value should never be overwritten by accident, prefer `const` over `let`.',
      codeSnippet: `const STEP_SIZE = 2;\nmoveRight(STEP_SIZE);\ncollectCoin();\nmoveRight(STEP_SIZE);`,
      tips: [
        'Attempting to reassign a const will throw a TypeError!',
        'Default to `const` unless you know a variable must change.',
      ],
    },
    objectivesText: [
      'Declare a constant `const step = 2;`',
      'Collect both coins and reach the exit',
    ],
    startingCode: `// Mission: Use a constant \`const step = 2;\` to move between coins
// Available functions: moveRight(step), collectCoin()
// Write your code below:

`,
    hints: [
      'Declare `const step = 2;` then move and collect each coin.',
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
      { id: 'c1', type: 'coin', x: 3, y: 2, value: 15 },
      { id: 'c2', type: 'coin', x: 5, y: 2, value: 15 },
    ],
    rewards: { xp: 150, coins: 35 },
    validateCompletion: (state) => {
      const atExit = state.player.x === 6 && state.player.y === 2;
      return {
        success: atExit,
        message: atExit ? 'Well done! const provides rock-solid safety in code.' : 'Reach the portal tile.',
        stars: 3,
      };
    },
  },

  {
    id: 'forest-5',
    worldId: 'forest',
    worldName: 'Syntax Forest',
    worldIndex: 1,
    levelNumber: 5,
    title: 'Arithmetic Operators',
    subtitle: 'The Calculation Bridge',
    storyIntro: 'An enchanted water canal blocks your path. You need to calculate the precise distance using arithmetic operators (+, -, *, /) and set your speed!',
    concept: {
      topic: 'Math Operators (+, -, *, /)',
      summary: 'JavaScript can perform math calculations right in your code.',
      explanation: 'Use `+` for addition, `-` for subtraction, `*` for multiplication, and `/` for division.',
      codeSnippet: `let base = 2;\nlet totalSteps = (base * 2) + 1; // 5\nsetSpeed(3);\nmoveRight(totalSteps);`,
      tips: [
        'Multiplication (*) and Division (/) happen before Addition (+) and Subtraction (-).',
        'Use setSpeed(multiplier) to run faster across the bridge!',
      ],
    },
    objectivesText: [
      'Boost speed using `setSpeed(3)`',
      'Calculate distance (5 tiles) with math operators',
      'Reach the portal across the river at (6, 2)',
    ],
    startingCode: `// Mission: Boost your speed using setSpeed() and calculate 5 steps across the bridge!
// Available functions: setSpeed(multiplier), moveRight(steps)
// Write your code below:

`,
    hints: [
      'The portal is 5 tiles to your right: let distance = 2 * 2 + 1; moveRight(distance);',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'setSpeed'],
    gridWidth: 8,
    gridHeight: 5,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 6, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'water', 'water', 'water', 'water', 'water', 'empty', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'exit', 'wall'],
      ['wall', 'water', 'water', 'water', 'water', 'water', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [],
    rewards: { xp: 160, coins: 40 },
    validateCompletion: (state) => {
      const atExit = state.player.x === 6 && state.player.y === 2;
      return {
        success: atExit,
        message: atExit ? 'Bridge crossed! Math in JavaScript is pure power!' : 'Calculate the distance to reach (6, 2).',
        stars: 3,
      };
    },
  },

  {
    id: 'forest-6',
    worldId: 'forest',
    worldName: 'Syntax Forest',
    worldIndex: 1,
    levelNumber: 6,
    title: 'Strings and Spell Casting',
    subtitle: 'The Rune Gate',
    storyIntro: 'An enchanted barrier seals the path. The ancient forest stones require you to whisper the exact spell string to castSpell("spark")!',
    concept: {
      topic: 'Strings & Text Data',
      summary: 'Strings represent text and are wrapped in quotes: "spark" or \'spark\'.',
      explanation: 'In JavaScript, strings are sequences of characters. Pass the string "spark" to castSpell() to disintegrate the barrier!',
      codeSnippet: `let spellName = "spark";\ncastSpell(spellName);\nmoveRight(3);`,
      tips: [
        'You can use single quotes \'spark\' or double quotes "spark".',
      ],
    },
    objectivesText: [
      'Cast the spell with `castSpell("spark")`',
      'Collect the gem at (3, 2) and reach the exit at (5, 2)',
    ],
    startingCode: `// Mission: Cast the "spark" spell string to clear the path, collect the gem, and reach the exit!
// Available functions: castSpell(name), moveRight(steps), collectCoin()
// Write your code below:

`,
    hints: [
      'Call castSpell("spark") first, then move right 2 tiles, collect the gem, and reach (5, 2).',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'castSpell', 'collectCoin'],
    gridWidth: 7,
    gridHeight: 5,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 5, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'empty', 'brambles', 'empty', 'empty', 'exit', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [
      { id: 'gem1', type: 'gem', x: 3, y: 2, value: 50 },
    ],
    rewards: { xp: 180, coins: 50 },
    validateCompletion: (state) => {
      const atExit = state.player.x === 5 && state.player.y === 2;
      return {
        success: atExit,
        message: atExit ? 'The brambles dissolved into glittering stardust!' : 'Cast your spell and reach the portal!',
        stars: 3,
      };
    },
  },

  {
    id: 'forest-7',
    worldId: 'forest',
    worldName: 'Syntax Forest',
    worldIndex: 1,
    levelNumber: 7,
    title: 'Two-Dimensional Navigation',
    subtitle: 'The Zig-Zag Grove',
    storyIntro: 'The dense ancient trees force a winding path through the grove. You must navigate in both X (horizontal) and Y (vertical) coordinates.',
    concept: {
      topic: '2D Coordinates & Multi-Directional Movement',
      summary: 'In 2D game grids, X represents columns (left/right) and Y represents rows (up/down).',
      explanation: 'Combine moveRight(), moveDown(), and moveUp() to navigate around trees and cliffs without hitting walls.',
      codeSnippet: `moveRight(2);\nmoveDown(2);\ncollectCoin();\nmoveRight(2);\nmoveUp(2);`,
      tips: [
        'Be careful not to bump into walls: collisions stop your movement.',
        'Trace the open path with your eyes before writing the code.',
      ],
    },
    objectivesText: [
      'Navigate the winding grove path',
      'Collect the emerald gem at (3, 3)',
      'Reach the portal at (5, 1)',
    ],
    startingCode: `// Mission: Zig-zag through the trees!
// Collect the gem at (3, 3) and reach the portal at (5, 1) without hitting walls!
// Available functions: moveRight(steps), moveDown(steps), moveUp(steps), moveLeft(steps), collectCoin()
// Write your code below:

`,
    hints: [
      'Move right 2 to (3, 1), move down 2 to (3, 3), collect the gem.',
      'Then move right 2 to (5, 3), and move up 2 to reach the exit at (5, 1).',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'collectCoin'],
    gridWidth: 7,
    gridHeight: 5,
    playerStart: { x: 1, y: 1, direction: 'right' },
    exitPosition: { x: 5, y: 1 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'wall', 'empty', 'exit', 'wall'],
      ['wall', 'wall', 'empty', 'wall', 'empty', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [
      { id: 'gem_green', type: 'gem', x: 3, y: 3, value: 75, color: '#10B981' },
    ],
    rewards: { xp: 200, coins: 60 },
    validateCompletion: (state) => {
      const atExit = state.player.x === 5 && state.player.y === 1;
      const collected = state.items.every((it) => it.collected);
      return {
        success: atExit && collected,
        message: atExit && collected ? 'Masterful navigation around the ancient grove!' : 'Collect the emerald and reach the exit!',
        stars: 3,
      };
    },
  },

  {
    id: 'forest-8',
    worldId: 'forest',
    worldName: 'Syntax Forest',
    worldIndex: 1,
    levelNumber: 8,
    title: 'Template Literals & Console',
    subtitle: 'Whispers in the Log',
    storyIntro: 'The magical obelisk listens to messages printed to the console. Log a greeting using template literals with backticks and `${variable}`!',
    concept: {
      topic: 'Template Literals & Logging',
      summary: 'Template literals allow string interpolation using `${expression}` inside backticks (``).',
      explanation: 'Instead of clunky concatenation ("Hello " + name), template literals let you embed variables cleanly: `Hello ${name}`.',
      codeSnippet: `const heroName = "Cipher";\nconsole.log(\`Hero \${heroName} approaches the obelisk!\`);`,
      tips: [
        'Notice the backtick character (`) usually beneath Escape.',
        'Anything inside \${} is evaluated as JavaScript code.',
      ],
    },
    objectivesText: [
      'Log a message with `console.log()`',
      'Collect all 3 coins',
      'Reach the portal at (7, 2)',
    ],
    startingCode: `// Mission: Use template literals with console.log() and collect all 3 coins!
// Example: console.log(\`Hero is moving!\`);
// Available functions: console.log(...), moveRight(steps), collectCoin()
// Write your code below:

`,
    hints: [
      'Check the Console tab beside the editor to see your logged messages in real-time!',
      'Move 2 steps and collect, repeated 3 times to get all coins.',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'collectCoin', 'console.log'],
    gridWidth: 8,
    gridHeight: 5,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 7, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'exit'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [
      { id: 'c1', type: 'coin', x: 3, y: 2, value: 20 },
      { id: 'c2', type: 'coin', x: 5, y: 2, value: 20 },
      { id: 'c3', type: 'coin', x: 7, y: 2, value: 20 },
    ],
    rewards: { xp: 220, coins: 70 },
    validateCompletion: (state) => {
      const atExit = state.player.x === 7 && state.player.y === 2;
      return {
        success: atExit,
        message: atExit ? 'The obelisk glowed with power upon reading your log!' : 'Collect the coins and reach the exit!',
        stars: 3,
      };
    },
  },

  {
    id: 'forest-9',
    worldId: 'forest',
    worldName: 'Syntax Forest',
    worldIndex: 1,
    levelNumber: 9,
    title: 'Reusable Functions',
    subtitle: 'The Rhythm of the Path',
    storyIntro: 'Writing the same code repeatedly is tiring. Programmers use functions to package instructions into reusable spells!',
    concept: {
      topic: 'Function Declarations',
      summary: 'A function bundles code into a reusable block using the `function` keyword.',
      explanation: 'Define a function once, then call it as many times as you need by writing its name followed by ().',
      codeSnippet: `function stepAndCollect() {\n  moveRight(2);\n  collectCoin();\n}\n\n// Call it:\nstepAndCollect();\nstepAndCollect();`,
      tips: [
        'Function bodies are enclosed in curly braces { }.',
        'Functions make code modular and clean.',
      ],
    },
    objectivesText: [
      'Define a function `stepAndCollect()`',
      'Call it 3 times to collect all coins',
      'Reach the portal at (7, 2)',
    ],
    startingCode: `// Mission: Create a reusable function to move right 2 tiles and collect a coin!
// Define: function stepAndCollect() { ... }
// Call it 3 times to collect all coins along the path!
// Write your code below:

`,
    hints: [
      'Each coin is spaced 2 tiles apart.',
      'Define function stepAndCollect() { moveRight(2); collectCoin(); } and call it 3 times!',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'collectCoin'],
    gridWidth: 8,
    gridHeight: 5,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 7, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'exit'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [
      { id: 'c1', type: 'coin', x: 3, y: 2, value: 25 },
      { id: 'c2', type: 'coin', x: 5, y: 2, value: 25 },
      { id: 'c3', type: 'coin', x: 7, y: 2, value: 25 },
    ],
    rewards: { xp: 250, coins: 80 },
    validateCompletion: (state) => {
      const atExit = state.player.x === 7 && state.player.y === 2;
      return {
        success: atExit,
        message: atExit ? 'Look at how clean your code is with functions!' : 'Collect all coins and reach the exit.',
        stars: 3,
      };
    },
  },

  {
    id: 'forest-10',
    worldId: 'forest',
    worldName: 'Syntax Forest',
    worldIndex: 1,
    levelNumber: 10,
    title: 'The Forest Heart Gateway',
    subtitle: 'The Final Test of Syntax',
    storyIntro: 'Before the heart of the forest opens, collect the Golden Key and unlock the gateway.',
    concept: {
      topic: 'Combining Syntax Fundamentals',
      summary: 'Combine variables, arithmetic expressions, and functions into a complete program.',
      explanation: 'Use functions and variables to navigate, collect the Golden Key at (4, 3), and reach the gateway.',
      codeSnippet: `const jumpX = 3;\nmoveRight(jumpX);\nmoveDown(1);\ncollectCoin(); // Pick up key!`,
      tips: [
        'Grab the Golden Key at (4, 3) to unlock the gateway to the boss!',
      ],
    },
    objectivesText: [
      'Collect the Golden Key at (4, 3)',
      'Unlock the door at (5, 2) with openDoor()',
      'Reach the ancient archway at (6, 2)',
    ],
    startingCode: `// Mission: Collect the Golden Key at (4, 3), open the door at (5, 2), and advance to (6, 2)!
// Available functions: moveRight(steps), moveDown(steps), moveUp(steps), collectCoin(), openDoor()
// Write your code below:

`,
    hints: [
      'Move right 3 to (4, 2), down 1 to (4, 3), collectCoin(). Up 1 to (4, 2), openDoor(), then move right 2 to (6, 2).',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'collectCoin', 'openDoor'],
    gridWidth: 8,
    gridHeight: 5,
    playerStart: { x: 1, y: 2, direction: 'right' },
    exitPosition: { x: 6, y: 2 },
    tiles: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'wall', 'empty', 'wall'],
      ['wall', 'empty', 'empty', 'empty', 'empty', 'door_locked', 'exit', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'empty', 'wall', 'wall', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    items: [
      { id: 'boss_key', type: 'key', x: 4, y: 3, label: 'Boss Key' },
    ],
    rewards: { xp: 300, coins: 100 },
    validateCompletion: (state) => {
      const atExit = state.player.x === 6 && state.player.y === 2;
      const hasKey = state.player.hasKey;
      return {
        success: atExit && hasKey,
        message: atExit && hasKey ? 'The ancient archway rumbles open! Prepare for the Boss!' : 'Grab the Golden Key and reach the archway.',
        stars: 3,
      };
    },
  },

  {
    id: 'forest-11',
    worldId: 'forest',
    worldName: 'Syntax Forest',
    worldIndex: 1,
    levelNumber: 11,
    title: 'BOSS: The Syntax Treant',
    subtitle: 'Guardian of the Forest',
    storyIntro: 'An ancient, towering tree spirit blocks your path! The Syntax Treant has 100 HP. Cast spells and attacks to defeat the boss!',
    concept: {
      topic: 'Boss Encounter: Syntax Mastery',
      summary: 'Boss battles require applying your coding skills in combat.',
      explanation: 'The Treant has 100 HP. Cast the powerful spell "fireball" or combo it with attack() to defeat the boss before reaching the portal!',
      codeSnippet: `moveRight(2);\ncastSpell("fireball"); // Deals 35 damage\nattack(); // Deals 30 damage`,
      tips: [
        'Move within combat range (x = 3 or 4).',
        'Use castSpell("fireball") or attack() repeatedly to drain the Boss\'s HP!',
      ],
    },
    objectivesText: [
      'Approach the Syntax Treant at (4, 2)',
      'Defeat the Boss using `castSpell("fireball")` and `attack()`',
      'Enter the victory portal at (5, 2)!',
    ],
    startingCode: `// Mission: Approach the Syntax Treant and defeat it (100 HP)!
// Available functions: moveRight(steps), castSpell("fireball"), attack()
// Tip: Each fireball deals 35 damage, each attack deals 30 damage.
// Write your code below:

`,
    hints: [
      'Move right 2, cast fireball 3 times (or combo with attack), then walk right to the portal!',
    ],
    allowedFunctions: ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'castSpell', 'attack', 'console.log'],
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
      id: 'boss-treant',
      name: 'The Syntax Treant',
      title: 'Ancient Guardian of Variables',
      hp: 100,
      maxHp: 100,
      x: 4,
      y: 2,
      color: '#15803D',
      weakness: 'fireball',
      dialogue: [
        'WHO DARES DISTURB THE ROOTS OF SYNTAX?!',
        'MERE STRINGS CANNOT PIERCE MY BARK!',
        'IMPOSSIBLE... YOUR CODE HAS TRUE PURPOSE...',
      ],
    },
    rewards: { xp: 500, coins: 250 },
    validateCompletion: (state) => {
      const atExit = state.player.x >= 4;
      return {
        success: atExit,
        message: 'The Syntax Treant bows in respect! The way to World 2: Logic Dungeon is open!',
        stars: 3,
      };
    },
  },
];
