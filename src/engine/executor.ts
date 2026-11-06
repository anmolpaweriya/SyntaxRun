import { GameAction, ConsoleMessage, LevelState, ExecutionResult, Direction } from '@/types/game';

// Beginner-friendly error parser
export function formatFriendlyError(error: any): { title: string; message: string; tip: string; line?: number } {
  const errStr = String(error?.message || error);
  let line: number | undefined;

  // Extract line number from stack if available
  const match = error?.stack?.match(/<anonymous>:(\d+):(\d+)/);
  if (match) {
    line = Math.max(1, parseInt(match[1], 10) - 3);
  }

  if (errStr.includes('Collision!') || errStr.includes('Obstacle') || errStr.includes('Blocked!') || errStr.includes('Out of bounds!')) {
    return {
      title: 'Obstacle Collision',
      message: errStr,
      tip: 'Your character cannot pass through walls, water, or locked doors. Check the grid coordinates and adjust your steps or unlock the path first.',
      line,
    };
  }

  if (errStr.includes('is not defined')) {
    const varName = errStr.split(' ')[0];
    return {
      title: 'Variable or Function Not Found',
      message: `"${varName}" is not defined.`,
      tip: `Did you declare it using let, const, or function? Also check for typos or capitalization (JavaScript is case-sensitive!).`,
      line,
    };
  }

  if (errStr.includes('Infinite loop detected')) {
    return {
      title: 'Infinite Loop Detected',
      message: errStr,
      tip: `Make sure your loop has an increment (like i++) or condition that eventually becomes false.`,
      line,
    };
  }

  if (errStr.includes('is not a function')) {
    return {
      title: 'Type Error: Not a Function',
      message: errStr,
      tip: `You tried to invoke something as a function that isn't one. Check available APIs like moveRight(), collectCoin().`,
      line,
    };
  }

  if (errStr.includes('Unexpected token') || errStr.includes('SyntaxError')) {
    return {
      title: 'Syntax Error',
      message: errStr,
      tip: `Check for missing closing braces '}', parentheses ')', commas, or semicolons.`,
      line,
    };
  }

  return {
    title: 'Code Execution Error',
    message: errStr,
    tip: `Review your code and compare it with the instructions for this level.`,
    line,
  };
}

// Transform user code to inject loop protection counters
export function injectLoopGuards(code: string, maxIterations = 5000): string {
  let transformed = code;

  transformed = transformed.replace(
    /\b(while\s*\([^)]*\)\s*\{)/g,
    `$1 __guardCheck__(); `
  );

  transformed = transformed.replace(
    /\b(for\s*\([^)]*\)\s*\{)/g,
    `$1 __guardCheck__(); `
  );

  transformed = transformed.replace(
    /\b(while\s*\([^)]*\))\s*([^{;\n]+;)/g,
    `$1 { __guardCheck__(); $2 }`
  );

  transformed = transformed.replace(
    /\b(for\s*\([^)]*\))\s*([^{;\n]+;)/g,
    `$1 { __guardCheck__(); $2 }`
  );

  return transformed;
}

