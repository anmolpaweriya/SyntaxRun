'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { TileType, ItemType, Direction } from '@/types/game';
import { heroesData } from '@/data/heroes';

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { levelState, currentLevel, progress, isRunning } = useGameStore();
  const selectedHero = heroesData.find((h) => h.id === progress.selectedHeroId) || heroesData[0];

  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [hoveredTile, setHoveredTile] = useState<{ x: number; y: number; tile: TileType; item?: any } | null>(null);

  // Animation frame loop ticker
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !currentLevel || !levelState) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let tick = 0;

    const render = () => {
      tick++;
      const width = canvas.width;
      const height = canvas.height;

      const cols = currentLevel.gridWidth;
      const rows = currentLevel.gridHeight;

      // Auto compute tile size to fit canvas comfortably
      const padding = 36;
      const tileSize = Math.min(
        Math.floor((width - padding * 2) / cols),
        Math.floor((height - padding * 2) / rows),
        76
      );

      const gridPixelWidth = cols * tileSize;
      const gridPixelHeight = rows * tileSize;
      const offsetX = Math.floor((width - gridPixelWidth) / 2);
      const offsetY = Math.floor((height - gridPixelHeight) / 2);

      // --- 1. Background Fill & Atmospheric Gradients ---
      const worldId = currentLevel.worldId || 'forest';

      // Base Canvas Background
      if (worldId === 'forest') {
        ctx.fillStyle = '#07130E';
      } else if (worldId === 'dungeon') {
        ctx.fillStyle = '#0D0805';
      } else if (worldId === 'mountains') {
        ctx.fillStyle = '#060F1A';
      } else if (worldId === 'castle') {
        ctx.fillStyle = '#0F091C';
      } else if (worldId === 'factory') {
        ctx.fillStyle = '#140D05';
      } else if (worldId === 'cyber') {
        ctx.fillStyle = '#080514';
      } else {
        ctx.fillStyle = '#060718';
      }
      ctx.fillRect(0, 0, width, height);

      // Ambient radial lighting
      const ambientGlow = ctx.createRadialGradient(
        width / 2, height / 2, 40,
        width / 2, height / 2, width * 0.75
      );
      if (worldId === 'forest') {
        ambientGlow.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
        ambientGlow.addColorStop(1, 'rgba(4, 47, 46, 0.02)');
      } else if (worldId === 'dungeon') {
        ambientGlow.addColorStop(0, 'rgba(249, 115, 22, 0.15)');
        ambientGlow.addColorStop(1, 'rgba(67, 20, 7, 0.02)');
      } else if (worldId === 'mountains') {
        ambientGlow.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
        ambientGlow.addColorStop(1, 'rgba(8, 47, 73, 0.02)');
      } else if (worldId === 'castle') {
        ambientGlow.addColorStop(0, 'rgba(168, 85, 247, 0.15)');
        ambientGlow.addColorStop(1, 'rgba(59, 7, 100, 0.02)');
      } else if (worldId === 'factory') {
        ambientGlow.addColorStop(0, 'rgba(245, 158, 11, 0.15)');
        ambientGlow.addColorStop(1, 'rgba(69, 26, 3, 0.02)');
      } else if (worldId === 'cyber') {
        ambientGlow.addColorStop(0, 'rgba(236, 72, 153, 0.15)');
        ambientGlow.addColorStop(1, 'rgba(80, 7, 36, 0.02)');
      } else {
        ambientGlow.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
        ambientGlow.addColorStop(1, 'rgba(30, 27, 75, 0.02)');
      }
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // Board container drop shadow & border
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 30;
      ctx.fillStyle = '#0B0F19';
      ctx.fillRect(offsetX - 6, offsetY - 6, gridPixelWidth + 12, gridPixelHeight + 12);
      ctx.restore();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 2;
      ctx.strokeRect(offsetX - 6, offsetY - 6, gridPixelWidth + 12, gridPixelHeight + 12);

      // --- 2. Render Floor Tiles & Obstacles ---
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const tile = levelState.tiles[r]?.[c] || 'empty';
          const x = offsetX + c * tileSize;
          const y = offsetY + r * tileSize;

          // --- FLOOR RENDERING ---
          if (tile !== 'wall' && tile !== 'water' && tile !== 'hazard') {
            if (worldId === 'forest') {
              // Forest Meadow Floor: lush grass with soil texture
              ctx.fillStyle = (c + r) % 2 === 0 ? '#112217' : '#0E1C13';
              ctx.fillRect(x, y, tileSize, tileSize);

              // Grass tufts / dirt speckles
              const pseudoRand = (c * 17 + r * 31) % 10;
              if (pseudoRand > 5) {
                ctx.fillStyle = '#1B3B26';
                ctx.fillRect(x + tileSize * 0.3, y + tileSize * 0.4, 3, 4);
                ctx.fillRect(x + tileSize * 0.3 + 2, y + tileSize * 0.4 - 2, 2, 6);
              } else if (pseudoRand === 2) {
                // Tiny yellow forest blossom
                ctx.fillStyle = '#FDE047';
                ctx.beginPath();
                ctx.arc(x + tileSize * 0.7, y + tileSize * 0.6, 1.8, 0, Math.PI * 2);
                ctx.fill();
              }
            } else if (worldId === 'dungeon') {
              // Dungeon Cave Floor: cracked basalt cobblestones
              ctx.fillStyle = (c + r) % 2 === 0 ? '#1A1412' : '#140F0D';
              ctx.fillRect(x, y, tileSize, tileSize);

              // Stone brick borders
              ctx.strokeStyle = '#29201D';
              ctx.lineWidth = 1;
              ctx.strokeRect(x + 1, y + 1, tileSize - 2, tileSize - 2);

              // Glowing lava fissure between some tiles
              if ((c * 13 + r * 7) % 8 === 0) {
                ctx.strokeStyle = `rgba(249, 115, 22, ${0.3 + Math.sin(tick * 0.08 + c) * 0.15})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(x + tileSize * 0.2, y + tileSize * 0.8);
                ctx.lineTo(x + tileSize * 0.5, y + tileSize * 0.5);
                ctx.lineTo(x + tileSize * 0.8, y + tileSize * 0.6);
                ctx.stroke();
              }
            } else if (worldId === 'mountains') {
              // Mountain Snow / Frost Floor
              ctx.fillStyle = (c + r) % 2 === 0 ? '#0F1E2E' : '#0B1724';
              ctx.fillRect(x, y, tileSize, tileSize);

              // Frosty crystal sparkle
              if ((c * 23 + r * 11) % 6 === 0) {
                ctx.fillStyle = 'rgba(186, 230, 253, 0.4)';
                ctx.fillRect(x + tileSize * 0.4, y + tileSize * 0.3, 2, 2);
              }
            } else if (worldId === 'castle') {
              // Castle Royal Marble Floor
              ctx.fillStyle = (c + r) % 2 === 0 ? '#1E1B2E' : '#161424';
              ctx.fillRect(x, y, tileSize, tileSize);

              // Royal diamond inlay
              ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
              ctx.strokeRect(x + tileSize * 0.25, y + tileSize * 0.25, tileSize * 0.5, tileSize * 0.5);
            } else if (worldId === 'factory') {
              // Factory Steel Plate Floor
              ctx.fillStyle = (c + r) % 2 === 0 ? '#1C1917' : '#171412';
              ctx.fillRect(x, y, tileSize, tileSize);

              // Corner copper rivets
              ctx.fillStyle = '#78350F';
              ctx.fillRect(x + 3, y + 3, 2, 2);
              ctx.fillRect(x + tileSize - 5, y + 3, 2, 2);
              ctx.fillRect(x + 3, y + tileSize - 5, 2, 2);
              ctx.fillRect(x + tileSize - 5, y + tileSize - 5, 2, 2);
            } else if (worldId === 'cyber') {
              // Cyber Neon Grid Floor
              ctx.fillStyle = '#0B091A';
              ctx.fillRect(x, y, tileSize, tileSize);

              // Glowing grid lines
              ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
              ctx.lineWidth = 1;
              ctx.strokeRect(x, y, tileSize, tileSize);

              // Circuit microdot
              if ((c * 7 + r * 9) % 5 === 0) {
                ctx.fillStyle = '#EC4899';
                ctx.beginPath();
                ctx.arc(x + tileSize / 2, y + tileSize / 2, 1.5, 0, Math.PI * 2);
                ctx.fill();
              }
            } else {
              // Algorithm Realm Cosmic Matrix Floor
              ctx.fillStyle = (c + r) % 2 === 0 ? '#0D0E24' : '#090A1A';
              ctx.fillRect(x, y, tileSize, tileSize);

              // Starry node dot
              ctx.fillStyle = 'rgba(129, 140, 248, 0.25)';
              ctx.beginPath();
              ctx.arc(x + tileSize / 2, y + tileSize / 2, 1.5, 0, Math.PI * 2);
              ctx.fill();
            }

            // Grid coordinate line
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.strokeRect(x, y, tileSize, tileSize);
          }

          // --- 3. THEMATIC WALL / OBSTACLE RENDERING ---
          if (tile === 'wall') {
            if (worldId === 'forest') {
              // 🌿 FOREST: Ancient Tree with wooden trunk & lush foliage canopy
              ctx.save();
              // Drop shadow onto floor
              ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
              ctx.beginPath();
              ctx.ellipse(x + tileSize / 2, y + tileSize * 0.85, tileSize * 0.38, tileSize * 0.14, 0, 0, Math.PI * 2);
              ctx.fill();

              // Tree Trunk base
              ctx.fillStyle = '#451A03';
              ctx.fillRect(x + tileSize * 0.38, y + tileSize * 0.5, tileSize * 0.24, tileSize * 0.35);

              // Foliage canopy cluster 1 (Dark shadow green)
              ctx.fillStyle = '#14532D';
              ctx.beginPath();
              ctx.arc(x + tileSize * 0.5, y + tileSize * 0.42, tileSize * 0.36, 0, Math.PI * 2);
              ctx.fill();

              // Foliage canopy cluster 2 (Lush emerald green)
              ctx.fillStyle = '#15803D';
              ctx.beginPath();
              ctx.arc(x + tileSize * 0.4, y + tileSize * 0.34, tileSize * 0.26, 0, Math.PI * 2);
              ctx.arc(x + tileSize * 0.6, y + tileSize * 0.34, tileSize * 0.26, 0, Math.PI * 2);
              ctx.arc(x + tileSize * 0.5, y + tileSize * 0.24, tileSize * 0.24, 0, Math.PI * 2);
              ctx.fill();

              // Top highlight leaf cluster
              ctx.fillStyle = '#22C55E';
              ctx.beginPath();
              ctx.arc(x + tileSize * 0.46, y + tileSize * 0.26, tileSize * 0.14, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            } else if (worldId === 'dungeon') {
              // 🔥 DUNGEON: Jagged Cave Rock with Wall Torch
              ctx.save();
              // Rock base
              ctx.fillStyle = '#1C1917';
              ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

              // Cracked jagged rock facets
              ctx.fillStyle = '#292524';
              ctx.beginPath();
              ctx.moveTo(x + 3, y + 3);
              ctx.lineTo(x + tileSize * 0.6, y + 3);
              ctx.lineTo(x + tileSize * 0.4, y + tileSize * 0.7);
              ctx.lineTo(x + 3, y + tileSize * 0.7);
              ctx.closePath();
              ctx.fill();

              ctx.strokeStyle = '#44403C';
              ctx.lineWidth = 1.5;
              ctx.strokeRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

              // Wall Torch Sconce & Flickering Flame
              const torchX = x + tileSize * 0.5;
              const torchY = y + tileSize * 0.45;
              ctx.fillStyle = '#78350F';
              ctx.fillRect(torchX - 2, torchY, 4, 12);

              // Flickering Torch Flame
              const flameBob = Math.sin(tick * 0.2 + c + r) * 2;
              ctx.shadowColor = '#EA580C';
              ctx.shadowBlur = 12;

              ctx.fillStyle = '#F97316';
              ctx.beginPath();
              ctx.arc(torchX, torchY - 2 + flameBob, 5, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = '#FDE047';
              ctx.beginPath();
              ctx.arc(torchX, torchY - 1 + flameBob, 2.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            } else if (worldId === 'mountains') {
              // ❄️ MOUNTAINS: Snow-capped Icy Peak
              ctx.save();
              ctx.fillStyle = '#0F172A';
              ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

              // Ice mountain crag
              ctx.fillStyle = '#0369A1';
              ctx.beginPath();
              ctx.moveTo(x + tileSize * 0.5, y + 4);
              ctx.lineTo(x + tileSize - 4, y + tileSize - 4);
              ctx.lineTo(x + 4, y + tileSize - 4);
              ctx.closePath();
              ctx.fill();

              // Snowy cap highlight
              ctx.fillStyle = '#F0F9FF';
              ctx.beginPath();
              ctx.moveTo(x + tileSize * 0.5, y + 4);
              ctx.lineTo(x + tileSize * 0.7, y + tileSize * 0.4);
              ctx.lineTo(x + tileSize * 0.5, y + tileSize * 0.35);
              ctx.lineTo(x + tileSize * 0.3, y + tileSize * 0.4);
              ctx.closePath();
              ctx.fill();
              ctx.restore();
            } else if (worldId === 'castle') {
              // 🏰 CASTLE: Regal Stone Battlement & Royal Banner
              ctx.save();
              ctx.fillStyle = '#1E1B4B';
              ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

              // Crenellations
              ctx.fillStyle = '#312E81';
              ctx.fillRect(x + 4, y + 4, tileSize * 0.35, 8);
              ctx.fillRect(x + tileSize * 0.55, y + 4, tileSize * 0.35, 8);

              // Royal violet banner hanging
              ctx.fillStyle = '#7C3AED';
              ctx.fillRect(x + tileSize * 0.3, y + 14, tileSize * 0.4, tileSize * 0.5);

              // Gold banner trim
              ctx.fillStyle = '#FBBF24';
              ctx.fillRect(x + tileSize * 0.3, y + tileSize * 0.64, tileSize * 0.4, 3);
              ctx.restore();
            } else if (worldId === 'factory') {
              // ⚙️ FACTORY: Industrial Bronze Box with Rotating Gear
              ctx.save();
              ctx.fillStyle = '#292524';
              ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

              // Hazard stripes
              ctx.fillStyle = '#B45309';
              ctx.fillRect(x + 4, y + 4, tileSize - 8, 6);

              // Rotating Gear
              const gearAngle = tick * 0.04 + c;
              ctx.translate(x + tileSize / 2, y + tileSize / 2 + 4);
              ctx.rotate(gearAngle);

              ctx.fillStyle = '#F59E0B';
              for (let i = 0; i < 6; i++) {
                ctx.rotate(Math.PI / 3);
                ctx.fillRect(-3, -tileSize * 0.3, 6, tileSize * 0.6);
              }
              ctx.beginPath();
              ctx.arc(0, 0, tileSize * 0.18, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = '#1C1917';
              ctx.beginPath();
              ctx.arc(0, 0, tileSize * 0.08, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            } else if (worldId === 'cyber') {
              // ⚡ CYBER: Neon Skyscraper Monolith
              ctx.save();
              ctx.fillStyle = '#0F0E26';
              ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

              ctx.shadowColor = '#38BDF8';
              ctx.shadowBlur = 10;
              ctx.strokeStyle = '#0284C7';
              ctx.lineWidth = 1.5;
              ctx.strokeRect(x + 3, y + 3, tileSize - 6, tileSize - 6);

              // Cyan holographic beacon
              ctx.fillStyle = '#38BDF8';
              ctx.fillRect(x + tileSize * 0.3, y + 8, tileSize * 0.4, 3);
              ctx.fillRect(x + tileSize * 0.3, y + 16, tileSize * 0.4, 3);
              ctx.restore();
            } else {
              // ✨ ALGORITHM: Cosmic Obsidian Monolith with Glyphs
              ctx.save();
              ctx.fillStyle = '#0B0D21';
              ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

              ctx.shadowColor = '#6366F1';
              ctx.shadowBlur = 12;
              ctx.strokeStyle = '#4F46E5';
              ctx.lineWidth = 1.5;
              ctx.strokeRect(x + 3, y + 3, tileSize - 6, tileSize - 6);

              // Floating sacred rune diamond
              ctx.fillStyle = '#818CF8';
              ctx.beginPath();
              ctx.moveTo(x + tileSize / 2, y + tileSize * 0.3);
              ctx.lineTo(x + tileSize * 0.7, y + tileSize * 0.5);
              ctx.lineTo(x + tileSize / 2, y + tileSize * 0.7);
              ctx.lineTo(x + tileSize * 0.3, y + tileSize * 0.5);
              ctx.closePath();
              ctx.fill();
              ctx.restore();
            }
          }

          // --- 4. WATER & HAZARDS ---
          if (tile === 'water') {
            ctx.save();
            ctx.fillStyle = '#0369A1';
            ctx.fillRect(x, y, tileSize, tileSize);

            // Water ripples
            const ripple = Math.sin(tick * 0.08 + c + r) * 3;
            ctx.strokeStyle = 'rgba(186, 230, 253, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(x + tileSize * 0.5, y + tileSize * 0.5, tileSize * 0.28 + ripple, 0, Math.PI * 2);
            ctx.stroke();

            // Lily pad in forest water
            if (worldId === 'forest' && (c + r) % 3 === 0) {
              ctx.fillStyle = '#15803D';
              ctx.beginPath();
              ctx.arc(x + tileSize * 0.4, y + tileSize * 0.4, 6, 0, Math.PI * 1.8);
              ctx.fill();
            }
            ctx.restore();
          } else if (tile === 'hazard') {
            // Lava / Hazard pit
            ctx.save();
            ctx.fillStyle = '#450A0A';
            ctx.fillRect(x, y, tileSize, tileSize);

            // Animated lava bubbles
            const bubblePulse = (Math.sin(tick * 0.1 + c * 3) + 1) * 0.5;
            ctx.fillStyle = '#DC2626';
            ctx.beginPath();
            ctx.arc(x + tileSize * 0.4, y + tileSize * 0.4, 5 + bubblePulse * 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#F59E0B';
            ctx.beginPath();
            ctx.arc(x + tileSize * 0.65, y + tileSize * 0.6, 3 + bubblePulse * 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // --- 5. INTERACTIVE OBJECT TILES ---

          // Electric Laser Barrier
          if (tile === 'laser_active') {
            ctx.save();
            // Floor base underneath
            ctx.fillStyle = '#0F172A';
            ctx.fillRect(x + 1, y + 1, tileSize - 2, tileSize - 2);

            // Emitter pillars at top and bottom
            ctx.fillStyle = '#334155';
            ctx.fillRect(x + tileSize / 2 - 8, y + 2, 16, 6);
            ctx.fillRect(x + tileSize / 2 - 8, y + tileSize - 8, 16, 6);

            // Glowing Electric Beam
            const pulseBeam = Math.sin(tick * 0.25) * 2;
            ctx.shadowColor = '#06B6D4';
            ctx.shadowBlur = 22;

            ctx.strokeStyle = 'rgba(6, 182, 212, 0.9)';
            ctx.lineWidth = 6 + pulseBeam;
            ctx.beginPath();
            ctx.moveTo(x + tileSize / 2, y + 4);
            ctx.lineTo(x + tileSize / 2, y + tileSize - 4);
            ctx.stroke();

            // Hot white electric core
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Electric sparks and lightning jitters
            for (let i = 0; i < 3; i++) {
              const sparkY = y + 8 + ((tick * (3 + i) * 7) % (tileSize - 16));
              const sparkOffset = (Math.sin(tick * 0.4 + i) * 6);
              ctx.fillStyle = '#F472B6';
              ctx.beginPath();
              ctx.arc(x + tileSize / 2 + sparkOffset, sparkY, 2, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }

          // Brambles Barrier
          if (tile === 'brambles') {
            ctx.save();
            ctx.fillStyle = '#1A102E';
            ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);
            ctx.strokeStyle = '#7C3AED';
            ctx.lineWidth = 2;
            ctx.strokeRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

            ctx.font = `${Math.floor(tileSize * 0.55)}px system-ui`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🪵', x + tileSize / 2, y + tileSize / 2);
            ctx.restore();
          }

          // Open Door
          if (tile === 'door_open' || (tile === 'door_locked' && levelState.doorsUnlocked['door'])) {
            ctx.save();
            ctx.fillStyle = '#1E293B';
            ctx.fillRect(x + 3, y + 3, tileSize - 6, tileSize - 6);
            ctx.strokeStyle = '#10B981';
            ctx.lineWidth = 2;
            ctx.strokeRect(x + 3, y + 3, tileSize - 6, tileSize - 6);
            ctx.font = `${Math.floor(tileSize * 0.45)}px system-ui`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🚪', x + tileSize / 2, y + tileSize / 2);
            ctx.restore();
          }

          // Locked Door
          if (tile === 'door_locked' && !levelState.doorsUnlocked['door']) {
            ctx.save();
            ctx.fillStyle = '#78350F';
            ctx.fillRect(x + 3, y + 3, tileSize - 6, tileSize - 6);
            ctx.strokeStyle = '#D97706';
            ctx.lineWidth = 2;
            ctx.strokeRect(x + 3, y + 3, tileSize - 6, tileSize - 6);

            ctx.font = `${Math.floor(tileSize * 0.45)}px system-ui`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = '#FBBF24';
            ctx.shadowBlur = 10;
            ctx.fillText('🔒', x + tileSize / 2, y + tileSize / 2);
            ctx.restore();
          }

          // Pressure Switches
          const swKey = `switch_${c}_${r}`;
          const isSwActive = levelState.switchesActive[swKey];
          if (tile === 'switch_off' || tile === 'switch_on') {
            ctx.save();
            // Switch plate
            ctx.fillStyle = isSwActive ? '#14532D' : '#374151';
            ctx.fillRect(x + tileSize * 0.2, y + tileSize * 0.2, tileSize * 0.6, tileSize * 0.6);

            // Glowing indicator
            ctx.shadowColor = isSwActive ? '#4ADE80' : '#9CA3AF';
            ctx.shadowBlur = isSwActive ? 15 : 4;
            ctx.fillStyle = isSwActive ? '#22C55E' : '#6B7280';
            ctx.beginPath();
            ctx.arc(x + tileSize / 2, y + tileSize / 2, tileSize * 0.16, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // Exit Portal
          if (
            (currentLevel.exitPosition && currentLevel.exitPosition.x === c && currentLevel.exitPosition.y === r) ||
            tile === 'exit'
          ) {
            const rot = tick * 0.03;
            const cx = x + tileSize / 2;
            const cy = y + tileSize / 2;
            const radius = tileSize * 0.38;

            ctx.save();
            ctx.translate(cx, cy);

            // Outer portal halo
            const portalGlow = ctx.createRadialGradient(0, 0, 5, 0, 0, radius * 1.3);
            portalGlow.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
            portalGlow.addColorStop(0.5, 'rgba(168, 85, 247, 0.6)');
            portalGlow.addColorStop(1, 'rgba(59, 130, 246, 0)');

            ctx.fillStyle = portalGlow;
            ctx.beginPath();
            ctx.arc(0, 0, radius * 1.3, 0, Math.PI * 2);
            ctx.fill();

            // Rotating magical runes
            ctx.rotate(rot);
            ctx.strokeStyle = '#FDE047';
            ctx.lineWidth = 2.5;
            ctx.strokeRect(-radius * 0.6, -radius * 0.6, radius * 1.2, radius * 1.2);

            ctx.rotate(-rot * 2);
            ctx.strokeStyle = '#38BDF8';
            ctx.lineWidth = 2;
            ctx.strokeRect(-radius * 0.45, -radius * 0.45, radius * 0.9, radius * 0.9);

            ctx.restore();
          }
        }
      }

      // --- 6. RENDER ITEMS (Coins, Gems, Keys) ---
      levelState.items.forEach((item) => {
        if (item.collected) return;
        const ix = offsetX + item.x * tileSize + tileSize / 2;
        const iy = offsetY + item.y * tileSize + tileSize / 2;
        const bob = Math.sin(tick * 0.08 + item.x + item.y) * 4;

        if (item.type === 'coin') {
          // Glowing Gold Coin
          ctx.save();
          ctx.shadowColor = '#FBBF24';
          ctx.shadowBlur = 14;

          ctx.fillStyle = '#F59E0B';
          ctx.beginPath();
          ctx.arc(ix, iy + bob, tileSize * 0.24, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#FDE047';
          ctx.beginPath();
          ctx.arc(ix, iy + bob, tileSize * 0.18, 0, Math.PI * 2);
          ctx.fill();

          // Sparkle
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(ix - 3, iy + bob - 3, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (item.type === 'gem') {
          // Faceted Gem
          ctx.save();
          ctx.shadowColor = item.color || '#38BDF8';
          ctx.shadowBlur = 18;

          const size = tileSize * 0.28;
          ctx.fillStyle = item.color || '#38BDF8';
          ctx.beginPath();
          ctx.moveTo(ix, iy + bob - size);
          ctx.lineTo(ix + size, iy + bob);
          ctx.lineTo(ix, iy + bob + size);
          ctx.lineTo(ix - size, iy + bob);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        } else if (item.type === 'key') {
          // Golden Key
          ctx.save();
          ctx.font = `${Math.floor(tileSize * 0.55)}px system-ui`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = '#FBBF24';
          ctx.shadowBlur = 16;
          ctx.fillText('🗝️', ix, iy + bob);
          ctx.restore();
        }
      });

      // --- 7. RENDER BOSS (If present) ---
      if (levelState.boss) {
        const boss = levelState.boss;
        const bx = offsetX + boss.x * tileSize + tileSize / 2;
        const by = offsetY + boss.y * tileSize + tileSize / 2;
        const bossBob = Math.sin(tick * 0.05) * 5;

        ctx.save();
        ctx.shadowColor = boss.color;
        ctx.shadowBlur = 25;

        ctx.fillStyle = boss.color;
        ctx.beginPath();
        ctx.arc(bx, by + bossBob, tileSize * 0.45, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = `${Math.floor(tileSize * 0.65)}px system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let bossEmoji = '👹';
        if (boss.id.includes('treant')) bossEmoji = '🌲';
        else if (boss.id.includes('gatekeeper')) bossEmoji = '👁️';
        else if (boss.id.includes('hydra')) bossEmoji = '🐉';
        else if (boss.id.includes('alchemist')) bossEmoji = '🧙';
        else if (boss.id.includes('golem')) bossEmoji = '🤖';
        else if (boss.id.includes('overlord')) bossEmoji = '👾';
        else if (boss.id.includes('dragon')) bossEmoji = '🐲';

        ctx.fillText(bossEmoji, bx, by + bossBob);

        // Boss Health Bar
        const barWidth = tileSize * 1.2;
        const barHeight = 8;
        const barX = bx - barWidth / 2;
        const barY = by - tileSize * 0.6 + bossBob;

        ctx.fillStyle = '#0F172A';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        const hpPct = Math.max(0, boss.hp / boss.maxHp);
        ctx.fillStyle = hpPct > 0.4 ? '#22C55E' : '#EF4444';
        ctx.fillRect(barX + 1, barY + 1, (barWidth - 2) * hpPct, barHeight - 2);

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barWidth, barHeight);

        ctx.fillStyle = '#F8FAFC';
        ctx.font = 'bold 10px system-ui';
        ctx.fillText(`${boss.name} (${boss.hp} HP)`, bx, barY - 6);
        ctx.restore();
      }

      // --- 8. RENDER PLAYER CHARACTER WITH SOFT LIGHTING ---
      const px = offsetX + levelState.player.x * tileSize + tileSize / 2;
      const py = offsetY + levelState.player.y * tileSize + tileSize / 2;
      const playerBob = isRunning ? Math.sin(tick * 0.3) * 4 : Math.sin(tick * 0.08) * 2;

      ctx.save();
      // Hero ambient lantern glow
      const heroLight = ctx.createRadialGradient(px, py, 10, px, py, tileSize * 1.6);
      heroLight.addColorStop(0, 'rgba(251, 191, 36, 0.25)');
      heroLight.addColorStop(1, 'rgba(251, 191, 36, 0)');
      ctx.fillStyle = heroLight;
      ctx.beginPath();
      ctx.arc(px, py, tileSize * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Hero shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.beginPath();
      ctx.ellipse(px, py + tileSize * 0.35, tileSize * 0.3, tileSize * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Glowing hero aura
      ctx.shadowColor = selectedHero.color;
      ctx.shadowBlur = 18;

      ctx.font = `${Math.floor(tileSize * 0.65)}px system-ui`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (levelState.player.direction === 'left') {
        ctx.scale(-1, 1);
        ctx.fillText(selectedHero.avatarIcon, -px, py + playerBob);
      } else {
        ctx.fillText(selectedHero.avatarIcon, px, py + playerBob);
      }
      ctx.restore();

      // --- 9. AMBIENT ATMOSPHERIC PARTICLES (Fireflies, Embers, Snow, Cyber, Stars) ---
      ctx.save();
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const seed = i * 7919;
        const speed = 0.5 + (seed % 3) * 0.3;

        let partX = (seed * 13 + tick * speed) % width;
        let partY = (seed * 31 + Math.sin(tick * 0.03 + i) * 25) % height;
        if (partY < 0) partY += height;

        if (worldId === 'forest') {
          // Golden floating fireflies
          const alpha = 0.3 + Math.sin(tick * 0.05 + i) * 0.3;
          ctx.fillStyle = `rgba(253, 224, 71, ${alpha})`;
          ctx.beginPath();
          ctx.arc(partX, partY, 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (worldId === 'dungeon') {
          // Rising fiery embers
          const emberY = (height - ((tick * 1.2 + seed) % height));
          ctx.fillStyle = 'rgba(249, 115, 22, 0.6)';
          ctx.beginPath();
          ctx.arc(partX, emberY, 1.8, 0, Math.PI * 2);
          ctx.fill();
        } else if (worldId === 'mountains') {
          // Drifting soft snowflakes
          const snowY = (tick * 1.5 + seed) % height;
          ctx.fillStyle = 'rgba(240, 249, 255, 0.7)';
          ctx.beginPath();
          ctx.arc(partX, snowY, 2.2, 0, Math.PI * 2);
          ctx.fill();
        } else if (worldId === 'cyber') {
          // Falling digital bits
          const bitY = (tick * 2 + seed) % height;
          ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
          ctx.fillRect(partX, bitY, 2, 5);
        } else {
          // Cosmic starlight twinkles
          const twinkle = (Math.sin(tick * 0.08 + i) + 1) * 0.5;
          ctx.fillStyle = `rgba(165, 180, 252, ${0.2 + twinkle * 0.6})`;
          ctx.beginPath();
          ctx.arc(partX, partY, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // --- 10. Hover Info Box ---
      if (hoveredTile && hoveredTile.x < cols && hoveredTile.y < rows) {
        const hx = offsetX + hoveredTile.x * tileSize;
        const hy = offsetY + hoveredTile.y * tileSize;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(hx, hy, tileSize, tileSize);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentLevel, levelState, selectedHero, isRunning, hoveredTile]);

  // Handle Canvas resize cleanly to parent container
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !currentLevel) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const cols = currentLevel.gridWidth;
    const rows = currentLevel.gridHeight;
    const padding = 36;
    const tileSize = Math.min(
      Math.floor((rect.width - padding * 2) / cols),
      Math.floor((rect.height - padding * 2) / rows),
      76
    );

    const gridPixelWidth = cols * tileSize;
    const gridPixelHeight = rows * tileSize;
    const offsetX = Math.floor((rect.width - gridPixelWidth) / 2);
    const offsetY = Math.floor((rect.height - gridPixelHeight) / 2);

    const col = Math.floor((clientX - offsetX) / tileSize);
    const row = Math.floor((clientY - offsetY) / tileSize);

    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      const tile = levelState?.tiles[row]?.[col] || 'empty';
      const item = levelState?.items.find((it) => !it.collected && it.x === col && it.y === row);
      setHoveredTile({ x: col, y: row, tile, item });
      setMousePos({ x: clientX, y: clientY });
    } else {
      setHoveredTile(null);
      setMousePos(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredTile(null);
    setMousePos(null);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[360px] bg-game-bg overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full block cursor-crosshair"
      />

      {/* Grid Coordinates HUD in bottom left corner */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono text-slate-300">
        <span className="text-game-accent">POS:</span>
        <span>
          ({levelState?.player.x || 0}, {levelState?.player.y || 0})
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-amber-400">DIR:</span>
        <span className="uppercase">{levelState?.player.direction}</span>
        {hoveredTile && (
          <>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400">HOVER:</span>
            <span>({hoveredTile.x}, {hoveredTile.y})</span>
          </>
        )}
      </div>

      {/* Hover Info Tooltip */}
      {hoveredTile && mousePos && (
        <div
          className="pointer-events-none absolute z-20 bg-slate-900/95 border border-sky-500/50 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 shadow-glow backdrop-blur-md"
          style={{
            left: `${mousePos.x + 15}px`,
            top: `${mousePos.y + 15}px`,
          }}
        >
          <div className="font-semibold text-sky-400">Tile ({hoveredTile.x}, {hoveredTile.y})</div>
          <div className="capitalize text-slate-300">Type: {hoveredTile.tile.replace('_', ' ')}</div>
          {hoveredTile.item && (
            <div className="text-amber-300 font-medium">Item: {hoveredTile.item.label || hoveredTile.item.type}</div>
          )}
        </div>
      )}
    </div>
  );
};
