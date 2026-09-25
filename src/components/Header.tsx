import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Menu, X } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface HeaderProps {
  onQuickGenerate: () => void;
  isGenerating: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onQuickGenerate, isGenerating }) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const navLinks = [
    { name: 'Generator', href: '#generator' },
    { name: 'Character', href: '#character-display' },
    { name: 'Attributes', href: '#character-attributes' },
    { name: 'Hall of Disasters', href: '#hall-of-disasters' },
    { name: 'Codex Lore', href: '#lore-codex' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0c0d12]/90 border-b border-amber-900/30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#generator"
          onClick={() => sound.playClick()}
          className="text-amber-400 font-cinzel font-bold text-lg md:text-xl tracking-wider hover:text-amber-300 transition-colors flex items-center gap-2"
        >
          <span className="text-amber-500">⚔️</span>
          <span>FANTASY CHARACTER GENERATOR™</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-cinzel text-stone-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => sound.playClick()}
              className="hover:text-amber-400 transition-colors duration-200 py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions (Sound Toggle & Quick Summon) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-2 rounded-lg bg-stone-900/80 border border-amber-900/40 text-stone-400 hover:text-amber-400 hover:border-amber-600/50 transition-colors"
            title={isMuted ? 'Enable Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onQuickGenerate();
            }}
            disabled={isGenerating}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-cinzel font-bold text-xs tracking-wider transition-all disabled:opacity-50 shadow-md shadow-amber-900/20 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-950" />
            <span>Summon</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-400 hover:text-amber-400"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-900/30 bg-[#0d0e14] px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-sm font-cinzel text-stone-300 hover:text-amber-400 tracking-wider"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
                onQuickGenerate();
              }}
              disabled={isGenerating}
              className="w-full py-2 rounded bg-amber-600 text-stone-950 font-cinzel font-bold text-xs tracking-wider"
            >
              ⚔️ Generate New Character
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