export function executePlayerCode(
  userCode: string,
  initialState: LevelState,
  maxSteps = 2000
): ExecutionResult {
  const actions: GameAction[] = [];
  const logs: ConsoleMessage[] = [];
  let stepCounter = 0;

  // Clone state for simulation so predicates reflect environment changes
  const sim = {
    x: initialState.player.x,
    y: initialState.player.y,
    dir: initialState.player.direction,
    coins: initialState.player.collectedCoins,
    hasKey: initialState.player.hasKey,
    keysCount: initialState.player.keysCount,
    energy: initialState.player.energy,
    speed: initialState.player.speed,
    items: JSON.parse(JSON.stringify(initialState.items)),
    switches: { ...initialState.switchesActive },
    doors: { ...initialState.doorsUnlocked },
    tiles: JSON.parse(JSON.stringify(initialState.tiles)),
  };

  const gridHeight = sim.tiles.length;
  const gridWidth = sim.tiles[0]?.length || 0;

  const isPassable = (x: number, y: number): { passable: boolean; reason?: string } => {
    if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) {
      return { passable: false, reason: `Out of bounds! Grid ends at (${x}, ${y}).` };
    }
    const tile = sim.tiles[y][x];
    if (tile === 'wall') {
      return { passable: false, reason: `Collision! Blocked by wall at (${x}, ${y}).` };
    }
    if (tile === 'water') {
      return { passable: false, reason: `Collision! Blocked by deep water at (${x}, ${y}).` };
    }
    if (tile === 'hazard') {
      return { passable: false, reason: `Collision! Blocked by hazard / lava pit at (${x}, ${y}).` };
    }
    if (tile === 'laser_active') {
      return { passable: false, reason: `Collision! Blocked by active high-voltage electric barrier at (${x}, ${y})! Toggle both switches to power it down.` };
    }
    if (tile === 'brambles') {
      return { passable: false, reason: `Collision! Blocked by thorny brambles at (${x}, ${y})! Cast your "spark" spell to burn them away.` };
    }
    if (tile === 'door_locked' && !sim.doors['door']) {
      return { passable: false, reason: `Blocked! Hit locked door at (${x}, ${y}). Collect key and use openDoor()!` };
    }
    return { passable: true };
  };

  const addAction = (type: GameAction['type'], payload?: any, desc?: string) => {
    stepCounter++;
    if (stepCounter > maxSteps) {
      throw new Error(`Maximum action limit of ${maxSteps} reached! Check your loops.`);
    }
    actions.push({
      type,
      payload,
      description: desc,
    });
  };

  const getLineNumber = (): number | undefined => {
    try {
      const err = new Error();
      const stack = err.stack?.split('\n') || [];
      for (const line of stack) {
        const match = line.match(/<anonymous>:(\d+):/);
        if (match) {
          return Math.max(1, parseInt(match[1], 10) - 2);
        }
      }
    } catch (e) {}
    return undefined;
  };

  const performStep = (targetX: number, targetY: number, dir: Direction) => {
    const check = isPassable(targetX, targetY);
    if (!check.passable) {
      throw new Error(check.reason);
    }
    sim.x = targetX;
    sim.y = targetY;
    sim.dir = dir;
    addAction('MOVE', { dir, x: sim.x, y: sim.y, line: getLineNumber() }, `Moved ${dir} to (${sim.x}, ${sim.y})`);
  };

  // Build the sandboxed API
  const api = {
    // Movement APIs with strict collision checking
    moveRight: (count = 1) => {
      const steps = Math.max(1, Math.min(50, Math.floor(count || 1)));
      for (let i = 0; i < steps; i++) {
        performStep(sim.x + 1, sim.y, 'right');
      }
    },
    moveLeft: (count = 1) => {
      const steps = Math.max(1, Math.min(50, Math.floor(count || 1)));
      for (let i = 0; i < steps; i++) {
        performStep(sim.x - 1, sim.y, 'left');
      }
    },
    moveUp: (count = 1) => {
      const steps = Math.max(1, Math.min(50, Math.floor(count || 1)));
      for (let i = 0; i < steps; i++) {
        performStep(sim.x, sim.y - 1, 'up');
      }
    },
    moveDown: (count = 1) => {
      const steps = Math.max(1, Math.min(50, Math.floor(count || 1)));
      for (let i = 0; i < steps; i++) {
        performStep(sim.x, sim.y + 1, 'down');
      }
    },
    moveForward: (count = 1) => {
      const steps = Math.max(1, Math.min(50, Math.floor(count || 1)));
      for (let i = 0; i < steps; i++) {
        let nx = sim.x;
        let ny = sim.y;
        if (sim.dir === 'right') nx += 1;
        else if (sim.dir === 'left') nx -= 1;
        else if (sim.dir === 'up') ny -= 1;
        else if (sim.dir === 'down') ny += 1;
        performStep(nx, ny, sim.dir);
      }
    },
    turnLeft: () => {
      const dirs: Direction[] = ['up', 'left', 'down', 'right'];
      const curIdx = dirs.indexOf(sim.dir);
      sim.dir = dirs[(curIdx + 1) % 4];
      addAction('MOVE', { dir: sim.dir, x: sim.x, y: sim.y, line: getLineNumber() }, `Turned to ${sim.dir}`);
    },
    turnRight: () => {
      const dirs: Direction[] = ['up', 'right', 'down', 'left'];
      const curIdx = dirs.indexOf(sim.dir);
      sim.dir = dirs[(curIdx + 1) % 4];
      addAction('MOVE', { dir: sim.dir, x: sim.x, y: sim.y, line: getLineNumber() }, `Turned to ${sim.dir}`);
    },

    // Interaction APIs
    collectCoin: () => {
      const foundIdx = sim.items.findIndex(
        (it: any) => !it.collected && (it.type === 'coin' || it.type === 'gem' || it.type === 'key') && it.x === sim.x && it.y === sim.y
      );
      if (foundIdx !== -1) {
        const item = sim.items[foundIdx];
        item.collected = true;
        if (item.type === 'coin' || item.type === 'gem') sim.coins += (item.value || 1);
        if (item.type === 'key') {
          sim.hasKey = true;
          sim.keysCount += 1;
        }
        addAction('COLLECT', { itemId: item.id, itemType: item.type, x: sim.x, y: sim.y }, `Collected ${item.type} at (${sim.x}, ${sim.y})`);
      } else {
        addAction('COLLECT', { x: sim.x, y: sim.y }, `Attempted to collect at (${sim.x}, ${sim.y})`);
      }
    },
    openDoor: () => {
      if (sim.hasKey || sim.keysCount > 0) {
        sim.doors['door'] = true;
        const neighbors = [
          { x: sim.x + 1, y: sim.y },
          { x: sim.x - 1, y: sim.y },
          { x: sim.x, y: sim.y + 1 },
          { x: sim.x, y: sim.y - 1 },
          { x: sim.x, y: sim.y },
        ];
        neighbors.forEach((pos) => {
          if (pos.y >= 0 && pos.y < gridHeight && pos.x >= 0 && pos.x < gridWidth) {
            if (sim.tiles[pos.y][pos.x] === 'door_locked') {
              sim.tiles[pos.y][pos.x] = 'door_open';
            }
          }
        });
        addAction('OPEN_DOOR', { x: sim.x, y: sim.y }, `Unlocked door!`);
      } else {
        throw new Error(`Cannot open door: You do not have a key! Collect a key first.`);
      }
    },
    toggleSwitch: () => {
      const swKey = `switch_${sim.x}_${sim.y}`;
      sim.switches[swKey] = !sim.switches[swKey];

      // If both switches on dungeon-4 or similar are active, power down electric barriers
      const sw32 = sim.switches['switch_3_2'];
      const sw53 = sim.switches['switch_5_3'];
      if (sw32 && sw53) {
        for (let r = 0; r < gridHeight; r++) {
          for (let c = 0; c < gridWidth; c++) {
            if (sim.tiles[r][c] === 'laser_active') {
              sim.tiles[r][c] = 'empty';
            }
          }
        }
      }
      addAction('TOGGLE_SWITCH', { x: sim.x, y: sim.y }, `Toggled switch at (${sim.x}, ${sim.y})`);
    },
    attack: () => {
      addAction('ATTACK', { x: sim.x, y: sim.y }, `Attacked forward from (${sim.x}, ${sim.y})`);
    },
    castSpell: (spellName = 'spark') => {
      // Clear enchanted brambles
      for (let r = 0; r < gridHeight; r++) {
        for (let c = 0; c < gridWidth; c++) {
          if (sim.tiles[r][c] === 'brambles') {
            sim.tiles[r][c] = 'empty';
          }
        }
      }
      addAction('CAST_SPELL', { spell: spellName, x: sim.x, y: sim.y }, `Cast spell ${spellName}!`);
    },
    setSpeed: (speedVal: number) => {
      const s = Math.max(1, Math.min(10, Number(speedVal) || 1));
      sim.speed = s;
      addAction('SET_SPEED', { speed: s }, `Speed set to ${s}`);
    },

    // Predicates / Sensor Queries (Reflect real-time environment)
    hasKey: () => sim.hasKey || sim.keysCount > 0,
    getKeysCount: () => sim.keysCount,
    getCoins: () => sim.coins,
    getEnergy: () => sim.energy,
    getPosition: () => ({ x: sim.x, y: sim.y }),
    getDirection: () => sim.dir,
    isPathClear: (direction?: Direction) => {
      const checkDir = direction || sim.dir;
      let targetX = sim.x;
      let targetY = sim.y;
      if (checkDir === 'right') targetX += 1;
      else if (checkDir === 'left') targetX -= 1;
      else if (checkDir === 'up') targetY -= 1;
      else if (checkDir === 'down') targetY += 1;

      return isPassable(targetX, targetY).passable;
    },
    detectEnemy: () => {
      return Boolean(initialState.boss && Math.abs(initialState.boss.x - sim.x) <= 2 && Math.abs(initialState.boss.y - sim.y) <= 2);
    },
    checkTile: (x: number, y: number) => {
      if (y >= 0 && y < gridHeight && x >= 0 && x < gridWidth) {
        return sim.tiles[y][x];
      }
      return 'wall';
    },

    // Controlled Console Logging
    console: {
      log: (...args: any[]) => {
        const text = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
        logs.push({ id: Math.random().toString(), type: 'log', text, timestamp: Date.now() });
      },
      info: (...args: any[]) => {
        const text = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
        logs.push({ id: Math.random().toString(), type: 'info', text, timestamp: Date.now() });
      },
      warn: (...args: any[]) => {
        const text = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
        logs.push({ id: Math.random().toString(), type: 'warn', text, timestamp: Date.now() });
      },
      error: (...args: any[]) => {
        const text = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
        logs.push({ id: Math.random().toString(), type: 'error', text, timestamp: Date.now() });
      },
    },
  };

  // Guard against infinite loops
  let loopIterations = 0;
  const maxIterations = 5000;
  const __guardCheck__ = () => {
    loopIterations++;
    if (loopIterations > maxIterations) {
      throw new Error(`Infinite loop detected! Execution exceeded ${maxIterations} iterations.`);
    }
  };

  try {
    const safeGuardedCode = injectLoopGuards(userCode, maxIterations);

    const blockedGlobals = [
      'window', 'document', 'globalThis', 'fetch', 'XMLHttpRequest',
      'WebSocket', 'localStorage', 'sessionStorage', 'indexedDB',
      'alert', 'prompt', 'confirm', 'Worker', 'location', 'history'
    ];
    const blockedArgs = blockedGlobals.join(', ');

    const apiKeys = Object.keys(api);
    const apiValues = Object.values(api);

    const wrappedFunction = new Function(
      '__guardCheck__',
      ...apiKeys,
      blockedArgs,
      `"use strict";\n${safeGuardedCode}`
    );

    const undefinedArgs = new Array(blockedGlobals.length).fill(undefined);

    wrappedFunction(
      __guardCheck__,
      ...apiValues,
      ...undefinedArgs
    );

    return {
      success: true,
      actions,
      logs,
      totalSteps: actions.length,
    };
  } catch (err: any) {
    const friendly = formatFriendlyError(err);
    logs.push({
      id: Math.random().toString(),
      type: 'error',
      text: `${friendly.title}: ${friendly.message}`,
      timestamp: Date.now(),
      line: friendly.line,
    });

    return {
      success: false,
      actions,
      logs,
      error: {
        name: err.name || 'Error',
        message: err.message || String(err),
        line: friendly.line,
        friendlyExplanation: `${friendly.title}: ${friendly.message}\nTip: ${friendly.tip}`,
      },
      totalSteps: actions.length,
    };
  }
}
