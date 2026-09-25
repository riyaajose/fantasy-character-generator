import { EquipmentItem, PetCompanion, SpecialAbility, CharacterWeakness, HeroQuest } from '../types/character';

export const FIRST_NAMES = [
  'Brogdan', 'Elidyr', 'Thistle', 'Ignatius', 'Gorbag', 'Barnaby', 'Valerius',
  'Morwenna', 'Snorri', 'Kaelen', 'Pipsqueak', 'Griswold', 'Caspian', 'Rowena',
  'Balthazar', 'Finnegan', 'Vespera', 'Grimtooth', 'Alabaster', 'Wobbly', 'Hannelore',
  'Percival', 'Zalbag', 'Dorothea', 'Maelgwn', 'Eustace', 'Gwendolyn', 'Hagrid',
  'Snarf', 'Thaddeus', 'Astrid', 'Corvus', 'Bimble', 'Oakhaven', 'Zephyr', 'Crumpet',
  'Leopold', 'Baphomet Jr.', 'Sybilla', 'Hulga', 'Tiberius', 'Cuthbert', 'Fritzi'
];

export const LAST_NAMES = [
  'Ironbeard', 'Butterfingers', 'Sunstrider', 'Mudwalker', 'Proudshoe',
  'the Perplexed', 'Graveltooth', 'Nightwhisper', 'Puddleborn', 'Oakenknee',
  'Copperkettle', 'Silverspoon', 'Doomwhistle', 'Featherstep', 'Brambletoe',
  'Thrice-Cursed', 'Soursop', 'Bogstrider', 'Goldfleece', 'Waffleson',
  'Grimshanks', 'Tavern-Bane', 'Cobblestone', 'Stormkettle', 'Marrowgnawer'
];

export const DRAMATIC_TITLES = [
  'The Unnecessarily Confident',
  'Slayer of Lukewarm Soups',
  'Bane of Mild Inconveniences',
  'The Chronically Unprepared',
  'Heir to Absolutely Nothing',
  'Defender of Pointless Arguments',
  'Master of Irrelevant Trivia',
  'The Loudly Whispering',
  'Doom of Folded Laundry',
  'Whisperer to Indifferent Pigeons',
  'Scourge of the Local Bakery',
  'The Over-Caffeinated',
  'The Reluctant Chosen One',
  'First of Their Name, Last to Arrive',
  'Lord of Misplaced Keys',
  'The Aggressively Polite',
  'Vanquisher of Dust Bunnies',
  'The Mildly Concerning',
  'Watcher of Wet Paint Drying',
  'Hero of Unopened Letters',
  'The Inexplicably Wet',
  'Bearer of Unsolicited Opinions',
  'The Spectacularly Mediocre',
  'Bringer of Awkward Silences'
];

