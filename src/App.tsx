import React, { useState, useEffect } from 'react';
import { FantasyCharacter, GenerationMode } from './types/character';
import { generateCharacter, rerollAttribute } from './utils/characterGenerator';
import { sound } from './utils/soundEffects';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RitualProgress } from './components/RitualProgress';
import { CharacterCard } from './components/CharacterCard';
import { EmptyState } from './components/EmptyState';
import { HallOfDisasters } from './components/HallOfDisasters';
import { LoreCodex } from './components/LoreCodex';
import { Footer } from './components/Footer';

// Generated assets
import bgBackdrop from './assets/images/fantasy_parchment_backdrop_1790318457427.jpg';
import relicCrest from './assets/images/fantasy_relic_crest_1790318472573.jpg';

export default function App() {
  const [character, setCharacter] = useState<FantasyCharacter | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<GenerationMode>('SURPRISE_ME');
  const [savedCharacters, setSavedCharacters] = useState<FantasyCharacter[]>([]);

  // Load saved characters from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fcg_saved_heroes');
      if (saved) {
        setSavedCharacters(JSON.parse(saved));
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  const handleStartGeneration = (mode?: GenerationMode) => {
    const targetMode = mode || selectedMode;
    setSelectedMode(targetMode);
    setIsGenerating(true);
    sound.playDiceRoll();

    // Scroll toward the generation frame
    const el = document.getElementById('ritual-anchor');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRitualComplete = () => {
    const newChar = generateCharacter(selectedMode);
    setCharacter(newChar);
    setIsGenerating(false);
    sound.playMagicSummon();

    setTimeout(() => {
      const el = document.getElementById('character-display');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleRerollAttribute = (attr: keyof FantasyCharacter) => {
    if (!character) return;
    const updated = rerollAttribute(character, attr);
    setCharacter(updated);
  };

  const handleUpdateAvatarImage = (url: string | undefined) => {
    if (!character) return;
    const updated = {
      ...character,
      avatar: {
        ...character.avatar,
        customImageUrl: url
      }
    };
    setCharacter(updated);
    setSavedCharacters((prev) => {
      const next = prev.map((c) => (c.id === updated.id ? updated : c));
      try {
        localStorage.setItem('fcg_saved_heroes', JSON.stringify(next));
      } catch {
        // quota
      }
      return next;
    });
  };

  const handleUploadPortraitFromEmptyState = (url: string) => {
    const newChar = generateCharacter(selectedMode);
    newChar.avatar.customImageUrl = url;
    setCharacter(newChar);
    sound.playMagicSummon();
    setTimeout(() => {
      const el = document.getElementById('character-display');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSaveCharacter = (char: FantasyCharacter) => {
    setSavedCharacters((prev) => {
      if (prev.some((c) => c.id === char.id)) {
        return prev;
      }
      const next = [char, ...prev];
      try {
        localStorage.setItem('fcg_saved_heroes', JSON.stringify(next));
      } catch {
        // storage quota fallback
      }
      return next;
    });
  };

  const handleDeleteSavedCharacter = (id: string) => {
    setSavedCharacters((prev) => {
      const next = prev.filter((c) => c.id !== id);
      try {
        localStorage.setItem('fcg_saved_heroes', JSON.stringify(next));
      } catch {
        // storage quota fallback
      }
      return next;
    });
  };

  const handleClearAllSaved = () => {
    setSavedCharacters([]);
    try {
      localStorage.removeItem('fcg_saved_heroes');
    } catch {
      // fallback
    }
  };

  const isCurrentCharacterSaved = character
    ? savedCharacters.some((c) => c.id === character.id)
    : false;

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#ded7c8] relative overflow-x-hidden selection:bg-amber-600/30 selection:text-amber-200">
      {/* Subtle Background Texture Layer with CSS Fallback */}
      <div
        className="fixed inset-0 pointer-events-none opacity-15 bg-cover bg-center mix-blend-screen z-0"
        style={{
          backgroundImage: `url(${bgBackdrop})`,
        }}
      />

      {/* Floating Vignette Gradient */}
      <div className="fixed inset-0 pointer-events-none bg-radial from-transparent via-[#0b0c10]/70 to-[#0b0c10] z-0" />

      {/* Top Header */}
      <Header
        onQuickGenerate={() => handleStartGeneration('SURPRISE_ME')}
        isGenerating={isGenerating}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onGenerate={handleStartGeneration}
          onUploadPortrait={handleUploadPortraitFromEmptyState}
          isGenerating={isGenerating}
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
        />

        <div id="ritual-anchor" />

        {/* Central Generation Area */}
        <div className="px-4 sm:px-6">
          {isGenerating ? (
            <RitualProgress onComplete={handleRitualComplete} />
          ) : character ? (
            <CharacterCard
              character={character}
              onRerollAttribute={handleRerollAttribute}
              onSaveCharacter={handleSaveCharacter}
              onUpdateAvatarImage={handleUpdateAvatarImage}
              isSaved={isCurrentCharacterSaved}
            />
          ) : (
            <EmptyState
              onGenerate={() => handleStartGeneration('SURPRISE_ME')}
              onUploadPortrait={handleUploadPortraitFromEmptyState}
              sealImage={relicCrest}
            />
          )}
        </div>

        {/* Hall of Past Disasters */}
        <HallOfDisasters
          characters={savedCharacters}
          onSelectCharacter={(char) => setCharacter(char)}
          onDeleteCharacter={handleDeleteSavedCharacter}
          onClearAll={handleClearAllSaved}
        />

        {/* Codex Lore Section */}
        <LoreCodex />
      </main>

      <Footer />
    </div>
  );
}
