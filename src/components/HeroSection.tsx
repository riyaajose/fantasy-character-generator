import React, { useRef } from 'react';
import { Sparkles, Dices, Flame, ShieldAlert, Compass, Upload } from 'lucide-react';
import { GenerationMode } from '../types/character';
import { sound } from '../utils/soundEffects';

interface HeroSectionProps {
  onGenerate: (mode: GenerationMode) => void;
  onUploadPortrait?: (imageUrl: string) => void;
  isGenerating: boolean;
  selectedMode: GenerationMode;
  onSelectMode: (mode: GenerationMode) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGenerate,
  onUploadPortrait,
  isGenerating,
  selectedMode,
  onSelectMode
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image file is too large. Please select an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result && onUploadPortrait) {
        sound.playMagicSummon();
        onUploadPortrait(result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };
  const modes: { id: GenerationMode; label: string; icon: React.ReactNode; tooltip: string }[] = [
    {
      id: 'CHAOS',
      label: 'Wild Chaos',
      icon: <Flame className="w-3.5 h-3.5" />,
      tooltip: 'Unfiltered fantasy randomness'
    },
    {
      id: 'TOTALLY_USELESS',
      label: 'Maximum Uselessness',
      icon: <ShieldAlert className="w-3.5 h-3.5" />,
      tooltip: 'Guaranteed 90%+ uselessness rating'
    },
    {
      id: 'HEROIC_DISASTER',
      label: 'Heroic Disaster',
      icon: <Compass className="w-3.5 h-3.5" />,
      tooltip: 'Grand aspirations with catastrophic execution'
    },
    {
      id: 'SURPRISE_ME',
      label: 'Surprise Me',
      icon: <Dices className="w-3.5 h-3.5" />,
      tooltip: 'Cosmic roll of destiny'
    }
  ];

  return (
    <section id="generator" className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden text-center">
      {/* Mystical Background Rune / Star Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-amber-600/10 via-amber-500/5 to-purple-800/10 blur-3xl" />
        <div className="absolute top-12 left-10 text-amber-500/10 text-6xl font-medieval select-none rotate-12">ᛟ ᚱ ᚲ</div>
        <div className="absolute bottom-10 right-10 text-amber-500/10 text-6xl font-medieval select-none -rotate-12">ᚨ ᛏ ᛋ</div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Status Marker & Subtitle */}
        <div className="inline-flex items-center gap-3 px-3 py-1 mb-6 rounded-full bg-stone-900/90 border border-amber-800/30 text-xs font-mono-stat tracking-wider">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-semibold">MAGIC SYSTEM ONLINE</span>
          <span className="text-stone-600">|</span>
          <span className="text-stone-400">“Your destiny awaits. Unfortunately.”</span>
        </div>

        {/* Large Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500 gold-glow-text mb-4">
          CREATE YOUR LEGEND
        </h1>

        {/* Tagline & Subheading */}
        <p className="text-lg md:text-xl font-medieval text-amber-300/80 mb-2">
          “Creating heroes nobody asked for.”
        </p>
        <p className="text-stone-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
          Generate a completely unique fantasy hero with absolutely no practical purpose,
          excessive emotional baggage, and an arsenal of deeply questionable gear.
        </p>

        {/* Mode Selector Segmented Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 mb-8 max-w-lg mx-auto bg-stone-900/80 border border-amber-900/40 rounded-xl backdrop-blur-sm">
          {modes.map((mode) => {
            const isActive = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  sound.playClick();
                  onSelectMode(mode.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cinzel tracking-wider transition-all ${
                  isActive
                    ? 'bg-amber-600/90 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-amber-200 hover:bg-stone-800/60'
                }`}
                title={mode.tooltip}
              >
                {mode.icon}
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Hidden File Input for Custom Portrait */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="hero-image-upload"
        />

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              sound.playDiceRoll();
              onGenerate(selectedMode);
            }}
            disabled={isGenerating}
            className="w-full sm:w-auto px-8 py-4 rounded-xl gold-shimmer-btn text-stone-950 font-cinzel font-extrabold text-base tracking-wider uppercase shadow-xl shadow-amber-950/40 border border-amber-300/30 hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer"
          >
            <span className="text-xl">⚔️</span>
            <span>GENERATE CHARACTER</span>
            <Sparkles className="w-4 h-4 ml-1 text-stone-950 animate-pulse" />
          </button>

          <button
            onClick={() => {
              sound.playDiceRoll();
              onGenerate('SURPRISE_ME');
            }}
            disabled={isGenerating}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-stone-900/90 hover:bg-stone-800/90 text-amber-200 font-cinzel font-bold text-sm tracking-wider uppercase border border-amber-800/50 hover:border-amber-600/70 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 cursor-pointer"
          >
            <span className="text-lg">🎲</span>
            <span>SURPRISE ME</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              fileInputRef.current?.click();
            }}
            disabled={isGenerating}
            className="w-full sm:w-auto px-5 py-4 rounded-xl bg-stone-950/80 hover:bg-stone-900 text-stone-300 hover:text-amber-200 font-cinzel font-semibold text-xs tracking-wider uppercase border border-amber-900/40 hover:border-amber-600/60 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            title="Upload your own picture or character illustration"
          >
            <Upload className="w-4 h-4 text-amber-400" />
            <span>Upload Portrait</span>
          </button>
        </div>
      </div>
    </section>
  );
};