export const RACES = [
  {
    name: 'Human',
    emoji: '🧙',
    bgGradient: 'from-amber-950/60 via-stone-900/80 to-zinc-950',
    borderColor: 'border-amber-700/60',
    auraColor: 'rgba(217, 119, 6, 0.4)',
    crestSymbol: '👑',
    defaultClasses: ['Aggressive Diplomat', 'Bureaucratic Paladin', 'Overqualified Bard']
  },
  {
    name: 'High Elf',
    emoji: '🧝',
    bgGradient: 'from-teal-950/60 via-stone-900/80 to-emerald-950',
    borderColor: 'border-emerald-600/60',
    auraColor: 'rgba(16, 185, 129, 0.4)',
    crestSymbol: '🌿',
    defaultClasses: ['Condescending Archivist', 'Hedge Wizard', 'Aesthetic Snob']
  },
  {
    name: 'Dwarf',
    emoji: '⛏️',
    bgGradient: 'from-stone-900 via-yellow-950/50 to-neutral-950',
    borderColor: 'border-yellow-700/60',
    auraColor: 'rgba(234, 179, 8, 0.4)',
    crestSymbol: '⚒️',
    defaultClasses: ['Ale Sommelier', 'Tunnel Procrastinator', 'Beard Enthusiast']
  },
  {
    name: 'Orc',
    emoji: '👹',
    bgGradient: 'from-red-950/60 via-stone-900/80 to-neutral-950',
    borderColor: 'border-red-700/60',
    auraColor: 'rgba(239, 68, 68, 0.4)',
    crestSymbol: '🪓',
    defaultClasses: ['Emotional Berserker', 'Sensitive Poet', 'Door Smasher']
  },
  {
    name: 'Wizard',
    emoji: '🧙‍♂️',
    bgGradient: 'from-purple-950/60 via-stone-900/80 to-indigo-950',
    borderColor: 'border-purple-600/60',
    auraColor: 'rgba(168, 85, 247, 0.4)',
    crestSymbol: '✨',
    defaultClasses: ['Sparks Enthusiast', 'Apprentice of 40 Years', 'Rune Dropper']
  },
  {
    name: 'Knight',
    emoji: '🛡️',
    bgGradient: 'from-blue-950/60 via-slate-900/80 to-zinc-950',
    borderColor: 'border-blue-600/60',
    auraColor: 'rgba(59, 130, 246, 0.4)',
    crestSymbol: '⚔️',
    defaultClasses: ['Squeaky Armor Cavalier', 'Honor Bound Pedant', 'Horse Whisperer']
  },
  {
    name: 'Dragonborn',
    emoji: '🐉',
    bgGradient: 'from-orange-950/60 via-stone-900/80 to-red-950',
    borderColor: 'border-orange-600/60',
    auraColor: 'rgba(249, 115, 22, 0.4)',
    crestSymbol: '🔥',
    defaultClasses: ['Smoke Belcher', 'Scale Polisher', 'Gold Hoarder Trainee']
  },
  {
    name: 'Necromancer',
    emoji: '💀',
    bgGradient: 'from-emerald-950/70 via-stone-950 to-neutral-950',
    borderColor: 'border-emerald-700/60',
    auraColor: 'rgba(52, 211, 153, 0.4)',
    crestSymbol: '☠️',
    defaultClasses: ['Skeleton Choreographer', 'Grave Florist', 'Bone Re-organizer']
  },
  {
    name: 'Goblin',
    emoji: '👺',
    bgGradient: 'from-lime-950/60 via-stone-900/80 to-zinc-950',
    borderColor: 'border-lime-600/60',
    auraColor: 'rgba(132, 204, 22, 0.4)',
    crestSymbol: '🪙',
    defaultClasses: ['Tax Evasion Rogue', 'Shin Kicker', 'Scrap Metal Connoisseur']
  },
  {
    name: 'Halfling',
    emoji: '🥖',
    bgGradient: 'from-amber-950/50 via-stone-900/80 to-yellow-950/50',
    borderColor: 'border-amber-600/60',
    auraColor: 'rgba(245, 158, 11, 0.4)',
    crestSymbol: '🥨',
    defaultClasses: ['Elevenses Enforcer', 'Professional Second-Breaktaster', 'Pie Slinger']
  },
  {
    name: 'Sentient Cabbage',
    emoji: '🥬',
    bgGradient: 'from-green-950/60 via-stone-900/80 to-emerald-950',
    borderColor: 'border-green-600/60',
    auraColor: 'rgba(34, 197, 94, 0.4)',
    crestSymbol: '🌱',
    defaultClasses: ['Vegetative Mystic', 'Slow Roll Druid', 'Salad Survivor']
  }
];

export const CLASSES = [
  'Aggressive Diplomat',
  'Emotional Berserker',
  'Cat-Herding Ranger',
  'Passive-Aggressive Monk',
  'Bureaucratic Paladin',
  'Anxious Rogue',
  'Reluctant Warlock',
  'Overqualified Bard',
  'Hedge Wizard with Budget Issues',
  'Chronic Complainer',
  'Unlicensed Alchemist',
  'Retired Chosen One',
  'Spelling-Bee Necromancer',
  'Tax Auditing Cleric',
  'Shield Polish Craftsman',
  'Exhausted Dungeon Janitor'
];

export const GENDERS = [
  'Male',
  'Female',
  'Non-Binary',
  'Three Goblins in a Trenchcoat',
  'Indescribable Cosmic Mist',
  'Exclusively Grammatical',
  'Celestial Agender'
];

