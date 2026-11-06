# ⚔️ SyntaxRun – A JavaScript Learning Adventure Game

> **Your code is your controller.** Learn JavaScript, solve puzzles, defeat bosses, and unlock new worlds!

SyntaxRun is a 2D indie adventure game where players master JavaScript by writing actual code to control their character and interact with the game environment.

---

## 🎮 Game Concept & Features

### 1. Genuine JavaScript Execution Sandbox
- **Not a fake simulator**: Real JavaScript code controls character movement and interactions.
- **Controlled API**:
  - `moveRight(steps?)`, `moveLeft(steps?)`, `moveUp(steps?)`, `moveDown(steps?)`, `moveForward(steps?)`
  - `collectCoin()`, `openDoor()`, `toggleSwitch()`, `attack()`, `castSpell(name)`
  - `hasKey()`, `isPathClear()`, `setSpeed(multiplier)`, `console.log(...)`
- **Strict Collision & Obstacle Mechanics**:
  - Movement is blocked by walls, water, hazard/lava pits, active electric laser barriers, and enchanted brambles.
  - Interactive mechanics:
    - **Electric Laser Barriers**: Rendered with pulsing high-voltage lightning arcs. Powered down when corresponding floor switches are toggled!
    - **Enchanted Brambles**: Impassable dark thorny thickets that burn away when casting spells like `castSpell("spark")`.
    - **Locked Iron Doors**: Locked gates that open with `openDoor()` once a key is collected.
  - Infinite loop detection with execution limits (5,000 max iterations guard).
  - Beginner-friendly syntax and runtime error explanations.
  - Step-by-step code execution with line highlighting in Monaco Editor.

### 2. Seven Visually Distinct Worlds
1. **🌿 Syntax Forest**: Variables (`let`/`const`), types, math operators, template literals, function declarations (10 fully progressive playable levels + **The Syntax Treant Boss**).
2. **🔥 Logic Dungeon**: Booleans, comparisons (`===`, `>`, `<`), logical operators (`&&`, `||`, `!`), branching `if/else` paths + **The Gatekeeper of Truth Boss**.
3. **❄️ Loop Mountains**: `for` loops, `while` loops, `break`, `continue`, nested 2D loops + **The Infinite Hydra Boss**.
4. **🏰 Function Castle**: Parameters, return values, arrow functions (`=>`), scope & closures + **The Grand Alchemist Boss**.
5. **⚙️ Object Factory**: Objects, properties, methods, classes & constructors + **The Autonomous Golem Boss**.
6. **⚡ Async Cyber City**: Promises, `async/await`, timers, error handling (`try/catch`) + **The Cyber Overlord Boss**.
7. **✨ Algorithm Realm**: Array methods (`map`, `filter`, `reduce`), recursion, algorithms + **The Void Dragon Final Boss**.

### 3. Hero Unlock & Progression System (Unlockable with Coins)
- 🧙‍♂️ **Cipher (The Code Wizard)**: *Free / Unlocked by default* (0 Coins)
- 🤖 **Byte (The Cyber Knight)**: *Unlock for 150 Coins*
- 🦊 **Pixel (The Rogue Mechanic)**: *Unlock for 250 Coins*
- ✨ **Nova (The Star Alchemist)**: *Unlock for 400 Coins*
- Earn coins across levels to unlock heroes in the **Dashboard Roster** or **Settings Modal**.

### 4. Practice Arena Free-Play Sandbox
- Practice coding without restrictions on an open 9×6 training ground.
- Switch between 7 world visual themes on the fly.
- Pre-loaded algorithm code presets (loops, while path clear, array map, and object bots).

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router) & TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: `@monaco-editor/react`
- **State Management**: Zustand (with persistent localStorage save)
- **Visual Effects**: Custom High-Performance 2D Canvas Engine, `canvas-confetti`
- **Audio Engine**: Web Audio API Chiptune / Synth Engine

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Or build and start for production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
