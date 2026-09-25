import React, { useEffect, useState } from 'react';
import { RITUAL_STEPS } from '../data/fantasyData';

interface RitualProgressProps {
  onComplete: () => void;
}

export const RitualProgress: React.FC<RitualProgressProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const stepDuration = 320; // snappier so users enjoy it without long waits
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < RITUAL_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 240);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete]);

  const progressPercent = Math.round(((currentStepIndex + 1) / RITUAL_STEPS.length) * 100);

  return (
    <div className="py-14 px-6 max-w-xl mx-auto text-center rpg-frame rounded-2xl border border-amber-600/40 relative overflow-hidden backdrop-blur-md">
      {/* Background magical runic glow */}
      <div className="absolute inset-0 bg-radial from-amber-600/10 via-transparent to-black/60 pointer-events-none" />

      {/* Spinning cosmic seal */}
      <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/60 animate-spin [animation-duration:8s]" />
        <div className="absolute inset-2 rounded-full border border-amber-400/40 animate-ping [animation-duration:3s]" />
        <div className="text-4xl select-none animate-pulse">🔮</div>
      </div>

      <h3 className="text-xl md:text-2xl font-cinzel font-bold text-amber-200 gold-glow-text mb-2 tracking-wide">
        SUMMONING IN PROGRESS
      </h3>

      {/* Dynamic stepped message */}
      <p className="text-amber-400/90 font-medieval text-lg min-h-[30px] transition-all duration-200">
        {RITUAL_STEPS[currentStepIndex]}
      </p>

      {/* Progress Rune Bar */}
      <div className="mt-6 max-w-xs mx-auto">
        <div className="w-full bg-stone-950/80 rounded-full h-2.5 border border-amber-900/50 p-0.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500 h-full rounded-full transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-2 text-[11px] font-mono-stat text-stone-500 flex justify-between px-1">
          <span>RITUAL MATRIX</span>
          <span>{progressPercent}%</span>
        </div>
      </div>
    </div>
  );
};