export const KINGDOMS = [
  'The Principality of Mild Disappointment',
  'The Sunken Empire of Damp Socks',
  'The Free Queendom of Overpriced Pastries',
  'Fort Procrastination',
  'The Whispering Swamps of Second Thoughts',
  'High Bastion of Awkward Silences',
  'The Duchy of Unsolicited Opinions',
  'The Republic of Lukewarm Stew',
  'The Barony of Forgotten Birthdays',
  'Mount Pointless & the Low Valleys',
  'The Sovereign City of Cobbled Excuses'
];

export const ALIGNMENTS = [
  'Lawful Annoying',
  'Chaotic Exhausted',
  'Neutral Bored',
  'Chaotic Petty',
  'Lawful Sarcastic',
  'True Confused',
  'Chaotic Well-Intentioned',
  'Neutral Over-Caffeinated',
  'Lawful Clueless',
  'Chaotic Hungry'
];

export const PERSONALITIES = [
  'Deeply offended by room-temperature water. Loudly narrates inner monologue during stealth sequences.',
  'Pathologically apologetic to inanimate objects when bumping into them. Smiles only during clerical errors.',
  'Unflinchingly optimistic in burning buildings, but bursts into tears if their bread crust is uneven.',
  'Pretends to understand ancient prophecy runes by nodding very solemnly with furrowed eyebrows.',
  'Constantly assumes everyone in tavern wants to hear their unfinished 14-volume accordion saga.',
  'Extremely brave until a medium-sized moth enters the vicinity. Negotiates with door handles.',
  'Believes all problems can be solved with a very detailed spreadsheet written in pig Latin.'
];

export const WEAPONS: EquipmentItem[] = [
  {
    name: 'Spoon of Minor Discomfort +2',
    description: 'Forged from lukewarm pewter. Deals 1d4 psychic annoyance damage to nearby soup enthusiasts.',
    rarity: 'Legendarily Useless'
  },
  {
    name: 'The Sword That Screams Apologetically On Impact',
    description: 'Every time it hits an enemy, it bellows "OH GOSH I AM SO SORRY ARE YOU OKAY?" at 95 decibels.',
    rarity: 'Curious'
  },
  {
    name: 'Slightly Damp Bowstring of Regret',
    description: 'Shoots arrows that always curve backward to land in the archer’s boot.',
    rarity: 'Cursed'
  },
  {
    name: 'The Crossbow of Excessive Politeness',
    description: 'Requires a signed 3-page consent waiver from the target before releasing the bolt.',
    rarity: 'Dubious'
  },
  {
    name: 'Warhammer of Inconvenient Weight',
    description: 'Strikes for massive tectonic damage, but weighs 450 lbs. The hero has not managed to lift it off the carpet yet.',
    rarity: 'Legendarily Useless'
  },
  {
    name: 'Staff of Lukewarm Sparks',
    description: 'Produces faint glowing embers that can barely toast half a marshmallow after 40 minutes of concentrated chanting.',
    rarity: 'Questionable'
  },
  {
    name: 'Dagger with an Ergonomic Banana Grip',
    description: 'Smells faintly of tropical smoothies. Slippery when wielded under heroic pressure.',
    rarity: 'Common'
  },
  {
    name: 'The Greatsword of Dramatic Posing',
    description: 'Grants +20 to personal vanity, but must be held in a dramatic profile silhouette for 6 seconds before swinging.',
    rarity: 'Ancient Junk'
  }
];

