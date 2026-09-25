import React, { useState } from 'react';
import { FantasyCharacter } from '../types/character';
import { Trash2, ExternalLink, Trophy, Download } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface HallOfDisastersProps {
  characters: FantasyCharacter[];
  onSelectCharacter: (char: FantasyCharacter) => void;
  onDeleteCharacter: (id: string) => void;
  onClearAll: () => void;
}

export const HallOfDisasters: React.FC<HallOfDisastersProps> = ({
  characters,
  onSelectCharacter,
  onDeleteCharacter,
  onClearAll,
}) => {
  const [filterRace, setFilterRace] = useState<string>('ALL');

  const uniqueRaces = ['ALL', ...Array.from(new Set(characters.map((c) => c.race)))];

  const filtered = characters
    .filter((c) => (filterRace === 'ALL' ? true : c.race === filterRace))
    .sort((a, b) => b.stats.uselessness - a.stats.uselessness);

  const handleExportJson = () => {
    sound.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(characters, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `hall_of_useless_heroes_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="hall-of-disasters" className="max-w-5xl mx-auto my-16 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-900/40 mb-6">
        <div>
          <h2 className="text-2xl font-cinzel font-bold text-amber-200 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>HALL OF PAST DISASTERS</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Archived collection of thoroughly ineffective adventurers
          </p>
        </div>

        {characters.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              className="px-3 py-1.5 rounded-lg bg-stone-900/90 border border-amber-900/40 text-stone-300 hover:text-amber-300 text-xs font-cinzel tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Exile all saved heroes into the void forever?')) {
                  sound.playClick();
                  onClearAll();
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-stone-900/90 border border-red-900/40 text-red-400 hover:bg-red-950/40 text-xs font-cinzel tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Hall</span>
            </button>
          </div>
        )}
      </div>

      {characters.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-stone-950/40 border border-stone-800 text-stone-500 text-xs font-cinzel">
          No heroes saved yet. Generate a hero and click "Save Hero" to immortalize their uselessness in the Hall!
        </div>
      ) : (
        <div className="space-y-4">
          {/* Race Filter segment */}
          {uniqueRaces.length > 2 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-stone-500 font-cinzel mr-1">Filter:</span>
              {uniqueRaces.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    sound.playClick();
                    setFilterRace(r);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-cinzel transition-colors ${
                    filterRace === r
                      ? 'bg-amber-600/90 text-stone-950 font-bold'
                      : 'bg-stone-900/80 text-stone-400 hover:text-amber-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((char) => (
              <div
                key={char.id}
                className="p-4 rounded-xl bg-stone-950/70 border border-amber-900/40 hover:border-amber-600/60 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl p-1.5 rounded-lg bg-stone-900 border border-stone-800">
                        {char.avatar.emoji}
                      </span>
                      <div>
                        <h4 className="font-cinzel font-bold text-sm text-amber-200 group-hover:text-amber-100 transition-colors">
                          {char.name}
                        </h4>
                        <div className="text-[11px] text-stone-400">
                          {char.race} · {char.characterClass}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-stone-500 font-mono-stat">Useless</div>
                      <div className="text-xs font-bold text-amber-400 font-mono-stat">
                        {char.stats.uselessness}%
                      </div>
                    </div>
                  </div>

                  <p className="text-xs font-medieval italic text-amber-400/80 mt-2 line-clamp-1">
                    “{char.title}”
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1 line-clamp-2 font-sans-rpg">
                    Weapon: {char.weapon.name}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-800/80">
                  <span className="text-[10px] text-stone-500 font-mono-stat">
                    {char.generatedAt}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        sound.playClick();
                        onDeleteCharacter(char.id);
                      }}
                      className="text-stone-500 hover:text-red-400 p-1"
                      title="Exile from hall"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        sound.playClick();
                        onSelectCharacter(char);
                        const el = document.getElementById('character-display');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-700/40 text-amber-300 hover:bg-amber-800/50 text-[11px] font-cinzel flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
