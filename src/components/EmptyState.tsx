import React, { useRef } from 'react';
import { Scroll, Sparkles, Upload } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface EmptyStateProps {
  onGenerate: () => void;
  onUploadPortrait?: (imageUrl: string) => void;
  sealImage?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onGenerate, onUploadPortrait, sealImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP).');
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

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 md:p-12 text-center rpg-frame rounded-2xl border border-amber-800/40 relative overflow-hidden">
      {/* Decorative Corner Ornaments */}
      <div className="absolute top-2 left-2 text-amber-600/40 text-sm select-none font-serif">╔</div>
      <div className="absolute top-2 right-2 text-amber-600/40 text-sm select-none font-serif">╗</div>
      <div className="absolute bottom-2 left-2 text-amber-600/40 text-sm select-none font-serif">╚</div>
      <div className="absolute bottom-2 right-2 text-amber-600/40 text-sm select-none font-serif">╝</div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="relative mx-auto w-24 h-24 rounded-full border-2 border-amber-600/60 p-1 mb-6 shadow-xl shadow-amber-950/60 overflow-hidden bg-stone-950 flex items-center justify-center">
        {sealImage ? (
          <img
            src={sealImage}
            alt="Ancient Seal of Destiny"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full filter brightness-90 contrast-110"
            onError={(e) => {
              // Graceful fallback to SVG icon
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <Scroll className="w-10 h-10 text-amber-400 animate-rune-pulse" />
        )}
      </div>

      <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-amber-200 tracking-wider gold-glow-text mb-3">
        YOUR CHARACTER AWAITS
      </h2>

      <p className="text-amber-300/80 font-medieval text-lg md:text-xl mb-6 italic">
        “The ancient scroll contains absolutely nothing useful.”
      </p>

      <p className="text-stone-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
        Break the wax seal to conjure an unnecessarily detailed, hilariously flawed adventurer
        destined to cause mild tavern disturbances across the realm.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => {
            sound.playDiceRoll();
            onGenerate();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl gold-shimmer-btn text-stone-950 font-cinzel font-bold text-sm tracking-wider uppercase shadow-lg border border-amber-300/40 hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>⚔️ Open The Scroll</span>
          <Sparkles className="w-4 h-4 text-stone-950" />
        </button>

        <button
          onClick={() => {
            sound.playClick();
            fileInputRef.current?.click();
          }}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-amber-200 border border-amber-800/40 hover:border-amber-600/60 font-cinzel text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4 text-amber-400" />
          <span>Upload Custom Portrait</span>
        </button>
      </div>
    </div>
  );
};
