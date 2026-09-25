import React from 'react';
import { ArrowUp } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-amber-950/60 bg-[#090a0e] py-10 px-4 sm:px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-cinzel">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="text-amber-500/80 font-bold">FANTASY CHARACTER GENERATOR™</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>Creating heroes nobody asked for since the Third Age.</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-stone-600 text-[11px]">
            No goblins were harmed in the calculation of these statistics.
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-400 hover:border-amber-700/50 transition-colors flex items-center gap-1"
            title="Return to the top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
