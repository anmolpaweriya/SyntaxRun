export interface WorldMetadata {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  conceptSummary: string;
  badge: string;
  color: string;
  themeClass: string;
  gradient: string;
  mapCoordinates: { x: number; y: number };
  bossName: string;
}

export const worldsData: WorldMetadata[] = [
  {
    id: 'forest',
    name: 'Syntax Forest',
    subtitle: 'World 1: Fundamentals of Code',
    description: 'An enchanted ancient grove where every leaf responds to basic JavaScript syntax, variables, and function invocations.',
    conceptSummary: 'Variables, Constants, Data Types, Math Operators & Functions',
    badge: '🌿 World 1',
    color: '#10B981',
    themeClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
    gradient: 'from-emerald-950 via-slate-900 to-emerald-950',
    mapCoordinates: { x: 12, y: 70 },
    bossName: 'The Syntax Treant',
  },
  {
    id: 'dungeon',
    name: 'Logic Dungeon',
    subtitle: 'World 2: Conditionals & Truth',
    description: 'Subterranean corridors of truth where ancient puzzles evaluate Boolean expressions and open secret chambers.',
    conceptSummary: 'Booleans, Comparisons (===, >, <), if / else, Logical Operators (&&, ||, !)',
    badge: '🔥 World 2',
    color: '#F97316',
    themeClass: 'text-orange-400 border-orange-500/30 bg-orange-950/20',
    gradient: 'from-orange-950 via-slate-900 to-amber-950',
    mapCoordinates: { x: 28, y: 45 },
    bossName: 'The Gatekeeper of Truth',
  },
  {
    id: 'mountains',
    name: 'Loop Mountains',
    subtitle: 'World 3: Iteration & Cycles',
    description: 'Towering icy peaks where repetitive stone steps require `for` and `while` loops to ascend through the biting blizzard.',
    conceptSummary: 'for loops, while loops, break, continue & nested loops',
    badge: '❄️ World 3',
    color: '#06B6D4',
    themeClass: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20',
    gradient: 'from-cyan-950 via-slate-900 to-blue-950',
    mapCoordinates: { x: 44, y: 22 },
    bossName: 'The Infinite Hydra',
  },
  {
    id: 'castle',
    name: 'Function Castle',
    subtitle: 'World 4: Modular Sorcery',
    description: 'A grand citadel of spellcasters who package magic into reusable functions, arrow syntax, and returned values.',
    conceptSummary: 'Parameters, return values, arrow functions, scope & closures',
    badge: '🏰 World 4',
    color: '#8B5CF6',
    themeClass: 'text-purple-400 border-purple-500/30 bg-purple-950/20',
    gradient: 'from-purple-950 via-slate-900 to-violet-950',
    mapCoordinates: { x: 60, y: 38 },
    bossName: 'The Grand Alchemist',
  },
  {
    id: 'factory',
    name: 'Object Factory',
    subtitle: 'World 5: Object-Oriented Engineering',
    description: 'A sprawling steampunk industrial forge that fabricates robots, structures, and systems using object-oriented principles.',
    conceptSummary: 'Objects, properties, methods, classes & instantiation',
    badge: '⚙️ World 5',
    color: '#F59E0B',
    themeClass: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
    gradient: 'from-amber-950 via-slate-900 to-yellow-950',
    mapCoordinates: { x: 72, y: 65 },
    bossName: 'The Autonomous Golem',
  },
  {
    id: 'cyber',
    name: 'Async Cyber City',
    subtitle: 'World 6: Asynchronous Networks',
    description: 'A neon-drenched metropolis pulsating with promises, async/await pipelines, and resilient error-handling protocols.',
    conceptSummary: 'Promises, async/await, timers & try / catch / finally',
    badge: '⚡ World 6',
    color: '#EC4899',
    themeClass: 'text-pink-400 border-pink-500/30 bg-pink-950/20',
    gradient: 'from-pink-950 via-slate-900 to-fuchsia-950',
    mapCoordinates: { x: 86, y: 40 },
    bossName: 'The Cyber Overlord',
  },
  {
    id: 'algo',
    name: 'Algorithm Realm',
    subtitle: 'World 7: The Cosmic Singularity',
    description: 'The highest plane of computational reality where arrays, transformations, and recursive algorithms weave the fabric of space.',
    conceptSummary: 'Arrays, map / filter / reduce, searching, sorting & recursion',
    badge: '✨ World 7',
    color: '#6366F1',
    themeClass: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/20',
    gradient: 'from-indigo-950 via-slate-900 to-slate-950',
    mapCoordinates: { x: 92, y: 15 },
    bossName: 'The Void Dragon',
  },
];

