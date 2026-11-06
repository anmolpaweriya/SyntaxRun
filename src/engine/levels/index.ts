import { LevelDefinition } from '@/types/game';
import { syntaxForestLevels } from './syntaxForest';
import { logicDungeonLevels } from './logicDungeon';
import { loopMountainsLevels } from './loopMountains';
import { functionCastleLevels } from './functionCastle';
import { objectFactoryLevels } from './objectFactory';
import { asyncCityLevels } from './asyncCity';
import { algorithmRealmLevels } from './algorithmRealm';
import { createSandboxLevel } from './sandbox';

export const allLevels: LevelDefinition[] = [
  ...syntaxForestLevels,
  ...logicDungeonLevels,
  ...loopMountainsLevels,
  ...functionCastleLevels,
  ...objectFactoryLevels,
  ...asyncCityLevels,
  ...algorithmRealmLevels,
];

export const getLevelById = (id: string): LevelDefinition | undefined => {
  if (id.startsWith('sandbox')) {
    const parts = id.split('-');
    const theme = parts[1] || 'forest';
    return createSandboxLevel(theme);
  }
  return allLevels.find((l) => l.id === id);
};

export const getLevelsByWorld = (worldId: string): LevelDefinition[] => {
  return allLevels.filter((l) => l.worldId === worldId);
};

export const getNextLevel = (currentId: string): LevelDefinition | undefined => {
  const index = allLevels.findIndex((l) => l.id === currentId);
  if (index !== -1 && index + 1 < allLevels.length) {
    return allLevels[index + 1];
  }
  return undefined;
};
