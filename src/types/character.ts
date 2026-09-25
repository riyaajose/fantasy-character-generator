export interface EquipmentItem {
  name: string;
  description: string;
  rarity?: 'Common' | 'Dubious' | 'Questionable' | 'Curious' | 'Legendarily Useless' | 'Ancient Junk' | 'Cursed';
  rating?: string;
}

export interface PetCompanion {
  name: string;
  species: string;
  quirk: string;
  threatLevel: string;
}

export interface SpecialAbility {
  name: string;
  description: string;
  manaCost: string;
  cooldown: string;
}

export interface CharacterWeakness {
  name: string;
  description: string;
  trigger: string;
}

export interface HeroQuest {
  title: string;
  objective: string;
  reward: string;
  difficulty: string;
}

export interface CharacterStats {
  strength: number;
  intelligence: number;
  agility: number;
  luck: number;
  charisma: number;
  uselessness: number; // 0 - 100%
}

export interface CharacterAvatar {
  raceKey: string;
  emoji: string;
  bgGradient: string;
  borderColor: string;
  crestSymbol: string;
  auraColor: string;
  customImageUrl?: string;
}

export interface FantasyCharacter {
  id: string;
  name: string;
  title: string;
  race: string;
  characterClass: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  kingdom: string;
  alignment: string;
  personality: string;
  weapon: EquipmentItem;
  armor: EquipmentItem;
  pet: PetCompanion;
  specialAbility: SpecialAbility;
  weakness: CharacterWeakness;
  quest: HeroQuest;
  backstory: string;
  stats: CharacterStats;
  battlePower: string;
  battlePowerScore: number;
  avatar: CharacterAvatar;
  generatedAt: string;
}

export type GenerationMode = 'CHAOS' | 'TOTALLY_USELESS' | 'HEROIC_DISASTER' | 'SURPRISE_ME';