export const ARMORS: EquipmentItem[] = [
  {
    name: 'Full Plate Forged from Heavy Copper Cookware',
    description: 'Loudly clangs like a falling kitchen pantry with every single step. Highly effective against stray ladles.',
    rating: 'AC 11 (Deafening)'
  },
  {
    name: 'Enchanted Bathrobe of Procrastination',
    description: 'Provides immense warmth and comfort. Reduces the wearer’s motivation to fight evil by 94%.',
    rating: 'AC 8 (Cozy)'
  },
  {
    name: 'Leather Tunic That Squeaks at High Frequency',
    description: 'Every breathing motion emits a distinct rubber duck squeak. Eliminates all stealth checks entirely.',
    rating: 'AC 10 (Squeaky)'
  },
  {
    name: 'Chainmail Made Entirely of Paperclips',
    description: 'Looks surprisingly professional from 30 paces away. Unravels immediately upon encountering a stern breeze.',
    rating: 'AC 9 (Office Grade)'
  },
  {
    name: 'Cardboard Helm of Intimidation',
    description: 'Has scary horns drawn on with charcoal. Melted slightly during last Tuesday’s afternoon drizzle.',
    rating: 'AC 7 (Perishable)'
  },
  {
    name: 'Cloak of Becoming Inconspicuous When Nobody Is Looking',
    description: 'Functions flawlessly in empty rooms. The instant an observer turns around, it glows bright fluorescent yellow.',
    rating: 'AC 10 (Tactical)'
  }
];

export const PETS: PetCompanion[] = [
  {
    name: 'Barnaby',
    species: 'Hyper-Judgmental Ferret',
    quirk: 'Stares at allies with deep moral disappointment whenever bad tactical decisions are made.',
    threatLevel: 'Zero physical, 100% emotional'
  },
  {
    name: 'Lord Honkerton',
    species: 'Invisible Phantom Goose',
    quirk: 'Completely undetectable except for a booming, echoed HONK whenever you attempt stealth.',
    threatLevel: 'Moderate psychological'
  },
  {
    name: 'Sir Russet',
    species: 'Mildly Telepathic Potato',
    quirk: 'Transmits faint thoughts of soil composition and butter directly into the party leader’s mind.',
    threatLevel: 'Tuberous'
  },
  {
    name: 'Gromlet',
    species: 'Geriatric Goblin Pug',
    quirk: 'Snores in perfect rhythmic iambic pentameter. Refuses to walk uphill under any circumstances.',
    threatLevel: 'Negligible'
  },
  {
    name: 'Archibald',
    species: 'Pigeon with a Law Degree',
    quirk: 'Presents tiny avian cease-and-desist scrolls to enemy goblins before combat begins.',
    threatLevel: 'Litigious'
  },
  {
    name: 'Bartholomew',
    species: 'Anxious Screech Owl',
    quirk: 'Only screeches when someone lies about their high school athletics achievements.',
    threatLevel: 'Vocal nuisance'
  }
];

export const SPECIAL_ABILITIES: SpecialAbility[] = [
  {
    name: 'Aura of Lukewarm Soup',
    description: 'Any hot soup within a 15-foot radius is instantly cooled to room temperature. Causes deep sorrow in taverns.',
    manaCost: '12 MP',
    cooldown: '30 seconds'
  },
  {
    name: 'Dramatic Wind of Inappropriate Timing',
    description: 'Summons a cinematic breeze that billows capes and hair dramatically, even while trapped in a subterranean toilet.',
    manaCost: '5 MP',
    cooldown: 'Constant'
  },
  {
    name: 'Commune with River Pebbles',
    description: 'Can speak fluently with stones. The stones exclusively complain about wet feet and judge the party’s footwear.',
    manaCost: '20 MP',
    cooldown: '1 hour'
  },
  {
    name: 'Tactical Hiccup Burst',
    description: 'Erupts into loud rhythmic hiccups that startle small rodents and ruin every negotiation.',
    manaCost: '8 MP',
    cooldown: 'Whenever stressed'
  },
  {
    name: 'Instantaneous Disinterest',
    description: 'Can make any opponent lose interest in the fight by reading aloud 4 pages of zoning bylaws.',
    manaCost: '35 MP',
    cooldown: 'Once per encounter'
  },
  {
    name: 'Summon 1d4 Mildly Annoyed Squirrels',
    description: 'Squirrels appear, pelt the nearest enemy with acorns for 2 seconds, and immediately run up a pine tree.',
    manaCost: '15 MP',
    cooldown: 'Daily'
  }
];

