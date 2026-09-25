import React, { useState, useRef } from 'react';
import {
  FantasyCharacter
} from '../types/character';
import {
  Sparkles,
  RotateCw,
  Copy,
  Check,
  BookmarkPlus,
  Shield,
  Swords,
  Heart,
  Skull,
  ScrollText,
  Printer,
  Upload,
  Camera,
  X
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface CharacterCardProps {
  character: FantasyCharacter;
  onRerollAttribute: (attr: keyof FantasyCharacter) => void;
  onSaveCharacter: (character: FantasyCharacter) => void;
  onUpdateAvatarImage: (url: string | undefined) => void;
  isSaved: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onRerollAttribute,
  onSaveCharacter,
  onUpdateAvatarImage,
  isSaved
}) => {
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }

    // Limit size to reasonable base64 limit (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file is too large. Please select an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        sound.playMagicSummon();
        onUpdateAvatarImage(result);
      }
    };
    reader.readAsDataURL(file);
    // Reset file input value
    e.target.value = '';
  };

  const handleRemoveCustomImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    onUpdateAvatarImage(undefined);
  };

  const handleCopyScroll = () => {
    sound.playClick();
    const textSummary = `📜 FANTASY HERO: ${character.name.toUpperCase()}
Title: “${character.title}”
Race: ${character.race} | Class: ${character.characterClass}
Age: ${character.age} | Gender: ${character.gender}
Height: ${character.height} | Weight: ${character.weight}
Kingdom: ${character.kingdom}
Alignment: ${character.alignment}

⚔️ GEAR & COMPANIONS:
• Weapon: ${character.weapon.name} (${character.weapon.description})
• Armor: ${character.armor.name} [${character.armor.rating || 'Standard'}]
• Pet: ${character.pet.name} (${character.pet.species}) - "${character.pet.quirk}"

⚡ ABILITIES & DEFECTS:
• Special Ability: ${character.specialAbility.name} (${character.specialAbility.description})
• Fatal Weakness: ${character.weakness.name} [Trigger: ${character.weakness.trigger}]

🗺️ QUEST: ${character.quest.title}
• Objective: ${character.quest.objective}
• Reward: ${character.quest.reward}

📊 STATS:
Strength: ${character.stats.strength}/100 | Intelligence: ${character.stats.intelligence}/100
Agility: ${character.stats.agility}/100 | Luck: ${character.stats.luck}/100
Charisma: ${character.stats.charisma}/100 | USELESSNESS: ${character.stats.uselessness}%
Battle Power: ${character.battlePower}

📖 BACKSTORY:
${character.backstory}

Generated via Fantasy Character Generator™`;

    navigator.clipboard.writeText(textSummary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <article
      id="character-display"
      className="max-w-5xl mx-auto my-8 rpg-frame rounded-3xl border-2 border-amber-600/40 p-6 sm:p-8 md:p-10 shadow-2xl relative transition-all duration-300 backdrop-blur-md print:bg-white print:text-black print:border-black"
    >
      {/* Corner Ornaments */}
      <div className="absolute top-3 left-3 text-amber-500/40 text-lg select-none">✠</div>
      <div className="absolute top-3 right-3 text-amber-500/40 text-lg select-none">✠</div>
      <div className="absolute bottom-3 left-3 text-amber-500/40 text-lg select-none">✠</div>
      <div className="absolute bottom-3 right-3 text-amber-500/40 text-lg select-none">✠</div>

      {/* Top Banner: Name, Title & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-amber-900/40">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 gold-glow-text">
              {character.name}
            </h2>
            <button
              onClick={() => {
                sound.playReroll();
                onRerollAttribute('title');
              }}
              title="Reroll Dramatic Title"
              className="text-stone-500 hover:text-amber-400 transition-colors p-1"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xl sm:text-2xl font-medieval text-amber-400/90 italic tracking-wide">
            “{character.title}”
          </p>

          {/* Unboxed Metadata Line per frontend design skill */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-xs text-stone-400 font-cinzel pt-2">
            <span className="text-amber-300 font-semibold">{character.race}</span>
            <span aria-hidden="true" className="text-amber-700">·</span>
            <span className="text-stone-300">{character.characterClass}</span>
            <span aria-hidden="true" className="text-amber-700">·</span>
            <span>{character.kingdom}</span>
            <span aria-hidden="true" className="text-amber-700">·</span>
            <span className="text-emerald-400/90">{character.alignment}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 shrink-0 print:hidden">
          <button
            onClick={() => {
              sound.playClick();
              onSaveCharacter(character);
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-cinzel tracking-wider flex items-center gap-1.5 transition-all ${
              isSaved
                ? 'bg-amber-600/20 text-amber-300 border border-amber-500/50'
                : 'bg-stone-900/90 text-stone-300 border border-amber-900/50 hover:border-amber-600/70 hover:text-amber-300'
            }`}
          >
            <BookmarkPlus className="w-4 h-4" />
            <span>{isSaved ? 'Saved in Hall' : 'Save Hero'}</span>
          </button>

          <button
            onClick={handleCopyScroll}
            className="px-3.5 py-2 rounded-lg text-xs font-cinzel tracking-wider bg-stone-900/90 text-stone-300 border border-amber-900/50 hover:border-amber-600/70 hover:text-amber-300 transition-all flex items-center gap-1.5"
            title="Copy character text sheet"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Scroll'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-lg text-xs bg-stone-900/90 text-stone-400 border border-amber-900/50 hover:text-amber-300 hover:border-amber-600/50 transition-colors"
            title="Print Character Parchment"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Portrait & Stats, Right Rich Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Column: Avatar & Core RPG Attributes (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Avatar Frame Area */}
          <div className="relative group mx-auto max-w-[280px]">
            {/* Outer ornate border glow */}
            <div
              className="absolute -inset-1 rounded-2xl blur-md opacity-50 group-hover:opacity-80 transition-opacity"
              style={{ backgroundColor: character.avatar.auraColor }}
            />

            <div className={`relative rounded-2xl border-2 ${character.avatar.borderColor} bg-gradient-to-b ${character.avatar.bgGradient} p-6 text-center shadow-xl overflow-hidden`}>
              {/* Crest Badge in Corner */}
              <div className="absolute top-3 left-3 text-lg select-none opacity-80" title={character.race}>
                {character.avatar.crestSymbol}
              </div>
              <div className="absolute top-3 right-3 text-xs font-mono-stat text-amber-500/80 uppercase">
                Lv. 1
              </div>

              {/* Large Centered Visual Portrait (Clickable to upload custom image) */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                id="avatar-image-upload"
              />

              <div
                onClick={() => {
                  sound.playClick();
                  fileInputRef.current?.click();
                }}
                className="w-28 h-28 mx-auto my-3 rounded-full bg-stone-950/70 border-2 border-amber-500/50 flex items-center justify-center text-6xl shadow-inner relative overflow-hidden select-none cursor-pointer group/avatar hover:border-amber-400 transition-all"
                title="Click to upload custom character portrait"
              >
                {character.avatar.customImageUrl ? (
                  <img
                    src={character.avatar.customImageUrl}
                    alt={character.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="transform group-hover/avatar:scale-110 transition-transform duration-300">
                    {character.avatar.emoji}
                  </span>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-amber-200">
                  <Camera className="w-5 h-5 mb-0.5 text-amber-400" />
                  <span className="text-[9px] font-cinzel tracking-wider uppercase">
                    {character.avatar.customImageUrl ? 'Change' : 'Upload'}
                  </span>
                </div>

                {/* Silhouette vignette overlay */}
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 pointer-events-none" />
              </div>

              {/* Upload Portrait Action Controls */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    fileInputRef.current?.click();
                  }}
                  className="px-2.5 py-1 rounded bg-amber-950/70 border border-amber-700/50 hover:border-amber-500 text-[11px] font-cinzel text-amber-200 hover:text-amber-100 tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Upload className="w-3 h-3 text-amber-400" />
                  <span>{character.avatar.customImageUrl ? 'Change Portrait' : 'Upload Portrait'}</span>
                </button>

                {character.avatar.customImageUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveCustomImage}
                    className="p-1 rounded bg-stone-900 border border-red-900/60 text-stone-400 hover:text-red-400 text-xs transition-colors"
                    title="Reset to default race crest"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-sm font-cinzel font-bold text-amber-200">
                  {character.race} {character.characterClass}
                </div>
                <div className="text-xs text-stone-400 font-sans-rpg">
                  Age: {character.age} years · {character.gender}
                </div>
                <div className="text-[11px] text-stone-500">
                  {character.height} · {character.weight}
                </div>
              </div>

              {/* Battle Power Badge */}
              <div className="mt-4 pt-3 border-t border-amber-900/40">
                <div className="text-[10px] font-cinzel uppercase tracking-widest text-amber-500">
                  Combat Potency
                </div>
                <div className="text-xs font-medieval text-amber-200 font-semibold mt-0.5">
                  ⚡ {character.battlePower}
                </div>
              </div>
            </div>
          </div>

          {/* RPG Stat Sheet with Visual Progress Bars */}
          <div id="character-attributes" className="p-5 rounded-2xl bg-stone-950/60 border border-amber-900/40 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5" />
                <span>Ability Metrics</span>
              </span>
              <button
                onClick={() => {
                  sound.playReroll();
                  onRerollAttribute('stats');
                }}
                className="text-[11px] text-stone-500 hover:text-amber-300 font-cinzel flex items-center gap-1 transition-colors"
                title="Reroll Stats"
              >
                <RotateCw className="w-3 h-3" />
                <span>Reroll</span>
              </button>
            </div>

            {/* Stat Bars */}
            {[
              { label: 'Strength', val: character.stats.strength, max: 100, color: 'bg-red-600' },
              { label: 'Intelligence', val: character.stats.intelligence, max: 100, color: 'bg-blue-600' },
              { label: 'Agility', val: character.stats.agility, max: 100, color: 'bg-emerald-600' },
              { label: 'Luck', val: character.stats.luck, max: 100, color: 'bg-purple-600' },
              { label: 'Charisma', val: character.stats.charisma, max: 100, color: 'bg-pink-600' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="flex justify-between text-xs font-cinzel">
                  <span className="text-stone-400">{stat.label}</span>
                  <span className="text-stone-200 font-mono-stat">{stat.val} / 100</span>
                </div>
                <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden">
                  <div
                    className={`${stat.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${stat.val}%` }}
                  />
                </div>
              </div>
            ))}

            {/* CROWN JEWEL STAT: USELESSNESS */}
            <div className="pt-2 border-t border-stone-800 space-y-1.5">
              <div className="flex justify-between text-xs font-cinzel font-bold">
                <span className="text-amber-400 flex items-center gap-1">
                  <span>👑 USELESSNESS RATING</span>
                </span>
                <span className="text-amber-400 font-mono-stat text-sm font-extrabold">
                  {character.stats.uselessness}%
                </span>
              </div>
              <div className="h-2.5 w-full bg-stone-900 rounded-full overflow-hidden border border-amber-600/40 p-0.5">
                <div
                  className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-300 h-full rounded-full transition-all duration-700"
                  style={{ width: `${character.stats.uselessness}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-500 italic text-right">
                {character.stats.uselessness > 90
                  ? 'Catastrophically unhelpful'
                  : character.stats.uselessness > 80
                  ? 'Significantly counter-productive'
                  : 'Moderately useless'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Modules (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Personality / Quirks */}
          <div className="p-4 rounded-xl bg-stone-950/40 border border-amber-900/30 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-cinzel font-semibold tracking-wider text-amber-400 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-500" />
                <span>Behavioral Disposition</span>
              </span>
              <button
                onClick={() => {
                  sound.playReroll();
                  onRerollAttribute('personality');
                }}
                className="text-[11px] text-stone-500 hover:text-amber-300 font-cinzel flex items-center gap-1"
                title="Reroll Personality"
              >
                <RotateCw className="w-3 h-3" />
              </button>
            </div>
            <p className="text-sm text-stone-300 italic font-medieval leading-relaxed">
              "{character.personality}"
            </p>
          </div>

          {/* Equipment & Familiar Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-cinzel font-bold uppercase tracking-wider text-amber-300/80 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>Armament & Companions</span>
            </h3>

            {/* Weapon Card */}
            <div className="p-4 rounded-xl bg-stone-950/70 border border-amber-900/40 relative group hover:border-amber-600/50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-amber-500 text-sm">🗡️</span>
                    <span className="font-cinzel font-bold text-sm text-amber-100">
                      {character.weapon.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-700/50 text-amber-400 font-cinzel">
                      {character.weapon.rarity}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans-rpg">
                    {character.weapon.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    sound.playReroll();
                    onRerollAttribute('weapon');
                  }}
                  className="text-stone-500 hover:text-amber-400 transition-colors p-1"
                  title="Reroll Weapon"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Armor Card */}
            <div className="p-4 rounded-xl bg-stone-950/70 border border-amber-900/40 relative group hover:border-amber-600/50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-amber-500 text-sm">🛡️</span>
                    <span className="font-cinzel font-bold text-sm text-amber-100">
                      {character.armor.name}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono-stat">
                      [{character.armor.rating}]
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans-rpg">
                    {character.armor.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    sound.playReroll();
                    onRerollAttribute('armor');
                  }}
                  className="text-stone-500 hover:text-amber-400 transition-colors p-1"
                  title="Reroll Armor"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pet Card */}
            <div className="p-4 rounded-xl bg-stone-950/70 border border-amber-900/40 relative group hover:border-amber-600/50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-amber-500 text-sm">🐾</span>
                    <span className="font-cinzel font-bold text-sm text-amber-100">
                      {character.pet.name}
                    </span>
                    <span className="text-xs text-amber-400/90 font-medieval">
                      ({character.pet.species})
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono-stat">
                      · Threat: {character.pet.threatLevel}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans-rpg">
                    {character.pet.quirk}
                  </p>
                </div>
                <button
                  onClick={() => {
                    sound.playReroll();
                    onRerollAttribute('pet');
                  }}
                  className="text-stone-500 hover:text-amber-400 transition-colors p-1"
                  title="Reroll Pet"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Capabilities & Vulnerabilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Special Ability */}
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/40 space-y-1.5 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-cinzel font-bold text-purple-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Special Ability</span>
                </span>
                <button
                  onClick={() => {
                    sound.playReroll();
                    onRerollAttribute('specialAbility');
                  }}
                  className="text-stone-500 hover:text-purple-300 transition-colors p-1"
                  title="Reroll Ability"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
              </div>
              <div className="font-cinzel font-bold text-sm text-purple-200">
                {character.specialAbility.name}
              </div>
              <p className="text-xs text-stone-400 leading-relaxed font-sans-rpg">
                {character.specialAbility.description}
              </p>
              <div className="text-[11px] text-purple-400/80 font-mono-stat pt-1 flex justify-between">
                <span>Cost: {character.specialAbility.manaCost}</span>
                <span>Cooldown: {character.specialAbility.cooldown}</span>
              </div>
            </div>

            {/* Fatal Weakness */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-1.5 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-cinzel font-bold text-red-300 flex items-center gap-1.5">
                  <Skull className="w-3.5 h-3.5 text-red-400" />
                  <span>Fatal Weakness</span>
                </span>
                <button
                  onClick={() => {
                    sound.playReroll();
                    onRerollAttribute('weakness');
                  }}
                  className="text-stone-500 hover:text-red-300 transition-colors p-1"
                  title="Reroll Weakness"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
              </div>
              <div className="font-cinzel font-bold text-sm text-red-200">
                {character.weakness.name}
              </div>
              <p className="text-xs text-stone-400 leading-relaxed font-sans-rpg">
                {character.weakness.description}
              </p>
              <div className="text-[11px] text-red-400/80 font-mono-stat pt-1">
                Trigger: {character.weakness.trigger}
              </div>
            </div>
          </div>

          {/* Active Quest & Backstory */}
          <div className="space-y-4">
            {/* Quest */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 relative">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-1.5">
                  <ScrollText className="w-3.5 h-3.5 text-amber-500" />
                  <span>Unnecessary Quest</span>
                </span>
                <button
                  onClick={() => {
                    sound.playReroll();
                    onRerollAttribute('quest');
                  }}
                  className="text-stone-500 hover:text-amber-300 transition-colors p-1"
                  title="Reroll Quest"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
              </div>
              <div className="font-cinzel font-bold text-sm text-amber-100">
                {character.quest.title}
              </div>
              <p className="text-xs text-stone-300 font-sans-rpg mt-1 leading-relaxed">
                Objective: {character.quest.objective}
              </p>
              <div className="mt-2 pt-2 border-t border-amber-900/30 flex flex-wrap justify-between gap-2 text-[11px] font-mono-stat text-stone-400">
                <span>Reward: <strong className="text-amber-400">{character.quest.reward}</strong></span>
                <span className="text-stone-500">Difficulty: {character.quest.difficulty}</span>
              </div>
            </div>

            {/* Backstory */}
            <div className="p-5 rounded-xl bg-stone-950/60 border border-amber-900/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-amber-400">
                  Chronicle of Origins
                </span>
                <button
                  onClick={() => {
                    sound.playReroll();
                    onRerollAttribute('backstory');
                  }}
                  className="text-[11px] text-stone-500 hover:text-amber-300 font-cinzel flex items-center gap-1"
                  title="Reroll Backstory"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Reroll Lore</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif italic border-l-2 border-amber-700/50 pl-3">
                {character.backstory}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
