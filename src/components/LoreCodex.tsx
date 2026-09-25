import React from 'react';
import { BookOpen, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

export const LoreCodex: React.FC = () => {
  return (
    <section id="lore-codex" className="max-w-5xl mx-auto my-16 px-4 sm:px-6">
      <div className="pb-4 border-b border-amber-900/40 mb-8 text-center sm:text-left">
        <h2 className="text-2xl font-cinzel font-bold text-amber-200 flex items-center justify-center sm:justify-start gap-2">
          <BookOpen className="w-5 h-5 text-amber-500" />
          <span>CODEX OF QUESTIONABLE WISDOM</span>
        </h2>
        <p className="text-xs text-stone-400 mt-0.5">
          Everything the Royal Academy doesn't want you to know about adventuring
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lore Item 1 */}
        <div className="p-6 rounded-2xl bg-stone-950/60 border border-amber-900/30 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-cinzel font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>The Cosmic Roll</span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed font-sans-rpg">
            When the ancient deities rolled the 100-sided die of fate, they dropped it down the tavern cellar stairs.
            The resulting heroes inherited grand destinies paired with disastrously specific character defects and loud footwear.
          </p>
        </div>

        {/* Lore Item 2 */}
        <div className="p-6 rounded-2xl bg-stone-950/60 border border-amber-900/30 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-cinzel font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>The Uselessness Index</span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed font-sans-rpg">
            Calibrated by royal scholars, the Uselessness Rating measures the percentage of an adventurer's actions
            that result in burnt toast, interrupted naps, or prolonged legal disputes with local squirrels.
          </p>
        </div>

        {/* Lore Item 3 */}
        <div className="p-6 rounded-2xl bg-stone-950/60 border border-amber-900/30 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-cinzel font-bold text-sm">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>Adventuring Guild FAQ</span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed font-sans-rpg">
            <strong>Can I fire my hero?</strong> Absolutely not. Once summoned, they will linger in your party inventory,
            offering unsolicited advice and complaining about the humidity indefinitely.
          </p>
        </div>
      </div>
    </section>
  );
};