export const WEAKNESSES: CharacterWeakness[] = [
  {
    name: 'Severe Allergy to Heroic Responsibility',
    description: 'Breaks into hives whenever someone uses the words "our only hope" or "chosen one".',
    trigger: 'Epic speeches'
  },
  {
    name: 'Compulsive Grammar Correction',
    description: 'Cannot physically refrain from correcting a dragon’s subject-verb agreement before breath attacks.',
    trigger: 'Improper usage of "who" vs "whom"'
  },
  {
    name: 'Paralyzing Fear of Mayonnaise',
    description: 'Will abandon a legendary quest if any tavern sandwich contains white viscous condiments.',
    trigger: 'Egg-based emulsions'
  },
  {
    name: 'Shoes Perpetually Filled with Phantom Pebbles',
    description: 'Spends 25 minutes of every battle removing their left boot to shake out non-existent gravel.',
    trigger: 'Walking more than 6 yards'
  },
  {
    name: 'Vulnerable to Dramatic Flattery',
    description: 'Will immediately surrender all kingdom secrets if the enemy praises their cheekbones.',
    trigger: 'Compliments from villains'
  }
];

export const QUESTS: HeroQuest[] = [
  {
    title: 'The Great Left Slipper of Oakhaven',
    objective: 'Journey into the Dread Caverns of Agony to retrieve the tavern keeper’s missing left house slipper.',
    reward: 'A lukewarm mug of cider and half an onion',
    difficulty: 'Unnecessarily Perilous'
  },
  {
    title: 'The Unsubscribe Crusade',
    objective: 'Travel to the Dark Lord’s basalt citadel and convince his herald to remove you from the kingdom raven spam list.',
    reward: 'Silence, finally',
    difficulty: 'Bureaucratically Impossible'
  },
  {
    title: 'The Casserole of Destiny',
    objective: 'Deliver an artisanal tuna casserole to Aunt Mildred across three goblin-infested swamps before it cools down.',
    reward: 'A wet kiss on the forehead and 2 copper coins',
    difficulty: 'Timed Crisis'
  },
  {
    title: 'The Legal Petition for Sir Russet',
    objective: 'Argue before the High Council of Mages that your pet potato deserves honorary citizenship and tax credits.',
    reward: 'Writ of Vegetable Exemption',
    difficulty: 'Intellectually Exhausting'
  },
  {
    title: 'The Mythical Rustle in the Bushes',
    objective: 'Hunt down an ancient forest apparition that turns out to just be an overweight raccoon stuck in a fence.',
    reward: 'A sticky pinecone',
    difficulty: 'Anti-Climactic'
  }
];

export const BACKSTORIES = [
  'Originally trained as an apprentice accountant for the Royal Treasury, they accidentally signed an ancient demon pact while filling out an expense voucher. Now exiled from the guild, they wander the realm armed with poor judgment and an unyielding commitment to proper bookkeeping.',
  'Prophesied by an elderly blind seer to do "something moderately noticeable between the ages of 30 and 65." They immediately purchased the loudest suit of copper armor they could find and set out to find whatever that prophecy was talking about.',
  'Banished from the High Elven Sanctuary after loudly microwaving a fish stew in the sacred eternal crystal chamber. With nowhere left to turn, they formed an adventuring pact with a judgmental ferret and a very squeaky pair of boots.',
  'Found floating down the Whispering River inside a wicker laundry basket alongside three mismatched socks and a recipe for turnips. They took this as an unequivocal divine mandate to purge evil, or at least complain about evil until it leaves.',
  'Once a champion of the local village pie-eating tournament, a witch cursed them so that all their heroic deeds are accompanied by a faint, jaunty accordion tune. They seek vengeance, but mostly they just want the accordion to stop.',
  'Spent twelve grueling years at the Mage Academy learning the most cataclysmic destructive spells in existence, only to realize on graduation day that they had accidentally studied the curriculum for Interior Decorating.'
];

export const RITUAL_STEPS = [
  'Consulting the ancient gods...',
  'Rolling the cosmic dice...',
  'Searching forgotten kingdoms...',
  'Calculating unnecessary abilities...',
  'Checking uselessness thresholds...',
  'Questioning your life choices...',
  'Summoning hero...'
];
