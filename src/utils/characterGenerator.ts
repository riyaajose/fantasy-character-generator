import {
  FantasyCharacter,
  GenerationMode,
  CharacterStats
} from '../types/character';
import {
  FIRST_NAMES,
  LAST_NAMES,
  DRAMATIC_TITLES,
  RACES,
  CLASSES,
  GENDERS,
  KINGDOMS,
  ALIGNMENTS,
  PERSONALITIES,
  WEAPONS,
  ARMORS,
  PETS,
  SPECIAL_ABILITIES,
  WEAKNESSES,
  QUESTS,
  BACKSTORIES
} from '../data/fantasyData';

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const HEIGHT_MODIFIERS = [
  "(including pointy hat)",
  "(slouches aggressively)",
  "(wears 3-inch insoles)",
  "(measured on tiptoes)",
  "(shrinks in cold weather)",
  "(looks shorter in full plate)"
];

const WEIGHT_MODIFIERS = [
  "(mostly lint and copper coins)",
  "(unexplained density)",
  "(weighed with wet socks)",
  "(90% emotional baggage)",
  "(includes 4 pocket snacks)"
];

const BATTLE_POWER_DESCRIPTIONS = [
  "Slightly lower than an average badger",
  "Dangerous only to kitchen glassware",
  "Threat level: Mildly irritating",
  "Equivalent to 0.4 damp squirrels",
  "Can defeat a sleeping slug in fair combat",
  "Intimidates strictly domestic cats",
  "Statistically negligible in a dragon fight",
  "Potent only when no enemies are present",
  "Could theoretically harm a dandelion"
];

export function generateCharacter(mode: GenerationMode = 'SURPRISE_ME'): FantasyCharacter {
  const raceObj = getRandomItem(RACES);
  const firstName = getRandomItem(FIRST_NAMES);
  const lastName = getRandomItem(LAST_NAMES);
  const name = `${firstName} ${lastName}`;
  const title = getRandomItem(DRAMATIC_TITLES);

  // Class selection (sometimes picks from race default classes for flavor, sometimes chaos)
  const characterClass = Math.random() > 0.4 && raceObj.defaultClasses && raceObj.defaultClasses.length > 0
    ? getRandomItem(raceObj.defaultClasses)
    : getRandomItem(CLASSES);

  // Age based on race flavor
  let age = getRandomInt(21, 68);
  if (raceObj.name.includes('Elf')) age = getRandomInt(112, 450);
  if (raceObj.name.includes('Dwarf')) age = getRandomInt(65, 230);
  if (raceObj.name.includes('Dragonborn')) age = getRandomInt(25, 120);
  if (raceObj.name.includes('Necromancer') || raceObj.name.includes('Skeleton')) age = getRandomInt(80, 600);
  if (raceObj.name.includes('Sentient Cabbage')) age = getRandomInt(2, 6);

  const gender = getRandomItem(GENDERS);

  // Height & Weight
  const baseFeet = getRandomInt(3, 6);
  const baseInches = getRandomInt(0, 11);
  const height = `${baseFeet}'${baseInches}" ${getRandomItem(HEIGHT_MODIFIERS)}`;
  const weight = `${getRandomInt(75, 260)} lbs ${getRandomItem(WEIGHT_MODIFIERS)}`;

  // Stats calculation
  let uselessness = getRandomInt(68, 99);
  if (mode === 'TOTALLY_USELESS') {
    uselessness = getRandomInt(92, 100);
  } else if (mode === 'HEROIC_DISASTER') {
    uselessness = getRandomInt(75, 95);
  }

  const stats: CharacterStats = {
    strength: mode === 'TOTALLY_USELESS' ? getRandomInt(3, 30) : getRandomInt(8, 78),
    intelligence: getRandomInt(6, 92),
    agility: getRandomInt(4, 85),
    luck: getRandomInt(1, 99),
    charisma: getRandomInt(5, 94),
    uselessness
  };

  const rawPower = Math.max(1, Math.floor((stats.strength + stats.agility + stats.intelligence) / 6 - (uselessness / 4)));
  const battlePowerDesc = getRandomItem(BATTLE_POWER_DESCRIPTIONS);
  const battlePower = `${rawPower} (${battlePowerDesc})`;

  return {
    id: `hero-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name,
    title,
    race: raceObj.name,
    characterClass,
    age,
    gender,
    height,
    weight,
    kingdom: getRandomItem(KINGDOMS),
    alignment: getRandomItem(ALIGNMENTS),
    personality: getRandomItem(PERSONALITIES),
    weapon: getRandomItem(WEAPONS),
    armor: getRandomItem(ARMORS),
    pet: getRandomItem(PETS),
    specialAbility: getRandomItem(SPECIAL_ABILITIES),
    weakness: getRandomItem(WEAKNESSES),
    quest: getRandomItem(QUESTS),
    backstory: getRandomItem(BACKSTORIES),
    stats,
    battlePower,
    battlePowerScore: rawPower,
    avatar: {
      raceKey: raceObj.name,
      emoji: raceObj.emoji,
      bgGradient: raceObj.bgGradient,
      borderColor: raceObj.borderColor,
      crestSymbol: raceObj.crestSymbol,
      auraColor: raceObj.auraColor
    },
    generatedAt: new Date().toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
}

export function rerollAttribute<K extends keyof FantasyCharacter>(
  character: FantasyCharacter,
  attribute: K
): FantasyCharacter {
  const updated = { ...character };

  switch (attribute) {
    case 'weapon':
      updated.weapon = getRandomItem(WEAPONS.filter(w => w.name !== character.weapon.name));
      break;
    case 'armor':
      updated.armor = getRandomItem(ARMORS.filter(a => a.name !== character.armor.name));
      break;
    case 'pet':
      updated.pet = getRandomItem(PETS.filter(p => p.name !== character.pet.name));
      break;
    case 'specialAbility':
      updated.specialAbility = getRandomItem(SPECIAL_ABILITIES.filter(s => s.name !== character.specialAbility.name));
      break;
    case 'weakness':
      updated.weakness = getRandomItem(WEAKNESSES.filter(w => w.name !== character.weakness.name));
      break;
    case 'quest':
      updated.quest = getRandomItem(QUESTS.filter(q => q.title !== character.quest.title));
      break;
    case 'title':
      updated.title = getRandomItem(DRAMATIC_TITLES.filter(t => t !== character.title));
      break;
    case 'personality':
      updated.personality = getRandomItem(PERSONALITIES.filter(p => p !== character.personality));
      break;
    case 'backstory':
      updated.backstory = getRandomItem(BACKSTORIES.filter(b => b !== character.backstory));
      break;
    case 'stats': {
      const uselessness = getRandomInt(65, 99);
      updated.stats = {
        strength: getRandomInt(8, 80),
        intelligence: getRandomInt(8, 90),
        agility: getRandomInt(5, 85),
        luck: getRandomInt(1, 99),
        charisma: getRandomInt(6, 95),
        uselessness
      };
      const rawPower = Math.max(1, Math.floor((updated.stats.strength + updated.stats.agility) / 6));
      updated.battlePower = `${rawPower} (${getRandomItem(BATTLE_POWER_DESCRIPTIONS)})`;
      updated.battlePowerScore = rawPower;
      break;
    }
    default:
      break;
  }

  return updated;
}
